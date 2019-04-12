<li class="nav-item dropdown">
    <b-dropdown id="dropdown-1" variant="outline-muted" size="sm">
        <template slot="button-content">
            <i class="material-icons md-18 mr-5">supervised_user_circle</i>
            @{{ currentTeam.name }}
        </template>
        <b-nav-item class="sub-menu" href="/home" style="width:220px">
            <i class="material-icons md-18 ml-10 mr-10">dashboard</i>
            @{{ $t('general.teamDashBoard') }}
        </b-nav-item>

        <b-dropdown-divider></b-dropdown-divider>

        <h3 class="nav-heading sub">
            @{{ $t('general.configuration') }}
        </h3>
        <b-nav-item href="/settings/{{ Spark::teamsPrefix() }}/{{ \Auth::user()->currentTeam->id }}" class="sub-menu" v-b-tooltip.hover title="Team Settings">
            <i class="material-icons md-18 ml-10 mr-10">settings</i>
            @{{ $t('general.teamSettings') }}
        </b-nav-item>
    </b-dropdown>
</li>

@isset($taxPayerData)
    <!-- Left Side Of Navbar -->
    <li class="nav-item">
        <b-dropdown id="dropdown-1" variant="outline-success" size="sm">
            <template slot="button-content">
                <i class="material-icons md-18 mr-5">business_center</i>
                @{{ spark.taxPayerData.alias }}
            </template>
            <b-nav-item class="sub-menu" :to="{ name: 'taxPayer', params: { taxPayer: {{$taxPayerData->id }},cycle:{{$currentCycle->id }}}}">
                <i class="material-icons md-18 ml-10 mr-10">dashboard</i>
                @{{ $t('general.dashBoard') }}
            </b-nav-item>

            <b-dropdown-divider></b-dropdown-divider>

            <h3 class="nav-heading sub">
                @{{ $t('general.configuration') }}
            </h3>
            <b-nav-item class="sub-menu" href="/{{ $taxPayerData->id }}/{{ $currentCycle->id }}/taxpayer-integration/{{ $integrationType->id }}">
                <i class="material-icons md-18 ml-10 mr-10">settings</i>
                @{{ $t('general.taxPayer') }}
            </b-nav-item>
            <b-nav-item class="sub-menu" :to="{ name: 'documentList', params: { taxPayer: {{$taxPayerData->id }},cycle:{{$currentCycle->id }}}}">
                <i class="material-icons md-18 ml-10 mr-10">file_copy</i>
                @{{ $t('commercial.documents') }}
            </b-nav-item>
            <b-nav-item class="sub-menu" :to="{ name: 'rateList', params: { taxPayer: {{$taxPayerData->id }},cycle:{{$currentCycle->id }}}}">
                <i class="material-icons md-18 ml-10 mr-10">public</i>
                @{{ $t('commercial.exchangeRates') }}
            </b-nav-item>

            <b-dropdown-divider></b-dropdown-divider>

            <b-nav-item class="sub-menu" href="/home" v-b-tooltip.hover :title="$t('general.changeTaxPayer')">
                <i class="material-icons md-18 ml-10 mr-10">sync</i>
                @{{ $t('general.changeTaxPayer') }}
            </b-nav-item>
        </b-dropdown>
    </li>

    <li class="nav-item">
        @php
            $variant = ($currentCycle->year == \Carbon\Carbon::now()->year) ? 'outline-primary' : 'outline-danger';
        @endphp

        <b-dropdown id="dropdown-1" text="{{ $currentCycle->year }}" class="m-md-2" variant="{{ $variant }}"  size="sm">
            @foreach ($cycleData as $cycle)
                <b-dropdown-item href="/{{ $taxPayerData->id }}/{{ $cycle->id }}/">
                    <i class="material-icons md-18 ml-10 mr-10">calendar_today</i>
                    {{ $cycle->year }}
                </b-dropdown-item>
            @endforeach
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item :to="{ name: 'cycleList', params: { taxPayer: {{$taxPayerData->id }},cycle:{{$currentCycle->id }}}}">
                <i class="material-icons md-18 ml-10 mr-10">more_horiz</i>
                @{{ $t('general.showMore') }}
            </b-dropdown-item>
        </b-dropdown>
    </li>
@endisset