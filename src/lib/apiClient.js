export const apiHelper = async (endPoint, method, inputData, customHeaders = {}, customConfig = {}) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: method ?? "GET",
    headers: myHeaders,
    body: inputData ? JSON.stringify(inputData) : undefined,
    redirect: "follow",
    credentials: "include"
  };
  try {
    debugger;
    return await fetch(endPoint, requestOptions).then(async response => {
      if (response.status === 401) {
        debugger;
        window.location.href = `/`;
        return Promise.reject({ message: 'Please re-authenticate.' })
      }
      const data = await response.json();
      return data;
      // if (response.ok) {
      //   return data;
      // } else {
      //   return Promise.reject(data);
      // }
    });
  }
  catch (e) {
    //  window.location.href = `/`;
  }

}