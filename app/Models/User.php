<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $appends = ['color'];
    public $timestamps = false;
    protected $guarded = [];

    public function messages() {
        return $this->belongsToMany(User::class);
    }

    public function color() {
        return $this->belongsTo(Color::class);
    }

    public function getColorAttribute() {
        return $this->color()->first();
    }
}
