const trganClasses = ["TrganTest", "TrganHtmlReport", "TrganContainer", "TrganTable", "GherkinKeyword", "Screenshot"];
const trganMethods = ["DoingOperations","AddStep", "Write", "SaveAsFile", "AddEntry", "AddColumn", "GetScreenshot", "FromBase64", "FromBytes", "CreateTest", "CreateContainer", "Generate", "CreateStep", "Pass", "Fail", "Skip", "Log"];
const trganProperties = ["AsBase64EncodedString", "AsByteArray", "ValueOf", "Status", "Name", "Message", "Given", "When", "Then"];

function highlightTrganSyntax() {
    document.querySelectorAll("code").forEach(code => {
        if (code.dataset.trganProcessed) return;

        let html = code.innerHTML;

        trganClasses.forEach(cls => {
            const regex = new RegExp(`\\b${cls}\\b`, "g");
            html = html.replace(regex, `<span class="trgan-class">${cls}</span>`);
        });

        trganMethods.forEach(method => {
            const regex = new RegExp(`\\b${method}\\b`, "g");
            html = html.replace(regex, `<span class="trgan-method">${method}</span>`);
        });

        trganProperties.forEach(prop => {
            const regex = new RegExp(`\\b${prop}\\b`, "g");
            html = html.replace(regex, `<span class="trgan-property">${prop}</span>`);
        });
        code.innerHTML = html;
        code.dataset.trganProcessed = "true";
    });
}

// Initial load
document.addEventListener("DOMContentLoaded", highlightTrganSyntax);

// MkDocs Material internal navigation
window.addEventListener("navigation", () => {
    setTimeout(highlightTrganSyntax, 50);
});

// Hook into fetch
const originalFetch = window.fetch;
window.fetch = function(...args) {
    return originalFetch.apply(this, args).then(response => {
        // Wait for DOM update after fetch
        setTimeout(highlightTrganSyntax, 100);
        return response;
    });
};

// Hook into XMLHttpRequest
const originalOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(...args) {
    this.addEventListener("load", () => {
        setTimeout(highlightTrganSyntax, 100);
    });
    return originalOpen.apply(this, args);
};