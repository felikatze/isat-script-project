////////////////////////////////////////////////////////////////////////////////
//                                  variables                                 //
////////////////////////////////////////////////////////////////////////////////

debugMode = false; // change this to true and check console for debug logs!
var animationToggle;
var wavelength = 0.025;
var waveAmplitude = 15;
var waveSpeed = 0.75;
var shakeMagnitude = 5;
var shakeSpeed = 0.2;
var shakeUnit = "%";



////////////////////////////////////////////////////////////////////////////////
//                               custom elements                              //
//                              (header / footer)                             //
////////////////////////////////////////////////////////////////////////////////

class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML =
            `<header>
                <img src="/assets/images/header.png" alt="">
                <nav>
                    <img src="/assets/images/Craft.png" alt="">
                    <span><a href="/index.html">Home</a></span>
                    <span><a href="/overview/acts.html">Story</a></span>
                    <span><a href="/overview/events.html">Events</a></span>
                    <span><a href="/overview/rooms.html">Rooms</a></span>
                    <span><a href="/overview/random.html">Random</a></span>
                    <span><a href="/overview/sasasap.html">START AGAIN</a></span>
                    <span><a href="/thanks.html">Special Thanks</a></span>
                    <span><search-er></search-er></span>
                    <img src="/assets/images/Craft.png" alt="">
                </nav>
                
            </header>`
    }
}

class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `<footer>The script is free to use even without attribution. <b>In Stars and Time</b> belongs to insertdisc5.</footer>`;
    }
}

class Sidebar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML =
        `<aside>
            <h2>The <abbr title="In Stars and Time">ISAT</abbr> Script</h2>
            <ul>
                <li>
                    <a href="/about.html">About</a>
                </li>
                <li>
                    <a href="/feed.xml">RSS Feed</a>
                </li>
                <li>
                    <a href="/portraits">Dialogue portrait names</a>
                </li>
                <li>
                    Want to contribute? Check out <a href="https://github.com/felikatze/isat-script-project">GitHub</a>!
                </li>
                <li>
                    For questions and requests, reach out on <a href="https://isat-script-project.tumblr.com/">Tumblr</a>.
                </li>
            </ul>
        </aside>`
    }
}

class Helper extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML =
        `<div id="settings" style="display: none">
            <button onclick="changeFontStyle(null)">Default font</button>
            <button onclick="changeFontStyle('CascadiaCode')">Cascadia Code</button>
            <button onclick="changeFontStyle('OpenDyslexic3')">OpenDyslexic3</button>
            <button onclick="toggleAnimations()">Toggle animations</button>
            <button onclick="toggleExpressions()" style="font-size: 0.95em">Toggle expressions</button>
            <button onclick="toggleChoices()">Toggle choices</button>
            <button onclick="changeWishStyle()">Change wish style</button>
        </div>
        <button onclick="toggleSettings()">Settings</button>
        <button onclick="topFunction()">Go to top</button>`
    }
}

customElements.define("head-er", Header);
customElements.define("foot-er", Footer);
customElements.define("side-bar", Sidebar);
customElements.define("help-er", Helper);



////////////////////////////////////////////////////////////////////////////////
//                            changers and toggles                            //
////////////////////////////////////////////////////////////////////////////////

function changeFontStyle(fontFamily) {
    // function to change Fonts
    // parameter: string fontFamily = name of the font you want to change the document to
    // appends style = "font-family: fontFamily" to almost all elements in the body + the body itself
    // writes current fontFamily into sessionStorage / removes it if the font was already set or fontFamily is null
    // pass fontFamily = null to reset to default
    var change;
    var elements = document.querySelectorAll("body, body *:not(script)");

    var isSetOrNull = elements[0].style.fontFamily == fontFamily || !fontFamily || fontFamily == "null";

    if(!isSetOrNull) {
        sessionStorage.setItem("font", fontFamily);
        change = (element) => element.style.fontFamily = fontFamily;
    }
    else {
        sessionStorage.removeItem("font");
        change = (element) => element.style.fontFamily = null;
    }

    elements.forEach(element => change(element));
}

function changeWishStyle() {
    var wishes = document.querySelectorAll(".wish");
    if (wishes.length > 0) {
        wishes.forEach(function(wish) {
            wish.classList.remove("wish");
            wish.classList.add("wish-alt");
        })
        sessionStorage.setItem("wishStyle", "alt");
        if (debugMode) {console.log("wish style alt")};
    } else {
        wishes = document.querySelectorAll(".wish-alt");
        if (wishes.length > 0) {
            wishes.forEach(function(wish) {
                wish.classList.remove("wish-alt");
                wish.classList.add("wish");
            })
            sessionStorage.setItem("wishStyle", "default");
            if (debugMode) {console.log("wish style default")};
        } else {
            if (debugMode) {console.log("no wish text found")};
        }
    }
}

function toggleExpressions(state = null) {
    document.querySelectorAll(".dialogue-expression").forEach(function(expression){
        if (state == true || state == null && expression.style.display == "none") {
            expression.style.display = "inline-flex";
            sessionStorage.setItem("expressionsToggle", "on");
        } else if (state == false || state == null && expression.style.display != "none") {
            expression.style.display = "none";
            sessionStorage.setItem("expressionsToggle", "off");
        }
    })
    if (debugMode) {
        if (sessionStorage.getItem("expressionsToggle") == "on") {
            console.log("expressions on!");
        } else {
            console.log("expressions off!");
        }
    }
}

function toggleChoices(state = null) {
    // toggle dialogue options (details) on/off
    document.querySelectorAll("details").forEach(function(details) {
        if (state == false || state == null && details.open == true) {
            details.removeAttribute("open");
        } else if (state == true || state == null && details.open != true) {
            details.setAttribute("open", "");
        }
    })
}

function toggleSettings(state = null) {
    var settings = document.getElementById("settings");
    if (state == true || state == null && settings.style.display == "none") {
        settings.style.display = "block";
    } else if (state == false || state == null && settings.style.display != "none") {
        settings.style.display = "none";
    }
}

// // //                           animations                           // // //

function toggleAnimations(state = null) {
    if (state == true || state == null && animationToggle == "off") {
        animationToggle = "on";
        applyShakeAnimation();
        applyWaveAnimation();
        sessionStorage.setItem("animationToggle", "on");
        if (debugMode) {console.log("animations on!")};
    } else if (state == false || state == null && animationToggle != "off") {
        animationToggle = "off";
        disableShakeAnimation();
        disableWaveAnimation();
        sessionStorage.setItem("animationToggle", "off");
        if (debugMode) {console.log("animations off!")};
    }
    return animationToggle;
}

function applyShakeAnimation() {
    var elements = document.querySelectorAll(".shake span");

    elements.forEach(function(span) {
        if (!(/\s/g.test(span.innerHTML))) {
            span.classList.remove("shake-visual");

            span.style.display = "inline-block"
            span.style.animation = `${shakeSpeed}s shake steps(2,jump-none) infinite ${-rand()}s normal`;

            span.style.setProperty("--shake-state-1",`translate(${srand() * shakeMagnitude}${shakeUnit},${srand() * shakeMagnitude}${shakeUnit})`);
            span.style.setProperty("--shake-state-2",`translate(${srand() * shakeMagnitude}${shakeUnit},${srand() * shakeMagnitude}${shakeUnit})`);
            span.style.setProperty("--shake-state-3",`translate(${srand() * shakeMagnitude}${shakeUnit},${srand() * shakeMagnitude}${shakeUnit})`);
        }
    })
}

function disableShakeAnimation() {
    var elements = document.querySelectorAll(".shake span");

    elements.forEach(function(span) {
        if (!(/\s/g.test(span.innerHTML))) {
            span.classList.add("shake-visual");
            span.style.animation = "none";
        }
    })
}

function applyWaveAnimation() {
    document.querySelectorAll(".wave span").forEach(function(span, index) {
        if (!(/\s/g.test(span.innerHTML))) {
            span.classList.remove("wave-visual");

            span.style.display = "inline-block"
            span.style.animation = `${waveSpeed}s wave linear infinite ${-index * wavelength}s alternate`;
            span.style.setProperty("--wave-amplitude", `${waveAmplitude}%`)
        }
    })
}

function disableWaveAnimation() {
    document.querySelectorAll(".wave span").forEach(function(span) {
        if (!(/\s/g.test(span.innerHTML))) {
            span.classList.add("wave-visual");
            span.style.animation = "none";
        }
    })
}

function applySettings() {
    var font = sessionStorage.getItem("font");
    if (!!font) {
        changeFontStyle(font);
    }

    if (sessionStorage.getItem("expressionsToggle") == "off") {
        toggleExpressions();
        if (debugMode) {console.log("toggled expressions off on load!")};
    }

    wrapAllCharacters(document.querySelectorAll(".shake, .wave"));
    if (sessionStorage.getItem("animationToggle") == "off") {
        toggleAnimations(false);
        if (debugMode) {console.log("toggled animations off on load!")};
    } else {
        toggleAnimations(true);
    }

    if (sessionStorage.getItem("wishStyle") == "alt") {
        changeWishStyle();
        if (debugMode) {console.log("changed wish style on load!")};
    }
}



////////////////////////////////////////////////////////////////////////////////
//                               other functions                              //
////////////////////////////////////////////////////////////////////////////////

window.onload = function() {
    updateButtonsPosition();
    applySettings();
    tooltipImages();
};

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function rand() {
    // https://oat.zone/markdown-plus/###
    return Math.floor(Math.random() * 100) / 100;
}
function srand() {
    // https://oat.zone/markdown-plus/###
    return rand() * 2 - 1;
}

Array.prototype.random = function () {
    // https://stackoverflow.com/a/24137301
    // for choosing random from array
    return this[Math.floor((Math.random()*this.length))];
}

function wrapCharacters(element) {
    // https://stackoverflow.com/a/9666441
    // https://jsfiddle.net/6bEuW/
    // wraps all characters in an element in a span
    var child = element.firstChild;
    while (child) {
        var nextSibling = child.nextSibling;
        if (child.nodeType === 1) {
            wrapCharacters(child);
        } else if (child.nodeType === 3) {
            var d_ = document.createDocumentFragment();
            for (var i = 0, len = child.nodeValue.length; i < len; i++) {
                var span = document.createElement("span");
                span.innerHTML = child.nodeValue.charAt(i);
                d_.appendChild(span);
            }
            child.parentNode.replaceChild(d_, child);
        }
        child = nextSibling;
    }
}

function wrapAllCharacters(elements) {
    elements.forEach(function(element) {
        wrapCharacters(element)
    })
}

function updateButtonsPosition() {
    if (window.innerWidth < 992) {
        var targetRect = document.querySelector("header").getBoundingClientRect();
        document.querySelector("help-er").style.top = Math.max(targetRect.bottom + 20, 20) + "px";
    } else {
        document.querySelector("help-er").style.top = ""
    }
}

window.onscroll = updateButtonsPosition;
window.onresize = updateButtonsPosition;



////////////////////////////////////////////////////////////////////////////////
//                               tooltip images                               //
////////////////////////////////////////////////////////////////////////////////

function tooltipImages() {

    var dialogueHeads = document.querySelectorAll(".dialogue-head");

    dialogueHeads.forEach(function(head, headIndex) {
        if (head.querySelector(".dialogue-expression") && !head.querySelector(".expression-exception")) {
            var nameElement = head.querySelector(".dialogue-name");
            var expressionElement = head.querySelector(".dialogue-expression");
            var nameReference;

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
                if (debugMode) {console.log(`exception found: name is ${nameElement.innerHTML}, but head ${headIndex} should be referencing ${nameReference}`)};
            }
            else if (head.querySelector(".expression-exception-loop")) {
                nameReference = "Loop";
                if (debugMode) {console.log(`exception found: name is ${nameElement.innerHTML}, but head ${headIndex} should be referencing ${nameReference}`)};
            }
            else if (head.querySelector(".expression-exception-siffrin")) {
                nameReference = "Siffrin";
                if (debugMode) {console.log(`exception found: name is ${nameElement.innerHTML}, but head ${headIndex} should be referencing ${nameReference}`)};
            }
            else {
                nameReference = nameElement.innerHTML;
            }

            var expression = expressionElement.innerHTML.replace(/\((.+)\)/i, "$1");
            expressionElement.appendChild(document.createElement("span"));
            var tooltip = expressionElement.firstElementChild;
            tooltip.classList.add("tooltip");

            var imageSrc = null;

            switch (nameReference) {

                case "Bonnie":
                    if (debugMode) {console.log(dialogueHeads[headIndex], `head ${headIndex} is bonnie`, expression)};

                    switch (expression) {
                        case "and then1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/ca/ISAT_Portrait_Bonnie_Pumped.png";
                            break;
                        case "angry1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/ea/ISAT_Portrait_Bonnie_Angry_1.png";
                            break;
                        case "angry2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/42/ISAT_Portrait_Bonnie_Angry_2.png";
                            break;
                        case "crying1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/20/ISAT_Portrait_Bonnie_Crying_1.png";
                            break;
                        case "crying2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/86/ISAT_Portrait_Bonnie_Crying_2.png";
                            break;
                        case "crying3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f8/ISAT_Portrait_Bonnie_Crying_3.png";
                            break;
                        case "crying4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/bd/ISAT_Portrait_Bonnie_Crying_4.png";
                            break;
                        case "crying5":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/06/ISAT_Portrait_Bonnie_Crying_5.png";
                            break;
                        case "crying6":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/98/ISAT_Portrait_Bonnie_Crying_6.png";
                            break;
                        case "ew1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/1c/ISAT_Portrait_Bonnie_Disgusted.png";
                            break;
                        case "expressionnumber":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/35/ISAT_Portrait_Bonnie_Neutral.png";
                            break;
                        case "happy1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/4a/ISAT_Portrait_Bonnie_Happy_1.png";
                            break;
                        case "happy2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/1f/ISAT_Portrait_Bonnie_Happy_2.png";
                            break;
                        case "hmf1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/0a/ISAT_Portrait_Bonnie_Hmf_1.png";
                            break;
                        case "hmf2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/0a/ISAT_Portrait_Bonnie_Hmf_2.png";
                            break;
                        case "hmf3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d0/ISAT_Portrait_Bonnie_Hmf_3.png";
                            break;
                        case "lmao1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/82/ISAT_Portrait_Bonnie_Ridiculing.png";
                            break;
                        case "lol1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/7e/ISAT_Portrait_Bonnie_Laughing_1.png";
                            break;
                        case "lol2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/98/ISAT_Portrait_Bonnie_Laughing_2.png";
                            break;
                        case "mock1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/2f/ISAT_Portrait_Bonnie_Mocking.png";
                            break;
                        case "no!1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f4/ISAT_Portrait_Bonnie_Yelling_1.png";
                            break;
                        case "no!2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/08/ISAT_Portrait_Bonnie_Yelling_2.png";
                            break;
                        case "oh!1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/bb/ISAT_Portrait_Bonnie_Pointing.png";
                            break;
                        case "proud1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/35/ISAT_Portrait_Bonnie_Proud.png";
                            break;
                        case "sad1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/de/ISAT_Portrait_Bonnie_Sad_1.png";
                            break;
                        case "sad2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f0/ISAT_Portrait_Bonnie_Sad_2.png";
                            break;
                        case "serious1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/ca/ISAT_Portrait_Bonnie_Serious.png";
                            break;
                        case "shy1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/19/ISAT_Portrait_Bonnie_Shy_1.png";
                            break;
                        case "shy2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/4b/ISAT_Portrait_Bonnie_Shy_2.png";
                            break;
                        case "smile1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/ac/ISAT_Portrait_Bonnie_Smile_1.png";
                            break;
                        case "smile2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/68/ISAT_Portrait_Bonnie_Smile_2.png";
                            break;
                        case "smile3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/32/ISAT_Portrait_Bonnie_Smile_3.png";
                            break;
                        case "smile4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/2f/ISAT_Portrait_Bonnie_Smile_4.png";
                            break;
                        case "spooky1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/68/ISAT_Portrait_Bonnie_Spooky.png";
                            break;
                        case "stop!1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/7a/ISAT_Portrait_Bonnie_Protesting_1.png";
                            break;
                        case "stop!2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d2/ISAT_Portrait_Bonnie_Protesting_2.png";
                            break;
                        case "sulk1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/df/ISAT_Portrait_Bonnie_Sulking_1.png";
                            break;
                        case "sulk2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/3e/ISAT_Portrait_Bonnie_Sulking_2.png";
                            break;
                        case "sulk3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/2b/ISAT_Portrait_Bonnie_Sulking_3.png";
                            break;
                        case "sulk4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b3/ISAT_Portrait_Bonnie_Sulking_4.png";
                            break;
                        case "sulk5":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/14/ISAT_Portrait_Bonnie_Sulking_5.png";
                            break;
                        case "surprised1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/6b/ISAT_Portrait_Bonnie_Surprised.png";
                            break;
                        case "UWAH1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/23/ISAT_Portrait_Bonnie_Flustered.png";
                            break;
                        case "victory1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f8/ISAT_Portrait_Bonnie_Victorious.png";
                            break;
                        case "wait1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/35/ISAT_Portrait_Bonnie_Confused.png";
                            break;
                        case "whichone1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/52/ISAT_Portrait_Bonnie_Troubled.png";
                            break;
                        case "wow1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/25/ISAT_Portrait_Bonnie_Awed.png";
                            break;
                        case "yeah!1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/3b/ISAT_Portrait_Bonnie_Excited_1.png";
                            break;
                        case "yeah!2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b6/ISAT_Portrait_Bonnie_Excited_2.png";
                            break;
                        case "yeah!3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f8/ISAT_Portrait_Bonnie_Excited_3.png";
                            break;
                        case "zomg":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b1/ISAT_Portrait_Bonnie_Flabbergasted.png";
                            break;
                        default:
                            if (debugMode) {console.log(nameElement, `(ERROR) expression '${expression}' not found for bonnie`)};
                            break;
                    }

                    break;

                case "Euphrasie":
                    if (debugMode) {console.log(dialogueHeads[headIndex], `head ${headIndex} is euphrasie`, expression)};

                    switch (expression) {
                        case "CRAB1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/3c/ISAT_Portrait_Head_Housemaiden_Shocked.png";
                            break;
                        case "ending1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/6f/ISAT_Portrait_Head_Housemaiden_Crying_1.png";
                            break;
                        case "ending2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/07/ISAT_Portrait_Head_Housemaiden_Crying_2.png";
                            break;
                        case "ending3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/42/ISAT_Portrait_Head_Housemaiden_Crying_3.png";
                            break;
                        case "ending4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d1/ISAT_Portrait_Head_Housemaiden_Crying_4.png";
                            break;
                        case "ending5":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/a8/ISAT_Portrait_Head_Housemaiden_Crying_5.png";
                            break;
                        case "expressionnumber":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b1/ISAT_Portrait_Head_Housemaiden_Smiling_1.png";
                            break;
                        case "mirabelle1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/23/ISAT_Portrait_Head_Housemaiden_Affectionate.png";
                            break;
                        case "oh1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/2b/ISAT_Portrait_Head_Housemaiden_Taken_Aback.png";
                            break;
                        case "smiling1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b1/ISAT_Portrait_Head_Housemaiden_Smiling_1.png";
                            break;
                        case "smiling2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b8/ISAT_Portrait_Head_Housemaiden_Smiling_2.png";
                            break;
                        case "smiling3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/5e/ISAT_Portrait_Head_Housemaiden_Smiling_3.png";
                            break;
                        case "smiling4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f1/ISAT_Portrait_Head_Housemaiden_Smiling_4.png";
                            break;
                        case "sorry1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/20/ISAT_Portrait_Head_Housemaiden_Apologizing_1.png";
                            break;
                        case "sorry2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/1c/ISAT_Portrait_Head_Housemaiden_Apologizing_2.png";
                            break;
                        case "sorry3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/5c/ISAT_Portrait_Head_Housemaiden_Apologizing_3.png";
                            break;
                        case "thankyou1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/6d/ISAT_Portrait_Head_Housemaiden_Grateful_1.png";
                            break;
                        case "thankyou2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/0a/ISAT_Portrait_Head_Housemaiden_Grateful_2.png";
                            break;
                        default:
                            if (debugMode) {console.log(nameElement, `(ERROR) expression '${expression}' not found for euphrasie`)};
                            break;
                    }

                    break;

                case "Isabeau":
                    if (debugMode) {console.log(dialogueHeads[headIndex], `head ${headIndex} is isabeau`, expression)};

                    switch (expression) {
                        case "angry1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/01/ISAT_Portrait_Isabeau_Angry_1.png";
                            break;
                        case "angry2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d4/ISAT_Portrait_Isabeau_Angry_2.png";
                            break;
                        case "angry3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/6e/ISAT_Portrait_Isabeau_Angry_3.png";
                            break;
                        case "awkward1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e7/ISAT_Portrait_Isabeau_Awkward.png";
                            break;
                        case "blank1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/22/ISAT_Portrait_Isabeau_Blank.png";
                            break;
                        case "blush1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/09/ISAT_Portrait_Isabeau_Blush_1.png";
                            break;
                        case "blush2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/50/ISAT_Portrait_Isabeau_Blush_2.png";
                            break;
                        case "blush3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/fb/ISAT_Portrait_Isabeau_Blush_3.png";
                            break;
                        case "boo1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/2f/ISAT_Portrait_Isabeau_Boo.png";
                            break;
                        case "brag1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/33/ISAT_Portrait_Isabeau_Brag.png";
                            break;
                        case "disappointed1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f7/ISAT_Portrait_Isabeau_Disappointed_1.png";
                            break;
                        case "disappointed2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f1/ISAT_Portrait_Isabeau_Disappointed_2.png";
                            break;
                        case "expressionnumber":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/59/ISAT_Portrait_Isabeau_Smile.png";
                            break;
                        case "fight1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c4/ISAT_Portrait_Isabeau_Fight_1.png";
                            break;
                        case "fight2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/90/ISAT_Portrait_Isabeau_Fight_2.png";
                            break;
                        case "fufufu1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/72/ISAT_Portrait_Isabeau_Fufufu.png";
                            break;
                        case "glare1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/9b/ISAT_Portrait_Isabeau_Glare.png";
                            break;
                        case "hahaaa1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/69/ISAT_Portrait_Isabeau_Awkward_Laugh.png";
                            break;
                        case "hahaha1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/81/ISAT_Portrait_Isabeau_Laugh_1.png";
                            break;
                        case "hahaha2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/3f/ISAT_Portrait_Isabeau_Laugh_2.png";
                            break;
                        case "happy1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/1b/ISAT_Portrait_Isabeau_Fond_2.png";
                            break;
                        case "hey1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/53/ISAT_Portrait_Isabeau_Startled_2.png";
                            break;
                        case "hm1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d4/ISAT_Portrait_Isabeau_Hm_1.png";
                            break;
                        case "hm2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/90/ISAT_Portrait_Isabeau_Hm_2.png";
                            break;
                        case "hm3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/72/ISAT_Portrait_Isabeau_Hm_3.png";
                            break;
                        case "hm4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d0/ISAT_Portrait_Isabeau_Hm_4.png";
                            break;
                        case "hm5":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/9a/ISAT_Portrait_Isabeau_Hm_5.png";
                            break;
                        case "huh1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/0b/ISAT_Portrait_Isabeau_Startled_1.png";
                            break;
                        case "huh2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/53/ISAT_Portrait_Isabeau_Startled_2.png";
                            break;
                        case "huh3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/1f/ISAT_Portrait_Isabeau_Startled_3.png";
                            break;
                        case "huhwah1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/8a/ISAT_Portrait_Isabeau_Alarmed.png";
                            break;
                        case "jhgsaghjsaghjas1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/6f/ISAT_Portrait_Isabeau_Keysmash.png";
                            break;
                        case "LMAO1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/7c/ISAT_Portrait_Isabeau_Guffaw.png";
                            break;
                        case "neutral1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/35/ISAT_Portrait_Isabeau_Neutral_1.png";
                            break;
                        case "neutral2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/46/ISAT_Portrait_Isabeau_Neutral_2.png";
                            break;
                        case "NO!1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/ec/ISAT_Portrait_Isabeau_Weeping.png";
                            break;
                        case "oh1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/7e/ISAT_Portrait_Isabeau_Oh.png";
                            break;
                        case "omgggg1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/ea/ISAT_Portrait_Isabeau_Flustered.png";
                            break;
                        case "practice1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/ca/ISAT_Portrait_Isabeau_Fond_1.png";
                            break;
                        case "really1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/90/ISAT_Portrait_Isabeau_Really_1.png";
                            break;
                        case "really2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c1/ISAT_Portrait_Isabeau_Really_2.png";
                            break;
                        case "really3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c7/ISAT_Portrait_Isabeau_Really_3.png";
                            break;
                        case "sad1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/50/ISAT_Portrait_Isabeau_Sad_1.png";
                            break;
                        case "sad2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/7d/ISAT_Portrait_Isabeau_Sad_2.png";
                            break;
                        case "sad3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e3/ISAT_Portrait_Isabeau_Sad_3.png";
                            break;
                        case "sad4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/4e/ISAT_Portrait_Isabeau_Sad_4.png";
                            break;
                        case "sad5":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/72/ISAT_Portrait_Isabeau_Sad_5.png";
                            break;
                        case "scared1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/09/ISAT_Portrait_Isabeau_Scared.png";
                            break;
                        case "shock1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/02/ISAT_Portrait_Isabeau_Shocked_1.png";
                            break;
                        case "shock2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/a3/ISAT_Portrait_Isabeau_Shocked_2.png";
                            break;
                        case "shock3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/ab/ISAT_Portrait_Isabeau_Shocked_3.png";
                            break;
                        case "shy1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/1c/ISAT_Portrait_Isabeau_Shy_1.png";
                            break;
                        case "shy2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/27/ISAT_Portrait_Isabeau_Shy_2.png";
                            break;
                        case "sif!1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/7e/ISAT_Portrait_Isabeau_Affectionate.png";
                            break;
                        case "sniff1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e6/ISAT_Portrait_Isabeau_Sniff.png";
                            break;
                        case "spooky1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/5a/ISAT_Portrait_Isabeau_Spooky.png";
                            break;
                        case "surprised1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/0b/ISAT_Portrait_Isabeau_Startled_1.png";
                            break;
                        case "um1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/61/ISAT_Portrait_Isabeau_Um.png";
                            break;
                        case "up1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f1/ISAT_Portrait_Isabeau_Looking_Up.png";
                            break;
                        case "uwah!1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/dd/ISAT_Portrait_Isabeau_Uwah.png";
                            break;
                        case "weh1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/be/ISAT_Portrait_Isabeau_Weh.png";
                            break;
                        case "wonder1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/97/ISAT_Portrait_Isabeau_Wonder_1.png";
                            break;
                        case "wonder2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/33/ISAT_Portrait_Isabeau_Wonder_2.png";
                            break;
                        case "worried1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/0a/ISAT_Portrait_Isabeau_Worried_1.png";
                            break;
                        case "worried2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/65/ISAT_Portrait_Isabeau_Worried_2.png";
                            break;
                        case "yeah!1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/bc/ISAT_Portrait_Isabeau_Yeah.png";
                            break;
                        default:
                            if (debugMode) {console.log(nameElement, `(ERROR) expression '${expression}' not found for isabeau`)};
                            break;
                    }

                    break;

                case "King":
                    if (debugMode) {console.log(dialogueHeads[headIndex], `head ${headIndex} is the king`, expression)};
                    imageSrc = "https://instarsandtime.wiki.gg/images/a/a5/ISAT_Portrait_King.png";
                    break;

                case "Loop":
                    if (debugMode) {console.log(dialogueHeads[headIndex], `head ${headIndex} is loop`, expression)};

                    switch (expression) {
                        case "angry1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b3/ISAT_Portrait_Loop_Angry.png";
                            break;
                        case "away1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/76/ISAT_Portrait_Loop_Looking_Away.png";
                            break;
                        case "ew1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e3/ISAT_Portrait_Loop_Urgh.png";
                            break;
                        case "expressionnumber":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/da/ISAT_Portrait_Loop_LOL_1.png";
                            break;
                        case "fake1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/0b/ISAT_Portrait_Loop_Fake_1.png";
                            break;
                        case "fake2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/23/ISAT_Portrait_Loop_Fake_2.png"
                            break;
                        case "guilty1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/23/ISAT_Portrait_Loop_Guilty_1.png";
                            break;
                        case "guilty2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/35/ISAT_Portrait_Loop_Guilty_2.png";
                            break;
                        case "happy1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/6d/ISAT_Portrait_Loop_Happy_1.png";
                            break;
                        case "happy2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/9c/ISAT_Portrait_Loop_Happy_2.png";
                            break;
                        case "happy3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f1/ISAT_Portrait_Loop_Happy_3.png";
                            break;
                        case "hm1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e3/ISAT_Portrait_Loop_Considering.png";
                            break;
                        case "hmmm1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/de/ISAT_Portrait_Loop_Thinking.png";
                            break;
                        case "lol1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/da/ISAT_Portrait_Loop_LOL_1.png";
                            break;
                        case "lol2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/6f/ISAT_Portrait_Loop_LOL_2.png";
                            break;
                        case "lol3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/a6/ISAT_Portrait_Loop_LOL_3.png";
                            break;
                        case "lol4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/1a/ISAT_Portrait_Loop_LOL_4.png";
                            break;
                        case "lol5":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d9/ISAT_Portrait_Loop_LOL_5.png";
                            break;
                        case "lol6":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/50/ISAT_Portrait_Loop_LOL_6.png";
                            break;
                        case "oh my1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/df/ISAT_Portrait_Loop_Fake_Shocked.png";
                            break;
                        case "oh1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/38/ISAT_Portrait_Loop_Oh.png";
                            break;
                        case "possessed1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/6d/ISAT_Portrait_Loop_Possessed.png";
                            break;
                        case "sad1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/3f/ISAT_Portrait_Loop_Sad_1.png";
                            break;
                        case "sad2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e7/ISAT_Portrait_Loop_Sad_2.png";
                            break;
                        case "serious1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/26/ISAT_Portrait_Loop_Serious_1.png";
                            break;
                        case "serious2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e0/ISAT_Portrait_Loop_Serious_2.png";
                            break;
                        case "shock1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/5f/ISAT_Portrait_Loop_Shock_1.png";
                            break;
                        case "shock2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/2b/ISAT_Portrait_Loop_Shock_2.png";
                            break;
                        case "subdued1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/78/ISAT_Portrait_Loop_Subdued.png";
                            break;
                        case "teehee1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/43/ISAT_Portrait_Loop_Teehee_1.png";
                            break;
                        case "teehee2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/0a/ISAT_Portrait_Loop_Teehee_2.png";
                            break;
                        case "teehee3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/21/ISAT_Portrait_Loop_Teehee_3.png";
                            break;
                        case "teehee4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/35/ISAT_Portrait_Loop_Teehee_4.png";
                            break;
                        case "teehee5":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/33/ISAT_Portrait_Loop_Teehee_5.png";
                            break;
                        case "urgh1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e3/ISAT_Portrait_Loop_Urgh.png";
                            break;
                        case "well1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/5b/ISAT_Portrait_Loop_Well_1.png";
                            break;
                        case "well2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/91/ISAT_Portrait_Loop_Well_2.png";
                            break;
                        case "well3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/78/ISAT_Portrait_Loop_Well_3.png";
                            break;
                        case "well4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b2/ISAT_Portrait_Loop_Well_4.png";
                            break;
                        default:
                            if (debugMode) {console.log(nameElement, `(ERROR) expression '${expression}' not found for loop`)};
                            break;
                    }

                    break;

                case "Mirabelle":
                    if (debugMode) {console.log(dialogueHeads[headIndex], `head ${headIndex} is mirabelle`, expression)};

                    switch (expression) {
                        case "angry1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/a8/ISAT_Portrait_Mirabelle_Angry_1.png";
                            break;
                        case "angry2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/56/ISAT_Portrait_Mirabelle_Angry_2.png";
                            break;
                        case "angry3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b0/ISAT_Portrait_Mirabelle_Angry_3.png";
                            break;
                        case "angry4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/af/ISAT_Portrait_Mirabelle_Angry_4.png";
                            break;
                        case "angry5":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d8/ISAT_Portrait_Mirabelle_Angry_5.png";
                            break;
                        case "angy1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/ed/ISAT_Portrait_Mirabelle_Irritated.png";
                            break;
                        case "anxious1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/72/ISAT_Portrait_Mirabelle_Anxious_1.png";
                            break;
                        case "anxious2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/ad/ISAT_Portrait_Mirabelle_Anxious_2.png";
                            break;
                        case "anxious3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/65/ISAT_Portrait_Mirabelle_Anxious_3.png";
                            break;
                        case "awawa1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/ad/ISAT_Portrait_Mirabelle_Panicking.png";
                            break;
                        case "awkward1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/06/ISAT_Portrait_Mirabelle_Awkward_1a.png";
                            break;
                        case "awkward1b":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/1b/ISAT_Portrait_Mirabelle_Awkward_1b.png";
                            break;
                        case "awkward2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/af/ISAT_Portrait_Mirabelle_Awkward_2.png";
                            break;
                        case "excited1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/8f/ISAT_Portrait_Mirabelle_Excited.png";
                            break;
                        case "expressionnumber":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/1b/ISAT_Portrait_Mirabelle_Awkward_1b.png";
                            break;
                        case "fight1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f5/ISAT_Portrait_Mirabelle_Fight_1.png";
                            break;
                        case "fight2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/1f/ISAT_Portrait_Mirabelle_Fight_2.png";
                            break;
                        case "fight3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/94/ISAT_Portrait_Mirabelle_Fight_3.png";
                            break;
                        case "fight4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c6/ISAT_Portrait_Mirabelle_Fight_4.png";
                            break;
                        case "fight5":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/a1/ISAT_Portrait_Mirabelle_Fight_5.png";
                            break;
                        case "gentle1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/ab/ISAT_Portrait_Mirabelle_Gentle_1.png";
                            break;
                        case "gentle2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/eb/ISAT_Portrait_Mirabelle_Gentle_2.png";
                            break;
                        case "haha1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f3/ISAT_Portrait_Mirabelle_Laughing.png";
                            break;
                        case "happy1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/6b/ISAT_Portrait_Mirabelle_Happy_1.png";
                            break;
                        case "happy2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/fa/ISAT_Portrait_Mirabelle_Happy_2.png";
                            break;
                        case "happy3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c1/ISAT_Portrait_Mirabelle_Happy_3.png";
                            break;
                        case "happy4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/54/ISAT_Portrait_Mirabelle_Happy_4.png";
                            break;
                        case "hm1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/04/ISAT_Portrait_Mirabelle_Contemplative_1.png";
                            break;
                        case "hm2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/9a/ISAT_Portrait_Mirabelle_Contemplative_2.png";
                            break;
                        case "hm3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/7c/ISAT_Portrait_Mirabelle_Contemplative_3.png";
                            break;
                        case "hmf1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/64/ISAT_Portrait_Mirabelle_Hmf.png";
                            break;
                        case "neutral1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f9/ISAT_Portrait_Mirabelle_Neutral.png";
                            break;
                        case "no!1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/1d/ISAT_Portrait_Mirabelle_Horrified_1.png";
                            break;
                        case "no!2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c6/ISAT_Portrait_Mirabelle_Horrified_2.png";
                            break;
                        case "oh!1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f4/ISAT_Portrait_Mirabelle_Surprised.png";
                            break;
                        case "pft1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/79/ISAT_Portrait_Mirabelle_Chuckling.png";
                            break;
                        case "sad1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/6c/ISAT_Portrait_Mirabelle_Sad_1.png";
                            break;
                        case "sad2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/7d/ISAT_Portrait_Mirabelle_Sad_2.png";
                            break;
                        case "sad3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/22/ISAT_Portrait_Mirabelle_Sad_3.png";
                            break;
                        case "sad4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/96/ISAT_Portrait_Mirabelle_Sad_4.png";
                            break;
                        case "serious1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/51/ISAT_Portrait_Mirabelle_Serious_1.png";
                            break;
                        case "serious2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/19/ISAT_Portrait_Mirabelle_Serious_2.png";
                            break;
                        case "serious3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/42/ISAT_Portrait_Mirabelle_Serious_3.png";
                            break;
                        case "serious4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/0a/ISAT_Portrait_Mirabelle_Serious_4.png";
                            break;
                        case "serious5":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e5/ISAT_Portrait_Mirabelle_Serious_5.png";
                            break;
                        case "spooky1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/de/ISAT_Portrait_Mirabelle_Spooky.png";
                            break;
                        case "stressed1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/07/ISAT_Portrait_Mirabelle_Stressed_1.png";
                            break;
                        case "stressed2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b8/ISAT_Portrait_Mirabelle_Stressed_2.png";
                            break;
                        case "stressed3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/96/ISAT_Portrait_Mirabelle_Thinking.png";
                            break;
                        case "thinking1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/96/ISAT_Portrait_Mirabelle_Thinking.png";
                            break;
                        case "uwah!1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d2/ISAT_Portrait_Mirabelle_Uwah.png";
                            break;
                        case "wonder1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/9c/ISAT_Portrait_Mirabelle_Wondering.png";
                            break;
                        case "worried1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d0/ISAT_Portrait_Mirabelle_Worried.png";
                            break;
                        case "yell1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/02/ISAT_Portrait_Mirabelle_Yelling.png";
                            break;
                        default:
                            if (debugMode) {console.log(nameElement, `(ERROR) expression '${expression}' not found for mirabelle`)};
                            break;
                    }

                    break;

                case "Odile":
                    if (debugMode) {console.log(dialogueHeads[headIndex], `head ${headIndex} is odile`, expression)};

                    switch (expression) {
                        case "angry1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/53/ISAT_Portrait_Odile_Angry_1.png";
                            break;
                        case "angry2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c6/ISAT_Portrait_Odile_Angry_2.png";
                            break;
                        case "angry3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/84/ISAT_Portrait_Odile_Angry_3.png";
                            break;
                        case "angryBUTSUPER1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/88/ISAT_Portrait_Odile_Furious_1.png";
                            break;
                        case "angryBUTSUPER2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f6/ISAT_Portrait_Odile_Furious_2.png";
                            break;
                        case "awkward1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/fa/ISAT_Portrait_Odile_Awkward.png";
                            break;
                        case "dotdotdot1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/44/ISAT_Portrait_Odile_Dotdotdot_1.png";
                            break;
                        case "dotdotdot2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/34/ISAT_Portrait_Odile_Dotdotdot_2.png";
                            break;
                        case "dotdotdot3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/0c/ISAT_Portrait_Odile_Dotdotdot_3.png";
                            break;
                        case "doubt1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/25/ISAT_Portrait_Odile_Doubt.png";
                            break;
                        case "expressionnumber":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/bb/ISAT_Portrait_Odile_Reading_1.png";
                            break;
                        case "fight1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/bf/ISAT_Portrait_Odile_Fight.png";
                            break;
                        case "gentle1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/75/ISAT_Portrait_Odile_Gentle.png";
                            break;
                        case "gimme1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/68/ISAT_Portrait_Odile_Gimme.png";
                            break;
                        case "guilty1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/cd/ISAT_Portrait_Odile_Guilty_1.png";
                            break;
                        case "guilty2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/ce/ISAT_Portrait_Odile_Guilty_2.png";
                            break;
                        case "hm1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/fa/ISAT_Portrait_Odile_Hm_1.png";
                            break;
                        case "hm2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/9d/ISAT_Portrait_Odile_Hm_2.png";
                            break;
                        case "huh1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/a2/ISAT_Portrait_Odile_Huh_1.png";
                            break;
                        case "huh2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/2b/ISAT_Portrait_Odile_Huh_2.png";
                            break;
                        case "huh3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d2/ISAT_Portrait_Odile_Huh_3.png";
                            break;
                        case "isthatso1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/a1/ISAT_Portrait_Odile_Amused.png";
                            break;
                        case "laugh1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/68/ISAT_Portrait_Odile_Laugh.png";
                            break;
                        case "lol1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/19/ISAT_Portrait_Odile_LOL_1.png";
                            break;
                        case "lol2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/37/ISAT_Portrait_Odile_LOL_2.png";
                            break;
                        case "lol3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/4f/ISAT_Portrait_Odile_LOL_3.png";
                            break;
                        case "lol4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c1/ISAT_Portrait_Odile_LOL_4.png";
                            break;
                        case "melan1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/60/ISAT_Portrait_Odile_Melancholy_1.png";
                            break;
                        case "melan2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/1c/ISAT_Portrait_Odile_Melancholy_2.png";
                            break;
                        case "melan3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/71/ISAT_Portrait_Odile_Melancholy_3.png";
                            break;
                        case "melan4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/70/ISAT_Portrait_Odile_Melancholy_4.png";
                            break;
                        case "melan5":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d3/ISAT_Portrait_Odile_Melancholy_5.png";
                            break;
                        case "melan6":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/3b/ISAT_Portrait_Odile_Melancholy_6.png";
                            break;
                        case "no!1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e7/ISAT_Portrait_Odile_No.png";
                            break;
                        case "question1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/32/ISAT_Portrait_Odile_Question_1.png";
                            break;
                        case "question2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/6d/ISAT_Portrait_Odile_Question_2.png";
                            break;
                        case "reading1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/bb/ISAT_Portrait_Odile_Reading_1.png";
                            break;
                        case "reading2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/48/ISAT_Portrait_Odile_Reading_2.png";
                            break;
                        case "sad1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/98/ISAT_Portrait_Odile_Sad.png";
                            break;
                        case "serious1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/5a/ISAT_Portrait_Odile_Serious_1.png";
                            break;
                        case "serious2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/2b/ISAT_Portrait_Odile_Serious_2.png";
                            break;
                        case "serious3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/30/ISAT_Portrait_Odile_Serious_3.png";
                            break;
                        case "serious4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/4b/ISAT_Portrait_Odile_Serious_4.png";
                            break;
                        case "sigh1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/59/ISAT_Portrait_Odile_Sigh_1.png";
                            break;
                        case "smile1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/cf/ISAT_Portrait_Odile_Smile.png";
                            break;
                        case "spooky1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/64/ISAT_Portrait_Odile_Spooky.png";
                            break;
                        case "up1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/fe/ISAT_Portrait_Odile_Looking_Up.png";
                            break;
                        case "urgh1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/20/ISAT_Portrait_Odile_Urgh.png";
                            break;
                        case "uwah!1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/4b/ISAT_Portrait_Odile_Shocked.png";
                            break;
                        case "wellactually1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/5e/ISAT_Portrait_Odile_Well_Actually.png";
                            break;
                        case "what1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b9/ISAT_Portrait_Odile_What_1.png";
                            break;
                        case "what2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d9/ISAT_Portrait_Odile_What_2.png";
                            break;
                        case "wonder1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b6/ISAT_Portrait_Odile_Wonder_1.png";
                            break;
                        case "wonder2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/da/ISAT_Portrait_Odile_Wonder_2.png";
                            break;
                        case "wonder3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/25/ISAT_Portrait_Odile_Wonder_3.png";
                            break;
                        case "worried1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/ae/ISAT_Portrait_Odile_Worried_1.png";
                            break;
                        case "worried2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/68/ISAT_Portrait_Odile_Worried_2.png";
                            break;
                        case "wry1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/66/ISAT_Portrait_Odile_Wry.png";
                            break;
                        case "yeah1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/5d/ISAT_Portrait_Odile_Yeah.png";
                            break;
                        default:
                            if (debugMode) {console.log(nameElement, `(ERROR) expression '${expression}' not found for odile`)};
                            break;
                    }

                    break;

                case "Siffrin":
                    if (debugMode) {console.log(dialogueHeads[headIndex], `head ${headIndex} is siffrin`, expression)};

                    switch (expression) {
                        case "angry1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/fc/ISAT_Portrait_Siffrin_Angry_1.png";
                            break;
                        case "angry2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b8/ISAT_Portrait_Siffrin_Angry_2.png";
                            break;
                        case "angry3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e6/ISAT_Portrait_Siffrin_Angry_3.png";
                            break;
                        case "angry4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/8c/ISAT_Portrait_Siffrin_Angry_4.png";
                            break;
                        case "awkward1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f3/ISAT_Portrait_Siffrin_Awkward.png";
                            break;
                        case "blep1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/7a/ISAT_Portrait_Siffrin_Blep.png";
                            break;
                        case "boo1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/ab/ISAT_Portrait_Siffrin_Boo.png";
                            break;
                        case "expressionnumber":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/eb/ISAT_Portrait_Siffrin_Smiling_4.png";
                            break;
                        case "fake1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/25/ISAT_Portrait_Siffrin_Fake_1.png";
                            break;
                        case "fake2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/8f/ISAT_Portrait_Siffrin_Fake_2.png";
                            break;
                        case "fake3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e7/ISAT_Portrait_Siffrin_Fake_3.png";
                            break;
                        case "fake4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d4/ISAT_Portrait_Siffrin_Fake_4.png";
                            break;
                        case "fake5":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/53/ISAT_Portrait_Siffrin_Fake_5.png";
                            break;
                        case "fight1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/4d/ISAT_Portrait_Siffrin_Fight_1.png";
                            break;
                        case "fight2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/60/ISAT_Portrait_Siffrin_Fight_2.png";
                            break;
                        case "fight3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/1f/ISAT_Portrait_Siffrin_Fight_3.png";
                            break;
                        case "fight4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d5/ISAT_Portrait_Siffrin_Fight_4.png";
                            break;
                        case "fight5":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e9/ISAT_Portrait_Siffrin_Fight_5.png";
                            break;
                        case "fufu1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/4d/ISAT_Portrait_Siffrin_Fufu.png";
                            break;
                        case "happy1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/cf/ISAT_Portrait_Siffrin_Happy.png";
                            break;
                        case "hide1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/86/ISAT_Portrait_Siffrin_Hide_1.png";
                            break;
                        case "hide2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b8/ISAT_Portrait_Siffrin_Hide_2.png";
                            break;
                        case "hide3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/88/ISAT_Portrait_Siffrin_Hide_3.png";
                            break;
                        case "hide4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/db/ISAT_Portrait_Siffrin_Hide_4.png";
                            break;
                        case "hide5":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/25/ISAT_Portrait_Siffrin_Hide_5.png";
                            break;
                        case "hide6":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/fd/ISAT_Portrait_Siffrin_Hide_6.png";
                            break;
                        case "joke1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/98/ISAT_Portrait_Siffrin_Joke_1.png";
                            break;
                        case "joke2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/bb/ISAT_Portrait_Siffrin_Joke_2.png";
                            break;
                        case "lmao1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/77/ISAT_Portrait_Siffrin_LMAO.png";
                            break;
                        case "lol1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f8/ISAT_Portrait_Siffrin_LOL.png";
                            break;
                        case "lost1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/4b/ISAT_Portrait_Siffrin_Lost.png";
                            break;
                        case "neutral1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/09/ISAT_Portrait_Siffrin_Neutral_1.png";
                            break;
                        case "neutral2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/02/ISAT_Portrait_Siffrin_Neutral_2.png";
                            break;
                        case "neutral3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/74/ISAT_Portrait_Siffrin_Neutral_3.png";
                            break;
                        case "n-nya1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/98/ISAT_Portrait_Siffrin_Startled_1.png";
                            break;
                        case "n-nya2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/a3/ISAT_Portrait_Siffrin_Startled_2.png";
                            break;
                        case "no!!!1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/69/ISAT_Portrait_Siffrin_Horrified_1.png";
                            break;
                        case "no!!!2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/88/ISAT_Portrait_Siffrin_Horrified_2.png";
                            break;
                        case "no1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c4/ISAT_Portrait_Siffrin_Emotional.png";
                            break;
                        case "nya1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/65/ISAT_Portrait_Siffrin_Grin.png";
                            break;
                        case "okay1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c6/ISAT_Portrait_Siffrin_Disbelieving_1.png";
                            break;
                        case "okay2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e0/ISAT_Portrait_Siffrin_Disbelieving_2.png";
                            break;
                        case "omg1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e4/ISAT_Portrait_Siffrin_Ecstatic_1.png";
                            break;
                        case "omg2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/20/ISAT_Portrait_Siffrin_Ecstatic_2.png";
                            break;
                        case "questions1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/52/ISAT_Portrait_Siffrin_Questioning_1.png";
                            break;
                        case "questions2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e4/ISAT_Portrait_Siffrin_Questioning_2.png";
                            break;
                        case "sad1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/6d/ISAT_Portrait_Siffrin_Sad_1.png";
                            break;
                        case "sad2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c8/ISAT_Portrait_Siffrin_Sad_2.png";
                            break;
                        case "sadsmile1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/0d/ISAT_Portrait_Siffrin_Sad_Smile_1.png";
                            break;
                        case "sadsmile2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/8d/ISAT_Portrait_Siffrin_Sad_Smile_2.png";
                            break;
                        case "sadsmile3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/ce/ISAT_Portrait_Siffrin_Sad_Smile_3.png";
                            break;
                        case "sadsmile4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/15/ISAT_Portrait_Siffrin_Sad_Smile_4.png";
                            break;
                        case "sadsmile5":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f5/ISAT_Portrait_Siffrin_Sad_Smile_5.png";
                            break;
                        case "scary1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/07/ISAT_Portrait_Siffrin_Scary_1.png";
                            break;
                        case "scary2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/cc/ISAT_Portrait_Siffrin_Scary_2.png";
                            break;
                        case "scary3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d0/ISAT_Portrait_Siffrin_Scary_3.png";
                            break;
                        case "serious1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/db/ISAT_Portrait_Siffrin_Serious.png";
                            break;
                        case "shit1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/5b/ISAT_Portrait_Siffrin_Troubled.png";
                            break;
                        case "siiiiigh1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/52/ISAT_Portrait_Siffrin_Sigh.png";
                            break;
                        case "smiling1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/80/ISAT_Portrait_Siffrin_Smiling_1.png";
                            break;
                        case "smiling2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/07/ISAT_Portrait_Siffrin_Smiling_2.png";
                            break;
                        case "smiling3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/66/ISAT_Portrait_Siffrin_Smiling_3.png";
                            break;
                        case "stuffed1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/6a/ISAT_Portrait_Siffrin_Stuffed.png";
                            break;
                        case "surprised1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/69/ISAT_Portrait_Siffrin_Surprised_1.png";
                            break;
                        case "surprised2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/ca/ISAT_Portrait_Siffrin_Surprised_2.png";
                            break;
                        case "surprised3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/6b/ISAT_Portrait_Siffrin_Surprised_3.png";
                            break;
                        case "terrified1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/50/ISAT_Portrait_Siffrin_Terrified.png";
                            break;
                        case "tired1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/0f/ISAT_Portrait_Siffrin_Tired_1.png";
                            break;
                        case "tired2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/2c/ISAT_Portrait_Siffrin_Tired_2.png";
                            break;
                        case "um1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/da/ISAT_Portrait_Siffrin_Um_1.png";
                            break;
                        case "um2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/9a/ISAT_Portrait_Siffrin_Um_2.png";
                            break;
                        case "unhinged1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c0/ISAT_Portrait_Siffrin_Unhinged_1.png";
                            break;
                        case "unhinged2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b9/ISAT_Portrait_Siffrin_Unhinged_2.png";
                            break;
                        case "unhinged3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/8e/ISAT_Portrait_Siffrin_Unhinged_3.png";
                            break;
                        case "unhinged4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b5/ISAT_Portrait_Siffrin_Unhinged_4.png";
                            break;
                        case "upset1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/7c/ISAT_Portrait_Siffrin_Upset.png";
                            break;
                        case "what1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e3/ISAT_Portrait_Siffrin_What_1.png";
                            break;
                        case "what2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/92/ISAT_Portrait_Siffrin_What_2.png";
                            break;
                        case "what3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f1/ISAT_Portrait_Siffrin_What_3.png";
                            break;
                        case "yelling1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/07/ISAT_Portrait_Siffrin_Yelling_1.png";
                            break;
                        case "yelling2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/46/ISAT_Portrait_Siffrin_Yelling_2.png";
                            break;
                        case "yelling2b":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/75/ISAT_Portrait_Siffrin_Yelling_2b.png";
                            break;
                        case "yelling3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/65/ISAT_Portrait_Siffrin_Yelling_3.png";
                            break;
                        case "yelling4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/8f/ISAT_Portrait_Siffrin_Yelling_4.png";
                            break;
                        case "TS_angry1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/2b/ISAT_Portrait_Siffrin_Angry_1_ACT5.png";
                            break;
                        case "TS_angry2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/9e/ISAT_Portrait_Siffrin_Angry_2_ACT5.png";
                            break;
                        case "TS_away1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/76/ISAT_Portrait_Siffrin_Looking_Away_1.png";
                            break;
                        case "TS_away2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c8/ISAT_Portrait_Siffrin_Looking_Away_2.png";
                            break;
                        case "TS_busted1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/87/ISAT_Portrait_Siffrin_Busted_1.png";
                            break;
                        case "TS_busted2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/55/ISAT_Portrait_Siffrin_Busted_2.png";
                            break;
                        case "TS_despair1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/a8/ISAT_Portrait_Siffrin_Despair_1.png";
                            break;
                        case "TS_despair2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/ff/ISAT_Portrait_Siffrin_Despair_2.png";
                            break;
                        case "TS_dismissive1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/65/ISAT_Portrait_Siffrin_Dismissive_1.png";
                            break;
                        case "TS_dismissive2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c5/ISAT_Portrait_Siffrin_Dismissive_2.png";
                            break;
                        case "TS_dotdotdot1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/4e/ISAT_Portrait_Siffrin_Dotdotdot.png";
                            break;
                        case "TS_fake1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/fb/ISAT_Portrait_Siffrin_Fake_1_ACT5.png";
                            break;
                        case "TS_fake1b":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/56/ISAT_Portrait_Siffrin_Fake_1b_ACT5.png";
                            break;
                        case "TS_fake2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d5/ISAT_Portrait_Siffrin_Fake_2_ACT5.png";
                            break;
                        case "TS_fake2b":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/6b/ISAT_Portrait_Siffrin_Fake_2b_ACT5.png";
                            break;
                        case "TS_fake2c":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/ca/ISAT_Portrait_Siffrin_Fake_2c_ACT5.png";
                            break;
                        case "TS_normal1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/ee/ISAT_Portrait_Siffrin_Normal_1.png";
                            break;
                        case "TS_normal2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/84/ISAT_Portrait_Siffrin_Normal_2.png";
                            break;
                        case "TS_normal3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/96/ISAT_Portrait_Siffrin_Normal_3.png";
                            break;
                        case "TS_shocked1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/45/ISAT_Portrait_Siffrin_Shocked_1.png";
                            break;
                        case "TS_shocked2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f4/ISAT_Portrait_Siffrin_Shocked_2.png";
                            break;
                        case "TS_spooky1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e3/ISAT_Portrait_Siffrin_Spooky.png";
                            break;
                        case "TS_unhinged1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/24/ISAT_Portrait_Siffrin_Unhinged_1_ACT5.png";
                            break;
                        case "TS_unhinged2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/89/ISAT_Portrait_Siffrin_Unhinged_2_ACT5.png";
                            break;
                        case "TS_yahoo2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/cc/ISAT_Portrait_Siffrin_Despair_3.png";
                            break;
                        case "US_awawa1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/8e/ISAT_Portrait_Siffrin_Flustered_1.png";
                            break;
                        case "US_awawa2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/6d/ISAT_Portrait_Siffrin_Flustered_2.png";
                            break;
                        case "US_expressionnumber":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/a8/ISAT_Portrait_Siffrin_Blep_ACT6.png";
                            break;
                        case "US_fufufu1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/da/ISAT_Portrait_Siffrin_Fufu_ACT6.png";
                            break;
                        case "US_guilty1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/81/ISAT_Portrait_Siffrin_Guilty_1.png";
                            break;
                        case "US_guilty2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/92/ISAT_Portrait_Siffrin_Guilty_2.png";
                            break;
                        case "US_happy1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/00/ISAT_Portrait_Siffrin_Happy_1_ACT6.png";
                            break;
                        case "US_happy2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/ee/ISAT_Portrait_Siffrin_Happy_2_ACT6.png";
                            break;
                        case "US_happyy1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/4c/ISAT_Portrait_Siffrin_Joyful.png";
                            break;
                        case "US_hnnn1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/61/ISAT_Portrait_Siffrin_Embarrassed.png";
                            break;
                        case "US_joke1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/2e/ISAT_Portrait_Siffrin_Joke_ACT6.png";
                            break;
                        case "US_maybeweshould1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c1/ISAT_Portrait_Siffrin_Maybe_We_Should.png";
                            break;
                        case "US_neutral1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/74/ISAT_Portrait_Siffrin_Neutral_ACT6.png";
                            break;
                        case "US_no!1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d1/ISAT_Portrait_Siffrin_Horrified_1_ACT6.png";
                            break;
                        case "US_no!2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c4/ISAT_Portrait_Siffrin_Horrified_2_ACT6.png";
                            break;
                        case "US_ohshit1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/0b/ISAT_Portrait_Siffrin_Yikes.png";
                            break;
                        case "US_question1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/39/ISAT_Portrait_Siffrin_Questioning_ACT6.png";
                            break;
                        case "US_sad1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/70/ISAT_Portrait_Siffrin_Sad_1_ACT6.png";
                            break;
                        case "US_sad2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/ef/ISAT_Portrait_Siffrin_Sad_2_ACT6.png";
                            break;
                        case "US_sad3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/47/ISAT_Portrait_Siffrin_Sad_3_ACT6.png";
                            break;
                        case "US_sad4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/04/ISAT_Portrait_Siffrin_Sad_4_ACT6.png";
                            break;
                        case "US_sadsmile1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/a9/ISAT_Portrait_Siffrin_Sad_Smile_ACT6.png";
                            break;
                        case "US_serious1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/00/ISAT_Portrait_Siffrin_Serious_1_ACT6.png";
                            break;
                        case "US_serious2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/71/ISAT_Portrait_Siffrin_Serious_2_ACT6.png";
                            break;
                        case "US_shy1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e1/ISAT_Portrait_Siffrin_Shy.png";
                            break;
                        case "US_surprised1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f3/ISAT_Portrait_Siffrin_Surprised_ACT6.png";
                            break;
                        case "US_upset1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/fb/ISAT_Portrait_Siffrin_Upset_ACT6.png";
                            break;
                        case "US_yahoo1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/42/ISAT_Portrait_Siffrin_Yahoo_1_ACT6.png";
                            break;
                        case "US_yahoo2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/db/ISAT_Portrait_Siffrin_Yahoo_2_ACT6.png";
                            break;
                        case "US_yahoo3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/17/ISAT_Portrait_Siffrin_Yahoo_3_ACT6.png";
                            break;
                        default:
                            if (debugMode) {console.log(nameElement, `(ERROR) expression '${expression}' not found for siffrin`)};
                            break;
                    }

                    break;

                case "Fighter":
                    if (debugMode) {console.log(dialogueHeads[headIndex], `head ${headIndex} is fighter`, expression)};

                    switch (expression) {
                        case "angry1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f9/SASASAP_Portrait_Isabeau_Angry_1.png";
                            break;
                        case "angry2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/83/SASASAP_Portrait_Isabeau_Angry_2.png";
                            break;
                        case "annoyed1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/69/SASASAP_Portrait_Isabeau_Annoyed.png";
                            break;
                        case "awkward1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/89/SASASAP_Portrait_Isabeau_Awkward.png";
                            break;
                        case "blushing1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/98/SASASAP_Portrait_Isabeau_Blushing_1.png";
                            break;
                        case "blushing2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/1e/SASASAP_Portrait_Isabeau_Blushing_2.png";
                            break;
                        case "confident1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/7d/SASASAP_Portrait_Isabeau_Confident.png";
                            break;
                        case "embarassed1": // sic
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/35/SASASAP_Portrait_Isabeau_Embarrassed_1.png";
                            break;
                        case "embarassed2": // sic
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e5/SASASAP_Portrait_Isabeau_Embarrassed_2.png";
                            break;
                        case "embarassed3": // sic
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/32/SASASAP_Portrait_Isabeau_Embarrassed_3.png";
                            break;
                        case "embarassed4": // sic
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b6/SASASAP_Portrait_Isabeau_Embarrassed_4.png";
                            break;
                        case "fight1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b6/SASASAP_Portrait_Isabeau_Embarrassed_4.png";
                            break;
                        case "fight2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/72/SASASAP_Portrait_Isabeau_Fight_2.png";
                            break;
                        case "fight3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/9b/SASASAP_Portrait_Isabeau_Fight_3.png";
                            break;
                        case "GALRE1": // sic
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/09/SASASAP_Portrait_Isabeau_Glare.png";
                            break;
                        case "happy1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/25/SASASAP_Portrait_Isabeau_Happy_1.png";
                            break;
                        case "happy2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/5c/SASASAP_Portrait_Isabeau_Happy_2.png";
                            break;
                        case "neutral1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/7e/SASASAP_Portrait_Isabeau_Neutral_1.png";
                            break;
                        case "ohfuck1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c0/SASASAP_Portrait_Isabeau_Sheepish_1.png";
                            break;
                        case "ohfuck2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b8/SASASAP_Portrait_Isabeau_Sheepish_2.png";
                            break;
                        case "ohfuck3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/8c/SASASAP_Portrait_Isabeau_Sheepish_3.png";
                            break;
                        case "proud1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/46/SASASAP_Portrait_Isabeau_Proud.png";
                            break;
                        case "sad1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/8c/SASASAP_Portrait_Isabeau_Sad_1.png";
                            break;
                        case "sad2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/da/SASASAP_Portrait_Isabeau_Sad_2.png";
                            break;
                        case "sad3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d0/SASASAP_Portrait_Isabeau_Sad_3.png";
                            break;
                        case "sad4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/44/SASASAP_Portrait_Isabeau_Sad_4.png";
                            break;
                        case "smile1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/58/SASASAP_Portrait_Isabeau_Smile.png";
                            break;
                        case "surprised1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f4/SASASAP_Portrait_Isabeau_Surprised_1.png";
                            break;
                        case "surprised2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/3c/SASASAP_Portrait_Isabeau_Surprised_2.png";
                            break;
                        case "surprised3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/27/SASASAP_Portrait_Isabeau_Surprised_3.png";
                            break;
                        case "thinking1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f7/SASASAP_Portrait_Isabeau_Thinking_1.png";
                            break;
                        case "thinking2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/8f/SASASAP_Portrait_Isabeau_Thinking_2.png";
                            break;
                        case "wondering1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b5/SASASAP_Portrait_Isabeau_Wondering_1.png";
                            break;
                        case "wondering2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/bd/SASASAP_Portrait_Isabeau_Wondering_2.png";
                            break;
                        case "worried1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/8e/SASASAP_Portrait_Isabeau_Worried_1.png";
                            break;
                        case "worried1b":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/2a/SASASAP_Portrait_Isabeau_Worried_2.png";
                            break;
                        case "worried2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/28/SASASAP_Portrait_Isabeau_Worried_3.png";
                            break;
                        case "worried3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/96/SASASAP_Portrait_Isabeau_Worried_4.png";
                            break;
                        default:
                            if (debugMode) {console.log(nameElement, `(ERROR) expression '${expression}' not found for fighter`)};
                            break;
                    }

                    break;

                case "Housemaiden":
                    if (debugMode) {console.log(dialogueHeads[headIndex], `head ${headIndex} is housemaiden`, expression)};

                    switch (expression) {
                        case "angry1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/56/SASASAP_Portrait_Mirabelle_Angry_1.png";
                            break;
                        case "angry2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/cd/SASASAP_Portrait_Mirabelle_Angry_2.png";
                            break;
                        case "angry3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/59/SASASAP_Portrait_Mirabelle_Angry_3.png";
                            break;
                        case "awkward1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/08/SASASAP_Portrait_Mirabelle_Awkward_1.png";
                            break;
                        case "awkward2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c2/SASASAP_Portrait_Mirabelle_Awkward_2.png";
                            break;
                        case "awkward3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/79/SASASAP_Portrait_Mirabelle_Awkward_3.png";
                            break;
                        case "cry1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/27/SASASAP_Portrait_Mirabelle_Crying.png";
                            break;
                        case "determined1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b6/SASASAP_Portrait_Mirabelle_Determined_1.png";
                            break;
                        case "determined2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/08/SASASAP_Portrait_Mirabelle_Determined_2.png";
                            break;
                        case "distressed1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f8/SASASAP_Portrait_Mirabelle_Distressed_1.png";
                            break;
                        case "distressed2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/9d/SASASAP_Portrait_Mirabelle_Distressed_2.png";
                            break;
                        case "distressed3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/92/SASASAP_Portrait_Mirabelle_Distressed_3.png";
                            break;
                        case "fight1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d4/SASASAP_Portrait_Mirabelle_Fight_1.png";
                            break;
                        case "fight2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d7/SASASAP_Portrait_Mirabelle_Fight_2.png";
                            break;
                        case "gentle1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/84/SASASAP_Portrait_Mirabelle_Gentle.png";
                            break;
                        case "hm1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/3f/SASASAP_Portrait_Mirabelle_Considering_1.png";
                            break;
                        case "hmmm1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/00/SASASAP_Portrait_Mirabelle_Considering_2.png";
                            break;
                        case "pray1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/82/SASASAP_Portrait_Mirabelle_Pray_1.png";
                            break;
                        case "pray2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/39/SASASAP_Portrait_Mirabelle_Pray_2.png";
                            break;
                        case "smile1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/01/SASASAP_Portrait_Mirabelle_Smile_1.png";
                            break;
                        case "smile2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/dd/SASASAP_Portrait_Mirabelle_Smile_2.png";
                            break;
                        case "smile3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/13/SASASAP_Portrait_Mirabelle_Smile_3.png";
                            break;
                        case "smile4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/9d/SASASAP_Portrait_Mirabelle_Smile_4.png";
                            break;
                        case "surprise1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/05/SASASAP_Portrait_Mirabelle_Surprise.png";
                            break;
                        case "THEFUCK1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/7c/SASASAP_Portrait_Mirabelle_Shocked.png";
                            break;
                        case "wondering1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d2/SASASAP_Portrait_Mirabelle_Wondering.png";
                            break;
                        case "worried1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/3e/SASASAP_Portrait_Mirabelle_Worried_1.png";
                            break;
                        case "worried2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/af/SASASAP_Portrait_Mirabelle_Worried_2.png";
                            break;
                        case "worried3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d4/SASASAP_Portrait_Mirabelle_Worried_3.png";
                            break;
                        default:
                            if (debugMode) {console.log(nameElement, `(ERROR) expression '${expression}' not found for housemaiden`)};
                            break;
                    }

                    break;

                case "Kid":
                    if (debugMode) {console.log(dialogueHeads[headIndex], `head ${headIndex} is kid`, expression)};

                    switch (expression) {
                        case "angry1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/67/SASASAP_Portrait_Bonnie_Angry_1.png";
                            break;
                        case "angry2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/95/SASASAP_Portrait_Bonnie_Angry_2.png";
                            break;
                        case "angry3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/aa/SASASAP_Portrait_Bonnie_Angry_3.png";
                            break;
                        case "angry4":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/8e/SASASAP_Portrait_Bonnie_Angry_4.png";
                            break;
                        case "annoyed1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/9b/SASASAP_Portrait_Bonnie_Annoyed.png";
                            break;
                        case "ew1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f8/SASASAP_Portrait_Bonnie_Disgusted_1.png";
                            break;
                        case "ew2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/55/SASASAP_Portrait_Bonnie_Disgusted_2.png";
                            break;
                        case "excited1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/28/SASASAP_Portrait_Bonnie_Excited.png";
                            break;
                        case "neutral1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/dd/SASASAP_Portrait_Bonnie_Neutral_2.png";
                            break;
                        case "neutral2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/77/SASASAP_Portrait_Bonnie_Neutral_3.png";
                            break;
                        case "phew1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/16/SASASAP_Portrait_Bonnie_Phew.png";
                            break;
                        case "pout1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/83/SASASAP_Portrait_Bonnie_Pout.png";
                            break;
                        case "pray1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/62/SASASAP_Portrait_Bonnie_Pray.png";
                            break;
                        case "proud1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/25/SASASAP_Portrait_Bonnie_Proud.png";
                            break;
                        case "sad1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/ce/SASASAP_Portrait_Bonnie_Sad_1.png";
                            break;
                        case "sad2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/a7/SASASAP_Portrait_Bonnie_Sad_2.png";
                            break;
                        case "sad3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/a/a2/SASASAP_Portrait_Bonnie_Sad_3.png";
                            break;
                        case "shy1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/85/SASASAP_Portrait_Bonnie_Shy.png";
                            break;
                        case "surprised1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/36/SASASAP_Portrait_Bonnie_Surprised_1.png";
                            break;
                        case "uwah1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/4b/SASASAP_Portrait_Bonnie_Surprised_2.png";
                            break;
                        case "worried1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/63/SASASAP_Portrait_Bonnie_Worried_1.png";
                            break;
                        case "worried2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/44/SASASAP_Portrait_Bonnie_Worried_2.png";
                            break;
                        case "zomg1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/53/SASASAP_Portrait_Bonnie_Amazed.png";
                            break;
                        default:
                            if (debugMode) {console.log(nameElement, `(ERROR) expression '${expression}' not found for kid`)};
                            break;
                    }

                    break;

                case "Researcher":
                    if (debugMode) {console.log(dialogueHeads[headIndex], `head ${headIndex} is researcher`, expression)};

                    switch (expression) {
                        case "angry1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/40/SASASAP_Portrait_Odile_Angry_1.png";
                            break;
                        case "angry2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/4c/SASASAP_Portrait_Odile_Angry_2.png";
                            break;
                        case "ew1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f3/SASASAP_Portrait_Odile_Disgusted.png";
                            break;
                        case "happy1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/f/f5/SASASAP_Portrait_Odile_Happy.png";
                            break;
                        case "oof1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e2/SASASAP_Portrait_Odile_Oof.png";
                            break;
                        case "question1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/0/07/SASASAP_Portrait_Odile_Question.png";
                            break;
                        case "reading1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/49/SASASAP_Portrait_Odile_Reading_1.png";
                            break;
                        case "readingup1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/2f/SASASAP_Portrait_Odile_Reading_2.png";
                            break;
                        case "shy1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/85/SASASAP_Portrait_Odile_Shy.png";
                            break;
                        case "sigh1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/cb/SASASAP_Portrait_Odile_Sigh.png";
                            break;
                        case "smile1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c1/SASASAP_Portrait_Odile_Smile.png";
                            break;
                        case "smug1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/75/SASASAP_Portrait_Odile_Smug.png";
                            break;
                        case "wondering1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/e/e8/SASASAP_Portrait_Odile_Wondering_1.png";
                            break;
                        case "wondering2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/5f/SASASAP_Portrait_Odile_Wondering_2.png";
                            break;
                        case "wondering3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/59/SASASAP_Portrait_Odile_Wondering_3.png";
                            break;
                        case "worried1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/8/84/SASASAP_Portrait_Odile_Worried_1.png";
                            break;
                        case "worried2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/92/SASASAP_Portrait_Odile_Worried_2.png";
                            break;
                        case "worried3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/1/14/SASASAP_Portrait_Odile_Worried_3.png";
                            break;
                        default:
                            if (debugMode) {console.log(nameElement, `(ERROR) expression '${expression}' not found for researcher`)};
                            break;
                    }

                    break;

                case "Sapfrin":
                    if (debugMode) {console.log(dialogueHeads[headIndex], `head ${headIndex} is sapfrin`, expression)};

                    switch (expression) {
                        case "fake1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/cb/SASASAP_Portrait_Siffrin_Fake_1.png";
                            break;
                        case "fake2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/4/43/SASASAP_Portrait_Siffrin_Fake_2.png";
                            break;
                        case "fight1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/2a/SASASAP_Portrait_Siffrin_Fight.png";
                            break;
                        case "hide1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/d8/SASASAP_Portrait_Siffrin_Hide.png";
                            break;
                        case "neutral1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/2a/SASASAP_Portrait_Siffrin_Neutral_2.png";
                            break;
                        case "normalsmile1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/78/SASASAP_Portrait_Siffrin_Smile_1.png";
                            break;
                        case "offguard1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/3/32/SASASAP_Portrait_Siffrin_Sheepish.png";
                            break;
                        case "sadsmile1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/9d/SASASAP_Portrait_Siffrin_Sad_Smile.png";
                            break;
                        case "sad1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/dd/SASASAP_Portrait_Siffrin_Sad.png";
                            break;
                        case "shock1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/dc/SASASAP_Portrait_Siffrin_Shocked_1.png";
                            break;
                        case "shock2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/c/c4/SASASAP_Portrait_Siffrin_Shocked_2.png";
                            break;
                        case "shock3":
                            imageSrc = "https://instarsandtime.wiki.gg/images/6/69/SASASAP_Portrait_Siffrin_Shocked_3.png";
                            break;
                        case "smile1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/5/52/SASASAP_Portrait_Siffrin_Smile_2.png";
                            break;
                        case "smile2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/79/SASASAP_Portrait_Siffrin_Smile_3.png";
                            break;
                        case "surprised1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/9/95/SASASAP_Portrait_Siffrin_Surprised_1.png";
                            break;
                        case "surprised2":
                            imageSrc = "https://instarsandtime.wiki.gg/images/2/28/SASASAP_Portrait_Siffrin_Surprised_2.png";
                            break;
                        default:
                            if (debugMode) {console.log(nameElement, `(ERROR) expression '${expression}' not found for sapfrin`)};
                            break;
                    }

                    break;

                default:
                    if (debugMode) {console.log(nameElement, `(ERROR) '${nameElement.innerHTML}' isn't a recognized name`)};
                    break;
            }

            if (imageSrc) {
                dialogueImage = document.createElement("img");
                dialogueImage.src = imageSrc;
                tooltip.appendChild(dialogueImage);
            } else {
                tooltip.innerHTML = "image not found";
            }
        }
    })
}
