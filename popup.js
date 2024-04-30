chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabs[0].id },
      function: checkElement,
    },
    handleResult
  );
});

function checkElement() {
  var elements = document.getElementsByClassName("style-ss550t");
  return elements.length > 0;
}

function handleResult(result) {
  var statusElement = document.getElementById("status");
  if (result && result[0].result) {
    statusElement.textContent =
      "ストックのポップアップ（style-ss550t）が見つかりました！フォームが表示されてない場合、ページが完全に読み込まれてから再度ポップアップしてみてください🙇🙇";
  } else {
    statusElement.textContent =
      "ページが完全に読み込まれたらストックのポップアップを表示してみてください（style-ss550tが見つかりませんでした）";
  }
}
