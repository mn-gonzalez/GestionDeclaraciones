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
        Schema::create('conyuge', function (Blueprint $table) {
            $table->id();
            $table->string('rut');
            $table->string('nombres');
            $table->string('ap_paterno');
            $table->string('ap_materno');
            $table->string('ref_declaracion');
            $table->integer('enero')->default('0');
            $table->integer('febrero')->default('0');
            $table->integer('marzo')->default('0');
            $table->integer('abril')->default('0');
            $table->integer('mayo')->default('0');
            $table->integer('junio')->default('0');
            $table->integer('julio')->default('0');
            $table->integer('agosto')->default('0');
            $table->integer('septiembre')->default('0');
            $table->integer('octubre')->default('0');
            $table->integer('noviembre')->default('0');
            $table->integer('diciembre')->default('0');
            $table->float('enero_utm', 8, 2)->default('0.00');
            $table->float('febrero_utm', 8, 2)->default('0.00');
            $table->float('marzo_utm', 8, 2)->default('0.00');
            $table->float('abril_utm', 8, 2)->default('0.00');
            $table->float('mayo_utm', 8, 2)->default('0.00');
            $table->float('junio_utm', 8, 2)->default('0.00');
            $table->float('julio_utm', 8, 2)->default('0.00');
            $table->float('agosto_utm', 8, 2)->default('0.00');
            $table->float('septiembre_utm', 8, 2)->default('0.00');
            $table->float('octubre_utm', 8, 2)->default('0.00');
            $table->float('noviembre_utm', 8, 2)->default('0.00');
            $table->float('diciembre_utm', 8, 2)->default('0.00');
            $table->timestamps();
            $table->foreign('ref_declaracion')->references('id')->on('tramite')
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
        Schema::dropIfExists('conyuge');
    }
};
