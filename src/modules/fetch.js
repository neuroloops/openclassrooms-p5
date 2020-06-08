const urlServer = 'https://orinoco-p5.herokuapp.com/api/cameras/';
export default (dataOperation) => {
  (async () => {
    try {
      const response = await fetch(urlServer);
      if (response.ok) {
        const json = await response.json();
        return dataOperation(json);
      }
      {
        const error = `HTTP-Error: ${response.status}`;
        // test si le backend répond bien à la requête
        return console.error(error);
      }
    } catch (error) {
      // test si l'adresse du serveur est ok ou serveur up
      return console.error(error);
    }
  })();
};
