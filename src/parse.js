function escapeHTML(str) {
    str = str.replace(/</g, "&#60;")
             .replace(/>/g, "&#62;");

    if (str.startsWith("&#60;!--?php")) {
        str = str.slice(0,5) + str.slice(8);
    }
    if (str.startsWith("?--&#62")) {
        str = str.slice(0,1) + str.slice(3);
    }
    return str;
}

function parseMarkdown (textContent) {
    let listOfContent = [];
    let buffer = [];

    for (let i = 0; i < textContent.length; i++) {
        if (textContent[i] !== "\n") {
            buffer.push(textContent[i]);
        } else {
            listOfContent.push(buffer);
            buffer = [];
        }
    }

    let parsedContent = "";
    let inPre = false;

    for (let i = 0; i < listOfContent.length; i++) {
        if (!inPre) {
            if (listOfContent[i].join("").startsWith("###### ")) {
                    parsedContent += `<h6>${listOfContent[i].slice(6).join("")}</h6>`;

            } else if (listOfContent[i].join("").startsWith("##### ")) {
                    parsedContent += `<h5>${listOfContent[i].slice(5).join("")}</h5>`;

            } else if (listOfContent[i].join("").startsWith("#### ")) {
                    parsedContent += `<h4>${listOfContent[i].slice(4).join("")}</h4>`;

            } else if (listOfContent[i].join("").startsWith("### ")) {
                    parsedContent += `<h3>${listOfContent[i].slice(3).join("")}</h3>`;

            } else if (listOfContent[i].join("").startsWith("## ")) {
                    parsedContent += `<h2>${listOfContent[i].slice(2).join("")}</h2>`;

            } else if (listOfContent[i].join("").startsWith("# ")) {
                    parsedContent += `<h1>${listOfContent[i].slice(1).join("")}</h1>`;
            } else if (listOfContent[i].join("").startsWith("```")) {
                    parsedContent += `<pre><code>`;
                    inPre = true;

            } else {
                parsedContent += `<p>${listOfContent[i].join("")}</p>`;
            }
        } else {
            if ( listOfContent[i].join("").startsWith("```")) {
                parsedContent += `</code></pre>`;
                inPre = false;
                continue;
            } else {
                parsedContent += `${escapeHTML(listOfContent[i].join(""))}\n`
            }
        }
    }
    //console.log(parsedContent);
    return parsedContent;
}