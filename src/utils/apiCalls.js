function GetApiCall(url, success) {
  fetch(url, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((responseJson) => {
          success(responseJson);
        });
      } else {
        console.log("Respuesta de red OK pero respuesta HTTP no OK");
      }
    })
    .catch(function (error) {
      console.log("Hubo un problema con la petición Fetch:" + error.message);
    });
};

function CartPostApiCall(url, payload, success) {
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      id: payload.id,
      colorCode: payload.colorCode,
      storageCode: payload.storageCode,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((responseJson) => {
          success(responseJson);
        });
      } else {
        console.log("Respuesta de red OK pero respuesta HTTP no OK");
      }
    })
    .catch(function (error) {
      console.log("Hubo un problema con la petición Fetch:" + error.message);
    });
};

  
export {
  GetApiCall,
  CartPostApiCall,
};