const products = document.querySelector(".products")


async function getIndex(){
    try {
        const req = await fetch(`http://localhost:3000/api/products/`)
        if (!req.ok){
            throw new Error(`erreur HTTP : statut :${req.status}`)
        }

        const res = await req.json()
        res.forEach(el => {
            const article = 
            `<article>
            <img src="${el.image}" alt="${el.titre}">
            <a href="product.html?id=${el._id}">Buy ${el.shorttitle}</a>
            </article>`
            products.insertAdjacentHTML("beforeend", article)
        });
        
    } catch (error) {
        console.error(`erreur ${error}`)
    }

}

getIndex()