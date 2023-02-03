console.log("Test af konsol");

const id = 1163;
const url = `https://kea-alt-del.dk/t7/api/products/${id}`;
// const url = 'https://kea-alt-del.dk/t7/api/products/1163';

console.log(id);
console.log(url);

async function getProduct(url) {
    const resultat = await fetch(url);
    const produkt = await resultat.json();

    vis(produkt);
}

function vis(produkt) {
    const beholder = document.querySelector("#single_product");
    const skabelon = document.querySelector("#min_skabelon");
    const klon = skabelon.cloneNode(true).content;

    klon.querySelector("h2").textContent = produkt.productdisplayname;
    klon.querySelector(".price").textContent = produkt.price + ",-" + "DKK";
    klon.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${id}.webp`;
    klon.querySelector("img").alt = produkt.productdisplayname;
    klon.querySelector(".material").innerHTML = produkt.materialcaredesc;
    klon.querySelector(".color").textContent = produkt.basecolour;
    klon.querySelector(".inv_nr").textContent = produkt.id;

    klon.querySelector(".discounted .rabat").textContent = produkt.discount + "%";
    klon.querySelector(".discounted .ny_pris").textContent = "Now" + Math.floor(produkt.price*(1-(produkt.discount/100))) + ",-" + "DKK";

    beholder.appendChild(klon);
}

getProduct(url);

