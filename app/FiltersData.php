<?php

namespace App;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;


class FiltersData implements Filter
{
    public function __invoke(Builder $query, $value, string $property) : Builder
    {
        return $query->orwhere('partner_name', $value)
            ->orwhere('partner_taxid', $value)
            ->orwhere('number', $value);
        
    }
}
