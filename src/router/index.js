import Vue from "vue";
import Router from "vue-router";

// Login Form
import LoginForm from "@/containers/Login";
import ForgotPassword from "@/containers/ForgotPassword";
import ResetPassword from "@/containers/ResetPassword";
import CreatePassword from "@/containers/CreatePassword";

import Page403 from "@/views/pages/Page403";
// Containers
const DefaultContainer = () => import("@/containers/DefaultContainer");

// Views
const Dashboard = () => import("@/containers/Dashboard");

const CloseShift = () => import("@/containers/mpulse/closeshift/CloseShift");
const BankFeeds = () => import("@/containers/mpulse/bankfeeds/BankFeeds");
const BankFeedDetail = () =>
  import("@/containers/mpulse/bankfeeds/BankFeedDetail");
const DeliveryReceive = () =>
  import("@/containers/mpulse/delivery-receive/DeliveryReceive");
const Banking = () => import("@/containers/mpulse/Banking");
const Invoices = () => import("@/containers/mpulse/invoices/Invoices");
const Promotions = () => import("@/containers/mpulse/promotions/Promotions");
const Trainings = () => import("@/containers/mpulse/training/Trainings");
const DisplayTrainings = () =>
  import("@/containers/mpulse/training/DisplayTrainings");
const PendingTrainings = () =>
  import("@/containers/mpulse/training/PendingTrainings");
const TrainingDetail = () =>
  import("@/containers/mpulse/training/TrainingDetail");
const Roles = () => import("@/containers/mpulse/roles/Roles");
const Staffs = () => import("@/containers/mpulse/staffs/Staffs");

const BankingAudit = () => import("@/containers/mpulse/audit/BankingAudit");
const EftposAudit = () => import("@/containers/mpulse/audit/EftposAudit");

const DeliveryReport = () =>
  import("@/containers/mpulse/inventory/DeliveryReport");
const AddDelivery = () => import("@/containers/mpulse/inventory/AddDelivery");
const MinStockQtys = () => import("@/containers/mpulse/inventory/MinStockQtys");
const IntraStorePool = () =>
  import("@/containers/mpulse/inventory/IntraStorePool");
const StockTake = () => import("@/containers/mpulse/inventory/StockTake");
const StockTakeList = () =>
  import("@/containers/mpulse/inventory/StockTakeList");
const InhouseStockTakeList = () =>
  import("@/containers/mpulse/inventory/InhouseStockTakeList");
const InventoryCount = () =>
  import("@/containers/mpulse/inventory/InventoryCount");
const InventoryView = () =>
  import("@/containers/mpulse/inventory/InventoryView");
const OrderQuantity = () =>
  import("@/containers/mpulse/inventory/OrderQuantity");
const DisableOrderProducts = () =>
  import("@/containers/mpulse/inventory/DisableOrderProducts");
const StockLevel = () => import("@/containers/mpulse/inventory/StockLevel");
const IntrastoreScanning = () =>
  import("@/containers/mpulse/inventory/IntrastoreScanning");
const InHouseProductList = () =>
  import("@/containers/mpulse/inventory/InHouseProductList");
const InHouseProductOrder = () =>
  import("@/containers/mpulse/inventory/InHouseProductOrder");
const InHouseProductStockTake = () =>
  import("@/containers/mpulse/inventory/InHouseProductStockTake");

const DeliveryBuffer = () =>
  import("@/containers/mpulse/delivery-buffer/DeliveryBuffer");
const DeliveryBufferUpdate = () =>
  import("@/containers/mpulse/delivery-buffer/DeliveryBufferUpdate");

const HoursExceedReport = () =>
  import("@/containers/mpulse/reports/HoursExceedReport");
const ReportSalesByProduct = () =>
  import("@/containers/mpulse/reports/ReportSalesByProduct");
const SalesByFamilyReport = () =>
  import("@/containers/mpulse/reports/SalesByFamilyReport");
const ReportSalesByCategory = () =>
  import("@/containers/mpulse/reports/ReportSalesByCategory");
const ReportCloseCash = () =>
  import("@/containers/mpulse/reports/ReportCloseCash");
const ReportBanking = () => import("@/containers/mpulse/reports/ReportBanking");
const ReportTransaction = () =>
  import("@/containers/mpulse/reports/ReportTransaction");
const ReportSalesOverview = () =>
  import("@/containers/mpulse/reports/ReportSalesOverview");
const ReportSalesPurchaseOverview = () =>
  import("@/containers/mpulse/reports/ReportSalesPurchaseOverview");
const SalesPurchaseReport = () =>
  import("@/containers/mpulse/reports/SalesPurchaseReport");
const SalesPurchaseByFamilyReport = () =>
  import("@/containers/mpulse/reports/SalesPurchaseByFamilyReport");
const SalesPurchaseByProductReport = () =>
  import("@/containers/mpulse/reports/SalesPurchaseByProductReport");
const HourlySalesOverviewReport = () =>
  import("@/containers/mpulse/reports/HourlySalesOverviewReport");
const ReportVoidTransactions = () =>
  import("@/containers/mpulse/reports/ReportVoidTransactions");
const ReportProfitLoss = () =>
  import("@/containers/mpulse/reports/ReportProfitLoss");
const ReportCompareProducts = () =>
  import("@/containers/mpulse/reports/ReportCompareProducts");
const PayrollReport = () => import("@/containers/mpulse/payroll/PayrollReport");
const PayrollList = () => import("@/containers/mpulse/payroll/PayrollList");
const PayrollGenerate = () =>
  import("@/containers/mpulse/payroll/PayrollGenerate");
const ReportRegisterOpens = () =>
  import("@/containers/mpulse/reports/ReportRegisterOpens");
const StoreIncomeAndExpense = () =>
  import("@/containers/mpulse/reports/StoreIncomeAndExpense");
const HourlySalesReport = () =>
  import("@/containers/mpulse/reports/HourlySalesReport");
const InvoiceAmounts = () =>
  import("@/containers/mpulse/reports/InvoiceAmounts");
const StoreWage = () => import("@/containers/mpulse/reports/StoreWage");
const InhouseOrderByAllStores = () =>
  import("@/containers/mpulse/reports/InhouseOrderByAllStores");
const InhouseOrderByStore = () =>
  import("@/containers/mpulse/reports/InhouseOrderByStore");
const Products = () => import("@/containers/mpulse/products/Products");
const GlobalProducts = () =>
  import("@/containers/mpulse/products/GlobalProducts");
const ProductRanking = () =>
  import("@/containers/mpulse/product-ranking/ProductRanking");
const EditCloseCash = () =>
  import("@/containers/mpulse/editclosecash/EditCloseCash");
const Roster = () => import("@/containers/mpulse/roster/Roster");
const Categories = () => import("@/containers/mpulse/categories/Categories");
const SubCategories = () =>
  import("@/containers/mpulse/categories/SubCategories");
const Suppliers = () => import("@/containers/mpulse/suppliers/Suppliers");
const PurchaseCappings = () =>
  import("@/containers/mpulse/purchase-cappings/PurchaseCappings");
const Companies = () => import("@/containers/mpulse/companies/Companies");
const Stores = () => import("@/containers/mpulse/stores/Stores");
const StoreProfiles = () =>
  import("@/containers/mpulse/storeprofiles/StoreProfiles");
const Distributors = () =>
  import("@/containers/mpulse/distributors/Distributors");
const Competitors = () => import("@/containers/mpulse/competitors/Competitors");
const PriceLists = () => import("@/containers/mpulse/price-lists/PriceLists");
const PriceListSubcats = () =>
  import("@/containers/mpulse/price-list-subcats/PriceListSubcats");
const BulkPromotions = () =>
  import("@/containers/mpulse/bulk-promotions/BulkPromotions");
const BulkPromotionsList = () =>
  import("@/containers/mpulse/bulk-promotions/BulkPromotionsList");
const OrderDeliveryDays = () =>
  import("@/containers/mpulse/orderdeliverydays/OrderDeliveryDays");
const StorePricesList = () =>
  import("@/containers/mpulse/promotions/StorePricesList");
const SalesRepPromotions = () =>
  import("@/containers/mpulse/sales-rep-promotions/SalesRepPromotions");
const AuditPromoRebates = () =>
  import("@/containers/mpulse/audit-promo-rebates/AuditPromoRebates");
const Accounts = () => import("@/containers/mpulse/accounts/Accounts");
const AccountRules = () => import("@/containers/mpulse/accounts/AccountRules");
const Tasks = () => import("@/containers/mpulse/tasks/Tasks");
const MyTasks = () => import("@/containers/mpulse/tasks/MyTasks");
const OwnersTaking = () =>
  import("@/containers/mpulse/owners-taking/OwnersTaking");
// Admnistrator
const StoreStatus = () =>
  import("@/containers/mpulse/store-status/StoreStatus");
const InvoiceProcessorLogs = () =>
  import("@/containers/mpulse/invoice-processor-logs/InvoiceProcessorLogs");
const PublicHolidays = () =>
  import("@/containers/mpulse/public-holidays/PublicHolidays");
const PriceBoard = () => import("@/containers/mpulse/price-board/PriceBoard");
const KnowledgeBase = () =>
  import("@/containers/mpulse/knowledge-base/KnowledgeBase");
const MyKnowledgeBase = () =>
  import("@/containers/mpulse/knowledge-base/MyKnowledgeBase");
const LeaveForm = () => import("@/containers/leaves/leaveForm");
const ExpensesReport = () => import("@/containers/expenses/ExpensesTable");
const Expenses = () => import("@/containers/expenses/AddClaimForm");
const Leaves = () => import("@/containers/leaves/LeavesTable");
const Newemployee = () => import("@/containers/NewEmployee/form");
const AuditForm = () => import("@/containers/audit/AddAudit");
const AuditReport = () => import("@/containers/audit/AuditTable");
const ManageSubAttributes = () =>
  import("@/containers/audit/MangeSubAttributes");
const ManageMainAttributes = () =>
  import("@/containers/audit/ManageMainAttributes");
Vue.use(Router);

export default new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      name: "Home",
      meta: { auth: true },
      component: DefaultContainer,
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: Dashboard,
        },
        {
          path: "trainings/pending",
          name: "Pending Trainings",
          component: PendingTrainings,
        },
        {
          path: "trainings/:id",
          name: "Training Detail",
          component: TrainingDetail,
        },
        {
          meta: { auth: ["closeshift"] },
          path: "closeshift",
          name: "Close Shift",
          component: CloseShift,
        },
        {
          meta: { auth: ["bankfeeds"] },
          path: "bankfeeds",
          name: "Bank Feeds",
          component: BankFeeds,
        },
        {
          meta: { auth: ["bankfeeds"] },
          path: "bankfeeds/:id",
          name: "Bank Feed Detail",
          component: BankFeedDetail,
        },
        {
          meta: { auth: ["deliveryreceive"] },
          path: "delivery-receive",
          name: "Delivery Receive",
          component: DeliveryReceive,
        },
        {
          meta: { auth: ["invoices"] },
          path: "invoices",
          name: "Manage Invoices",
          component: Invoices,
        },
        {
          meta: { auth: ["invoices"] },
          path: "distributors",
          name: "Manage Distributors",
          component: Distributors,
        },
        {
          meta: { auth: ["banking"] },
          path: "banking",
          name: "Banking",
          component: Banking,
        },
        {
          meta: { auth: ["owners_taking"] },
          path: "owners-taking",
          name: "Owners Taking",
          component: OwnersTaking,
        },
        {
          meta: { auth: ["promotion"] },
          path: "promotions",
          name: "Manage Promotions",
          component: Promotions,
        },
        {
          meta: { auth: ["promotion"] },
          path: "store-prices-list",
          name: "Store Price",
          component: StorePricesList,
        },
        {
          path: "competitors",
          name: "Manage Competitors",
          component: Competitors,
        },
        {
          path: "accounts",
          name: "Manage Accounts",
          component: Accounts,
        },
        {
          path: "accounts/account-rules",
          name: "Manage Account Rules",
          component: AccountRules,
        },
        {
          path: "price-lists",
          name: "Manage Price Lists",
          component: PriceLists,
        },
        {
          path: "price-lists/:listid/subcats",
          name: "Manage Price List Subcats",
          component: PriceListSubcats,
        },
        {
          path: "bulk-promotions",
          name: "Manage Bulk Promotions",
          component: BulkPromotions,
        },
        {
          path: "bulk-promotions-list",
          name: "Bulk Promotions List",
          component: BulkPromotionsList,
        },
        {
          meta: { auth: ["sales-rep-promo"] },
          path: "sales-rep-promotions",
          name: "Sales Rep Promos",
          component: SalesRepPromotions,
        },
        {
          path: "order-delivery-days",
          name: "Manage Order Delivery Days",
          component: OrderDeliveryDays,
        },
        {
          meta: { auth: ["training"] },
          path: "trainings",
          name: "Manage Trainings",
          component: Trainings,
        },
        {
          path: "display-trainings",
          name: "Display Trainings",
          component: DisplayTrainings,
        },
        {
          meta: { auth: ["roles"] },
          path: "roles",
          name: "Roles",
          component: Roles,
        },
        {
          meta: { auth: ["manage-companies"] },
          path: "companies",
          name: "Manage Companies",
          component: Companies,
        },
        {
          meta: { auth: ["manage-stores"] },
          path: "stores",
          name: "Manage Stores",
          component: Stores,
        },
        {
          meta: { auth: ["store-profile"] },
          path: "store-profiles",
          name: "Store Profiles",
          component: StoreProfiles,
        },
        {
          meta: { auth: ["editclosecash"] },
          path: "edit-close-cash",
          name: "Edit Close Cash",
          component: EditCloseCash,
        },
        {
          meta: { auth: ["staff"] },
          path: "staff",
          name: "Staff",
          component: Staffs,
        },
        {
          meta: { auth: ["view-tasks"] },
          path: "tasks",
          name: "Manage Tasks",
          component: Tasks,
        },
        {
          path: "my-tasks",
          name: "My Tasks",
          component: MyTasks,
        },
        {
          path: "my-knowledge-base",
          name: "My Knowledge Base",
          component: MyKnowledgeBase,
        },
        {
          meta: { auth: ["payroll"] },
          path: "payroll-report",
          name: "Payroll Report",
          component: PayrollReport,
        },
        {
          meta: { auth: ["payroll"] },
          path: "payroll",
          name: "Payroll",
          component: PayrollList,
        },
        {
          meta: { auth: ["payroll"] },
          path: "payroll-generate",
          name: "Payroll Generate",
          component: PayrollGenerate,
        },
        {
          meta: { auth: ["invoice-amounts"] },
          path: "invoice-amounts",
          name: "Invoice Amounts",
          component: InvoiceAmounts,
        },
        {
          meta: { auth: ["store-wage"] },
          path: "store-wage",
          name: "Store Wage",
          component: StoreWage,
        },
        {
          path: "administrator",
          redirect: "/administrator/store-status",
          name: "Administrator",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              meta: { auth: ["mpulse_admin"] },
              path: "store-status",
              name: "Store Status",
              component: StoreStatus,
            },
            {
              meta: { auth: ["mpulse_admin"] },
              path: "add_claim_form",
              name: "Add Claim Form",
              component: Expenses,
            },

            {
              meta: { auth: ["mpulse_admin"] },
              path: "leaveform",
              name: "Add Leave Form",
              component: LeaveForm,
            },
            {
              meta: { auth: ["mpulse_admin"] },
              path: "leavesreport",
              name: "Leaves Report",
              component: Leaves,
            },
            {
              meta: { auth: ["mpulse_admin"] },
              path: "auditform",
              name: "Store Audit Form",
              component: AuditForm,
            },
            {
              meta: { auth: ["mpulse_admin"] },
              path: "auditreport",
              name: "Store Audit Report",
              component: AuditReport,
            },
            {
              // meta: { auth: ["mpulse_admin"] },
              path: "auditattribute",
              name: "Manage Audit Sub Attributes",
              component: ManageSubAttributes,
            },
            {
              // meta: { auth: ["mpulse_admin"] },
              path: "auditmainattribute",
              name: "Manage  Audit Main Attributes",
              component: ManageMainAttributes,
            },

            {
              meta: { auth: ["mpulse_admin"] },
              path: "global-products",
              name: "Manage Global Products",
              component: GlobalProducts,
            },
            {
              meta: { auth: ["mpulse_admin"] },
              path: "invoice-processor",
              name: "Invoice Processor Review",
              component: InvoiceProcessorLogs,
            },
            {
              path: "public-holidays",
              name: "Public Holidays",
              component: PublicHolidays,
            },
            {
              path: "knowledge-base",
              name: "Knowledge Base",
              component: KnowledgeBase,
            },
          ],
        },
        {
          path: "audit",
          redirect: "/audit/banking",
          name: "Audit",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              meta: { auth: ["bankingverify"] },
              path: "banking",
              name: "Banking Audit",
              component: BankingAudit,
            },
            {
              meta: { auth: ["eftverify"] },
              path: "eftpos",
              name: "Eftpos Audit",
              component: EftposAudit,
            },
            {
              meta: { auth: ["bankingverify"] },
              path: "promo-rebates",
              name: "Audit Promo Rebates",
              component: AuditPromoRebates,
            },
          ],
        },

        {
          path: "stockordering",
          redirect: "/stockordering/stock-take",
          name: "Stock Ordering",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              meta: { auth: ["view-stock-take"] },
              path: "stock-take",
              name: "Stock Take",
              component: StockTake,
            },
            {
              meta: { auth: ["stocktake"] },
              path: "view-stock-take",
              name: "View Stock Take",
              component: StockTakeList,
            },
            {
              meta: { auth: ["stocktake"] },
              path: "view-inhouse-stock-take",
              name: "View Inhouse Stock Take",
              component: InhouseStockTakeList,
            },
            {
              meta: { auth: ["stocktake"] },
              path: "min-stock-qtys",
              name: "Min Stock Qtys",
              component: MinStockQtys,
            },

            {
              meta: { auth: ["order-quantity"] },
              path: "order-quantity",
              name: "Order Quantity",
              component: OrderQuantity,
            },
            {
              meta: { auth: ["disable-order-product"] },
              path: "disable-order-products",
              name: "Disable Order Products",
              component: DisableOrderProducts,
            },

            {
              meta: { auth: ["inhouse-product"] },
              path: "inhouse-products",
              name: "Inhouse Products",
              component: InHouseProductList,
            },
            {
              meta: { auth: ["inhouse-order"] },
              path: "inhouse-orders",
              name: "Inhouse Orders",
              component: InHouseProductOrder,
            },
            {
              meta: { auth: ["inhouse-stocktake"] },
              path: "inhouse-stocktake",
              name: "Inhouse stocktake",
              component: InHouseProductStockTake,
            },
            {
              meta: { auth: ["inhouse-order-allstores"] },
              path: "inhouse-order-all-stores",
              name: "Inhouse Order By All Stores",
              component: InhouseOrderByAllStores,
            },
            {
              meta: { auth: ["inhouse-order-report"] },
              path: "inhouse-order-store",
              name: "Inhouse Order By Store",
              component: InhouseOrderByStore,
            },
          ],
        },
        {
          path: "inventory",
          redirect: "/inventory/add-delivery",
          name: "Inventory",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              meta: { auth: ["deliveryadd"] },
              path: "add-delivery",
              name: "Add Delivery",
              component: AddDelivery,
            },
            {
              meta: { auth: ["intrastorepool"] },
              path: "intra-store-pool",
              name: "IntraStore Pool",
              component: IntraStorePool,
            },
            // {
            //   meta: { auth: ["view-stock-take"] },
            //   path: "stock-take",
            //   name: "Stock Take",
            //   component: StockTake,
            // },
            // {
            //   meta: { auth: ["stocktake"] },
            //   path: "view-stock-take",
            //   name: "View Stock Take",
            //   component: StockTakeList,
            // },
            // {
            //   meta: { auth: ["stocktake"] },
            //   path: "min-stock-qtys",
            //   name: "Min Stock Qtys",
            //   component: MinStockQtys,
            // },
            {
              meta: { auth: ["inventory-count"] },
              path: "inventory-count",
              name: "Inventory Count",
              component: InventoryCount,
            },
            {
              meta: { auth: ["inventory-view"] },
              path: "view-inventory",
              name: "View Inventory",
              component: InventoryView,
            },
            // {
            //   meta: { auth: ["order-quantity"] },
            //   path: "order-quantity",
            //   name: "Order Quantity",
            //   component: OrderQuantity,
            // },
            // {
            //   meta: { auth: ["disable-order-product"] },
            //   path: "disable-order-products",
            //   name: "Disable Order Products",
            //   component: DisableOrderProducts,
            // },
            {
              meta: { auth: ["delivery"] },
              path: "delivery-report",
              name: "Delivery Report",
              component: DeliveryReport,
            },
            {
              meta: { auth: ["stocklevel"] },
              path: "stock-level",
              name: "Stock Level",
              component: StockLevel,
            },
            // {
            //   meta: { auth: ["inhouse-product"] },
            //   path: "inhouse-products",
            //   name: "Inhouse Products",
            //   component: InHouseProductList,
            // },
            // {
            //   meta: { auth: ["inhouse-order"] },
            //   path: "inhouse-orders",
            //   name: "Inhouse Orders",
            //   component: InHouseProductOrder,
            // },
            // {
            //   meta: { auth: ["inhouse-stocktake"] },
            //   path: "inhouse-stocktake",
            //   name: "Inhouse stocktake",
            //   component: InHouseProductStockTake,
            // },
            {
              // meta: {auth: ['deliverybuffer']},
              path: "deliverybuffer",
              redirect: "/inventory/deliverybuffer/list",
              name: "Delivery Buffer",
              component: {
                render(c) {
                  return c("router-view");
                },
              },
              children: [
                {
                  meta: { auth: ["deliverybuffer"] },
                  path: "list",
                  name: "SKU List",
                  component: DeliveryBuffer,
                },
                {
                  meta: { auth: ["deliverybuffer"] },
                  path: ":skuid/:skuname",
                  name: "SKU Update",
                  component: DeliveryBufferUpdate,
                },
              ],
            },
            {
              meta: { auth: ["intrastore-scanning"] },
              path: "intrastore-scanning",
              name: "Intrastore Scanning",
              component: IntrastoreScanning,
            },
          ],
        },
        {
          path: "reports",
          redirect: "/reports/closecash",
          name: "Reports",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              meta: { auth: ["productreport"] },
              path: "compare-products",
              name: "Compare Products",
              component: ReportCompareProducts,
            },
            {
              meta: { auth: ["productreport"] },
              path: "sales-by-product",
              name: "Sales By Product",
              component: ReportSalesByProduct,
            },
            {
              meta: { auth: ["productbysubcatreport"] },
              path: "sales-by-family",
              name: "Sales By Family",
              component: SalesByFamilyReport,
            },
            {
              meta: { auth: ["productcategory"] },
              path: "sales-by-category",
              name: "Sales By Category",
              component: ReportSalesByCategory,
            },
            {
              meta: { auth: ["salepurchase"] },
              path: "sales-purchase-by-family",
              name: "Sales Purchase By Family",
              component: SalesPurchaseByFamilyReport,
            },
            {
              meta: { auth: ["salepurchase"] },
              path: "sales-purchase-by-product",
              name: "Sales Purchase By Product",
              component: SalesPurchaseByProductReport,
            },
            {
              meta: { auth: ["salepurchase"] },
              path: "sales-purchase",
              name: "Sales Purchase",
              component: SalesPurchaseReport,
            },
            {
              meta: { auth: ["salepurchase"] },
              path: "sales-purchase-overview",
              name: "Sales Purchase Overview",
              component: ReportSalesPurchaseOverview,
            },
            {
              meta: { auth: ["closecashreport"] },
              path: "closecash",
              name: "Close Cash",
              component: ReportCloseCash,
            },
            {
              meta: { auth: ["bankingreport"] },
              path: "banking",
              name: "Banking Report",
              component: ReportBanking,
            },
            {
              meta: { auth: ["transaction"] },
              path: "transaction",
              name: "Transaction Report",
              component: ReportTransaction,
            },
            {
              meta: { auth: ["salesoverview"] },
              path: "sales-overview",
              name: "Sales Overview",
              component: ReportSalesOverview,
            },
            {
              meta: { auth: ["hourlyreport"] },
              path: "hourly-sales-overview",
              name: "Hourly Sales Overview",
              component: HourlySalesOverviewReport,
            },
            {
              meta: { auth: ["hourlyreport"] },
              path: "hourly-sales-report",
              name: "Hourly Sales Report",
              component: HourlySalesReport,
            },
            {
              meta: { auth: ["voids"] },
              path: "void-transactions",
              name: "Void Transactions",
              component: ReportVoidTransactions,
            },
            {
              meta: { auth: ["voids"] },
              path: "register-opens",
              name: "Register Opens",
              component: ReportRegisterOpens,
            },
            {
              meta: { auth: ["profitnloss"] },
              path: "store-income-and-expense",
              name: "Store Income & Expense",
              component: StoreIncomeAndExpense,
            },
            {
              meta: { auth: ["profitnloss"] },
              path: "profit-loss-report",
              name: "Store Profit Loss",
              component: ReportProfitLoss,
            },
            {
              meta: { auth: ["store-hours-exceed"] },
              path: "hours-exceed-report",
              name: "Hours Exceed",
              component: HoursExceedReport,
            },
            // {
            //   meta: { auth: ["inhouse-order-allstores"] },
            //   path: "inhouse-order-all-stores",
            //   name: "Inhouse Order By All Stores",
            //   component: InhouseOrderByAllStores,
            // },
            // {
            //   meta: { auth: ["inhouse-order-report"] },
            //   path: "inhouse-order-store",
            //   name: "Inhouse Order By Store",
            //   component: InhouseOrderByStore,
            // },
          ],
        },
        {
          meta: { auth: ["product"] },
          path: "products",
          name: "Manage Products",
          component: Products,
        },
        {
          meta: { auth: ["product"] },
          path: "categories",
          name: "Manage Categories",
          component: Categories,
        },
        {
          meta: { auth: ["product"] },
          path: "subcategories",
          name: "Manage Sub Categories",
          component: SubCategories,
        },
        {
          meta: { auth: ["product"] },
          path: "suppliers",
          name: "Manage Suppliers",
          component: Suppliers,
        },
        {
          meta: { auth: ["price-board"] },
          path: "price-board",
          name: "Manage Price Board",
          component: PriceBoard,
        },
        {
          meta: { auth: ["product-rank-page"] },
          path: "product-ranking",
          name: "Product Ranking",
          component: ProductRanking,
        },
        {
          meta: { auth: ["product"] },
          path: "roster",
          name: "Roster",
          component: Roster,
        },
        {
          path: "newemployee",
          name: "New Employee",
          component: Newemployee,
        },

        {
          meta: { auth: ["invoices"] },
          path: "expensereport",
          name: "Expenses Report",
          component: ExpensesReport,
        },
        {
          meta: { auth: ["permission_capping"] },
          path: "purchase-cappings",
          name: "Purchase Capping",
          component: PurchaseCappings,
        },
        {
          path: "403",
          name: "403",
          component: Page403,
        },
      ],
    },
    {
      path: "/login",
      name: "LoginForm",
      component: LoginForm,
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: ForgotPassword,
    },
    {
      path: "/reset-password",
      name: "ResetPassword",
      component: ResetPassword,
    },
    {
      path: "/create-password",
      name: "CreatePassword",
      component: CreatePassword,
    },
  ],
});
