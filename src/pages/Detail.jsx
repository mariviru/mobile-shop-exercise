import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { GetApiCall, CartPostApiCall } from "../utils/apiCalls";
import { DataContext, Context } from "../utils/context";
import { GET_URL, CART_POST_URL, SET_DETAIL_DATA, SET_SELECTED_PRODUCT, SET_SHOPPING_CART_QUANTITY } from "../assets/constants";

import ProductCard from "../components/ProductCard";

const Detail = () => {
  const { productId } = useParams();
  const { detailData, selectedProduct, shoppingCartQuantity, dispatch } = DataContext(Context);
  const url = `${GET_URL}${productId}`;
  const cartUrl = CART_POST_URL;
  const localCartData = JSON.parse(localStorage.getItem('cart'));
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    GetApiCall(url, (response) => {
      dispatch({type: SET_DETAIL_DATA, payload: response});
    });

    return () => {
      dispatch({type: SET_DETAIL_DATA, payload: {}})
    }; 
  }, [productId, dispatch, url]);

  useEffect(() => {
    let newProductSelection = { id: productId, colorCode: selectedProduct.colorCode, storageCode: selectedProduct.storageCode };

    if (detailData?.options?.colors.length === 1) newProductSelection = {...newProductSelection, colorCode: detailData?.options?.colors[0].code};
    if (detailData?.options?.storages.length === 1) newProductSelection = {...newProductSelection, storageCode: detailData?.options?.storages[0].code};

    if (selectedProduct.colorCode && selectedProduct.storageCode) {
      setShowErrorMessage(false);
    };

    dispatch({type: SET_SELECTED_PRODUCT, payload: newProductSelection});

    return () => {
      dispatch({
        type: SET_SELECTED_PRODUCT,
        payload: {
          id: productId,
          colorCode: undefined,
          storageCode: undefined
        }
      });
    };
  }, [detailData?.options?.colors, detailData?.options?.storages, dispatch, productId, selectedProduct.colorCode, selectedProduct.storageCode]);
  
  const AddToCart = () => {
    if (!selectedProduct.colorCode || !selectedProduct.storageCode) {
      setShowErrorMessage(true);
      return;
    }

    CartPostApiCall(cartUrl, selectedProduct, (response) => {
      dispatch({ type: SET_SHOPPING_CART_QUANTITY, payload: shoppingCartQuantity + response.count });

      localStorage.setItem('cart', JSON.stringify((localCartData ? localCartData : shoppingCartQuantity) + response.count));
    });
  };

  return (
    <>
      <p className="c-detail__breadcrumbs"><Link to="/">Home</Link> / {detailData.brand} - {detailData.model}</p>
      <div className="c-detail__card-wrapper">
        <ProductCard product={detailData} actionButton={AddToCart} error={showErrorMessage}/>
      </div>
    </>
  )
};

export default Detail;