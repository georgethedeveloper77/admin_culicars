<?php

namespace Modules\Core\Http\Services\Vendor;

use App\Http\Services\PsService;
use App\Http\Contracts\Vendor\VendorUserPermissionServiceInterface;
use Modules\Core\Entities\Vendor\VendorUserPermission;

class VendorUserPermissionService extends PsService implements VendorUserPermissionServiceInterface
{
    public function get($userId, $relation = null)
    {
        return VendorUserPermission::when($userId, function ($q, $userId) {
                $q->where(VendorUserPermission::userId, $userId);
            })
            ->when($relation, function ($q, $relation) {
                $q->with($relation);
            })->first();
    }
}
