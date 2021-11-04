console.log(sessionStorage);

function loadCart() {

    //parcourir le tableau de sessionStorage
    let inCart = JSON.parse(sessionStorage.getItem('inCart'));
    let totalQuantity = 0;
    for (let productCart of inCart) {

        console.log(productCart);

        //récupéré les informations grace à l'id
        fetch("http://localhost:3000/api/products/" + productCart.id)// + sessionStorage.id)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {

        const product = value;

        let newArticle = createArticle(product);        
        let newDivImg = createDivImg(newArticle);
        createImg(product, newDivImg);
        let newDivContent = createDivContent(newArticle);
        let newDivTitlePrice = createDivTitlePrice(newDivContent);        
        createTitleProduct(product, newDivTitlePrice);
        createPriceProduct(product, newDivTitlePrice);        
        let newDivSettings = createDivSettings(newDivContent); 
        let newDivColor = createDivQuantity(newDivSettings); 
        createColor(productCart, newDivColor);    
        let newDivQuantity = createDivQuantity(newDivSettings);        
        createQuantity(newDivQuantity);                
        createInputQuantity(productCart, newDivQuantity);
        let newDivDelete = createDivDelete(newDivSettings);
        createDelete(newDivDelete);

        totalQuantity += Number(productCart.quantity);
        document.getElementById("totalQuantity").innerHTML =  totalQuantity; 
        document.getElementById("totalPrice").innerHTML =  product.price * productCart.quantity; 

        })
        .catch(function(err) {
            alert('Une erreur est survenue, avez-vous pensez à activer le serveur http://localhost:3000/api/products ?');
            console.error(err);
        });
    }
    
}


//Création de l'article
function createArticle(product) {
    let newArticle = document.createElement("article");
    newArticle.className = "cart__item";
    newArticle.dataset.id = product.id;
    document.getElementById("cart__items").appendChild(newArticle);
    return newArticle;
}

//Création de la DivImg
function createDivImg(newArticle) {
    let newDivImg = document.createElement("div");
    newDivImg.className = "cart__item__img";
    newArticle.appendChild(newDivImg);
    return newDivImg;
}

//Création de l'img
function createImg(product, newDivImg) {
    let newImg = document.createElement("img");
    newImg.src = product.imageUrl;
    newImg.alt = product.altTxt;
    newDivImg.appendChild(newImg);
}

//Création de la divContent
function createDivContent(newArticle) {
    let newDivContent = document.createElement("div");
    newDivContent.className = "cart__item__content";
    newArticle.appendChild(newDivContent);
    return newDivContent;
}

//Création de la divTitlePrice
function createDivTitlePrice(newDivContent) {
    let newDivTitlePrice = document.createElement("div");
    newDivTitlePrice.className = "cart__item__content__titlePrice";
    newDivContent.appendChild(newDivTitlePrice);
    return newDivTitlePrice;
}

//Création affichage du titre produit
function createTitleProduct(product, newDivTitlePrice) {
    let newTitle = document.createElement("h2");
    newTitle.innerHTML = product.name;
    newDivTitlePrice.appendChild(newTitle);
}

//Création affichage du prix
function createPriceProduct(product, newDivTitlePrice) {
    let newPrice = document.createElement("p");
    newPrice.innerHTML = product.price + " €";
    newDivTitlePrice.appendChild(newPrice);
}

//Création divSettings
function createDivSettings(newDivContent) {
    let newDivSettings = document.createElement("div");
    newDivSettings.className = "cart__item__content__settings";
    newDivContent.appendChild(newDivSettings);
    return newDivSettings;
}

//Création divColor
function createDivColor(newDivSettings) {
    let newDivColor = document.createElement("div");
    newDivColor.className = "cart__item__content__settings__color";
    newDivSettings.appendChild(newDivColor);
    return newDivColor;
}

//Création affichage Couleur
function createColor(productCart, newDivColor) {
    let newColor = document.createElement("p");
    newColor.innerHTML = "Couleur : " + productCart.color;
    newDivColor.appendChild(newColor);
}

//Création divQuantity
function createDivQuantity(newDivSettings) {
    let newDivQuantity = document.createElement("div");
    newDivQuantity.className = "cart__item__content__settings__quantity";
    newDivSettings.appendChild(newDivQuantity);
    return newDivQuantity;
}

//Création affichage quantité
function createQuantity(newDivQuantity) {
    let newQuantity = document.createElement("p");
    newQuantity.innerHTML = "Qté :";
    newDivQuantity.appendChild(newQuantity);
}

//Création inputQuantity
function createInputQuantity(productCart, newDivQuantity) {
    let newInputQuantity = document.createElement("input");
    newInputQuantity.setAttribute("type", "number");
    newInputQuantity.setAttribute("class", "itemQuantity");
    newInputQuantity.setAttribute("name", "itemQuantity");
    newInputQuantity.setAttribute("min", "1");
    newInputQuantity.setAttribute("max", "100");
    newInputQuantity.setAttribute("value", productCart.quantity);
    newDivQuantity.appendChild(newInputQuantity);
}

//Création divDelete
function createDivDelete(newDivSettings) {
    let newDivDelete = document.createElement("div");
    newDivDelete.className = "cart__item__content__settings__delete";
    newDivSettings.appendChild(newDivDelete);
    return newDivDelete;
}

//Création P Delete
function createDelete(newDivDelete) {
    let newDelete = document.createElement("p");
    newDelete.className = "deleteItem";
    newDelete.innerHTML = "Supprimer";
    newDivDelete.appendChild(newDelete);
}
