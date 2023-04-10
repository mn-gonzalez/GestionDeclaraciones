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
        Schema::create('devolucion', function (Blueprint $table) {
            $table->string('id');
            $table->string('correo');
            $table->string('tipo_deuda');
            $table->tinyInteger('retiro_oficina');
            $table->string('domicilio');
            $table->text('solicitud');
            $table->text('observaciones');
            $table->text('archivo');
            $table->timestamps();
            //foreign keys
            $table->foreign('id')->references('id')->on('tramite')
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
        Schema::dropIfExists('devolucion');
    }
};
