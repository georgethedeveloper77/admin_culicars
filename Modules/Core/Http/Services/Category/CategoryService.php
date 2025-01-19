<?php

namespace Modules\Core\Http\Services\Category;

use App\Config\Cache\CategoryCache;
use Illuminate\Support\Carbon;
use App\Http\Services\PsService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Modules\Core\Constants\Constants;
use Illuminate\Support\Facades\Session;
use Modules\Core\Imports\CategoryImport;
use Modules\Core\Entities\Category\Category;
use Modules\Core\Http\Services\LanguageService;
use Modules\Core\Entities\CategoryLanguageString;
use App\Http\Contracts\Image\ImageServiceInterface;
use Modules\Core\Http\Services\LanguageStringService;
use App\Http\Contracts\Category\CategoryServiceInterface;
use App\Http\Contracts\Configuration\CoreKeyCounterServiceInterface;
use Modules\Core\Http\Facades\PsCache;

class CategoryService extends PsService implements CategoryServiceInterface
{
    public function __construct(
        protected ImageServiceInterface $imageService,
        protected LanguageStringService $languageStringService,
        protected LanguageService $languageService,
        protected CoreKeyCounterServiceInterface $coreKeyCounterService) {}

    public function save($categoryData, $categoryImage, $categoryIcon)
    {
        DB::beginTransaction();
        try {
            
            // save category
            $category = $this->saveCategory($categoryData);

            // save category cover photo
            $imgData = $this->prepareSaveImageData($category->id);
            $this->imageService->save($categoryImage, $imgData);

            // save category icon photo
            $iconImgData = $this->prepareSaveIconData($category->id);
            $this->imageService->save($categoryIcon, $iconImgData);

            //generate langugae string
            $this->generateCategoryLanguageString(languageString : $categoryData['nameForm'],
                categoryNameKey : $category->name,
                categoryId : $category->id);

            DB::commit();

            PsCache::clear(CategoryCache::BASE);

        } catch (\Throwable $e) {

            DB::rollBack();

            throw $e;
        }
    }

    public function update($id, $categoryData, $categoryImageId, $categoryImage, $categoryIconId, $categoryIcon)
    {
        DB::beginTransaction();
        try {

            // update category
            $category = $this->updateCategory($id, $categoryData);
            // update category cover photo
            $imgData = $this->prepareSaveImageData($id);
            $this->imageService->update($categoryImageId, $categoryImage, $imgData);

            // update category icon photo
            $iconImgData = $this->prepareSaveIconData($id);
            $this->imageService->update($categoryIconId, $categoryIcon, $iconImgData);

            //generate langugae string
            $this->generateCategoryLanguageString(languageString : $categoryData['nameForm'],
            categoryNameKey : $category->key,
            categoryId : $category->id);

            DB::commit();

            PsCache::clear(CategoryCache::BASE);

        } catch (\Throwable $e) {
            DB::rollBack();

            throw $e;
        }
    }

    public function delete($id)
    {
        try {

            $this->imageService->deleteAll($id, Constants::categoryCoverImgType);

            $name = $this->deleteCategory($id);

            $this->delectCategoryLanguages($id);

            PsCache::clear(CategoryCache::BASE);

            return [
                'msg' => __('core__be_delete_success', ['attribute' => __($name)]),
                'flag' => Constants::success,
            ];
        } catch (\Throwable $e) {
            throw $e;
        }
    }

    public function get($id = null, $relation = null, $languageId = null, $conds = null)
    {
        $langConds = $this->prepareLanguageData();
        $activeLanguage = $this->languageService->getLanguage(null, $langConds);
        $langId = $languageId ?? $activeLanguage->id;

        $param = [$id, $relation, $languageId, $conds];

        return PsCache::remember([CategoryCache::BASE], CategoryCache::GET_EXPIRY, $param,
            function() use($id, $relation, $langId, $conds){
                return Category::query()
                    ->leftjoin(CategoryLanguageString::tableName, function ($query) use ($langId) {
                        $query->on(Category::t(Category::name), '=', CategoryLanguageString::tableName.'.'.CategoryLanguageString::key)
                            ->where(CategoryLanguageString::tableName.'.'.CategoryLanguageString::languageId, $langId);
                    })
                    ->select(Category::t(Category::id),
                        Category::t(Category::name).' as key',
                        DB::raw('COALESCE(' . CategoryLanguageString::tableName . '.' . CategoryLanguageString::value . ', ' . Category::t(Category::name) . ') as name'),
                        Category::t(Category::ordering),
                        Category::t(Category::status),
                        Category::t(Category::addedDate),
                        Category::t(Category::addedUserId),
                        Category::t(Category::updatedUserId))

                    ->when($id, function ($q) use($id) {
                        $q->where(Category::t(Category::id), $id);
                    })
                    ->when($relation, function ($q, $relation) {
                        $q->with($relation);
                    })
                    ->when($conds, function ($q, $conds) {
                        $q->where($conds);
                    })
                    ->groupBy(Category::t(Category::id))
                    ->when(empty($id) , function ($q) {
                        $q->orderBy(Category::t(Category::addedDate), 'desc')->orderBy(Category::status, 'desc')->orderBy(Category::name, 'asc');
                    })
                    ->first();
            });
    }

    public function getAll($relation = null, $status = null, $languageId = null, $limit = null, $offset = null, $conds = null, $noPagination = null, $pagPerPage = null, $touchCount = null, $itemCount = null)
    {
        $sort = '';
        if (isset($conds['order_by'])) {
            $sort = $conds['order_by'];
        }

        $langConds = $this->prepareLanguageData();
        $activeLanguage = $this->languageService->getLanguage(null, $langConds);
        $langId = $languageId ?? $activeLanguage->id;

        $param = [$relation, $status, $languageId, $limit, $offset, $conds, $noPagination, $pagPerPage, $touchCount, $itemCount];

        return PsCache::remember([CategoryCache::BASE], CategoryCache::GET_ALL_EXPIRY, $param,
            function() use($relation, $status, $langId, $limit, $offset, $conds, $noPagination, $pagPerPage, $touchCount, $itemCount, $sort) {
                $categories = Category::leftjoin(CategoryLanguageString::tableName, function ($query) use ($langId) {
                    $query->on(Category::t(Category::name), '=', CategoryLanguageString::tableName.'.'.CategoryLanguageString::key)
                        ->where(CategoryLanguageString::tableName.'.'.CategoryLanguageString::languageId, $langId);
                })
                    ->select(Category::t(Category::id),
                        Category::t(Category::name).' as key',
                        DB::raw('COALESCE(' . CategoryLanguageString::tableName . '.' . CategoryLanguageString::value . ', ' . Category::t(Category::name) . ') as name'),
                        Category::t(Category::ordering),
                        Category::t(Category::status),
                        Category::t(Category::addedDate),
                        Category::t(Category::addedUserId),
                        Category::t(Category::updatedUserId))
                    ->groupBy(Category::t(Category::id))
                    ->when($relation, function ($q, $relation) {
                        $q->with($relation);
                    })
                    ->when($status, function ($q, $status) {
                        $q->where(Category::status, $status);
                    })
                    ->when($touchCount, function ($q) {
                        $q->withCount(['category_touch']);
                    })
                    ->when($itemCount, function ($q, $itemCount) {
                        $q->withCount(['itemCount as count']);
                    })
                    ->when($limit, function ($query, $limit) {
                        $query->limit($limit);
                    })
                    ->when($offset, function ($query, $offset) {
                        $query->offset($offset);
                    })
                    ->when($conds, function ($query, $conds) {
                        $query = $this->searching($query, $conds);
                    })
                    ->when(empty($sort), function ($query) {
                        $query->orderBy(Category::tableName.'.'.Category::addedDate, 'desc')->orderBy(Category::status, 'desc')->orderBy(Category::name, 'asc');
                    });

                if ($pagPerPage) {
                    $categories = $categories->paginate($pagPerPage)->onEachSide(1)->withQueryString();
                } elseif ($noPagination) {
                    $categories = $categories->get();
                } else {
                    $categories = $categories->get();
                }

                return $categories;
            });
    }

    public function setStatus($id, $status)
    {
        try {
            $status = $this->prepareUpdateStausData($status);

            $category = $this->updateCategory($id, $status);

            PsCache::clear(CategoryCache::BASE);

            return $category;

        } catch (\Throwable $e) {
            throw $e;
        }
    }

    public function importCSVFile($categoryData)
    {
        try {
            $import = new CategoryImport();
            $import->import($categoryData);

            PsCache::clear(CategoryCache::BASE);
        } catch (\Throwable $e) {
            throw $e;
        }

    }

    ////////////////////////////////////////////////////////////////////
    /// Private Functions
    ////////////////////////////////////////////////////////////////////

    //-------------------------------------------------------------------
    // Data Preparations
    //-------------------------------------------------------------------
    private function prepareSaveImageData($id)
    {
        return [
            'img_parent_id' => $id,
            'img_type' => Constants::categoryCoverImgType,
        ];
    }

    private function prepareSaveIconData($id)
    {
        return [
            'img_parent_id' => $id,
            'img_type' => Constants::categoryIconImgType,
        ];
    }

    private function prepareUpdateStausData($status)
    {
        return ['status' => $status];
    }

    private function prepareLanguageData()
    {
        return ['symbol' => Session::get('applocale') ?? 'en'];
    }

    //-------------------------------------------------------------------
    // Database
    //-------------------------------------------------------------------
    private function saveCategory($categoryData)
    {
        $category = new Category();
        $category->name = $this->coreKeyCounterService->generate(Constants::categoryLanguage);
        $category->status = $categoryData['status'];
        $category->added_user_id = Auth::user()->id;
        $category->save();

        return $category;
    }

    private function updateCategory($id, $categoryData)
    {
        $category = $this->get($id);
        $category->updated_user_id = Auth::user()->id;
        $category->update($categoryData);

        return $category;
    }

    private function deleteCategory($id)
    {
        $category = $this->get($id);
        $name = $category->name;
        $category->delete();

        return $name;
    }

    private function searching($query, $conds)
    {
        // search term
        if (isset($conds['keyword']) && $conds['keyword']) {
            $conds['searchterm'] = $conds['keyword'];
        }
        if (isset($conds['searchterm']) && $conds['searchterm']) {
            $search = $conds['searchterm'];
            $query->where(CategoryLanguageString::tableName.'.'.CategoryLanguageString::value, 'like', '%'.$search.'%')
                ->orWhere(Category::t(Category::name), 'like', '%'.$search.'%');
        }
        if (isset($conds['selected_date']) && $conds['selected_date']) {
            $date_filter = $conds['selected_date'];
            // dd($date_filter);
            if ($date_filter[1] == '') {
                $date_filter[1] = Carbon::now();
            }
            $query->whereBetween(Category::tableName.'.added_date', $date_filter);
        }

        $query->when(isset($conds['added_date']), function ($q) use ($conds) {
            $q->where(Category::tableName.'.added_date', $conds['added_date']);
        })->when(isset($conds['date_range']), function ($q) use ($conds) {
            $conds['date_range'][1] = $conds['date_range'][1] ?? Carbon::now();
            $q->whereBetween(Category::tableName.'.added_date', $conds['date_range']);
        })->when(isset($conds['added_user_id']), function ($q) use ($conds) {
            $q->where('added_user', $conds['added_user_id']);
        })->when(isset($conds['order_by']), function ($q) use ($conds) {
            $q->orderBy($conds['order_by'], $conds['order_type']);
        });

        return $query;
    }

    private function generateCategoryLanguageString($languageString, $categoryNameKey, $categoryId)
    {
        if($languageString != null && is_array($languageString)) {
            $nameForm = new \stdClass();
            foreach ($languageString as $key => $value) {
                $nameForm->$key = $value;
            }

            $this->languageStringService->storeCategoryLanguageStrings($nameForm, $categoryNameKey, $categoryId);
        }

    }

    private function delectCategoryLanguages($categoryId)
    {
        $categoryLanguages = CategoryLanguageString::where(CategoryLanguageString::categoryId, $categoryId)->get();
        if ($categoryLanguages) {
            foreach ($categoryLanguages as $language) {
                $language->delete();
            }
        }
    }
}
