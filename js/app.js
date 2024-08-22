let amigosIncluidos = [];
let listaSorteio = document.getElementById('lista-sorteio');

function adicionar() {
    let nomeAmigo = document.getElementById('nome-amigo').value;
    
    // Verifica se o nome contém apenas letras
    if (!isNaN(nomeAmigo) || nomeAmigo.trim() === '') {
        alert('Por favor insira somente nomes sem números e não deixe o campo vazio.');
        limparCampos();
        return;
    }

    if (amigosIncluidos.includes(nomeAmigo)) {
        alert ('Este nome ja foi adicionado!');
        return;
    }
    
    amigosIncluidos.push(nomeAmigo);

    atualizarListaAmigos();
    limparCampos();
}

function atualizarListaAmigos() {
    let listaAmigos = document.getElementById('lista-amigos');
    
    // HTML da lista de amigos com 'x' para remoção
    listaAmigos.innerHTML = amigosIncluidos
        .map((amigo, index) => 
            `<div class="amigo-item">
                ${amigo} 
                <span class="remove" onclick="remover(${index})">&times;</span>
            </div>`
        )
        .join('');
}

function remover(index) {
    // Remove o amigo da lista
    amigosIncluidos.splice(index, 1);
    
    // Atualiza a lista de amigos exibida
    atualizarListaAmigos();
}

function fisherYatesShuffle(array) {
    let indice = array.length;

    while (indice) {
        const indiceAleatorio = Math.floor(Math.random() * indice--);
        [array[indice], array[indiceAleatorio]] = [array[indiceAleatorio], array[indice]];
    }

    return array;
}

function sortear() {
    if (amigosIncluidos.length < 4) {
        alert('É necessário adicionar pelo menos quatro amigos para realizar o sorteio!');
        return;
    }

    let sorteio = fisherYatesShuffle([...amigosIncluidos]);

    let resultado = [];
    for (let i = 0; i < amigosIncluidos.length; i++) {
        let amigo = amigosIncluidos[i];
        let amigoSecreto = sorteio[(i + 1) % amigosIncluidos.length];

        // Verifica se o amigo foi sorteado com ele mesmo
        if (amigo === amigoSecreto) {
            sortear(); // Se sim, refaz o sorteio
            return;
        }

        resultado.push(`${amigo} => ${amigoSecreto}`);
    }

    listaSorteio.innerHTML = `<p>${resultado.join('<br>')}</p>`;
}

function reiniciar() {
    amigosIncluidos = [];
    document.getElementById('lista-amigos').innerHTML = '';
    listaSorteio.innerHTML = '';
    limparCampos();
}

function limparCampos() {
    document.getElementById('nome-amigo').value = '';    
}
