<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IntegrationService extends Model
{
    protected $fillable = [
        'id'
    ];

     /**
    * Get the details for the model.
    *
    * @return \Illuminate\Database\Eloquent\Relations\HasMany
    */
    public function details()
    {
        return $this->hasMany(IntegrationServiceMappings::class);
    }
   
}
