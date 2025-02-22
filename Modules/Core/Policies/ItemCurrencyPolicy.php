<?php

namespace Modules\Core\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use App\Policies\PsPolicy;
use Modules\Core\Constants\Constants;
use Modules\Core\Entities\Currency;
use Modules\Core\Entities\Financial\ItemCurrency;

class ItemCurrencyPolicy extends PsPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        $module = Constants::currencyModule;
        $model = ItemCurrency::class;
        parent::__construct($module, $model);
    }
}
