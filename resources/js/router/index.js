
import CreditForm from '../views/commercials/creditForm.json';
import DebitForm from '../views/commercials/debitForm.json';
import SalesForm from '../views/commercials/salesForm.json';
import PurchaseForm from '../views/commercials/purchaseForm.json';
import InventoryForm from '../views/commercials/inventoryForm.json';
import FixedAssetForm from '../views/commercials/fixedAssetForm.json';

import CycleForm from '../views/configs/cycleForm.json';
import DocumentForm from '../views/configs/documentForm.json';
import RateForm from '../views/configs/rateForm.json';

import MoneyMovementForm from '../views/commercials/moneyMovementForm.json';
import JournalTemplateForm from '../views/accounts/templateForm.json';

import FourZeroFour from '../views/404';
import DashBoard from '../views/index';
import SearchResult from '../views/searchResult';
import Form from '../views/form';
import List from '../views/list';

const Commercial = () => import('../views/commercials/index')
const SalesUpload = () => import('../views/commercials/salesUpload')
const ImpexForm = () => import('../views/commercials/impexForm')

const ReceivableForm = () => import('../views/commercials/receivableForm')
const PayableForm = () => import('../views/commercials/payableForm')

const Accounting = () => import('../views/accounts/index')
const JournalList = () => import('../views/accounts/journalList')
const JournalForm = () => import('../views/accounts/journalForm')
const OpeningBalance = () => import('../views/accounts/openingBalanceForm')
const ClosingBalance = () => import('../views/accounts/closingBalanceForm')
const AnualBudget = () => import('../views/accounts/budgetForm')
const TemplateForm = () => import('../views/commercials/index')
const ChartList = () => import('../views/accounts/chartList')
const ChartForm = () => import('../views/accounts/chartForm')

const Config = () => import('../views/configs/index')
const DocumentList = () => import('../views/configs/documentList')
const RateList = () => import('../views/configs/rateList')
const VersionList = () => import('../views/configs/versionList')
const VersionForm = () => import('../views/configs/versionForm')
const CycleList = () => import('../views/configs/cycleList')

const CommercialReports = () => import('../views/commercials/reports')
const AccountingReports = () => import('../views/accounts/reports')

export default
[
    //This will cause 404 Errors to be redirected to proper site.
    {
        path: '', component: FourZeroFour,
    },
    {
        path: '/:taxPayer/:cycle/',
        component: DashBoard,
        name: 'taxPayer',
        meta: {
            url: 'index',
            title: 'Dashboard',
            description: 'Some description',
            img: '/img/apps/dashboard.svg',
        }
    },
    {
        path: '/:taxPayer/:cycle/search/q={q}',
        component: SearchResult,
        name: 'searchResult',
        meta: {
            url: 'search',
            title: 'Search',
            description: '',
            img: '/img/apps/search.svg',
        }
    },
    {
        path: '/:taxPayer/:cycle/commercial/',
        component: Commercial,
        name: 'commercialMenu',
        meta: {
            title: 'Dashboard',
            description: 'Some description',
            img: '/img/apps/sales.svg',
        },
        children:
        [
            {
                path: 'sales',
                component: List,
                name: 'salesList',
                meta: {
                    apiUrl: 'sales',
                    title: 'commercial.salesBook',
                    description: 'Some description',
                    img: '/img/apps/sales.svg',
                    columns : [{
                            key: 'date',
                            sortable: true
                        },
                        {
                            key: 'partner_name',
                            label: 'commercial.customer',
                            sortable: true
                        },
                        {
                            key: 'number',
                            label: 'commercial.number',
                            sortable: true
                        },
                        {
                            key: 'total',
                            label: 'commercial.total',
                            sortable: true
                        },
                        {
                            key: 'actions',
                            label: '',
                            sortable: false
                        }]
                    
                },
                children:
                [
                    {
                        path: 'upload',
                        component: SalesUpload,
                        name: 'salesUpload',
                        meta: {
                            title: 'commercial.salesInvoice',
                            img: '/img/apps/sales.svg',
                        },
                    },
                    {
                        path: ':id',
                        component: Form,
                        name: 'salesForm',
                        meta: SalesForm

                    }
                ]
            },
            {
                path: 'credit-notes',
                component: List,
                name: 'creditList',
                meta: {
                    title: 'commercial.creditBook',
                    description: 'Some description',
                    img: '/img/apps/credit-note.svg',
                    columns: [
                        {
                            key: "date",
                            sortable: true
                        },
                        {
                            key: "partner_name",
                            label: "commercial.customer",
                            sortable: true
                        },
                        {
                            key: "number",
                            label: "commercial.number",
                            sortable: true
                        },
                        {
                            key: "total",
                            label: "commercial.total",
                            sortable: true
                        },
                        {
                            key: "actions",
                            label: "",
                            sortable: false
                        }
                    ]
                },
                children:
                [
                    {
                        path: ':id',
                        component: Form,
                        name: 'creditForm',
                        meta: CreditForm

                    }
                ]
            },
            {
                path: 'purchases',
                component: List,
                name: 'purchaseList',
                meta: {
                    title: 'commercial.purchaseBook',
                    description: 'Some description',
                    img: '/img/apps/purchase-v1.svg',
                    columns: [{
                        key: 'date',
                        sortable: true
                    },
                    {
                        key: 'partner_name',
                        label: 'commercial.supplier',
                        sortable: true
                    },
                    {
                        key: 'number',
                        label: 'commercial.number',
                        sortable: true
                    },
                    {
                        key: 'total',
                        label: 'commercial.total',
                        sortable: true
                    },
                    {
                        key: 'actions',
                        label: '',
                        sortable: false
                    }]
                },
                children:
                [
                    {
                        path: ':id',
                        component: Form,
                        name: 'purchaseForm',
                        meta: PurchaseForm

                    }
                ]
            },
            {
                path: 'debit-notes',
                component: List,
                name: 'debitList',
                meta: {
                    title: 'commercial.debitBook',
                    description: 'Some description',
                    img: '/img/apps/credit-note.svg',
                    columns: [{
                        key: 'date',
                        sortable: true
                    },
                        {
                            key: 'partner_name',
                            label: 'commercial.customer',
                            sortable: true
                        },
                        {
                            key: 'number',
                            label: 'commercial.number',
                            sortable: true
                        },
                        {
                            key: 'total',
                            label: 'commercial.total',
                            sortable: true
                        },
                        {
                            key: 'actions',
                            label: '',
                            sortable: false
                        }]
                },
                children:
                [
                    {
                        path: ':id',
                        component: Form,
                        name: 'debitForm',
                        meta: DebitForm
                    }
                ]
            },
            {
                path: 'fixed-assets',
                component: List,
                name: 'fixedAssetList',
                meta: {
                    title: 'commercial.fixedAssets',
                    description: 'Some description',
                    img: '/img/apps/fixed-asset.svg',
                    columns: [{
                        key: 'date',
                        sortable: true
                    },
                        {
                            key: 'serial',
                            label: 'commercial.serial',
                            sortable: true
                        },
                        {
                            key: 'name',
                            label: 'commercial.name',
                            sortable: true
                        },
                        {
                            key: 'current_value',
                            label: 'commercial.value',
                            sortable: true
                        },
                        {
                            key: 'actions',
                            label: '',
                            sortable: false
                        }]
                },
                children:
                [
                    {
                        path: ':id',
                        component: Form,
                        name: 'fixedAssetForm',
                        meta: FixedAssetForm

                    }
                ]
            },
            {
                path: 'money-movements',
                component: List,
                name: 'moneyMovementList',
                meta: {
                    title: 'commercial.moneyMovements',
                    description: 'Some description',
                    img: '/img/apps/account-payable.svg',
                    columns: [{
                        key: 'date',
                        sortable: true
                    },
                        {
                            key: 'chart.name',
                            label: 'commercial.account',
                            sortable: true
                        },
                        {
                            key: 'comment',
                            label: 'general.comment',
                            sortable: true
                        },
                        {
                            key: 'currency.code',
                            label: 'general.currency',
                            sortable: true
                        },
                        {
                            key: 'debit',
                            label: 'commercial.debit',
                            sortable: true
                        },
                        {
                            key: 'credit',
                            label: 'commercial.credit',
                            sortable: true
                        },
                        {
                            key: 'actions',
                            label: '',
                            sortable: false
                        }]
                },
                children:
                [
                    {
                        path: ':id',
                        component: Form,
                        name: 'moneyMovementForm',
                        meta: MoneyMovementForm

                    }
                ]
            },
            {
                path: 'inventories',
                component: List,
                name: 'inventoryList',
                meta: {
                    title: 'commercial.inventories',
                    description: 'Some description',
                    img: '/img/apps/inventory.svg',
                    columns: [{
                        key: 'date',
                        sortable: true
                    },
                    {
                        key: 'start_date',
                        label: 'commercial.startDate',
                        sortable: true
                    },
                    {
                        key: 'start_date',
                        label: 'commercial.endDate',
                        sortable: true
                    },
                    {
                        key: 'inventory_value',
                        label: 'commercial.value',
                        sortable: true
                    },
                    {
                        key: 'comments',
                        label: 'commercial.comment',
                        sortable: true
                    },
                    {
                        key: 'actions',
                        label: '',
                        sortable: false
                    }]
                },
                children:
                [
                    {
                        path: ':id',
                        component: Form,
                        name: 'inventoryForm',
                        meta: InventoryForm

                    }
                ]
            },
            {
                path: 'accounts-receivable',
                component: List,
                name: 'receivableList',
                meta: {
                    title: 'commercial.accountsReceivable',
                    description: 'Some description',
                    img: '/img/apps/account-receivable.svg',
                    columns: [
                        {
                            key: 'number',
                            label: 'commercial.number',
                            sortable: true
                        },
                        {
                        key: 'sales',
                        label: 'commercial.sales',
                        sortable: true
                        },
                        {
                            key: 'payment',
                            label: 'commercial.payment',
                            sortable: true
                        },
                        {
                            key: 'balance',
                            label: 'commercial.balance',
                            sortable: true
                        }
                    ]
                    
                },
                children:
                [
                    {
                        path: ':id',
                        component: ReceivableForm,
                        name: 'receivableForm',
                        meta: {
                            title: 'commercial.payment',
                            img: '/img/apps/account-receivable.svg',
                        },

                    }
                ]
            },
            {
                path: 'accounts-payable',
                component: List,
                name: 'payableList',
                meta: {
                    title: 'commercial.accountsPayable',
                    description: 'Some description',
                    img: '/img/apps/account-payable.svg',
                    columns: [
                        {
                            key: 'number',
                            label: 'commercial.number',
                            sortable: true
                        },
                        {
                            key: 'sales',
                            label: 'commercial.sales',
                            sortable: true
                        },
                        {
                            key: 'payment',
                            label: 'commercial.payment',
                            sortable: true
                        },
                        {
                            key: 'balance',
                            label: 'commercial.balance',
                            sortable: true
                        }
                    ]
                },
                children:
                [
                    {
                        path: ':id',
                        component:PayableForm,
                        name: 'payableForm',
                        meta: {
                            title: 'commercial.payment',
                            img: '/img/apps/account-payable.svg',
                        },

                    }
                ]
            },
            {
                path: 'impexes',
                component: List,
                name: 'impexList',
                meta: {
                    title: 'commercial.impex',
                    description: 'Some description',
                    img: '/img/apps/impex.svg',
                },
                children:
                [
                    {
                        path: ':id',
                        component:ImpexForm,
                        name: 'impexForm',
                        meta: {
                            title: 'commercial.impex',
                            img: '/img/apps/account-payable.svg',
                        },

                    }
                ]
            },
        ]
    },
    {
        path: '/:taxPayer/:cycle/accounting/',
        component: Accounting,
        name: 'accountingMenu',
        meta: {
            title: 'Accounting',
            description: 'All your accounting data is here',
        },
        children:
        [
            {
                    path: 'journal-templates',
                    component: List,
                    name: 'journalTemplateList',
                    meta: {
                        title: 'accounting.journal',
                        description: 'Some description',
                        img: '/img/apps/journals.svg',
                        columns: [
                            {
                                key: "name",
                                sortable: true
                            }

                        ]
                    },
                    children:
                        [
                            {
                                path: ':id',
                                component: Form,
                                name: 'journalTemplateForm',
                                meta: JournalTemplateForm
                            }
                        ]
            },
            {
                path: 'journals',
                component: JournalList,
                name: 'journalList',
                meta: {
                    title: 'accounting.journal',
                    description: 'Some description',
                    img: '/img/apps/journals.svg',
                },
                children:
                [
                    {
                        path: ':id',
                        component: JournalForm,
                        name: 'journalForm',
                        meta: {
                            title: 'accounting.journal',
                            img: '/img/apps/journals.svg',
                        },
                    }
                ]
            },
                
            {
                path: 'opening-balance',
                component: OpeningBalance,
                name: 'openingBalanceForm',
                meta: {
                    title: 'Opening Balance',
                    description: 'Some description',
                    img: '/img/apps/opening.svg',
                },
            },
            {
                path: 'closing-balance',
                component: ClosingBalance,
                name: 'closingBalanceForm',
                meta: {
                    title: 'Closing Balance',
                    description: 'Some description',
                    img: '/img/apps/closing.svg',
                },
            },
            {
                path: 'budget',
                component: AnualBudget,
                name: 'budgetForm',
                meta: {
                    title: 'Anual Budget',
                    description: 'Some description',
                    img: '/img/apps/budget.svg',
                },
            },
            {
                path: 'charts',
                component: ChartList,
                name: 'chartList',
                meta: {
                    title: 'accounting.chartOfAccounts',
                    description: 'Some description',
                    img: '/img/apps/chart-of-accounts.svg',
                },
                children:
                [
                    {
                        path: ':id',
                        component: ChartForm,
                        name: 'chartForm',
                        meta: {
                            title: 'Chart Form',
                            img: '/img/apps/chart-of-accounts.svg',
                        },

                    }
                ]
            },
        ]
    },
    {
        path: '/:taxPayer/:cycle/config/',
        component: Config,
        name: 'configMenu',
        meta: {
            title: 'Dashboard',
            description: 'Some description',
            img: '/img/apps/sales.svg',
        },
        children:
        [
            {
                path: 'chart-versions',
                component: VersionList,
                name: 'versionList',
                meta: {
                    title: 'accounting.chartVersion',
                    description: 'Some description',
                    img: '/img/apps/sales.svg',
                },
                children:
                [
                    {
                        path: ':id',
                        component: VersionForm,
                        name: 'versionForm',
                        meta: {
                            title: 'Version Form',
                        },

                    }
                ]
            },
            {
                path: 'cycles',
                component: CycleList,
                name: 'cycleList',
                meta: {
                    title: 'accounting.fiscalYear',
                    description: 'Some description',
                    img: '/img/apps/sales.svg',
                },
                children:
                [
                    {
                        path: ':id',
                        component: Form,
                        name: 'cycleForm',
                        meta: CycleForm

                    }
                ]
            },
            {
                path: 'documents',
                component: DocumentList,
                name: 'documentList',
                meta: {
                    title: 'commercial.documents',
                    description: 'Some description',
                    img: '/img/apps/sales.svg',
                },
                children: [{
                    path: ':id',
                    component: Form,
                    name: 'documentForm',
                    meta: DocumentForm
                }]
            },
            {
                path: 'rates',
                component: RateList,
                name: 'rateList',
                meta: {
                    title: 'commercial.exchangeRates',
                    description: 'Some description',
                    img: '/img/apps/sales.svg',
                },
                children: [{
                    path: ':id',
                    component: Form,
                    name: 'rateForm',
                    meta: RateForm
                }]
            },
        ]
    },
    {
        path: '/:taxPayer/:cycle/commercial/reports',
        component: CommercialReports,
        name: 'commercialReports',
        meta: {
            title: 'Commercial Reports',
            description: 'All your accounting data is here',
            img: '/img/apps/sales.svg',
        }
    },
    {
        path: '/:taxPayer/:cycle/accounting/reports',
        component: AccountingReports,
        name: 'accountingReports',
        meta: {
            title: 'Accounting Reports',
            description: 'All your accounting data is here',
            img: '/img/apps/sales.svg',
        }
    }
]
