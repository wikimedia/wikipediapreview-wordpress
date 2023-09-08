(function() {
    tinymce.PluginManager.add('my_tinymce_button', function(editor, url) {
        editor.addButton('my_tinymce_button', {
            text: 'My Button',
            icon: false,
            onclick: function() {
                // Prompt the user for a URL
                const userURL = prompt('Enter the URL:');
                if (!userURL) return; // Exit if the user cancels

                // Get the selected text
                const selectedText = editor.selection.getContent();

                // Check if text is selected
                if (selectedText) {
                    // Wrap the selected text in a hyperlink
                    const html = `<a href="https://en.wikipedia.org/wiki/Cat" class="wmf-wp-with-preview">${selectedText}</a>`;

                    // Insert the HTML into the editor
                    editor.selection.setContent(html);
                }
            }
        });
    });
    console.log('add tinymce btn');
})();