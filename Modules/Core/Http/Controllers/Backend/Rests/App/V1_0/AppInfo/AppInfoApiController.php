<?php

namespace Modules\Core\Http\Controllers\Backend\Rests\App\V1_0\AppInfo;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Core\Http\Services\AppInfoService;
use Modules\Core\Http\Services\FrontendSettingService;
use Modules\Core\Transformers\Api\App\V1_0\CoreKey\CoreFieldApiResource;

class AppInfoApiController extends Controller
{
    protected $appInfoService, $frontendSettingService;

    public function __construct(AppInfoService $appInfoService, FrontendSettingService $frontendSettingService)
    {
        $this->appInfoService = $appInfoService;
        $this->frontendSettingService = $frontendSettingService;
    }

    public function appInfo(Request $request)
    {
        $appInfo = $this->appInfoService->indexFromApi($request);
        return $appInfo;

    }
    public function feSettingConfig(Request $request)
    {
        $appInfo = $this->frontendSettingService->createFromApi($request);
        if(isset($appInfo['core'])) {

            $core = CoreFieldApiResource::collection($appInfo['core']);
        }

        return response()->json([
            "core" => $core,
            "custom" => [],
            "vendor_list" => [],
        ],200);

    }

}
