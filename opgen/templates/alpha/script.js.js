export const script ='AlphaListenToTabs();\
\
function AlphaListenToTabs(){\
    console.log(\'here\');\
\
    const AlphaTabs = [null,\
        document.querySelector(\'#AlphaTabButton1\'),\
        document.querySelector(\'#AlphaTabButton2\'),\
        document.querySelector(\'#AlphaTabButton3\'),\
        document.querySelector(\'#AlphaTabButton4\'),\
        document.querySelector(\'#AlphaTabButton5\')];\
    \
    const AlphaContents = [null,\
        document.querySelector(\'#AlphaContent1\'),\
        document.querySelector(\'#AlphaContent2\'),\
        document.querySelector(\'#AlphaContent3\'),\
        document.querySelector(\'#AlphaContent4\'),\
        document.querySelector(\'#AlphaContent5\')];\
    \
    \
    function activeTab(id){\
        for(let i = 1; i <= 5; i ++){\
            AlphaTabs[i].classList.remove(\'AlphaButtonActive\');\
            AlphaContents[i].classList.add(\'AlphaHidden\');\
        }\
        AlphaTabs[id].classList.add(\'AlphaButtonActive\');\
        AlphaContents[id].classList.remove(\'AlphaHidden\');\
    }\
\
    AlphaTabs[1].addEventListener(\'click\', ()=>{activeTab(1)});\
    AlphaTabs[2].addEventListener(\'click\', ()=>{activeTab(2)});\
    AlphaTabs[3].addEventListener(\'click\', ()=>{activeTab(3)});\
    AlphaTabs[4].addEventListener(\'click\', ()=>{activeTab(4)});\
    AlphaTabs[5].addEventListener(\'click\', ()=>{activeTab(5)});\
}'