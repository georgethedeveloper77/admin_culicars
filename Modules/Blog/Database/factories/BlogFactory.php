<?php

namespace Modules\Blog\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Blog\Entities\Blog;
use Modules\Core\Entities\Location\LocationCity;

class BlogFactory extends Factory
{
    protected $model = Blog::class;

    public function definition()
    {
        return [
            'name' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'location_city_id' => LocationCity::factory(),
            'status' => '0',
            'added_user_id' => 1,
        ];
    }
}
