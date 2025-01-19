<?php

namespace Modules\Template\PSXFETemplate\Http\Controllers;

use App\Http\Contracts\Blog\BlogServiceInterface;
use App\Http\Contracts\Category\CategoryServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Blog\Transformers\Api\App\V1_0\BlogApiResource;
use Modules\Core\Constants\Constants;
use Modules\Core\Http\Services\FrontendSettingService;
use Modules\Core\Http\Services\LanguageService;
use Modules\Core\Http\Services\MobileSettingService;
use Modules\Core\Transformers\Api\App\V1_0\Category\CategoryApiResource;

class CategoryController extends Controller
{
    const parentPath = "Pages/vendor/views/";
    const categoryList = self::parentPath."category/list/CategoryList";

    protected $relation;
    public function __construct(protected FrontendSettingService $frontendSettingService,
                                protected CategoryServiceInterface $categoryService,
                                protected MobileSettingService $mobileSettingService,
                                protected LanguageService $languageService
                                )
    {
        $this->relation = ['owner', 'editor'];
    }

    public function list(Request $request){
        //for meta
        setMeta( $this->frontendSettingService->getFrontendSetting()->frontend_meta_title ?? __('site_name'),
                        $this->frontendSettingService->getFrontendSetting()->frontend_meta_description ?? null, null );
        // Get Limit and Offset
        list($limit, $offset) = $this->getLimitOffsetFromSetting($request);

        // Prepare Filter Conditions
        $conds = $this->getFilterConditions($request);

        // $row = $request->input('row') ?? Constants::dataTableDefaultRow;

        $langConds = $this->prepareLanguageData();
        $language = $this->languageService->getLanguage(null, $langConds);

        // Get Categories
        $categories = $this->categoryService->getAll(relation : $this->relation,
                    status : Constants::publish,
                    languageId: $language->id,
                    limit : $limit,
                    offset : $offset,
                    conds : $conds,
                    noPagination : false,
                    pagPerPage: null);
        $data = CategoryApiResource::collection($categories);

        // Prepare and Check No Data Return
        $hasError = noDataError( $request->offset, $data);
        if($hasError)
            $data = $hasError;

        $dataArr = [
            'categories' => $data
        ];

        return renderView(self::categoryList, $dataArr);
    }

    ////////////////////////////////////////////////////////////////////
    /// Private Functions
    ////////////////////////////////////////////////////////////////////

    ///-----------------------------------------------------------------
    // Prepare Data
    ///-----------------------------------------------------------------

    private function prepareLanguageData()
    {
        return ['symbol' => $_COOKIE['activeLanguage'] ?? 'en'];
    }

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
        $limit = $request->limit !== null ? $request->limit : ($defaultLimit ? $defaultLimit :  9);

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
