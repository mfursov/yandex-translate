chrome.contextMenus.create({
    "title": "Translate with Yandex",
    "contexts": ["selection"],
    "id": "yandexTranslate"
});
chrome.contextMenus.onClicked.addListener(yandexTranslate);

function yandexTranslate(info) {
    /* build the query string */
    var queryString = "https://translate.yandex.com/?text=" + info.selectionText;
    /* get the index of the current tab and open the Google Translate tab right next to it */
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.create({
            "index": tab.index + 1,
            "url": queryString,
            "selected": true
        });
    });
}

