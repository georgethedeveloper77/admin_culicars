<?php

namespace App\Providers;


use Exception;
use Illuminate\Support\Facades\DB;
use App\Http\Services\PsInfoService;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Resources\Json\JsonResource;
use Modules\Blog\Http\Services\Blog\BlogService;
use Modules\Core\Http\Services\Item\ItemService;
use Modules\Core\Http\Services\User\UserService;
use App\Http\Contracts\Blog\BlogServiceInterface;
use App\Http\Contracts\Item\ItemServiceInterface;
use App\Http\Contracts\User\UserServiceInterface;
use Modules\Core\Http\Services\Image\ImageService;
use Modules\Core\Http\Services\Menu\ModuleService;
use Modules\Core\Http\Services\User\RatingService;
use App\Http\Contracts\Core\PsInfoServiceInterface;
use App\Http\Contracts\Image\ImageServiceInterface;
use App\Http\Contracts\Menu\ModuleServiceInterface;
use App\Http\Contracts\User\RatingServiceInterface;
use Modules\Core\Http\Services\Menu\CoreMenuService;
use Modules\Core\Http\Services\User\UserInfoService;
use Modules\Core\Http\Services\Vendor\VendorService;
use App\Http\Contracts\Menu\CoreMenuServiceInterface;
use App\Http\Contracts\User\UserInfoServiceInterface;
use App\Http\Contracts\Vendor\VendorServiceInterface;
use Modules\Core\Http\Services\Menu\MenuGroupService;
use Modules\Core\Http\Services\User\BlockUserService;
use App\Http\Contracts\Menu\MenuGroupServiceInterface;
use App\Http\Contracts\User\BlockUserServiceInterface;
use Modules\Core\Http\Services\Image\WaterMarkService;
use Modules\Core\Http\Services\Menu\VendorMenuService;
use Modules\Core\Http\Services\User\FollowUserService;
use App\Http\Contracts\Image\WaterMarkServiceInterface;
use App\Http\Contracts\User\FollowUserServiceInterface;
use Modules\Core\Http\Services\Category\CategoryService;
use Modules\Core\Http\Services\Menu\SubMenuGroupService;
use Modules\Core\Http\Services\User\BlueMarkUserService;
use App\Http\Contracts\Category\CategoryServiceInterface;
use App\Http\Contracts\Menu\SubMenuGroupServiceInterface;
use App\Http\Contracts\User\BlueMarkUserServiceInterface;
use App\Http\Contracts\Vendor\VendorInfoServiceInterface;
use Modules\Core\Http\Services\Utilities\CacheKeyService;
use App\Http\Contracts\Utilities\CacheKeyServiceInterface;
use Modules\Core\Http\Services\Utilities\CoreFieldService;
use Modules\Core\Http\Services\Vendor\VendorBranchService;
use App\Http\Contracts\Utilities\CoreFieldServiceInterface;
use App\Http\Contracts\Vendor\VendorBranchServiceInterface;
use Modules\Core\Http\Services\Category\SubcategoryService;
use Modules\Core\Http\Services\Menu\VendorMenuGroupService;
use App\Http\Contracts\Category\SubcategoryServiceInterface;
use App\Http\Contracts\Menu\VendorMenuGroupServiceInterface;
use Modules\Core\Http\Services\Configuration\CoreKeyService;
use Modules\Core\Http\Services\Configuration\SettingService;
use Modules\Core\Http\Services\Financial\PaymentInfoService;
use Modules\Core\Http\Services\Image\ImageProcessingService;
use Modules\Core\Http\Services\Location\LocationCityService;
use Modules\Core\Http\Services\Utilities\CustomFieldService;
use Modules\Core\Http\Services\Vendor\VendorApprovalService;
use App\Http\Contracts\Configuration\CoreKeyServiceInterface;
use App\Http\Contracts\Configuration\SettingServiceInterface;
use App\Http\Contracts\Financial\PaymentInfoServiceInterface;
use App\Http\Contracts\Image\ImageProcessingServiceInterface;
use App\Http\Contracts\Location\LocationCityServiceInterface;
use App\Http\Contracts\Utilities\CustomFieldServiceInterface;
use Modules\Core\Http\Services\Menu\VendorSubMenuGroupService;
use Modules\Core\Http\Services\Authorization\PermissionService;
use Modules\Core\Http\Services\Configuration\TableFieldService;
use App\Http\Contracts\Authorization\PermissionServiceInterface;
use App\Http\Contracts\Configuration\TableFieldServiceInterface;
use Modules\Core\Http\Services\Location\LocationCityInfoService;
use Modules\Core\Http\Services\Location\LocationTownshipService;
use Modules\Core\Http\Services\User\PushNotificationUserService;
use App\Http\Contracts\Location\LocationCityInfoServiceInterface;

use App\Http\Contracts\Location\LocationTownshipServiceInterface;
use App\Http\Contracts\User\PushNotificationUserServiceInterface;
use Modules\Core\Http\Services\Configuration\SystemConfigService;
use Modules\Core\Http\Services\Financial\PaymentAttributeService;
use App\Http\Contracts\Configuration\SystemConfigServiceInterface;
use App\Http\Contracts\Financial\PaymentAttributeServiceInterface;
use Modules\Core\Http\Services\Configuration\MobileSettingService;
use App\Http\Contracts\Configuration\MobileSettingServiceInterface;
use Modules\Core\Http\Services\Authorization\RolePermissionService;
use Modules\Core\Http\Services\Authorization\UserPermissionService;
use Modules\Core\Http\Services\Configuration\CoreKeyCounterService;
use App\Http\Contracts\Authorization\RolePermissionServiceInterface;
use App\Http\Contracts\Authorization\UserPermissionServiceInterface;
use App\Http\Contracts\Configuration\CoreKeyCounterServiceInterface;
use Modules\Core\Http\Services\Configuration\FrontendSettingService;
use Modules\Core\Http\Services\User\PushNotificationReadUserService;
use App\Http\Contracts\Configuration\FrontendSettingServiceInterface;
use App\Http\Contracts\User\PushNotificationReadUserServiceInterface;
use Modules\Core\Http\Services\Utilities\CustomFieldAttributeService;
use App\Http\Contracts\Utilities\CustomFieldAttributeServiceInterface;
use Modules\Core\Http\Services\Financial\OfflinePaymentSettingService;
use App\Http\Contracts\Financial\OfflinePaymentSettingServiceInterface;
use Modules\Core\Http\Services\CoreField\CoreFieldFilterSettingService;
use Modules\Core\Http\Services\Financial\CoreKeyPaymentRelationService;
use Modules\Core\Http\Services\Vendor\VendorRejectService;
use Modules\Core\Http\Services\Vendor\VendorRoleService;
use Modules\Core\Http\Services\Vendor\VendorUserPermissionService;
use Modules\Core\Http\Services\Vendor\VendorApplicationService;

use App\Http\Contracts\Vendor\VendorApplicationServiceInterface;
use App\Http\Contracts\Vendor\VendorUserPermissionServiceInterface;
use App\Http\Contracts\Vendor\VendorRoleServiceInterface;
use App\Http\Contracts\CoreField\CoreFieldFilterSettingServiceInterface;
use App\Http\Contracts\Financial\CoreKeyPaymentRelationServiceInterface;
use Modules\Core\Http\Services\Utilities\DynamicColumnVisibilityService;
use App\Http\Contracts\Utilities\DynamicColumnVisibilityServiceInterface;
use Modules\Core\Http\Services\AvailableCurrency\AvailableCurrencyService;
use Modules\Core\Http\Services\Notification\FirebaseCloudMessagingService;
use App\Http\Contracts\Authorization\PushNotificationTokenServiceInterface;
use App\Http\Contracts\AvailableCurrency\AvailableCurrencyServiceInterface;
use App\Http\Contracts\Configuration\AdPostTypeServiceInterface;
use App\Http\Contracts\Configuration\BackendSettingServiceInterface;
use App\Http\Contracts\Notification\FirebaseCloudMessagingServiceInterface;
use Modules\Core\Http\Services\Notification\PushNotificationMessageService;
use App\Http\Contracts\Notification\PushNotificationMessageServiceInterface;
use Modules\Core\Http\Services\Vendor\VendorInfoService;
use Modules\Core\Http\Services\Financial\PackageInAppPurchaseSettingService;
use Modules\Core\Http\Services\Vendor\VendorSubscriptionPlanSettingService;
use Modules\Core\Http\Services\Financial\PromotionInAppPurchaseSettingService;
use App\Http\Contracts\Financial\PackageInAppPurchaseServiceInterface;
use App\Http\Contracts\Vendor\VendorSubscriptionPlanSettingServiceInterface;
use App\Http\Contracts\Financial\PromotionInAppPurchaseSettingServiceInterface;
use App\Http\Contracts\Menu\VendorMenuServiceInterface;
use App\Http\Contracts\Menu\VendorModuleServiceInterface;
use App\Http\Contracts\Menu\VendorSubMenuGroupServiceInterface;
use App\Http\Contracts\Notification\ChatHistoryServiceInterface;
use App\Http\Contracts\Notification\ChatNotiServiceInterface;
use App\Http\Contracts\Notification\ChatServiceInterface;
use App\Http\Contracts\Utilities\HandleInertiaRequestServiceInterface;
use App\Http\Contracts\Utilities\UiTypeServiceInterface;
use Modules\Core\Http\Services\Menu\VendorModuleService;
use App\Http\Contracts\Vendor\VendorApprovalServiceInterface;
use App\Http\Contracts\Vendor\VendorRejectServiceInterface;
use Modules\Core\Http\Facades\BackendSettingFacade;
use Modules\Core\Http\Services\Authorization\PushNotificationTokenService;
use Modules\Core\Http\Services\Configuration\AdPostTypeService;
use Modules\Core\Http\Services\Configuration\BackendSettingService;
use Modules\Core\Http\Services\Item\CartItemService;
use Modules\Core\Http\Services\Item\ItemInfoService;
use Modules\Core\Http\Services\Item\PaidItemHistoryService;
use Modules\Core\Http\Services\Notification\ChatHistoryService;
use Modules\Core\Http\Services\Notification\ChatNotiService;
use Modules\Core\Http\Services\Notification\ChatService;
use App\Http\Contracts\Vendor\VendorRolePermissionServiceInterface;
use Modules\Core\Http\Services\Vendor\VendorRolePermissionService;
use Modules\Core\Http\Services\Utilities\HandleInertiaRequestService;
use Modules\Core\Http\Services\Utilities\UiTypeService;
use Modules\Core\Http\Services\LanguageService;
use App\Http\Contracts\Item\ItemInfoServiceInterface;
use App\Http\Contracts\Item\CartItemServiceInterface;
use App\Http\Contracts\Item\PaidItemHistoryServiceInterface;
use App\Http\Contracts\Financial\ItemCurrencyServiceInterface;
use Modules\Core\Http\Services\Financial\ItemCurrencyService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // Facades
        $this->app->bind('ps_cache', CacheKeyService::class);
        $this->app->bind('ps_backend_setting', BackendSettingService::class);
        $this->app->bind('ps_frontend_setting', FrontendSettingService::class);
        $this->app->bind('ps_mobile_setting', MobileSettingService::class);
        $this->app->bind('ps_system_config', SystemConfigService::class);
        $this->app->bind('ps_language', LanguageService::class);
        $this->app->bind('ps_user_permission', UserPermissionService::class);
        $this->app->bind('ps_handle_inertia_request', HandleInertiaRequestService::class);
        $this->app->bind('ps_role_permission', RolePermissionService::class);


        // PsInfo
        $this->app->bind(PsInfoServiceInterface::class, PsInfoService::class);

        // CustomField
        $this->app->bind(CustomFieldServiceInterface::class, CustomFieldService::class);

        // CoreField
        $this->app->bind(CoreFieldServiceInterface::class, CoreFieldService::class);

        // CustomFieldAttribute
        $this->app->bind(CustomFieldAttributeServiceInterface::class, CustomFieldAttributeService::class);

        // LocationCityInfo
        $this->app->bind(LocationCityInfoServiceInterface::class, LocationCityInfoService::class);

        // Permission
        $this->app->bind(PermissionServiceInterface::class, PermissionService::class);

        // UserPermission
        $this->app->bind(UserPermissionServiceInterface::class, UserPermissionService::class);

        // RolePermission
        $this->app->bind(RolePermissionServiceInterface::class, RolePermissionService::class);

        // Blog
        $this->app->bind(BlogServiceInterface::class, BlogService::class);

        // TableField
        $this->app->bind(TableFieldServiceInterface::class, TableFieldService::class);

        // DynamicColumnVisibiliy
        $this->app->bind(DynamicColumnVisibilityServiceInterface::class, DynamicColumnVisibilityService::class);

        // Item
        $this->app->bind(ItemServiceInterface::class, ItemService::class);

        // Image
        $this->app->bind(ImageServiceInterface::class, ImageService::class);
        $this->app->bind(ImageProcessingServiceInterface::class, ImageProcessingService::class);
        $this->app->bind(WaterMarkServiceInterface::class, WaterMarkService::class);

        //Location City
        $this->app->bind(LocationCityServiceInterface::class, LocationCityService::class);

        //Location Township
        $this->app->bind(LocationTownshipServiceInterface::class, LocationTownshipService::class);

        // Category
        $this->app->bind(CategoryServiceInterface::class, CategoryService::class);

        // Subcategory
        $this->app->bind(SubcategoryServiceInterface::class, SubcategoryService::class);

        // CoreKey
        $this->app->bind(CoreKeyCounterServiceInterface::class, CoreKeyCounterService::class);
        $this->app->bind(CoreKeyServiceInterface::class, CoreKeyService::class);

        // Menu
        $this->app->bind(MenuGroupServiceInterface::class, MenuGroupService::class);
        $this->app->bind(ModuleServiceInterface::class, ModuleService::class);
        $this->app->bind(CoreMenuServiceInterface::class, CoreMenuService::class);
        $this->app->bind(VendorMenuGroupServiceInterface::class, VendorMenuGroupService::class);
        $this->app->bind(VendorSubMenuGroupServiceInterface::class, VendorSubMenuGroupService::class);
        $this->app->bind(VendorModuleServiceInterface::class, VendorModuleService::class);
        $this->app->bind(VendorMenuServiceInterface::class, VendorMenuService::class);

        //Package IAP
        $this->app->bind(PackageInAppPurchaseServiceInterface::class, PackageInAppPurchaseSettingService::class);
        $this->app->bind(SubMenuGroupServiceInterface::class, SubMenuGroupService::class);

        // User
        $this->app->bind(UserServiceInterface::class, UserService::class);
        $this->app->bind(UserInfoServiceInterface::class, UserInfoService::class);
        $this->app->bind(BlockUserServiceInterface::class, BlockUserService::class);
        $this->app->bind(FollowUserServiceInterface::class, FollowUserService::class);
        $this->app->bind(BlueMarkUserServiceInterface::class, BlueMarkUserService::class);
        $this->app->bind(RatingServiceInterface::class, RatingService::class);

        // Available Currency
        $this->app->bind(AvailableCurrencyServiceInterface::class, AvailableCurrencyService::class);

        // Offline Payment Setting
        $this->app->bind(PaymentAttributeServiceInterface::class, PaymentAttributeService::class);
        $this->app->bind(OfflinePaymentSettingServiceInterface::class, OfflinePaymentSettingService::class);
        $this->app->bind(CoreKeyPaymentRelationServiceInterface::class, CoreKeyPaymentRelationService::class);
        $this->app->bind(PaymentInfoServiceInterface::class, PaymentInfoService::class);

        //Promotion IAP
        $this->app->bind(PromotionInAppPurchaseSettingServiceInterface::class, PromotionInAppPurchaseSettingService::class);

        //Vendor Subscription Plan
        $this->app->bind(VendorSubscriptionPlanSettingServiceInterface::class, VendorSubscriptionPlanSettingService::class);

        // Available Currency
        $this->app->bind(AvailableCurrencyServiceInterface::class, AvailableCurrencyService::class);

        $this->app->bind(SubMenuGroupServiceInterface::class, SubMenuGroupService::class);

        //Vendor
        $this->app->bind(VendorServiceInterface::class, VendorService::class);

        //Vendor Branch
        $this->app->bind(VendorBranchServiceInterface::class, VendorBranchService::class);

        //Vendor Info
        $this->app->bind(VendorInfoServiceInterface::class, VendorInfoService::class);

        //Vendor Application
        $this->app->bind(VendorApplicationServiceInterface::class, VendorApplicationService::class);

        //Vendor Approval
        $this->app->bind(VendorApprovalServiceInterface::class, VendorApprovalService::class);

        //Vendor Reject
        $this->app->bind(VendorRejectServiceInterface::class, VendorRejectService::class);

        //Vendor Role
        $this->app->bind(VendorRoleServiceInterface::class, VendorRoleService::class);

        //VendorUserPermission
        $this->app->bind(VendorUserPermissionServiceInterface::class, VendorUserPermissionService::class);

        //VendorRolePermission
        $this->app->bind(VendorRolePermissionServiceInterface::class, VendorRolePermissionService::class);

        // PushNotificationMessage
        $this->app->bind(PushNotificationMessageServiceInterface::class, PushNotificationMessageService::class);

        // PushNotificationUser
        $this->app->bind(PushNotificationUserServiceInterface::class, PushNotificationUserService::class);

        // FirebaseCloudMessaging
        $this->app->bind(FirebaseCloudMessagingServiceInterface::class, FirebaseCloudMessagingService::class);

        // PushNotificationReadUser
        $this->app->bind(PushNotificationReadUserServiceInterface::class, PushNotificationReadUserService::class);

        // PushNotificationToken
        $this->app->bind(PushNotificationTokenServiceInterface::class, PushNotificationTokenService::class);

        // Configuration
        $this->app->bind(BackendSettingServiceInterface::class, BackendSettingService::class);
        $this->app->bind(FrontendSettingServiceInterface::class, FrontendSettingService::class);
        $this->app->bind(MobileSettingServiceInterface::class, MobileSettingService::class);
        $this->app->bind(SystemConfigServiceInterface::class, SystemConfigService::class);
        $this->app->bind(SettingServiceInterface::class, SettingService::class);

        // ChatHistory
        $this->app->bind(ChatHistoryServiceInterface::class, ChatHistoryService::class);

        // ChatNoti
        $this->app->bind(ChatNotiServiceInterface::class, ChatNotiService::class);

        // Chat
        $this->app->bind(ChatServiceInterface::class, ChatService::class);

        // Item
        $this->app->bind(ItemInfoServiceInterface::class, ItemInfoService::class);

        // CartItem
        $this->app->bind(CartItemServiceInterface::class, CartItemService::class);

        // PaidItemHistory
        $this->app->bind(PaidItemHistoryServiceInterface::class, PaidItemHistoryService::class);

        // UiType
        $this->app->bind(UiTypeServiceInterface::class, UiTypeService::class);

        // AdPostType
        $this->app->bind(AdPostTypeServiceInterface::class, AdPostTypeService::class);

        // HandleInertiaRequest
        $this->app->bind(HandleInertiaRequestServiceInterface::class, HandleInertiaRequestService::class);

        //Item Currency
        $this->app->bind(ItemCurrencyServiceInterface::class, ItemCurrencyService::class);


    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // app('debugbar')->disable();
        Paginator::useBootstrap();
        JsonResource::withoutWrapping();

        try {
            if (DB::connection()->getPdo()) {
                $mailSetting = BackendSettingFacade::get();
                if ($mailSetting) {
                    $data = [
                        'driver' => 'smtp',
                        'host' => $mailSetting->smtp_host,
                        'port' => $mailSetting->smtp_port,
                        'encryption' => $mailSetting->smtp_encryption,
                        'username' => $mailSetting->smtp_user,
                        'password' => $mailSetting->smtp_pass,
                        'pretend' => false,
                        'verify_peer' => false,
                        'from' => [
                            'address' => $mailSetting->sender_email,
                            'name' => $mailSetting->sender_name,
                        ],
                    ];
                    Config::set('mail', $data);
                }
            }
        } catch (Exception $e) {
            // echo "Unable to connect";
        }
    }
}
