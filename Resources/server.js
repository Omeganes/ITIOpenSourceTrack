let xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.a7medhussien.com/api/products');

xhr.onprogress = function() {
    console.log('onprogress Loading...');
};

xhr.onload = function() {
    console.log('onload Loading...');
};


xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        let products = data.data.ProductCollection;
        let cardDeckElement = ``;
        for(let i = 0; i < products.length; i++) {
            product = products[i];
            divElement = 
            `<div id="card" class="col-sm-4">
                <div class="card bg-light mb-3 border-secondary">
                    <img class="card-img-top" src="${product.ProductPicUrl}">
                    <div class="card-body">
                        <h3 class="card-title">${product.Name}</h3>
                        <footer class="blockquote-footer">${product.Category}</footer>
                        <h5 class="card-title">Description:</h5>
                        <small class="text-muted card-text">${product.Description}</small>
                        <div class="card-footer">
                            <h6>Quantity:
                                <small class="text-muted">${product.Quantity}</small>
                            </h6>
                            <h6>Price:
                                <small class="text-muted">${product.Price} ${product.CurrencyCode}</small>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>`;

            cardDeckElement += divElement;
        }
        document.getElementById('products').innerHTML += cardDeckElement;
    }
};

xhr.send();