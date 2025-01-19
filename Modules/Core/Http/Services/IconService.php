<?php

namespace Modules\Core\Http\Services;

use App\Config\ps_constant;
use App\Http\Services\PsService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Modules\Core\Constants\Constants;
use Modules\Core\Entities\CoreAbout;
use Modules\Core\Entities\Utilities\CoreField;
use Modules\Core\Entities\CoreImage;
use Modules\Core\Entities\Utilities\CustomField;
use Modules\Core\Entities\Icon;
use Modules\Core\Entities\Utilities\DynamicColumnVisibility;
use Modules\Core\Http\Services\ImageService;
use Modules\Core\Transformers\Api\App\V1_0\About\AboutApiResource;
use Modules\Core\Transformers\Backend\Model\About\AboutWithKeyResource;
use Modules\DataDeletionPolicy\Http\Services\DataDeletionPolicyService;

class IconService extends PsService
{

    public function __construct() {}

    public function getIcons()
    {
        $icons = Icon::all();
        return $icons;
    }
}
