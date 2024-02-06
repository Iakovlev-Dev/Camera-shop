import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import ProductReviewRating from '../product-review-rating/product-review-rating';

import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { postReviewAction } from '../../store/api-action';


export type TFormFielsRequest = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

export type TFormFielsResponse = {
    id: string;
    createAt: string;
    cameraId: number;
    userName: string;
    advantage: string;
    disadvantage: string;
    review: string;
    rating: number;
}

export type TProductReviewForm = {
  onClose: () => void;
}

export default function ProductReviewForm ({onClose}: TProductReviewForm) {
  const methods = useForm<TFormFielsRequest>();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = methods;

  const {id} = useParams();

  const [ratingStars, setRatingStars] = useState<number>(0);

  const onSubmit: SubmitHandler<TFormFielsRequest> = (data, evt) => {
    evt?.preventDefault();

    const body: TFormFielsRequest = {
      userName: data.userName,
      advantage: data.advantage,
      disadvantage: data.disadvantage,
      review: data.review,
      cameraId: Number(id),
      rating: ratingStars
    };

    reset();
    setRatingStars(0);
    dispatch(postReviewAction(body));
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <form
        method="post"
        onSubmit={(evt) => void handleSubmit(onSubmit)(evt)}
      >
        <div className="form-review__rate">
          <fieldset className="rate form-review__item">
            <legend className="rate__caption">
                Рейтинг
              <svg width={9} height={9} aria-hidden="true">
                <use xlinkHref="#icon-snowflake" />
              </svg>
            </legend>
            <div className="rate__bar">
              <ProductReviewRating onChange={setRatingStars}/>
              <div className="rate__progress">
                <span className="rate__stars">{ratingStars}</span> <span>/</span>{' '}
                <span className="rate__all-stars">5</span>
              </div>
            </div>
            <p className="rate__message">Нужно оценить товар</p>
          </fieldset>
          <div className={`custom-input form-review__item ${errors.userName ? 'is-invalid' : ''}`}>
            <label>
              <span className="custom-input__label">
                  Ваше имя
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                {...register('userName', {
                  required: 'Нужно указать имя',
                  minLength: 2,
                  maxLength: 15
                })}
                autoFocus
                type = 'text'
                placeholder = 'Введите ваше имя'

              />
            </label>
            <p className="custom-input__error">Нужно указать имя</p>
          </div>
          <div className={`custom-input form-review__item ${errors.advantage ? 'is-invalid' : ''}`}>
            <label>
              <span className="custom-input__label">
                  Достоинства
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                {...register('advantage', {
                  required: 'Нужно указать достоинства',
                  minLength: 10,
                  maxLength: 160
                })}
                type="text"
                placeholder="Основные преимущества товара"

              />
            </label>
            <p className="custom-input__error">Нужно указать достоинства</p>
          </div>
          <div className={`custom-input form-review__item ${errors.disadvantage ? 'is-invalid' : ''}`}>
            <label>
              <span className="custom-input__label">
                  Недостатки
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                {...register('disadvantage', {
                  required: true,
                  minLength: 10,
                  maxLength: 160
                })}
                type="text"
                placeholder="Главные недостатки товара"

              />
            </label>
            <p className="custom-input__error">Нужно указать недостатки</p>
          </div>
          <div className={`custom-textarea form-review__item ${errors.review ? 'is-invalid' : ''}`}>
            <label>
              <span className="custom-textarea__label">
                  Комментарий
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <textarea
                {...register('review', {
                  required: 'Нужно добавить комментарий',
                  minLength: 10,
                  maxLength: 160
                })}
                placeholder="Поделитесь своим опытом покупки"
                defaultValue={''}
              />
            </label>
            <div className="custom-textarea__error">
                Нужно добавить комментарий
            </div>
          </div>
        </div>
        <button className="btn btn--purple form-review__btn" type="submit">
            Отправить отзыв
        </button>
      </form>
    </FormProvider>

  );
}
