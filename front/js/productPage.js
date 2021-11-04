var str =  window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");


function productDetails() {

    //Récupère l'ensemble des produits
    fetch("http://localhost:3000/api/products/" + id)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {

            console.log(value);
            const product = value;

            let newImg = document.createElement("img");
            newImg.src = product.imageUrl;
            newImg.alt = product.altTxt;
            document.getElementsByClassName('item__img')[0].appendChild(newImg);

            let newName = document.getElementById("title");
            newName.innerText = product.name;

            let newPrice = document.getElementById("price");
            newPrice.innerText = product.price;

            let newDescription = document.getElementById("description");
            newDescription.innerText = product.description;


            var newColor = document.getElementById("colors");
            product.colors.forEach( function(element, key) {
                newColor[key] = new Option(element,element);
            });


        })
        .catch(function(err) {
            alert('Une erreur est survenue, avez-vous pensez à activer le serveur http://localhost:3000/api/products ?');
            console.error(err);
        });
}

function addToCart() {

    let colorProduct = document.getElementById("colors").value;
    let quantityProduct = document.getElementById("quantity").value;

    //Création objetJson
    let productCart = {
        id : id,
        quantity : quantityProduct,
        color : colorProduct
    }

    //vérifie si le panier est vide
    if (sessionStorage.length == 0) {
        sessionStorage.setItem('inCart', '[]');
    }

    //JSON.parse() Reforme l’objet à partir de la chaîne linéarisée 
    let inCart = JSON.parse(sessionStorage.getItem('inCart'));
    let isPresent;

    if(inCart){

        //parcours le panier 
        inCart.forEach(element => {
            //Vérifie si ID et couleur sont identique
            if (element.id === id && JSON.stringify(element.color) === JSON.stringify(colorProduct)) {
                isPresent = inCart.indexOf(element);
            }
        });

        if (isPresent != undefined) {
            //Addition des quantité
            inCart[isPresent].quantity = Number(inCart[isPresent].quantity) + Number(quantityProduct);
        } else {
            inCart.push(productCart);
        };

    } else {

        inCart = [];
        inCart.push(productCart);      
    }

    sessionStorage.setItem('inCart', JSON.stringify(inCart));
    console.log(sessionStorage);
}
