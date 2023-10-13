const API_KEY = "9fbe8185c8c14e5e86830b0eb7651d76";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));


//CLick on logo- Back to home page.
function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    //fetch library returns promise,in which we have to await
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);//this kind of string is requires , see get url.
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    //getting cards container and cardtemplate
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");



   //we have to make it empty , otherwise it will fill the cards after the old cards.
    cardsContainer.innerHTML = "";


    // ADDING THE DATA INTO THE CARD CLONE
    articles.forEach((article) => {
        //if no urltoimage, then dont show the news, otherwise UI will look wierd.
        if (!article.urlToImage) return;
        //we are cloning the card and all of their childs
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}







function fillDataInCard(cardClone, article) {
    //Selecting by id.  We can check what we want in the console log. All the data is loaded
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    //chage to from TZ to human readable format.
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    //Handling the click event of cardclone

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}







//Ha ndling the NAVS, selecting it and clicking event.

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    //when clicked on the new one, remove active class from previous one and active class to the new one
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}






//Handling the INPUT TAG
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    //query is inserted by user.
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    //when the we are fetching the news , we want to null the current selected item
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

