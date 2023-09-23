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
        Schema::create('declaracion', function (Blueprint $table) {
            $table->string('id');
            $table->integer('year');
            $table->string('correo');
            $table->string('telefono');
            $table->string('direccion');
            $table->string('region');
            $table->string('comuna');
            $table->string('ciudad');
            $table->tinyInteger('estado_civil');
            $table->tinyInteger('afp');
            $table->string('trabajo')->nullable();
            $table->string('tel_trabajo')->nullable();
            $table->boolean('declaracion_sii')->default(false);
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
            $table->bigInteger('ingreso_total_deudor')->default('0');
            $table->float('ingreso_total_deudor_utm', 8, 2)->default('0.00');
            $table->bigInteger('ingreso_total_conyuge')->default('0');
            $table->float('ingreso_total_conyuge_utm', 8, 2)->default('0.00');
            $table->float('cuota_preliminar', 8, 2)->default('0.00');
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
        Schema::dropIfExists('declaracion');
    }
};
