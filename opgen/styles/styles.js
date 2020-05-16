const CSSLink = document.querySelector('#cssLink');
const StyleSelector = document.querySelector('.StyleSelector');

function changeTheme(){
    let name = StyleSelector.value;
    console.log('listened: ', name);
    let dir = 'styles/' + name + '.css';
    CSSLink.setAttribute('href', dir);
}

StyleSelector.value = 'default';

export function listenToStyleChangingEvents(){
    StyleSelector.addEventListener('change', ()=>{changeTheme()});
}