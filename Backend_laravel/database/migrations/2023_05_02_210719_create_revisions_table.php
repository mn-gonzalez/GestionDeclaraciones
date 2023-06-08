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
        Schema::create('revision', function (Blueprint $table) {
            $table->id();
            $table->string('ref_tramite');
            $table->string('ref_funcionario');
            $table->date('fecha');
            $table->text('comentarios')->nullable();
            $table->string('estado');
            $table->foreign('ref_tramite')->references('id')->on('tramite')
            ->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('ref_funcionario')->references('rut')->on('persona')
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
        Schema::dropIfExists('revision');
    }
};
