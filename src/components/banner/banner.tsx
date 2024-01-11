import { selectPromo } from '../../store/data-card-process/selectors';
import { useAppSelector } from '../../store/hooks';
import Promo from '../promo/promo';

export default function Banner () {
  const promo = useAppSelector(selectPromo);
  return (
    <div className="banner">
      {promo?.map((item) => <Promo promo={item} key={item.id}/>)}

    </div>
  );
}
