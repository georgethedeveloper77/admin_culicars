<?php

namespace Modules\Template\PSXFETemplate\Http\Controllers;

use App\Config\Cache\ItemCache;
use App\Config\ps_constant;
use App\Http\Contracts\Blog\BlogServiceInterface;
use App\Http\Contracts\Category\CategoryServiceInterface;
use App\Http\Contracts\Configuration\AdPostTypeServiceInterface;
use App\Http\Contracts\Item\ItemServiceInterface;
use App\Http\Contracts\Item\PaidItemHistoryServiceInterface;
use App\Http\Contracts\User\BlockUserServiceInterface;
use App\Http\Contracts\User\UserServiceInterface;
use App\Http\Contracts\Vendor\VendorServiceInterface;
use App\Http\Controllers\PsApiController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Modules\Blog\Entities\Blog;
use Modules\Blog\Transformers\Api\App\V1_0\BlogApiResource;
use Modules\ComplaintItem\Entities\ComplaintItem;
use Modules\ComplaintItem\Http\Services\ComplaintItemService;
use Modules\Core\Constants\Constants;
use Modules\Core\Database\Seeders\AdPostTypesTableSeeder;
use Modules\Core\Entities\Category\Category;
use Modules\Core\Entities\Configuration\SystemConfig;
use Modules\Core\Entities\Item\PaidItemHistory;
use Modules\Core\Entities\User\BlockUser;
use Modules\Core\Http\Controllers\Backend\Rests\App\V1_0\Item\ItemApiController;
use Modules\Core\Http\Facades\BackendSettingFacade;
use Modules\Core\Http\Facades\MobileSettingFacade;
use Modules\Core\Http\Facades\PsCache;
use Modules\Core\Http\Facades\SystemConfigFacade;
use Modules\Core\Http\Services\AppInfoService;
use Modules\Core\Http\Services\LandingPageService;
use Modules\Core\Http\Services\LanguageService;
use Modules\Core\Http\Services\MobileSettingService;
use Modules\Core\Http\Services\SystemConfigService;
use Modules\Core\Http\Services\UserService;
use Modules\Core\Transformers\Api\App\V1_0\Category\CategoryApiResource;
use Modules\Core\Transformers\Api\App\V1_0\Item\ItemApiResource;
use Modules\Core\Transformers\Api\App\V1_0\User\UserApiResource;
use Modules\Core\Transformers\Api\App\V1_0\Vendor\VendorApiResource;
use Modules\Payment\Http\Services\PaymentSettingService;
use Modules\Payment\Transformers\Api\App\V1_0\Payment\PackageWithPurchasedCountApiResource;

class FeDashboardController extends PsApiController
{
    const parentPath = "Pages/vendor/views/";
    const landingPage = self::parentPath."landing_page/Show";
    const dashboardPage = self::parentPath."dashboard/Dashboard";

    public function __construct(
        protected MobileSettingService $mobileSettingService,
        protected SystemConfigService $systemConfigService,
        protected ItemServiceInterface $itemService,
        protected CategoryServiceInterface $categoryService,
        protected BlogServiceInterface $blogService,
        protected LanguageService $languageService,
        protected BlockUserServiceInterface $blockUserService,
        protected ComplaintItemService $complaintItemService,
        protected AdPostTypeServiceInterface $adPostTypeService,
        protected PaidItemHistoryServiceInterface $paidItemHistoryService,
        protected PaymentSettingService $paymentSettingService,
        protected UserServiceInterface $userService,
        protected VendorServiceInterface $vendorService,
        protected AppInfoService $appInfoService,
        protected LandingPageService $landingPageService

    )
    {
        parent::__construct();
    }

    public function feDashboard()
    {
        $backendSetting = BackendSettingFacade::get();
        $feSetting = $backendSetting->fe_setting;

        //for meta
        setMeta($this->metaTitle ?? __('site_name'), $this->metaDescription ?? null, null);

        if($feSetting == 1){
            $dataArr = [
                'getAllCategorieHorizontalList' => $this->getAllCategorieHorizontalList(),
                'getAllPopularCategoryList' => $this->getAllPopularCategoryList(),
                // 'getAllBlogList' => $this->getAllBlogList(),
                // 'getAllFeatureItemHorizontalList' => $this->getAllFeatureItemHorizontalList(),
                // 'getAllRecentItemHorizontalList' => $this->getAllRecentItemHorizontalList(),
                // 'getAllPopularItemHorizontalList' => $this->getAllPopularItemHorizontalList(),
                // 'getAllDiscountItemHorizontalList' => $this->getAllDiscountItemHorizontalList(),
                // 'getAllPackageHorizontalList' => $this->getAllPackageHorizontalList(),
                // 'getAllTopSellerHorizontalList' => $this->getAllTopSellerHorizontalList(),
                // 'getAllVendorList' => $this->getAllVendorList(),
            ];
            return renderView(self::dashboardPage, $dataArr);
        }
        else{
            $dataArr = $this->landingPageService->index();
            return renderView(self::landingPage, $dataArr);
        }
    }

    public function getAllPopularCategoryList()
    {
        $isShow = getComponentInfo(ps_constant::dashboardScreenIds, ps_constant::searchAndPopularCategoryComponentIds);

        if($isShow){
            // Get Limit and Offset
            [$limit, $offset] = $this->getCategoryLimitOffsetFromSetting();

            // Prepare Filter Conditions
            $conds = $this->getCategoryFilterConditions('category_touch_count', Constants::descending);

            // Get Language
            $langConds = $this->prepareLanguageData();
            $language = $this->languageService->getLanguage(null, $langConds);

            // Get Categories
            $categories = $this->categoryService->getAll(null, Constants::publish, $language->id, $limit, $offset, $conds, null, null, $conds);
            $data = CategoryApiResource::collection($categories);

            return $this->handleNoDataResponse($offset, $data);
        }

        return responseDataApi([]);

    }

    public function getAllCategorieHorizontalList()
    {
        $isShow = getComponentInfo(ps_constant::dashboardScreenIds, ps_constant::categoryHorizontalListComponentIds);

        if($isShow){
            // Get Limit and Offset
            [$limit, $offset] = $this->getCategoryLimitOffsetFromSetting();

            // Prepare Filter Conditions
            $conds = $this->getCategoryFilterConditions(Category::name, Constants::descending);

            // Get Language
            $langConds = $this->prepareLanguageData();
            $language = $this->languageService->getLanguage(null, $langConds);

            // Get Categories
            $categories = $this->categoryService->getAll(null, Constants::publish, $language->id, $limit, $offset, $conds, null, null, $conds);
            $data = CategoryApiResource::collection($categories);

            return $this->handleNoDataResponse($offset, $data);
        }
        return responseDataApi([]);

    }

    public function getAllBlogList()
    {
        $isShow = getComponentInfo(ps_constant::dashboardScreenIds, ps_constant::blogHorizontalListComponentIds);

        if($isShow){

            // Get Limit and Offset
            [$limit, $offset] = $this->getLimitOffsetFromSetting(key: "default_loading_limit", defaultLimit: 9);

            // Prepare Filter Conditions
            $conds = $this->getCategoryFilterConditions(Blog::name, Constants::ascending);

            // Get Blogs
            $blogApiRelation = ['city', 'cover'];
            $data = BlogApiResource::collection(
                        $this->blogService->getAll(
                            relation: $blogApiRelation,
                            status: Constants::publish,
                            limit: $limit,
                            offset: $offset,
                            noPagination: Constants::yes,
                            conds: $conds
                        )
                    );

            return $data;
        }
        return responseDataApi([]);

    }

    public function getAllFeatureItemHorizontalList()
    {
        $isShow = getComponentInfo(ps_constant::dashboardScreenIds, ps_constant::featureItemHorizontalListComponentIds);

        if($isShow){
            [$limit, $offset] = $this->getLimitOffsetFromSetting(key: "featured_item_loading_limit", defaultLimit: 12);
            $loginUserId = Auth::id() ?? "nologinuser";
            $langSymbol = $this->prepareLanguageData();

            $requestData = [
                "language_symbol" => $langSymbol,
                "limit" => $limit,
                "offset" => $offset,
                "login_user_id" => $loginUserId,
                "ad_post_type" => "only_paid_item",
                "order_by" => "added_date",
                "order_type" => Constants::descending
            ];

            $request = new \Illuminate\Http\Request();
            $request->replace($requestData);

            $param = [$request ,$loginUserId, $langSymbol, $limit, $offset, $requestData];

            return PsCache::remember([ItemCache::BASE], ItemCache::GET_ALL_FE_DASHBOARD_EXPIRY, $param,
                function() use($request ,$loginUserId, $langSymbol, $limit, $offset) {
                    $data = $this->prepareItemSearchData($request ,$loginUserId, $langSymbol, $limit, $offset);
                    return $this->handleNoDataResponse($offset, $data);
            });

        }
        return responseDataApi([]);

    }

    public function getAllRecentItemHorizontalList()
    {
        $isShow = getComponentInfo(ps_constant::dashboardScreenIds, ps_constant::recentItemHorizontalListComponentIds);

        if($isShow){
            [$limit, $offset] = $this->getLimitOffsetFromSetting(key: "recent_item_loading_limit", defaultLimit: 12);
            $loginUserId = Auth::id() ?? "nologinuser";
            $langSymbol = $this->prepareLanguageData();

            $requestData = [
                "language_symbol" => $langSymbol,
                "limit" => $limit,
                "offset" => $offset,
                "login_user_id" => $loginUserId,
                "order_by" => "added_date",
                "order_type" => Constants::descending,
                "status" => Constants::publish
            ];

            $request = new \Illuminate\Http\Request();
            $request->replace($requestData);

            $param = [$request ,$loginUserId, $langSymbol, $limit, $offset, $requestData];

            return PsCache::remember([ItemCache::BASE], ItemCache::GET_ALL_FE_DASHBOARD_EXPIRY, $param,
                function() use($request ,$loginUserId, $langSymbol, $limit, $offset) {
                    $data = $this->prepareItemSearchData($request ,$loginUserId, $langSymbol, $limit, $offset);
                    return $this->handleNoDataResponse($offset, $data);
            });

        }

        return responseDataApi([]);

    }

    public function getAllPopularItemHorizontalList()
    {
        $isShow = getComponentInfo(ps_constant::dashboardScreenIds, ps_constant::popularItemHorizontalListComponentIds);

        if($isShow){
            [$limit, $offset] = $this->getLimitOffsetFromSetting(key: "popular_item_loading_limit", defaultLimit: 12);
            $loginUserId = Auth::id() ?? "nologinuser";
            $langSymbol = $this->prepareLanguageData();

            $requestData = [
                "language_symbol" => $langSymbol,
                "limit" => $limit,
                "offset" => $offset,
                "login_user_id" => $loginUserId,
                "order_by" => "item_touch_count",
                "order_type" => Constants::descending,
                "status" => Constants::publish
            ];

            $request = new \Illuminate\Http\Request();
            $request->replace($requestData);

            $param = [$request ,$loginUserId, $langSymbol, $limit, $offset, $requestData];

            return PsCache::remember([ItemCache::BASE], ItemCache::GET_ALL_FE_DASHBOARD_EXPIRY, $param,
                function() use($request ,$loginUserId, $langSymbol, $limit, $offset) {
                    $data = $this->prepareItemSearchData($request ,$loginUserId, $langSymbol, $limit, $offset);
                    return $this->handleNoDataResponse($offset, $data);
            });

        }
        return responseDataApi([]);

    }

    public function getAllDiscountItemHorizontalList()
    {
        $isShow = getComponentInfo(ps_constant::dashboardScreenIds, ps_constant::discountItemHorizontalListComponentIds);

        if($isShow){
            [$limit, $offset] = $this->getLimitOffsetFromSetting(key: "discount_item_loading_limit", defaultLimit: 12);
            $loginUserId = Auth::id() ?? "nologinuser";
            $langSymbol = $this->prepareLanguageData();

            $requestData = [
                "language_symbol" => $langSymbol,
                "limit" => $limit,
                "offset" => $offset,
                "login_user_id" => $loginUserId,
                "order_by" => "added_date",
                "order_type" => Constants::descending,
                "is_discount" => Constants::yes,
                "status" => Constants::publish
            ];

            $request = new \Illuminate\Http\Request();
            $request->replace($requestData);

            $param = [$request ,$loginUserId, $langSymbol, $limit, $offset, $requestData];

            return PsCache::remember([ItemCache::BASE], ItemCache::GET_ALL_FE_DASHBOARD_EXPIRY, $param,
                function() use($request ,$loginUserId, $langSymbol, $limit, $offset) {
                    $data = $this->prepareItemSearchData($request ,$loginUserId, $langSymbol, $limit, $offset);
                    return $this->handleNoDataResponse($offset, $data);
            });

        }
        return responseDataApi([]);

    }

    public function getAllPackageHorizontalList()
    {
        $isShow = getComponentInfo(ps_constant::dashboardScreenIds, ps_constant::packageHorizontalListComponentIds);
        if(SystemConfigFacade::get()->is_paid_app && $isShow){
            $purchasedCountData = $this->prepareDataForPurchasedCount();
            [$limit, $offset] = $this->getLimitOffsetFromSetting(key: "default_loading_limit", defaultLimit: 9);

            $data = PackageWithPurchasedCountApiResource::collection($this->paymentSettingService->getPaymentInfos($purchasedCountData['packageInAppPurchaseApiRelations'], $limit, $offset, $purchasedCountData['conds'], true, null, $purchasedCountData['attributes']));
            return $this->handleNoDataResponse($offset, $data);
        }

        return responseDataApi([]);

    }

    public function getAllTopSellerHorizontalList()
    {
        $isShow = getComponentInfo(ps_constant::dashboardScreenIds, ps_constant::topSellerHorizontalListComponentIds);

        if($isShow){
            $loginUserId = Auth::id() ?? "nologinuser";
            $langSymbol = $this->prepareLanguageData();
            $offset = 0;
            $limit = 6;
            $requestData = [
                "language_symbol" => $langSymbol,
                "limit" => $limit,
                "offset" => $offset,
                "login_user_id" => $loginUserId,
            ];

            $request = new \Illuminate\Http\Request();
            $request->replace($requestData);
            $data = UserApiResource::collection($this->userService->getAll(isTopRatedSeller: Constants::yes, limit: $limit, offset: $offset));
            return $this->handleNoDataResponse($offset, $data);
        }

        return responseDataApi([]);

    }

    public function getAllVendorList()
    {
        $isShow = getComponentInfo(ps_constant::dashboardScreenIds, ps_constant::topSellerHorizontalListComponentIds);

        if(BackendSettingFacade::get()->vendor_setting && $isShow){
            // Get Limit and Offset
            $limit = 10;
            $offset = 0;

            $loginUserId = Auth::id() ?? "nologinuser";
            $langSymbol = $this->prepareLanguageData();

            $requestData = [
                "language_symbol" => $langSymbol,
                "limit" => $limit,
                "offset" => $offset,
                "login_user_id" => $loginUserId,
                "order_by" => "added_date",
                "order_type" => Constants::descending
            ];

            $request = new \Illuminate\Http\Request();
            $request->replace($requestData);

            // Prepare Filter Conditions
            $vendors = $this->vendorService->getAll(
                            status: Constants::vendorAcceptStatus,
                            limit: $limit,
                            offset: $offset
                        );

            $data = VendorApiResource::collection($vendors);

            return $this->handleNoDataResponse($offset, $data);
        }
        return responseDataApi([]);

    }

    public function getAppInfo()
    {
        $appInfo = $this->appInfoService->indexFromApi();
        return $appInfo;
    }

    ////////////////////////////////////////////////////////////////////
    /// Private Functions
    ////////////////////////////////////////////////////////////////////

    ///-----------------------------------------------------------------
    // Prepare Data
    ///-----------------------------------------------------------------

    private function prepareDataForPurchasedCount()
    {
        $userId = Auth::id() ?? "nologinuser";

        $packageInAppPurchaseApiRelations = ['payment', 'purchased_count', 'payment_info'];

        $conds = [
            'payment_id' => Constants::packageInAppPurchasePaymentId,
            'status' => 1,
        ];

        $attributes = [
            Constants::pmtAttrPackageIapTypeCol,
            Constants::pmtAttrPackageIapCountCol,
            Constants::pmtAttrPackageIapPriceCol,
            Constants::pmtAttrPackageIapStatusCol,
            Constants::pmtAttrPackageIapCurrencyCol
        ];
        return [
            'packageInAppPurchaseApiRelations' => $packageInAppPurchaseApiRelations,
            'attributes' => $attributes,
            'conds' => $conds,
        ];
    }

    private function prepareItemSearchData($request, $loginUserId, $langSymbol, $limit, $offset)
    {
        $systemConfig = $this->systemConfigService->getSystemConfig();
        $interval = $systemConfig->promo_cell_interval_no;

        if ($systemConfig->is_block_user == 1) {
            $blockUserids = $this->blockUserService->getAll(
                conds: [BlockUser::fromBlockUserId => $loginUserId]
            )->pluck(BlockUser::toBlockUserId)->toArray();
        }

        $complaintItemIds = $this->complaintItemService->getComplaintItems(
            reportedUserId: $loginUserId,
            noPagination: Constants::yes
        )->pluck('item_id')->toArray();

        // $activeLanguage = $this->getActiveLanguage($langSymbol);

        $itemApiRelation = ['vendor', 'category.categoryLanguageString', 'subcategory', 'city', 'township', 'currency', 'owner', 'itemRelation', 'cover', 'video', 'icon'];

        $ad_post_type = $this->getAdPostType($request, $systemConfig);

        // Sorting
        $sorting = [];
        if(!empty($request->input('order_by')) && !empty($request->input('order_type'))){
            $sorting = [
                $request->input('order_by') => $request->input('order_type')
            ];
        }

        // Filters
        $filters = [
           'keyword' => $request->input('searchterm'),
           'category_id' => $request->input('cat_id'),
           'subcategory_id' => $request->input('sub_cat_id'),
           'currency_id' => $request->input('item_currency_id'),
           'location_city_id' => $request->input('item_location_id'),
           'location_township_id' => $request->input('item_location_township_id'),
           'max_price' => $request->input('max_price'),
           'min_price' => $request->input('min_price'),
           'lat' => $request->input('lat'),
           'lng' => $request->input('lng'),
           'miles' => $request->input('miles'),
           'added_user_id' => $request->input('added_user_id'),
           'status' => $request->input('status'),
           'is_sold_out' => $request->input('is_sold_out'),
           'is_discount' => $request->input('is_discount'),
           'vendor_id' => $request->input('vendor_id'),
           'product_relation' => $request->input('product_relation'),
        ];

        $filtersNotIn = [
            'blockUserIds_not_in' => $blockUserids ?? [],
            'complaintItemIds_not_in' => $complaintItemIds
        ];

        $paidItemFilters = $this->prepareGetPaidItemFilterData($filters);
        $normalItemFiltersNotIn = $this->prepareGetNormalItemNotFilterData($filtersNotIn);

        if ($ad_post_type == Constants::onlyPaidItemAdType) {

            $items = $this->itemService->getAll($itemApiRelation, $paidItemFilters, $sorting, $limit, $offset, Constants::yes, $filtersNotIn);

        } else if ($ad_post_type == Constants::normalAdsOnlyAdType) {

            $items = $this->itemService->getAll($itemApiRelation, $filters, $sorting, $limit, $offset, Constants::yes, $normalItemFiltersNotIn);

        } else if ($ad_post_type == Constants::paidItemFirstAdType) {
            $paidItems = $this->itemService->getAll($itemApiRelation, $paidItemFilters, $sorting, $limit, $offset, Constants::yes, $filtersNotIn);
            $limit = $this->prepareSponsoredFirstData($itemApiRelation, $paidItemFilters, $sorting, $limit, $offset, $filtersNotIn, $paidItems->count());

            $normalItems = $this->itemService->getAll($itemApiRelation, $filters, $sorting, $limit, $offset, Constants::yes, $normalItemFiltersNotIn);

            if ($paidItems->count() > 0) {
                $items = $paidItems->merge($normalItems);
            } else {
                $items = $normalItems;
            }

        } else if ($ad_post_type == Constants::googleAdsBetweenAdType) {
            $items = $this->prepareGoogleAdBetweenNormalAdData($itemApiRelation, $filters, $sorting, $limit, $offset, $normalItemFiltersNotIn, $interval);
        } else if ($ad_post_type == Constants::bumpsUpsBetweenAdType) {

            $items = $this->prepareSponsoredAdBetweenNormalAdData($itemApiRelation, $filters, $paidItemFilters, $sorting, $limit, $offset, $filtersNotIn, $normalItemFiltersNotIn, $interval);

        } else if ($ad_post_type == Constants::bumbsAndGoogleAdsBetweenAdType) {
            $items = $this->prepareSponsoredAndGoogleAdBetweenNormalAdAltData($itemApiRelation, $filters, $paidItemFilters, $sorting, $limit, $offset, $filtersNotIn, $normalItemFiltersNotIn, $interval);

        } else if ($ad_post_type == Constants::paidItemFirstWithGoogleAdType) {
            $paidItems = $this->itemService->getAll($itemApiRelation, $paidItemFilters, $sorting, $limit, $offset, Constants::yes, $filtersNotIn);

            $limit = $this->prepareSponsoredFirstData($itemApiRelation, $paidItemFilters, $sorting, $limit, $offset, $filtersNotIn, $paidItems->count());

            $items = array();
            foreach ($paidItems as $paidItem) {
                array_push($items, $paidItem);
            }

            $googleAdBetweenNormalAdItems = $this->prepareGoogleAdBetweenNormalAdData($itemApiRelation, $filters, $sorting, $limit, $offset, $normalItemFiltersNotIn, $interval);

            $items = array_merge($items, $googleAdBetweenNormalAdItems);
        }
        $items = collect($items)->filter(function($obj){
            return !empty($obj->id);
        });

        return ItemApiResource::collection($items);
    }

    private function prepareGetNormalItemNotFilterData($filtersNotIn)
    {
        $paidItemIds = $this->getPaidItemHistoryIds();

        $filtersNotIn['id'] = $paidItemIds;

        return $filtersNotIn;
    }

    private function prepareSponsoredFirstData($itemApiRelation, $paidItemFilters, $sorting, $limit, $offset, $filtersNotIn, $paidItemCount)
    {

        if (!empty($limit) && !empty($offset)) {
            if ($paidItemCount < $limit) {
                $limit = $limit - $paidItemCount;
                $paid = $this->itemService->getAll($itemApiRelation, $paidItemFilters, $sorting, $limit, null, Constants::yes, $filtersNotIn);

                $offset = max(0, $offset - $paid->count());
            }
        } else if (!empty($limit)) {
            $limit = $limit - $paidItemCount;
        }

        return $limit;

    }

    private function prepareGoogleAdBetweenNormalAdData($itemApiRelation, $filters, $sorting, $limit, $offset, $normalItemFiltersNotIn, $interval)
    {
        $items = array();
        $dataLimit = $this->getLimitForAdPostType($limit, $offset, $interval, Constants::paidItemFirstWithGoogleAdType);
        $normalLimit = $dataLimit['normalLimit'];
        $normalOffset = $dataLimit['normalOffset'];

        $googleItem = new \stdClass;
        $googleItem->ad_type = Constants::googleAd;

        $normalItems = $this->itemService->getAll($itemApiRelation, $filters, $sorting, $normalLimit, $normalOffset, Constants::yes, $normalItemFiltersNotIn);

        $normalItemsIndex = 0;


        $total = $normalItems->count() ? $normalItems->count() : 0;
        if ($total != 0) {
            for ($x = 0; $x < count($dataLimit['exampleOutput']); $x++) {
                if ($dataLimit['exampleOutput'][$x] == 'one' && $normalItemsIndex < $normalItems->count() && $normalItems->count() > 0) {
                    array_push($items, $normalItems[$normalItemsIndex]);
                    if (($normalItemsIndex + 1) >= $total) {
                        if (isset($dataLimit['exampleOutput'][$x + 1])) {
                            if ($dataLimit['exampleOutput'][$x + 1] != 'zero') {
                                break;
                            }
                        } else {
                            break;
                        }
                    }
                    $normalItemsIndex = $normalItemsIndex + 1;
                } else {
                    array_push($items, $googleItem);
                    if ($normalItemsIndex >= $total) {
                        break;
                    }
                }
            }
        }
        return $items;
    }

    private function prepareSponsoredAdBetweenNormalAdData($itemApiRelation, $filters, $paidItemFilters, $sorting, $limit, $offset, $filtersNotIn, $normalItemFiltersNotIn, $interval)
    {
        $dataLimit = $this->getLimitForAdPostType($limit, $offset, $interval, Constants::bumpsUpsBetweenAdType);
        $normalLimit = $dataLimit['normalLimit'];
        $paidLimit = $dataLimit['paidLimit'];
        $normalOffset = $dataLimit['normalOffset'];
        $paidOffset = $dataLimit['paidOffset'];

        $paidItems = $this->itemService->getAll($itemApiRelation, $paidItemFilters, $sorting, $paidLimit, $paidOffset, Constants::yes, $filtersNotIn);

        if ($paidItems->count() == 0) {
            $normalLimit = $normalLimit + $paidLimit;
            $normalOffset = $normalOffset + $paidOffset;

            $tempPaidItems = $this->itemService->getAll($itemApiRelation, $paidItemFilters, $sorting, $offset, 0, Constants::yes, $filtersNotIn);

            $exampleArray = $dataLimit['exampleArray'];
            $exampleArray_count = array_count_values($exampleArray);
            $dataArr['normalOffset'] = ($exampleArray_count['zero'] - $tempPaidItems->count()) + $normalOffset;
        } else if ($paidItems->count() < $paidLimit) {
            $paid = $this->itemService->getAll($itemApiRelation, $paidItemFilters, $sorting, $paidLimit, null, Constants::yes, $filtersNotIn);

            $normalLimit = $normalLimit + ($paidLimit - $paidItems->count());
            if ($paidItems->count() < $paidOffset) {
                $normalOffset = $normalOffset + ($paidOffset - $paid->count());
            }
        }
        $normalItems = $this->itemService->getAll($itemApiRelation, $filters, $sorting, $normalLimit, $normalOffset, Constants::yes, $normalItemFiltersNotIn);

        $normalItemsIndex = 0;
        $paidIndex = 0;
        $items = array();
        for ($x = 0; $x < count($dataLimit['exampleOutput']); $x++) {

            if (($dataLimit['exampleOutput'][$x] == 'one' || $paidIndex + 1 > $paidItems->count()) && $normalItemsIndex < $normalItems->count() && $normalItems->count() > 0) {
                array_push($items, $normalItems[$normalItemsIndex]);
                $normalItemsIndex = $normalItemsIndex + 1;
            } else if ($paidItems->count() != 0 && $paidIndex < $paidItems->count()) {
                array_push($items, $paidItems[$paidIndex]);
                $paidIndex = $paidIndex + 1;
            } else if ($normalItemsIndex < $normalItems->count() && $normalItems->count() > 0) {
                array_push($items, $normalItems[$normalItemsIndex]);
                $normalItemsIndex = $normalItemsIndex + 1;
            }
        }
        return $items;
    }

    private function prepareSponsoredAndGoogleAdBetweenNormalAdAltData($itemApiRelation, $filters, $paidItemFilters, $sorting, $limit, $offset, $filtersNotIn, $normalItemFiltersNotIn, $interval)
    {
        $dataLimit = $this->getLimitForAdPostType($limit, $offset, $interval, Constants::bumbsAndGoogleAdsBetweenAdType);
        $normalLimit = $dataLimit['normalLimit'];
        $paidLimit = $dataLimit['paidLimit'] / 2;
        $normalOffset = $dataLimit['normalOffset'];
        $paidOffset = $dataLimit['paidOffset'];

        $paidItems = $this->itemService->getAll($itemApiRelation, $paidItemFilters, $sorting, $paidLimit, $paidOffset, Constants::yes, $filtersNotIn);
        $normalItems = $this->itemService->getAll($itemApiRelation, $filters, $sorting, $normalLimit, $normalOffset, Constants::yes, $normalItemFiltersNotIn);

        $googleItem = new \stdClass;
        $googleItem->ad_type = Constants::googleAd;

        $total = $normalItems->count() ? $normalItems->count() : 0;
        $total = $paidItems->count() ? $paidItems->count() + $total : $total;

        $items = array();

        $havepaid = $paidItems->count() > 0 ? 1 : 0;

        $normalItemsIndex = 0;
        $paidIndex = 0;
        $showGoogle = false;
        if ($total != 0) {
            for ($x = 0; $x < count($dataLimit['exampleOutput']); $x++) {
                if ($dataLimit['exampleOutput'][$x] == 'one'  && $normalItemsIndex < $normalItems->count() && $normalItems->count() > 0) {
                    array_push($items, $normalItems[$normalItemsIndex]);

                    $normalItemsIndex = $normalItemsIndex + 1;
                    if (($normalItemsIndex + $paidIndex + $havepaid) >= $total) {
                        if (isset($dataLimit['exampleOutput'][$x + 1])) {
                            if ($dataLimit['exampleOutput'][$x + 1] != 'zero') {
                                break;
                            }
                        } else {
                            break;
                        }
                    }
                } else if ($showGoogle == false && $paidIndex < $paidItems->count() && $paidItems->count() > 0) {
                    array_push($items, $paidItems[$paidIndex]);
                    $paidIndex = $paidIndex + 1;
                    $showGoogle = !$showGoogle;
                    if ($normalItemsIndex + $paidIndex >= $total) {
                        break;
                    }
                } else {
                    array_push($items, $googleItem);
                    $showGoogle = !$showGoogle;
                    if ($normalItemsIndex + $paidIndex >= $total) {
                        break;
                    }
                }
            }
        }
        return $items;
    }

    private function getLimitForAdPostType($limit = null, $offset = 0, $interval = null, $ad_post_type = null)
    {

        $total_limit = $limit + $offset;
        $exampleArray = [];
        $tempInterval = $interval;
        for ($i = 1; $i <= $total_limit; $i++) {
            if ($i > $tempInterval) {
                array_push($exampleArray, 'zero');
                $tempInterval = $i + $interval;
            } else {
                array_push($exampleArray, 'one');
            }
        }
        $example_output = array_slice($exampleArray, $offset);
        $exampleArray_count = array_count_values($exampleArray);
        $example_count = array_count_values($example_output);

        $dataArr['normalOffset'] = $exampleArray_count['one'] - $example_count['one'];
        $dataArr['paidOffset'] = $exampleArray_count['zero'] - $example_count['zero'];

        $dataArr['normalLimit'] = $example_count['one'];
        $dataArr['paidLimit'] = $example_count['zero'];
        $dataArr['exampleOutput'] = $example_output;
        $dataArr['exampleArray'] = $exampleArray;

        return $dataArr;
    }

    private function prepareGetPaidItemFilterData($filters)
    {
        $filters['is_paid'] = Constants::yes;
        $filters['paid_item_histories_timestamp'] = $this->getTodayDateTimeStamp();
        $filters['paid_item_histories_deleted_at'] = null;

        return $filters;
    }

    private function prepareLanguageData()
    {
        return ['symbol' => $_COOKIE['activeLanguage'] ?? 'en'];
    }

    private function getCategoryFilterConditions($orderBy, $orderType)
    {
        return [
            'order_by' => $orderBy,
            'order_type' => $orderType,
        ];
    }

    //-------------------------------------------------------------------
    // Database
    //-------------------------------------------------------------------

    private function getLimitOffsetFromSetting($key, $defaultLimit)
    {
        $offset = 0;
        $limit = $this->mobileSettingService->getMobileSetting()->{$key} ?? $defaultLimit;

        return [$limit, $offset];
    }

    private function getCategoryLimitOffsetFromSetting()
    {
        $offset = 0;
        $limit = $this->mobileSettingService->getMobileSetting()->category_loading_limit ?? 6;

        return [$limit, $offset];
    }

    private function getPaidItemHistoryIds()
    {
        return $this->paidItemHistoryService->getAll(
            status: Constants::publish,
            startTimeStamp: $this->getTodayDateTimeStamp(),
            endTimestamp: $this->getTodayDateTimeStamp()
        )->pluck(PaidItemHistory::itemId)->toArray();
    }


    // private function getActiveLanguage($langSymbol)
    // {
    //     $langConds = ['symbol' => $langSymbol ?? 'en'];
    //     return $this->languageService->getLanguage(null, $langConds);
    // }

    private function getAdPostType($request, $systemConfig)
    {
        $adPostTypes = $this->adPostTypeService->getAll()->pluck("key")->toArray();
        $adPostType = $this->adPostTypeService->get($systemConfig->ad_type)->key;
        $requestAdPostType = $request->input('ad_post_type');

        if (empty($requestAdPostType)) {
            return $adPostType;
        }

        if (in_array($requestAdPostType, $adPostTypes)) {
            return $requestAdPostType;
        }

        if ($requestAdPostType == Constants::onlyPaidItemAdType || $requestAdPostType == Constants::paidItemFirstWithGoogleAdType) {
            return $requestAdPostType;
        }
    }

    //-------------------------------------------------------------------
    // Other
    //-------------------------------------------------------------------

    private function getTodayDateTimeStamp()
    {
        // will update 5 minutes apart
        $today = Carbon::now()->minute((int) (Carbon::now()->minute / 5) * 5)->second(0);
        return strtotime($today->toDateTimeString());
    }




}
