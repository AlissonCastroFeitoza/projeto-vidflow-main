const containerVideos = document.querySelector('.videos__container');

async function buscarEMostrarVideos() {
    try{
const busca = await fetch('http://localhost:3000/videos')
const videos = await busca.json();
    videos.forEach(video => {
        if(video.categoria == '') {
            throw new Error('Vídeo não tem categoria');
        }
        containerVideos.innerHTML += `
        <li class="videos__item">
            <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
            <div class="descricao-video">
                <img class="img-canal" src="${video.imagem} alt = "Logo do canal">
                <h3 class="titulo-video">${video.titulo}</h3>
                <p class="titulo-canal">${video.descricao}</p>
                <p class='categoria' hidden>${video.categoria}</p>
            </div>
            </li>
        `
    })
}catch(error) {
    containerVideos.innerHTML =`<p> Houve um erro ao carregar os vídeos: ${error}</p>`
}
}
buscarEMostrarVideos();

const barraDePesquisa = document.querySelector(".pesquisar__input");
barraDePesquisa.addEventListener('input', filtrarPesquisa);

function filtrarPesquisa () {
    const videos = document.querySelectorAll('.videos__item');
    let valorFiltro = barraDePesquisa.value.toLowerCase();

    videos.forEach((video) => {
        const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();

        video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
    })
}

const botaoCategoria = document.querySelectorAll('.superior__item');

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute('name');
    botao.addEventListener('click', () => filtrarPorCategoria(nomeCategoria));
})


function filtrarPorCategoria(filtro) {
    const videos = document.querySelectorAll('.videos__item');
    let valorFiltro = filtro.toLowerCase();

    videos.forEach((video) => {
        let categoria = video.querySelector('.categoria').textContent.toLowerCase();

        video.style.display = (!categoria.includes(valorFiltro) && valorFiltro !== 'tudo') ? 'none' : 'block'
    })
}

document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.getElementsByClassName('cabecalho__switch-input')[0];
    var cabecalho = document.getElementsByClassName('cabecalho__container')[0];
    var categorias = document.getElementsByClassName('superior__secao__container')[0];
    var menu = document.getElementsByClassName('menu__lista')[0];
    var microfone = document.getElementsByClassName('cabecalho__audio')[0];
    checkbox.addEventListener('change', function () {
        document.body.style.backgroundColor = checkbox.checked ? 'black' : '';
        cabecalho.style.backgroundColor = checkbox.checked ? 'black' : '';
        categorias.style.backgroundColor = checkbox.checked ? 'black' : '';
        menu.style.backgroundColor = checkbox.checked ? 'black' : '';
        microfone.style.backgroundColor = checkbox.checked ? 'black' : '';
    });
});
