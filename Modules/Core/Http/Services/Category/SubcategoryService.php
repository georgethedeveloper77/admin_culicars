<?php

namespace Modules\Core\Http\Services\Category;

use App\Config\Cache\SubcategoryCache;
use App\Http\Contracts\Category\SubcategoryServiceInterface;
use App\Http\Contracts\Image\ImageServiceInterface;
use App\Http\Services\PsService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Modules\Core\Constants\Constants;
use Modules\Core\Entities\Category\Category;
use Modules\Core\Entities\Category\Subcategory;
use Modules\Core\Http\Facades\PsCache;
use Modules\Core\Imports\SubcategoryImport;

class SubcategoryService extends PsService implements SubcategoryServiceInterface
{
    public function __construct(
        protected ImageServiceInterface $imageService) {}

    public function save($subcategoryData, $subcategoryImage, $subcategoryIcon)
    {
        DB::beginTransaction();
        try {
            // save subcategory
            $subcategory = $this->saveSubcategory($subcategoryData);

            // save subcategory cover photo
            $imgData = $this->prepareSaveImageData($subcategory->id);
            $this->imageService->save($subcategoryImage, $imgData);

            // save subcategory icon photo
            $iconImgData = $this->prepareSaveIconData($subcategory->id);
            $this->imageService->save($subcategoryIcon, $iconImgData);

            DB::commit();

            PsCache::clear(SubcategoryCache::BASE);

        } catch (\Throwable $e) {

            DB::rollBack();

            throw $e;
        }
    }

    public function update($id, $subcategoryData, $subcategoryImageId, $subcategoryImage, $subcategoryIconId, $subcategoryIcon)
    {
        DB::beginTransaction();
        try {
            // update subcategory
            $subcategory = $this->updateSubcategory($id, $subcategoryData);

            // update subcategory cover photo
            $imgData = $this->prepareSaveImageData($id);
            $this->imageService->update($subcategoryImageId, $subcategoryImage, $imgData);

            // update subcategory icon photo
            $iconImgData = $this->prepareSaveIconData($id);
            $this->imageService->update($subcategoryIconId, $subcategoryIcon, $iconImgData);

            DB::commit();

            PsCache::clear(SubcategoryCache::BASE);

        } catch (\Throwable $e) {

            DB::rollBack();

            throw $e;
        }
    }

    public function delete($id)
    {
        try {
            $this->imageService->deleteAll($id, Constants::subcategoryCoverImgType);

            $name = $this->deleteSubcategory($id);

            PsCache::clear(SubcategoryCache::BASE);

            return [
                'msg' => __('core__be_delete_success', ['attribute' => $name]),
                'flag' => Constants::success,
            ];
        } catch (\Throwable $e) {
            throw $e;
        }
    }

    public function get($id = null, $name = null, $relation = null)
    {
        $param = [$id, $name, $relation];

        return PsCache::remember([SubcategoryCache::BASE], SubcategoryCache::GET_EXPIRY, $param,
            function() use($id, $name, $relation) {
                return Subcategory::when($id, function ($query, $id) {
                        $query->where(Subcategory::id, $id);
                    })
                    ->when($name, function ($query, $name) {
                        $query->where(Subcategory::name, $name);
                    })
                    ->when($relation, function ($query, $relation) {
                        $query->with($relation);
                    })
                    ->first();
            });
    }

    public function getAll($relation = null, $status = null, $limit = null, $offset = null, $conds = null, $noPagination = null, $pagPerPage = null)
    {
        $sort = '';
        if (isset($conds['order_by'])) {
            $sort = $conds['order_by'];
        }

        $param = [$relation, $status, $limit, $offset, $conds, $noPagination, $pagPerPage];

        return PsCache::remember([SubcategoryCache::BASE], SubcategoryCache::GET_ALL_EXPIRY, $param,
            function() use($relation, $status, $limit, $offset, $conds, $noPagination, $pagPerPage, $sort) {
                $subcategories = Subcategory::select(Subcategory::tableName.'.*')
                    ->when(isset($conds['order_by']) && $conds['order_by'], function ($q) use ($sort) {
                        if ($sort == 'category_id@@name') {
                            $q->join(Category::tableName, Category::tableName.'.'.Category::id, '=', Subcategory::tableName.'.'.Subcategory::CategoryId);
                            $q->select(Category::tableName.'.'.Category::name.' as cat_name', Subcategory::tableName.'.*');
                        }
                    })
                    ->when($relation, function ($q, $relation) {
                        $q->with($relation);
                    })
                    ->when($limit, function ($query, $limit) {
                        $query->limit($limit);
                    })
                    ->when($offset, function ($query, $offset) {
                        $query->offset($offset);
                    })
                    ->when($status, function ($q, $status) {
                        $q->where(Subcategory::status, $status);
                    })
                    ->when($conds, function ($query, $conds) {
                        $query = $this->searching($query, $conds);
                    })
                    ->when(empty($sort), function ($query) {
                        $query->orderBy(Subcategory::status, 'desc')
                            ->orderBy(Subcategory::addedDate, 'desc')
                            ->orderBy(Subcategory::name, 'asc');
                    });

                if ($pagPerPage) {
                    $subcategories = $subcategories->paginate($pagPerPage)->onEachSide(1)->withQueryString();

                } elseif ($noPagination) {
                    $subcategories = $subcategories->get();
                } else {
                    $subcategories = $subcategories->get();
                }

                return $subcategories;
            });
    }

    public function setStatus($id, $status)
    {
        try {
            $status = $this->prepareUpdateStausData($status);

            $subcategory = $this->updateSubcategory($id, $status);

            PsCache::clear(SubcategoryCache::BASE);

            return $subcategory;

        } catch (\Throwable $e) {
            throw $e;
        }
    }

    public function importCSVFile($subcategoryData)
    {
        try {
            $import = new SubcategoryImport();
            $import->import($subcategoryData);

            PsCache::clear(SubcategoryCache::BASE);
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
            'img_type' => Constants::subcategoryCoverImgType,
        ];
    }

    private function prepareSaveIconData($id)
    {
        return [
            'img_parent_id' => $id,
            'img_type' => Constants::subcategoryIconImgType,
        ];
    }

    private function prepareUpdateStausData($status)
    {
        return ['status' => $status];
    }

    //-------------------------------------------------------------------
    // Database
    //-------------------------------------------------------------------

    private function saveSubcategory($subcategoryData)
    {
        $subcategory = new Subcategory();
        $subcategory->fill($subcategoryData);
        $subcategory->added_user_id = Auth::user()->id;
        $subcategory->save();

        return $subcategory;
    }

    private function updateSubcategory($id, $subcategoryData)
    {
        $subcategory = $this->get($id);
        $subcategory->updated_user_id = Auth::user()->id;
        $subcategory->update($subcategoryData);

        return $subcategory;
    }

    private function deleteSubcategory($id)
    {
        $subcategory = $this->get($id);
        $name = $subcategory->name;
        $subcategory->delete();

        return $name;
    }

    private function searching($query, $conds)
    {
        if (isset($conds['keyword']) && $conds['keyword']) {
            $conds['searchterm'] = $conds['keyword'];
        }
        // search term
        if (isset($conds['searchterm']) && $conds['searchterm']) {
            $search = $conds['searchterm'];
            $query->where(function ($query) use ($search) {
                $query->where(Subcategory::tableName.'.'.Subcategory::name, 'like', '%'.$search.'%');
            });
        }

        if (isset($conds['category_id']) && $conds['category_id']) {
            $category_filter = $conds['category_id'];
            $query->whereHas('category', function ($q) use ($category_filter) {
                $q->where(Subcategory::tableName.'.'.Subcategory::CategoryId, $category_filter);
            });
        }
        // order by
        if (isset($conds['order_by']) && isset($conds['order_type']) && $conds['order_by'] && $conds['order_type']) {

            if ($conds['order_by'] == 'id') {
                $query->orderBy(Subcategory::tableName.'.'.Subcategory::id, $conds['order_type']);
            } elseif ($conds['order_by'] == 'category_id@@name') {

                $query->orderBy('cat_name', $conds['order_type']);
            } else {
                $query->orderBy($conds['order_by'], $conds['order_type']);
            }

        }

        return $query;
    }
}
