console.log("test message");

Array.from(document.querySelectorAll("img")).forEach(addDateDiv);

// This isn't great for performance but I can't think of a better way,
// that accounts for all the various corner cases like infinite scroll,
// and this is so easy.
setInterval(() => {
  Array.from(document.querySelectorAll("img:not(.backdateSkip)")).forEach(
    addDateDiv
  );
}, 2000);

// ***
function addDateDiv(img) {
  console.log("img", img);
  // Skip this element in future calls to addDateDiv(){...}, as we are now handling it
  img.classList.add("backdateSkip");
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
  // We could use someone else's better code for this, to make it more thorough
  // and accurate, but for now this should be good enough
  return url.match(/\.(jpeg|jpg|gif|png)/) != null;
}
