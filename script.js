console.log("test message");

findImageSource(document.body);
function wrap(toWrap, wrapper) {
    wrapper = wrapper || document.createElement("div");
    toWrap.parentNode.appendChild(wrapper);
    return wrapper.appendChild(toWrap);
}

function findImageSource(element) {
    if (element.hasChildNodes()) {
        element.childNodes.forEach(findImageSource);
    } else if (element.nodeName == "IMG") {
        console.log(element.src);
        wrap(element);
        element.parentNode.id = 'wrap'
        element.insertAdjacentHTML(
            "beforebegin",
            '<div id="backDate">Test Date</div>'
        );
    }
}
