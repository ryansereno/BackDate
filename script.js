console.log("test message");

Array.from(document.querySelectorAll("img")).forEach(function observe(img) {
  if (isImgSrc(img.src)) {
    // Img src not waiting to be lazy loaded, so wrap immediately
    wrap(img);
  } else {
    // Wait for img src to be lazy loaded before wrapping
    var observer = new MutationObserver(function (changes) {
      changes.forEach((change) => {
        if (change.attributeName.includes("src")) wrap(img);
      });
    });
    observer.observe(img, { attributes: true });
  }
});

// ***

function wrap(toWrap, wrapper) {
  wrapper = wrapper || document.createElement("div");
  toWrap.parentNode.appendChild(wrapper);
  toWrap.insertAdjacentHTML(
    "beforebegin",
    '<div id="backDate">Test Date</div>'
  );
  return wrapper.appendChild(toWrap);
}

function isImgSrc(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}
