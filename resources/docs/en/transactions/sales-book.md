# Sales Book

---

Sales Book records all sales transaction in which you supplied products or services in exchange for payment or a promise of payment.

The concept of what goes into a Sales Book can vary from one country to another. Some countries only require you to include credit sales, while others will require you to include all sales (credit and cash) transactions. It's up to you to insert data as needed, but most importantly, the Sales Book is a place where all your sales are recorded.

-   [Functions](#section-1)
-   [Definitions](#section-2)
-   [Accounting](#section-3)
-   [Tutorials](#section-4)
-   [Troubleshooting](#section-5)

<a name="section-1"></a>

## Sections

To access the Sales Book module, navigate using the menu:
`Transactions > Sales Book`

### Sales Book [List]

Sales Book will show all sales transactions occured during the accounting cycle.

> {info} Sales Book only loads invoices between the selected **accounting cycle’s** start and end dates.

### Import [Upload Data]

To speed up your data entry, you can choose from a variety of import options, Microsoft Excel, CSV, DebeHaber API, or simply fetch the data from your software's endpoint. For more information on this, please <a href="#">click here</a>

### Sales Invoice [Form]

Sales Invoice Form allows you to create or update a sales invoice document.

## Definitions

| Fields             | Values                                                                         |
| :----------------- | :----------------------------------------------------------------------------- |
| Date               | Date the Invoice was Issues                                                    |
| Customer           | Customer Name & Tax Id Number. Search or simply write what you need            |
| Document           | Optional: Select a Document from the List to automatically load Invoice Number |
| Code & Expiry Date | Optional: Depending on your country                                            |

<a name="section-3"></a>

## Accounting

Each sales transaction gets journaled into the ledger as a combination of accounts. Each time you sell something,

| Accounts                    | Debit  | Credit |
| :-------------------------- | :----- | :----- |
| Revenue                     | 14,850 |        |
| Sales Tax or Vat [Optional] | 150    |        |
| Accounts Receivables        |        | 15,000 |

<a name="section-4"></a>

## Tutorials (How to)

<a name="section-5"></a>

## Troubleshooting

Before inserting sales, it’s important to configure your Chart of Accounts as per your companies requirements. If you used DebeHaber’s APIs to insert sales data, the required charts would have been automatically inserted for you.

To configure your chart of accounts, go to:
`Accounting > Chart of Accounts`

> {info} If you have an account, but don’t see it in the invoice window, it’s probably incorrectly configured.

In the accounts list if you see the account you wish to use, say _Cash Accounts_, but that account doesn’t show up in sales, it’s probably incorrectly configured.

#### How to configure Cash or Bank Accounts

Configuration Setup:

1. _Type_: Asset
2. _Is Accountable_ is set to True
3. _Asset Type_: is either Cash or Bank Account.

#### How to configure Item Accounts:

Item Accounts are more complicated because you can sell products and services (both of which are revenue accounts, and you can even sell a fixed asset).

**Configure Fixed Asset:**

1. _Type_: Asset
2. _Is Accountable_ is set to True
3. _Asset Type_: Fixed Asset

**Configure Products or Services:**

1. _Type_: Revenue / Income
2. _Is Accountable_ is set to True
3. _Revenue Type_: Any sub type except Income from Foreign Exchange.

Why aren’t Inventory Accounts included in Sales? Because Inventory Account are linked to the direct cost of an item. If you insert $100 into the Inventory Account, but then you sell it for $120 you are selling an object that’s comprised of cost + profit. In essence you are removing more ($120) from the account that you put in ($100). Hence its considered best practice to reference a Revenue or Income Account.

#### How to configure Sales Tax or VAT Accounts

Configuration Setup:

1. _Type_: Liabilities
2. _Is Accountable_ is set to True
3. _Liability Type_: is VAT Debit.

What to do if VAT is 0% or there is not Sales Tax? Leave it blank. Sales Tax and Vat Accounts are an optional field in Sales.
