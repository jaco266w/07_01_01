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
    const singleProduct = document.querySelector("#single_product");

    singleProduct.querySelector("h2").textContent = produkt.productdisplayname;
    singleProduct.querySelector(".price").textContent = "DKK" + produkt.price + ",-";
    singleProduct.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${id}.webp`;
    singleProduct.querySelector("img").alt = produkt.productdisplayname;
    singleProduct.querySelector(".material").innerHTML = produkt.materialcaredesc;
    singleProduct.querySelector(".color").textContent = produkt.basecolour;
    singleProduct.querySelector(".inv_nr").textContent = produkt.id;


    if(produkt.soldout) {
        document.querySelector("article").classList.add("soldout");
    }
    if(produkt.discount) {
        singleProduct.classList.add("onsale");

        singleProduct.querySelector(".discounted .rabat").textContent = produkt.discount + "%";
        singleProduct.querySelector(".discounted .ny_pris").textContent = "Now" + Math.floor(produkt.price*(1-(produkt.discount/100))) + ",-" + "DKK";
    }
    
}

getProduct(url);

