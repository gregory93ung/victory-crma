export enum Platform {
  YANDEX = 'YANDEX',
  GIS = 'GIS',
  FLAMP = 'FLAMP',
}

export type platform = 'YANDEX' | 'GIS' | 'FLAMP' | '';

export interface IRole {
  id: number;
  title: string;
}

export interface IDepartament {
  id: number;
  title: string;
}

export interface IManager {
  id: number;
  name: string;
  role: IRole;
  departament: IDepartament;
}

export interface IClients {
  id: number;
  title: string;
  manager: IManager;
  number_of_cards: number;
  number_of_orders: number;
}

export interface IContacts {
  id: number;
  title: string;
  phone: string | null;
  email: string | null;
  comment: string | null;
}

export interface IContactAdd {
  client_id: number;
  title: string;
  phone: string | null;
  email: string | null;
  comment: string | null;
}

export interface IClientInfo {
  id: number;
  name: string;
  manager: IManager;
  number_of_active_orders: number;
  number_of_cards: number;
  city: string | null;
  description: string | null;
  rating: number | null;
  reviews_count: number | null;
  branch_count: number | null;
  comment: string | null;
}

export interface IClientOrder {
  id: number;
  card: ICard;
  service: IService;
  count: number;
  period_start: string;
  period_end: string;
  implementer: IImplementer;
  status: string;
  price: number;
}

export interface ICard {
  id: number;
  card_url: string;
  platform: platform;
  comment: string;
  firm_name: string;
  firm_address: string;
  service_login: string;
  service_password: string;
  service_url: string;
  rating: string;
}

export interface IService {
  id: number;
  name: string;
  platform: string;
  price: string;
}

export interface IImplementer {
  id: number;
  role: IRole;
  departament: IDepartament;
  name: string;
}

export interface IRole {
  id: number;
  title: string;
}

export interface IDepartament {
  id: number;
  title: string;
}

export type Detail = {
  detail: string;
};

export type Role = {
  id: number;
  title: string;
};

export type Departament = {
  id: number;
  title: string;
};

export type Manager = {
  id: number;
  name: string;
  role: Role;
  departament: Departament;
};

export type Client = {
  id: number;
  title: string;
  manager: Manager;
  number_of_cards: number;
  number_of_active_orders: number;
};

export type ClientDetailInfo = {
  id: number;
  name: string;
  manager: Manager;
  number_of_active_orders: number;
  number_of_cards: number;
  city: string | null;
  description: string | null;
  rating: number | null;
  reviews_count: number | null;
  branch_count: number | null;
  comment: string | null;
};

export type Contacts = {
  id: number;
  title: string;
  phone: string | null;
  email: string | null;
  comment: string | null;
};

export type ContactAdd = {
  client_id: string;
  title: string;
  phone: string | null;
  email: string | null;
  comment: string | null;
};

export type ClientOrder = {
  id: number;
  card: Card;
  service: Service;
  count: number;
  period_start: string;
  period_end: string;
  implementer: Implementer;
  status: string;
  price: number;
};

export type Card = {
  id: number;
  card_url: string;
  platform: platform;
  comment: string;
  firm_name: string;
  firm_address: string;
  service_login: string;
  service_password: string;
  service_url: string;
  rating: string;
};

export type Service = {
  id: number;
  name: string;
  platform: platform;
  price: string;
};

export type Implementer = {
  id: number;
  role: Role;
  departament: Departament;
  name: string;
};

export type Comment = {
  id: number;
  comment: string | null;
};

export type Credentials = {
  id: number;
  service_login: string | null;
  service_password: string | null;
  service_url: string | null;
};

export type TwoGisReview = {
  review_id: number;
  review_text: string;
  rating: number;
  provider: string;
  is_hidden: boolean;
  date_created: string;
  date_edited: string | null;
  user_id: string;
  user_name: string;
  official_answer_text: string | null;
  official_answer_date: string | null;
  deleted: boolean;
  our_review: boolean;
  old: boolean;
};

export type YandexReview = {
  review_id: number;
  review_text: string;
  rating: number;
  date_created: string;
  user_id: string | null;
  user_name: string | null;
  official_answer_text: string | null;
  official_answer_date: string | null;
  deleted: boolean;
  our_review: boolean;
};

export type sex = 'male' | 'female';

export type account = {
  id: number;
  name: string;
  username: string;
  password: string;
};

// export type GisWriterReview = {
//   id: number;
//   review_text: string;
//   date: string;
//   date_done: string | null;
//   found: boolean;
//   deleted: boolean;
//   account: account;
//   sex: sex;
// };

export type GisDeletingingReview = TwoGisReview;

export type YandexAccountingReview = YandexReview;
export type YandexDeletingReview = YandexReview;

export type GisAccountingReview = TwoGisReview;
export type GisDeletingReview = TwoGisReview;
export type GisWriterReview = {
  id: number;
  review_text: string;
  date: string;
  date_done: string | null;
  found: boolean;
  deleted: boolean;
  account: account | null;
  sex: sex;
};
