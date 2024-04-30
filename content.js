// スタイルを追加するための関数
function addStyle(styles) {
  var css = document.createElement("style");
  css.type = "text/css";

  if (css.styleSheet) css.styleSheet.cssText = styles;
  else css.appendChild(document.createTextNode(styles));

  document.getElementsByTagName("head")[0].appendChild(css);
}

// スタイルを追加
addStyle(
  ".chrome-extension-qiita-incremental-search { padding: 16px 16px 0px; }"
);
addStyle(
  ".chrome-extension-qiita-incremental-search-text { font-size: 16px; }"
);

var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.addedNodes) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === 1) {
          // ELEMENT_NODE
          var elements = node.getElementsByClassName("style-ss550t");
          for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var newDiv = document.createElement("div");
            newDiv.className = "chrome-extension-qiita-incremental-search";
            var newText = document.createElement("span");
            newText.className =
              "chrome-extension-qiita-incremental-search-text";
            newText.textContent = "絞り込み：";
            var input = document.createElement("input");
            input.type = "text";
            input.addEventListener("input", filterList);
            newDiv.appendChild(newText);
            newDiv.appendChild(input);
            element.parentNode.insertBefore(newDiv, element.nextSibling);
          }
          var fallbackElements = node.getElementsByClassName("style-ymuwam");
          for (var i = 0; i < fallbackElements.length; i++) {
            var element = fallbackElements[i];
            var newP = document.createElement("p");
            newP.style.fontSize = "36px";
            newP.textContent = "見つかりませんでした";
            element.parentNode.insertBefore(newP, element.nextSibling);
          }
        }
      });
    }
  });

  function filterList(event) {
    var filter = event.target.value.toUpperCase();
    var ul = document.querySelector(".style-xntn0");
    var li = ul.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
      var txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
