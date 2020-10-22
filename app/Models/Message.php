<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    public static int $CHAT_MAX = 50;
    protected $appends = ['user'];
    protected $guarded = [];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function getUserAttribute() {
        return $this->user()->first();
    }
}
