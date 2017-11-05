// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

function activate(context) {
  var disposable = vscode.commands.registerCommand(
    'extension.base64',
    function() {
      var activeEditor = vscode.window.activeTextEditor;
      var activeDoc = activeEditor.document;
      var activeDocText = activeDoc.getText();
      // ideally this would not be necessary - could just use languageId -
      // but the language ID for plain files is "plaintext"
      // which doesn't work well when pasting base64 into browser
      var activeDocExt =
        activeDoc.languageId === 'html' ? activeDoc.languageId : 'plain';
      // 06/01/2017: use languageId istead of 'html'
      var base64DocText = `data:text/${activeDocExt};base64,${Buffer.from(
        activeDocText,
        'ascii'
      ).toString('base64')}`;

      try {
        vscode.workspace
          .openTextDocument({ content: base64DocText, language: 'plaintext' })
          .then(
            result => {
              // // this works, but is not ideal because it replaces the open document's contents
              // return activeEditor.edit(editorEdit => {
              //     var start = new vscode.Position(0, 0);
              //     var end = new vscode.Position(activeDoc.lineCount + 1, 0);
              //     editorEdit.delete(new vscode.Range(start, end))
              //     editorEdit.replace(new vscode.Position(0, 0), base64DocText);
              // });

              vscode.commands.executeCommand('vscode.open', result.uri);
              return;
            },
            err => {
              console.log(err);
            }
          );
      } catch (e) {
        console.log('error!', e);
      }
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
