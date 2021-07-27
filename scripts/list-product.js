var urlApiListProduct = "https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1";
loadingPage ();

document.getElementById('l-loading').onclick=function(){
    loadingPage ();
};

function addItem (image, name, description, oldPrice, price, installmentsCount, installmentsValue ) {
    document.querySelector('#l-container').insertAdjacentHTML(
      'beforeend',
      `<div class="l-item">
            <img src="https:`+image+`">
            <div class="l-item-info">
                <label>`+name+`</label>
                <span class="l-item-descricao">`+description+`</span>
                <span>De: R$`+oldPrice+`</span>
                <b>Por: R$`+price+`</b>
                <span>ou `+installmentsCount+`x de R$`+installmentsValue+`</span>
                <button>Comprar</button>
            </div>
        </div>`      
    )
}

function loadingPage () {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'JSON';
      xhr.onreadystatechange = function() {
          if ( xhr.readyState == 4 && xhr.status == 200 ) {
            let response = JSON.parse(xhr.response);
            for (var i = 0; i < response.products.length; i++) {
                addItem (response.products[i].image, response.products[i].name, response.products[i].description, response.products[i].oldPrice, response.products[i].price, response.products[i].installments.count, response.products[i].installments.value );
            }

            checkingForNextPage (response.nextPage);
          }
      }
      xhr.open("GET", urlApiListProduct );

      xhr.send();
}

function checkingForNextPage ( nextPage ) {
    if ( nextPage ) {
        urlApiListProduct = "https://"+nextPage;
    } else {
        document.getElementById("l-loading").style.display = 'none';
    }
}