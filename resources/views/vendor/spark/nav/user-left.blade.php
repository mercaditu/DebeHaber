@isset($taxPayerData)
    <!-- Left Side Of Navbar -->
<li class="nav-item dropdown">
    <a href="#" class="d-block d-md-flex text-center nav-link dropdown-toggle" id="dropdownTaxpayer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img :src="user.photo_url" class="dropdown-toggle-image" alt="Img"/>
        <span> @{{ spark.taxPayerData.name }} </span>
    </a>
    <div class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownTaxpayer">
        <b-nav-item class="sub-menu" :to="{ name: 'taxPayer'}">
                <i class="material-icons md-18 ml-10 mr-10">dashboard</i>
                @{{ $t('general.dashBoard') }}
            </b-nav-item>
            <h3 class="nav-heading sub">
                @{{ $t('general.configuration') }}
            </h3>
            <b-nav vertical>
                {{-- :href="/taxpayer/' + spark.taxPayerData.id" --}}
                <b-nav-item class="sub-menu" href="/{{ $taxPayerData->id }}/{{ $currentCycle->id }}/taxpayer-integration/{{ $integrationType->id }}">
                    <i class="material-icons md-18 ml-10 mr-10">settings</i>
                    @{{ $t('general.taxPayer') }}
                </b-nav-item>
                <b-nav-item class="sub-menu" :to="{ name: 'documentList'}">
                    <i class="material-icons md-18 ml-10 mr-10">file_copy</i>
                    @{{ $t('commercial.documents') }}
                </b-nav-item>
                <b-nav-item class="sub-menu" :to="{ name: 'rateList'}">
                    <i class="material-icons md-18 ml-10 mr-10">public</i>
                    @{{ $t('commercial.exchangeRates') }}
                </b-nav-item>
            </b-nav>
            <h3 class="nav-heading sub">
                {{__('teams.teams')}}: @{{ currentTeam.name }}
            </h3>
            <b-nav vertical>
                <b-nav-item href="/home" class="sub-menu" v-b-tooltip.hover title="Team Dashboard">
                    <i class="material-icons md-18 ml-10 mr-10">dashboard</i>
                    @{{ $t('general.teamDashBoard') }}
                </b-nav-item>
    
                <b-nav-item href="/settings/{{ Spark::teamsPrefix() }}/{{ \Auth::user()->currentTeam->id }}" class="sub-menu" v-b-tooltip.hover title="Team Settings">
                    <i class="material-icons md-18 ml-10 mr-10">settings</i>
                    @{{ $t('general.teamSettings') }}
                </b-nav-item>
            </b-nav>
            <hr>
            <b-nav-item href="/home" class="sub-menu">
                <i class="material-icons md-18 ml-10 mr-10">sync</i>
                @{{ $t('general.changeTaxPayer') }}
            </b-nav-item>
    </div>
</li>

    <li class="nav-item">
        @php
            $variant = ($currentCycle->year == \Carbon\Carbon::now()->year) ? 'primary' : 'danger';
        @endphp
        <b-dropdown id="dropdown-1" text="{{ $currentCycle->year }}" class="m-md-2" variant="{{ $variant }}" size="sm">
            @foreach ($cycleData as $cycle)
                <b-dropdown-item href="/{{ $taxPayerData->id }}/{{ $cycle->id }}/">
                    <i class="material-icons md-18 ml-10 mr-10">calendar_today</i>
                    {{ $cycle->year }}
                </b-dropdown-item>
            @endforeach
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item :to="{ name: 'cycleList'}">
                <i class="material-icons md-18 ml-10 mr-10">more_horiz</i>
                @{{ $t('general.showMore') }}
            </b-dropdown-item>
        </b-dropdown>
    
        <div class="dropdown-menu dropdown-menu-middle" aria-labelledby="dropdownCycle">
            <h3 class="nav-heading sub">
                Change Cycle
            </h3>
            <b-nav vertical>
                @foreach ($cycleData as $cycle)
                    <b-nav-item class="sub-menu" href="/{{ $taxPayerData->id }}/{{ $cycle->id }}/">
                        <i class="material-icons md-18 ml-10 mr-10">calendar_today</i>
                        {{ $cycle->year }}
                    </b-nav-item>
                @endforeach
                <b-nav-item class="sub-menu" :to="{ name: 'cycleList'}">
                    <i class="material-icons md-18 ml-10 mr-10">more_horiz</i>
                    @{{ $t('general.showMore') }}
                </b-nav-item>
            </b-nav>
        </div>
    </li>
    
    <li class="nav-item">
        <b-link href="/home" v-b-tooltip.hover :title="$t('general.changeTaxPayer')" class="float-right nav-heading sub">
            <i class="material-icons md-14"> sync </i>
            <small>@{{ $t('general.change') }}</small>
        </b-link>
    </li>
@endisset