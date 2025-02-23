// Code for the searching and highlighting of the requested text in the URL

var currentPath = window.location.pathname.replaceAll("/", "\\")

window.addEventListener("load", async () => {
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
    console.log(allPageNames);
    console.log(allExpressionNames);
    console.log(allSpeakerNames);

    for (let i = 0; i < allPageNames.length; i++) {
        var opt = newOption(allPageNames[i]);
        bigPageNameDropdown.appendChild(opt)
    }
    for (let i = 0; i < allExpressionNames.length; i++) {
        var opt = newOption(allExpressionNames[i]);
        opt.classList.add('tooltip')
        bigExpressionDropdown.appendChild(opt)
    }
    for (let i = 0; i < allSpeakerNames.length; i++) {
        var opt = newOption(allSpeakerNames[i]);
        bigSpeakerDropdown.appendChild(opt)
    }
    console.log(allPageNames);

    toggleElementVisibility(resultsList);
})

function newOption(text) {
    var opt = document.createElement('option');
    opt.value = text;
    opt.text = text;
    opt.classList.add("filterOption");
    return opt
}

function RefreshPage(queryString) {
    // Hard page refresh function, used to force a new search on search results that redirect to the current page
    var newUrl = window.location.origin + window.location.pathname + "?key=" + queryString;
    window.location.href = newUrl;
    return false;
}


let bigSearchTerm = "";
let allPageNames = [];
let allExpressionNames = [];
// initialize allSpeakerNames with the pre-inserted characters already in
let allSpeakerNames = [];

function bigFilterLines(lines) {
    bigSearchTerm = bigSearchbox.value;

    filteredLines = lines.filter(x => x[1].toLowerCase().includes(bigSearchTerm.toLowerCase()));

    if (filteredSceneValue != "") {
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

var bigSearchbox = document.getElementById("big-searchbox");
var bigResultsList = document.getElementById("big-searchUL");
var bigPageNameDropdown = document.getElementById("big-pageNameDropdown");
var bigExpressionDropdown = document.getElementById("big-expressionDropdown");
var bigSpeakerDropdown = document.getElementById("big-speakerDropdown");
var bigClearFiltersButton = document.getElementById("clearFilters");

bigClearFiltersButton.onclick = function () {
    bigPageNameDropdown.selectedIndex = 0;
    bigExpressionDropdown.selectedIndex = 0;
    bigSpeakerDropdown.selectedIndex = 0;

    bigSearchbox.value = "";
    filteredSceneValue = "";
    filteredExpressionValue = "";
    filteredSpeakerValue = "";

    let filteredLines = bigFilterLines(bigAllLines);
    bigModifyResultsList(filteredLines);

    if (filteredLines.length == 0 && !bigResultsList.classList.contains("hidden")) {
        toggleElementVisibility(bigResultsList)
    }
}

bigSearchbox.onkeyup = function() {
    let filteredLines = bigFilterLines(bigAllLines);
    bigModifyResultsList(filteredLines);
    console.log(filteredLines);

    if (filteredLines.length == 0 && !bigResultsList.classList.contains("hidden")) {
        toggleElementVisibility(bigResultsList)
    }
}


let bigAllLines = [];
bigSearchbox.onclick = async function() {
    console.log("madeIt")
    if (bigAllLines.length == 0) {
        bigAllLines = await getAllDialogueLines()
    }
    toggleElementVisibility(resultsList);
}

let filteredSceneValue = "";
bigPageNameDropdown.onchange = function() {
    filteredSceneValue = bigPageNameDropdown.value;
    let filteredLines = bigFilterLines(bigAllLines);
    bigModifyResultsList(filteredLines);

    if (filteredLines.length == 0 && !bigResultsList.classList.contains("hidden")) {
        toggleElementVisibility(bigResultsList)
    }
}

let filteredExpressionValue = ""
bigExpressionDropdown.onchange = function() {
    filteredExpressionValue = bigExpressionDropdown.value;
    let filteredLines = bigFilterLines(bigAllLines);
    bigModifyResultsList(filteredLines);

    if (filteredLines.length == 0 && !bigResultsList.classList.contains("hidden")) {
        toggleElementVisibility(bigResultsList)
    }
}

let filteredSpeakerValue = ""
bigSpeakerDropdown.onchange = function () {
    filteredSpeakerValue = bigSpeakerDropdown.value;
    let filteredLines = bigFilterLines(bigAllLines);
    bigModifyResultsList(filteredLines);

    if (filteredLines.length == 0 && !bigResultsList.classList.contains("hidden")) {
        toggleElementVisibility(bigResultsList)
    }
}


// FUNCTIONS FOR BEHAVIOR OF SEARCH RESULTS LIST (UNDER SEARCHBOX)

document.addEventListener('click', (e) => {
    console.log(e.currentTarget.activeElement);
    if (e.currentTarget.activeElement.id == "searchbox"
        || e.currentTarget.classList.contains("filterDropdown")
        || e.currentTarget.classList.contains("filterOption")) {
        console.log("waow");
        return
    }

    if (!bigResultsList.classList.contains("hidden")) {
        toggleElementVisibility(bigResultsList)
    }
})

function bigModifyResultsList(lines) {
    console.log("madeitlol");
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
        let lineBreakItem = document.createElement('br')
        let sourceItem = document.createElement('p')
        let sourceTextNode = document.createTextNode("(In: " + source + ")")
        let speakerItem = document.createElement('span')
        speakerItem.textContent = speaker

        sourceItem.appendChild(sourceTextNode);
        sourceItem.classList.add('big-search-result-source');
        linkItem.appendChild(textnode);
        linkItem.appendChild(lineBreakItem);
        linkItem.appendChild(sourceItem);
        resultItem.appendChild(speakerItem);
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
        console.log("madeIt2");
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