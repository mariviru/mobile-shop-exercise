import { useEffect, useState, useMemo } from "react";

import { GetApiCall } from "../utils/apiCalls";
import { DataContext, Context } from "../utils/context";
import { checkTime } from "../utils/checkTime";
import { GET_URL, SET_INDEX_DATA } from "../assets/constants";

import List from "../components/List";
import SearchBar from "../components/SearchBar";

const Index = () => {
  const { indexData, dispatch } = DataContext(Context);
  const [searchValue, setSearchValue] = useState('');
  const url = GET_URL;
  const localData = useMemo(() => JSON.parse(localStorage.getItem('index')), []);

  checkTime();

  useEffect(() => {
    if (localData) {
      dispatch({type: SET_INDEX_DATA, payload: localData});
    } else {
      GetApiCall(url, (response) => {
        dispatch({type: SET_INDEX_DATA, payload: response});
        localStorage.setItem('index', JSON.stringify(response))
      });
    }
  
  }, [dispatch, localData, url]);

  return (
    <>
      <SearchBar handleInput={(text) => setSearchValue(text)}/>
      <List data={indexData.filter((product) => product.brand.toLowerCase().includes(searchValue) || product.model.toLowerCase().includes(searchValue))} />
    </>
  )
};

export default Index;