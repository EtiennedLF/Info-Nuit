var bouton1 = null;
var bouton2;


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
    setFond(getURL(fond));
    setPerso(getURL(perso));
    setText(text, acteur);
    setBouton1(choix1);
    setBouton2(choix2);

}

text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra congue nunc, quis ultricies enim pharetra sit amet. Mauris tristique vel nibh vel vulputate.";
nomperso = "Perso 1";


document.addEventListener("DOMContentLoaded", function(){
    setText(text, nomperso);
    setBouton1("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra congue nunc, quis ");
    setBouton2("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra congue nunc, quis ");
    bouton1 = document.getElementById("premierBouton");
    bouton2 = document.getElementById("secondBouton");
    bouton1.onclick = function() {setBouton1("un nouveau texte");}
    bouton2.onclick = function() {}
    }
);

