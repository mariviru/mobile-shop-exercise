import { useEffect, useState } from 'react';

import { CartPostApiCall } from '../utils/apiCalls';

import { DataContext, Context } from '../utils/context';

import { CART_POST_URL, COLORS, STORAGES, SET_SHOPPING_CART_QUANTITY } from '../assets/constants';

const ProductCard = (props) => {
  const { product } = props;
  const { id, imgUrl, brand, model, price, cpu, ram, os, battery, displayResolution, primaryCamera, secondaryCmera, dimentions, weight, options } = product;
  const [productSelected, setProductSelected] = useState({
    id,
    colorCode: undefined,
    storageCode: undefined
  });
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const { shoppingCartQuantity, dispatch } = DataContext(Context);
  const url = CART_POST_URL;
  const localCartData = JSON.parse(localStorage.getItem('cart'));

  const buttonSelected = (type, code) => {
    const isColorSelected = productSelected.colorCode === code;
    const isStorageSelected = productSelected.storageCode === code;
    const button = {
      [COLORS]: {
        isSelected: type === COLORS && isColorSelected,
        action: () => isColorSelected ? setProductSelected({ ...productSelected, colorCode: undefined }) : setProductSelected({ ...productSelected, colorCode: code })
      },
      [STORAGES]: {
        isSelected: type === STORAGES && isStorageSelected,
        action: () => isStorageSelected ? setProductSelected({ ...productSelected, storageCode: undefined }) : setProductSelected({ ...productSelected, storageCode: code })
      }
    };

    return button[type];
  };

  useEffect(() => {
    let newProductSelection = { id, colorCode: productSelected.colorCode, storageCode: productSelected.storageCode };

    if (options?.colors.length === 1) newProductSelection = {...newProductSelection, colorCode: options.colors[0].code};
    if (options?.storages.length === 1) newProductSelection = {...newProductSelection, storageCode: options.storages[0].code}

    setProductSelected(newProductSelection);

    return () => {
      setProductSelected({
        id,
        colorCode: undefined,
        storageCode: undefined
      });
    };
  }, [id, options?.colors, options?.storages, productSelected.colorCode, productSelected.storageCode]);

  useEffect(() => {
    if (productSelected.colorCode && productSelected.storageCode) {
      setShowErrorMessage(false);
    }
  }, [productSelected.colorCode, productSelected.storageCode]);

  const renderOptions = (buttons, type) => {
    return (buttons.map((button) => (
      <button key={button.code} className={`c-button c-button__option-button ${buttonSelected(type, button.code).isSelected || buttons.length === 1 ? 'c-button__selected' : ''}`} onClick={() => buttonSelected(type, button.code).action()}>{button.name}</button>
    )));
  };

  const AddToCart = () => {
    if (!productSelected.colorCode || !productSelected.storageCode) {
      setShowErrorMessage(true);
      return;
    }

    CartPostApiCall(url, productSelected, (response) => {
      dispatch({ type: SET_SHOPPING_CART_QUANTITY, payload: shoppingCartQuantity + response.count });

      localStorage.setItem('cart', JSON.stringify((localCartData ? localCartData : shoppingCartQuantity) + response.count));
    });
  };

  return (
    <div className="c-product-card">
      <div className="c-product-card__image-wrapper">
        <img src={imgUrl} alt={`${brand} - ${model}`}/>
      </div>
      <div>
        <h2 className="c-product-card__product-name">{brand} - {model}</h2>
        <p className="c-product-card__price">{price} €</p>
        <p className="c-product-card__title">CPU: <span>{cpu}</span></p>
        <p className="c-product-card__title">RAM: <span>{ram}</span></p>
        <p className="c-product-card__title">Sistema operativo: <span>{os}</span></p>
        <p className="c-product-card__title">Batería: <span>{battery}</span></p>
        <p className="c-product-card__title">Resolución de pantalla: <span>{displayResolution}</span></p>
        <p className="c-product-card__title">Cámara principal: <span>{primaryCamera}</span></p>
        <p className="c-product-card__title">Cámara secundaria: <span>{secondaryCmera}</span></p>
        <p className="c-product-card__title">Dimensiones/Peso: <span>{dimentions} / {weight}</span></p>
        <div>
          <div className="c-product-card__options">
            {options?.colors && renderOptions(options.colors, COLORS)}
          </div>
          <div className="c-product-card__options">
            {options?.storages && renderOptions(options.storages, STORAGES)}
          </div>
          <div className="c-product-card__buy-button">
            <button className="c-button c-button__primary" onClick={() => AddToCart()}>Comprar</button>
          </div>
          {showErrorMessage && <p className="c-product-card__error">* Debes seleccionar un color y un tamaño de almacenamiento para compar el producto.</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
