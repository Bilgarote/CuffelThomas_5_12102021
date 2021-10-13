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
            let newLink = document.createElement("a");
            newLink.href = "./product.html?id=" + product._id;
            console.log(newLink);
            document.getElementById("items").appendChild(newLink);   

            //création de l'article
            let newArticle = document.createElement("article");
            console.log(newArticle);
            newLink.appendChild(newArticle);

            //création de l'image
            let newImg = document.createElement("img");
            newImg.src = product.imageUrl;
            newImg.alt = product.altTxt;
            console.log(newImg);
            newArticle.appendChild(newImg);

            //création d'affichage des noms
            let newName = document.createElement("h3");
            newName.innerText = product.name;
            console.log(newName);
            newArticle.appendChild(newName);

            //Création de la description
            let newDescription = document.createElement("p");
            newDescription.innerText = product.description;
            console.log(newDescription);
            newArticle.appendChild(newDescription);

        }
    })
    .catch(function(err) {
        alert('Une erreur est survenue, avez-vous pensez à activer le serveur http://localhost:3000/api/products ?');
    });
