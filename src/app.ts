// variables
const formulario_form = document.querySelector("#formulario") as HTMLFormElement;
const listaTweets_div = document.querySelector("#lista-tweets") as HTMLDivElement;

interface Tweet {
    id: number;
    txt: string;
}

let tweets: Tweet[] = [];

//event listeners
eventListener();

function eventListener() {
    formulario_form.addEventListener("submit", addTweet);
    document.addEventListener("DOMContentLoaded", loadFromLocalStorage);
}



//funciones
function clearListaTweets() {
    while (listaTweets_div.firstChild) {
        listaTweets_div.removeChild(listaTweets_div.firstChild);
    }
}

function loadFromLocalStorage() {
    tweets = JSON.parse(localStorage.getItem("tweets") ?? "");
    if (tweets) {
        showAllTweetsInHtml();
    }
}

function showAllTweetsInHtml() {
    tweets.forEach(tweet => {
        const txt = document.createElement("li");
        const a = document.createElement("a");

        txt.innerText = tweet.txt;
        a.innerText = "X";
        a.classList.add("borrar-tweet");
        a.onclick = () => removeTweet(tweet.id);


        txt.append(a);

        listaTweets_div.append(txt);
    });
}

function addTweet(e: Event) {
    e.preventDefault();

    const tweet_txtarea = document.querySelector("#tweet") as HTMLTextAreaElement;

    if (!tweet_txtarea.value) {
        showError("el texto del tweet no puede estar vacio");
        return;
    }

    const id = Date.now();

    const tweet: Tweet = {
        id,
        txt: tweet_txtarea.value
    };

    tweets.push(tweet);
    saveToLocalStorage();
    clearListaTweets();
    showAllTweetsInHtml();

    tweet_txtarea.value = "";

}

function showError(msg: string) {
    const erroMsg = document.createElement("p");
    erroMsg.textContent = msg;
    erroMsg.classList.add("error");

    const content = document.querySelector("#contenido") as HTMLDivElement;
    content.append(erroMsg);

    setTimeout(() => {
        erroMsg.remove();
    }, 3000);
}

function saveToLocalStorage() {
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

function removeTweet(id: number) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
    saveToLocalStorage();
    clearListaTweets();
    showAllTweetsInHtml();
}

