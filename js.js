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
function fetchData() {
    fetch('https://niloweb.com.br/transit-room/api/reg_endpoint.php')
      .then(response => response.json())
      .then(data => {
        const statusElement = document.getElementById('status');
        const currentStatus = statusElement.dataset.status || ''; // Salva o status atual
        const newStatus = data.status;

        // Verifica se houve uma mudança de status
        if (currentStatus !== newStatus) {
          playNotificationSound(); // Reproduz o som de notificação
          statusElement.dataset.status = newStatus; // Atualiza o status atual
          switch (newStatus) {
            case 'A':
              statusElement.innerHTML = '<span class="status-A">Aguardando Liberação e Sem Ninguém Fora de Sala</span>';
              break;
            case 'B':
              statusElement.innerHTML = '<span class="status-B">Bloqueado, Trânsito com Alguém Fora da Sala ou Liberado para Sair</span>';
              break;
            case 'L':
              statusElement.innerHTML = '<span class="status-L">Liberado, Trânsito Livre e Sem Ninguém Fora de Sala</span>';
              break;
            default:
              statusElement.innerHTML = 'Erro ao obter status.';
          }
          // Adiciona a classe de animação
          statusElement.classList.add('status-animation');
          // Remove a classe de animação após 1 segundo
          setTimeout(() => {
            statusElement.classList.remove('status-animation');
          }, 1000);
        }
      })
      .catch(error => {
        console.error('Erro ao obter dados:', error);
        const statusElement = document.getElementById('status');
        statusElement.innerHTML = 'Erro ao carregar dados.';
      });
}

function playNotificationSound() {
    const audio = new Audio('audio.mp3.mp3'); // Cria um novo elemento de áudio
    audio.play(); // Reproduz o som de notificação
}

// Chama a função fetchData a cada minuto
setInterval(fetchData, 60000);

// Chama a função fetchData assim que a página é carregada
document.addEventListener('DOMContentLoaded', fetchData);
