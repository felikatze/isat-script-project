// Code for the searching and highlighting of the requested text in the URL

var currentPath = window.location.pathname.replaceAll("/", "\\")

window.addEventListener("load", () => {
    var match = window.location.hash.match(/^#!s(-?\d*)!(.*)$/);

    if (match && match[2]) {
        // Looks for a detailTag whose children contains the uriSearch. Opens it if it exists.

        var detailTags = document.getElementsByTagName("details");
        var uriSearch = decodeURI(match[2].replaceAll("%20", " "));

        for (var i = 0; i < detailTags.length; i++) {
            for (var j = 0; j < detailTags[i].childNodes.length; j++) {
                if (detailTags[i].childNodes[j].textContent.includes(uriSearch)) {
                    detailTags[i].setAttribute('open', '');
                    break
                }
            }
        }

        // Parses the uri for search parameters, then highlights the correct text based on those parameters
        var count = match[1] || 1;
        var backwards = false;
        if (count < 0) {
            backwards = true;
            count = Math.abs(count);
        }

        for (var i = 0; i < count; i++) {
            window.find(decodeURI(match[2]), false, backwards, false, false, true, false);
        }
    }
})

function RefreshPage(queryString) {
    // Hard page refresh function, used to force a new search on search results that redirect to the current page
    var newUrl = window.location.origin + window.location.pathname + "?key=" + queryString;
    window.location.href = newUrl;
    return false;
}

class Searcher extends HTMLElement {
    // Defining Search-er element, which contains the searchbar, results list and its items
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML =
            `
            <div id="searchWrapper">
                <input id="searchbox" placeholder="Search dialogues..." />
                <a id="advancedSearchLink" href="/search.html">Advanced Search!</a>
                <i id="removeSearchbarButton">&times;</i>
            </div>
                <ul id="searchUL" class="hidden"></ul>
            `
    }
}
customElements.define("search-er", Searcher);


let searchterm = "";
function filterLines(lines) {
    searchterm = searchbox.value;
    filteredLines = lines.filter(x => x[1].toLowerCase().includes(searchterm.toLowerCase()));
    return filteredLines
}

var wrapper = document.getElementById("searchWrapper");
var searchbox = document.getElementById("searchbox");
var resultsList = document.getElementById("searchUL");
var magnifyingGlassIcon = document.getElementById("magnifyingGlassIcon")
var searchbarContainer = document.getElementById("searchbarContainer")
var removeSearchbarButton = document.getElementById("removeSearchbarButton");
var advancedSearchLink = document.getElementById("advancedSearchLink");

magnifyingGlassIcon.addEventListener('click', async function(){
    if (allLines.length == 0) {
        allLines = await getAllDialogueLines();
    }
    searchbox.style.visibility = "visible";
    
    searchbarContainer.style.visibility = "visible";
    searchbox.style.display = "block";
    searchbox.style.position = "static";
    searchbox.focus();
    searchbarContainer.style.position = "relative";
    wrapper.style.height = "30px";
    searchbox.style.height = "30px";
    searchbarContainer.style.height = "30px";
    setTimeout(() => {
        advancedSearchLink.style.visibility = "visible";
        removeSearchbarButton.style.visibility = "visible";
        removeSearchbarButton.style.display = "block";
        }, 100);

})

removeSearchbarButton.addEventListener('click', function(){
    wrapper.style.height = "0px";
    searchbox.style.height = "0px";
    searchbarContainer.style.height = "0px";
    removeSearchbarButton.style.visibility = "hidden";
    removeSearchbarButton.style.display = "none";
    advancedSearchLink.style.visibility = "hidden";
    
    setTimeout(() => {
    searchbox.style.position = "fixed"
    searchbarContainer.style.position = "fixed"
    searchbox.style.visibility = "hidden"
    searchbarContainer.style.visibility = "hidden"
    }, 100);
})

searchbox.onkeyup = function() {
    let filteredLines = filterLines(allLines);
    modifyResultsList(filteredLines);
    if (filteredLines.length == 0 && !resultsList.classList.contains("hidden")) {
        toggleElementVisibility(resultsList)
    }
}   

async function getAllDialogueLines() {
    return fetch("/dialogue-lines.json")
        .then((response) => response.text())
        .then((text) => {
            return JSON.parse(text)
        }
    )
}

let allLines = []
searchbox.onclick = async function() {
    toggleElementVisibility(resultsList);
}


// FUNCTIONS FOR BEHAVIOR OF SEARCH RESULTS LIST (UNDER SEARCHBOX)

document.addEventListener('click', (e) => {
    if ((e.currentTarget.activeElement.id !== "searchbox") && !resultsList.classList.contains("hidden")) {
        toggleElementVisibility(resultsList)
    }
})

function toggleElementVisibility(el) {
    if (!el.classList.contains("hidden")) {
        el.classList.add("hidden")
    }
    else {
        el.classList.remove("hidden")
    }
}

function modifyResultsList(lines) {

    if (lines.length == 0 || searchterm.length <= 3) {
        clearSearchResults()
    }

    if (lines.length < 100) {
        setSearchResults(lines)
    }
    else if (searchterm.length > 3) {
        setSearchResults(lines.slice(0, 100))
    }
}

function createSearchResultItem(uri, text, source, nth_instance) {
    let resultItem = document.createElement('li');
    let linkItem = document.createElement('a');
    let textnode = document.createTextNode(text);
    let lineBreakItem = document.createElement('br');
    let sourceItem = document.createElement('p');
    let sourceTextNode = document.createTextNode(source);

    sourceItem.appendChild(sourceTextNode);
    sourceItem.classList.add('search-result-source');
    linkItem.appendChild(textnode);
    // linkItem.appendChild(lineBreakItem);
    linkItem.appendChild(sourceItem);
    resultItem.appendChild(linkItem);
    resultItem.classList.add("search-result");
    linkItem.classList.add("search-result-link");

    newUri = uri + "#!s" + nth_instance + "!" + text;
    if (currentPath == uri) {
        linkItem.addEventListener("click", function() {
            RefreshPage("#!s" + nth_instance + "!" + text)
        })
    }
    linkItem.setAttribute("href", newUri);
    return resultItem;
}

function setSearchResults(setListLines) {
    clearSearchResults();
    for (let i = 0; i < setListLines.length; i++) {
        let uri = setListLines[i][0];
        let text = setListLines[i][1];
        let source = setListLines[i][2];
        let nth_instance = setListLines[i][3];
        resultItem = createSearchResultItem(uri, text, source, nth_instance);
        resultsList.appendChild(resultItem)
    }
    if (resultsList.classList.contains("hidden")) {
        toggleElementVisibility(resultsList)
    }
}

function clearSearchResults() {
    while (resultsList.firstChild) {
        resultsList.removeChild(resultsList.firstChild)
    }

    if (!resultsList.classList.contains("hidden")) {
        toggleElementVisibility(resultsList)
    }
}