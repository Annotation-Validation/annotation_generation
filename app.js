var fs = require("fs");

const CSV_SEPERATOR = "%";
const CSV_HEADERS = [
    "appstore",
    "appname",
    "reviewlang",
    "reviewdate",
    "reviewrating",
    "reviewtitle",
    "reviewphrase",
    "reviewuserid",
    "reviewusername",
    "reviewmetadata"

];

const NUM_OF_PHRASES = 1000;

// Generation Specific
const APPSTORE = "GPS";

const APP_LANGUAGE = "deu";
const APP_NAMESPRE = [
    "Mega",
    "Super",
    "Extreme",
    "Xtreme",
    "Genius",
    "Cool",
    "Terrifying"
];
const APP_NAMESMID = [
    "Music Maker",
    "Robot Wars",
    "Robots",
    "Alien",
    "Candy",
    "Store",
    "God",
    "Chatting",
    "Quiz"
];

const APP_NAMESPOST = [
    "Mania",
    1,2,3,4,5,
    "FREE",
    "PAID",
    "FULL"
];

const REVIEW_MAXRATING = 5;

const REVIEW_HEADLINE = [
    "Richtig gute App",
    "Eingie Fehler aber gut",
    "Scheiße",
    "VORSICHT KLAUT DATEN",
    "VIEL ZU TEUER!!!",
    "Anmeldung fehlgeschlagen",
    "Werbung nervt",
    "Klasse!",
    "Funktioniert bei mir nicht :(",
    "Ich liebe diese App!",
    "Könnte besser sein …",
    "Schöner Zeitvertreib",
    "Langweilig",
    "Voll der Müll",
    "Gefällt mir",
    "Macht Spaß",
    "Langsam auf dem Samsung Galaxy S13",
    "BESTE APP",
    "Gefällt mir nicht",
    "Find ich super",
    "Macht was sie soll",
    "Zu kompliziert",
    "Zeitverschwendung",
    "Funktioniert super",
    "Hält nicht was sie verspricht",
    "Größter Scheiß den ich je gesehen habe."
];

const REVIEW_PHRASES = [
    "Hin und wieder etwas langsam",
    "bin sauer auf den entwickler",
    "aber ab und zu crasht es mal",
    "Die App tut das was sie soll, daher super und empfehlenswert",
    "Tut genau das, was sie tun soll",
    "Werbebanner blockiert den Play-Button, Pro-Version zu teuer!",
    "Gefällt mir gar nicht, dass ich meinen Kalender freigeben muss",
    "Das ist die schlechteste App, die Ich je gesehen habe",
    "Seit dem neusten Update geht nichts mehr",
    "Richtig doof ...",
    "Einige Sachen bekommt man nur durch Mikrotransaktionen, was bei einer solchen App nicht so gut ist" ,
    "Nach einigen Stunden in der App verliert man die Lust",
    "Immer wenn ich die App starten will, schließt sie von alleine",
    "...aber nicht auf Dauer",
    "Bin sehr zufrieden, immer wieder neue Updates",
    "Habe viele Apps dieser Kategorie ausprobiert, aber sie ist eindeutig die beste",
    "Funktioniert bei mir überhaupt nicht - bitte fixen",
    "Im WLAN stürzt die App beim Verbindungsaufbau ständig ab",
    "Die vorherige Version war noch echt gut, aber nach dem letzten Update ist alles scheiße"
];



const REVIEW_USERNAME = "Ein Google-Nutzer";


function main(){
    output = generateCSVHeaders();
    console.log("Generating " + NUM_OF_PHRASES + " Review Phrases");
    var startTime = new Date();
    for(var i=0;i<NUM_OF_PHRASES;i++){
        output += generateReview();
        output += "\n";
    }
    var endTime = new Date();
    console.log("Finished Generation in " + (endTime.getTime() - startTime.getTime()) + " milliseconds!");
    fs.writeFile("output.csv", output, function(){
        console.log("Data written to output.csv");
    });
}

function generateCSVHeaders(){
    var headers = "";
    headers += CSV_HEADERS.join(CSV_SEPERATOR);
    headers += "\n"
    return headers;
}

function generateReview(){
    var reviewArray = [];
    reviewArray.push(APPSTORE);
    reviewArray.push(generateAppName());
    reviewArray.push(APP_LANGUAGE);
    reviewArray.push((new Date()).getTime());
    reviewArray.push(Math.round(Math.random() * REVIEW_MAXRATING));
    reviewArray.push(REVIEW_HEADLINE.randomElement());
    reviewArray.push(REVIEW_PHRASES.randomElement());
    reviewArray.push(Math.round(Math.random() * 10000));
    reviewArray.push(REVIEW_USERNAME);
    reviewArray.push(0);

     return reviewArray.join(CSV_SEPERATOR);
}

function generateAppName() {
    var appHasPreName = probability(0.7);
    var appHasPostName = probability(0.5);

    var name = "";

    if(appHasPreName){
        name += APP_NAMESPRE.randomElement();
    }
    name += " ";
    name += APP_NAMESMID.randomElement();
    if(appHasPostName){
        name += " ";
        name += APP_NAMESPOST.randomElement();
    }
    return name
}

//src: http://stackoverflow.com/questions/26271868/is-there-a-simpler-way-to-implement-a-probability-function-in-javascript
function probability(n) {
     return !!n && Math.random() <= n;
};

//src: http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

main();