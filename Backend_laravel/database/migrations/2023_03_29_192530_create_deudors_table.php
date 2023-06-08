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
            $table->string('telefono')->nullable();
            $table->string('contrasena');
            $table->string('ciudad')->nullable();
            $table->string('comuna')->nullable();
            $table->string('region')->nullable();
            $table->string('direccion')->nullable();
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
