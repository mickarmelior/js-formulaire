//branche
window.onload = function () {

    class livre {
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

    let listeLivre = [];
    listeLivre[0] = new livre("Le hobbit", "001", 15);
    listeLivre[1] = new livre("Martine à la plage", "002", 8);
    listeLivre[2] = new livre("La cuisine pour les nuls", "003", 25);
    listeLivre[3] = new livre("Le poulpe", "004", 21);



    for (const livre of listeLivre) {
        let nouveauTitre = document.createElement("option");
        nouveauTitre.textContent = livre.titre;
        document.getElementsByClassName("liste")[0].appendChild(nouveauTitre);
    }

    let choixLivre = document.getElementsByClassName("liste")[0];
    let refLivre = document.getElementsByClassName("ref")[0];
    let quantLivre = document.getElementsByClassName("quant")[0];
    quantLivre.textContent = "";
    let prixLivre = document.getElementsByClassName("prix")[0];
    let prixTot = document.getElementsByClassName("prixtotal")[0];
    let total = document.getElementById("total");
    choixLivre.addEventListener("change", ajoutReference);
    quantLivre.addEventListener("input", calculTotal);


    function ajoutReference(numeroLigne) {
        let titreChoisi = listeLivre[this.selectedIndex - 1];
        if (this.selectedIndex === 0) {
            refLivre.textContent = "";
            prixLivre.textContent = "";
        } else {
            refLivre.textContent = titreChoisi.ref;
            prixLivre.textContent = titreChoisi.prix;
        }
    }

    function calculTotal() {
        prixTot.textContent = prixLivre.textContent * quantLivre.value;
        total.textContent = prixTot.textContent;
    }

    let boutonAjout = document.getElementById("ajouteligne");
    boutonAjout.addEventListener("click", ajouteLigne);

    function ajouteLigne() {
        let lignes = document.getElementsByClassName("ligne");
        let nouvelleLigne = lignes[0].cloneNode(true);
        let numeroLigne = lignes.length;
        let choixLivre = nouvelleLigne.getElementsByClassName("liste")[0];
        let refLivre = nouvelleLigne.getElementsByClassName("ref")[0];
        let quantLivre = nouvelleLigne.getElementsByClassName("quant")[0];
        let prixLivre = nouvelleLigne.getElementsByClassName("prix")[0];
        let prixTot = nouvelleLigne.getElementsByClassName("prixtotal")[0];
        let nouveauBouton = document.getElementsByClassName("supprligne")[0];
        refLivre.textContent = "";
        prixLivre.textContent = "";
        quantLivre.textContent = "";
        document.querySelector("tbody").appendChild(nouvelleLigne);
        quantLivre.addEventListener("input", calculTotal);
        nouveauBouton.addEventListener("click", supprimeLigne);
        choixLivre.addEventListener("change", ajoutReference(numeroLigne));


    }

    function supprimeLigne(event) {
        let ligne = event.target.parentElement.parentElement;
        ligne.parentNode.removeChild(ligne);
    }









}
