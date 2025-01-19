<?php

namespace Modules\Core\Http\Services;

use App\Http\Services\PsService;
use Illuminate\Support\Facades\DB;
use Modules\Core\Entities\Project;
use App\Config\ps_constant;
use App\Config\ps_url;
use Illuminate\Support\Facades\Auth;
use Modules\Core\Entities\Utilities\CoreField;
use Modules\Core\Entities\CoreKeyCounter;
use Modules\Core\Entities\CoreKeyType;
use Modules\Core\Entities\Utilities\CustomField;
use Modules\Core\Entities\Utilities\DynamicColumnVisibility;
use Modules\Core\Entities\Table;

class BuilderSettingService extends PsService
{

    protected $languageStringService;

    public function __construct(LanguageStringService $languageStringService)
    {
        $this->languageStringService = $languageStringService;
    }

    public function getProject()
    {
        $project = Project::first();

        return $project;
    }

    public function index()
    {
        $project = $this->getProject();
        $project['builder_url'] = ps_constant::builderDomain;

        $dataArr = [
            'builder_setting' => $project
        ];

        return $dataArr;
    }

    public function update($request, $id)
    {
        try {
            DB::beginTransaction();
            $builder_setting = Project::find($id);
            $builder_setting->project_url = $request->project_url;
            $builder_setting->token = $request->token;
            $builder_setting->update();

            $oldBuilderDomain = ps_constant::builderDomain;
            $newBuilderDomain = $request->builder_url;

            $file = '../app/Config/ps_constant.php';
            $code = file_get_contents($file);
            $new_const = str_replace('const builderDomain = "' . $oldBuilderDomain . '";', 'const builderDomain = "' . $newBuilderDomain . '";', $code);
            file_put_contents($file, $new_const);

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            return ['error' => $e->getMessage()];
        }

        return $builder_setting;
    }

    public function handleProjectReset()
    {

        $checkBuilderConnection = getHttpWithApiKey(ps_constant::base_url, getApiKey(), ps_url::checkBuilderConnection);
        // dd($checkBuilderConnection);
        if ($checkBuilderConnection?->status !== "success" || empty($checkBuilderConnection)) {

            $msg = $checkBuilderConnection?->message ? $checkBuilderConnection?->message : __('connection__failed');
            $dataArr = [
                "flag" => 'error',
                "msg" => $msg
            ];

            return $dataArr;
        }

        $sync_project = getHttpWithApiKey(ps_constant::base_url, getApiKey(), ps_url::getNextProjectJson, "&api_key=" . getApiKey());

        Table::truncate();
        CustomField::truncate();
        CoreField::truncate();
        DynamicColumnVisibility::truncate();

        // delete all data except pmt from psx_core_key_counters table start
        $coreKeyCounterIds = CoreKeyCounter::where("code", "!=", "pmt")->get()->pluck("id");
        CoreKeyCounter::destroy($coreKeyCounterIds);

        // prepare for counter table except pmt
        $coreKeyTypes = CoreKeyType::where("client_code", "!=", "pmt")->get();
        foreach ($coreKeyTypes as $coreKeyType) {
            $clientCustomizeUiCounter = CustomField::where("core_keys_id", 'like', $coreKeyType->client_code . '%')
                ->where('module_name', $coreKeyType->client_code)
                ->get()->count();

            $newcoreKeysCounter = new CoreKeyCounter();
            $newcoreKeysCounter->code = $coreKeyType->client_code;
            $newcoreKeysCounter->counter = 1;
            $newcoreKeysCounter->added_user_id = '1';
            $newcoreKeysCounter->save();
        }
        // delete all data except pmt from psx_core_key_counters table end

        // delete data of client custom field
        deleteDataOfClientCustomFields("ps-");

        // prepare data to re-add
        $project = $sync_project->project;
        $customFields = $sync_project->custom_field_infos;
        $coreFields = $sync_project->core_field_infos;
        $tables = $sync_project->tables;
        $coreKeyTypes = $sync_project->core_key_types;
        $languageStrings = [];

        DB::beginTransaction();
        try {

            // save or update in projects table
            Project::updateOrCreate(
                ['base_project_id' =>  $project->base_project_id],
                [
                    'id' => $project->id,
                    'project_name' => $project->project_name,
                    'project_code' => $project->project_code,
                    'project_url' => $project->project_url,
                    'first_time_sync' => 1,
                    'added_user_id' => Auth::id()
                ]
            );

            foreach ($customFields as $customField) {

                $languageString = new \stdClass();
                $languageString->key = $customField->name_key;
                $languageString->value  = $customField->name;
                array_push($languageStrings, $languageString);

                $languageStringPlaceholder = new \stdClass();
                $languageStringPlaceholder->key = $customField->placeholder_key;
                $languageStringPlaceholder->value  = $customField->placeholder;
                array_push($languageStrings, $languageStringPlaceholder);


                // save in customize_ui table
                $customizeUi = new CustomField();
                $customizeUi->id  = $customField->id;
                $customizeUi->table_id  = $customField->table_id;
                $customizeUi->project_name = $project->project_name;
                $customizeUi->project_id = $project->id;
                $customizeUi->name = $customField->name_key;
                $customizeUi->placeholder = $customField->placeholder_key;
                $customizeUi->ui_type_id = $customField->ui_type_id;
                $customizeUi->core_keys_id = $customField->core_keys_id;
                $customizeUi->is_delete = $customField->is_delete;
                $customizeUi->data_type = $customField->data_type;
                $customizeUi->module_name = $customField->module_name;
                $customizeUi->base_module_name = $customField->base_module_name;
                $customizeUi->enable = $customField->enable;
                $customizeUi->mandatory = $customField->mandatory;
                $customizeUi->is_show_sorting = $customField->is_show_sorting;
                $customizeUi->ordering = $customField->ordering;
                $customizeUi->is_show_in_filter = $customField->is_show_in_filter;
                $customizeUi->is_include_in_hideshow = $customField->is_include_in_hideshow;
                $customizeUi->is_show = $customField->is_show;
                $customizeUi->is_core_field = 0;
                $customizeUi->permission_for_enable_disable = $customField->permission_for_enable_disable;
                $customizeUi->permission_for_delete = $customField->permission_for_delete;
                $customizeUi->permission_for_mandatory = $customField->permission_for_mandatory;
                $customizeUi->added_user_id  = Auth::id();
                $customizeUi->save();

                if ($customField->is_include_in_hideshow == 1) {
                    // save in screen_display_ui_setting
                    $screenDisplayUiSetting = new DynamicColumnVisibility();
                    $screenDisplayUiSetting->module_name = $customField->module_name;
                    $screenDisplayUiSetting->key = $customField->core_keys_id;
                    $screenDisplayUiSetting->is_show = $customField->is_show;
                    $screenDisplayUiSetting->added_user_id = Auth::id();
                    $screenDisplayUiSetting->save();
                }
            }

            foreach ($coreFields as $coreField) {
                // save in core_field_filter_settings table

                $languageString = new \stdClass();
                $languageString->key = $coreField->name_key;
                $languageString->value  = $coreField->name;
                array_push($languageStrings, $languageString);

                $languageStringPlaceholder = new \stdClass();
                $languageStringPlaceholder->key = $coreField->placeholder_key;
                $languageStringPlaceholder->value  = $coreField->placeholder;
                array_push($languageStrings, $languageStringPlaceholder);

                $coreFieldFilterSetting = new CoreField();
                $coreFieldFilterSetting->id = $coreField->id;
                $coreFieldFilterSetting->table_id = $coreField->table_id;
                $coreFieldFilterSetting->project_name = $project->project_name;
                $coreFieldFilterSetting->project_id = $project->id;
                $coreFieldFilterSetting->label_name = $coreField->name_key;
                $coreFieldFilterSetting->module_name = $coreField->module_name;
                $coreFieldFilterSetting->base_module_name = $coreField->base_module_name;
                $coreFieldFilterSetting->field_name = $coreField->field_name;
                $coreFieldFilterSetting->placeholder = $coreField->placeholder_key;
                $coreFieldFilterSetting->data_type = $coreField->data_type;
                $coreFieldFilterSetting->is_delete = $coreField->is_delete;
                $coreFieldFilterSetting->enable = $coreField->enable;
                $coreFieldFilterSetting->mandatory = $coreField->mandatory;
                $coreFieldFilterSetting->is_show_sorting = $coreField->is_show_sorting;
                $coreFieldFilterSetting->ordering = $coreField->ordering;
                $coreFieldFilterSetting->is_show_in_filter = $coreField->is_show_in_filter;
                $coreFieldFilterSetting->is_include_in_hideshow = $coreField->is_include_in_hideshow;
                $coreFieldFilterSetting->is_show = $coreField->is_show;
                $coreFieldFilterSetting->is_core_field = 1;
                $coreFieldFilterSetting->permission_for_enable_disable = $coreField->permission_for_enable_disable;
                $coreFieldFilterSetting->permission_for_delete = $coreField->permission_for_delete;
                $coreFieldFilterSetting->permission_for_mandatory = $coreField->permission_for_mandatory;
                $coreFieldFilterSetting->added_user_id = Auth::id();
                $coreFieldFilterSetting->save();

                if ($coreField->is_include_in_hideshow == 1) {
                    // save in screen_display_ui_settings
                    $screenDisplayUiSetting = new DynamicColumnVisibility();
                    $screenDisplayUiSetting->module_name = $coreField->module_name;
                    $screenDisplayUiSetting->key = $coreField->field_name;
                    $screenDisplayUiSetting->is_show = $coreField->is_show;
                    $screenDisplayUiSetting->added_user_id = Auth::id();
                    $screenDisplayUiSetting->save();
                }
            }

            foreach ($tables as $tableObj) {
                // save in tables table
                $table = new Table();
                $table->id = $tableObj->id;
                $table->name = $tableObj->name;
                $table->description = $tableObj->description;
                $table->core_key_type_id = $tableObj->core_key_type_id;
                $table->is_only_for_core_field = $tableObj->is_only_for_core_field;
                $table->table_used_type_id = $tableObj->table_used_type_id;
                $table->added_user_id = Auth::id();
                $table->save();
            }

            $needRefresh = $this->languageStringService->importAllLanguageStrings($languageStrings, false);

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            $dataArr = [
                "flag" => 'success',
                "msg" => $e->getMessage(),
            ];
            return $dataArr;
        }

        $dataArr = [
            "flag" => 'success',
            "msg" => "Project Reset Success"
        ];
        return $dataArr;
        // return 'replace success';

    }
}
