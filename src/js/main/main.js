// Fetch default
window.onload = (event) => {
    // URL DA API
    const url = `http://makeup-api.herokuapp.com/api/v1/products.json?rating_greater_than=4.9`;

    // METODO API
    const fetchData = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
    // CONSULTANDO A API VIA FETCH
    fetch(url, fetchData)
        // PROMISE DA API 
        .then((response) => {
            response.json()
                .then(data => showData(data))
        })
        // TRATANDO ERRO
        .catch(e => console.log('Erro: ' + e, message))
};


// Fetch nome
var nameProduct = document.getElementById("name");

nameProduct.onchange = (event) => {

    // Removendo lista de produto atual
    removeItens();

    // Pegando nome do produto no input
    nameProductValue = nameProduct.value;
    console.log(nameProductValue)
    
    // URL DA API
    const url = `http://makeup-api.herokuapp.com/api/v1/products.json?name=` + nameProductValue;

    // METODO API
    const fetchData = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
    // CONSULTANDO A API VIA FETCH
    fetch(url, fetchData)
        // PROMISE DA API 
        .then((response) => {
            response.json()
                .then(data => showData(data))
        })
        // TRATANDO ERRO
        .catch(e => console.log('Erro: ' + e, message))
};


// Fetch filtro marcas
var selectBrands = document.getElementById("brands");

selectBrands.onchange = (event) => {

    // Removendo lista de produto atual
    removeItens();

    // Pegando valor do select
    var valueSelect = selectBrands.options[selectBrands.selectedIndex].value;
    console.log('[MARCA - SELECT VALUE] -> ' + valueSelect);

    // URL DA API
    const url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=` + valueSelect;

    // METODO API
    const fetchData = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
    // CONSULTANDO A API VIA FETCH
    fetch(url, fetchData)
        // PROMISE DA API 
        .then((response) => {
            response.json()
                .then(data => showData(data))
        })
        // TRATANDO ERRO
        .catch(e => console.log('Erro: ' + e, message))
};


// Fetch filtro TIPO
var selectTypes = document.getElementById("types");

selectTypes.onchange = (event) => {

    // Removendo lista de produto atual
    removeItens();

    // Pegando valor do select
    var valueSelect = selectTypes.options[selectTypes.selectedIndex].value;
    console.log('[TIPO - SELECT VALUE] -> ' + valueSelect);

    // URL DA API
    const url = `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=` + valueSelect;

    // METODO API
    const fetchData = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
    // CONSULTANDO A API VIA FETCH
    fetch(url, fetchData)
        // PROMISE DA API 
        .then((response) => {
            response.json()
                .then(data => showData(data))
        })
        // TRATANDO ERRO
        .catch(e => console.log('Erro: ' + e, message))
};

//FOR PARA MOSTRAR RESULTADOS
const showData = (result) => {

    convertBase = 5.50

    var tamanho = result.length;
    for (i = 0; i < tamanho; i++) {
        document.querySelector('.product__list').innerHTML += `
        <li class="product__item">
            <img class="product__image" src="${result[i].api_featured_image}" alt="${result[i].name}">
            <div class="product__information">
                <h1 class="product__name">${result[i].name}</h1>
                <span class="product__price-brand">
                    <p class="product__brand">${result[i].brand}</p>
                    <p class="product__price">$${(result[i].price * convertBase).toFixed(2)}</p>
                </span>
            </div>

            <ul class="product__data">
                <li class="product__data-item">Brand <p>${result[i].brand}</p></li>
                <li class="product__data-item">Price <p>$${(result[i].price * convertBase).toFixed(2)}</p></li>
                <li class="product__data-item">Rating <p>${result[i].rating}</p></li>
                <li class="product__data-item">Category <p>${result[i].category}</p></li>
                <li class="product__data-item">Product Type <p>${result[i].product_type}</p></li>
            </ul>
        </li>
        `
    }
}

// function removendo itens da lista
function removeItens() {
    var productItemList = document.getElementsByClassName("product__item");
    for (var i = productItemList.length - 1; i >= 0; i--) {
        productItemList[i].remove()
    }
}