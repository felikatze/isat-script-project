const IS_PROD = false;

var currentPath = window.location.pathname.replaceAll("/", "\\")
window.addEventListener("load", (event)=> {
var match = window.location.hash.match(/^#!s(-?\d*)!(.*)$/);
if (match && match[2])
{

var detailTags = document.getElementsByTagName("details");

var searchText = decodeURI(match[2].replaceAll("%20", " "));
//var searchText = match[2].replaceAll("%C2%A0", " ");
var found;
for (var i = 0; i < detailTags.length; i++) {
  for(var j = 0; j < detailTags[i].childNodes.length; j++){
    if (detailTags[i].childNodes[j].textContent.includes(searchText)) {
        found = detailTags[i];
        break;
  }
 
  }
}
if(found)
    found.setAttribute('open', '')


  var count = match[1] || 1;
  var backwards = false;
  if (count < 0)
  {
    backwards = true;
    count = Math.abs(count);
  }
  
  for (var i = 0; i < count; i++)
  {
    window.find(decodeURI(match[2]), false, backwards, false, false, true, false);
  }
}
})

function RefreshPage(queryString) {
    var newUrl = window.location.origin + window.location.pathname + "?key=" + queryString;
    window.location.href = newUrl;
    return false;
}


// ----------------------------------------------------------------

class Searcher extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML =
            `
                <input type="text" id="searchbox" placeholder="Search dialogues...">
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
       return JSON.parse(text);
     });
 }

 function filterLines(lines){
    searchterm = searchbox.value;
    filteredLines = lines.filter(x => x[1].toLowerCase().includes(searchterm.toLowerCase()));
    return filteredLines
}
 // -----------------------------------------------------------------------
 

var searchbox = document.getElementById("searchbox");
var resultsList = document.getElementById("searchUL");
let allLines = []
let searchterm = "";

searchbox.onkeyup = function() {
  let filteredLines = filterLines(allLines)
  modifyResultsList(filteredLines)
  if(filteredLines.length == 0 && !resultsList.classList.contains("hidden"))
    toggleElementVisibility(resultsList);
}

searchbox.onclick = async function() {
    if(allLines.length == 0)
        allLines = await getAllDialogueLines();
    toggleElementVisibility(resultsList);
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
}

function setSearchResults(setListLines){
    clearSearchResults();
    for(let i = 0; i < setListLines.length; i++)
    {
        let uri = setListLines[i][0]
        let text = setListLines[i][1]
        let source = setListLines[i][2]
        let nth_instance = setListLines[i][3]
 // creating a li element for each result item
        const resultItem = document.createElement('li')
        const linkItem = document.createElement('a')
        const textnode = document.createTextNode(text)
        const lineBreakItem = document.createElement('br')
        const sourceItem = document.createElement('p')
        const sourceTextNode = document.createTextNode("(In: " + source + ")")
        sourceItem.appendChild(sourceTextNode)
        sourceItem.classList.add('search-result-source')

        linkItem.appendChild(textnode)
        linkItem.appendChild(lineBreakItem)
        linkItem.appendChild(sourceItem)
        resultItem.appendChild(linkItem)
        resultItem.classList.add("dialogue")
        resultItem.classList.add("search-result")
        linkItem.classList.add("search-result-link")
        newUri = uri + "#!s" + nth_instance + "!" + text;
        if(currentPath == uri)
            linkItem.addEventListener("click", function(ev) {
                RefreshPage("#!s" + nth_instance + "!" + text)
            });
        
        linkItem.setAttribute("href", newUri)

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