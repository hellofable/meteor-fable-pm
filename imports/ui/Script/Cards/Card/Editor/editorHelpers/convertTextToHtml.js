import MarkdownIt from 'markdown-it'
import underline from 'markdown-it-underline'



export function convertTextToHtml(text) {

    if (!text) return ""
    const arr = text.split("\n")
    let htmlOut = ""

    arr.forEach(elementText => {

        // console.log(JSON.stringify(elementText));

        const leadingSpaces = countLeadingSpaces(elementText)

        const md = new MarkdownIt().
            disable(['link', 'image', "lheading", "heading", 'code', 'blockquote', 'table', 'code', 'fence', 'hr', 'list', 'reference', 'html_block', 'linkify', 'smartquotes', 'backticks', 'strikethrough', 'autolink', 'html_inline', 'entity'])
            .use(underline);

        let result = md.render(elementText);


        if (result == "" && leadingSpaces) {
            result = "<p> </p>"
        }
        if (result == "" && !leadingSpaces) {
            result = "<p></p>"
        }



        htmlOut += result
        // if(leadingSpaces == 1) {
        //     htmlOut 
        // }

        // if (leadingSpaces && element) {
        //     result = addSpacesAfterFirstPTag(result, leadingSpaces)
        // }
        // if (!element) {
        //     htmlOut += "<p></p>"
        // }
        // if (element) htmlOut += result


    });


    return htmlOut
}


function countLeadingSpaces(str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') {
            count++;
        } else {
            break;
        }
    }
    return count;
}

function addSpacesAfterFirstPTag(html, numSpaces) {
    console.log(html);
    let spaces = '';
    for (let i = 0; i < numSpaces; i++) {
        spaces += ' ';
    }
    const withSpaces = html.replace('<p>', '<p>' + spaces + 1);
    // console.log(JSON.stringify(withSpaces))
    return withSpaces
}