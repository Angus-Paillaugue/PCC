var fs = require("fs");
var JavaScriptObfuscator = require('javascript-obfuscator');

const exclude = ["obfuscate.js", "pnpm-lock.yaml", "package.json", ".gitignore"];

const files = fs.readdirSync("./");

for(const file of files) {
    if (file.split(".").at(-1) === "js" && !exclude.includes(file)) {
        fs.readFile(file, "UTF-8", (err, data) => {
            if (err) throw err;
            var obfuscationResult = JavaScriptObfuscator.obfuscate(data);
            fs.writeFile(`./dist/${file}`, obfuscationResult.getObfuscatedCode(), (err) => {
                if(err) return console.log(err);
            });
        });
    }else if(!fs.statSync(file).isDirectory() && !exclude.includes(file)) {
        fs.readFile(file, "UTF-8", (err, data) => {
            if (err) throw err;
            fs.writeFile(`./dist/${file}`, data, (err) => {
                if(err) return console.log(err);
            });
        });
    }
} 

console.log("The extension has been built!");