chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    function getClickedWord() {
        // real selection has highest priority
        var s = window.getSelection();
        var sText = s.toString().trim();
        if (sText.length > 0) {
            return sText;
        }

        // active elements with text are next in priority. Example: links
        var aText = document.activeElement != null ? document.activeElement.text : "";
        if (aText && aText.trim().length > 0) {
            return aText.trim();
        }

        // lowest in priority: try to find out if we have a word clicked
        s.modify("move", "forward", "character");
        s.modify("move", "backward", "word");
        s.modify("extend", "forward", "word");
        var esText = s.toString();
        s.modify("move", "forward", "character"); //clear selection
        return esText;
    }

    if (request == "getLastClickedText") {
        sendResponse(getClickedWord());
    }
});


