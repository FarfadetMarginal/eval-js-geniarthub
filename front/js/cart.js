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
    let id = 0
    panier.forEach(el => {
        let article = document.createElement('article')
        let idart = id
        article.innerHTML = 
        `
                <img src="${el.image}" alt="${el.title}">
                <p>${el.title}</p>
                <p>format : ${el.format}</p>
                <p>prix unitaire : ${el.prix} €</p>
                <input type="number" name="quantity" class="quantity" placeholder="1" value="${el.quantite}" min="1">
                <a class="del" onclick="delCom('${el.liendel}')" href="#">supprimer du panier</a>
            `
        sectionpanier.append(article)
        prixtotal += (el.prix * el.quantite)
        
        console.log(idart)

        const quantity = article.querySelector(".quantity")
        
        function calcul2(x){
            prixtotal = 0
            panier.forEach(x => {
                prixtotal += (x.prix * x.quantite) 
                let showprice = document.querySelector("#showprice")
                showprice.textContent = "Prix total : " + prixtotal + "€"
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
    });
    sectionpanier.insertAdjacentHTML("beforeend", `<p id="showprice">Prix total : ${prixtotal} €</p>`)
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
    let panier = JSON.parse(localStorage.getItem("panier"))
    panier.forEach(el => {
        tableauId.push(el.liendel)
    });

    console.log(tableauId)


    //récupérer le contenu du input
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
}
    if(prenom.value.length <2 || nom.value.length <2 || adresse.value.length <10 || ville.value.length <2 || isValidEmail(email.value) == false ){
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
        
        console.log(await datas.json())
    }
})


