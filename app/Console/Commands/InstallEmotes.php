<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Emote;

class InstallEmotes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'install-emotes';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Pushes emotes in storage into the database.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     * 
     * Make sure you have the following:
     * A folder named "emotes" at /storage/app/public/emotes
     * A database table named "emotes" with a "name" and "path" column
     * And that every emote ends with ".png"
     *
     * @return void
     */
    public function handle()
    {
        $emotes = glob(storage_path('app/public').'/emotes'.'/*.png');
        $emotesInstalled = 0;
        $this->line("<fg=yellow>Installing emotes...</>");
        $bar = $this->output->createProgressBar(count($emotes));
        $bar->start();
        foreach($emotes as $emote) {
            $emote = str_replace('\\', '/', $emote);
            preg_match('/(.*\/)+(.+)/', $emote, $matches);
            $path = $matches[2];
            $name = explode('.', $path)[0];
            if (!Emote::where('name', $name)->first()) {
                Emote::create(['path' => $path, 'name' => $name]);
                $emotesInstalled += 1;
            }
            $bar->advance();
        }
        $bar->finish();
        $this->line("\n<fg=green;bg=>Installed $emotesInstalled emotes.</>");
    }
}
