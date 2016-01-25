chrome.contextMenus.create({
    title: "Translate with Yandex",
    contexts: ["page", "selection", "link"],
    onclick: yandexTranslate
});

function openTab(textToTranslate) {
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.create({
            "index": tab.index + 1,
            "url": "https://translate.yandex.com/?text=" + textToTranslate,
            "selected": true
        });
    });
}
function yandexTranslate(info) {
    if (info.selectionText && info.selectionText.length > 0) {
        openTab(info.selectionText);
        return;
    }
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "getLastClickedText", function (text) {
            if (text && text.length > 0) {
                openTab(text);
            }
        });
    });


}

