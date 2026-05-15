chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabs[0].id },
      function: checkElement,
    },
    handleResult
  );
});

function checkElement() {
  const stockBtn = document.querySelector(
    'button[aria-label="ストックする"], button[aria-label="ストックを編集する"]'
  );
  if (!stockBtn) return false;
  const dialogId = stockBtn.getAttribute("aria-controls");
  return dialogId ? !!document.getElementById(dialogId) : false;
}

let handleResult = (result) => {
  let statusElement = document.getElementById("status");
  if (result && result[0].result) {
    statusElement.textContent =
      "ストックのポップアップが見つかりました！フォームが表示されてない場合、カテゴリー一覧のポップアップ表示後、数秒待ってみてください🙇";
  } else {
    statusElement.textContent =
      "ストックのポップアップを表示してみてください（ストックするボタンが見つかりませんでした）";
  }
};
