import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectCards } from '../../store/data-card-process/selectors';
import { MIN_LETTER_FOR_SEARCH } from '../../const';
import { Link } from 'react-router-dom';

export default function FormSearch() {
  const cameras = useAppSelector(selectCards);

  const [searchValue, setSearchValue] = useState('');

  const filteredCameras = cameras.filter((camera) => camera.name.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div className={`form-search ${searchValue.length >= MIN_LETTER_FOR_SEARCH ? 'list-opened' : ''}`}>
      <form>
        <label>
          <svg
            className="form-search__icon"
            width={16}
            height={16}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-lens" />
          </svg>
          <input
            value={searchValue}
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            onChange={(evt) => setSearchValue(evt.target.value)}
          />
        </label>

        <ul className="form-search__select-list">
          {filteredCameras.map((item) => (
            <Link to={`/cameras/${item.id}`} key={item.name}>
              <li className="form-search__select-item" >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={()=> setSearchValue('')}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}
