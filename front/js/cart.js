const sectionpanier = document.querySelector(".sectionpanier")


function delCom(z) {
    let panier = JSON.parse(localStorage.getItem("panier"))
    panier = panier.filter(com => com.liendel !== z) || []
    localStorage.setItem("panier", JSON.stringify(panier))
    getPanier()
}

function getPanier(){
    sectionpanier.textContent = ""
    let panier = JSON.parse(localStorage.getItem("panier"))
    let prixtotal = 0
    let quantitetotal = 0
    let id = 0
    panier.forEach(el => {
        let article = document.createElement('article')
        let idart = id
        let tempprix = ""
        console.log(el.declinaisons)
            el.declinaisons.forEach(element => {
                if (el.format == element.taille){
                    tempprix = element.prix
                    console.log(tempprix)
                }
            });
        article.innerHTML = 
        `
                <img src="${el.image}" alt="${el.title}">
                <p>${el.title}</p>
                <p>format : ${el.format}</p>
                <p>prix unitaire : ${tempprix} €</p>
                <input type="number" name="quantity" class="quantity" placeholder="1" value="${el.quantite}" min="1">
                <a class="del" onclick="delCom('${el.liendel}')" href="#">supprimer du panier</a>
            `
        sectionpanier.append(article)
        prixtotal += (tempprix * el.quantite)
        quantitetotal += parseInt(el.quantite)
        
        const quantity = article.querySelector(".quantity")
        
        function calcul2(x){
            prixtotal = 0
            quantitetotal = 0  
            panier.forEach(x => {
                let tempprix2 = 0
                console.log(x.declinaisons)
                x.declinaisons.forEach(xxx => {
                if (x.format == xxx.taille){
                    tempprix2 = xxx.prix
                    console.log(tempprix2)
                }
            });
                prixtotal += (tempprix2 * x.quantite)
                quantitetotal += parseInt(x.quantite)
                let showprice = document.querySelector("#showprice")
                showprice.textContent = "Prix total : " + prixtotal.toFixed(2) + "€ - Nombre d'article : " + quantitetotal
            });
        }

        function updatePanier(x) {
            let panier = JSON.parse(localStorage.getItem("panier"))
            panier[x].quantite = el.quantite
            localStorage.setItem("panier", JSON.stringify(panier))
        }

        quantity.addEventListener('change',()=>{
            el.quantite = quantity.value
            calcul2(el)
            updatePanier(idart)
        })
        id +=1
        console.log(panier)
    });
    sectionpanier.insertAdjacentHTML("beforeend", `<p id="showprice">Prix total : ${prixtotal.toFixed(2)} € - Nombre d'article : ${quantitetotal}</p>`)
}

getPanier()


let prenom = document.querySelector("#prenom")
let nom = document.querySelector("#nom")
let adresse = document.querySelector("#adresse")
let ville = document.querySelector("#ville")
let email = document.querySelector("#email")
let commander = document.querySelector("#commander")


commander.addEventListener('click', async (e) => {
	e.preventDefault();
	
    let tableauId = []
    let panier = JSON.parse(localStorage.getItem("panier")) || []
    console.log(panier)
    panier.forEach(el => {
        tableauId.push(el.liendel)
    });

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function isValidText(txt){
        const regex2 = /^[a-zA-Z0-9àâäéèêëïîôùûüÿæœçÀÂÄÉÈÊËÏÎÔÙÛÜŸÆŒÇ\s_-]+$/;
        return regex2.test(txt);
    }
    //récupérer le contenu du input
    if(prenom.value.length <2 || nom.value.length <2 || adresse.value.length <10 || ville.value.length <3 || isValidEmail(email.value) == false || isValidText(prenom.value) == false || isValidText(nom.value) == false || isValidText(adresse.value) == false || isValidText(ville.value) == false || tableauId.length == 0){
        alert("champs incorrects")
        prenom.value = "" 
        nom.value = "" 
        adresse.value = "" 
        ville.value = "" 
        email.value = ""

    } else {
        const obj = {         
            contact: { 
                firstName: prenom.value,
                lastName: nom.value,
                address: adresse.value,
                city: ville.value,
                email: email.value },
            products: tableauId
        }
            
        //envoyer le contenu de mon input sur le serveur API méthode post
        const datas = await fetch('http://localhost:3000/api/products/order', {
            method : 'POST',
            body : JSON.stringify(obj),
            headers : {
                'Content-type' : 'application/json',
            }
        })
        
        const res = await datas.json()
        localStorage.setItem("order", JSON.stringify(res))
        window.location = 'confirmedorder.html'
    }
})


