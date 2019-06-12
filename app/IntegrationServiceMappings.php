<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IntegrationServiceMappings extends Model
{
    protected $fillable = [
        'id'
    ];

     /**
    * Get the transaction that owns the model.
    *
    * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
    */
    public function integrationservice()
    {
        return $this->belongsTo(IntegrationService::class);
    }

   
}
