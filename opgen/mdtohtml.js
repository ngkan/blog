function check_horizontal_rules(str){
    if (str.length < 3)
        return str;
    if (str[0] != '*' && str[0] != '-' && str[0] != '_')
        return str;
    for(let i=1;i<str.length;i++)
        if (str[0] != str[i])
            return str;
    return '<hr>';
}
function check_if_heading(str){
    for (let i = 6; i >= 1; i --){
        let x = '';
        for(let j = 0; j < i; j ++) x += '#';
        x += ' ';

        if (str.length >= i+1 && str.slice(0,i+1) == x)
            return i; 
    }

    return 0;
}
function check_image(str){
    // pattern = ![ ]()
    let link_pattern = /!\[([^\]]*)\]\(([^\)\"]*)\)/g;
    let p;

    let tmp = str.split(/!\[[^\]]*\]\([^\)]*\)/);
    let res = '';
    let i = 0;

    do{
        res += tmp[i];
        i++;

        p = link_pattern.exec(str);
        if (p){
            res += `<img src="${p[2]}" alt="${p[1]}">`;
        }

    } while(p);

    return res;
}
function check_link(str){
    // pattern = [ ]()
    let link_pattern = /\[([^\]]*)\]\(([^\)\"]*)\)/g;
    let p;

    // cant use () brackets here (?)
    // https://stackoverflow.com/a/17516064
    let tmp = str.split(/\[[^\]]*\]\([^\)]*\)/);
    let res = '';
    let i = 0;

    do{
        res += tmp[i];
        i++;

        p = link_pattern.exec(str);
        if (p){
            res += `<a href="${p[2]}">${p[1]}</a>`;
        }

    } while(p);

    return res;
}
function check_heading(str){
    let heading_size = check_if_heading(str);
    let result = '';

    if (heading_size == 0)
        result += '<p>' + str + '</p>';
    else{
        let x = '';
        for(let j = 0; j < heading_size; j ++) x += '#';
        x += ' ';

        str = str.replace(x, '');
        result += '<h' + heading_size + '>' + str + '</h' + heading_size + '>';
    }

    return result;
}
function check_escaping_character(str){
    // pattern = \[+-\ ...]
    let link_pattern = /\\([\\`\*-\_\{\}\[\]\(\)#\+\.!\|])/g;
    let p;

    // cant use () brackets here (?)
    // https://stackoverflow.com/a/17516064
    let tmp = str.split(/\\[\\`\*-\_\{\}\[\]\(\)#\+\.!\|]/);
    let res = '';
    let i = 0;

    do{
        res += tmp[i];
        i++;

        p = link_pattern.exec(str);
        if (p){
            res += p[1];
        }

    } while(p);

    return res;
}

export function markdown_text_to_html(markdown_text){
    let lines = markdown_text.split('\n');

    let result = ''; 

    for (let i = 0; i < lines.length; i++){
        /* Rules:
            horizontal rules
            codes
            images
            links
            heading
            escaping character
        */
        // check horizontal rules
        lines[i] = check_horizontal_rules(lines[i]);

        // check images
        lines[i] = check_image(lines[i]);
       
        // check links
        lines[i] = check_link(lines[i]);

        // check if heading
        lines[i] = check_heading(lines[i]);
        
        // check escaping character
        lines[i] = check_escaping_character(lines[i]);

        result += lines[i];
    }
    return result;
}