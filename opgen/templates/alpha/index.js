import * as style from './styles.css.js';
import * as script from './script.js.js';

const div_body = '<div class="Alpha">';
const div_tabbar = '<div class=AlphaTabBar>';
const div_tabbuton = '<div class=AlphaTabButton>';
const div_contentdiv = '<div class=AlphaContentDiv>';
const div_content = '<div class=AlphaContent>';
const div_end = '</div>';
const line_break = '<br>';


export function preview_html(number_of_tabs, tab_names, inputs){
    let preview_html = '';

    let tab_hidden_status = [null];
    for (let i=1;i<=5;i++){
        if (i <= number_of_tabs)
            tab_hidden_status.push('');
        else
            tab_hidden_status.push('AlphaHidden')
    }
    let content_active_status = [null, 'AlphaButtonActive', '', '', '', ''];
    let content_hidden_status = [null, '', 'AlphaHidden', 
    'AlphaHidden', 'AlphaHidden', 'AlphaHidden'];

    preview_html += div_body;{

        preview_html += div_tabbar;{
            for (let i=1;i<=5;i++){
                preview_html += `<div class="AlphaTabButton ${content_active_status[i]} ${tab_hidden_status[i]}" id="AlphaTabButton${i}">`
                                + tab_names[i]
                                + div_end;
            }
        }preview_html += div_end;

        preview_html += line_break;

        preview_html += div_contentdiv;{
            for (let i=1;i<=5;i++){
                preview_html += `<div class="AlphaContent ${content_hidden_status[i]}" id="AlphaContent${i}">`
                                +   inputs[i]
                                + div_end;
            }
        }preview_html += div_end;
    }preview_html += div_end;

    return preview_html;
}

const half_head = '<!DOCTYPE html>\
<html lang="en">\
<head>\
    <meta charset="utf-8">\
    <meta name="viewport" content="width=device-width, initial-scale=1">';

export function result_html(number_of_tabs, tab_names, inputs, title){
    let result_html = '';
    
    // head
    result_html += half_head;
    result_html += `<style>${style.style}</style>`;
    
    result_html += `<title>${title}</title>`;
    result_html += '</head>'

    result_html += '<body>';
    result_html += preview_html(number_of_tabs, tab_names, inputs);
    result_html += `<script>${script.script}</script>`;
    result_html += '</body></html>';

    return result_html;
}

 