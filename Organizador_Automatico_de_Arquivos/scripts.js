const API_URL = 'http://localhost:3000/upload';

const fileInput = document.getElementById('file-input');
const fileLabel = document.getElementById('file-label');
const organizeButton = document.getElementById('organizar arquivos');
const fileInfo = document.getElementById('file-info');
const areaArquivo = document.getElementById('area-arquivo');
const arquivosAcumulados = new DataTransfer();

  // Adiciona um evento de mudança ao input de arquivos
fileInput.addEventListener('change', (event) => {
    const novosArquivos = event.target.files;
    for (let i = 0; i < novosArquivos.length; i++) {
        arquivosAcumulados.items.add(novosArquivos[i]);
    }

    // Atualiza o input de arquivos com os arquivos acumulados
    fileInput.files = arquivosAcumulados.files;
    
    areaArquivo.innerHTML = ''; 

    if (fileInput.files.length > 0) {
    areaArquivo.style.display = 'flex'; 
    fileInfo.style.display = 'none'; 
    organizeButton.style.display = 'inline-block'; 
    
      // Atualiza a interface com os arquivos selecionados
    Array.from(fileInput.files).forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';

        // 1. Cria o botão de deletar (X)
        const deleteBtn = document.createElement('span');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '✖'; 

        // 2. Ação de clicar no botão X
        deleteBtn.onclick = function() {
        fileItem.remove();

          // Encontra a posição do arquivo na lista e remove do DataTransfer
        const index = Array.from(arquivosAcumulados.files).indexOf(file);
        if (index > -1) {
            arquivosAcumulados.items.remove(index);
            fileInput.files = arquivosAcumulados.files;
        }

          // Se apagar todos os arquivos, volta a tela ao estado original vazio
        if (fileInput.files.length === 0) {
            areaArquivo.style.display = 'none';
            fileInfo.style.display = 'block';
            organizeButton.style.display = 'none';
        }
        };

        // Adiciona um ícone de arquivo
        const fileIcon = document.createElement('div');
        fileIcon.className = 'file-icon';
        fileIcon.innerHTML = '<img src="https://imgs.search.brave.com/cEUYYOd_2loyD7aEw53hKzAK75vP-yYEp1p27MZaUek/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDkv/MzUxLzUxNS9zbWFs/bC90cmFuc2Zlci1m/aWxlLWNvcHktZGF0/YWJhc2UtcG5nLnBu/Zw" alt="Ícone de arquivo" width="24" height="24">';

        // Adiciona o nome do arquivo
        const fileName = document.createElement('span');
        fileName.className = 'file-name';
        fileName.textContent = file.name;
        
        // Anexa os elementos na ordem correta
        fileItem.appendChild(deleteBtn); 
        fileItem.appendChild(fileIcon);
        fileItem.appendChild(fileName);
        areaArquivo.appendChild(fileItem);
    });
    }
});

  // Função atualizada para enviar os arquivos e mostrar um texto de sucesso na tela
async function organizarArquivos() {
    if (fileInput.files.length === 0) {
    alert("Por favor, selecione pelo menos um arquivo.");
    return;
    }

    const formData = new FormData();
    Array.from(fileInput.files).forEach(file => {
    formData.append('arquivos', file);
    });

    organizeButton.textContent = "Organizando...";
    organizeButton.disabled = true;

    try {
    const response = await fetch(API_URL, {
    method: 'POST',
    body: formData
    });

    if (response.ok) {
        const result = await response.json();
        
        // Limpa os arquivos da tela
        arquivosAcumulados.items.clear();
        fileInput.files = arquivosAcumulados.files;
        areaArquivo.innerHTML = '';
        areaArquivo.style.display = 'none';
        
        // Muda o texto do elemento #file-info para avisar que está pronto
        fileInfo.style.display = 'block';
        fileInfo.innerHTML = "Seus arquivos foram organizados com sucesso e já estão salvos na pasta <strong>'uploads'</strong> do projeto!";
        
        // Esconde o botão de organizar após concluir
        organizeButton.style.display = 'none';
    } else {
        alert("Erro ao enviar arquivos. Verifique o servidor.");
    }
    } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Falha na conexão com o servidor. O servidor está rodando?");
    } finally {
    organizeButton.textContent = "Organizar Arquivos";
    organizeButton.disabled = false;
    }
}