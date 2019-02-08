# vsc-nvm README

Simplyify your node versioning workflow with `nvm` and this extension.

## Features

This extension simplifies nvm workflow by:

- Automatically running `nvm use` on each terminal opened when an `.nvmrc` file exists in your workspace
- Providing a [command input hook](https://code.visualstudio.com/updates/v1_31#_custom-command-user-input-variables) to choose a version of node to run tasks against

## Requirements

- To be able to pick different node versions, you must have [nvm](https://github.com/creationix/nvm) installed
- To have `nvm use` executed on terminal startup, you must have [nvm](https://github.com/creationix/nvm) installed along with a `.nvmrc` file in your workspace

## Extension Settings

### Running a task with a choosable node version

```json
// launch.json for running version picker with defaults
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest Current File",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--detectOpenHandles", "${relativeFile}"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "runtimeExecutable": "${env:HOME}/.nvm/versions/node/${input:pickVersion}/bin/node"
    }
  ],
  "inputs": [
    {
      "id": "pickVersion",
      "type": "command",
      "command": "extension.node-version"
    }
  ]
}
```

### Running a task with a choosable node version in a custom nvm directory

```json
// launch.json for running version picker with specified nvm dir
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest Current File",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--detectOpenHandles", "${relativeFile}"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "runtimeExecutable": "${env:HOME}/.nvm/versions/node/${input:pickVersion}/bin/node"
    }
  ],
  "inputs": [
    {
      "id": "pickVersion",
      "type": "command",
      "command": "extension.node-version",
      "args": {
        "nvmDir": "/my/home/.nvm"
      }
    }
  ]
}
```
