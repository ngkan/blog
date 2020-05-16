// opgen is short for one-page-generator
'use strict';
import * as Templates from './templates/index.js';
import * as MDtoHTML from './mdtohtml.js';

const head             = document.querySelector('head');
const TemplateSelector = document.querySelector('.TemplateSelector');
const Generating       = document.querySelector('.Generating');
const Preview          = document.querySelector('.Preview');
const Result           = document.querySelector('.Result');

const WebsiteName = document.querySelector('#WebTitle');

const Tab = [null,
document.querySelector('#Tab1'),
document.querySelector('#Tab2'),
document.querySelector('#Tab3'),
document.querySelector('#Tab4'),
document.querySelector('#Tab5')
];
const MoreTab = document.querySelector('#MoreTab');

let number_of_tabs = 1;

const Input = [null,
document.querySelector('#Input1'),
document.querySelector('#Input2'),
document.querySelector('#Input3'),
document.querySelector('#Input4'),
document.querySelector('#Input5')
];

const TabName = [null,
document.querySelector('#InputTab1'),
document.querySelector('#InputTab2'),
document.querySelector('#InputTab3'),
document.querySelector('#InputTab4'),
document.querySelector('#InputTab5')
];

const user_actions = [];
const Undo = document.querySelector('.Undo');
const UndoAll = document.querySelector('.UndoAll');

function activeTab(id, recreate = false){
    // if (recreate == false)
    //    user_actions.push(['activeTab', id]);

    console.log(`Make tab ${id} active.`);
    for(let i = 1; i <= 5; i ++){
        Tab[i].classList.remove('Active');
        Input[i].classList.add('Hidden');
        TabName[i].classList.add('Hidden');
    }
    Tab[id].classList.add('Active');
    Input[id].classList.remove('Hidden');
    TabName[id].classList.remove('Hidden');
}

function increaseNoTab(recreate = false){
    if (recreate == false)
        user_actions.push(['increaseNoTab']);

    // number_of_tabs should always be less than 5 here
    number_of_tabs += 1;
    console.log(`Add tab ${number_of_tabs}.`);
    Tab[number_of_tabs].classList.remove('Hidden');
    if (number_of_tabs == 5)
        MoreTab.classList.add('Hidden');
}

function generateHTMLforuser(recreate = false){
    //if (recreate == false)
    //    user_actions.push(['generateHTMLforuser']);
    

    let template_name = TemplateSelector.value;
        
    add_preview_css_script(template_name);
    add_preview_js_script(template_name);
    // Templates[template_name].div_body_top
    // + MDtoHTML.markdown_string_to_html_string(text)
    // + Templates[template_name].div_body_bot;

    let tab_names = [null];
    let inputs = [null];
    for(let i=1;i<=5;i++){
        tab_names.push(TabName[i].value);
        inputs.push(MDtoHTML.markdown_text_to_html(Input[i].value));
    }

    let previewhtml = Templates[template_name].preview_html(number_of_tabs, tab_names, inputs);
    let resulthtml = Templates[template_name].result_html(number_of_tabs, tab_names, inputs, WebsiteName.value);
    
    // Put preview on the website
    Preview.innerHTML = previewhtml;
    Result.value = resulthtml;
}

const PREVIEW_CSS_SCRIPT = 'preview_css_script';
function add_preview_css_script(template){
    // remove_preview_css_script();

    let preview_css = document.createElement('link');
    preview_css.id = PREVIEW_CSS_SCRIPT;
    preview_css.href = 'templates/' + template + '/styles.css';
    preview_css.type = 'text/css';
    preview_css.rel = 'stylesheet';
    head.appendChild(preview_css);
}
function remove_preview_css_script(){
    let preview_css = document.querySelector('#' + PREVIEW_CSS_SCRIPT);
    if (preview_css != null){
        head.removeChild(preview_css);
    }
}

const PREVIEW_JS_SCRIPT = 'preview_js_script';
function add_preview_js_script(template){
    // Cannot remove normally
    // remove_preview_js_script();

    //// Well we do need to reload the scrip, so ...
    // check if have loaded script for the template
    // let id = PREVIEW_JS_SCRIPT + '_' + template;
    // if (document.querySelector(`#${id}`) != null)
    //    return;

    // <script src="script.js" type="module"></script>
    let preview_js = document.createElement('script');
    preview_js.id = PREVIEW_JS_SCRIPT + '_' + template;
    preview_js.src = 'templates/' + template + '/script.js';
    preview_js.type = 'text/javascript';
    head.appendChild(preview_js);
}
function remove_preview_js_script(){
    let preview_js = document.querySelector('#' + PREVIEW_JS_SCRIPT);
    if (preview_js != null){
        head.removeChild(preview_js);
    }
}

function listenToTabs(){
    for(let i=1;i<=5;i++)
        Tab[i].addEventListener('click', ()=>{activeTab(i)});

    MoreTab.addEventListener('click', ()=>{increaseNoTab()});
}
function listenToGeneratingEvents(){
    Generating.addEventListener('click', ()=>{generateHTMLforuser()});
}
function listenToUndo(){
    function resetEverything(){
        WebsiteName.value = 'My website';
        let aa = [null, 'first', 'second', 'third', 'fourth', 'fifth'];
        for(let i=1;i<=5;i++){
            TabName[i].value = `Tab${i}`;
            Input[i].value = `The ${aa[i]} simple sentence.`;
            Tab[i].classList.add('Hidden');
        }
        number_of_tabs = 1;
        Tab[1].classList.remove('Hidden');
        MoreTab.classList.remove('Hidden');
        activeTab(1);
    }
    function eraseAllUserAction(){
        // does not actually erase existing elements
        user_actions.length = 0;
    }
    function removeLastUserAction(){
        if (user_actions.length)
            user_actions.pop();
    }
    function reDo(){
        resetEverything();

        for(let i = 0; i < user_actions.length; i++){
            if (user_actions[i][0] == 'WebsiteName'){
                WebsiteName.value = user_actions[i][1];
            }
            else if (user_actions[i][0] == 'Input'){
                Input[user_actions[i][1]].value = user_actions[i][2];
            }
            else if (user_actions[i][0] == 'TabName'){
                TabName[user_actions[i][1]].value = user_actions[i][2];
            }
            else if (user_actions[i][0] == 'increaseNoTab'){
                increaseNoTab(true);
            }

            activeTab(1, true);
        }
    }
    Undo.addEventListener('click', ()=>{removeLastUserAction(); reDo();});
    UndoAll.addEventListener('click', ()=>{eraseAllUserAction(); reDo();});
}
export function listenToWhatIWant(){
    WebsiteName.addEventListener('change', ()=>{
        user_actions.push(['WebsiteName', WebsiteName.value]);
    });

    for (let i=1;i<=5;i++){
        Input[i].addEventListener('change',()=>{
            user_actions.push(['Input', i, Input[i].value]);
        });
        TabName[i].addEventListener('change', ()=>{
            user_actions.push(['TabName', i, TabName[i].value]);
        });
    }
    
    listenToTabs();
    listenToGeneratingEvents();
    listenToUndo();
}