<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tramite', function (Blueprint $table) {
            $table->string('id')->unique();
            $table->string('rut_deudor');
            $table->string('nombres');
            $table->string('ap_paterno');
            $table->string('ap_materno');
            $table->date('fecha');
            $table->tinyInteger('estado');
            $table->timestamps();
            //foreign keys
            $table->foreign('rut_deudor')->references('rut')->on('deudor');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tramite');
    }
};
