
function loadProducts() {
    //Récupère l'ensemble des produits
    fetch("http://localhost:3000/api/products")
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            console.log(value);
            const products = value;

            //Parcours la liste des produits
            for (let product of products) {
                
                let newLink = createLink(product);                
                let newArticle = createArticle(newLink);                
                createImg(product, newArticle);
                createName(product, newArticle);                
                createDescription(product, newArticle);

            }
        })
        .catch(function(err) {
            alert('Une erreur est survenue, avez-vous pensez à activer le serveur http://localhost:3000/api/products ?');
            console.error(err);
        });
}

//création des liens produits 
function createLink(product) {
    let newLink = document.createElement("a");
    newLink.href = "./product.html?id=" + product._id;
    document.getElementById("items").appendChild(newLink);
    return newLink;
}
//création de l'article
function createArticle(newLink) {
    let newArticle = document.createElement("article");
    newLink.appendChild(newArticle);
    return newArticle;
}
//création de l'image
function createImg(product, newArticle) {
    let newImg = document.createElement("img");
    newImg.src = product.imageUrl;
    newImg.alt = product.altTxt;
    newArticle.appendChild(newImg);
}
//création d'affichage des noms
function createName(product, newArticle) {
    let newName = document.createElement("h3");
    newName.innerText = product.name;
    newArticle.appendChild(newName);
}
//Création de la description
function createDescription(product, newArticle) {
    let newDescription = document.createElement("p");
    newDescription.innerText = product.description;
    newArticle.appendChild(newDescription);
}
