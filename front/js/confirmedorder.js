sectionconfirmed = document.querySelector('.sectionconfirmed')


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



