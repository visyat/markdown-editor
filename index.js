import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById("text-editor");
    const render = document.getElementById("text-render");

    function updatePreview() {
        const content = editor.value;
        // console.log('Updating preview with:', content);
        render.innerHTML = marked.parse(content);
    }

    editor.addEventListener('input', updatePreview);
    updatePreview();
});