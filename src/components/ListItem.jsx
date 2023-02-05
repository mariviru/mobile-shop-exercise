import { Link } from "react-router-dom";

const ListItem = (props) => {
  const { product } = props;
  const { imgUrl, brand, model, price, id } = product;

  return (
    <li className="c-list-item">
      <Link className="c-list-item__image-wrapper" to={`/detail/${id}`}>
        <img className="c-list-item__image" src={imgUrl} alt={`${brand} - ${model}`}/>
      </Link>
      <div className="c-list-item__info">
        <div>
          <p className="c-list-item__text-big">{brand}</p>
          <p className="c-list-item__text">{model}</p>
        </div>
        <div>
          <p className={`${price === '' ? "c-list-item__price-not-available" : "c-list-item__text-big"}`}>{price === '' ? 'Precio no disponible' : `${price}€`}</p>
        </div>
      </div>
    </li>
  )
};

export default ListItem;