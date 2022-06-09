type HttpMethod =
  "GET" |
  "POST" |
  "PUT" |
  "DELETE" |
  "PATCH";

export const apiCall = async (
  path: string,
  method: HttpMethod,
  data: any,
  token: string | null,
) => {
  const headers: any = {Accept: 'application/json'};
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  try {
    let body;
    if(data instanceof FormData) {
      console.log('FormData MODE:', method);
      const convertedFormEntries = Array.from(
        data,
        ([key, value]) => (
          [key, typeof value === 'string' ? value : value.name]
        ),
      );
      body = new URLSearchParams(convertedFormEntries);
    }
    else {
      console.log('JSON MODE:', method);
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
      console.log('JSON BODY:', body);
    }
    const response = await fetch("http://localhost:3001" + path, {
      method: method,
      headers: headers,
      body: body,
    });
    const json = await response.json();
    console.log("API RETURNS:", {
      res: response,
      status: response.status,
      data: json,
    });
    return { res: response, status: response.status, data: json };
  } catch (err) {
    console.log("Catching an error!", err);
  }
};
