var bouton1 = null;
var bouton2;
var sexeJoueur;
var boutonSuivant;
var numero = 1;
var sexeRencontre;
var nombreNon;
var nomActeur = "Emmilie";
var repository = "repoLibTer";

//déso pour le dico on a eut un problème pour lire les fichiers texte ... 
var dico = new Map();
dico.set("repoLibTer/acteur1.txt","emilie")
dico.set("repoLibTer/acteur2.txt","emilie")
dico.set("repoLibTer/text-1.txt","Hey on à fini notre journée !")
dico.set("repoLibTer/text-2.txt","Viens on sort cette aprem !!")

dico.set("repolib/acteur1.txt","emilie")
dico.set("repolib/acteur2.txt","emilie")
dico.set("repolib/acteur3.txt","inconnu")
dico.set("repolib/acteur4.txt","inconnu")
dico.set("repolib/acteur5.txt","emilie")
dico.set("repolib/acteur6.txt","inconnu")
dico.set("repolib/text-1.txt"," Ah on est enfin arrivé ! regarder il reste une place avec cette étudiante là bas.")
dico.set("repolib/text-2.txt","Bonjour, est-ce qu’on peut se joindre à toi ?")
dico.set("repolib/text-3.txt"," Bien sûr pas de soucis !")
dico.set("repolib/text-4.txt","Ce soir je vais en boîte avec un ami, ça vous dit de venir ?")
dico.set("repolib/text-5.txt"," Avec plaisir, on avait justement envie de sortir !")
dico.set("repolib/text-6.txt","Oh voilà mon ami, c'est Roberto avec qui on sort ce soir.")

dico.set("repoTer/acteur1.txt","inconnu")
dico.set("repoTer/acteur2.txt","emilie")
dico.set("repoTer/acteur3.txt","inconnu")
dico.set("repoTer/acteur4.txt","emilie")
dico.set("repoTer/acteur5.txt","inconnu")
dico.set("repoTer/acteur6.txt","emilie")
dico.set("repoTer/acteur7.txt","inconnu")
dico.set("repoTer/acteur8.txt","inconnu")
dico.set("repoTer/text-1.txt"," Bonjour, qu’est-ce que je vous sers ?")
dico.set("repoTer/text-2.txt","On prendra 2 demi-pêches !")
dico.set("repoTer/text-3.txt","Très bien !")
dico.set("repoTer/text-4.txt","Il est plutôt pas mal non ? ")
dico.set("repoTer/text-5.txt","Et voilà 2 demi-pêches, autre chose avec ceci ?")
dico.set("repoTer/text-6.txt","Merci, votre snap serait le bienvenue hi hi")
dico.set("repoTer/text-7.txt","Je sors ce soir avec des amis, rejoignez-nous et je vous le donnerai ;)")
dico.set("repoTer/text-8.txt","Oh tiens voilà mon ami Anna")






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
    
        rawFile.open("GET",repository +"/" + ficname + i + ".txt", false);
        //rawFile.open("GET","/home/clement/Documents/GitHub/Info-Nuit/repoLibTer/acteur1.txt", true);
        rawFile.onreadystatechange = function () {
            console.log("coucou");
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status == 0) {
                    allText = rawFile.responseText;
                    console.log(allText);
                }
            }
        rawFile.send(null);
    }
    return allText;
}
/*
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
*/

function uneFenetre(repository, i){
    if (dico.has(repository +"/acteur" + i +".txt")){
        var rawFile = new XMLHttpRequest();
        
        var nom = dico.get(repository +"/acteur" + i +".txt");
        if (nom == "inconnu" || nom == "pot_inconnu"){
            nom = getNom(nom);
        }
        setText(dico.get(repository +"/text-" + i +".txt"), nom);
        //console.log(readTextFile(repository, "acteur", i));
        setPerso(getURL(nom));
        setVisible(boutonSuivant, "visible");
        return true;
    }
    else {
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

$('#BoutonSuivant').click(function() {
    if (uneFenetre(repository, numero)){
        //uneFenetre(repository, numero)
        numero++;
    }else {
        switch(repository){
            case "repoLibTer":
                bouton1.style.visibility = "visible";
                bouton1.onclick = function(){
                   repository = "repolib" 
                   setFond(getURL("bibli"))
                   setBouton1("oui");
                   setBouton2("non");
                   butonsInvisible()
                   sexeRencontre = "f"
                }
                bouton2.onclick = function(){
                    repository = "repoTer" 
                    setFond(getURL("bar"))
                    setBouton1("oui");
                    setBouton2("non");
                    butonsInvisible()
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
});