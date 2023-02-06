console.log("Test af konsol");

const url = `https://kea-alt-del.dk/t7/api/products?limit=100`;

async function getData(url) {
    const resultat = await fetch(url);
    const liste = await resultat.json();

    vis(liste);
}

function vis(liste) {
    console.log(liste);

    const beholder = document.querySelector("#product_list_grid");
    const skabelon = document.querySelector("#liste_skabelon").content;

    liste.forEach(produkt => {
        const klon = skabelon.cloneNode(true);

        klon.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${produkt.id}.webp`;
        klon.querySelector("img").alt = produkt.productdisplayname;
        klon.querySelector("h3").textContent = produkt.productdisplayname;
        klon.querySelector(".price").textContent = produkt.price + ",-" + "DKK";

        
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

getData(url);