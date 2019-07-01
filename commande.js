window.onload = function () {

    class Livre {
        constructor(titre, ref, prix) {
            this._titre = titre;
            this._ref = ref;
            this._prix = prix;
        }
        get titre() {
            return this._titre;
        }
        get ref() {
            return this._ref;
        }
        get prix() {
            return this._prix;
        }
    }

    let listeLivre = []; //création du tableau des Livres puis du menu déroulant correspondant
    listeLivre[0] = new Livre("Le hobbit", "001", 15);
    listeLivre[1] = new Livre("Martine à la plage", "002", 8);
    listeLivre[2] = new Livre("La cuisine pour les nuls", "003", 25);
    listeLivre[3] = new Livre("Le poulpe", "004", 21);
    listeLivre[4] = new Livre("Ajax, héros grec, javascript ou lessive ?", "005", 30);
    for (const Livre of listeLivre) {
        let nouveauTitre = document.createElement("option");
        nouveauTitre.textContent = Livre.titre;
        document.getElementsByClassName("liste")[0].appendChild(nouveauTitre);
    }

    //création de la première ligne qui sert de modèle pour les suivantes
    let lignes = document.getElementsByClassName("ligne");
    let choixLivre = document.getElementsByClassName("liste")[0];
    let refLivre = document.getElementsByClassName("ref")[0];
    let quantLivre = document.getElementsByClassName("quant")[0];
    let prixLivre = document.getElementsByClassName("prix")[0];
    let prixTot = document.getElementsByClassName("prixtotal")[0];
    let total = document.getElementById("total");
    let premierBouton = document.getElementsByClassName("supprligne")[0];
    premierBouton.style.visibility = "hidden"; //on ne peut pas supprimer la première ligne sinon on aurait une erreur en essayant de rajouter une ligne
    refLivre.textContent = "000";
    prixLivre.textContent = "0";
    prixTot.textContent = 0;
    quantLivre.value = 1;
    choixLivre.addEventListener("change", ajoutReference);
    quantLivre.addEventListener("input", calculTotal);

    //met à jour les champs quand l'utilisateur choisit un Livre
    function ajoutReference() {
        let titreChoisi = listeLivre[this.selectedIndex - 1];
        let ligne = this.parentElement.parentElement;
        let refLivre = ligne.getElementsByClassName("ref")[0];
        let prixLivre = ligne.getElementsByClassName("prix")[0];
        let prixTot = ligne.getElementsByClassName("prixtotal")[0];
        if (this.selectedIndex === 0) {
            refLivre.textContent = "000";
            prixLivre.textContent = "0";
            quantLivre.value = 1;
            prixTot.textContent = 0;
        } else {
            refLivre.textContent = titreChoisi.ref;
            prixLivre.textContent = titreChoisi.prix;
            prixTot.textContent = prixLivre.textContent;
        }
        sommeLignes();
        cacheLivre();
    }

    //met à jour les prix sur la ligne quand l'utilisateur choisit une quantité
    function calculTotal() {
        let ligne = this.parentElement.parentElement;
        let prixLivre = ligne.getElementsByClassName("prix")[0];
        let prixTot = ligne.getElementsByClassName("prixtotal")[0];
        let quantLivre = ligne.getElementsByClassName("quant")[0];
        prixTot.textContent = prixLivre.textContent * quantLivre.value;
        sommeLignes();
    }

    //met à jour le total
    function sommeLignes() {
        let nbTotal = 0;
        for (ligne of document.getElementsByClassName("ligne")) {
            let prixTot = ligne.getElementsByClassName("prixtotal")[0];
            nbTotal += Number(prixTot.textContent);
        }
        total.textContent = nbTotal;
    }

    let boutonAjout = document.getElementById("ajouteligne");
    boutonAjout.addEventListener("click", ajouteLigne);

    //ajoute une ligne en dernier
    function ajouteLigne() {
        let nouvelleLigne = lignes[0].cloneNode(true);
        let numeroLigne = lignes.length;
        let choixLivre = nouvelleLigne.getElementsByClassName("liste")[0];
        let refLivre = nouvelleLigne.getElementsByClassName("ref")[0];
        refLivre.textContent = "000";
        let quantLivre = nouvelleLigne.getElementsByClassName("quant")[0];
        quantLivre.value = 1;
        let nouveauBouton = nouvelleLigne.getElementsByClassName("supprligne")[0];
        let prixLivre = nouvelleLigne.getElementsByClassName("prix")[0];
        prixLivre.textContent = "0";
        let prixTot = nouvelleLigne.getElementsByClassName("prixtotal")[0];
        prixTot.textContent = 0;
        document.querySelector("tbody").appendChild(nouvelleLigne);
        quantLivre.addEventListener("input", calculTotal);
        nouveauBouton.addEventListener("click", supprimeLigne);
        choixLivre.addEventListener("change", ajoutReference);
        premierBouton.addEventListener("click", supprimeLigne);
        let boutons = document.getElementsByClassName("supprligne") //rend visibles les boutons de suppression de ligne
        for (const element of boutons) {
            element.style.visibility = "visible";
        }
        cacheLivre();
    }

    //supprime une ligne
    function supprimeLigne(event) {
        let ligne = this.parentElement.parentElement;
        ligne.parentNode.removeChild(ligne);
        sommeLignes();
        if (lignes.length == 1) { //rend invisible le bouton de suppression de ligne si c'est la dernière
            let dernierBouton = lignes[0].getElementsByClassName("supprligne")[0];
            dernierBouton.style.visibility = "hidden";
        }
        cacheLivre();
    }

    //cache un Livre déjà choisi dans les menus déroulants des autres lignes
    function cacheLivre() {
        let listeTitresChoisis = [];
        for (i = 0; i < lignes.length; i++) { //on met dans un tableau tous les Livres sélectionnés
            let listeMenu = lignes[i].getElementsByTagName("select");
            let titreChoisi = listeMenu[0].value;
            if (titreChoisi != "entete") {
                listeTitresChoisis.push(titreChoisi);
            }
        }

        for (i = 0; i < lignes.length; i++) {
            let listeMenu = document.getElementsByClassName("liste")[i];
            let listeOptions = listeMenu.children;
            for (j = 0; j < listeOptions.length; j++) {
                if (listeTitresChoisis.includes(listeOptions[j].value) && !listeOptions[j].value.includes(listeMenu[0].value)) {
                    listeOptions[j].style.display = "none";
                } else {
                    listeOptions[j].style.display = "";
                }
            }
        }
    }









}
