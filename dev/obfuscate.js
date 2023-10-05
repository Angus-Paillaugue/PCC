const fs = require("fs");
const JavaScriptObfuscator = require('javascript-obfuscator');
const archiver = require('archiver');



const exclude = ["obfuscate.js", "pnpm-lock.yaml", "package.json", ".gitignore"];



fs.cpSync("./icons/", "../dist/icons", {recursive: true});
const files = fs.readdirSync("../dev");

for(const file of files) {
    if (file.split(".").at(-1) === "js" && !exclude.includes(file)) {
        fs.readFile(file, "UTF-8", (err, data) => {
            if (err) throw err;
            var obfuscationResult = JavaScriptObfuscator.obfuscate(data);
            fs.writeFile(`../dist/${file}`, obfuscationResult.getObfuscatedCode(), (err) => {
                if(err) throw err;
            });
        });
    }else if(!fs.statSync(file).isDirectory() && !exclude.includes(file)) {
        fs.readFile(file, "UTF-8", (err, data) => {
            if (err) throw err;
            fs.writeFile(`../dist/${file}`, data, (err) => {
                if(err) throw err;
            });
        });
    }
} 


// Zipping the dist
const output = fs.createWriteStream('../dist.zip');
const archive = archiver('zip');

output.on('close', () => {
    console.log("The extension has been built and zipped!");
});

archive.on('error', (err) => {
    throw err;
});

archive.pipe(output);
archive.directory("../dist", false);
archive.finalize();