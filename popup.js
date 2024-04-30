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
    statusElement.textContent = "style-ss550tが見つかりました！";
  } else {
    statusElement.textContent = "style-ss550tが見つかりませんでした！";
  }
}
