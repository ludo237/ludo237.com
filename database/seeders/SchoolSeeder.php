<?php

namespace Database\Seeders;

use Database\Factories\SchoolFactory;
use Database\Factories\UrlFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;

class SchoolSeeder extends Seeder
{
    public function run(): void
    {
        $school = SchoolFactory::new()
            ->create([
                'name' => 'S.U.P.S.I',
                'avatar' => 'https://www.supsi.ch/o/supsi-v2-theme/images/logo/supsi-logo.svg',
                'description' => 'I learned the basic of Computer Science, Match analysis and Software design that helped, and still help, me in my work experience',
                'location' => 'Manno - Switzerland',
                'started_at' => Date::create(2012, 9, 01),
                'ended_at' => Date::create(2013, 9, 01),
            ]);

        UrlFactory::new()
            ->for($school, 'owner')
            ->create([
                'name' => 'Official website',
                'href' => 'https://supsi.ch',
                'type' => 'website',
            ]);

        $school = SchoolFactory::new()
            ->create([
                'name' => 'Standford University',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/1024px-Seal_of_Leland_Stanford_Junior_University.svg.png',
                'description' => 'Basic Knowledge of Machine Learning and Neural Networks, Machine LearningBasic Knowledge of Machine Learning and Neural Networks, Machine Learning',
                'location' => 'Remote',
                'started_at' => Date::create(2015, 1, 01),
                'ended_at' => Date::create(2016, 1, 01),
            ]);

        UrlFactory::new()
            ->for($school, 'owner')
            ->create([
                'name' => 'Official website',
                'href' => 'https://www.stanford.edu/',
                'type' => 'website',
            ]);
    }
}
