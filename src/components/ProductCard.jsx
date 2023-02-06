import { DataContext, Context } from '../utils/context';
import { COLORS, STORAGES, SET_SELECTED_PRODUCT } from '../assets/constants';

const ProductCard = (props) => {
  const { product, actionButton, error } = props;
  const { imgUrl, brand, model, price, cpu, ram, os, battery, displayResolution, primaryCamera, secondaryCmera, dimentions, weight, options } = product;
  const { selectedProduct, dispatch } = DataContext(Context);

  const buttonSelected = (type, code) => {
    const isColorSelected = selectedProduct.colorCode === code;
    const isStorageSelected = selectedProduct.storageCode === code;
    const button = {
      [COLORS]: {
        isSelected: type === COLORS && isColorSelected,
        action: () => isColorSelected ? dispatch({type: SET_SELECTED_PRODUCT, payload: { ...selectedProduct, colorCode: undefined }}) : dispatch({type: SET_SELECTED_PRODUCT, payload: { ...selectedProduct, colorCode: code }})
      },
      [STORAGES]: {
        isSelected: type === STORAGES && isStorageSelected,
        action: () => isStorageSelected ? dispatch({type: SET_SELECTED_PRODUCT, payload: { ...selectedProduct, storageCode: undefined }}) : dispatch({type: SET_SELECTED_PRODUCT, payload: { ...selectedProduct, storageCode: code }})
      }
    };

    return button[type];
  };

  const renderOptions = (buttons, type) => {
    return (buttons.map((button) => (
      <button key={button.code} className={`c-button c-button__option-button ${buttonSelected(type, button.code).isSelected || buttons.length === 1 ? 'c-button__selected' : ''}`} onClick={() => buttonSelected(type, button.code).action()}>{button.name}</button>
    )));
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
            <button className="c-button c-button__primary" onClick={() => actionButton()}>Comprar</button>
          </div>
          {error && <p className="c-product-card__error">* Debes seleccionar un color y un tamaño de almacenamiento para compar el producto.</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
