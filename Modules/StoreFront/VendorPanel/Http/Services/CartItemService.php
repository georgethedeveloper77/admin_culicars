<?php

namespace Modules\StoreFront\VendorPanel\Http\Services;

use stdClass;
use App\Models\User;
use App\Config\ps_constant;
use App\Http\Services\PsService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Modules\Core\Constants\Constants;
use Modules\Core\Http\Services\UserAccessApiTokenService;
use Modules\Core\Entities\Item\CartItem;

/**
 * @deprecated
 */
class CartItemService extends PsService
{
    const parentPath = "Pages/vendor/views/order_list/";
    const indexPath = self::parentPath . 'Index';
    const createPath = self::parentPath . 'Create';
    const editPath = self::parentPath . 'Edit';
    const indexRoute = "vendor_order_list.index";
    const createRoute = "vendor_order_list.create";
    const editRoute = "vendor_order_list.edit";

    protected $userAccessApiTokenService, $vendorPaymentStatusService, $vendorOrderStatusService;

    public function __construct(UserAccessApiTokenService $userAccessApiTokenService, VendorPaymentStatusService $vendorPaymentStatusService, VendorOrderStatusService $vendorOrderStatusService)
    {
        $this->userAccessApiTokenService = $userAccessApiTokenService;
        $this->vendorPaymentStatusService = $vendorPaymentStatusService;
        $this->vendorOrderStatusService = $vendorOrderStatusService;
    }


    public function getCartItem($id = null, $itemId = null, $cartId = null)
    {
        $cartItem = CartItem::when($id, function ($q, $id) {
            $q->where(CartItem::id, $id);
        })
            ->when($itemId, function ($q, $itemId) {
                $q->where(CartItem::itemId, $itemId);
            })
            ->when($cartId, function ($q, $cartId) {
                $q->where(CartItem::cartId, $cartId);
            })
            ->first();

        return $cartItem;
    }

    public function getCartItems($id = null, $itemId = null, $cartId = null, $relation = null, $addedUserId = null)
    {
        $cartItems = CartItem::when($id, function ($q, $id) {
            $q->where(CartItem::id, $id);
        })
            ->when($itemId, function ($q, $itemId) {
                $q->where(CartItem::itemId, $itemId);
            })
            ->when($cartId, function ($q, $cartId) {
                $q->where(CartItem::cartId, $cartId);
            })
            ->when($addedUserId, function ($q, $addedUserId) {
                $q->where(CartItem::addedUserId, $addedUserId);
            })
            ->when($relation, function ($q, $relation) {
                $q->with($relation);
            })
            ->get();

        return $cartItems;
    }
}
