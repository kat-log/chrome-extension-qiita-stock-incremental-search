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
  ".chrome-extension-qiita-incremental-search { padding: 16px 16px 0px; width: 100%; box-sizing: border-box; }"
);
addStyle(
  ".chrome-extension-qiita-incremental-search-text { font-size: 16px; }"
);
addStyle(
  ".chrome-extension-qiita-incremental-search input { width: 100%; font-size: 16px;}"
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

// 要素をチェックし、必要なら新しいdivを挿入する関数
const checkElements = () => {
  let elements = document.getElementsByClassName("style-1w73du3");
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (
      !element.nextSibling ||
      element.nextSibling.className !==
        "chrome-extension-qiita-incremental-search"
    ) {
      let newDiv = document.createElement("div");
      newDiv.className = "chrome-extension-qiita-incremental-search";
      let newText = document.createElement("span");
      newText.className = "chrome-extension-qiita-incremental-search-text";
      newText.textContent = "絞り込み：";
      let input = document.createElement("input");
      input.type = "text";
      input.addEventListener("input", filterList);
      newDiv.appendChild(newText);
      newDiv.appendChild(input);
      element.parentNode.insertBefore(newDiv, element.nextSibling);
    }
  }
};

// 1秒ごとにcheckElementsを呼び出す
setInterval(checkElements, 1000);
