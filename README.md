# vscode-base64

A simple VS Code extension to transform the text in the active file into a base64 string.

If the active file is using HTML language mode, then it will make it a text/html base64. Otherwise it will be text/plain.

This is not published through the store, so just clone this into your vscode directory:

```
cd %USERPROFILE%
cd .vscode
git clone https://github.com/ericyd/vscode-base64 
```

To run the extension, the command is `base64`.