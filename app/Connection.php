<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Connection extends Model
{
    protected $table = 'connections';
    protected $fillable = ['Name', 'Driver', 'Host', 'Port', 'Username', 'Password', 'Database'];
}
