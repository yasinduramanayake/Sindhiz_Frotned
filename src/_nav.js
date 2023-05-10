export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
    },
    {
      name: "My Knowledge",
      url: "/my-knowledge-base",
      icon: "fa fa-book",
    },
    {
      name: "My Tasks",
      url: "/my-tasks",
      icon: "cui-task",
    },
    {
      name: "Close Shift",
      url: "/closeshift",
      icon: "fa fa-coffee",
      permissions: ["closeshift"],
    },
    {
      name: "Delivery Receive",
      url: "/delivery-receive",
      icon: "fa fa-barcode",
      permissions: ["deliveryreceive"],
    },
    {
      name: "Payroll",
      url: "/payroll",
      icon: "fa fa-money",
      permissions: ["payroll"],
    },
    {
      name: "Bank Feeds",
      url: "/bankfeeds",
      icon: "fa fa-coffee",
      permissions: ["bankfeeds"],
    },
    {
      name: "Store Profile",
      url: "/store-profiles",
      icon: "fa fa-university",
      permissions: ["store-profile"],
    },
    {
      name: "Administrator",
      url: "/administrator",
      icon: "cui-settings",
      // permissions: ["mpulse_admin"],
      children: [
        {
          name: "Store Status",
          url: "/administrator/store-status",
          permissions: ["mpulse_admin"],
        },
        {
          name: "Add Claim Form",
          url: "/administrator/add_claim_form",
          permissions: ["mpulse_admin"],
        },
        {
          name: "Add LeaveForm",
          url: "/administrator/leaveform",
          permissions: ["mpulse_admin"],
        },
        {
          name: "Manage Leaves",
          url: "/administrator/leavesreport",
          permissions: ["mpulse_admin"],
        },
        {
          name: "Add Store Audit",
          url: "/administrator/auditform",
          permissions: ["mpulse_admin"],
        },
        {
          name: "Store Audit Report",
          url: "/administrator/auditreport",
          permissions: ["mpulse_admin"],
        },
        {
          name: "Manage Audit Sub Attributes",
          url: "/administrator/auditattribute",
          // permissions: ["mpulse_admin"],
        },
        {
          name: "Manage Audit Main Attributes",
          url: "/administrator/auditmainattribute",
          // permissions: ["mpulse_admin"],
        },

        {
          name: "Global Products",
          url: "/administrator/global-products",
          permissions: ["mpulse_admin"],
        },
        {
          name: "Invoice Processor",
          url: "/administrator/invoice-processor",
          permissions: ["mpulse_admin"],
        },
        {
          name: "Public Holidays",
          url: "/administrator/public-holidays",
        },
        {
          name: "Knowledge Base",
          url: "/administrator/knowledge-base",
        },
      ],
    },
    {
      name: "Accounting",
      url: "/audit",
      icon: "cui-calculator",
      permissions: ["invoices"],
      children: [
        {
          name: "Manage Companies",
          url: "/companies",
          permissions: ["manage-companies"],
        },
        {
          name: "Manage Expenses",
          url: "/expensereport",
          permissions: ["invoices"],
        },
        {
          name: "Manage Stores",
          url: "/stores",
          permissions: ["manage-stores"],
        },
        {
          name: "Banking",
          url: "/banking",
          permissions: ["banking"],
        },
        {
          name: "Owners Taking",
          url: "/owners-taking",
          permissions: ["owners_taking"],
        },
        {
          name: "Manage Invoices",
          url: "/invoices",
          permissions: ["invoices"],
        },
        {
          name: "Edit Close Cash",
          url: "/edit-close-cash",
          permissions: ["editclosecash"],
        },
        {
          name: "Manage Distributors",
          url: "/distributors",
          permissions: ["invoices"],
        },
        {
          name: "Manage Accounts",
          url: "/accounts",
          permissions: ["invoices"],
        },
        {
          name: "Manage Account Rules",
          url: "/accounts/account-rules",
          permissions: ["account-rules"],
        },
        {
          name: "Order Delivery Days",
          url: "/order-delivery-days",
          permissions: ["invoices"],
        },
        {
          name: "Banking Audit",
          url: "/audit/banking",
          permissions: ["bankingverify"],
        },
        {
          name: "Eftpos Audit",
          url: "/audit/eftpos",
          permissions: ["eftverify"],
        },
        {
          name: "Audit Promo Rebates",
          url: "/audit/promo-rebates",
          permissions: ["bankingverify"],
        },
        {
          name: "Invoice Amounts",
          url: "/invoice-amounts",
          permissions: ["invoice-amounts"],
        },
        {
          name: "Store Wage",
          url: "/store-wage",
          permissions: ["store-wage"],
        },
      ],
    },
    {
      name: "Regulate Promotions",
      url: "/promotions",
      icon: "fa fa-bullhorn",
      permissions: ["promotion"],
      children: [
        {
          name: "Manage Promotions",
          url: "/promotions",
          permissions: ["promotion"],
        },
        {
          name: "Manage Competitors",
          url: "/competitors",
          permissions: ["bulkpromotion"],
        },
        {
          name: "Manage PriceList",
          url: "/price-lists",
          permissions: ["bulkpromotion"],
        },
        {
          name: "Bulk Promotions",
          url: "/bulk-promotions",
          permissions: ["bulkpromotion"],
        },
        {
          name: "Bulk Promotions List",
          url: "/bulk-promotions-list",
          permissions: ["promotion"],
        },
        {
          name: "Store Prices",
          url: "/store-prices-list",
          permissions: ["promotion"],
        },
        {
          name: "Sales Rep Promos",
          url: "/sales-rep-promotions",
          permissions: ["sales-rep-promo"],
        },
      ],
    },
    {
      name: "User Management",
      url: "/staff",
      icon: "cui-people",
      permissions: ["staff"],
      children: [
        {
          name: "Manage Staff",
          url: "/staff",
          permissions: ["staff"],
        },
        {
          name: "Manage Roles",
          url: "/roles",
          permissions: ["roles"],
        },
        {
          name: "Roster",
          url: "/roster",
          permissions: ["roster"],
        },
        {
          name: "Manage Trainings",
          url: "/trainings",
          permissions: ["training"],
        },
        {
          name: "Display Trainings",
          url: "/display-trainings",
        },
        {
          name: "Payroll Report",
          url: "/payroll-report",
          permissions: ["payroll"],
        },
        {
          name: "Manage Tasks",
          url: "/tasks",
          permissions: ["view-tasks"],
        },
      ],
    },
    {
      name: "Manage Catalog",
      url: "/products",
      icon: "fa fa-barcode",
      children: [
        {
          name: "Manage Products",
          url: "/products",
          permissions: ["product"],
        },
        {
          name: "Manage Categories",
          url: "/categories",
          permissions: ["product"],
        },
        {
          name: "Manage Sub Categories",
          url: "/subcategories",
          permissions: ["product"],
        },
        {
          name: "Manage Suppliers",
          url: "/suppliers",
          permissions: ["product"],
        },
        {
          name: "Product Ranking",
          url: "/product-ranking",
          permissions: ["product-rank-page"],
        },
        {
          name: "Manage Price Board",
          url: "/price-board",
          permissions: ["price-board"],
        },
      ],
    },

    {
      name: "Stock Ordering",
      url: "/stockordering",
      icon: "cui-info",
      children: [
        {
          name: "Stock Take",
          url: "/stockordering/stock-take",
          permissions: ["stocktake"],
        },
        {
          name: "View Stock Take",
          url: "/stockordering/view-stock-take",
          permissions: ["view-stock-take"],
        },
        {
          name: "View Inhouse Stock Take",
          url: "/stockordering/view-inhouse-stock-take",
          permissions: ["view-stock-take"],
        },

        {
          name: "Min Stock Qtys",
          url: "/stockordering/min-stock-qtys",
          permissions: ["stocktake"],
        },
        {
          name: "Order Quantity",
          url: "/stockordering/order-quantity",
          permissions: ["order-quantity"],
        },
        {
          name: "Disable Order Products",
          url: "/stockordering/disable-order-products",
          permissions: ["disable-order-product"],
        },

        {
          name: "In House Products",
          url: "/stockordering/inhouse-products",
          permissions: ["inhouse-product"],
        },
        {
          name: "In House Orders",
          url: "/stockordering/inhouse-orders",
          permissions: ["inhouse-order"],
        },
        {
          name: "In House StockTake",
          url: "/stockordering/inhouse-stocktake",
          permissions: ["inhouse-stocktake"],
        },
        {
          name: "Inhouse Order By All Stores",
          url: "/stockordering/inhouse-order-all-stores",
          permissions: ["inhouse-order-allstores"],
        },
        {
          name: "Inhouse Order By Store",
          url: "/stockordering/inhouse-order-store",
          permissions: ["inhouse-order-report"],
        },
      ],
    },
    {
      name: "Manage Inventory",
      url: "/inventory",
      icon: "cui-list",
      children: [
        {
          name: "IntraStore Pool",
          url: "/inventory/intra-store-pool",
          permissions: ["intrastorepool"],
        },
        {
          name: "Add Delivery",
          url: "/inventory/add-delivery",
          permissions: ["deliveryadd"],
        },
        {
          name: "Delivery Report",
          url: "/inventory/delivery-report",
          permissions: ["delivery"],
        },
        //
        // {
        //   name: "Stock Take",
        //   url: "/inventory/stock-take",
        //   permissions: ["stocktake"],
        // },
        // {
        //   name: "View Stock Take",
        //   url: "/inventory/view-stock-take",
        //   permissions: ["view-stock-take"],
        // },
        {
          name: "Inventory Count",
          url: "/inventory/inventory-count",
          permissions: ["inventory-count"],
        },
        {
          name: "View Inventory",
          url: "/inventory/view-inventory",
          permissions: ["inventory-view"],
        },
        // {
        //   name: "Min Stock Qtys",
        //   url: "/inventory/min-stock-qtys",
        //   permissions: ["stocktake"],
        // },
        // {
        //   name: "Order Quantity",
        //   url: "/inventory/order-quantity",
        //   permissions: ["order-quantity"],
        // },
        // {
        //   name: "Disable Order Products",
        //   url: "/inventory/disable-order-products",
        //   permissions: ["disable-order-product"],
        // },
        {
          name: "Stock Level",
          url: "/inventory/stock-level",
          permissions: ["stocklevel"],
        },
        {
          name: "Purchase Capping",
          url: "/purchase-cappings",
          permissions: ["permission_capping"],
        },
        {
          name: "Delivery Buffer",
          url: "/inventory/deliverybuffer",
          permissions: ["deliverybuffer"],
        },
        {
          name: "Intrastore Scanning",
          url: "/inventory/intrastore-scanning",
          permissions: ["intrastore-scanning"],
        },
        // {
        //   name: "In House Products",
        //   url: "/inventory/inhouse-products",
        //   permissions: ["inhouse-product"],
        // },
        // {
        //   name: "In House Orders",
        //   url: "/inventory/inhouse-orders",
        //   permissions: ["inhouse-order"],
        // },
        // {
        //   name: "In House StockTake",
        //   url: "/inventory/inhouse-stocktake",
        //   permissions: ["inhouse-stocktake"],
        // },
      ],
    },
    {
      name: "Reports",
      url: "/reports",
      icon: "cui-chart",
      permissions: ["reports"],
      children: [
        {
          name: "Compare Products",
          url: "/reports/compare-products",
          permissions: ["productreport"],
        },
        {
          name: "Sales By Product",
          url: "/reports/sales-by-product",
          permissions: ["productreport"],
        },
        {
          name: "Sales By Family",
          url: "/reports/sales-by-family",
          permissions: ["productbysubcatreport"],
        },
        {
          name: "Sales By Category",
          url: "/reports/sales-by-category",
          permissions: ["productcategory"],
        },
        {
          name: "Sales Purchase By Family",
          url: "/reports/sales-purchase-by-family",
          permissions: ["salepurchase"],
        },
        {
          name: "Sales Purchase By Product",
          url: "/reports/sales-purchase-by-product",
          permissions: ["salepurchase"],
        },
        {
          name: "Sales Purchase",
          url: "/reports/sales-purchase",
          permissions: ["salepurchase"],
        },
        {
          name: "Close Cash Report",
          url: "/reports/closecash",
          permissions: ["closecashreport"],
        },
        {
          name: "Banking Report",
          url: "/reports/banking",
          permissions: ["bankingreport"],
        },
        {
          name: "Transaction Report",
          url: "/reports/transaction",
          permissions: ["transaction"],
        },
        {
          name: "Sales Overview",
          url: "/reports/sales-overview",
          permissions: ["salesoverview"],
        },
        {
          name: "Hourly Sales Overview",
          url: "/reports/hourly-sales-overview",
          permissions: ["hourlyreport"],
        },
        {
          name: "Hourly Sales Report",
          url: "/reports/hourly-sales-report",
          permissions: ["hourlyreport"],
        },
        {
          name: "Void Transactions",
          url: "/reports/void-transactions",
          permissions: ["voids"],
        },
        {
          name: "Register Opens",
          url: "/reports/register-opens",
          permissions: ["voids"],
        },
        {
          name: "Store Income & Expense",
          url: "/reports/store-income-and-expense",
          permissions: ["profitnloss"],
        },
        {
          name: "Hours Exceed Report",
          url: "/reports/hours-exceed-report",
          permissions: ["store-hours-exceed"],
        },
        {
          name: "Proft Loss Report",
          url: "/reports/profit-loss-report",
          permissions: ["profitnloss"],
        },
        // {
        //   name: "Inhouse Order By All Stores",
        //   url: "/reports/inhouse-order-all-stores",
        //   permissions: ["inhouse-order-allstores"],
        // },
        // {
        //   name: "Inhouse Order By Store",
        //   url: "/reports/inhouse-order-store",
        //   permissions: ["inhouse-order-report"],
        // },
      ],
    },
  ],
};
