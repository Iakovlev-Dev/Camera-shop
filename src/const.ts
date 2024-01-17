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
  PAGE_CAMERA: 'PAGE_CAMERA'
};

export const APIRoute = {
  Cameras: '/cameras',
  Promo: '/promo'
};
