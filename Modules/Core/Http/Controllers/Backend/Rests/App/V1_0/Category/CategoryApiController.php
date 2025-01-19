<?php

namespace Modules\Core\Http\Controllers\Backend\Rests\App\V1_0\Category;

use Illuminate\Http\Request;
use Modules\Core\Constants\Constants;
use App\Http\Controllers\PsApiController;
use Modules\Core\Http\Services\LanguageService;
use Modules\Core\Http\Services\MobileSettingService;
use App\Http\Contracts\Category\CategoryServiceInterface;
use Modules\Core\Transformers\Api\App\V1_0\Category\CategoryApiResource;

class CategoryApiController extends PsApiController
{
    public function __construct(protected CategoryServiceInterface $categoryService,
        protected LanguageService $languageService,
        protected MobileSettingService $mobileSettingService)
    {
        parent::__construct();
    }

    public function search(Request $request)
    {
        // Get Limit and Offset
        [$limit, $offset] = $this->getLimitOffsetFromSetting($request);

        // Prepare Filter Conditions
        $conds = $this->getFilterConditions($request);

        // Get Language
        $langConds = $this->prepareLanguageData($request);
        $language = $this->languageService->getLanguage(null, $langConds);

        // Get Categories
        $categories = $this->categoryService->getAll(null, Constants::publish, $language->id, $limit, $offset, $conds, null, null, $conds);
        $data = CategoryApiResource::collection($categories);

        // Prepare and Check No Data Return
        return $this->handleNoDataResponse($request->offset, $data);
    }

    ////////////////////////////////////////////////////////////////////
    /// Private Functions
    ////////////////////////////////////////////////////////////////////

    ///-----------------------------------------------------------------
    // Prepare Data
    ///-----------------------------------------------------------------
    private function prepareLanguageData($languageData)
    {
        return ['symbol' => $languageData->language_symbol ?? 'en'];
    }

    ///-----------------------------------------------------------------
    // Prepare Data
    ///-----------------------------------------------------------------
    private function getLimitOffsetFromSetting($request)
    {
        $offset = $request->offset;
    $limit = $request->limit ?: $this->getDefaultLimit();

        return [$limit, $offset];
    }

    private function getDefaultLimit()
    {
        $defaultLimit = $this->mobileSettingService->getMobileSetting()->default_loading_limit;

        return $defaultLimit ?: 9;
    }

    private function getFilterConditions($request)
    {
        return [
            'searchterm' => $request->keyword,
            'order_by' => $request->order_by,
            'order_type' => $request->order_type,
        ];
    }
}
