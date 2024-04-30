// スタイルを追加するための関数
const addStyle = (styles) => {
  let css = document.createElement("style");
  css.type = "text/css";

  if (css.styleSheet) css.styleSheet.cssText = styles;
  else css.appendChild(document.createTextNode(styles));

  document.getElementsByTagName("head")[0].appendChild(css);
};

// スタイルを追加
addStyle(
  ".chrome-extension-qiita-incremental-search { padding: 16px 16px 0px; }"
);
addStyle(
  ".chrome-extension-qiita-incremental-search-text { font-size: 16px; }"
);

// フィルタリング関数
const filterList = (event) => {
  let filter = event.target.value.toUpperCase();
  let ul = document.querySelector(".style-xntn0");
  let li = ul.getElementsByTagName("li");
  for (let i = 0; i < li.length; i++) {
    let txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
};

let observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          // ELEMENT_NODE
          let elements = node.getElementsByClassName("style-ss550t");
          for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            let newDiv = document.createElement("div");
            newDiv.className = "chrome-extension-qiita-incremental-search";
            let newText = document.createElement("span");
            newText.className =
              "chrome-extension-qiita-incremental-search-text";
            newText.textContent = "絞り込み：";
            let input = document.createElement("input");
            input.type = "text";
            input.addEventListener("input", filterList);
            newDiv.appendChild(newText);
            newDiv.appendChild(input);
            element.parentNode.insertBefore(newDiv, element.nextSibling);
          }
          let fallbackElements = node.getElementsByClassName("style-ymuwam");
          for (let i = 0; i < fallbackElements.length; i++) {
            let element = fallbackElements[i];
            let newP = document.createElement("p");
            newP.style.fontSize = "36px";
            newP.textContent = "見つかりませんでした";
            element.parentNode.insertBefore(newP, element.nextSibling);
          }
        }
      });
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
