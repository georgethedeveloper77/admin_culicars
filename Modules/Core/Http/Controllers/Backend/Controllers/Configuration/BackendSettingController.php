<?php

namespace Modules\Core\Http\Controllers\Backend\Controllers\Configuration;

use App\Config\ps_constant;
use App\Http\Contracts\Configuration\BackendSettingServiceInterface;
use App\Http\Contracts\Utilities\CoreFieldServiceInterface;
use App\Http\Controllers\PsController;
use Modules\Core\Constants\Constants;
use Modules\Core\Entities\Configuration\BackendSetting;
use Modules\Core\Entities\Project;
use Modules\Core\Http\Requests\Configuration\StoreBackendSettingRequest;
use Modules\Core\Http\Requests\Configuration\StoreCheckSmtpConfigRequest;
use Modules\Core\Http\Requests\Configuration\UpdateBackendSettingRequest;
use Modules\Core\Http\Services\ColorService;

class BackendSettingController extends PsController
{
    private const parentPath = 'backend_setting';

    private const indexPath = self::parentPath.'/Index';

    private const createPath = self::parentPath.'/Create';

    private const editPath = self::parentPath.'/Edit';

    private const indexRoute = self::parentPath.'.index';

    private const editRoute = self::parentPath.'.edit';

    private const backendLogoKey = 'backend_logo';

    private const favIconKey = 'fav_icon';

    private const waterMarkImageKey = 'backend_water_mask_image';

    private const waterMarkBackgroundKey = 'water_mask_background';

    private const firebasePrivateKeyJsonFile = 'firebasePrivateKeyJsonFile';

    public function __construct(protected BackendSettingServiceInterface $backendSettingService,
        protected CoreFieldServiceInterface $coreFieldService,
        protected ColorService $colorService)
    {
        parent::__construct();
    }

    public function index()
    {
        // check permission start
        $this->handlePermissionWithModel(BackendSetting::class, Constants::viewAnyAbility);

        $dataArr = $this->prepareIndexData();

        return renderView(self::editPath, $dataArr);
    }

    public function store(StoreBackendSettingRequest $request)
    {
        try {
            $validatedData = $request->validated();

            $backendLogo = $request->file(self::backendLogoKey);
            $favIcon = $request->file(self::favIconKey);
            $waterMarkImage = $request->file(self::waterMarkImageKey);
            $waterMarkBackground = $request->file(self::waterMarkBackgroundKey);
            $firebasePrivateKeyJsonFile = $request->file(self::firebasePrivateKeyJsonFile);

            $this->backendSettingService->save(
                backendSettingData: $validatedData,
                backendLogo: $backendLogo,
                backendFavIcon: $favIcon,
                waterMarkImage: $waterMarkImage,
                waterMarkBackground: $waterMarkBackground,
                firebasePrivateKeyJsonFile: $firebasePrivateKeyJsonFile
            );

            return redirectView(self::indexRoute);
        } catch (\Exception $e) {
            return redirectViewWithError(self::indexRoute, $e->getMessage());
        }
    }

    public function update(UpdateBackendSettingRequest $request, $id)
    {
        try {
            $validatedData = $request->validated();

            $backendLogo = $request->file(self::backendLogoKey);
            $favIcon = $request->file(self::favIconKey);
            $waterMarkImage = $request->file(self::waterMarkImageKey);
            $waterMarkBackground = $request->file(self::waterMarkBackgroundKey);
            $firebasePrivateKeyJsonFile = $request->file(self::firebasePrivateKeyJsonFile);

            $this->backendSettingService->update(id: $id,
                backendSettingData: $validatedData,
                backendLogoId: $request->input('backend_logo_id'),
                backendLogo: $backendLogo,
                backendFavIconId: $request->input('backend_fav_icon_id'),
                backendFavIcon: $favIcon,
                waterMarkImageId: $request->input('water_mark_image_id'),
                waterMarkImage: $waterMarkImage,
                waterMarkBackgroundId: $request->input('water_mark_background_id'),
                waterMarkBackground: $waterMarkBackground,
                firebasePrivateKeyJsonFile: $firebasePrivateKeyJsonFile
            );

            return redirectView(self::indexRoute);
        } catch (\Exception $e) {
            return redirectViewWithError(self::indexRoute, $e->getMessage(), $id);
        }
    }

    public function languageRefresh()
    {
        generateAllLanguage();

        return redirectView(self::indexRoute, null, 'langSuccess');
    }

    public function checkSmtpConfig(StoreCheckSmtpConfigRequest $request)
    {
        try {
            $mailData = $this->getMailData();

            $dataArr = $this->backendSettingService->checkSmtpConfig($request->email, $mailData);

            redirectView(null, $dataArr['msg']);

        } catch (\Exception $e) {
            return redirectViewWithError(self::indexRoute, $e->getMessage());
        }
    }

    ////////////////////////////////////////////////////////////////////
    /// Private Functions
    ////////////////////////////////////////////////////////////////////

    //-------------------------------------------------------------------
    // Data Preparation
    //-------------------------------------------------------------------
    private function prepareIndexData()
    {
        $relation = ['backend_logo', 'fav_icon', 'backend_login_image', 'backend_meta_image', 'backend_water_mask_image', 'water_mask_background', 'water_mask_background_org'];
        $backendSetting = $this->backendSettingService->get(id: null, relation: $relation);

        $coreFieldFilterSettings = $this->coreFieldService->getAll(code: Constants::backendSetting,
            relation: null, limit: null, offset: null, isDel: 0, withNoPag: 1
        );

        $commonColor = $this->colorService->getColorByKey('backend_color');

        $uploadSetting = $this->getUploadSetting();

        $file = ps_constant::privateKeyFileNameForFCM;
        $filePath = base_path('storage/firebase/'.$file);

        $firebasePrivateJsonFileName = null;
        if (file_exists($filePath)) {
            $firebasePrivateJsonFileName = $file;
        }

        // prepare for permission
        $keyValueArr = [
            'updateBackendSetting' => 'update-backendSetting',
        ];

        return [
            'backend_setting' => $backendSetting,
            'coreFieldFilterSettings' => $coreFieldFilterSettings,
            'commonColor' => $commonColor,
            'paddingList' => $this->getWaterMarkPadding(),
            'uploadSettingList' => $uploadSetting['uploadSettingList'],
            'uploadSettingDocUrl' => $uploadSetting['uploadSettingDocUrl'],
            'firebasePrivateJsonFileName' => $firebasePrivateJsonFileName,
            'can' => $this->permissionService->checkingForCreateAbilityWithModel($keyValueArr),
        ];
    }

    //-------------------------------------------------------------------
    // Others
    //-------------------------------------------------------------------
    private function getWaterMarkPadding()
    {
        return [
            [
                'id' => 1,
                'label' => __('core__watermask_bottom_right'),
                'value' => 'bottom-right',
            ],
            [
                'id' => 2,
                'label' => __('core__watermask_bottom'),
                'value' => 'bottom',
            ],
            [
                'id' => 3,
                'label' => __('core__watermask_bottom_left'),
                'value' => 'bottom-left',
            ],
            [
                'id' => 4,
                'label' => __('core__watermask_top_right'),
                'value' => 'top-right',
            ],
            [
                'id' => 5,
                'label' => __('core__watermask_top'),
                'value' => 'top',
            ],
            [
                'id' => 6,
                'label' => __('core__watermask_top_left'),
                'value' => 'top-left',
            ],
            [
                'id' => 7,
                'label' => __('core__watermask_right'),
                'value' => 'right',
            ],
            [
                'id' => 8,
                'label' => __('core__watermask_center'),
                'value' => 'center',
            ],
            [
                'id' => 9,
                'label' => __('core__watermask_left'),
                'value' => 'left',
            ],
        ];
    }

    private function getUploadSetting()
    {
        $uploadSettingList = [
            [
                'id' => 1,
                'label' => __('core__admin'),
                'value' => 'admin',
            ],
            [
                'id' => 2,
                'label' => __('core__admin_bluemark'),
                'value' => 'admin-bluemark',
            ],
            [
                'id' => 3,
                'label' => __('core__be_all'),
                'value' => 'all',
            ],
        ];

        $uploadSettingDocUrl = 'https://doc.clickup.com/24312566/p/h/q5yqp-199838/8ac9a7506f70fc3';

        $project = Project::first();
        if ($project->base_project_id !== ps_constant::cgcBaseProjectId) {
            $uploadSettingList[] = [
                'id' => 4,
                'label' => __('core__vendor_only'),
                'value' => 'vendor-only',
            ];
            $uploadSettingDocUrl = 'https://doc.clickup.com/24312566/p/h/q5yqp-158984/6004a6ecd2e11ec';
        }

        return [
            'uploadSettingList' => $uploadSettingList,
            'uploadSettingDocUrl' => $uploadSettingDocUrl,
        ];
    }

    private function getMailData()
    {
        return [
            'title' => 'Mail from '.__('site_name'),
            'body' => 'This is for testing email using smtp.',
        ];
    }
}
