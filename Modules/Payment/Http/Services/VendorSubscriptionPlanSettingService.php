<?php

namespace Modules\Payment\Http\Services;

use App\Config\ps_constant;
use App\Http\Services\PsService;
use Illuminate\Support\Facades\DB;
use Modules\Core\Entities\CoreKey;
use Illuminate\Support\Facades\Auth;
use Modules\Core\Constants\Constants;
use Modules\Core\Entities\Utilities\CustomField;
use Modules\Payment\Entities\PaymentInfo;
use Modules\Core\Http\Services\CoreKeyService;
use Modules\Payment\Entities\PaymentAttribute;
use Modules\Core\Entities\Utilities\CoreField;
use Modules\Core\Entities\Utilities\DynamicColumnVisibility;
use Modules\Payment\Entities\CoreKeyPaymentRelation;
use Modules\Core\Http\Services\AvailableCurrencyService;
use Modules\Core\Http\Services\UserAccessApiTokenService;
use Modules\Payment\Transformers\Api\App\V1_0\Payment\PackageWithPurchasedCountApiResource;
use Modules\Payment\Transformers\Api\App\V1_0\Payment\PackageInAppPurchaseSettingApiResource;
use Modules\Payment\Transformers\Api\App\V1_0\Payment\VendorSubscriptionPlanSettingApiResource;
use Modules\Payment\Transformers\Backend\NoModel\PackageInAppPurchase\PackageInAppPurchaseWithKeyResource;
use Modules\Payment\Transformers\Backend\NoModel\VendorSubscriptionPlan\VendorSubscriptionPlanWithKeyResource;

/**
 * @deprecated
 */

class VendorSubscriptionPlanSettingService extends PsService
{
    protected $customUiIsDelCol, $customUiEnableCol, $pmtAttrPackageIapPriceCol, $iapTypeAndroid, $iapTypeIOS, $dangerFlag, $successFlag, $noContentStatusCode, $successStatus, $packageInAppPurchasePaymentId, $paymentInfoIdCol, $paymentInfoCoreKeysIdCol, $paymentInfoPaymentIdCol, $paymentInfoValueCol, $publish, $unPublish, $coreKeyPaymentRelationService, $paymentService, $inAppPurchaseSetting, $coreKeyService, $code, $paymentSettingService, $inAppPurchaseApiRelations, $pmtAttrPackageIapTypeCol, $pmtAttrPackageIapCountCol, $paymentAttributeService, $packageInAppPurchaseApiRelations, $availableCurrencyService, $pmtAttrPackageIapStatusCol, $pmtAttrPackageIapCurrencyCol,  $deviceTokenParaApi, $loginUserIdParaApi, $userAccessApiTokenService, $forbiddenStatusCode, $hide, $show, $coreFieldFilterModuleNameCol, $coreFieldFilterIdCol, $screenDisplayUiKeyCol, $screenDisplayUiIdCol, $screenDisplayUiIsShowCol;

    public function __construct(UserAccessApiTokenService $userAccessApiTokenService, CoreKeyPaymentRelationService $coreKeyPaymentRelationService, PaymentService $paymentService, CoreKeyService $coreKeyService, PaymentSettingService $paymentSettingService, PaymentAttributeService $paymentAttributeService, AvailableCurrencyService $availableCurrencyService)
    {
        $this->paymentInfoIdCol = PaymentInfo::id;
        $this->paymentInfoCoreKeysIdCol = PaymentInfo::coreKeysId;
        $this->paymentInfoPaymentIdCol = PaymentInfo::paymentId;
        $this->paymentInfoValueCol = PaymentInfo::value;

        $this->customUiEnableCol = CustomField::enable;
        $this->customUiIsDelCol = CustomField::isDelete;

        $this->publish = Constants::publish;
        $this->unPublish = Constants::unPublish;
        $this->packageInAppPurchasePaymentId = Constants::packageInAppPurchasePaymentId;
        $this->packageInAppPurchasePaymentId = Constants::packageInAppPurchasePaymentId;
        $this->code = Constants::payment;
        $this->pmtAttrPackageIapTypeCol = Constants::pmtAttrPackageIapTypeCol;
        $this->pmtAttrPackageIapCountCol = Constants::pmtAttrPackageIapCountCol;
        $this->pmtAttrPackageIapPriceCol = Constants::pmtAttrPackageIapPriceCol;
        $this->pmtAttrPackageIapStatusCol = Constants::pmtAttrPackageIapStatusCol;
        $this->pmtAttrPackageIapCurrencyCol = Constants::pmtAttrPackageIapCurrencyCol;

        $this->coreKeyPaymentRelationService = $coreKeyPaymentRelationService;
        $this->paymentService = $paymentService;
        $this->coreKeyService = $coreKeyService;
        $this->paymentSettingService = $paymentSettingService;
        $this->paymentAttributeService = $paymentAttributeService;
        $this->availableCurrencyService = $availableCurrencyService;

        $this->inAppPurchaseApiRelations = ['payment', 'core_key', 'payment_attributes'];

        $this->packageInAppPurchaseApiRelations = ['payment', 'core_key', 'payment_info'];

        $this->noContentStatusCode = Constants::noContentStatusCode;
        $this->successStatus = Constants::successStatus;
        $this->forbiddenStatusCode = Constants::forbiddenStatusCode;

        $this->userAccessApiTokenService = $userAccessApiTokenService;
        $this->loginUserIdParaApi = ps_constant::loginUserIdParaFromApi;
        $this->deviceTokenParaApi = ps_constant::deviceTokenKeyFromApi;

        $this->show = Constants::show;
        $this->hide = Constants::hide;
        $this->enable = Constants::enable;
        $this->disable = Constants::disable;
        $this->delete = Constants::delete;
        $this->unDelete = Constants::unDelete;
        $this->successFlag = Constants::success;
        $this->dangerFlag = Constants::danger;

        $this->dropDownUi = Constants::dropDownUi;
        $this->textUi = Constants::textUi;
        $this->radioUi = Constants::radioUi;
        $this->checkBoxUi = Constants::checkBoxUi;
        $this->dateTimeUi = Constants::dateTimeUi;
        $this->textAreaUi = Constants::textAreaUi;
        $this->numberUi = Constants::numberUi;
        $this->multiSelectUi = Constants::multiSelectUi;
        $this->imageUi = Constants::imageUi;
        $this->timeOnlyUi = Constants::timeOnlyUi;
        $this->dateOnlyUi = Constants::dateOnlyUi;

        $this->coreFieldFilterModuleNameCol = CoreField::moduleName;
        $this->coreFieldFilterIdCol = CoreField::id;

        $this->screenDisplayUiKeyCol = DynamicColumnVisibility::key;
        $this->screenDisplayUiIdCol = DynamicColumnVisibility::id;
        $this->screenDisplayUiIsShowCol = DynamicColumnVisibility::isShow;

        $this->iapTypeAndroid = Constants::iapTypeAndroid;
        $this->iapTypeIOS = Constants::iapTypeIOS;
    }

    public function index($request)
    {

        $code = $this->code;

        // Search and filter
        $conds['searchterm'] = $request->input('search') ?? '';
        $conds['duration'] = $request->input('type_filter') == 'all' ? null  : $request->type_filter;
        $conds['currency_id'] = $request->input('currency_filter') == 'all' ? null  : $request->currency_filter;

        $conds['order_by'] = null;
        $conds['order_type'] = null;
        $row = $request->input('row') ?? Constants::dataTableDefaultRow;

        if ($request->sort_field) {
            $conds['order_by'] = $request->sort_field;
            $conds['order_type'] = $request->sort_order;
        }

        $conds['payment_id'] = Constants::vendorSubscriptionPlanPaymentId;
        $relations = ['core_key'];
        $attributes = [
            Constants::pmtAttrVendorSpDurationCol,
            Constants::pmtAttrVendorSpSalePriceCol,
            Constants::pmtAttrVendorSpDiscountPriceCol,
            Constants::pmtAttrVendorSpCurrencyCol,
            Constants::pmtAttrVendorSpIsMostPopularPlanCol,
            Constants::pmtAttrVendorSpStatusCol,
        ];
        $vendorSubscriptionPlans = VendorSubscriptionPlanWithKeyResource::collection($this->paymentSettingService->getPaymentInfos($relations, null, null, $conds, false, $row, $attributes));
        $currencies = $this->availableCurrencyService->getAvailableCurrencies($this->publish);

        $durations = [
            [
                'id' => Constants::vendorSpOneMonth,
                'name' => Constants::vendorSpOneMonth,
            ],
            [
                'id' => Constants::vendorSpSixMonths,
                'name' => Constants::vendorSpSixMonths,
            ],
            [
                'id' => Constants::vendorSpOneYear,
                'name' => Constants::vendorSpOneYear,
            ],
        ];

        // taking for column and columnFilterOption
        $columnAndColumnFilter = $this->takingForColumnAndFilterOption();
        $columnProps = $columnAndColumnFilter['arrForColumnProps'];
        $columnFilterOptionProps = $columnAndColumnFilter['arrForColumnFilterProps'];

        if ($conds['order_by']) {
            $dataArr = [
                'showCoreAndCustomFieldArr' => $columnProps,
                'hideShowFieldForFilterArr' => $columnFilterOptionProps,
                "vendorSubscriptionPlans" => $vendorSubscriptionPlans,
                "durationKey" => Constants::pmtAttrVendorSpDurationCol,
                "salePriceKey" => Constants::pmtAttrVendorSpSalePriceCol,
                "discountPriceKey" => Constants::pmtAttrVendorSpDiscountPriceCol,
                "currencyKey" => Constants::pmtAttrVendorSpCurrencyCol,
                "isMostPopularPlanKey" => Constants::pmtAttrVendorSpIsMostPopularPlanCol,
                "statusKey" => Constants::pmtAttrVendorSpStatusCol,
                "currencies" => $currencies,
                'sort_field' => $conds['order_by'],
                'sort_order' => $request->sort_order,
                'search' => $conds['searchterm'],
                'durations' => $durations,
                'selected_duration' => $conds['duration'],
                'selected_currency' => $conds['currency_id'],
            ];
        } else {
            $dataArr = [
                'showCoreAndCustomFieldArr' => $columnProps,
                'hideShowFieldForFilterArr' => $columnFilterOptionProps,
                "vendorSubscriptionPlans" => $vendorSubscriptionPlans,
                "durationKey" => Constants::pmtAttrVendorSpDurationCol,
                "salePriceKey" => Constants::pmtAttrVendorSpSalePriceCol,
                "discountPriceKey" => Constants::pmtAttrVendorSpDiscountPriceCol,
                "currencyKey" => Constants::pmtAttrVendorSpCurrencyCol,
                "isMostPopularPlanKey" => Constants::pmtAttrVendorSpIsMostPopularPlanCol,
                "statusKey" => Constants::pmtAttrVendorSpStatusCol,
                "currencies" => $currencies,
                'search' => $conds['searchterm'],
                'durations' => $durations,
                'selected_duration' => $conds['duration'],
                'selected_currency' => $conds['currency_id'],
            ];
        }
        return $dataArr;
    }

    public function store($request)
    {
        DB::beginTransaction();

        try {
            // save core key table
            $coreKey = new \stdClass();
            $coreKey->name = $request->in_app_purchase_prd_id;
            $coreKey->description = $request->in_app_purchase_prd_id;
            $core_key = $this->coreKeyService->store($coreKey, $this->code);

            // save core key payment relations table
            $coreKeyPaymentRelation = new \stdClass();
            $coreKeyPaymentRelation->core_keys_id = $core_key->core_keys_id;
            $coreKeyPaymentRelation->payment_id = Constants::vendorSubscriptionPlanPaymentId;
            $this->coreKeyPaymentRelationService->store($coreKeyPaymentRelation);

            // save payment info table
            $paymentInfo = new PaymentInfo();
            $paymentInfo->core_keys_id = $core_key->core_keys_id;
            $paymentInfo->payment_id = Constants::vendorSubscriptionPlanPaymentId;
            if (isset($request->title) && !empty($request->title))
                $paymentInfo->value = $request->title;
            if (isset($request->added_user_id) && !empty($request->added_user_id))
                $paymentInfo->added_user_id = $request->added_user_id;
            else
                $paymentInfo->added_user_id = Auth::user()->id;
            $paymentInfo->save();

            // save payment attributes table For Duration Col
            $paymentAttributeType = new PaymentAttribute();
            $paymentAttributeType->payment_id = Constants::vendorSubscriptionPlanPaymentId;
            $paymentAttributeType->core_keys_id = $core_key->core_keys_id;
            $paymentAttributeType->attribute_key = Constants::pmtAttrVendorSpDurationCol;
            $paymentAttributeType->attribute_value = $request->duration;
            $this->paymentAttributeService->store($paymentAttributeType);

            // save payment attributes table For Sale Price Col
            $paymentAttributeCount = new PaymentAttribute();
            $paymentAttributeCount->payment_id = Constants::vendorSubscriptionPlanPaymentId;
            $paymentAttributeCount->core_keys_id = $core_key->core_keys_id;
            $paymentAttributeCount->attribute_key = Constants::pmtAttrVendorSpSalePriceCol;
            $paymentAttributeCount->attribute_value = $request->sale_price;
            $this->paymentAttributeService->store($paymentAttributeCount);

            // save payment attributes table For Discount Price Col
            $paymentAttributePrice = new PaymentAttribute();
            $paymentAttributePrice->payment_id = Constants::vendorSubscriptionPlanPaymentId;
            $paymentAttributePrice->core_keys_id = $core_key->core_keys_id;
            $paymentAttributePrice->attribute_key = Constants::pmtAttrVendorSpDiscountPriceCol;
            $paymentAttributePrice->attribute_value = $request->discount_price;
            $this->paymentAttributeService->store($paymentAttributePrice);

            // save payment attributes table For Is Most Popular Plan Col
            $paymentAttributeStatus = new PaymentAttribute();
            $paymentAttributeStatus->payment_id = Constants::vendorSubscriptionPlanPaymentId;
            $paymentAttributeStatus->core_keys_id = $core_key->core_keys_id;
            $paymentAttributeStatus->attribute_key = Constants::pmtAttrVendorSpIsMostPopularPlanCol;
            $paymentAttributeStatus->attribute_value = $request->is_most_popular_plan == false ? '0' : '1';
            $this->paymentAttributeService->store($paymentAttributeStatus);

            // save payment attributes table For Status Col
            $paymentAttributeStatus = new PaymentAttribute();
            $paymentAttributeStatus->payment_id = Constants::vendorSubscriptionPlanPaymentId;
            $paymentAttributeStatus->core_keys_id = $core_key->core_keys_id;
            $paymentAttributeStatus->attribute_key = Constants::pmtAttrVendorSpStatusCol;
            $paymentAttributeStatus->attribute_value = $request->status == false ? '0' : '1';
            $this->paymentAttributeService->store($paymentAttributeStatus);

            // save payment attributes table For Currency Col
            $paymentAttributeCurrency = new PaymentAttribute();
            $paymentAttributeCurrency->payment_id = Constants::vendorSubscriptionPlanPaymentId;
            $paymentAttributeCurrency->core_keys_id = $core_key->core_keys_id;
            $paymentAttributeCurrency->attribute_key = Constants::pmtAttrVendorSpCurrencyCol;
            $paymentAttributeCurrency->attribute_value = $request->currency_id;
            $this->paymentAttributeService->store($paymentAttributeCurrency);

            DB::commit();
            return $paymentInfo;
        } catch (\Throwable $e) {
            DB::rollBack();
            return ['error' => $e->getMessage()];
        }
    }

    public function update($id, $request)
    {

        DB::beginTransaction();

        try {
            // update core key table
            $coreKey = new \stdClass();
            $coreKey->name = $request->in_app_purchase_prd_id;
            $coreKey->description = $request->in_app_purchase_prd_id;
            $core_key_id = CoreKey::where('core_keys_id', $request->core_keys_id)->first()->id;
            $this->coreKeyService->update($request->core_keys_id, $coreKey);

            // update payment info table
            $paymentInfo = $this->getPaymentInfo($id);
            $paymentInfo->core_keys_id = $request->core_keys_id;
            $paymentInfo->payment_id = Constants::vendorSubscriptionPlanPaymentId;
            if (isset($request->title) && !empty($request->title))
                $paymentInfo->value = $request->title;
            if (isset($request->updated_user_id) && !empty($request->updated_user_id))
                $paymentInfo->updated_user_id = $request->updated_user_id;
            else
                $paymentInfo->updated_user_id = Auth::user()->id;
            $paymentInfo->update();

            // update payment attributes table For Duration Col
            $conds['attribute_key'] = Constants::pmtAttrVendorSpDurationCol;
            $conds['core_keys_id'] = $request->core_keys_id;
            $paymentAttributeType = $this->paymentAttributeService->getPaymentAttribute(null, $conds);
            if ($paymentAttributeType) {
                $paymentAttributeType->payment_id = Constants::vendorSubscriptionPlanPaymentId;
                $paymentAttributeType->core_keys_id = $request->core_keys_id;
                $paymentAttributeType->attribute_key = Constants::pmtAttrVendorSpDurationCol;
                $paymentAttributeType->attribute_value = $request->duration;
                $this->paymentAttributeService->update($paymentAttributeType);
            } else {
                $paymentAttributeType = new PaymentAttribute();
                $paymentAttributeType->payment_id = Constants::vendorSubscriptionPlanPaymentId;
                $paymentAttributeType->core_keys_id = $request->core_keys_id;
                $paymentAttributeType->attribute_key = Constants::pmtAttrVendorSpDurationCol;
                $paymentAttributeType->attribute_value = $request->duration;
                $this->paymentAttributeService->store($paymentAttributeType);
            }

            // update payment attributes table For Sale Price Col
            $conds['attribute_key'] = Constants::pmtAttrVendorSpSalePriceCol;
            $conds['core_keys_id'] = $request->core_keys_id;
            $paymentAttributeCount = $this->paymentAttributeService->getPaymentAttribute(null, $conds);
            if ($paymentAttributeCount) {
                $paymentAttributeCount->payment_id = Constants::vendorSubscriptionPlanPaymentId;
                $paymentAttributeCount->core_keys_id = $request->core_keys_id;
                $paymentAttributeCount->attribute_key = Constants::pmtAttrVendorSpSalePriceCol;
                $paymentAttributeCount->attribute_value = $request->sale_price;
                $this->paymentAttributeService->update($paymentAttributeCount);
            } else {
                $paymentAttributeCount = new PaymentAttribute();
                $paymentAttributeCount->payment_id = Constants::vendorSubscriptionPlanPaymentId;
                $paymentAttributeCount->core_keys_id = $request->core_keys_id;
                $paymentAttributeCount->attribute_key = Constants::pmtAttrVendorSpSalePriceCol;
                $paymentAttributeCount->attribute_value = $request->sale_price;
                $this->paymentAttributeService->store($paymentAttributeCount);
            }

            // update payment attributes table For Discount Price Col
            $conds['attribute_key'] = Constants::pmtAttrVendorSpDiscountPriceCol;
            $conds['core_keys_id'] = $request->core_keys_id;
            $paymentAttributePrice = $this->paymentAttributeService->getPaymentAttribute(null, $conds);
            if ($paymentAttributePrice) {
                $paymentAttributePrice->payment_id = Constants::vendorSubscriptionPlanPaymentId;
                $paymentAttributePrice->core_keys_id = $request->core_keys_id;
                $paymentAttributePrice->attribute_key = Constants::pmtAttrVendorSpDiscountPriceCol;
                $paymentAttributePrice->attribute_value = $request->discount_price;
                $this->paymentAttributeService->update($paymentAttributePrice);
            } else {
                $paymentAttributePrice = new PaymentAttribute();
                $paymentAttributePrice->payment_id = Constants::vendorSubscriptionPlanPaymentId;
                $paymentAttributePrice->core_keys_id = $request->core_keys_id;
                $paymentAttributePrice->attribute_key = Constants::pmtAttrVendorSpDiscountPriceCol;
                $paymentAttributePrice->attribute_value = $request->discount_price;
                $this->paymentAttributeService->store($paymentAttributePrice);
            }

            // update payment attributes table For Status Col
            $conds['attribute_key'] = Constants::pmtAttrVendorSpStatusCol;
            $conds['core_keys_id'] = $request->core_keys_id;
            $paymentAttributeStatus = $this->paymentAttributeService->getPaymentAttribute(null, $conds);
            if ($paymentAttributeStatus) {
                $paymentAttributeStatus->payment_id = Constants::vendorSubscriptionPlanPaymentId;
                $paymentAttributeStatus->core_keys_id = $request->core_keys_id;
                $paymentAttributeStatus->attribute_key = Constants::pmtAttrVendorSpStatusCol;
                $paymentAttributeStatus->attribute_value = $request->status == false ? '0' : '1';
                $this->paymentAttributeService->update($paymentAttributeStatus);
            } else {
                $paymentAttributeStatus = new PaymentAttribute();
                $paymentAttributeStatus->payment_id = Constants::vendorSubscriptionPlanPaymentId;
                $paymentAttributeStatus->core_keys_id = $request->core_keys_id;
                $paymentAttributeStatus->attribute_key = Constants::pmtAttrVendorSpStatusCol;
                $paymentAttributeStatus->attribute_value = $request->status == false ? '0' : '1';
                $this->paymentAttributeService->store($paymentAttributeStatus);
            }

            // update payment attributes table For Is Most Popular Plan Col
            $conds['attribute_key'] = Constants::pmtAttrVendorSpIsMostPopularPlanCol;
            $conds['core_keys_id'] = $request->core_keys_id;
            $paymentAttributeStatus = $this->paymentAttributeService->getPaymentAttribute(null, $conds);
            if ($paymentAttributeStatus) {
                $paymentAttributeStatus->payment_id = Constants::vendorSubscriptionPlanPaymentId;
                $paymentAttributeStatus->core_keys_id = $request->core_keys_id;
                $paymentAttributeStatus->attribute_key = Constants::pmtAttrVendorSpIsMostPopularPlanCol;
                $paymentAttributeStatus->attribute_value = $request->is_most_popular_plan == false ? '0' : '1';
                $this->paymentAttributeService->update($paymentAttributeStatus);
            } else {
                $paymentAttributeStatus = new PaymentAttribute();
                $paymentAttributeStatus->payment_id = Constants::vendorSubscriptionPlanPaymentId;
                $paymentAttributeStatus->core_keys_id = $request->core_keys_id;
                $paymentAttributeStatus->attribute_key = Constants::pmtAttrVendorSpIsMostPopularPlanCol;
                $paymentAttributeStatus->attribute_value = $request->is_most_popular_plan == false ? '0' : '1';
                $this->paymentAttributeService->store($paymentAttributeStatus);
            }

            // update payment attributes table For Currency Col
            $conds['attribute_key'] = Constants::pmtAttrVendorSpCurrencyCol;
            $conds['core_keys_id'] = $request->core_keys_id;
            $paymentAttributeCurrency = $this->paymentAttributeService->getPaymentAttribute(null, $conds);
            if ($paymentAttributeCurrency) {
                $paymentAttributeCurrency->payment_id = Constants::vendorSubscriptionPlanPaymentId;
                $paymentAttributeCurrency->core_keys_id = $request->core_keys_id;
                $paymentAttributeCurrency->attribute_key = Constants::pmtAttrVendorSpCurrencyCol;
                $paymentAttributeCurrency->attribute_value = $request->currency_id;
                $this->paymentAttributeService->update($paymentAttributeCurrency);
            } else {
                $paymentAttributeCurrency = new PaymentAttribute();
                $paymentAttributeCurrency->payment_id = Constants::vendorSubscriptionPlanPaymentId;
                $paymentAttributeCurrency->core_keys_id = $request->core_keys_id;
                $paymentAttributeCurrency->attribute_key = Constants::pmtAttrVendorSpCurrencyCol;
                $paymentAttributeCurrency->attribute_value = $request->currency_id;
                $this->paymentAttributeService->store($paymentAttributeCurrency);
            }
            DB::commit();
            return $paymentInfo;
        } catch (\Throwable $e) {
            dd($e->getMessage());
            DB::rollBack();
            return ['error' => $e->getMessage()];
        }
    }

    public function getPaymentInfos($relations = null, $limit = null, $offset = null, $conds = null)
    {
        $paymentInfos = PaymentInfo::when($relations, function ($query, $relations) {
            $query->with($relations);
        })
            ->when($conds, function ($query, $conds) {
                $query->where($conds);
            })
            ->when($limit, function ($query, $limit) {
                $query->limit($limit);
            })
            ->when($offset, function ($query, $offset) {
                $query->offset($offset);
            })
            ->latest()->get();
        return $paymentInfos;
    }

    public function getPaymentInfo($id, $relations = null, $conds = null)
    {
        $paymentInfo = PaymentInfo::where($this->paymentInfoIdCol, $id)
            ->when($relations, function ($query, $relations) {
                $query->with($relations);
            })
            ->when($conds, function ($query, $conds) {
                $query->where($conds);
            })
            ->first();
        return $paymentInfo;
    }

    public function create()
    {
        $availableCurrencies = $this->availableCurrencyService->getAvailableCurrencies($this->publish);
        $dataArr = [
            "availableCurrencies" => $availableCurrencies,
        ];
        return $dataArr;
    }

    public function edit($id)
    {
        $relations = ['core_key', 'payment_attributes'];
        $vendorSubscriptionPlan = $this->getPaymentInfo($id, $relations);
        $duration_attribute = '';
        $sale_price_attribute = '';
        $discount_price_attribute = '';
        $is_most_popular_plan_attribute = 0;
        $status_attribute = 0;
        $currency_attribute = '';

        foreach ($vendorSubscriptionPlan['payment_attributes'] as $attribute) {
            if ($attribute['attribute_key'] == Constants::pmtAttrVendorSpDurationCol) {
                $duration_attribute = $attribute['attribute_value'];
            }
            if ($attribute['attribute_key'] == Constants::pmtAttrVendorSpSalePriceCol) {
                $sale_price_attribute = $attribute['attribute_value'];
            }
            if ($attribute['attribute_key'] == Constants::pmtAttrVendorSpDiscountPriceCol) {
                $discount_price_attribute = $attribute['attribute_value'];
            }
            if ($attribute['attribute_key'] == Constants::pmtAttrVendorSpStatusCol) {
                $status_attribute = $attribute['attribute_value'];
            }
            if ($attribute['attribute_key'] == Constants::pmtAttrVendorSpCurrencyCol) {
                $currency_attribute = $attribute['attribute_value'];
            }
            if ($attribute['attribute_key'] == Constants::pmtAttrVendorSpIsMostPopularPlanCol) {
                $is_most_popular_plan_attribute = $attribute['attribute_value'];
            }
        }

        $availableCurrencies = $this->availableCurrencyService->getAvailableCurrencies($this->publish);

        $dataArr = [
            "vendorSubscriptionPlan" => $vendorSubscriptionPlan,
            "duration_attribute" => $duration_attribute,
            "sale_price_attribute" => $sale_price_attribute,
            "discount_price_attribute" => $discount_price_attribute,
            "status_attribute" => $status_attribute,
            "is_most_popular_plan_attribute" => $is_most_popular_plan_attribute,
            "currency_attribute" => $currency_attribute,
            "availableCurrencies" => $availableCurrencies,
        ];
        return $dataArr;
    }

    public function destroy($id)
    {
        $paymentInfo = PaymentInfo::find($id);
        $coreKey = CoreKey::where(CoreKey::coreKeysId, $paymentInfo->core_keys_id)->first();
        $coreKeyPaymentRelation = CoreKeyPaymentRelation::where(CoreKeyPaymentRelation::coreKeysId, $paymentInfo->core_keys_id)->first();
        $paymentAttributes = PaymentAttribute::where(PaymentAttribute::coreKeysId, $paymentInfo->core_keys_id)->get();
        $name = $coreKey->name;

        $paymentInfo->delete();
        $coreKey->delete();
        $coreKeyPaymentRelation->delete();

        PaymentAttribute::destroy($paymentAttributes->pluck('id'));

        $dataArr = [
            'msg' => __('core__be_delete_success', ['attribute' => $name]),
            'flag' => $this->dangerFlag,
        ];

        return $dataArr;
    }

    public function takingForColumnAndFilterOption()
    {

        // for table
        $hideShowCoreFieldForColumnArr = [];
        $hideShowCustomFieldForColumnArr = [];

        $showUserCols = [];

        // for eye
        $hideShowFieldForColumnFilterArr = [];

        // for control
        $controlFieldArr = [];
        $controlFieldObj = $this->takingForColumnProps(__('core__be_action_label'), "action", "Action", false, 0);
        array_push($controlFieldArr, $controlFieldObj);


        $code = $this->code;
        $hiddenForCoreAndCustomField = $this->hiddenShownForCoreAndCustomField($this->hide, $code);
        $shownForCoreAndCustomField = $this->hiddenShownForCoreAndCustomField($this->show, $code);
        $hideShowForCoreAndCustomFields = $shownForCoreAndCustomField->merge($hiddenForCoreAndCustomField);

        foreach ($hideShowForCoreAndCustomFields as $showFields) {
            if ($showFields->coreField !== null) {

                $label = $showFields->coreField->label_name;
                $field = $showFields->coreField->field_name;
                $colName = $showFields->coreField->field_name;
                $type = $showFields->coreField->data_type;
                $isShowSorting = $showFields->coreField->is_show_sorting;
                $ordering = $showFields->coreField->ordering;

                $cols = $colName;
                $id = $showFields->id;
                $hidden = $showFields->is_show ? false : true;
                $moduleName = $showFields->coreField->module_name;
                $keyId = $showFields->coreField->id;

                $coreFieldObjForColumnsProps = $this->takingForColumnProps($label, $field, $type, $isShowSorting, $ordering);
                $coreFieldObjForColumnFilter = $this->takingForColumnFilterProps($id, $label, $field, $hidden, $moduleName, $keyId);

                array_push($hideShowFieldForColumnFilterArr, $coreFieldObjForColumnFilter);
                array_push($hideShowCoreFieldForColumnArr, $coreFieldObjForColumnsProps);
                array_push($showUserCols, $cols);
            }
            if ($showFields->customizeField !== null) {

                $label = $showFields->customizeField->name;
                $uiHaveAttribute = [$this->dropDownUi, $this->radioUi];
                if (in_array($showFields->customizeField->ui_type_id, $uiHaveAttribute)) {
                    $field = $showFields->customizeField->core_keys_id . "@@name";
                } else {
                    $field = $showFields->customizeField->core_keys_id;
                }
                $type = $showFields->customizeField->data_type;
                $isShowSorting = $showFields->customizeField->is_show_sorting;
                $ordering = $showFields->customizeField->ordering;

                $id = $showFields->id;
                $hidden = $showFields->is_show ? false : true;
                $moduleName = $showFields->customizeField->module_name;
                $keyId = $showFields->customizeField->core_keys_id;

                $customFieldObjForColumnsProps = $this->takingForColumnProps($label, $field, $type, $isShowSorting, $ordering);
                $customFieldObjForColumnFilter = $this->takingForColumnFilterProps($id, $label, $field, $hidden, $moduleName, $keyId);

                array_push($hideShowFieldForColumnFilterArr, $customFieldObjForColumnFilter);
                array_push($hideShowCustomFieldForColumnArr, $customFieldObjForColumnsProps);
            }
        }

        // for columns props
        $showCoreAndCustomFieldArr = array_merge($hideShowCoreFieldForColumnArr, $controlFieldArr, $hideShowCustomFieldForColumnArr);
        $sortedColumnArr = columnOrdering("ordering", $showCoreAndCustomFieldArr);

        // for eye
        $hideShowCoreAndCustomFieldArr = array_merge($hideShowFieldForColumnFilterArr);

        $dataArr = [
            "arrForColumnProps" => $sortedColumnArr,
            "arrForColumnFilterProps" => $hideShowCoreAndCustomFieldArr,
            "showCoreField" => $showUserCols,
        ];
        return $dataArr;
    }

    public function hiddenShownForCoreAndCustomField($isShown, $code)
    {
        $hiddenShownForFields = DynamicColumnVisibility::with(['customizeField' => function ($q) {
            $q->where($this->customUiEnableCol, $this->enable)->where($this->customUiIsDelCol, $this->unDelete);
        }, 'coreField' => function ($q) {
            $q->where($this->coreFieldFilterModuleNameCol, $this->code);
        }])
            ->where($this->coreFieldFilterModuleNameCol, $code)
            ->where($this->screenDisplayUiIsShowCol, $isShown)
            ->get();
        return $hiddenShownForFields;
    }

    public function takingForColumnProps($label, $field, $type, $isShowSorting, $ordering)
    {
        $hideShowCoreAndCustomFieldObj = new \stdClass();
        $hideShowCoreAndCustomFieldObj->label = $label;
        $hideShowCoreAndCustomFieldObj->field = $field;
        $hideShowCoreAndCustomFieldObj->type = $type;
        $hideShowCoreAndCustomFieldObj->sort = $isShowSorting;
        $hideShowCoreAndCustomFieldObj->ordering = $ordering;

        if ($type !== "Image" && $type !== "MultiSelect" && $type !== "Action") {
            $hideShowCoreAndCustomFieldObj->action = 'Action';
        }

        return $hideShowCoreAndCustomFieldObj;
    }

    public function takingForColumnFilterProps($id, $label, $field, $hidden, $moduleName, $keyId)
    {
        $hideShowCoreAndCustomFieldObj = new \stdClass();
        $hideShowCoreAndCustomFieldObj->id = $id;
        $hideShowCoreAndCustomFieldObj->label = $label;
        $hideShowCoreAndCustomFieldObj->key = $field;
        $hideShowCoreAndCustomFieldObj->hidden = $hidden;
        $hideShowCoreAndCustomFieldObj->module_name = $moduleName;
        $hideShowCoreAndCustomFieldObj->key_id = $keyId;

        return $hideShowCoreAndCustomFieldObj;
    }

    // From api
    public function indexFromApi($request)
    {
        // $data = file_get_contents(public_path("json/vendor-subscription-plan.json"));
        // return responseDataApi($data);

        /// check permission start
        $deviceToken = $request->header($this->deviceTokenParaApi);
        $userId = $request->login_user_id;

        // user token layer permission start
        $userAccessApiToken = $this->userAccessApiTokenService->getUserAccessApiToken($userId, $deviceToken);
        // user token layer permission end

        /// check permission end

        if (empty($userAccessApiToken)) {
            $msg = __('payment__api_no_permission', [], $request->language_symbol);
            return responseMsgApi($msg, $this->forbiddenStatusCode);
        } else {
            $offset = $request->offset;
            $limit = $request->limit;

            $packageInAppPurchaseApiRelations = $this->packageInAppPurchaseApiRelations;
            $conds['payment_id'] = Constants::vendorSubscriptionPlanPaymentId;
            $conds['status'] = 1;
            $attributes = [
                Constants::pmtAttrVendorSpDurationCol,
                Constants::pmtAttrVendorSpSalePriceCol,
                Constants::pmtAttrVendorSpDiscountPriceCol,
                Constants::pmtAttrVendorSpCurrencyCol,
                Constants::pmtAttrVendorSpIsMostPopularPlanCol,
                Constants::pmtAttrVendorSpStatusCol,
            ];
            $packageIapPayments = VendorSubscriptionPlanSettingApiResource::collection($this->paymentSettingService->getPaymentInfos($packageInAppPurchaseApiRelations, $limit, $offset, $conds, true, null, $attributes));

            if ($offset > 0 && $packageIapPayments->isEmpty()) {
                // no paginate data
                $data = [];
                return responseDataApi($data);
            } else if ($packageIapPayments->isEmpty()) {
                // no data db
                return responseMsgApi(__('payment__api_no_data'), $this->noContentStatusCode, $this->successStatus);
            } else {
                return responseDataApi($packageIapPayments);
            }
        }
    }

    public function makePublishOrUnpublish($id)
    {
        // update payment attributes table For Status Col
        $conds['attribute_key'] = Constants::pmtAttrVendorSpStatusCol;
        $conds['core_keys_id'] = $id;
        $paymentAttributeStatus = $this->paymentAttributeService->getPaymentAttribute(null, $conds);
        if ($paymentAttributeStatus) {
            $paymentAttributeStatus->payment_id = Constants::vendorSubscriptionPlanPaymentId;
            $paymentAttributeStatus->core_keys_id = $id;
            $paymentAttributeStatus->attribute_key = Constants::pmtAttrVendorSpStatusCol;
            $paymentAttributeStatus->attribute_value = $paymentAttributeStatus->attribute_value == "1" ? '0' : '1';
            $this->paymentAttributeService->update($paymentAttributeStatus);
        } else {
            $paymentAttributeStatus = new PaymentAttribute();
            $paymentAttributeStatus->payment_id = Constants::vendorSubscriptionPlanPaymentId;
            $paymentAttributeStatus->core_keys_id = $id;
            $paymentAttributeStatus->attribute_key = Constants::pmtAttrVendorSpStatusCol;
            $paymentAttributeStatus->attribute_value = 1;
            $this->paymentAttributeService->store($paymentAttributeStatus);
        }
        $dataArr = [
            'msg' => __('core__be_status_updated'),
            'flag' => $this->successFlag,
        ];
        return $dataArr;
    }

    public function handleIsMostPopularPlan($id)
    {
        // update payment attributes table For Status Col
        $conds['attribute_key'] = Constants::pmtAttrVendorSpIsMostPopularPlanCol;
        $conds['core_keys_id'] = $id;
        $paymentAttributeStatus = $this->paymentAttributeService->getPaymentAttribute(null, $conds);
        if ($paymentAttributeStatus) {
            $paymentAttributeStatus->payment_id = Constants::vendorSubscriptionPlanPaymentId;
            $paymentAttributeStatus->core_keys_id = $id;
            $paymentAttributeStatus->attribute_key = Constants::pmtAttrVendorSpIsMostPopularPlanCol;
            $paymentAttributeStatus->attribute_value = $paymentAttributeStatus->attribute_value == "1" ? '0' : '1';
            $this->paymentAttributeService->update($paymentAttributeStatus);
        } else {
            $paymentAttributeStatus = new PaymentAttribute();
            $paymentAttributeStatus->payment_id = Constants::vendorSubscriptionPlanPaymentId;
            $paymentAttributeStatus->core_keys_id = $id;
            $paymentAttributeStatus->attribute_key = Constants::pmtAttrVendorSpIsMostPopularPlanCol;
            $paymentAttributeStatus->attribute_value = 1;
            $this->paymentAttributeService->store($paymentAttributeStatus);
        }
        $dataArr = [
            'msg' => __('core__be_status_updated'),
            'flag' => $this->successFlag,
        ];
        return $dataArr;
    }
}
