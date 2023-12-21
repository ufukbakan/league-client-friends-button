export const domChange = {
    on(callback) {
        document.body.addEventListener("DOMNodeInserted", callback);
        document.body.addEventListener("DOMNodeRemoved", callback);
    },
    off(callback) {
        document.body.removeEventListener("DOMNodeInserted", callback);
        document.body.removeEventListener("DOMNodeRemoved", callback);
    }
}