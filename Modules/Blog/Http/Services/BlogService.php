<?php

namespace Modules\Blog\Http\Services;

use App\Config\ps_constant;
use App\Http\Services\PsService;
use Illuminate\Support\Facades\DB;
use Modules\Core\Constants\Constants;
use Modules\Blog\Entities\Blog;
use Illuminate\Support\Facades\Auth;
use Modules\Blog\Transformers\Backend\Model\Blog\BlogWithKeyResource;
use Modules\Core\Entities\Utilities\CoreField;
use Modules\Core\Entities\Location\LocationCity;
use Modules\Core\Entities\Utilities\DynamicColumnVisibility;
use Modules\Core\Http\Services\ImageService;
use Modules\Core\Http\Services\LocationCityService;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Modules\Blog\Transformers\Api\App\V1_0\BlogApiResource;
use Modules\Core\Http\Services\CoreFieldFilterSettingService;
use Modules\Core\Http\Services\MobileSettingService;

/**
 * @deprecated
 */
class BlogService extends PsService
{

    protected $blogApiRelation;
    public function __construct(
        protected ImageService $imageService,
        protected LocationCityService $locationCityService,
        protected CoreFieldFilterSettingService $coreFieldFilterSettingService,
        protected MobileSettingService $mobileSettingService
    ) {
        $this->blogApiRelation = ['city', 'cover'];
    }

    /**
     * @deprecated
     */
    public function create()
    {
        $cities = $this->locationCityService->getLocationCityList(null, Constants::publish);
        $coreFieldFilterSettings = $this->coreFieldFilterSettingService->getCoreFields(withNoPag: 1, moduleName: Constants::blog);
        $dataArr = [
            'cities' => $cities,
            'coreFieldFilterSettings' => $coreFieldFilterSettings
        ];

        return $dataArr;
    }

    /**
     * @deprecated
     */
    public function save($data, $request)
    {
        DB::beginTransaction();

        try {
            // save blog
            $blog = new Blog();
            $blog->fill($data);
            $blog->added_user_id = Auth::user()->id;
            $blog->save();

            // save blog cover photo
            $imgParentId = $blog->id;
            $this->imageService->updateOrCreateImage($request, "cover", $imgParentId, Constants::blogCoverImgType);

            DB::commit();
        } catch (\Throwable $e) {

            DB::rollBack();
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * @deprecated
     */
    public function updateBlog($id, $data, $request)
    {
        DB::beginTransaction();

        try {
            // update blog
            $blog = $this->getBlog($id);
            $blog->updated_user_id = Auth::user()->id;
            $blog->update($data);

            // update blog cover photo
            $imgParentId = $blog->id;
            $this->imageService->updateOrCreateImage($request, "cover", $imgParentId, Constants::blogCoverImgType);

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * @deprecated
     */
    public function getBlogs($relation = null, $status = null, $limit = null, $offset = null, $noPagination = null,  $pagPerPage = null, $conds = null)
    {

        $sort = '';
        if (isset($conds['order_by'])) {
            $sort = $conds['order_by'];
        }
        $blogs = Blog::select(Blog::tableName . '.*')
            ->when(isset($conds['order_by']) && $conds['order_by'], function ($q) use ($sort) {
                if ($sort == Blog::locationCityId . '@@name') {
                    $q->join(LocationCity::tableName, LocationCity::tableName . '.' . LocationCity::id, '=', Blog::locationCityId);
                    $q->select(LocationCity::tableName . '.' . LocationCity::name . ' as city_name', Blog::tableName . '.*');
                }
            })
            ->when($relation, function ($q, $relation) {
                $q->with($relation);
            })
            ->when($status, function ($q, $status) {
                $q->where(Blog::status, $status);
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
            ->when(empty($sort), function ($query, $conds) {
                $query->orderBy(Blog::tableName . '.added_date', 'desc')->orderBy(Blog::tableName . '.' . Blog::status, 'desc')->orderBy(Blog::tableName . '.' . Blog::name, 'asc');
            });
        if ($pagPerPage) {
            $blogs = $blogs->paginate($pagPerPage)->onEachSide(1)->withQueryString();
        } elseif ($noPagination) {
            $blogs = $blogs->get();
        }
        return $blogs;
    }

    /**
     * @deprecated
     */
    public function searching($query, $conds)
    {
        // search term
        if (isset($conds['searchterm']) && $conds['searchterm']) {
            $search = $conds['searchterm'];
            $query->where(function ($query) use ($search) {
                $query->where(Blog::tableName . '.' . Blog::name, 'like', '%' . $search . '%');
            });
        }

        if (isset($conds[Blog::locationCityId]) && $conds[Blog::locationCityId]) {
            $city_filter = $conds[Blog::locationCityId];
            $query->whereHas('city', function ($q) use ($city_filter) {
                $q->where(Blog::tableName . '.' . Blog::locationCityId, $city_filter);
            });
        }

        if (isset($conds['added_user_id']) && $conds['added_user_id']) {
            $query->where(Blog::tableName . '.' . Blog::addedUserId, $conds['added_user_id']);
        }


        // order by
        if (isset($conds['order_by']) && isset($conds['order_type']) && $conds['order_by'] && $conds['order_type']) {

            if ($conds['order_by'] == 'id') {
                $query->orderBy(Blog::tableName . '.' . Blog::id, $conds['order_type']);
            } else {
                $query->orderBy($conds['order_by'], $conds['order_type']);
            }
        }

        return $query;
    }

    /**
     * @deprecated
     */
    public function getBlog($id, $relation = null)
    {
        $blog = Blog::where(Blog::id, $id)
            ->when($relation, function ($q, $relation) {
                $q->with($relation);
            })->first();
        return $blog;
    }

    /**
     * @deprecated
     */
    public function makePublishOrUnpublish($id)
    {
        $blog = Blog::find($id);
        if ($blog->status == Constants::publish) {
            $blog->status = Constants::unPublish;
        } else {
            $blog->status = Constants::publish;
        }
        $blog->updated_user_id = Auth::user()->id;
        $blog->update();

        return $blog;
    }

    /**
     * @deprecated
     */
    private function controlFieldArr()
    {
        // for control
        $controlFieldArr = [];
        $controlFieldObj = takingForColumnProps(__('core__be_action'), "action", "Action", false, 0);
        array_push($controlFieldArr, $controlFieldObj);
        return $controlFieldArr;
    }

    /**
     * @deprecated
     */
    public function index($conds, $row)
    {
        // manipulate blog data
        $relations = ['city', 'owner', 'editor'];
        $blogs = BlogWithKeyResource::collection($this->getBlogs(
            relation: $relations,
            noPagination: false,
            pagPerPage: $row,
            conds: $conds
        ));

        // taking for column and columnFilterOption
        $columnAndColumnFilter = takingForColumnAndFilterOption(Constants::blog, $this->controlFieldArr());

        // changing item arr object with new format
        $changedBlogObj = $blogs;

        $dataArr = [
            'showCoreAndCustomFieldArr' => $columnAndColumnFilter[ps_constant::handlingColumn],
            'hideShowFieldForFilterArr' => $columnAndColumnFilter[ps_constant::handlingFilter],
            'blogs' => $changedBlogObj,
            'sort_field' => $conds['order_by'],
            'sort_order' => $conds['order_type'],
            'search' => $conds['searchterm'],
        ];
        return $dataArr;
    }

    /**
     * @deprecated
     */
    public function edit($id)
    {
        $coreFieldFilterSettings = $this->coreFieldFilterSettingService->getCoreFields(withNoPag: 1, moduleName: Constants::blog);
        $dataWithRelation = ['cover', 'city'];
        $blog = $this->getBlog($id, $dataWithRelation);

        $cities = $this->locationCityService->getLocationCityList(null, Constants::publish);

        $conds = [
            'module_name' => Constants::blog,
            'enable' => 1,
            'mandatory' => 1,
            'is_core_field' => 1,
        ];

        $core_headers = CoreField::where($conds)->get();

        $validation = [];
        Log::info($core_headers);
        foreach ($core_headers as $core_header) {
            Log::info($core_header->field_name);
            if ($core_header->field_name == 'blog_photo') {
                array_push($validation, 'cover');
            }
        }

        $dataArr = [
            "blog" => $blog,
            "cities" => $cities,
            'coreFieldFilterSettings' => $coreFieldFilterSettings,
            'validation' => $validation
        ];
        return $dataArr;
    }

    /**
     * @deprecated
     */
    public function destroy($id)
    {
        $blog = Blog::find($id);

        deleteImages($this->imageService->getImages($blog->id));
        $blog->delete();

        $dataArr = [
            // "checkPermission" => $checkPermission,
            "msg" =>  __('core__be_delete_success', ['attribute' => $blog->name]),
            "flag" => Constants::success
        ];

        return $dataArr;
    }

    // for api
    /**
     * @deprecated
     */
    public function searchFromApi($request)
    {
        $defaultLimit = $this->mobileSettingService->getMobileSetting()->default_loading_limit;
        $offset = $request->offset;
        $limit = $request->limit ? $request->limit : ($defaultLimit ? $defaultLimit :  9);

        $conds['searchterm'] = $request->keyword;
        $conds['location_city_id'] = $request->location_city_id;
        $conds['order_by'] = $request->order_by;
        $conds['order_type'] = $request->order_type;

        $blogApiRelation = $this->blogApiRelation;
        $blogs = $this->getBlogs($blogApiRelation, Constants::publish, $limit, $offset, 1, null, $conds);
        $data = BlogApiResource::collection($blogs);

        $hasError = noDataError($request->offset, $data);

        if ($hasError)
            return $hasError;
        else {
            return $data;
        }
    }

    /**
     * @deprecated
     */
    public function blogByIdForFE($request)
    {
        $id = $request->id ? $request->id : $request->blogId;

        $blogApiRelation = $this->blogApiRelation;
        $blog = $this->getBlog($id, $blogApiRelation);

        if (!empty($blog)) {
            $data = new BlogApiResource($blog);
        } else {
            $data = null;
        }
        return $data;
    }


    /**
     * @deprecated
     */
    public function detailFromApi($request)
    {
        $blog = $this->blogByIdForFE($request);

        if (!$blog) {
            $response =  ['error' =>  __('core__api_record_not_found', [], $request->language_symbol), 'status' =>  Constants::noContentStatusCode];
            return responseMsgApi($response['error'], Constants::notFoundStatusCode);
        } else {
            return responseDataApi($blog);
        }
    }
}
