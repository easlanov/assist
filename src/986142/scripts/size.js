var onElementResize = function(element, handler) {
    let frame = document.createElement('iframe');
    frame.style.cssText = 'position:absolute;left:0;top:-100%;width:100%;height:100%;margin:1px 0 0;border:none;opacity:0;pointer-events:none;';
    element.appendChild(frame);
    frame.contentWindow.onresize = function() {
        handler(element);
    };
};

var postDocumentHeight = function() {
    if (window.parent.postMessage) {
        var documentHeight = document.body.scrollHeight;
        window.parent.postMessage(JSON.stringify({
            name: 'AssistIframeResize',
            data: {
                height: documentHeight
            }
        }), '*');
    }
};

window.addEventListener('load', postDocumentHeight);
window.addEventListener('resize', postDocumentHeight);
window.addEventListener('DOMContentLoaded', function() {
    onElementResize(document.body, postDocumentHeight);
    postDocumentHeight();
});
