<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableConnections extends Migration
{
    public function up()
    {
        Schema::create('Connections', function (Blueprint $table) 
        {
            $table->increments('Id');
            $table->string('Name');
            $table->string('Driver');
            $table->string('Host');
            $table->string('Port'); // TODO: Integer.
            $table->string('Username');
            $table->string('Password');
            $table->string('Database');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('Connections');
    }
}
