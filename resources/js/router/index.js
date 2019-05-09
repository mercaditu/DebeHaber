import CreditForm from "../views/commercials/creditForm.json";
import DebitForm from "../views/commercials/debitForm.json";
import SalesForm from "../views/commercials/salesForm.json";
import ReceivableForm from "../views/commercials/receivableForm.json";
import PayableForm from "../views/commercials/payableForm.json";
import PurchaseForm from "../views/commercials/purchaseForm.json";
import InventoryForm from "../views/commercials/inventoryForm.json";
import FixedAssetForm from "../views/commercials/fixedAssetForm.json";
import ImpexForm from "../views/commercials/impexForm.json";

import CycleForm from "../views/configs/cycleForm.json";
import DocumentForm from "../views/configs/documentForm.json";
import RateForm from "../views/configs/rateForm.json";

import MoneyMovementDebitForm from "../views/commercials/moneyMovementDebitForm.json";
import MoneyMovementForm from "../views/commercials/moneyMovementForm.json";
import JournalTemplateForm from "../views/accounts/templateForm.json";
import openingBalanceForm from "../views/accounts/openingBalanceForm.json";
import closingBalanceForm from "../views/accounts/closingBalanceForm.json";
import budgetForm from "../views/accounts/budgetForm.json";

import FourZeroFour from "../views/404";
import DashBoard from "../views/index";
import SearchResult from "../views/searchResult";
import Form from "../views/form";
import FormList from "../views/formList";
import List from "../views/list";
import Import from "../views/import";

// Clean up
const JournalList = () => import("../views/accounts/journalList");
const JournalForm = () => import("../components/journalForm");

const VersionList = () => import("../views/configs/versionList");
const VersionForm = () => import("../views/configs/versionForm");
// / Clean up

const ChartForm = () => import("../views/accounts/chartForm");

const Config = () => import("../views/configs/index");
const CommercialReports = () => import("../views/commercials/reports");
const AccountingReports = () => import("../views/accounts/reports");

export default [
    //This will cause 404 Errors to be redirected to proper site.
    {
        path: "/404",
        component: FourZeroFour
    },
    {
        path: "/:taxPayer/:cycle/",
        component: DashBoard,
        name: "taxPayer",
        meta: {
            url: "index",
            title: "Dashboard",
            description: "Some description",
            img: "/img/apps/dashboard.svg"
        }
    },
    {
        path: "/:taxPayer/:cycle/search/q={q}",
        component: SearchResult,
        name: "searchResult",
        meta: {
            url: "search",
            title: "Search",
            description: "",
            img: "/img/apps/search.svg"
        }
    },
    {
        path: "/:taxPayer/:cycle/commercial/sales",
        component: List,
        name: "salesList",
        meta: {
            title: "commercial.salesBook",
            img: "/img/apps/sales.svg",
            components: [
                {
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [
                        {
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/:lang/transactions/sales"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url:
                                "/:taxPayer/:cycle/commercial/reports/sales/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            columns: [
                {
                    key: "date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(item.date).toLocaleDateString();
                    },
                    sortable: true,
                    searchable: false
                },
                {
                    key: "partner_name",
                    label: "commercial.customer",
                    formatter: (value, key, item) => {
                        return item.partner_name.substring(0, 32) + "...";
                    },
                    sortable: true,
                    searchable: true
                },
                {
                    key: "number",
                    label: "commercial.number",
                    sortable: true,
                    searchable: true
                },
                {
                    key: "total",
                    label: "general.total",
                    formatter: (value, key, item) => {
                        return new Number(
                            item.details.reduce(function(sum, row) {
                                return sum + new Number(row["value"]);
                            }, 0)
                        ).toLocaleString();
                    },
                    sortable: true,
                    searchable: false
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false,
                    searchable: false
                }
            ]
        },
        children: [
            {
                name: "salesUpload",
                path: "upload",
                component: Import,
                meta: {
                    title: "commercial.salesInvoice"
                },

                label: "general.upload",
                url: "sales/upload",
                icon: "cloud_upload",
                variant: "dark"
            },
            {
                name: "salesForm",
                path: "form/:id",
                component: Form,
                meta: SalesForm,

                label: "general.create",
                url: "sales/0",
                icon: "add",
                variant: "dark"
            }
        ]
    },
    {
        path: "/:taxPayer/:cycle/commercial/credit-notes",
        component: List,
        name: "creditList",
        meta: {
            title: "commercial.creditBook",
            img: "/img/apps/credit-note.svg",
            components: [
                {
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [
                        {
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/en/transactions/credit-notes"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url:
                                "/:taxPayer/:cycle/commercial/reports/credit-notes/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            columns: [
                {
                    key: "date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(item.date).toLocaleDateString();
                    },
                    sortable: true,
                    searchable: false
                },
                {
                    key: "partner_name",
                    label: "commercial.customer",
                    formatter: (value, key, item) => {
                        return item.partner_name.substring(0, 18) + "...";
                    },
                    sortable: true,
                    searchable: true
                },
                {
                    key: "number",
                    label: "commercial.number",
                    sortable: true
                },
                {
                    key: "total",
                    label: "general.total",
                    formatter: (value, key, item) => {
                        return new Number(
                            item.details.reduce(function(sum, row) {
                                return sum + new Number(row["value"]);
                            }, 0)
                        ).toLocaleString();
                    },
                    sortable: true,
                    searchable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false,
                    searchable: false
                }
            ]
        },
        children: [
            {
                name: "creditForm",
                path: ":id",
                component: Form,
                meta: CreditForm,

                label: "general.create",
                url: "credit-notes/0",
                icon: "add",
                variant: "dark"
            },
            {
                name: "creditUpload",
                path: "upload",
                component: Import,
                meta: {
                    title: "commercial.creditNotes"
                },

                label: "general.upload",
                icon: "cloud_upload",
                variant: "dark"
            }
        ]
    },
    {
        path: "/:taxPayer/:cycle/commercial/purchases",
        component: List,
        name: "purchaseList",
        meta: {
            title: "commercial.purchaseBook",
            img: "/img/apps/purchase-v1.svg",
            components: [
                {
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [
                        {
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/en/transactions/purchases"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url:
                                "/:taxPayer/:cycle/commercial/reports/purchases/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            columns: [
                {
                    key: "date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(item.date).toLocaleDateString();
                    },
                    sortable: true
                },
                {
                    key: "partner_name",
                    label: "commercial.supplier",
                    sortable: true,
                    searchable: true
                },
                {
                    key: "number",
                    label: "commercial.number",
                    sortable: true,
                    searchable: true
                },
                {
                    key: "total",
                    label: "general.total",
                    formatter: (value, key, item) => {
                        return new Number(
                            item.details.reduce(function(sum, row) {
                                return sum + new Number(row["value"]);
                            }, 0)
                        ).toLocaleString();
                    },
                    sortable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [
            {
                name: "purchaseUpload",
                path: "upload",
                component: Import,
                meta: {
                    title: "commercial.purchaseBooks"
                },

                label: "general.upload",
                icon: "cloud_upload",
                variant: "dark"
            },
            {
                name: "purchaseForm",
                path: ":id",
                component: Form,
                meta: PurchaseForm,

                label: "general.create",
                url: "purchases/0",
                icon: "add",
                variant: "dark"
            }
        ]
    },
    {
        path: "/:taxPayer/:cycle/commercial/debit-notes",
        component: List,
        name: "debitList",
        meta: {
            title: "commercial.debitBook",
            img: "/img/apps/credit-note.svg",
            components: [
                {
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [
                        {
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/en/transactions/debit-notes"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url:
                                "/:taxPayer/:cycle/commercial/reports/debit-notes/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            columns: [
                {
                    key: "date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(item.date).toLocaleDateString();
                    },
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
                    label: "general.total",
                    formatter: (value, key, item) => {
                        return new Number(
                            item.details.reduce(function(sum, row) {
                                return sum + new Number(row["value"]);
                            }, 0)
                        ).toLocaleString();
                    },
                    sortable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [
            {
                path: ":id",
                component: Form,
                name: "debitForm",
                meta: DebitForm,

                label: "general.create",
                url: "debit-notes/0",
                icon: "add",
                variant: "dark"
            },
            {
                name: "debitUpload",
                path: "upload",
                component: Import,
                meta: {
                    title: "commercial.debitNotes"
                },

                label: "general.upload",
                icon: "cloud_upload",
                variant: "dark"
            }
        ]
    },
    {
        path: "/:taxPayer/:cycle/commercial/fixed-assets",
        component: List,
        name: "fixedAssetList",
        meta: {
            title: "commercial.fixedAssets",
            img: "/img/apps/fixed-asset.svg",
            components: [
                {
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [
                        {
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/en/transactions/fixed-assets"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url:
                                "/:taxPayer/:cycle/commercial/reports/fixed-assets/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            columns: [
                {
                    key: "purchase_date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(
                            item.purchase_date
                        ).toLocaleDateString();
                    },
                    sortable: true
                },
                {
                    key: "serial",
                    label: "commercial.serial",
                    sortable: true
                },
                {
                    key: "name",
                    label: "commercial.name",
                    sortable: true
                },
                {
                    key: "current_value",
                    label: "commercial.value",
                    formatter: (value, key, item) => {
                        return new Number(item.current_value).toLocaleString();
                    },
                    sortable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [
            {
                path: ":id",
                component: Form,
                name: "fixedAssetForm",
                meta: FixedAssetForm,

                label: "general.create",
                url: "fixed-assets/0",
                icon: "add",
                variant: "dark"
            }
        ]
    },
    {
        path: "/:taxPayer/:cycle/commercial/money",
        component: List,
        name: "moneyMovementList",
        meta: {
            title: "commercial.moneyMovements",
            img: "/img/apps/money-flow.svg",
            components: [
                {
                    type: "links",
                    links: [
                        {
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/en/transactions/sales"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url:
                                "/:taxPayer/:cycle/commercial/reports/sales/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            columns: [
                {
                    key: "date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(item.date).toLocaleDateString();
                    },
                    sortable: true
                },
                {
                    key: "chart.name",
                    label: "accounting.chartOfAccounts",
                    searchable: true,
                    sortable: true
                },
                {
                    key: "comment",
                    label: "general.comment",
                    searchable: true,
                    sortable: true
                },
                {
                    key: "currency",
                    label: "",
                    sortable: true
                },
                {
                    key: "credit",
                    label: "general.credit",
                    formatter: (value, key, item) => {
                        return new Number(item.credit).toLocaleString();
                    },
                    searchable: true,
                    sortable: true
                },
                {
                    key: "debit",
                    label: "general.debit",
                    formatter: (value, key, item) => {
                        return new Number(item.debit).toLocaleString();
                    },
                    searchable: true,
                    sortable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [
            {
                path: ":id",
                component: Form,
                name: "moneyMovementForm",
                meta: MoneyMovementDebitForm,

                label: "general.create",
                url: "money/0",
                icon: "add",
                variant: "dark"
            },
            {
                path: "transfers",
                component: Form,
                name: "moneyTransferForm",
                img: "/img/apps/money-transfer.svg",
                meta: MoneyMovementForm,

                label: "general.transfer",
                url: "money/transfer/0",
                icon: "compare_arrows",
                variant: "dark"
            }
        ]
    },
    {
        path: "/:taxPayer/:cycle/commercial/inventories",
        component: List,
        name: "inventoryList",
        meta: {
            title: "commercial.inventories",
            img: "/img/apps/inventory.svg",
            components: [
                {
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [
                        {
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/:lang/transactions/inventory"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url:
                                "/:taxPayer/:cycle/commercial/reports/inventory/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            columns: [
                {
                    key: "date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(item.date).toLocaleDateString();
                    },
                    sortable: true
                },
                {
                    key: "start_date",
                    label: "commercial.startDate",
                    formatter: (value, key, item) => {
                        return new Date(item.start_date).toLocaleDateString();
                    },
                    sortable: true
                },
                {
                    key: "end_date",
                    label: "commercial.endDate",
                    formatter: (value, key, item) => {
                        return new Date(item.end_date).toLocaleDateString();
                    },
                    sortable: true
                },
                {
                    key: "inventory_value",
                    label: "commercial.value",
                    sortable: true
                },
                {
                    key: "comments",
                    label: "general.comment",
                    sortable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [
            {
                name: "inventoryForm",
                path: ":id",
                component: Form,
                meta: InventoryForm,

                label: "general.create",
                url: "inventories/0",
                icon: "add",
                variant: "dark"
            }
        ]
    },
    {
        path: "/:taxPayer/:cycle/commercial/accounts-receivable",
        component: List,
        name: "receivableList",
        meta: {
            title: "commercial.accountReceivables",
            img: "/img/apps/account-receivable.svg",
            components: [
                {
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [
                        {
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/:lang/transactions/receivable"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url:
                                "/:taxPayer/:cycle/commercial/reports/receivable/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            columns: [
                {
                    key: "date",
                    format: "date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(item.date).toLocaleDateString();
                    },
                    sortable: true
                },
                {
                    key: "partner",
                    label: "commercial.customer",
                    formatter: (value, key, item) => {
                        return item.partner_name.substring(0, 15) + "...";
                    },
                    sortable: true
                },
                {
                    key: "number",
                    label: "commercial.number",
                    sortable: true
                },
                {
                    key: "credit",
                    label: "commercial.payment",
                    formatter: (value, key, item) => {
                        return new Number(item.credit).toLocaleString();
                    },
                    sortable: true
                },
                {
                    key: "balance",
                    format: "numeric",
                    label: "commercial.balance",
                    formatter: (value, key, item) => {
                        return new Number(item.balance).toLocaleString();
                    },
                    sortable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [
            {
                path: ":id",
                component: Form,
                name: "receivableForm",
                meta: ReceivableForm
            }
        ]
    },
    //Accounts Payable
    {
        path: "/:taxPayer/:cycle/commercial/accounts-payable",
        component: List,
        name: "payableList",
        meta: {
            title: "commercial.accountPayables",
            img: "/img/apps/account-payable.svg",
            components: [
                {
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [
                        {
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/:lang/payable/sales"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url:
                                "/:taxPayer/:cycle/commercial/reports/payable/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            columns: [
                {
                    key: "date",
                    format: "date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(item.date).toLocaleDateString();
                    },
                    sortable: true
                },
                {
                    key: "partner",
                    label: "commercial.supplier",
                    formatter: (value, key, item) => {
                        return item.partner_name.substring(0, 15) + "...";
                    },
                    sortable: true
                },
                {
                    key: "number",
                    label: "commercial.number",
                    sortable: true
                },
                {
                    key: "payment",
                    label: "commercial.payment",
                    formatter: (value, key, item) => {
                        return new Number(item.payment).toLocaleString();
                    },
                    sortable: true
                },
                {
                    key: "balance",
                    label: "commercial.balance",
                    formatter: (value, key, item) => {
                        return new Number(item.balance).toLocaleString();
                    },
                    sortable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [
            {
                path: ":id",
                component: Form,
                name: "payableForm",
                meta: PayableForm
            }
        ]
    },
    //Impexes
    {
        path: "/:taxPayer/:cycle/commercial/impexes",
        component: List,
        name: "impexList",
        meta: {
            title: "commercial.impex",
            img: "/img/apps/impex.svg",
            components: [
                {
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [
                        {
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/:lang/impex/sales"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url:
                                "/:taxPayer/:cycle/commercial/reports/impex/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            actions: [
                {
                    label: "general.create",
                    icon: "add",
                    variant: "dark",
                    url: "impexes/0"
                }
            ],
            columns: [
                {
                    key: "date",
                    format: "date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(item.date).toLocaleDateString();
                    },
                    sortable: true
                },
                {
                    key: "partner",
                    label: "commercial.supplier",
                    formatter: (value, key, item) => {
                        return item.partner_name.substring(0, 15) + "...";
                    },
                    sortable: true
                },
                {
                    key: "code",
                    label: "commercial.code",
                    sortable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [
            {
                path: ":id",
                component: Form,
                name: "impexForm",
                meta: ImpexForm
            }
        ]
    },
    //Journal Templates
    {
        path: "/:taxPayer/:cycle/accounting/journal-templates",
        component: List,
        name: "journalTemplateList",
        meta: {
            title: "accounting.template",
            img: "/img/apps/journal-template.svg",
            components: [
                {
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [
                        {
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/:lang/journaltemplate/sales"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url:
                                "/:taxPayer/:cycle/commercial/reports/journaltemplate/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            columns: [
                {
                    key: "name",
                    sortable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [
            {
                path: ":id",
                component: Form,
                name: "journalTemplateForm",
                meta: JournalTemplateForm
            }
        ]
    },
    //Journals
    {
        path: "/:taxPayer/:cycle/accounting/journals",
        component: JournalList,
        name: "journalList",
        meta: {
            components: [
                {
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [
                        {
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/:lang/journal/sales"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url:
                                "/:taxPayer/:cycle/commercial/reports/journal/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            title: "accounting.journal",
            img: "/img/apps/journals.svg"
        },
        children: [
            {
                path: ":id",
                component: JournalForm,
                name: "journalForm",
                meta: {
                    title: "accounting.journal",
                    img: "/img/apps/journals.svg"
                }
            }
        ]
    },
    //Opening Balance
    {
        path: "/:taxPayer/:cycle/accounting/opening-balance",
        component: FormList,
        name: "openingBalanceForm",
        meta: openingBalanceForm
    },
    //Closing Balance
    {
        path: "/:taxPayer/:cycle/accounting/closing-balance",
        component: FormList,
        name: "closingBalanceForm",
        meta: closingBalanceForm
    },
    //Budget
    {
        path: "/:taxPayer/:cycle/accounting/budget",
        component: FormList,
        name: "budgetForm",
        meta: budgetForm
    },
    {
        path: "/:taxPayer/:cycle/accounting/charts",
        component: List,
        name: "chartList",
        meta: {
            title: "accounting.chartOfAccounts",
            img: "/img/apps/chart-of-accounts.svg",
            components: [],
            columns: [
                {
                    key: "code",
                    label: "commercial.code",
                    sortable: true
                },
                {
                    key: "name",
                    label: "commercial.accoune",
                    sortable: true
                },
                {
                    key: "type",
                    label: ""
                },
                {
                    key: "actions",
                    label: ""
                }
            ]
        },
        children: [
            {
                name: "chartForm",
                path: ":id",
                component: ChartForm,
                meta: {
                    title: "Chart Form",
                    img: "/img/apps/chart-of-accounts.svg"
                },

                label: "general.create",
                url: "charts/0",
                icon: "add",
                variant: "dark"
            }
        ]
    },
    {
        path: "/:taxPayer/:cycle/config/",
        component: Config,
        name: "configMenu",
        meta: {
            title: "Dashboard",
            description: "Some description",
            img: "/img/apps/cycle.svg"
        },
        children: [
            {
                path: "chart-versions",
                component: VersionList,
                name: "versionList",
                meta: {
                    buttons: [
                        {
                            name: "manual",
                            visible: true
                        },
                        {
                            name: "uploadFromExcel",
                            visible: false
                        },
                        {
                            name: "createNewRecord",
                            visible: true
                        }
                    ],
                    title: "accounting.chartVersion",
                    description: "Some description",
                    img: "/img/apps/sales.svg"
                },
                children: [
                    {
                        path: ":id",
                        component: VersionForm,
                        name: "versionForm",
                        meta: {
                            title: "Version Form"
                        }
                    }
                ]
            },
            {
                path: "cycles",
                component: List,
                name: "cycleList",
                meta: {
                    buttons: [
                        {
                            name: "manual",
                            visible: true
                        },
                        {
                            name: "uploadFromExcel",
                            visible: false
                        },
                        {
                            name: "createNewRecord",
                            visible: true
                        }
                    ],
                    title: "accounting.accountingCycle",
                    description: "Some description",
                    img: "/img/apps/cycle.svg",
                    columns: [
                        {
                            key: "chart_version.name",
                            sortable: true
                        },
                        {
                            key: "year",
                            sortable: false
                        },
                        {
                            key: "actions",
                            label: "",
                            sortable: false
                        }
                    ]
                },
                children: [
                    {
                        path: ":id",
                        component: Form,
                        name: "cycleForm",
                        meta: CycleForm
                    }
                ]
            },
            {
                path: "documents",
                component: List,
                name: "documentList",
                meta: {
                    buttons: [
                        {
                            name: "manual",
                            visible: true
                        },
                        {
                            name: "uploadFromExcel",
                            visible: false
                        },
                        {
                            name: "createNewRecord",
                            visible: true
                        }
                    ],
                    title: "commercial.documents",
                    description: "Some description",
                    img: "/img/apps/sales.svg"
                },
                children: [
                    {
                        path: ":id",
                        component: Form,
                        name: "documentForm",
                        meta: DocumentForm
                    }
                ]
            },
            {
                path: "rates",
                component: List,
                name: "rateList",
                meta: {
                    buttons: [
                        {
                            name: "manual",
                            visible: true
                        },
                        {
                            name: "uploadFromExcel",
                            visible: false
                        },
                        {
                            name: "createNewRecord",
                            visible: true
                        }
                    ],
                    title: "commercial.exchangeRates",
                    description: "Some description",
                    img: "/img/apps/sales.svg"
                },
                children: [
                    {
                        path: ":id",
                        component: Form,
                        name: "rateForm",
                        meta: RateForm
                    }
                ]
            }
        ]
    },
    {
        path: "/:taxPayer/:cycle/commercial/reports",
        component: CommercialReports,
        name: "commercialReports",
        meta: {
            title: "Commercial Reports",
            description: "All your accounting data is here",
            img: "/img/apps/sales.svg"
        }
    },
    {
        path: "/:taxPayer/:cycle/accounting/reports",
        component: AccountingReports,
        name: "accountingReports",
        meta: {
            title: "Accounting Reports",
            description: "All your accounting data is here",
            img: "/img/apps/sales.svg"
        }
    }
];
