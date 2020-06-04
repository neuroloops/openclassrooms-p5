import urlServer from './secret/urlServer';

const getProducts = () => {
  console.log('bonjour');
  async function fetchProducts() {
    // const response = await fetch(urlServer);
    // if (response.ok) {
    //   const data = await response.json();
    //   console.log(data);
    // }

    const response2 = await fetch(urlServer);
    if (response2.ok) {
      const json = await response2.json();
      console.log(json);
    } else {
      console.log('HTTP-Error: ' + response2.status);
    }
  }
  fetchProducts();
};

const f1 = (a, b) => {
  return a + b;
};

export { getProducts };
export { f1 as default };
