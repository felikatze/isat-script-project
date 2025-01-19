const IS_PROD = true;
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
    "/acts/act2/intro2.html",
    "/acts/act2/ending2.html",
    "/acts/act3-4/bonniequest.html",
    "/acts/act3-4/intro3.html",
    "/acts/act3-4/isaquest.html",
    "/acts/act3-4/kingquest.html",
    "/acts/act3-4/loophangout.html",
    "/acts/act3-4/loopquest.html",
    "/acts/act3-4/miraquest.html",
    "/acts/act3-4/odilequest.html",
    "/acts/act5/act5.html",
    "/acts/act5/endrooms5.html",
    "/acts/act5/friendquestsACT5.html",
    "/acts/act5/maldupays.html",
    "/acts/act5/VSFriends.html",
    "/acts/act6/act6npcs.html",
    "/acts/act6/bonnieend6.html",
    "/acts/act6/isaend6.html",
    "/acts/act6/miraend6.html",
    "/acts/act6/odileend6.html",
    "/events/bombquest.html",
    "/events/bondingearrings.html",
    "/events/bonnieside.html",
    "/events/castlequest.html",
    "/events/colortheory.html",
    "/events/confession.html",
    "/events/ghost.html",
    "/events/mirafan.html",
    "/events/odilesus.html",
    "/events/phone.html",
    "/events/touchtherapy.html",
    "/events/tutorial.html",
    "/random/barrels.html",
    "/random/brightflower.html",
    "/random/change_god_statues.html",
    "/random/dagger.html",
    "/random/deaths.html",
    "/random/enemies.html",
    "/random/equipment.html",
    "/random/generic.html",
    "/random/levels.html",
    "/random/memories.html",
    "/random/silvercoin.html",
    "/random/souvenirs1.html",
    "/random/souvenirs2.html"
]
//  HTML RETRIEVER AND PARSER 
async function getHTMLForPage(localURI){
    return fetch(localURI)
     .then((response) => response.text())
     .then((text) => {
       return text;
     });
 }
 
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

function parseDialogueFromHTML(text, localURI){
   // Remove image tags for better performance
   text = text.replace(/<img[^>]*>/g, '');

   // Remove the <span class="wave"></span> tags, as they're often present in dialogue lines and cause problems with the parsing

   while(text.indexOf("<span class=\"wave\">") != -1)
   {
       var waveIndex = text.indexOf("<span class=\"wave\">");
       var closingTagIndex = text.indexOf("</span>", waveIndex);
       text = text.slice(0, waveIndex) + text.slice(waveIndex + 19, closingTagIndex) + text.slice(closingTagIndex + 7);
   }

   while(text.indexOf("<span class=\"shake\">") != -1)
    {
        var waveIndex = text.indexOf("<span class=\"shake\">");
        var closingTagIndex = text.indexOf("</span>", waveIndex);
        text = text.slice(0, waveIndex) + text.slice(waveIndex + 20, closingTagIndex) + text.slice(closingTagIndex + 7);
    }

    while(text.indexOf("<span class=\"shake big\">") != -1)
        {
            var waveIndex = text.indexOf("<span class=\"shake big\">");
            var closingTagIndex = text.indexOf("</span>", waveIndex);
            text = text.slice(0, waveIndex) + text.slice(waveIndex + 24, closingTagIndex) + text.slice(closingTagIndex + 7);
        }

    while(text.indexOf("<span class=\"wish\">") != -1)
        {
            var waveIndex = text.indexOf("<span class=\"wish\">");
            var closingTagIndex = text.indexOf("</span>", waveIndex);
            text = text.slice(0, waveIndex) + text.slice(waveIndex + 19, closingTagIndex) + text.slice(closingTagIndex + 7);
        }

   // Create an HTML document with the text and parse it
    var el = document.createElement('html');
    el.innerHTML = text;
    var dialogueLines = el.getElementsByClassName("dialogue-line");
    var listOfTextAndLocations = []
    for (const element of dialogueLines) {
        if(element.lastChild.nodeValue != null)
            {
                var tempText = element.lastChild.nodeValue;
                tempText = tempText.replaceAll("\n", '')
                tempText = tempText.trim();
                if(tempText.trim().length > 0)
                    listOfTextAndLocations.push([localURI, tempText]);
            }
        }     
    return listOfTextAndLocations
}
 
 async function getAllDialogueLines(){
    let _dialogueLines = [];
     for(let i = 0; i < allPageURIs.length; i++){
         let currentURI = allPageURIs[i];
         if(!IS_PROD)
             currentURI = "/public" + currentURI;
         let myText = await getHTMLForPage(currentURI);  
        _dialogueLines.push(parseDialogueFromHTML(myText, currentURI));
     }
     _dialogueLines = _dialogueLines.flat();
     _dialogueLines = uniq_fast(_dialogueLines);
     return _dialogueLines;
 }

 function filterLines(lines){
    searchterm = searchbox.value;
    lines = lines.filter(x => x[0].length > 3)
    filteredLines = lines.filter(x => x[1].includes(searchterm));
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
    
        if(filteredLines.length < 10)
            setSearchResults(filteredLines)
        
        else if(searchterm.length > 3)
            setSearchResults(filteredLines.slice(0, 10))
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