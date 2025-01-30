import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById("text-editor");
    const render = document.getElementById("text-render");

    function updatePreview() {
        const content = editor.value;
        // const newlines = content.replace(/\n/g, '\\\n');
        // need to add specific handling of newlines for special text formatting 
        render.innerHTML = marked.parse(content) // .replace(/\\(\s*<\/?[^>]+>)/g, '$1').replace(/\\(\r?\n)/g, '$1');
        // render.innerHTML = marked.parse(newlines);
    }
    editor.addEventListener('input', updatePreview);
    updatePreview();

    function addMarkdownFormatting(editor, openTag, closeTag) {
        // modify this such that if there is text selected, place the tags around instead of totally overwriting ...
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const content = editor.value;
        
        editor.value = content.slice(0, start) + openTag + closeTag + content.slice(end);
        editor.selectionStart = start + openTag.length;
        editor.selectionEnd = start + openTag.length;
    }
    editor.addEventListener('keydown', function(e) {
        const cmdOrCtrl = e.metaKey || e.ctrlKey;
        if (cmdOrCtrl && e.shiftKey && e.key.toLowerCase() === 'x') {
            e.preventDefault();
            addMarkdownFormatting(this, '~~', '~~');
        }
        if (cmdOrCtrl && e.key.toLowerCase() === 'b') {
            e.preventDefault();
            addMarkdownFormatting(this, '**', '**');
        }
        if (cmdOrCtrl && e.key.toLowerCase() === 'i') {
            e.preventDefault();
            addMarkdownFormatting(this, '*', '*');
        }
        if (cmdOrCtrl && e.key.toLowerCase() === 'u') {
            e.preventDefault();
            addMarkdownFormatting(this, '<u>', '</u>');
        }
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.selectionStart;
            const content = this.value;
            this.value = content.slice(0, start) + '    ' + content.slice(start);
            this.selectionStart = this.selectionEnd = start + 4;
        }
    });

    editor.addEventListener('paste', function(e) {
        const dT = e.clipboardData || window.clipboardData;
        const file = dT.files[ 0 ];
        console.log( file );
        // save image file to directory where markdown notes are stored ...
    });
});