var bouton1 = null;
var bouton2;
var sexeJoueur;
var boutonSuivant;
var numero = 1;
var sexeRencontre;
var nombreNon;
var nomActeur = "Emmilie";
var repository = "repoLibTer";

function getNom(nom){
    switch(nom) {
        case "inconnu" :
            if (sexeRencontre == "f") {
                return "nomdefemme"
            }else {
                return "nondhomme"
            }
        case "pote_inconnu" :
            if (sexeRencontre == "f") {
                return "nomdhomme"
            }else {
                return "nomdefemme"
            }
    }
}



function setFond(url){
    document.getElementById("fond").src = url;
}

function setPerso(url){
    document.getElementById("perso").src = url;
}

function setText(text, acteur){
    document.getElementById("boiteDialogue").innerHTML = "<b>" + acteur + " : </b>" + text;
}

function setBouton1(text){
    document.getElementById("premierBouton").innerHTML = text;
}

function setBouton2(text){
    document.getElementById("secondBouton").innerHTML = text;
}

function getURL(nom){
    return "pictures/" + nom + ".png";
    }

function createScene(perso, fond, acteur, text, choix1, choix2){
    /*
        Dans cette fonction on entre en paramètre le nom du fond et du perso telle qu'il est stoqué (pas l'url)
        l'acteur est le nom de la personne qui parle (ça sera affiché dans le texte)
        le texte correspond au texte de la boite de dialogue
        les choix 1 et 2 sont ceux des deux boutons
*/
    if (fond != ""){
        setFond(getURL(fond));
    }
    if (perso != ""){
        setPerso(getURL(perso));
    }
    if (text != "" && acteur != ""){
        setText(text, acteur);
    }
    if (choix1 != ""){
        setBouton1(choix1);
    }
    if (choix2 != ""){
        setBouton2(choix2);
    }
   

}

function setVisible(bouton, etat){
    bouton.style.visibility = etat;
}

text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra congue nunc, quis ultricies enim pharetra sit amet. Mauris tristique vel nibh vel vulputate.";
nomperso = "Perso 1";


document.addEventListener("DOMContentLoaded", function(){
    bouton1 = document.getElementById("premierBouton");
    bouton2 = document.getElementById("secondBouton");
    boutonSuivant = document.getElementById("BoutonSuivant");
    }
);

function readTextFile(repository, ficname, i) { 
     allText = "";
        var rawFile = new XMLHttpRequest();
        //rawFile.open("GET",repository +"/" + ficname + i + ".txt", false);
        rawFile.open("GET","repoLibTer/acteur1.txt", false);
        rawFile.onreadystatechange = function () {
            console.log("coucou");
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status == 0) {
                    allText = rawFile.responseText;
                    console.log(allText);
                }
            }
        return allText;
        
        rawFile.send(null);
    }
}

function uneFenetre(repository, i){
    try{
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET",repository +"/txt-" + i + ".txt", false);
        rawFile.open("GET",repository +"/acteur" + i + ".txt", false);
        var nom = readTextFile(repository, "acteur", i)
        if (nom == "inconnu" || nom == "pot_inconnu"){
            nom = getNom(nom);
        }
        setText(readTextFile(repository, "txt-", i), nom);
        //console.log(readTextFile(repository, "acteur", i));
        setPerso(getURL(readTextFile(repository, "acteur", i)));
        setVisible(boutonSuivant, "visible");
        return true;
    }catch(error){
        setVisible(boutonSuivant, "hidden");
        setVisible(bouton1, "visible");
        setVisible(bouton2, "visible");
        return false;
    }
}
function butonsInvisible(){
    setVisible(bouton1, "hidden");
    setVisible(bouton2, "hidden");
}

$('#boutonSuivant').onclick = function() {
    if (uneFenetre(repository, numero)){
        numero++;
    }else {
        switch(repository){
            case "repoLibTer":
                bouton1.onclick = function(){
                   repository = "repolib" 
                   setFond(getURL("bibli"))
                   setBouton1("oui");
                   setBouton2("non");
                   butonsInvisible()
                   nomActeur = "Julie"
                   sexeRencontre = "f"
                }
                bouton2.onclick = function(){
                    repository = "repoTer" 
                    setFond(getURL("bar"))
                    setBouton1("oui");
                    setBouton2("non");
                    butonsInvisible()
                    nomActeur = "Roberd"
                    sexeRencontre = "m"
                 }
                break;
            case "repolib" :
                butonsInvisible()
                repository = "repoPropBoite" 
                break;
            case "repoTer" :
                butonsInvisible()
                repository = "repoPropBoite" 
                break;
            case "repoPropBoite" :
                bouton1.onclick = function(){
                    repository = "repoInconnu" 
                    butonsInvisible()
                 }
                 bouton2.onclick = function(){
                    if (nombreNon == 0){
                        repository = "repoLibTer"
                        setBouton1("Librairie");
                        setBouton2("Terrasse");
                        butonsInvisible()
                        nombreNon++
                    }else {
                        nombreNon =0 
                        repository = "repoInsiste"
                        butonsInvisible()

                    }
                  }
                break;
            case "repoInsiste" :
                setFond(getURL("boite"))
                butonsInvisible()
                repository = "repoInconnu" 
                break;
            case "repoInconnu" :
                repository = "repoPayerverre" 
                setBouton1("prendre même sexe");
                setBouton2("prendre sexe opposé");
                butonsInvisible()
                break;
            case "repoPayerverre" :
                bouton1.onclick = function(){
                    repository = "repoGay" 
                    setBouton1("oui");
                    setBouton2("non");
                    butonsInvisible()
                 }
                 bouton2.onclick = function(){
                     repository = "repoTer" 
                     setBouton1("oui");
                     setBouton2("non");
                     butonsInvisible()
                  }
                break;
            case "repoGay" :
                butonsInvisible()
                sexeRencontre = sexeJoueur
                repository = "repoConfirmation" 
                break;
            case "repoHetero" :
                butonsInvisible()
                repository = "repoConfirmation" 
                break;
            case "repoConfirmation" :
                bouton1.onclick = function(){
                    repository = "repoKiss" 
                    butonsInvisible()
                 }
                 bouton2.onclick = function(){
                    if (nombreNon == 0){
                        repository = "repoPayerverre"
                        setBouton1("prendre même sexe");
                        setBouton2("prendre sexe opposé");
                        butonsInvisible()
                        nombreNon++
                    }else {
                        nombreNon =0 
                        repository = "repoPasSur"
                        butonsInvisible()

                    }
                  }
                break;
            case "repoEasterEag" :
                break;
            case "repoKiss" :
                butonsInvisible()
                repository = "repoDiscussion"
                break;
            case "repoPasSur" :
                butonsInvisible()
                repository = "repoDiscussion"
                
                break;
            case "repoDiscussion" :
                repository = "repoRentrer"
                setBouton1("rentrer chez sois");
                setBouton2("rentrer chez nous");
                butonsInvisible()
                break;
            case "repoRentrer" :
                bouton1.onclick = function(){
                    repository = "repoChezInconnu" 
                    butonsInvisible()
                 }
                 bouton2.onclick = function(){
                     repository = "repoChezSois" 
                     setBouton1("savoir");
                     setBouton2("continué");
                     butonsInvisible()
                  }
                break;
            case "repoChezInconnu" :
                butonsInvisible()
                repository = "repoPlusLoin" 
                setBouton1("avec capote")
                setBouton2("sans capote")
                break;
            case "repoChezSois" :
                bouton1.onclick = function(){
                    repository = "repoChezInconnu" 
                    butonsInvisible()
                 }
                 bouton2.onclick = function(){
                     repository = "repoDouleur" 
                     butonsInvisible()
                  }
                break;
            case "repoPlusLoin" :
                bouton1.onclick = function(){
                    repository = "repoDisrtib" 
                    butonsInvisible()
                 }
                 bouton2.onclick = function(){
                     repository = "repoFaire" 
                     butonsInvisible()
                  }
                break;
            case "repoDisrtib" :
                repository = "repoFaire" 
                butonsInvisible()
                break;
            case "repoFaire" : 
                    repository = "repoDormir" 
                     butonsInvisible()
                break;
            case "repoDormir" :
                repository = "repoDouleur" 
                setBouton1("regarder score")
                setBouton2("fin")
                butonsInvisible()
                break;
            case "repoDouleur" :
                bouton1.onclick = function(){
                    repository = "repoScore" 
                    setBouton1("retour")
                    butonsInvisible()
                 }
                 bouton2.onclick = function(){
                     repository = "repoFin" 
                     butonsInvisible()
                  }
                break;
            case "repoScore" :
                setVisible(bouton2, "hidden")
                bouton1.onclick = function(){
                    repository = "repoFin" 
                    butonsInvisible()
                 }
                break;
            case "repoGif" :
                break;
            case "repoFin" :
                butonsInvisible()
                break;
        }
    }
}