const alleBuchstaben = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const alleWörter = ["lpha", "ravo", "harlie", "elta", "cho", "oxtrot", "olf", "otel", "ndia", "uliet", "ilo", "ima", "ike", "ovember", 
    "scar", "apa", "uebec", "omeo", "ierra", "ango", "niform", "ictor", "hiskey", "ray", "ankee", "ulu"];
var alleWörterShuffle = ["lpha", "ravo", "harlie", "elta", "cho", "oxtrot", "olf", "otel", "ndia", "uliet", "ilo", "ima", "ike", "ovember", 
    "scar", "apa", "uebec", "omeo", "ierra", "ango", "niform", "ictor", "hiskey", "ray", "ankee", "ulu"];
var dreiWörter = [];
var ausgewählterIndex;
var streak = 0;
var höchsteStreak = 0;



window.onload = function(){
    dreiWörter = storageProxy.dreiWörter != null ? storageProxy.dreiWörter : [];
    alleWörterShuffle = storageProxy.alleWörterShuffle != null ? storageProxy.alleWörterShuffle : [];
    ausgewählterIndex = storageProxy.ausgewählterIndex;
    streak = storageProxy.streak != null ? storageProxy.streak : 0;
    höchsteStreak = storageProxy.höchsteStreak != null ? storageProxy.höchsteStreak : 0;


    document.getElementById("button_1").textContent = alleWörterShuffle[0];
    document.getElementById("button_2").textContent = alleWörterShuffle[1];
    document.getElementById("button_3").textContent = alleWörterShuffle[2];

    document.getElementById("p_buchstabe").textContent = alleBuchstaben[ausgewählterIndex];


    document.getElementById("p_höchsteStreak").textContent = "Höchste Streak: " + höchsteStreak;

    document.getElementById("p_streak").textContent = "Streak: " + streak;
    console.log(höchsteStreak);
}



const storageProxy = new Proxy({}, {
    get(target, key){
        return JSON.parse(localStorage.getItem(key));
    },
    set(target, key, value){
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    }
})


//function shuffle
function shuffle(array){
    for(let i = array.length - 1; i > 0; i--){
        const random = Math.floor(Math.random() * (i + 1));

        [array[i], array[random]] = [array[random], array[i]];
    }
}

//hintergrund ändern
function changeBackground(color){
    document.body.style.background = color;
}





//drei buttons aktualisieren + neuer buchstabe
function neueWörter(){
    dreiWörter = [];

    shuffle(alleWörterShuffle);
    storageProxy.alleWörterShuffle = alleWörterShuffle;

    document.getElementById("button_1").textContent = alleWörterShuffle[0];
    document.getElementById("button_2").textContent = alleWörterShuffle[1];
    document.getElementById("button_3").textContent = alleWörterShuffle[2];

    dreiWörter.push(alleWörter.indexOf(alleWörterShuffle[0]));
    dreiWörter.push(alleWörter.indexOf(alleWörterShuffle[1]));
    dreiWörter.push(alleWörter.indexOf(alleWörterShuffle[2]));
    storageProxy.dreiWörter = dreiWörter;

    ausgewählterIndex = dreiWörter[Math.floor(Math.random() * dreiWörter.length)];
    storageProxy.ausgewählterIndex = ausgewählterIndex;


    document.getElementById("p_buchstabe").textContent = alleBuchstaben[ausgewählterIndex];
}



//hintergrund ändern
function checkAnswer(trueOrFalse) {
    if(trueOrFalse === true) { //wenn richtig: neue runde und grüner hintergrund
        changeBackground("rgb(24, 68, 24)"); //grün
        setTimeout(() => {
            changeBackground("rgb(44, 40, 29)"); //normalfarbe hintergrund
          }, 500);

        streak++;
        storageProxy.streak = streak;
        if(streak > höchsteStreak){
            höchsteStreak = streak;
            storageProxy.höchsteStreak = höchsteStreak;
            document.getElementById("p_höchsteStreak").textContent = "Höchste Streak: " + höchsteStreak;
        }
        document.getElementById("p_streak").textContent = "Streak: " + streak;
    } else{ //wenn falsch: roter hintergrund
        changeBackground("rgb(61, 8, 8)"); //rot
        setTimeout(() => {
            changeBackground("rgb(44, 40, 29)"); //normalfarbe hintergrund
          }, 500);

        streak = 0;
        storageProxy.streak = streak;
        document.getElementById("p_streak").textContent = "Streak: " + streak;
    }
}


//auf richtige antwort prüfen
document.getElementById("button_1").addEventListener("click", (event) => {
    if(document.getElementById("button_1").textContent === alleWörter[ausgewählterIndex]){
        console.log("es ist 1");

        checkAnswer(true);
    }else{
        checkAnswer(false);
    }

    neueWörter();
});

//auf richtige antwort prüfen
document.getElementById("button_2").addEventListener("click", (event) => {
    if(document.getElementById("button_2").textContent === alleWörter[ausgewählterIndex]){
        console.log("es ist 2");

        checkAnswer(true);
    }else{
        checkAnswer(false);
    }

    neueWörter();
});

//auf richtige antwort prüfen
document.getElementById("button_3").addEventListener("click", (event) => {
    if(document.getElementById("button_3").textContent === alleWörter[ausgewählterIndex]){
        console.log("es ist 3");

        checkAnswer(true);
    }else{
        checkAnswer(false);
    }

    neueWörter();
});



neueWörter();