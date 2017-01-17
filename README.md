# Lab 03 -- Debugging
In this lab we will be going over the built in debugger in vscode, and how to debug typescript by using source maps.


## VS Code Debugger
Visual Studio code has a built in debugger, which can be used to debug anything that is run with node.js. It also has extensions that can be used to debug other languages like Go or Python.

### Debug View

To bring up the Debug view, click on the Debugging icon in the View Bar on the side of VS Code.

![alt-text](https://code.visualstudio.com/images/debugging_debugicon.png "Debug View")

The Debug view displays all information related to debugging and has a top bar with debugging commands and configuration settings.

### Launch Configurations
To debug your app in VS Code, you'll first need to set up your launch configuration file - launch.json. Click on the Configure gear icon on the Debug view top bar, choose Node.js. VS Code will automatically create a launch.json file in a .vscode folder in the directory of your workspace.

It should look like this:
```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceRoot}/app.js",
            "cwd": "${workspaceRoot}"
        },
        {
            "type": "node",
            "request": "attach",
            "name": "Attach to Process",
            "port": 5858
        }
    ]
}

```
Change the program field to `"program": "${workspaceRoot}/lab03-part1.js"`, this tells the debugger which is your main file.

### Setting Breakpoints
Open the lab03-part1.js file and you'll see a simple example of TODO 

### Inspect your program's state and variables

### Stepping Through Source Code

## Debugging Typescript
In this example we will be using the lab03-part2.ts file. Provided is an implementation of 

### Javascript Source Maps
Because the source code that you write in Typescript isn't the same code that is run by Node, it can be hard to debug. This is solved by source maps!

Source maps are a handy way of showing how the compiled Javascript code is related to your original Typescript source code. The debugger can then show the original code you wrote, while actually running the compiled code.

http://www.mattzeunert.com/2016/02/14/how-do-source-maps-work.html

### Compiler Configurations
In order to tell tsc to include source maps, you need to modify the tsconfig.json file. Open the tsconfig.json file and set: `"sourceMap": true`

Now run tsc




