const form = document.getElementById('formPost');
const postsList = document.getElementById('posts');
const textarea = document.getElementById('textarea');
const fileInput = document.getElementById('fileInput');
const buscarFotoBtn = document.getElementById('botao');
let selectedImage = null;

// Adicionar evento de clique para abrir o seletor de arquivos
buscarFotoBtn.addEventListener('click', function() {
  fileInput.click();
});

// Capturar o arquivo de imagem selecionado
fileInput.addEventListener('change', function() {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      selectedImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  alert('Foto importada!');
});

// Adicionar um evento ao formulário para quando ele for enviado
form.addEventListener('submit', function(event) {
  
  event.preventDefault(); // Impedir o comportamento padrão de recarregar a página

  // Capturar o valor do textarea
  const postContent = textarea.value;

  // Verificar se o textarea não está vazio
  if (postContent.trim() !== '' || selectedImage) {
    // Criar um novo elemento de post
    const newPost = document.createElement('li');
    newPost.classList.add('post');
    
    // Adicionar conteúdo ao novo post
    let postHtml = `
      <div class="infoUserPost">
        <div class="imgUserPost"></div>
        <div class="nameAndHour">
          <strong>Luan Pereira</strong>
          <p>${new Date().toLocaleString()}</p>
        </div>
      </div>
      <p class="postContent">${postContent}</p>
    `;

    // Se houver uma imagem selecionada, exibir a imagem no post
    if (selectedImage) {
      postHtml += `
        <div class="postImageWrapper">
          <img src="${selectedImage}" alt="Imagem do post" class="postImage">
          
        </div>`;
    }

    postHtml += `
      <div class="actionBtnPost">
        <button class="deletePost">Excluir</button>
      </div>
    `;

    newPost.innerHTML = postHtml;

    // Adicionar o novo post à lista de posts
    postsList.prepend(newPost);

    // Limpar o textarea e a imagem selecionada após a publicação
    textarea.value = '';
    selectedImage = null;
    fileInput.value = '';

    // Adicionar funcionalidade de remoção da imagem, edição e exclusão do post
    const removeImageBtn = newPost.querySelector('.removeImageBtn');
    const deleteButton = newPost.querySelector('.deletePost');
    const postImageWrapper = newPost.querySelector('.postImageWrapper');

    // Função para remover a imagem
    if (removeImageBtn) {
      removeImageBtn.addEventListener('click', function() {
        postImageWrapper.remove(); // Remove o wrapper da imagem
        selectedImage = null; // Limpa a imagem selecionada
      });
    }

    // Função para excluir o post
    deleteButton.addEventListener('click', function() {
      if (confirm('Você tem certeza que deseja excluir esta publicação?')) {
        newPost.remove();
      }
    });
  } else {
    alert('Por favor, escreva algo ou selecione uma imagem antes de publicar!');
  }
});
