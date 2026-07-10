sectionconfirmed = document.querySelector('.sectionconfirmed')

async function getOrder(){
    try {
        const req = await fetch(`http://localhost:3000/api/products/order`)
        if (!req.ok){
            throw new Error(`erreur HTTP : statut :${req.status}`)
        }
        const res = await req.json()
        sectionconfirmed.innerHTML = `numéro de commande : ${res.orderId}`
        

    } catch (error) {
        console.error(`erreur ${error}`)
    }

}


getOrder()




