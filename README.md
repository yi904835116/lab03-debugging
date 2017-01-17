# Lab 03 -- Debugging
## Overview
> "If debugging is the process of removing software bugs, then programming must be the process of putting them in." - Edsger Dijkstra 

Finding and removing errors in programs ("debugging") is probably the most common, most important, and most difficult task in implementing computer programs. Luckliy, there are plenty of tried and true methods to help identify errors, and VS Code is able to offer further support. 

* Fun fact: The word "debug" was coined by Dr. Grace Hopper when she was working on the Mark II computer back in 1947. A moth a moth was discovered inside the computer, interfering with a relay and keeping it from working. Removing the moth ("debugging", as Dr. Hopper called it) fixed the computer. 

This lab will walk you through the debugging process and how to use the VS Code debugger, and how to use source maps to debug Typescript. Note that while you may be able to find and fix the bugs on your own, you should try and use the debugger so that you are familiar with the Eclipse tools (which can be really helpful later!). 

## Objectives
* To review and practice debugging techniques
* To learn to set up and use the VS Code debugger
* Debug Typescript by using source maps

## Necessary Files
You will need to **fork** and **clone** [this repository](https://github.com/info498e-w17/lab03-debugging) and open the folder in VS Code.

## Debugging Techniques
>"The most effective debugging tool is still careful thought, coupled with judiciously placed print statements." - Brian Kernighan, "Unix for Beginners" (1979) 

The above quote from Brian Kernighan (one of the inventors of the C language) remains true in that--print statement debugging can be one of the most effective methods of debugging a program. Or at least one of your professors' favorite methods. The basic idea is thus: in order to figure out whether a program is working, we need to know what the program is doing. Which means we want to know things like the value of variables at any particular time, whether or not we've gotten into a particular method or loop, etc. This can be fairly intuitive process--basically if you want to know about something your program is doing, just put a print statement to tell you! 

Some hints for doing print-statement debugging


* Put the print statement as close as possible to the problem code (generally right before the line that breaks); this will let you see what the program was doing right before it crashed.
* "in methodName", "inside for loop" "inside if statement" are also good things to print out.
* I like putting "***DEBUG***" in big letters before my output String; it makes it easier to see the debug messages if you have a lot of output being printed.
* Be sure and comment out and delete your print statements once you're finished!


## Debugging Techniques - The VS Code Debugger
 The main goal of using print statement debugging is to be able to "inspect" the current state of the program as it is running--to get a sense for what code is being executed when and how often, and what the values of variables are at any particular moment.

However, this kind of inspection can be automed with VS Code's Debugger, a tool built in, which can be used to debug anything that is run with node.js. It also has extensions that can be used to debug other languages like Go or Python.

### Debug View

To bring up the Debug view, click on the Debugging icon in the View Bar on the side of VS Code.

![alt-text](https://code.visualstudio.com/images/debugging_debugicon.png "Debug View")

The Debug view displays all information related to debugging and has a top bar with debugging commands and configuration settings.

### Launch Configurations
To debug your app in VS Code, you'll first need to set up your launch configuration file - launch.json. Click on the Configure gear icon on the Debug view top bar, choose Node.js. VS Code will automatically create a launch.json file in a .vscode folder in the directory of your workspace.

It should look like this:
```json
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
Change the program field to `"program": "${workspaceRoot}/src/lab03-tutorial.js"`, this tells the debugger which is your main file. "${workspaceRoot}" is just a local variable that refers to the current folder that is open in VS Code.

### Setting Breakpoints
Open the lab03-tutorial.js file and you'll see a simple **js** program that is already written for you. Your task is to use breakpoints to practice using the debugger. Later you will practice with a **ts** file.
 
You need to set a breakpoint which will tell the debugger which line of code to "freeze" the program at. You should pick a line before the sum(n) function gets called. To set a breakpoint, click just to the left of the line number you are targetting. You should see a red stop sign appear.
 
### Stepping Through Source Code
 
Click on the debug icon to the left of the VS Code window. Click on the play button. If your settings are configured correctly, you should see a window at the bottom of VS code appear called "Debug Console". This is where you can see your program's output as it runs.
 
Use the arrows in the debug bar at the top of the window to "step into" the sum function. If you don't know what the difference between step into and step over, play around with both of them until you figure it out.

## Debugging Typescript
In this section we will see how to get the debugger to look at Typescript files, giving you the ability to set breakpoints in a .ts file directly.

### Javascript Source Maps
Because the source code that you write in Typescript isn't the same code that is run by Node, it can be hard to debug. This is solved by source maps!

Source maps are a handy way of showing how the compiled Javascript code is related to your original Typescript source code. The debugger can then show the original code you wrote, while actually running the compiled code.

### Compiler Configurations
In order to tell tsc to include source maps, you need to modify the tsconfig.json file. Open the tsconfig.json file and set: `"sourceMap": true`

Now run tsc in your workspace and look in the build folder. You will see that there are files ending in .js.map for every javascript file that was compiled. Understanding how the mappings are done is outside the scope of this class, but feel free to read more *[here](http://www.mattzeunert.com/2016/02/14/how-do-source-maps-work.html)*.

### Launch Configurations
In an earlier section we set up the launch.json configuration in the .vscode folder. These settings only work for debugging .js files, but with a few added settings we can get the debugger to associate the compiled files witih the source files by using the source maps.

First change the program field to set stringBuilder.ts as your main: `"program": "${workspaceRoot}/src/stringBuilder.ts"`.

Next you need to set sourceMaps to true: `"sourceMaps": true`

Finally you need to tell the debugger to look at all the javascript files in build by using a glob. Set this here:
```json
"outFiles": [
                "${workspaceRoot}/build/*.js"
            ]
```
            
Your launch.json should look like this: 

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceRoot}/src/stringBuilder.ts",
            "cwd": "${workspaceRoot}",
            "sourceMaps": true,
            "outFiles": [
                "${workspaceRoot}/build/*.js"
            ]
        },
        ...
    ]
}
```

### Submission
To recieve credit for this lab, turn in a link to your repository in the Lab3 assignment on Canvas *[here](https://canvas.uw.edu/courses/1100150/assignments/3580975)*
