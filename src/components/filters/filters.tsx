import FilterByCategory from '../filter-by-category/filter-by-category';
import FilterByLevel from '../filter-by-level/filter-by-level';
import FilterByType from '../filter-by-type/filter-by-type';

type TFilters = {
    onChangeType: (evt: boolean, filter: string)=> void;
    onChangeLevel: (evt: boolean, filter: string) => void;
    onChangeCategory: (filter: string) => void;
    onClickReset: () => void;
    currentCategory: string;
}

export default function Filters ({onChangeType, onChangeLevel, onClickReset, onChangeCategory, currentCategory}: TFilters) {

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="price"
                  placeholder="от"
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceUp"
                  placeholder="до"
                />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <FilterByCategory onChange={onChangeCategory} currentCategory={currentCategory}/>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <FilterByType onChange={onChangeType} currentCategory={currentCategory}/>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <FilterByLevel onChange={onChangeLevel}/>
        </fieldset>
        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={() => onClickReset()}
        >
                    Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
