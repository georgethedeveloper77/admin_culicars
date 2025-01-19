<?php

namespace Modules\Theme\Http\Controllers\Backend\Rests\App\V1_0\Theme;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Theme\Http\Services\ThemeService;

class ThemeApiController extends Controller
{
    protected $themeService;

    public function __construct(ThemeService $themeService)
    {
        $this->themeService = $themeService;
    }

    public function syncThemes(Request $request)
    {
        $response = $this->themeService->syncThemes($request);

        return $response;
    }
}
