import { existsSync, readFileSync } from 'fs';
import path from 'path';
import * as vscode from 'vscode';

import { parse } from '@babel/parser';
// @ts-ignore
import traverse from '@babel/traverse';
import * as types from '@babel/types';

const outputChannel = vscode.window.createOutputChannel('blocklet');
outputChannel.appendLine('Hello from blocklet!');

vscode.languages.registerHoverProvider(
  [
    {
      scheme: 'file',
      language: 'javascript',
    },
    {
      scheme: 'file',
      language: 'typescript',
    },
  ],
  {
    async provideHover(document, position, token) {
      outputChannel.appendLine('provideHover');

      const text = document.lineAt(position.line).text;
      const wordRange = document.getWordRangeAtPosition(position);
      const word = document.getText(wordRange);

      // Parse the document text into an AST
      let ast;
      try {
        ast = parse(text, {
          sourceType: 'module',
          plugins: ['typescript', 'jsx'],
        });
      } catch (err) {
        console.error('Failed to parse file:', err);
        return;
      }

      // Extract import/require statements
      const packageMap: { [key: string]: string } = {};
      traverse(ast, {
        ImportDeclaration(path: any) {
          const moduleName = path.node.source.value;
          if (types.isStringLiteral(path.node.source)) {
            packageMap[moduleName] = '';
          }
        },
        CallExpression(path: any) {
          if (
            types.isIdentifier(path.node.callee, { name: 'require' }) &&
            path.node.arguments.length === 1 &&
            types.isStringLiteral(path.node.arguments[0])
          ) {
            const moduleName = path.node.arguments[0].value;
            packageMap[moduleName] = '';
          }
        },
      });

      Object.entries(packageMap).forEach(([packageName]) => {
        if (!/^[@\/-z0-9_-]+$/i.test(packageName)) {
          delete packageMap[packageName];
        }
        const finalPackageName = packageName.split('/').slice(0, 2).join('/');
        delete packageMap[packageName];
        packageMap[finalPackageName] = '';
      });

      const hovers = [];
      for (const packageName of Object.keys(packageMap)) {
        try {
          const packageJsonPath = require.resolve(
            `${packageName}/package.json`,
            {
              paths: [vscode.workspace.rootPath || process.cwd()],
            }
          );
          const packageJson = require(packageJsonPath);
          packageMap[packageName] = packageJson.version;
          hovers.push(`${packageName}: **${packageMap[packageName]}**`);
        } catch (err) {
          console.error(err);
          delete packageMap[packageName];
        }
      }

      // Show hover info if the word matches an imported module
      if (hovers.length > 0) {
        return new vscode.Hover(new vscode.MarkdownString(hovers.join('\n')));
      }
    },
  }
);

export function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage('Hello World from blocklet!');
  outputChannel.appendLine('activated');

  const disposable = vscode.commands.registerCommand(
    'blocklet.helloWorld',
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage('Hello World from blocklet!');
    }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
