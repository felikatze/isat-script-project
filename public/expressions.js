import {expressionsUrlDictionary} from "/expressionsUrlDict.js"

window.onload = async function() {
    tooltipImages();
};

////////////////////////////////////////////////////////////////////////////////
//                               tooltip images                               //
////////////////////////////////////////////////////////////////////////////////

async function getExpressionUrlDictonary() {
    return fetch("/expressionsUrlDict.json")
     .then((response) => response.text())
     .then((text) => {
     return JSON.parse(text);})
     }

let data = []
function tooltipImages() {
    var dialogueHeads = document.querySelectorAll(".dialogue-head");
    for(let i = 0; i < dialogueHeads.length; i++)
    {
        let head = dialogueHeads[i]
        if (head.querySelector(".dialogue-expression")) {
            var nameElement = head.querySelector(".dialogue-name");
            var expressionElement = head.querySelector(".dialogue-expression");
            var nameReference;
            var expression = expressionElement.innerHTML.replace(/\((.+)\)/i, "$1");

            if (head.querySelector(".sasasap")) {
                if (nameElement.innerHTML == "Siffrin") {
                    nameReference = "Sapfrin";
                } else if (nameElement.innerHTML == "Isabeau") {
                    nameReference = "Fighter";
                } else if (nameElement.innerHTML == "Mirabelle") {
                    nameReference = "Housemaiden";
                } else if (nameElement.innerHTML == "Bonnie") {
                    nameReference = "Kid";
                } else if (nameElement.innerHTML == "Odile") {
                    nameReference = "Researcher";
                }
                if (debugMode) {console.info(`exception found: name is ${nameElement.innerHTML}, but head ${i} should be referencing ${nameReference}`)};
            }
            else if (head.querySelector(".expression-exception")) {
                nameReference = head.querySelector(".expression-exception").value;
                if (nameReference.charAt(0) == "E") {
                    expressionElement.innerHTML = `(H_${expression})`;
                } else if (expression.charAt(0) == "T" || nameReference.charAt(0) == "K") {expressionElement.innerHTML = `(${expression})`;
                } else {expressionElement.innerHTML = `(${nameReference.charAt(0)}_${expression})`};
                if (debugMode) {console.info(`exception found: name is ${nameElement.innerHTML}, but head ${i} should be referencing ${nameReference}`)};
            }
            else {
                nameReference = nameElement.innerHTML;
            }

            expressionElement.appendChild(document.createElement("span"));
            var tooltip = expressionElement.firstElementChild;
            tooltip.classList.add("tooltip");

            if (nameReference && expression) {
                try {
                    let dialogueImage = document.createElement("img");
                    if (expressionsUrlDictionary[nameReference][expression] == null) {
                        throw ReferenceError(`${expression} is undefined for ${nameReference}`)
                    }
                    dialogueImage.src = expressionsUrlDictionary[nameReference][expression];
                    tooltip.appendChild(dialogueImage);
                    if (debugMode) {console.log(`head ${i} is ${nameReference}, ${expression}`)};
                }
                catch (error) {
                    tooltip.innerHTML = "image not found";
                    if (debugMode) {console.error(`error at head ${i}: couldn't find ${nameReference} ${expression} because`, error)};
                }
            }
        }
    }
}