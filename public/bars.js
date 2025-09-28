////////////////////////////////////////////////////////////////////////////////
//                                  variables                                 //
////////////////////////////////////////////////////////////////////////////////
var debugMode = false; // change this to true and check console for debug logs!
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
                    <span id="searchButtonDesktop">
                        <a id="magnifyingGlassIcon" href="#"><img src="/assets/images/magnifying-glass-white.png" alt=""></a>
                    </span>
                    <span id="searchButtonMobile"><a id="mobileSearchLink" href="#">Search</a></span>
                    <img src="/assets/images/Craft.png" alt="">
                </nav>
                <span id="searchbarContainer"><search-er></search-er></span>
                
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
    // writes current fontFamily into localStorage / removes it if the font was already set or fontFamily is null
    // pass fontFamily = null to reset to default
    var change;
    var elements = document.querySelectorAll("body, body *:not(script)");

    var isSetOrNull = elements[0].style.fontFamily == fontFamily || !fontFamily || fontFamily == "null";

    if(!isSetOrNull) {
        localStorage.setItem("font", fontFamily);
        change = (element) => element.style.fontFamily = fontFamily;
    }
    else {
        localStorage.removeItem("font");
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
        localStorage.setItem("wishStyle", "alt");
        if (debugMode) {console.log("wish style alt")};
    } else {
        wishes = document.querySelectorAll(".wish-alt");
        if (wishes.length > 0) {
            wishes.forEach(function(wish) {
                wish.classList.remove("wish-alt");
                wish.classList.add("wish");
            })
            localStorage.setItem("wishStyle", "default");
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
            localStorage.setItem("expressionsToggle", "on");
        } else if (state == false || state == null && expression.style.display != "none") {
            expression.style.display = "none";
            localStorage.setItem("expressionsToggle", "off");
        }
    })
    if (debugMode) {
        if (localStorage.getItem("expressionsToggle") == "on") {
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
        localStorage.setItem("animationToggle", "on");
        if (debugMode) {console.log("animations on!")};
    } else if (state == false || state == null && animationToggle != "off") {
        animationToggle = "off";
        disableShakeAnimation();
        disableWaveAnimation();
        localStorage.setItem("animationToggle", "off");
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
    var font = localStorage.getItem("font");
    if (!!font) {
        changeFontStyle(font);
    }

    if (localStorage.getItem("expressionsToggle") == "off") {
        toggleExpressions();
        if (debugMode) {console.log("toggled expressions off on load!")};
    }

    wrapAllCharacters(document.querySelectorAll(".shake, .wave"));
    if (localStorage.getItem("animationToggle") == "off") {
        toggleAnimations(false);
        if (debugMode) {console.log("toggled animations off on load!")};
    } else {
        toggleAnimations(true);
    }

    if (localStorage.getItem("wishStyle") == "alt") {
        changeWishStyle();
        if (debugMode) {console.log("changed wish style on load!")};
    }
}



////////////////////////////////////////////////////////////////////////////////
//                               other functions                              //
////////////////////////////////////////////////////////////////////////////////

window.addEventListener('load', async function() {
    updateButtonsPosition();
    applySettings();
});

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
    try {
        if (window.innerWidth < 992) {
            var targetRect = document.querySelector("header").getBoundingClientRect();
            document.querySelector("help-er").style.top = Math.max(targetRect.bottom + 20, 20) + "px";
        } else {
            document.querySelector("help-er").style.top = ""
        }
    } catch {} // do nothing, we're probably on big search page
}

window.onscroll = updateButtonsPosition;
window.onresize = updateButtonsPosition;



