# Format Code Action

Run eslint extension after then prettier extension in VS Code. Or the other way around, whatever way you want.

> Requires VS Code 1.44+

## Usage

Disbale `formatOnSave` and use the `source.fixAll.format` codeAction in whatever order you want with VS Code settings:

```json
  "editor.formatOnSave": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": [
    "source.fixAll.format",
    "source.fixAll.eslint"
  ]
```

Or for specific lanuage only:

```json
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.formatOnSave": false,
    "editor.codeActionsOnSave": ["source.fixAll.format", "source.fixAll.eslint"]
  },
```

This would run prettier by default, but for javascript files would run prettier and then eslint. If you want to reverse the order then just reverse the array.

## Motivation

I created this so I could use prettier and eslint together in the editor, in a specific order (eslint after prettier). Earlier prettier was setup to run on save and eslint as a codeAction with:

```json
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
```

This would often lead to prettier being run after eslint and eslint errors still being present.

Since the [March 2020 (v1.44)](https://code.visualstudio.com/updates/v1_44#_explicit-ordering-for-code-actions-on-save) update, VS Code allows setting `codeActionsOnSave` as an array. This allows setting the order of the codeActions.

The extension uses the [`CodeActionProvider`](https://code.visualstudio.com/api/references/vscode-api#CodeActionProvider) api to implement a simple code action that runs 'Format Document' on the current file. This allows us to disable `formatOnSave` and use it as a codeAction instead in a specific order with other extensions.

## VS Code API

### `vscode` module

- [`languages.registerCodeActionsProvider`](https://code.visualstudio.com/api/references/vscode-api#languages.registerCodeActionsProvider)


## Credits

Based on [Microsoft's code-actions-sample](https://github.com/microsoft/vscode-extension-samples/tree/master/code-actions-sample)
