
// import FourZeroFour from '../views/404';

const FourZeroFour = () => import('../views/404')
const DashBoard = () => import('../views/index')
const SearchResult = () => import('../views/searchResult')

const Commercial = () => import('../views/commercials/index')
const SalesList = () => import('../views/commercials/salesList')
const SalesForm = () => import('../views/commercials/salesForm')
const SalesUpload = () => import('../views/commercials/salesUpload')
const PurchaseList = () => import('../views/commercials/purchaseList')
const PurchaseForm = () => import('../views/commercials/purchaseForm')
const CreditList = () => import('../views/commercials/creditList')
const CreditForm = () => import('../views/commercials/creditForm')
const DebitList = () => import('../views/commercials/debitList')
const DebitForm = () => import('../views/commercials/debitForm')
const FixedAssetList = () => import('../views/commercials/fixedAssetList')
const FixedAssetForm = () => import('../views/commercials/fixedAssetForm')
const InventoryList = () => import('../views/commercials/inventoryList')
const InventoryForm = () => import('../views/commercials/inventoryForm')
const ImpexList = () => import('../views/commercials/impexList')
const ImpexForm = () => import('../views/commercials/impexForm')

const ReceivableList = () => import('../views/commercials/receivableList')
const ReceivableForm = () => import('../views/commercials/receivableForm')

const PayableList = () => import('../views/commercials/payableList')
const PayableForm = () => import('../views/commercials/payableForm')

const PaymentForm = () => import('../views/commercials/paymentForm')
const MoneyMovementList = () => import('../views/commercials/moneyMovementList')
const MoneyMovementForm = () => import('../views/commercials/moneyMovementForm')

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
const DocumentForm = () => import('../views/configs/documentForm')
const RateList = () => import('../views/configs/rateList')
const RateForm = () => import('../views/configs/rateForm')
const VersionList = () => import('../views/configs/versionList')
const VersionForm = () => import('../views/configs/versionForm')
const CycleList = () => import('../views/configs/cycleList')
const CycleForm = () => import('../views/configs/cycleForm')

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
                component: SalesList,
                name: 'salesList',
                meta: {
                    apiUrl: 'sales',
                    title: 'commercial.salesBook',
                    description: 'Some description',
                    img: '/img/apps/sales.svg',
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
                        component: SalesForm,
                        name: 'salesForm',
                        meta: {
                            title: 'commercial.salesInvoice',
                            img: '/img/apps/sales.svg',
                        },

                    }
                ]
            },
            {
                path: 'credit-notes',
                component: CreditList,
                name: 'creditList',
                meta: {
                    title: 'commercial.creditBook',
                    description: 'Some description',
                    img: '/img/apps/credit-note.svg',
                },
                children:
                [
                    {
                        path: ':id',
                        component: CreditForm,
                        name: 'creditForm',
                        meta: {
                            title: 'commercial.creditNote',
                            img: '/img/apps/credit-note.svg',
                        },

                    }
                ]
            },
            {
                path: 'purchases',
                component: PurchaseList,
                name: 'purchaseList',
                meta: {
                    title: 'commercial.purchaseBook',
                    description: 'Some description',
                    img: '/img/apps/purchase-v1.svg',
                },
                children:
                [
                    {
                        path: ':id',
                        component: PurchaseForm,
                        name: 'purchaseForm',
                        meta: {
                            title: 'commercial.purchaseInvoice',
                            img: '/img/apps/purchase-v1.svg',
                        },

                    }
                ]
            },
            {
                path: 'debit-notes',
                component: DebitList,
                name: 'debitList',
                meta: {
                    title: 'commercial.debitBook',
                    description: 'Some description',
                    img: '/img/apps/credit-note.svg',
                },
                children:
                [
                    {
                        path: ':id',
                        component: DebitForm,
                        name: 'debitForm',
                        meta: {
                            title: 'commercial.debitNote',
                            description: 'Some description',
                            img: '/img/apps/credit-note.svg',
                        },

                    }
                ]
            },
            {
                path: 'fixed-assets',
                component: FixedAssetList,
                name: 'fixedAssetList',
                meta: {
                    title: 'commercial.fixedAssets',
                    description: 'Some description',
                    img: '/img/apps/fixed-asset.svg',
                },
                children:
                [
                    {
                        path: ':id',
                        component: FixedAssetForm,
                        name: 'fixedAssetForm',
                        meta: {
                            title: 'commercial.fixedAsset',
                            description: 'Some description',
                            img: '/img/apps/fixed-asset.svg',
                        },

                    }
                ]
            },
            {
                path: 'money-movements',
                component: MoneyMovementList,
                name: 'moneyMovementList',
                meta: {
                    title: 'commercial.moneyMovements',
                    description: 'Some description',
                    img: '/img/apps/account-payable.svg',
                },
                children:
                [
                    {
                        path: ':id',
                        component: MoneyMovementForm,
                        name: 'moneyMovementForm',
                        meta: {
                            title: 'commercial.moneyMovement',
                            description: 'Some description',
                            img: '/img/apps/account-payable.svg',
                        },

                    }
                ]
            },
            {
                path: 'inventories',
                component: InventoryList,
                name: 'inventoryList',
                meta: {
                    title: 'commercial.inventories',
                    description: 'Some description',
                    img: '/img/apps/inventory.svg',
                },
                children:
                [
                    {
                        path: ':id',
                        component: InventoryForm,
                        name: 'inventoryForm',
                        meta: {
                            title: 'commercial.inventory',
                            img: '/img/apps/inventory.svg',
                        },

                    }
                ]
            },
            {
                path: 'accounts-receivable',
                component: ReceivableList,
                name: 'receivableList',
                meta: {
                    title: 'commercial.accountsReceivable',
                    description: 'Some description',
                    img: '/img/apps/account-receivable.svg',
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
                component: PayableList,
                name: 'payableList',
                meta: {
                    title: 'commercial.accountsPayable',
                    description: 'Some description',
                    img: '/img/apps/account-payable.svg',
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
                component: ImpexList,
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
                        component: CycleForm,
                        name: 'cycleForm',
                        meta: {
                            title: 'Cycle Form',
                        },

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
                    component: DocumentForm,
                    name: 'documentForm',
                    meta: {
                        title: 'commercial.document',
                    }
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
                    component: RateForm,
                    name: 'rateForm',
                    meta: {
                        title: 'commercial.rate',
                    }
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
