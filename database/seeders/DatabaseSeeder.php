<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Video;

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
    }
}
