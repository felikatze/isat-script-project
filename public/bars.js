class Header extends HTMLElement {
    constructor() {
        super();
    }
  
    connectedCallback() {
        this.innerHTML = 
            `<div id="headerArea">
                <div id="header"><img src="/header.png" alt=""></div>
                  
                <nav id="navbar">
                    <ul class="vcr">
                        <li><img src="/Craft.png" alt="" width="32" class="head"></li>
                        <li><a href="/index.html">Home</a></li>
                        <li><a href="/overview/events.html">Special Events</a></li>
                        <li><a href="/overview/acts.html">Story Events</a></li>
                        <li><a href="/overview/random">Random Events</a></li>
                        <li><a href="/overview/rooms.html">Room Dialogues</a></li>
                        <li><a href="/thanks">Special Thanks</a></li>
                        <li><img src="/Craft.png" alt="" width="32" class="head"></li>
                    </ul>
                </nav>

                <div id="flex">
                    <aside id="leftSidebar">
                        <button onclick="toggleExpressions();">Toggle Expressions</button>

                        <h2>Font Changers</h2>
                        <button onclick="changeFontStyle(null)">Default</button>
                        <button onclick="changeFontStyle('CascadiaCode')">Cascadia Code</button>
                        <button onclick="changeFontStyle('OpenDyslexic3')">OpenDyslexic3</button>

                        <h2>The <abbr title="In Stars and Time">ISAT</abbr> script</h2>
                        <ul>
                            <li><a href="/about.html">About</a></li>
                            <li><a href="/feed.xml">RSS Feed</a></li>
                            <li><a href="/portraits">Dialogue portrait names</a></li>
                            <li>Want to contribute? Check out <a href="https://github.com/felikatze/isat-script-project">github</a>!
                            <li>For questions and requests, reach out on <a href="https://isat-script-project.tumblr.com/">Tumblr.</a></li>
                        </ul>
                    </aside>
                </div>
            </div>`
        ;
    }
}
  
customElements.define('head-er', Header);
  
class Footer extends HTMLElement {
    constructor() {
        super();
    }
  
    connectedCallback() {
        this.innerHTML = `<footer id="footer">The script is free to use even without attribution to me. <b>In Stars and Time</b> belongs to insertdisc5.</footer>`;
    }
}
  
customElements.define('foot-er', Footer);


// for questions, ask riu, cuz she made all of this, lmao. I have no idea how it works. -Feli //

// function to change Fonts
// parameter: string fontFamily = name of the font you want to change the document to
// appends style = "font-family: fontFamily" to almost all elements in the body + the body itself
// writes current fontFamily into sessionStorage / removes it if the font was already set or fontFamily is null
// pass fontFamily = null to reset to default



function changeFontStyle(fontFamily) {
    var change;
    var elements = document.querySelectorAll('body,body *:not(script)');

    var isSetOrNull = elements[0].style.fontFamily == fontFamily || !fontFamily || fontFamily == 'null';

    if(!isSetOrNull) {
        sessionStorage.setItem('font', fontFamily);
        change = (element) => element.style.fontFamily = fontFamily;
    }
    else {
        sessionStorage.removeItem('font');
        change = (element) => element.style.fontFamily = null;
    }

    elements.forEach(element => change(element));
}

// gold's expressions toggle code
function toggleExpressions() {
    var things = document.getElementsByClassName("dialogue-expression");
    var expressionsOff;

    for(var i = 0; i < things.length; i++) {
        if (things[i].style.display === "none") {
            things[i].style.display = "inline-flex";
            expressionsOff = false;
            console.log("expressions on!");
        } else {
            things[i].style.display = "none";
            expressionsOff = true;
            console.log("expressions off!");
        }
    }
    sessionStorage.setItem("expressionsToggle", expressionsOff)
}
// end gold's expressions toggle code


// load correct font if it had been set previously
window.onload = function() {

    var font = sessionStorage.getItem('font');
    if(!!font) {
        changeFontStyle(font);
    }

    // gold's expressions toggle code
    if(sessionStorage.getItem("expressionsToggle") == true) {
        toggleExpressions();
        console.log("toggled expressions on load!");
    } else {
        console.log("expressions stayed the same on load!");
    }
    // end gold's expressions toggle code
}