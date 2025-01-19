<?php

namespace Modules\Core\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Modules\Core\Constants\Constants;
use Modules\Core\Http\Services\CoreFieldFilterSettingService;

class StoreUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    protected $coreFieldFilterSettingService;
    public function __construct(CoreFieldFilterSettingService $coreFieldFilterSettingService)
    {
        $this->coreFieldFilterSettingService = $coreFieldFilterSettingService;
    }

    public function rules()
    {
        // prepare for custom field validation
        $errors = validateForCustomField(Constants::user, $this->user_relation);

        // prepare for core field validation
        $conds = prepareCoreFieldValidationConds(Constants::user);
        $coreFields = $this->coreFieldFilterSettingService->getCoreFieldsWithConds($conds);

        $validationRules = array(
            array(
                'fieldName' => 'name',
                'rules' => 'required|min:3',
            ),
            array(
                'fieldName' => 'username',
                'rules' => 'nullable|sometimes|unique:users,username',
            ),
            array(
                'fieldName' => 'role_id',
                'rules' => 'required',
            ),
            array(
                'fieldName' => 'password',
                'rules' => 'required|min:8',
            ),
            array(
                'fieldName' => 'confirm_password',
                'rules' => 'required_with:password|same:password',
            ),
            array(
                'fieldName' => 'email',
                'rules' => 'required|unique:users,email',
            ),
            array(
                'fieldName' => 'user_phone',
                'rules' => 'required|unique:users,user_phone',
            ),
            array(
                'fieldName' => 'user_cover_photo',
                'rules' => 'required|image',
            ),
            array(
                'fieldName' => 'is_show_phone',
                'rules' => 'nullable',
            ),
            array(
                'fieldName' => 'is_show_email',
                'rules' => 'nullable',
            ),
            array(
                'fieldName' => 'user_about_me',
                'rules' => 'nullable',
            ),
        );

        // prepared saturation for core and custom field
        $validationArr = handleValidation($errors, $coreFields, $validationRules);
        return $validationArr;

    }

    public function attributes()
    {
        $customFieldAttributeArr = handleCFAttrForValidation(Constants::user, $this->user_relation);

        $coreFieldAttributeArr = [
            'confirm_password' => "Confirm Password",
            'user_phone' => "User Phone",
            'user_cover_photo' => "User Cover Photo",
            'role_id' => "User Role",
        ];
        $attributeArr = array_merge($coreFieldAttributeArr, $customFieldAttributeArr);

        return $attributeArr;
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }


}
