import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import users from "./modules/users";
import stores from "./modules/stores";
import closeCashBanking from "./modules/close-cash-banking";
import invoices from "./modules/invoices";
import promotions from "./modules/promotions";
import distributors from "./modules/distributors";
import subCategories from "./modules/sub-categories";
import promotionSales from "./modules/promotion-sales";
import trainings from "./modules/trainings";
import trainingTypes from "./modules/training-types";
import roles from "./modules/roles";
import permissions from "./modules/permissions";
import staffs from "./modules/staffs";
import bankingVerification from "./modules/banking-verification";
import eftVerification from "./modules/eft-verification";
import reports from "./modules/reports";
import closeCash from "./modules/close-cash";
import transtypes from "./modules/transtypes";
import translines from "./modules/translines";
import deliverys from "./modules/deliverys";
import deliveryTypes from "./modules/delivery-types";
import deliveryLines from "./modules/delivery-lines";
import products from "./modules/products";
import suppliers from "./modules/suppliers";
import search from "./modules/search";
import categories from "./modules/categories";
import taxes from "./modules/taxes";
import storePrices from "./modules/store-prices";
import shifts from "./modules/shifts";
import closeShiftForm from "./modules/close-shift-form";
import editClosecash from "./modules/edit-close-cash";
import intraStorePool from "./modules/intra-store-pool";
import stockLevels from "./modules/stock-levels";
import roster from "./modules/roster";
import purchaseCappings from "./modules/purchase-cappings";
import storeProfiles from "./modules/store-profiles";
import competitors from "./modules/competitors";
import marketPriceLists from "./modules/market-price-lists";
import marketPriceListSubcats from "./modules/market-price-list-subcats";
import orderDeliveryDays from "./modules/order-delivery-days";
import storePricesList from "./modules/store-prices-list";
import bulkPromotions from "./modules/bulk-promotions";
import promotionPayments from "./modules/promotion-payments";
import accounts from "./modules/accounts";
import accountTypes from "./modules/account-types";
import invoicesProcessorLogs from "./modules/invoices-processor-logs";
import tasks from "./modules/tasks";
import payrolls from "./modules/payrolls";
import storeAccounts from "./modules/store-accounts";
import deliveryBuffer from "./modules/delivery-buffer";
import deliveryReceives from "./modules/delivery-receives";
import stockTakes from "./modules/stock-takes";
import inventories from "./modules/inventories";
import bankFeeds from "./modules/bank-feeds";
import knowledgeBases from "./modules/knowledge-bases";
import companies from "./modules/companies";
import expenses from "./modules/expenses";
import leaves from "./modules/leaves";
import NewEmployee from "./modules/NewEmployee";
import SubAttributes from "./modules/subattribute";
import MainAttributes from "./modules/mainattribute";
import audit from "./modules/audit";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    users,
    expenses,
    leaves,
    stores,
    closeCashBanking,
    invoices,
    promotions,
    distributors,
    subCategories,
    promotionSales,
    trainings,
    trainingTypes,
    roles,
    permissions,
    staffs,
    bankingVerification,
    eftVerification,
    reports,
    closeCash,
    transtypes,
    translines,
    deliverys,
    deliveryTypes,
    deliveryLines,
    products,
    suppliers,
    search,
    categories,
    products,
    taxes,
    storePrices,
    shifts,
    closeShiftForm,
    editClosecash,
    intraStorePool,
    stockLevels,
    roster,
    purchaseCappings,
    storeProfiles,
    competitors,
    marketPriceLists,
    marketPriceListSubcats,
    orderDeliveryDays,
    storePricesList,
    bulkPromotions,
    promotionPayments,
    accounts,
    accountTypes,
    invoicesProcessorLogs,
    tasks,
    payrolls,
    storeAccounts,
    deliveryBuffer,
    deliveryReceives,
    stockTakes,
    inventories,
    bankFeeds,
    knowledgeBases,
    companies,
    NewEmployee,
    SubAttributes,
    MainAttributes,
    audit,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
