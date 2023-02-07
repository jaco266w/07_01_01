console.log("Test af konsol");

let cat
const cat1 = "?category="
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
console.log(category);


if (category === "accessories") {
    cat = cat1+category;
}
else if (category === "apparel") {
    cat = cat1+category;
}
else if (category === "footwear") {
    cat = cat1+category;
}
else if (category === "free items") {
    cat = cat1+category;
}
else if (category === "personal care") {
    cat = cat1+category;
}
else if (category === "sporting goods") {
    cat = cat1+category;
}
else {
    cat = "?limit=100";
}

const url = `https://kea-alt-del.dk/t7/api/products${cat}`;


async function getData() {
    console.log(cat);
    console.log(url);
    const resultat = await fetch(url);
    const liste = await resultat.json();

    vis(liste);
}


function vis(liste) {
    console.log(liste);

    const beholder = document.querySelector("#product_list_grid");
    const skabelon = document.querySelector("#liste_skabelon").content;
    document.querySelector("h1").textContent = category;

    liste.forEach(produkt => {
        const klon = skabelon.cloneNode(true);

        klon.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${produkt.id}.webp`;
        klon.querySelector("img").alt = produkt.productdisplayname;
        klon.querySelector("h3").textContent = produkt.productdisplayname;
        klon.querySelector(".price").textContent = produkt.price + ",-" + "DKK";
        klon.querySelector("a").href = `product.html?id=${produkt.id}`;

        
        if(produkt.soldout) {
            klon.querySelector("article").classList.add("soldout");
        }
        if(produkt.discount) {
            klon.querySelector("article").classList.add("onsale");
            
            klon.querySelector(".discounted .rabat").textContent = produkt.discount + "%";
            klon.querySelector(".discounted .ny_pris").textContent = "Now" + Math.floor(produkt.price*(1-(produkt.discount/100))) + ",-" + "DKK";
        }
        
        
        beholder.appendChild(klon);
    });

}

getData();