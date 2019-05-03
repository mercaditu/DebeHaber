<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ImpexExpense extends Model
{
    protected $table = 'impex_expenses';

    protected $fillable = [
        'id'
    ];
    //
    /**
     * Get the impex that owns the model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function impex()
    {
        return $this->belongsTo(Impex::class);
    }

    /**
     * Get the transaction that owns the model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function transactionDetail()
    {
        return $this->belongsTo(TransactionDetail::class);
    }

    /**
     * Get the chart that owns the model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function chart()
    {
        return $this->belongsTo(Chart::class);
    }
}
