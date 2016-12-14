# Introduction to express.js MongoDB with Typescript 2.1
A basic API example for language app using node.js + express.js + MongoDB + Typescript 2.1

Learn how to develop a basic API using node.js, express.js, MongoDD with Typescript 2.1 and VS Code

This demo has been created for a purpose of lecture on ResetATH http://reset.ath.bielsko.pl/

## How to run? 
* `git clone`
* `npm install`
* open in VS Code and lunch or debug 

## How to use? 

By default API runs on `localhost:3000` and tries to connect to MongoDB server on `localhost:27017`

## Currently available endpoints

To all request you need to set this header: `reset-token: reset`. It's used by our *silly* authentication middleware - just as an example how middlewares function works in express.js

#### The ping enpoint - returns current date & time as timestamp
```
GET /ping HTTP/1.1
Host: localhost:3000
reset-token: token
```
#### Add all words from the below text
The below text comes from https://en.wikipedia.org/wiki/TypeScript

```
POST /words HTTP/1.1
Host: localhost:3000
reset-token: token
Content-Type: application/json

{
    "text": "TypeScript is a free and open-source programming language developed and maintained by Microsoft. It is a strict superset of JavaScript, and adds optional static typing and class-based object-oriented programming to the language. Anders Hejlsberg, lead architect of C# and creator of Delphi and Turbo Pascal, has worked on the development of TypeScript. TypeScript may be used to develop JavaScript applications for client-side or server-side (Node.js) execution.TypeScript is designed for development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript, any existing JavaScript programs are also valid TypeScript programs.TypeScript supports definition files that can contain type information of existing JavaScript libraries, much like C/C++ header files can describe the structure of existing object files. This enables other programs to use the values defined in the files as if they were statically typed TypeScript entities. There are third-party header files for popular libraries like jQuery, MongoDB, and D3.js. TypeScript headers for the Node.js basic modules are also available, allowing development of Node.js programs within TypeScript. The TypeScript compiler is itself written in TypeScript, transcompiled to JavaScript and licensed under the Apache 2 License.TypeScript is included as a first-class programming language in Microsoft Visual Studio 2013 Update 2 and later, beside C# and other Microsoft languages. An official extension allows Visual Studio 2012 to support TypeScript as well."
}
```

#### Get most popular words

```
GET /most-popular HTTP/1.1
Host: localhost:3000
reset-token: token
```
##### Example response: 
```
[
  {
    "count": 14,
    "word": "typescript"
  },
  {
    "count": 8,
    "word": "image"
  },
  // ...
]
```

#### Get less popular words

```
GET /less-popular HTTP/1.1
Host: localhost:3000
reset-token: token
```
##### Example response: 
```
[
  {
    "count": 1,
    "word": "defined"
  },
  {
    "count": 1,
    "word": "source"
  },
  // ...
]
```
