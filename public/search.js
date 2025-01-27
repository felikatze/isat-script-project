const IS_PROD = false;

class Searcher extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML =
            `
                <input type="text" id="searchbox" placeholder="Search dialogues...">
                <div id="loader" class="loader hidden"></div>
                <ul id="searchUL" class="hidden">
                </ul>
            `
    }
}
customElements.define("search-er", Searcher);

const allPageURIs = [
    ""
]
 async function getAllDialogueLines(){
    return fetch("/dialogue-lines.json")
     .then((response) => response.text())
     .then((text) => {
        console.log(text)
       return JSON.parse(text);
     });
 }
 /*
 // Filters out duplicates out of a list of objects
 function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
}
*/
 function filterLines(lines){
    console.log(lines)
    searchterm = searchbox.value;
    //lines = lines.filter(x => x[0].length > 3)
    filteredLines = lines.filter(x => x[1].toLowerCase().includes(searchterm.toLowerCase()));
    return filteredLines
}
 // -----------------------------------------------------------------------
 

var searchbox = document.getElementById("searchbox");
var resultsList = document.getElementById("searchUL");
var loader = document.getElementById("loader");
let allLines = []
let searchterm = "";

searchbox.onkeyup = function() {
  let filteredLines = filterLines(allLines)
  modifyResultsList(filteredLines)
  console.log(resultsList.classList);
  console.log(filteredLines.length)
  console.log(filteredLines.length === 0)
  if(filteredLines.length == 0 && !resultsList.classList.contains("hidden"))
    toggleElementVisibility(resultsList);
}

searchbox.onclick = async function() {
    toggleElementVisibility(loader);
    if(allLines.length == 0)
        allLines = await getAllDialogueLines();
    console.log(allLines)
    toggleElementVisibility(resultsList);
    toggleElementVisibility(loader);
}


// FUNCTIONS FOR BEHAVIOR OF SEARCH RESULTS LIST (UNDER SEARCHBOX)

document.addEventListener('click', (e) => {
    if((e.currentTarget.activeElement.id !== "searchbox") && !resultsList.classList.contains("hidden"))
        toggleElementVisibility(resultsList);
})

function toggleElementVisibility(el) {
    if(!el.classList.contains("hidden"))
        el.classList.add("hidden");
    else
        el.classList.remove("hidden");
}

function modifyResultsList(lines) {
    if(filteredLines.length == 0 || searchterm.length <= 3)
        clearSearchResults();
    
        if(filteredLines.length < 100)
            setSearchResults(filteredLines)
        
        else if(searchterm.length > 3)
            setSearchResults(filteredLines.slice(0, 100))

        console.log(filteredLines);
}

function setSearchResults(setListLines){
    clearSearchResults();
    for(let i = 0; i < setListLines.length; i++)
    {
        let uri = setListLines[i][0]
        let text = setListLines[i][1]
 // creating a li element for each result item
        const resultItem = document.createElement('li')
        const linkItem = document.createElement('a')
        const textnode = document.createTextNode(text)
        linkItem.appendChild(textnode)
        resultItem.appendChild(linkItem)
        resultItem.classList.add("dialogue")
        resultItem.classList.add("search-result")
        linkItem.classList.add("search-result-link")
       // linkItem.setAttribute("onclick","addTextHighlightCookie(\"" + text + "\")");
        let uriEncodedText = encodeURIComponent(text);
        uri = uri + "#:~:text=" + uriEncodedText;

        linkItem.setAttribute("href", uri)
        resultsList.appendChild(resultItem)
    }
    if(resultsList.classList.contains("hidden"))
        toggleElementVisibility(resultsList);
}

function clearSearchResults(){
    while (resultsList.firstChild){
        resultsList.removeChild(resultsList.firstChild)

    if(!resultsList.classList.contains("hidden"))
        toggleElementVisibility(resultsList);
    }
}