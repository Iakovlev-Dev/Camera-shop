import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { TReviews } from './types/type-reviews';

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
