// Get query string from url
const getQueryString = () => {
  var result = {},
    queryString = location.search.slice(1),
    re = /([^&=]+)=([^&]*)/g,
    m;

  while ((m = re.exec(queryString))) {
    result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  return result;
};

// Get product id from query string
const productId = getQueryString().id;

console.log(productId);

// Fetch product data from API
const getProduct = async () => {
  const response = await fetch(
    `https://6421447c34d6cd4ebd6ecd50.mockapi.io/api/v1/shoes/${productId}`
  );
  const data = await response.json();
  return data;
};

getProduct().then((data) => {
  console.log(data);
});
