import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { GetApiCall } from "../utils/apiCalls";

import { DataContext, Context } from "../utils/context";

import ProductCard from "../components/ProductCard";
import { GET_URL, SET_DETAIL_DATA } from "../assets/constants";

const Detail = () => {
  const { productId } = useParams();
  const { detailData, dispatch } = DataContext(Context);

  useEffect(() => {
    let url = `${GET_URL}${productId}`;
    
    GetApiCall(url, (response) => {
      dispatch({type: SET_DETAIL_DATA, payload: response});
    });

    return () => {
      dispatch({type: SET_DETAIL_DATA, payload: {}})
    }; 
  }, [productId, dispatch]);

  return (
    <>
      <p className="c-detail__breadcrumbs"><Link to="/">Home</Link> / {detailData.brand} - {detailData.model}</p>
      <div className="c-detail__card-wrapper">
        <ProductCard product={detailData} />
      </div>
    </>
  )
};

export default Detail;