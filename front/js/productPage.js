function productDetails() {
    var str =  window.location.href;
    console.log(str);
    var url = new URL(str);
    var id = url.searchParams.get("id");
    console.log(id);


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
                newColor[key] = new Option(element,key);
            });

        })
        .catch(function(err) {
            alert('Une erreur est survenue, avez-vous pensez à activer le serveur http://localhost:3000/api/products ?');
            console.error(err);
        });
}
