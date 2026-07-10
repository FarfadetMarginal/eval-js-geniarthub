sectionconfirmed = document.querySelector('.sectionconfirmed')

// async function getOrder(){
//     try {
//         const req = await fetch(`http://localhost:3000/api/products/order`)
//         if (!req.ok){
//             throw new Error(`erreur HTTP : statut :${req.status}`)
//         }
//         const res = await req.json()
//         sectionconfirmed.innerHTML = `numéro de commande : ${res.orderId}`
        

//     } catch (error) {
//         console.error(`erreur ${error}`)
//     }

// }


// getOrder()


function getOrder2() {
    let order = JSON.parse(localStorage.getItem("order"))
    console.log(order)
    let article = document.createElement('article')
    article.innerHTML = 
        `
            <h2>Commande confirmée !</h2>
            <p>Numéro de commande : ${order.orderId}</p>
            <a onclick="viderls()" href="index.html">Retour à l'accueil</a>
        `
    sectionconfirmed.append(article)
    let panier = JSON.parse(localStorage.getItem("panier"))
    panier = []
    localStorage.setItem("panier", JSON.stringify(panier))

}

getOrder2()

function viderls() {
    order = []
    localStorage.setItem("order", JSON.stringify(order))
}



