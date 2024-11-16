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
  let elements = document.getElementsByClassName("style-1w73du3");
  return elements.length > 0;
}

let handleResult = (result) => {
  let statusElement = document.getElementById("status");
  if (result && result[0].result) {
    statusElement.textContent =
      "ストックのポップアップ（style-1w73du3）が見つかりました！フォームが表示されてない場合、カテゴリー一覧のポップアップ表示後、数秒待ってみてください🙇";
  } else {
    statusElement.textContent =
      "ストックのポップアップを表示してみてください（style-1w73du3が見つかりませんでした）";
  }
};
