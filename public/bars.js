class Header extends HTMLElement {
    constructor() {
        super();
    }
  
    connectedCallback() {
        this.innerHTML = 
            `<div id="headerArea">
                <div id="header"><img src="/header.png" alt=""></div>
                   <details class="helper" id="settings">
                        <summary>Settings</summary>
                        <button onclick="toggleExpressions();" id="button2" class="helper">Toggle expressions</button>
                        <button onclick="toggleDialogue();" id="button3" class="helper">Toggle choices</button>
                        <button onclick="changeFontStyle(null)" id="button4" class="helper">Default font</button>
                        <button onclick="changeFontStyle('CascadiaCode')" id="button5" class="helper">Cascadia Code</button>
                        <button onclick="changeFontStyle('OpenDyslexic3')" id="button6" class="helper">OpenDyslexic3</button>
                    </details>
                    <button onclick="topFunction()" id="button7" title="Go to top" class="helper">Go to top</button>
                <nav class="navbar" id="desknav">
                   
                    <ul class="vcr">
                        <li><img src="/Craft.png" alt="" width="32" class="head"></li>
                        <li><a href="/index.html">Home</a></li>
                        <li><a href="/overview/acts.html">Story</a></li>
                        <li><a href="/overview/events.html">Events</a></li>
                        <li><a href="/overview/rooms.html">Rooms</a></li>
                        <li><a href="/overview/random.html">Random</a></li>
                        <li><a href="/overview/sasasap.html">START AGAIN</a></li>
                        <li><a href="/thanks.html">Special Thanks</a></li>
                        <li><img src="/Craft.png" alt="" width="32" class="head"></li>
                    </ul>
                </nav>
                <nav class="navbar" id="mobnav">
                    <ul class="vcr">
                        <li><a href="/index.html">Home</a></li>
                        <li><a href="/overview/acts.html">Story</a></li>
                        <li><a href="/overview/events.html">Events</a></li>
                        <li><a href="/overview/rooms.html">Rooms</a></li>
                    </ul>
                    <ul>
                        <li><a href="/overview/random.html">Random</a></li>
                        <li><a href="/overview/sasasap.html">START AGAIN</a></li>
                        <li><a href="/thanks.html">Special Thanks</a></li>
                    </ul>
                </nav>

                <div id="flex">
                    <aside id="leftSidebar">
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
    sessionStorage.setItem("expressionsToggle", expressionsOff);
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
};

//Feli's Button test corner
// So i don't need to ruin the original bars file on my pc

//Copied from w3school

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// toggle dialogue options (details) on/ off

function toggleDialogue() {
    const details = document.querySelectorAll('details:not(#settings)');

    for(var i = 0; i < details.length; i++) {
        if (details[i].open == true) {
            details[i].removeAttribute("open", "");
            console.log("closed all dialogue options!");
        }
        else {
            details[i].setAttribute("open", "");
            console.log("opened all dialogue options!");
        }
    }
}


function tooltipImages() {

    var dialogueHeads = document.getElementsByClassName("dialogue-head"); // get all dialogue heads

    for (headIndex in dialogueHeads) { // for every dialogue head

        if (dialogueHeads[headIndex].getElementsByClassName("dialogue-expression")) { // if this dialogue head has an expression

            var nameElement = dialogueHeads[headIndex].getElementsByClassName("dialogue-name")[0] // get the dialogue name
            var expressionElement = dialogueHeads[headIndex].getElementsByClassName("dialogue-expression")[0]; // get the dialogue expression

            // get the text
            var expression = expressionElement.innerHTML; // same as the expression text
            var expression = expression.replace(/\((.+)\)/i, "$1"); // remove the parentheses
            
            // create the tooltip
            expressionElement.appendChild(document.createElement("span")); // make a span
            var tooltip = expressionElement.firstElementChild; // get that span we just made
            tooltip.classList.add("tooltip"); // give it the tooltip text

            tooltip.innerHTML = expression; // set the text

            var imageSrc = false;

            switch (nameElement.innerHTML) {

                case "Bonnie":
                    console.log(nameElement, "it is bonnie");

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
                        case "zomg1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b1/ISAT_Portrait_Bonnie_Flabbergasted.png";
                            break;
                    }

                    break;

                case "Euphrasie":
                    console.log(nameElement, "it is euphrasie");

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
                    }

                    break;

                case "Isabeau":
                    console.log(nameElement, "it is isabeau");

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
                        case "h3m":
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
                        case "no1":
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
                            console.log(nameElement, `expression '${expression} not found for isabeau`);
                    }

                    break;

                case "King":
                    console.log(nameElement, "it is the king");
                    imageSrc = "https://instarsandtime.wiki.gg/images/a/a5/ISAT_Portrait_King.png";
                    break;

                case "Loop":
                    console.log(nameElement, "it is loop", expression);

                    switch (expression) {
                        case "angry1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/b/b3/ISAT_Portrait_Loop_Angry.png";
                            break;
                        case "away1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/7/76/ISAT_Portrait_Loop_Looking_Away.png";
                            break;
                        case "ew1":
                            imageSrc = "https://instarsandtime.wiki.gg/images/d/da/ISAT_Portrait_Loop_LOL_1.png";
                            break;
                        case "expressionnumber1":
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
                    }

                    break;

                case "Mirabelle":
                    console.log(nameElement, "it is mirabelle");
                    break;

                case "Odile":
                    console.log(nameElement, "it is odile");
                    break;

                case "Siffrin":
                    console.log(nameElement, "it is siffrin");
                    break;

                default: 
                    console.log(nameElement, `'${nameElement.innerHTML}' isn't a recognized name`);
                    break;
            }

            if (imageSrc) {
                dialogueImage = document.createElement("img");
                dialogueImage.src = imageSrc;
                tooltip.appendChild(dialogueImage);
            }

        }
    }
}
tooltipImages()
