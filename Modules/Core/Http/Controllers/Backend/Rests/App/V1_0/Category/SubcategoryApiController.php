<?php

namespace Modules\Core\Http\Controllers\Backend\Rests\App\V1_0\Category;

use Illuminate\Http\Request;
use Modules\Core\Constants\Constants;
use App\Http\Controllers\PsApiController;
use Modules\Core\Http\Services\MobileSettingService;
use App\Http\Contracts\Category\SubcategoryServiceInterface;
use Modules\Core\Transformers\Api\App\V1_0\Category\SubcategoryApiResource;

class SubcategoryApiController extends PsApiController
{
    public function __construct(protected SubcategoryServiceInterface $subcategoryService,
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

        // Get Categories
        $subcategories = $this->subcategoryService->getAll(null, Constants::publish, $limit, $offset, $conds, Constants::yes, null);
        $data = SubcategoryApiResource::collection($subcategories);

        // Prepare and Check No Data Return
        return $this->handleNoDataResponse($request->offset, $data);
    }

    ////////////////////////////////////////////////////////////////////
    /// Private Functions
    ////////////////////////////////////////////////////////////////////

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
            'category_id' => $request->category_id,
            'order_by' => $request->order_by,
            'order_type' => $request->order_type,
        ];
    }
}
