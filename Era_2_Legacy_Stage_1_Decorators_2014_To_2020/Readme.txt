-- First You Have To Install Babel Or TypeScript, Instructions Are Provided Below
##########          ##########          ##########          ##########          ##########          
##########          ##########          ##########          ##########          ##########          

- For Babel 
    0-> Simply (IF you cloned the repo already)
    $ npm i
-- IF YOU DIDN'T CLONE, THEN DO THE FOLLOWING:
    1->  $ npm init -y
    2->  $ npm i -D @babel/core @babel/node @babel/plugin-proposal-decorators
    
    3-> create .babelrc file with the following configs: 
        {
            "plugins": [["@babel/plugin-proposal-decorators", { "version": "2023-11" }]]
        }

    4-> to execute a file , run the command (remember that you can define commands in scripts also!)
        $ npx babel-node fileName.js

-- NOTE For Babel if you faced errors try to make the "version" : "legacy" instead

##########          ##########          ##########          ##########          ##########          
##########          ##########          ##########          ##########          ##########          

- For TypeScript, Node.js can run typescript but doesn't have a native support for decorators syntax yet, moreover ts-node is facing a hard time regarding versions mismatch , so don't try that as well

    0-> Simply (IF you cloned the repo already)
    $ npm i
-- IF YOU DIDN'T CLONE
    1-> $ npm ini -y
    2-> $ npm -D typescript tsx
    3-> $ npx tsc --init
    4-> Go to tsconfig.js and add IN compilerOptions object the property "experimentalDecorators": true

    5-> to execute a file, run the command
        $ npx tsx fileName.ts

##########          ##########          ##########          ##########          ##########          
##########          ##########          ##########          ##########          ##########          


##########          ##########          ##########          ##########          ##########          
------ For Curious People and Explorers
Other Options to Consider Are: 
    -> SWC "Speedy Web Compiler" (Rust Based, high-performance compiler used by tools like next.js)

    -> Deno (Modern runtime compiler like node.js, built by the original creator of node.js)

    -> Bun (modern JavaScript runtime (an alternative to Node.js) built on WebKit's JavaScriptCore engine. It has native support for transpiling TypeScript and modern JS features out of the box, including Stage 3 decorators.)

    -> esbuild (Go-Based Bundler)