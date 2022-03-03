console.log("test message");

Array.from(document.querySelectorAll("img")).forEach(addDateDiv);

// ***
function addDateDiv(img) {
  console.log("img", img);
  if (isImgSrc(img.src)) {
    // Img src not waiting to be lazy loaded, so wrap immediately
    wrap(img);
  } else {
    // Wait for img src to be lazy loaded before wrapping
    observeImg(img);
  }
}

function observeImg(img) {
  const imgObserver = new MutationObserver(observerCallback);

  imgObserver.observe(img, { attributes: true });

  // ***
  function observerCallback(changes, observer) {
    const srcChange = changes.find((c) => c.attributeName.includes("src"));
    if (!srcChange) return;
    wrap(img);
    // Disconnect observer because it has accomplished its objective and is a drag on performance
    observer.disconnect();
  }
}

function wrap(toWrap, wrapper) {
  wrapper = wrapper || document.createElement("div");
  toWrap.parentNode.appendChild(wrapper);
  toWrap.insertAdjacentHTML(
    "beforebegin",
    '<div class="backDate">Test Date</div>'
  );
  return wrapper.appendChild(toWrap);
}

function isImgSrc(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}
