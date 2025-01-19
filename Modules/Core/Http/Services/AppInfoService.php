<?php
namespace Modules\Core\Http\Services;

use App\Config\Cache\AppInfoCache;
use App\Config\Cache\BeSettingCache;
use App\Config\ps_constant;
use App\Http\Services\PsService;
use Modules\Core\Constants\Constants;
use Modules\Core\Http\Facades\PsCache;
use Modules\Core\Transformers\Api\App\V1_0\AppInfo\AppInfoApiResource;

use function PHPUnit\Framework\returnSelf;

class AppInfoService extends PsService
{
    protected $mobileSettingService, $frontendSettingService, $systemConfigService, $deviceTokenParaApi, $loginUserIdParaApi, $userAccessApiTokenService, $forbiddenStatusCode;

    public function __construct(UserAccessApiTokenService $userAccessApiTokenService,MobileSettingService $mobileSettingService, FrontendSettingService $frontendSettingService, SystemConfigService $systemConfigService)
    {
        $this->mobileSettingService = $mobileSettingService;
        $this->frontendSettingService = $frontendSettingService;
        $this->systemConfigService = $systemConfigService;
        $this->userAccessApiTokenService = $userAccessApiTokenService;

        $this->loginUserIdParaApi = ps_constant::loginUserIdParaFromApi;
        $this->deviceTokenParaApi = ps_constant::deviceTokenKeyFromApi;
        $this->forbiddenStatusCode = Constants::forbiddenStatusCode;
    }

    // for api
    public function indexFromApi()
    {

        $data = PsCache::remember([AppInfoCache::BASE], AppInfoCache::GET_EXPIRY, null,
                function(){
                    return new AppInfoApiResource([]);
                });
        return responseDataApi($data);

    }

    public function forVendor()
    {
        $appInfo = new AppInfoApiResource([]);
        return $appInfo;
    }

}
