<?php

namespace Modules\Core\Http\Services\Configuration;

use App\Config\Cache\AppInfoCache;
use Carbon\Carbon;
use App\Http\Services\PsService;
use Illuminate\Support\Facades\DB;
use App\Config\Cache\FeSettingCache;
use Illuminate\Support\Facades\Auth;
use Modules\Core\Constants\Constants;
use Modules\Core\Http\Facades\PsCache;
use Modules\Core\Http\Services\ColorService;
use App\Http\Contracts\Image\ImageServiceInterface;
use Modules\Core\Entities\Configuration\FrontendSetting;
use App\Http\Contracts\Configuration\FrontendSettingServiceInterface;

class FrontendSettingService extends PsService implements FrontendSettingServiceInterface
{
    public function __construct(protected ColorService $colorService,
        protected ImageServiceInterface $imageService) {}

    // currently not using save function
    public function save($frontendSettingData, $frontendColors = [], $frontendLogo = null, $frontendIcon = null, $frontendBanner = null, $appBrandingImage = null, $frontendMetaImage = null)
    {
        DB::beginTransaction();
        try {
            // update frontend settings
            $this->saveFrontendSetting($frontendSettingData);

            // update frontend color
            foreach ($frontendColors as $frontendColor) {
                $frontend_color = $this->perpareFrontendColor($frontendColor);
                $this->colorService->update($frontend_color);
            }

            // frontend logo
            $logoData = $this->prepareImageData(Constants::frontendLogo);
            $this->imageService->save($frontendLogo, $logoData);

            // frontend icon
            $iconData = $this->prepareImageData(Constants::frontendIcon);
            $this->imageService->save($frontendIcon, $iconData);

            // frontend banner
            $bannerData = $this->prepareImageData(Constants::frontendBanner);
            $this->imageService->save($frontendBanner, $bannerData);

            // app branding
            $appBrandingData = $this->prepareImageData(Constants::appBrandingImage);
            $this->imageService->save($appBrandingImage, $appBrandingData);

            // app branding
            $metaImageData = $this->prepareImageData(Constants::metaImage);
            $this->imageService->save($frontendMetaImage, $metaImageData);

            PsCache::clear(AppInfoCache::BASE);

            DB::commit();

            PsCache::clear(FeSettingCache::BASE);
        } catch (\Throwable $e) {
            DB::rollback();

            throw $e;
        }
    }

    public function update($id, $frontendSettingData, $frontendColors = [], $frontendLogoId = null, $frontendLogo = null, $frontendIconId = null, $frontendIcon = null, $frontendBannerId = null, $frontendBanner = null, $appBrandingImageId = null, $appBrandingImage = null, $frontendMetaImageId = null, $frontendMetaImage = null)
    {
        DB::beginTransaction();
        try {
            // update frontend settings
            $this->updateFrontendSetting($id, $frontendSettingData);

            // update frontend color
            foreach ($frontendColors as $frontendColor) {
                $frontend_color = $this->perpareFrontendColor($frontendColor);
                $this->colorService->update($frontend_color);
            }

            // frontend logo
            $logoData = $this->prepareImageData(Constants::frontendLogo);
            $this->imageService->update($frontendLogoId, $frontendLogo, $logoData);

            // frontend icon
            $iconData = $this->prepareImageData(Constants::frontendIcon);
            $this->imageService->update($frontendIconId, $frontendIcon, $iconData);

            // frontend banner
            $bannerData = $this->prepareImageData(Constants::frontendBanner);
            $this->imageService->update($frontendBannerId, $frontendBanner, $bannerData);

            // app branding
            $appBrandingData = $this->prepareImageData(Constants::appBrandingImage);
            $this->imageService->update($appBrandingImageId, $appBrandingImage, $appBrandingData);

            // app branding
            $metaImageData = $this->prepareImageData(Constants::metaImage);
            $this->imageService->update($frontendMetaImageId, $frontendMetaImage, $metaImageData);

            PsCache::clear(AppInfoCache::BASE);

            DB::commit();

            PsCache::clear(FeSettingCache::BASE);
        } catch (\Throwable $e) {
            DB::rollback();

            throw $e;
        }
    }

    public function get($id = null, $relation = null)
    {
        $param = [$id, $relation];

        return PsCache::remember([FeSettingCache::BASE], FeSettingCache::GET_EXPIRY, $param,
            function() use($id, $relation) {
                return FrontendSetting::when($id, function ($query, $id) {
                        $query->where(FrontendSetting::id, $id);
                    })
                    ->when($relation, function ($query, $relation) {
                        $query->with($relation);
                    })
                    ->first();
            });
    }

    public function colorGenerate($frontendColors)
    {
        DB::beginTransaction();
        try {
            foreach (json_decode($frontendColors) as $frontendColor) {
                $frontend_color = $this->perpareFrontendColor($frontendColor);
                $this->colorService->update($frontend_color);
            }

            $frontendSetting = $this->get();
            $oldFilename = 'css/custom_color_'.$frontendSetting->color_changed_code.'.css';

            $frontendSettingData = $this->prepareColorChangedCode();
            $this->updateFrontendSetting($frontendSetting->id, $frontendSettingData);

            PsCache::clear(AppInfoCache::BASE);

            DB::commit();

            syncFrontendColors();

            PsCache::clear(FeSettingCache::BASE);

            return [
                'msg' => 'Color Generated Successfully',
                'flag' => Constants::success,
            ];

        } catch (\Throwable $e) {
            DB::rollback();

            throw $e;
        }
    }

    //////////////////////////////////////////////////////////////////
    /// Private Function
    //////////////////////////////////////////////////////////////////

    ///---------------------------------------------------------------
    /// Data Preparation
    ///---------------------------------------------------------------
    private function perpareFrontendColor($frontendColor)
    {
        return [
            'id' => $frontendColor->id,
            'key' => $frontendColor->key,
            'value' => $frontendColor->value,
            'title' => $frontendColor->title,
            'fe_color' => $frontendColor->fe_color,
            'mb_color' => $frontendColor->mb_color,
        ];
    }

    private function prepareImageData($imageType)
    {
        return [
            'img_parent_id' => 1,
            'img_type' => $imageType,
        ];
    }

    private function prepareColorChangedCode()
    {
        return [
            'color_changed_code' => Carbon::now()->getPreciseTimestamp(3),
        ];
    }

    ///---------------------------------------------------------------
    /// Database
    ///---------------------------------------------------------------
    private function saveFrontendSetting($frontendSettingData)
    {
        $frontendSetting = new FrontendSetting;
        $frontendSetting->fill($frontendSettingData);
        $frontendSetting->added_user_id = Auth::id();
        $frontendSetting->save();

        return $frontendSetting;
    }

    private function updateFrontendSetting($id, $frontendSettingData)
    {
        $frontendSetting = $this->get($id);
        $frontendSetting->updated_user_id = Auth::id();
        $frontendSetting->update($frontendSettingData);

        return $frontendSetting;
    }
}
