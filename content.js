chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    function getClickedWord() {
        if (document.activeElement != null) {
            var text = document.activeElement.text;
            if (text.length > 0 && text.length <= 140) {
                return text;
            }
        }
        var s = window.getSelection();
        if (!s.isCollapsed) {
            return s.toString();
        }
        s.modify("move", "forward", "character");
        s.modify("move", "backward", "word");
        s.modify("extend", "forward", "word");
        var res = s.toString();
        s.modify("move", "forward", "character"); //clear selection
        return res;
    }

    if (request == "getLastClickedText") {
        sendResponse(getClickedWord());
    }
});


