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
        Schema::create('utm', function (Blueprint $table) {
            $table->integer('year')->primary();
            $table->integer('enero');
            $table->integer('febrero');
            $table->integer('marzo');
            $table->integer('abril');
            $table->integer('mayo');
            $table->integer('junio');
            $table->integer('julio');
            $table->integer('agosto');
            $table->integer('septiembre');
            $table->integer('octubre');
            $table->integer('noviembre');
            $table->integer('diciembre');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('utm');
    }
};
