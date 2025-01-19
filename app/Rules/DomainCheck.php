<?php

namespace App\Rules;
use App\Config\ps_config;
use Illuminate\Contracts\Validation\InvokableRule;

class DomainCheck implements InvokableRule
{
	public function __invoke($attribute, $value, $fail)
	{
		//
	}
}
