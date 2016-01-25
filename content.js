chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    function getClickedWord() {
        var s = window.getSelection();

        // real selection has highest priority
        var sText = s.toString().trim();
        console.log("sText: " + sText);
        if (sText.length > 0) {
            return sText;
        }

        // active elements with text are next in priority. Example: links
        var aText = document.activeElement != null ? document.activeElement.text.trim() : "";
        console.log("aText: " + aText);
        if (aText.length > 0) {
            return aText;
        }

        // lowest in priority: try to find out if we have a word clicked
        s.modify("move", "forward", "character");
        s.modify("move", "backward", "word");
        s.modify("extend", "forward", "word");
        var esText = s.toString();
        console.log("asText: " + esText);
        s.modify("move", "forward", "character"); //clear selection
        return esText;
    }

    if (request == "getLastClickedText") {
        sendResponse(getClickedWord());
    }
});


