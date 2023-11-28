import UglifyJS from "uglify-js";
import fs from "fs/promises";
import { createWriteStream } from "fs";
import path from "path";
import archiver from "archiver";
import format from 'prettier-format'

const thisDir = path.dirname(import.meta.url).replace("file:///", "");
const extensionFiles = await fs.readdir(path.join(thisDir, "../extension/"), { recursive: true });
const outputDir = path.join(thisDir, "distContent/");
const devDir = path.join(thisDir, "../extension/");
const doNotObfuscate = ["jquery"];
const excludedItems = ["node_modules", "tailwind.config.js", "package.json", "pnpm-lock.yaml", "popup-dev.css"];

const isJsFile = (file) => file.endsWith(".js");
const isInArray = (array, item) => {
    for (const el of array) {
        if(item.includes(el)) return true;
    }
    return false;
}
const isExcluded = (path) => {
    return isInArray(excludedItems, path);
}
const exists = async(path) => {  
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}

// Cleaning output directory
if(await exists(outputDir)) {
    await fs.rm(outputDir, { recursive: true, force: true });
    console.log("\nOutput directory cleaned !\n");
}
fs.mkdir(outputDir);

// Obfuscating and minifying files that need it and copying the rest
for await(const file of extensionFiles){
    const newFilePath = path.join(outputDir, file);
    const devFilePath = path.join(devDir, file);
    // Checks preconditions
    if(!exists(devFilePath)) continue;
    if(isExcluded(devFilePath)) continue;

    console.log("Processing "+file);

    const stats = await fs.stat(devFilePath);
    if(stats.isDirectory()){
        fs.mkdir(newFilePath);
    }else {
        if(!isJsFile(file) || isInArray(doNotObfuscate, devFilePath)){
            fs.copyFile(devFilePath, newFilePath);
        }else {
            const code = await fs.readFile(devFilePath, "utf-8");
            const result = UglifyJS.minify(code);
            const formatted = await format(result.code, {
                filepath: outputDir+file,
                useCache: false,
                semi: false,
            });
            fs.writeFile(outputDir+file, formatted);
        }
    }
}
console.log("Processing complete !\n");

// Building extension
console.log("Building extension...");
const output = createWriteStream(path.join(thisDir, 'build.zip'));
const archive = archiver('zip');

output.on('close', async() => {
    await fs.rm(outputDir, { recursive: true, force: true });
    console.log("\nExtension built !\n");
});

archive.on('error', function(err){
    throw err;
});
archive.directory(outputDir, false);
archive.pipe(output);
archive.finalize();