// 多重inject防止
if (window.__qiitaIncrementalSearchInjected) {
  throw new Error("already injected");
}
window.__qiitaIncrementalSearchInjected = true;

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

const STOCK_BTN_SELECTOR =
  'button[aria-label="ストックする"][aria-expanded="true"], button[aria-label="ストックを編集する"][aria-expanded="true"]';

// フィルタリング関数
const filterList = (event) => {
  try {
    let filter = event.target.value.toUpperCase();
    const stockBtn = document.querySelector(STOCK_BTN_SELECTOR);
    if (!stockBtn) return;
    const dialog = document.getElementById(stockBtn.getAttribute("aria-controls"));
    if (!dialog) return;
    let ul = dialog.querySelector('ul[aria-label="ストックリスト"]');
    if (!ul)
      throw new Error(
        "ストックリストが見つかりません（「ストックリスト」というaria-labelがついたulが見つかりません）"
      );

    let li = ul.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {
      let txtValue = li[i].textContent || li[i].innerText;
      li[i].style.display =
        txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
    }
  } catch (error) {
    console.error("フィルタリング中にエラーが発生しました:", error);
  }
};
// 要素をチェックし、必要なら新しいdivを挿入する関数
const checkElements = () => {
  const stockBtn = document.querySelector(STOCK_BTN_SELECTOR);
  if (!stockBtn) return;

  const dialogId = stockBtn.getAttribute("aria-controls");
  const dialog = dialogId ? document.getElementById(dialogId) : null;
  if (!dialog) return;

  const list = dialog.querySelector('ul[aria-label="ストックリスト"]');
  if (!list) return;

  if (dialog.querySelector("#chrome-extension-qiita-incremental-search")) return;

  let newDiv = document.createElement("div");
  newDiv.id = "chrome-extension-qiita-incremental-search";
  newDiv.className = "chrome-extension-qiita-incremental-search";
  let newText = document.createElement("span");
  newText.className = "chrome-extension-qiita-incremental-search-text";
  newText.textContent = "絞り込み：";
  let input = document.createElement("input");
  input.type = "text";
  input.addEventListener("input", filterList);
  newDiv.appendChild(newText);
  newDiv.appendChild(input);
  list.parentNode.insertBefore(newDiv, list);
  input.focus();
};

// 1秒ごとにcheckElementsを呼び出す
setInterval(checkElements, 1000);
