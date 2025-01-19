<?php

namespace Modules\Core\Http\Requests\Item;

use App\Exceptions\PsApiException;
use App\Rules\IsVendorExpired;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;
use Illuminate\Contracts\Validation\Validator;
use Modules\Core\Constants\Constants;
use Modules\Core\Http\Services\CoreFieldFilterSettingService;
use Modules\Core\Http\Services\SystemConfigService;

class StoreItemApiRequest extends FormRequest
{

    protected $coreFieldFilterSettingService, $systemConfigService;
    public function __construct(CoreFieldFilterSettingService $coreFieldFilterSettingService, SystemConfigService $systemConfigService)
    {
        $this->coreFieldFilterSettingService = $coreFieldFilterSettingService;
        $this->systemConfigService = $systemConfigService;

    }

    public function rules()
    {
        // Validate the custom fields
        $errors = validateForCustomField(Constants::item, $this->product_relation);

        // prepare for core field validation
        $conds = prepareCoreFieldValidationConds(Constants::item);

        $coreFields = $this->coreFieldFilterSettingService->getCoreFieldsWithConds($conds);

        $selcted_array = $this->systemConfigService->getSystemSettingJson();

        $validationRules = array(
            array(
                'fieldName' => 'id',
                'rules' => 'nullable|exists:psx_items,id',
            ),
            array(
                'fieldName' => 'title',
                'rules' => 'required|min:3',
            ),
            array(
                'fieldName' => 'description',
                'rules' => 'required|min:10',
            ),
            array(
                'fieldName' => 'category_id',
                'rules' => 'required|exists:psx_categories,id',
            ),
            array(
                'fieldName' => 'subcategory_id',
                'rules' => 'required|exists:psx_subcategories,id',
            ),
            array(
                'fieldName' => 'location_city_id',
                'rules' => 'required|exists:psx_location_cities,id',
            ),
            array(
                'fieldName' => 'location_township_id',
                'rules' => 'required|exists:psx_location_townships,id',
            ),
            array(
                'fieldName' => 'currency_id',
                'rules' => $selcted_array['selected_price_type']['id'] == "NORMAL_PRICE" || !empty($this->vendor_id) ? 'required|exists:psx_currencies,id' : 'nullable',
            ),
            array(
                'fieldName' => 'vendor_id',
                'rules' => ['nullable', 'exists:psx_vendors,id', new IsVendorExpired($this->vendor_id)],
            ),
            array(
                'fieldName' => 'original_price',
                'rules' => 'required|max:11',
            ),
            array(
                'fieldName' => 'percent',
                'rules' => 'required',
            ),
            array(
                'fieldName' => 'lat',
                'rules' => 'required',
            ),
            array(
                'fieldName' => 'lng',
                'rules' => 'required',
            ),
            array(
                'fieldName' => 'search_tag',
                'rules' => 'required',
            ),
            array(
                'fieldName' => 'ordering',
                'rules' => 'required',
            ),
            array(
                'fieldName' => 'is_discount',
                'rules' => 'required',
            ),
            array(
                'fieldName' => 'phone',
                'rules' => 'required',
            ),

            array(
                'fieldName' => 'price',
                'rules' => 'nullable',
            ),
            array(
                'fieldName' => 'status',
                'rules' => 'nullable',
            ),
            array(
                'fieldName' => 'img_order',
                'rules' => 'nullable',
            ),
            array(
                'fieldName' => 'img_caption',
                'rules' => 'nullable',
            ),
            array(
                'fieldName' => 'added_user_id',
                'rules' => 'nullable',
            ),

        );

        $validationArr = handleValidation($errors, $coreFields, $validationRules);

        return $validationArr;

    }

    public function failedValidation(Validator $validator)
    {
        throw new PsApiException(
            implode("\n", Arr::flatten($validator->getMessageBag()->getMessages()))
        );
    }

    public function attributes()
    {
        $customFieldAttributeArr = handleCFAttrForValidation(Constants::item, $this->product_relation);

        $coreFieldAttributeArr = [
            'original_price.max' => "The original price must not be greater than 6 digits.",
        ];
        $attributeArr = array_merge($coreFieldAttributeArr, $customFieldAttributeArr);

        return $attributeArr;
    }

    public function authorize()
    {
        return true;
    }


}
