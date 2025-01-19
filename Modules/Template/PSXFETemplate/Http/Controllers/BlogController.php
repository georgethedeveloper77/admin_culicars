<?php

namespace Modules\Template\PSXFETemplate\Http\Controllers;

use App\Http\Contracts\Blog\BlogServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Blog\Transformers\Api\App\V1_0\BlogApiResource;
use Modules\Core\Constants\Constants;
use Modules\Core\Http\Services\FrontendSettingService;
use Modules\Core\Http\Services\MobileSettingService;

class BlogController extends Controller
{
    const parentPath = "Pages/vendor/views/";
    const blogListPage = self::parentPath."blog/list/BlogList";
    const blogDetailPage = self::parentPath."blog/detail/BlogDetail";

    protected $blogApiRelation;
    public function __construct(protected FrontendSettingService $frontendSettingService,
                                protected BlogServiceInterface $blogService,
                                protected MobileSettingService $mobileSettingService)
    {
        $this->blogApiRelation = ['city', 'cover'];
    }

    public function list(Request $request){
        //for meta
        setMeta( $this->frontendSettingService->getFrontendSetting()->frontend_meta_title ?? __('site_name'),
                        $this->frontendSettingService->getFrontendSetting()->frontend_meta_description ?? null, null );

        // Get Limit and Offset
        list($limit, $offset) = $this->getLimitOffsetFromSetting($request);

        // Prepare Filter Conditions
        $conds = $this->getFilterConditions($request);

        // Get Blogs 
        $blogs = $this->blogService->getAll($this->blogApiRelation, Constants::publish, $limit, $offset, 1, null, $conds);
        $data = BlogApiResource::collection($blogs);

        // Prepare and Check No Data Return
        $hasError = noDataError( $request->offset, $data);
        if($hasError)
            $data = $hasError;

        $dataArr = [
            'blogs' => $data
        ];

        return renderView(self::blogListPage, $dataArr);
    }

    public function detail(Request $request){
        // Get Blog Id
        $id = $this->getBlogId($request);
        if(empty($id)) {
            return abort(404);
        }

        // Get Blog
        $blog = $this->blogService->get($id, $this->blogApiRelation);
        if(empty($blog)) {
            return abort(404);
        }

        // Prepare For Meta
        $image =[
            'img_parent_id' => $request->blogId,
            'img_type' => 'blog'
        ];
        setMeta($blog->name, $blog->description, $image);

        // Wrap with Resource
        $dataArr = [
            'blog' => new BlogApiResource($blog)
        ];

        return renderView(self::blogDetailPage, $dataArr);
    }

    ////////////////////////////////////////////////////////////////////
    /// Private Functions
    ////////////////////////////////////////////////////////////////////
    private function getBlogId($request) {
        if(isset($request->id))
            return $request->id;

        else if(isset($request->blogId))
            return $request->blogId;

        else
            return '';
    }

    private function getLimitOffsetFromSetting($request) {
        $defaultLimit = $this->mobileSettingService->getMobileSetting()->default_loading_limit;
        $offset = $request->offset;
        $limit = $request->limit ? $request->limit : ($defaultLimit ? $defaultLimit :  9);
        return array($limit, $offset);
    }

    private function getFilterConditions($request) {
        return [
            'searchterm' => $request->keyword,
            'location_city_id' => $request->location_city_id,
            'order_by' => $request->order_by,
            'order_type' => $request->order_type
        ];
    }
}
