<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Video;
use App\Models\Color;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Video::create(['video_id' => 'dQw4w9WgXcQ']);

        Color::create(['value' => 'rgb(127, 255, 127)']);
        Color::create(['value' => 'rgb(255, 127, 0)']);
        Color::create(['value' => 'rgb(255, 0, 127)']);
        Color::create(['value' => 'rgb(0, 255, 127)']);
        Color::create(['value' => 'rgb(200, 200, 0)']);
        Color::create(['value' => 'rgb(127, 0, 127)']);
        Color::create(['value' => 'rgb(0, 200, 200)']);
        Color::create(['value' => 'rgb(200, 0, 200)']);
        Color::create(['value' => 'rgb(200, 0, 0)']);
        Color::create(['value' => 'rgb(0, 200, 0)']);
    }
}
