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
        let cardDeckElement = document.getElementById('products');
        for(let i = 0; i < products.length; i++) {
            product = products[i];
            
            /* Card Layout

            <div id="card" class="col-sm-4">
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
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalScrollable">
                        Feedback
                        </button>
                    </div>
                </div>
            </div>
            */
            let cardDiv = document.createElement('div');
            cardDiv.id = 'card';
            cardDiv.className = 'col-sm-4';
            let cardElement = document.createElement('div');
            cardElement.className = 'card bg-light mb-3 border-secondary';
            let imgElement = document.createElement('img');
            imgElement.className = 'card-img-top';
            imgElement.src = product.ProductPicUrl;
            let cardBodyElement = document.createElement('div');
            cardBodyElement.className = 'card-body';
            let cardTitleElement = document.createElement('h3');
            cardTitleElement.className = 'card-title';
            cardTitleElement.innerHTML = product.Name;
            let footerElement = document.createElement('footer');
            footerElement.className = 'blockquote-footer';
            footerElement.innerHTML = product.Category;
            let h5El = document.createElement('h5');
            h5El.className = 'card-title';
            h5El.innerHTML = 'Description';
            let smallEl = document.createElement('small');
            smallEl.className = 'text-muted card-text';
            smallEl.innerHTML = product.Description;
            let cardFooterEl = document.createElement('div');
            cardFooterEl.className = 'card-footer';
            let quantityText = document.createElement('h6');
            quantityText.innerHTML = 'Quantity: ';
            let smallEl2 = document.createElement('small');
            smallEl2.className = 'text-muted';
            smallEl2.innerHTML = product.Quantity;
            quantityText.appendChild(smallEl2);
            let priceText = document.createElement('h6');
            priceText.innerHTML = 'Price: ';
            let smallEl3 = document.createElement('small');
            smallEl3.className = 'text-muted';
            smallEl3.innerHTML = product.Price + ' ' + product.CurrencyCode;
            let rateBtn = document.createElement('button');
            rateBtn.type = 'button';
            rateBtn.className = 'btn btn-primary';
            rateBtn.setAttribute('data-toggle', 'modal');
            rateBtn.setAttribute('data-target',"#modal");
            rateBtn.innerHTML = "Feedback";
            priceText.appendChild(smallEl3);
            cardFooterEl.appendChild(quantityText);
            cardFooterEl.appendChild(priceText);
            cardBodyElement.appendChild(cardTitleElement);
            cardBodyElement.appendChild(footerElement);
            cardBodyElement.appendChild(h5El);
            cardBodyElement.appendChild(smallEl);
            cardBodyElement.appendChild(cardFooterEl);
            cardBodyElement.appendChild(rateBtn);
            cardElement.appendChild(imgElement);
            cardElement.appendChild(cardBodyElement);
            cardDiv.appendChild(cardElement);

            cardDeckElement.appendChild(cardDiv);
        }    
        
    }
};
xhr.send();


let form = document.forms.feedback;
form.addEventListener('submit', function(){
    event.preventDefault();
    const formData = {
        "rate": form.rate.value,
        "message": form.message.value
    };
    let formxhr = new XMLHttpRequest();
    formxhr.open("POST", 'https://api.a7medhussien.com/api/feedback');
    formxhr.setRequestHeader("Content-Type", "application/json");
    formxhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 422){
            let json = JSON.parse(formxhr.responseText);
            document.getElementById('feedback-alert').innerHTML = json.errors.message;
        }
        else if(this.readyState == 4 && this.status == 200){
            document.getElementById('feedback-alert').innerHTML = "Thanks for sending us your feedback!";
        }
    };
    formxhr.send(JSON.stringify(formData));
    console.log(formxhr);
});