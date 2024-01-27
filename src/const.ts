export enum AppRoute {
    Main = '/',
    Camera = '/cameras/:id',
    Orders = '/orders'
}

interface FilterBy <T> {
    [key: string]: T;
}

interface SortBy <T> {
    [key: string]: T;
}

interface Rating <T> {
  [key: string]: T;
}

export const FilterCategory: FilterBy<string> = {
  Fotocamera: 'Фотокамера',
  Videocamera: 'Видеокамера'
};

export const FilterType: FilterBy<string> = {
  Digital: 'Цифровая',
  FilmCamera: 'Пленочная',
  Instant: 'Моментальная',
  Сollectible: 'Коллекционная'
};

export const FilterLevel: FilterBy<string> = {
  Zerolevel: 'Нулевой',
  Amateur: 'Любительский',
  Professional: 'Любительский'
};

export const SortBy: SortBy<string> = {
  sortPrice: 'по цене',
  sortPopular: 'по популярности'
};

export const SortBtn: SortBy<string> = {
  up: 'по возрастанию',
  down: 'по убыванию'
};

export const NameSpace = {
  DATA_CARDS: 'DATA_CARDS',
  REVIEW: 'REVIEW',
  PROMO: 'PROMO',
} as const;

export const APIRoute = {
  Cameras: '/cameras',
  Promo: '/promo',
  Post: '/reviews'
};

export const Rating: Rating<string> = {
  Perfect: 'Отлично',
  Good: 'Хорошо',
  Normal: 'Нормально',
  Bad: 'Плохо',
  Terrible: 'Ужасно',
};


export const RatingNumb: Rating<string> = {
  Terrible: '1',
  Bad: '2',
  Normal: '3',
  Good: '4',
  Perfect: '5',
};

export const LoadingDataStatus = {
  Unsent: 'UNSENT',
  Pending: 'PENDING',
  Success: 'SUCCESS'
};
