import TurndownService from "turndown"






TurndownService.prototype.escape = function (string) {
    var escapes = []
    return escapes.reduce(function (accumulator, escape) {
        return accumulator.replace(escape[0], escape[1]);
    }, string);
}

const turndownService = new TurndownService({ emDelimiter: '*' })
turndownService.addRule('u', {
    filter: ['u'],
    replacement: (content, node) => '_' + content + '_'
});



export function convertHtmlToText(html) {
    let out = ""
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const cardNodes = doc.body && doc.body.children || null
    if (!cardNodes) return
    Array.from(cardNodes).forEach(function (node, index) {
        if (!node.innerText) out += "\n"
        if (node.innerText) {
            const leadingSpaces = countLeadingSpaces(node.innerText)

            // turndownService.keep('code')
            let markdown = turndownService.turndown(node.innerHTML)

            // needed this until I disabled "escape" in markdown-it (at least I think so)
            // if (markdown.startsWith("\\#")) {
            //     markdown = markdown.substring(1);
            // }

            // not sure what this is for?
            if (leadingSpaces) {
                markdown = addSpacesToStart(markdown, leadingSpaces)
            }
            out += markdown + "\n"

        }
    })

    return out
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

function addSpacesToStart(str, numSpaces) {
    let spaces = '';
    for (let i = 0; i < numSpaces; i++) {
        spaces += ' ';
    }
    return spaces + str;
}