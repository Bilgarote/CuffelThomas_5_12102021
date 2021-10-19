
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

                //création des liens produits 
                let newLink = createLink(product);

                //création de l'article
                let newArticle = createArticle(newLink);

                //création de l'image
                createImg(product, newArticle);

                //création d'affichage des noms
                createName(product, newArticle);

                //Création de la description
                createDescription(product, newArticle);

            }
        })
        .catch(function(err) {
            alert('Une erreur est survenue, avez-vous pensez à activer le serveur http://localhost:3000/api/products ?');
            console.error(err);
        });
}

function createLink(product) {
    let newLink = document.createElement("a");
    newLink.href = "./product.html?id=" + product._id;
    document.getElementById("items").appendChild(newLink);
    return newLink;
}

function createArticle(newLink) {
    let newArticle = document.createElement("article");
    newLink.appendChild(newArticle);
    return newArticle;
}

function createImg(product, newArticle) {
    let newImg = document.createElement("img");
    newImg.src = product.imageUrl;
    newImg.alt = product.altTxt;
    newArticle.appendChild(newImg);
}

function createName(product, newArticle) {
    let newName = document.createElement("h3");
    newName.innerText = product.name;
    newArticle.appendChild(newName);
}

function createDescription(product, newArticle) {
    let newDescription = document.createElement("p");
    newDescription.innerText = product.description;
    newArticle.appendChild(newDescription);
}
