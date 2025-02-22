<?php

use Carbon\Carbon;
use Modules\Core\Entities\Menu\Module;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('psx_user_infos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('core_keys_id');
            $table->string('value')->nullable();
            $table->string('ui_type_id')->nullable();
            $table->timestamp('added_date');
            $table->foreignId('added_user_id');
            $table->timestamp('updated_date')->nullable();
            $table->foreignId('updated_user_id')->nullable();
            $table->smallInteger('updated_flag')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return voida
     */
    public function down()
    {
        Schema::dropIfExists('psx_user_infos');
    }
};
