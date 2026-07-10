const detailoeuvre = document.querySelector(".detailoeuvre")
const url = window.location.href
const url3 = new URL(window.location.href)
const id = url3.searchParams.get("id")
console.log(url)
const idurl = url.slice(-8)
console.log(idurl)
const idurl2 = url.search("id=")
console.log(url.substring(idurl2+3, idurl2+11))
console.log(id)


async function getProduct(x){
    try {
        const req = await fetch(`http://localhost:3000/api/products/${x}`)
        if (!req.ok){
            throw new Error(`erreur HTTP : statut :${req.status}`)
        }

        const res = await req.json()
        let optionsprix
        res.declinaisons.forEach((el, x)=> {
            optionsprix +=  `<option value="${x}">${el.taille} - ${el.prix}€</option>`
        });
        detailoeuvre.innerHTML = 
        `<article>
            <figure>
                <img src="${res.image}" alt="${res.titre}">
            </figure>
            <div>
                <h1>${res.titre}</h1>
                <p>${res.description.substring(0,244)}</p>
                <div class="price">
                    <p>Acheter pour</p>
                    <span class="showprice">${res.declinaisons[0].prix}€</span>
                </div>
                <div class="declinaison">
                    <input type="number" name="quantity" id="quantity" placeholder="1" value="1" min="1">
                    <select name="format" id="format">
                    ${optionsprix}
                    </select>
                </div>
                <a class="button-buy" href="#">Buy ${res.shorttitle}</a>
            </div>
        </article>

        <aside>
            <h2>Description de l’oeuvre :  ${res.titre}</h2>
        </aside>`


        const showprice = document.querySelector(".showprice")
        const quantity = document.querySelector("#quantity")
        const format = document.querySelector("#format")
        const buttonbuy = document.querySelector(".button-buy")

        function updatePrix(){
            let bonprix = res.declinaisons[format.value].prix * quantity.value 
            showprice.textContent = bonprix + "€"
        }
        format.addEventListener('change',()=>{
            updatePrix()
        })
        quantity.addEventListener('change',()=>{
            updatePrix()
        })

        buttonbuy.addEventListener('click',()=>{
            let neworder = {
                image : res.image,
                title : res.titre,
                format : res.declinaisons[format.value].taille,
                prix : res.declinaisons[format.value].prix,
                quantite : quantity.value, 
                liendel : res._id
            }
            let panier = JSON.parse(localStorage.getItem("panier")) || []
            panier.push(neworder)
            console.log(panier)
            localStorage.setItem("panier", JSON.stringify(panier))
        })

    } catch (error) {
        console.error(`erreur ${error}`)
    }

}


getProduct(id)
