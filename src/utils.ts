import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { TReviews } from './types/type-reviews';
import { TCamera, TCameraArray } from './types/type-camera';
import { FilterCategory, FilterCategoryRus, SortBtn, SortBy } from './const';

export const dateFormatReview = (date: string) => dayjs(date).format('DD MMMM');

dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  months: [
    'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
  ]
});

export const sortReview = (a: TReviews, b:TReviews) => {
  const dateA = dayjs(a.createAt);
  const dateB = dayjs(b.createAt);
  return dateB.diff(dateA);
};

export const sortingBy = (activeSort: string, activeBtn: string, cameras: TCamera[]): TCamera[] | undefined => {
  switch (activeSort) {
    case SortBy.sortPrice:
      switch(activeBtn){
        case SortBtn.up:
          return cameras.sort((cameraA: TCamera, cameraB: TCamera) => cameraA.price - cameraB.price);
        case SortBtn.down:
          return cameras.sort((cameraA: TCamera, cameraB: TCamera) => cameraB.price - cameraA.price);
      }
      break;
    case SortBy.sortPopular:
      switch(activeBtn) {
        case SortBtn.up:
          return cameras.sort((cameraA: TCamera, cameraB: TCamera) => cameraA.rating - cameraB.rating);
        case SortBtn.down:
          return cameras.sort((cameraA: TCamera, cameraB: TCamera) => cameraB.rating - cameraA.rating);
      }
      break;
    default:
      return cameras;
  }
};

export const filtredCategory = {
  [FilterCategory.Fotocamera]: (cameras: TCameraArray) => cameras.filter((camera) => camera.category === 'Фотоаппарат'),
  [FilterCategory.Videocamera]: (cameras: TCameraArray) => cameras.filter((camera) => camera.category === FilterCategoryRus.Videocamera)
};

