
var currentPath = window.location.pathname.replaceAll("/", "\\")
let bigAllLines = [];
let filteredExpressionValue = ""
let filteredSpeakerValue = ""
let filteredSceneValue = "";
let bigSearchTerm = "";
let allPageNames = [];
let allExpressionNames = [];
let allSpeakerNames = [];

var bigSearchbox = document.getElementById("big-searchbox");
var bigResultsList = document.getElementById("big-searchUL");
var bigPageNameDropdown = document.getElementById("big-pageNameDropdown");
var bigExpressionDropdown = document.getElementById("big-expressionDropdown");
var bigSpeakerDropdown = document.getElementById("big-speakerDropdown");
var bigClearFiltersButton = document.getElementById("clearFilters");

const fillFilterDropdowns = async function(){
        if (bigAllLines.length == 0) {
        bigAllLines = await getAllDialogueLines();
    }
    let preinsertedSpeakers = ["Siffrin", "Isabeau", "Odile", "Mirabelle", "Bonnie", "King", "Euphrasie", "Loop"];
    for (let i = 0; i < bigAllLines.length; i++) {
        var pageName = bigAllLines[i][2];
        var expressionName = bigAllLines[i][4];
        var speakerName = bigAllLines[i][5];

        if (!allPageNames.includes(pageName)) {
            allPageNames.push(pageName)
        }
        if (expressionName.length > 0 && !allExpressionNames.includes(expressionName)) {
            allExpressionNames.push(expressionName)
        }
        if (speakerName.length > 0 && !allSpeakerNames.includes(speakerName) && !preinsertedSpeakers.includes(speakerName)) {
            allSpeakerNames.push(speakerName)
        }
    }
    allPageNames = allPageNames.sort();
    allExpressionNames = allExpressionNames.sort();
    allSpeakerNames = allSpeakerNames.sort();

    for (let i = 0; i < allPageNames.length; i++) {
        var opt = newOption(allPageNames[i]);
        bigPageNameDropdown.appendChild(opt)
    }
    for (let i = 0; i < allExpressionNames.length; i++) {
        var opt = newOption(allExpressionNames[i]);
        bigExpressionDropdown.appendChild(opt)
    }
    for (let i = 0; i < allSpeakerNames.length; i++) {
        var opt = newOption(allSpeakerNames[i]);
        bigSpeakerDropdown.appendChild(opt)
    }
    toggleElementVisibility(resultsList);
}



function newOption(text) {
    var opt = document.createElement('option');
    opt.value = text;
    opt.text = text;
    opt.classList.add("filterOption");
    return opt
}

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}



function filterLines(lines) {
    bigSearchTerm = bigSearchbox.value;
    filteredLines = lines.filter(x => x[1].toLowerCase().includes(bigSearchTerm.toLowerCase()));
    if (filteredSceneValue != "") {
        console.log("filter by scene")
        filteredLines = filteredLines.filter(x => x[2].toLowerCase() == filteredSceneValue.toLowerCase())
    }
    if (filteredExpressionValue != "") {
        filteredLines = filteredLines.filter(x => x[4].toLowerCase() == filteredExpressionValue.toLowerCase())
    }
    if (filteredSpeakerValue != "") {
        filteredLines = filteredLines.filter(x => x[5].toLowerCase() == filteredSpeakerValue.toLowerCase())
    }

    return filteredLines
}


const clearFilters = function() {
    bigPageNameDropdown.selectedIndex = 0;
    bigExpressionDropdown.selectedIndex = 0;
    bigSpeakerDropdown.selectedIndex = 0;

    bigSearchbox.value = "";
    filteredSceneValue = "";
    filteredExpressionValue = "";
    filteredSpeakerValue = "";

    let filteredLines = filterLines(bigAllLines);
    bigModifyResultsList(filteredLines);

    if (filteredLines.length == 0 && !bigResultsList.classList.contains("hidden")) {
        toggleElementVisibility(bigResultsList)
    }
}
let bigAllLines = [];

const modifyResultsOnSearchboxChange = debounce((ev) => {
    let filteredLines = filterLines(bigAllLines);
    bigModifyResultsList(filteredLines);
    if (filteredLines.length == 0 && !bigResultsList.classList.contains("hidden")) {
        toggleElementVisibility(bigResultsList)
    }
},250);




const searchboxClick = async function() {
    toggleElementVisibility(resultsList);
}


const modifyResultsOnKeyup = debounce((ev) => {
    filteredSceneValue = bigPageNameDropdown.value;
    let filteredLines = filterLines(bigAllLines);
    bigModifyResultsList(filteredLines);
    if (filteredLines.length == 0 && !bigResultsList.classList.contains("hidden")) {
        toggleElementVisibility(bigResultsList);
    }
}, 250);



const modifyResultsForExpressionChange = function() {
    filteredExpressionValue = bigExpressionDropdown.value;
    let filteredLines = filterLines(bigAllLines);
    console.log(filteredLines)
    bigModifyResultsList(filteredLines);
    if (filteredLines.length == 0 && !bigResultsList.classList.contains("hidden")) {
        toggleElementVisibility(bigResultsList)
    }
}



const modifyResultsForPageChange = function() {
    filteredSceneValue = bigPageNameDropdown.value;
    let filteredLines = filterLines(bigAllLines);
    console.log(filteredLines)
    bigModifyResultsList(filteredLines);
    if (filteredLines.length == 0 && !bigResultsList.classList.contains("hidden")) {
        toggleElementVisibility(bigResultsList)
    }
}




const modifyResultsForSpeakerChange = function() {
    filteredSpeakerValue = bigSpeakerDropdown.value;
    let filteredLines = filterLines(bigAllLines);
    bigModifyResultsList(filteredLines);
    if (filteredLines.length == 0 && !bigResultsList.classList.contains("hidden")) {
        toggleElementVisibility(bigResultsList)
    }
} 

window.addEventListener("load", async () => fillFilterDropdowns())
bigClearFiltersButton.addEventListener('click', clearFilters)
bigSearchbox.addEventListener('keydown', modifyResultsOnSearchboxChange)
bigSearchbox.addEventListener('click', searchboxClick)
bigPageNameDropdown.addEventListener('onkeyup', modifyResultsOnKeyup);
bigExpressionDropdown.addEventListener('change', modifyResultsForExpressionChange)
bigPageNameDropdown.addEventListener('change', modifyResultsForPageChange)
bigSpeakerDropdown.addEventListener('change', modifyResultsForSpeakerChange)


// FUNCTIONS FOR BEHAVIOR OF SEARCH RESULTS LIST (UNDER SEARCHBOX)

document.addEventListener('click', (e) => {

    console.log(e.currentTarget.activeElement);
    if (e.currentTarget.activeElement.id == "searchbox" || e.currentTarget.activeElement.classList.contains('filterDropdown')) {
        return
    }

    if (!bigResultsList.classList.contains("hidden")) {
        toggleElementVisibility(bigResultsList)
    }
})

function bigModifyResultsList(lines) {
    if (lines.length == 0 || bigSearchTerm.length <= 3) {
        bigClearSearchResults()
    }

    if (lines.length < 100) {
        bigSetSearchResults(lines)
    }

    else if (bigSearchTerm.length > 3) {
        bigSetSearchResults(lines.slice(0, 100))
    }

    function bigCreateSearchResultItem(uri, text, source, nth_instance, expression, speaker) {
        let resultItem = document.createElement('li')
        let linkItem = document.createElement('a')
        let textnode = document.createTextNode(text)
        let sourceItem = document.createElement('p')
        let sourceTextNode = document.createTextNode("(In: " + source + ")")
        let speakerItem = document.createElement('span')
        let expressionItem = document.createElement('span')
        let dialogueHead = document.createElement('span')
        let dialogueLine = document.createElement('p')
        speakerItem.textContent = speaker
        expressionItem.textContent = expression

        dialogueHead.classList.add("dialogue-head")
        speakerItem.classList.add("dialogue-name")
        expressionItem.classList.add("dialogue-expression")
        dialogueLine.classList.add("dialogue-line")
        if (speaker) dialogueHead.appendChild(speakerItem)
        if (expression) dialogueHead.appendChild(expressionItem)
        if (speaker || expression) {
            dialogueLine.appendChild(dialogueHead);
            dialogueLine.appendChild(document.createTextNode(" "))
        }
        dialogueLine.appendChild(textnode)
        sourceItem.appendChild(sourceTextNode);
        sourceItem.classList.add('big-search-result-source')
        linkItem.append(dialogueLine)
        linkItem.appendChild(sourceItem);
        resultItem.appendChild(linkItem);
        resultItem.classList.add("dialogue");
        resultItem.classList.add("big-search-result");
        linkItem.classList.add("big-search-result-link");

        newUri = uri + "#!s" + nth_instance + "!" + text;

        if (currentPath == uri) {
            linkItem.addEventListener("click", function () {
                RefreshPage("#!s" + nth_instance + "!" + text)
            })
        }

        linkItem.setAttribute("href", newUri)
        return resultItem;
    }

    function bigSetSearchResults(setListLines) {
        bigClearSearchResults();
        for (let i = 0; i < setListLines.length; i++) {
            let uri = setListLines[i][0];
            let text = setListLines[i][1];
            let source = setListLines[i][2];
            let nth_instance = setListLines[i][3];
            let expression = setListLines[i][4];
            let speaker = setListLines[i][5];
            resultItem = bigCreateSearchResultItem(uri, text, source, nth_instance, expression, speaker);
            bigResultsList.appendChild(resultItem)
        }
        if (bigResultsList.classList.contains("hidden")) {
            toggleElementVisibility(bigResultsList)
        }
    }
}

function bigClearSearchResults() {
    while (bigResultsList.firstChild) {
        bigResultsList.removeChild(bigResultsList.firstChild)
    }

    if (!bigResultsList.classList.contains("hidden")) {
        toggleElementVisibility(bigResultsList);
    }
}