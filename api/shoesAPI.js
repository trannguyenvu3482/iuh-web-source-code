const endpoint = 'https://6421447c34d6cd4ebd6ecd50.mockapi.io/api/v1/shoes';

const getAllShoes = async () => {
  const res = await fetch(endpoint);
  const shoes = await res.json();
  return shoes;
};

const getShoesById = async (id) => {
  const res = await fetch(`${endpoint}/${id}`);
  const shoes = await res.json();
  return shoes;
};

export { getAllShoes, getShoesById };
