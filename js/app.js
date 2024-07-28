const fetchData = fetch("./dados.json");

dataJSON = fetchData.then(response => response.json());

dataJSON.then(dados => console.log(dados))