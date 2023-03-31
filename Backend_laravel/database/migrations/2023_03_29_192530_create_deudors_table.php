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
        Schema::create('deudor', function (Blueprint $table) {
            $table->string('rut');
            $table->string('telefono');
            $table->string('contrasena');
            $table->string('ciudad');
            $table->string('comuna');
            $table->string('region');
            $table->string('direccion');
            $table->timestamps();
            //foreign keys
            $table->foreign('rut')->references('rut')->on('persona')
            ->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deudor');
    }
};
