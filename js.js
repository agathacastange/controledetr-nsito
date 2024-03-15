const axios = require('axios');
async function fetchDataFromAPI() {
  try {
    const response = await axios.get('https://niloweb.com.br/transit-room/api/reg_endpoint.php');
     const jsonData = response.data;
       console.log(jsonData);
  } catch (error) {
        console.error('Erro ao acessar a API:', error.message);
  }
}

fetchDataFromAPI();