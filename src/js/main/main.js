var productItemList = document.getElementsByClassName("product__item");
var productList = document.querySelector('.product__list')
var productInformatios = document.querySelector('.product__information')

// Fetch default
window.onload = (event) => {
    // URL DA API
    const url = `https://makeup-api.herokuapp.com/api/v1/products.json?rating_greater_than=4.9`;

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

    const convertBase = 5.50

    var tamanho = result.length;
    for (i = 0; i < tamanho; i++) {
        productList.innerHTML += `
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
                <li class="product__data-item product__data-item--brand">Brand <p>${result[i].brand}</p></li>
                <li class="product__data-item product__data-item--price">Price <p>$${(result[i].price * convertBase).toFixed(2)}</p></li>
                <li class="product__data-item product__data-item--rating">Rating    <p>${result[i].rating}</p></li>
                <li class="product__data-item product__data-item--category">Category <p>${result[i].category}</p></li>
                <li class="product__data-item product__data-item--product">Product Type <p>${result[i].product_type}</p></li>
            </ul>
        </li>
        `
    }

    // Verificacao se existe produtos
    if (productItemList.length == 0) {
        productInformatios.innerHTML = 'Nenhum produto encontrado!'
    }else{
        productInformatios.innerHTML = 'Encontramos <strong>'+ productItemList.length +'</strong> produto(s)';
    }
}

// function removendo itens da lista
function removeItens() {
    for (var i = productItemList.length - 1; i >= 0; i--) {
        productItemList[i].remove()
    }
}


// Fetch filtro marcas + type
function fetchFilter() {

    // Removendo lista de produto atual
    removeItens();

    // Selecao da marca no select
    var selectBrands = document.getElementById("brands");
    // Pegando valor do select
    var valueSelectBrands = selectBrands.options[selectBrands.selectedIndex].value;
    console.log('[MARCA - SELECT VALUE] -> ' + valueSelectBrands);

    // Selecao do tipo no select
    var selectTypes = document.getElementById("types");
    // Pegando valor do select
    var valueSelectTypes = selectTypes.options[selectTypes.selectedIndex].value;
    console.log('[TIPO - SELECT VALUE] -> ' + valueSelectTypes);

    if (valueSelectBrands != "" || valueSelectBrands != null) {
        var brand = 'brand=' + valueSelectBrands
    }

    if ((valueSelectTypes != "" || valueSelectTypes != null) && (valueSelectBrands != "" || valueSelectBrands != null)) {
        var type = '&product_type=' + valueSelectTypes
    } else if (valueSelectBrands == "" || valueSelectBrands == null) {
        var type = '?product_type=' + valueSelectTypes
    }

    // URL DA API
    const url = `http://makeup-api.herokuapp.com/api/v1/products.json?` + brand + type;
    console.log('[URL] ' + url)

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

// Realizando filtro por marca
document.getElementById('brands').onchange = (event) => {
    fetchFilter()
}

// Realizando filtro por tipo
document.getElementById('types').onchange = (event) => {
    fetchFilter()
}