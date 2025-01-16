const IS_PROD = true;
class Searcher extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML =
            `
                <input type="text" id="searchbox" placeholder="Search dialogues...">
                <ul id="searchUL">
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
// HTML RETRIEVER AND PARSER
async function getHTMLForPage(localURI){
    return fetch(localURI)
     .then((response) => response.text())
     .then((text) => {
       return text;
     });
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
     
     return _dialogueLines.flat();
 }
 
 function parseDialogueFromHTML(text, localURI){
    text = text.replace(/<img[^>]*>/g, '');
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
         if(tempText.length > 0)
         
         listOfTextAndLocations.push([localURI, tempText]);
         }
     }  
     return listOfTextAndLocations
 }
 // -----------------------------------------------------------------------

 // 

var searchbox = document.getElementById("searchbox");
var unorderedList = document.getElementById("searchUL");
let allLines = []
let searchterm = "";

searchbox.onkeyup = function() {
  let filteredLines = getFilteredLines(allLines)
  modifyResultsList(filteredLines)

}

searchbox.onclick = async function() {
    if(allLines.length == 0)
        {
           allLines = await getAllDialogueLines();
        }
}

document.addEventListener('click', (e) => {
    console.log("Test")
    console.log(e.currentTarget.activeElement)
    if(!(e.currentTarget.activeElement.id == "searchbox"))
        clearList();
})


function modifyResultsList(lines) {
    if(filteredLines.length == 0 || searchterm.length <= 3)
        clearList();
    
        if(filteredLines.length < 10)
            setList(filteredLines)
        
        else if(searchterm.length > 3)
            setList(filteredLines.slice(0, 10))
}

function getFilteredLines(lines){
    console.log(lines)
    searchterm = searchbox.value;
    filteredLines = lines.filter(x => x[1].includes(searchterm));
    console.log(filteredLines)
    return filteredLines
}

function setList(setListLines){

    clearList();
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
        
        linkItem.setAttribute("href", uri)
        unorderedList.appendChild(resultItem)
    }
}

function clearList(){
    while (unorderedList.firstChild){
        unorderedList.removeChild(unorderedList.firstChild)
    }
}