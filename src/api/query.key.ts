import {
  addRespAccountingReviewYandex,
  addRespAccountingReviewYandexReq,
} from './yandex/addRespAccountingReviewYandex';
import { login } from './auth/login';
import { getAllClients } from './clients/getAllClients';
import { getSpecificClient } from './clients/getSpecificClient';
import { getAllContactsClient } from './contacts/getAllContactsClient';
import { getAllOrdersClient } from './orders/getAllOrdersClient';
import { getAllCardsClient } from './cards/getAllCardsClient';
import { editSpecificClientInfo } from './clients/editSpecificClientInfo';
import { addNewContact } from './contacts/addNewContact';
import { deleteSpecificContact } from './contacts/deleteSpecificContact';
import { editSpecificContact } from './contacts/editSpecificContact';
import { getServices } from './services/getServices';
import { addNewOrderClient } from './orders/addNewOrderClient';
import { getAllReviewsCard } from './cards/getAllReviewsCard';
import { getSpecificCard } from './cards/getSpecificCard';
import { updateCardComment } from './cards/updateCardComment';
import { updateCardService } from './cards/updateCardService';
import { getOrderDetailInfo } from './orders/getCardDetailInfo';
import { getGisWriterReviews } from './gis/getGisWriter';
import { updateGisWriterReview } from './gis/updateGisWriterReview';
import { getAllReviewsCardsYandex } from './yandex/getAllReviewsCard';
import { updateCardInfo } from './cards/updateCardInfo';
import { editSpecificOrder } from './orders/editSpecificOrder';
import { getAllReviewsCardsGis } from './gis/getAllReviewsCardsGis';
import { getAccountingReviewsYandex } from './yandex/getAccountingReviewsYandex';
import { getDeletingReviewsYandex } from './yandex/getDeletingReviewsYandex';
import { addRespDeletingReviewYandex } from './yandex/addRespDeletingReviewYandex';
import { getAccountingReviewsGis } from './gis/getAccountingReviewsGis';
import { addRespAccountingReviewGis } from './gis/addRespAccountingReviewGis';
import { getDeletingReviewsGis } from './gis/getDeletingReviewsGis';
import { addRespDeletingReviewGis } from './gis/addRespDeletingReviewGis';
import { addRespDeletingOldReviewGis } from './gis/addRespDeletingOldReviewGis';
import { getWriterReviewsGis } from './gis/getWriterReviewsGis';
import { uploadWriterReviewsGis } from './gis/uploadWriterReviewsGis';
import { delGisWriterReview } from './gis/delGisWriterReview';

export const clients = {
  login: { key: 'login', fn: login },
  getAllClients: { key: 'getAllClients', fn: getAllClients },
  getSpecificClient: { key: 'getSpecificClient', fn: getSpecificClient },
  editSpecificClientInfo: {
    key: 'editSpecificClientInfo',
    fn: editSpecificClientInfo,
  },
  getAllContactsClient: {
    key: 'getAllContactsClient',
    fn: getAllContactsClient,
  },
  editSpecificContact: { key: 'editSpecificContact', fn: editSpecificContact },
  addNewContact: { key: 'addNewContact', fn: addNewContact },
  deleteSpecificContact: {
    key: 'deleteSpecificContact',
    fn: deleteSpecificContact,
  },
  getAllOrdersClient: { key: 'getAllOrdersClient', fn: getAllOrdersClient },
  addNewOrderClient: { key: 'addNewOrderClient', fn: addNewOrderClient },
  getAllCardsClient: { key: 'getAllCardsClient', fn: getAllCardsClient },
  getSpecificCard: { key: 'getSpecificCard', fn: getSpecificCard },
  getServices: { key: 'getServices', fn: getServices },
  getAllReviewsCard: { key: 'getAllReviewsCard', fn: getAllReviewsCard },
  updateCardInfo: { key: 'updateCardInfo', fn: updateCardInfo },
  getOrderDetailInfo: { key: 'getOrderDetailInfo', fn: getOrderDetailInfo },
  getGisWriterReviews: { key: 'getGisWriterReviews', fn: getGisWriterReviews },
  getAllReviewsCardsYandex: {
    key: 'getAllReviewsCardsYandex',
    fn: getAllReviewsCardsYandex,
  },
  getAllReviewsCardsGis: {
    key: 'getAllReviewsCardsGis',
    fn: getAllReviewsCardsGis,
  },
  editSpecificOrder: { key: 'editSpecificOrder', fn: editSpecificOrder },
  getAccountingReviewsYandex: {
    key: 'getAccountingReviewsYandex',
    fn: getAccountingReviewsYandex,
  },
  getDeletingReviewsYandex: {
    key: 'getDeletingReviewsYandex',
    fn: getDeletingReviewsYandex,
  },
  addRespAccountingReviewYandex: {
    key: 'addRespAccountingReviewYandex',
    fn: addRespAccountingReviewYandex,
  },
  addRespDeletingReviewYandex: {
    key: 'addRespDeletingReviewYandex',
    fn: addRespDeletingReviewYandex,
  },
  getAccountingReviewsGis: {
    key: 'getAccountingReviewsGis',
    fn: getAccountingReviewsGis,
  },
  addRespAccountingReviewGis: {
    key: 'addRespAccountingReviewGis',
    fn: addRespAccountingReviewGis,
  },
  getDeletingReviewsGis: {
    key: 'getDeletingReviewsGis',
    fn: getDeletingReviewsGis,
  },
  addRespDeletingReviewGis: {
    key: 'addRespDeletingReviewGis',
    fn: addRespDeletingReviewGis,
  },
  addRespDeletingOldReviewGis: {
    key: 'addRespDeletingOldReviewGis',
    fn: addRespDeletingOldReviewGis,
  },
  getWriterReviewsGis: { key: 'getWriterReviewsGis', fn: getWriterReviewsGis },
  uploadWriterReviewsGis: {
    key: 'uploadWriterReviewsGis',
    fn: uploadWriterReviewsGis,
  },
  delGisWriterReview: { key: 'delGisWriterReview', fn: delGisWriterReview },
  updateGisWriterReview: {
    key: 'updateGisWriterReview',
    fn: updateGisWriterReview,
  },
};
