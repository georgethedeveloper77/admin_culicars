<?php

namespace Modules\Core\Http\Requests;

use App\Rules\CheckPurchaseCode;
use App\Rules\DomainCheck;
use Illuminate\Foundation\Http\FormRequest;

class UpdateLicenseRequest extends FormRequest
{
    public function rules()
    {
        if (config('app.development')) {
            return [
                'backend_url' => [
                    'required',
                    'url',
                    'active_url',
                    new DomainCheck()
                ],
                'purchased_code' => [
                    'required',
                    new CheckPurchaseCode()
                ]
            ];
        } else {
            return [
                'backend_url' => [
                    'required',
                    'url',
                    new DomainCheck()
                ],
                'purchased_code' => [
                    'required'
                ]
            ];
        }
    }

    public function authorize()
    {
        return true;
    }
}
