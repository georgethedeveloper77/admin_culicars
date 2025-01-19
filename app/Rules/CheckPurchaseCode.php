<?php
namespace App\Rules;

use App\Config\ps_constant;
use Illuminate\Contracts\Validation\InvokableRule;
use Illuminate\Support\Facades\Http;

class CheckPurchaseCode implements InvokableRule
{
    public function __invoke($attribute, $value, $fail)
    {
		
    }
}
