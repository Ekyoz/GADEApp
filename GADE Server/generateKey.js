const randomstring = require("randomstring");
const copyPaste = require("copy-paste");

const length = parseInt(process.argv[2]) || 16; // récupère la longueur à partir de l'argument ou utilise une longueur par défaut de 16 caractères
const secretKey = randomstring.generate({
    length: length,
    charset: "alphabetic"
});

console.log(`Secret key generated: ${secretKey}`);
copyPaste.copy(secretKey);
console.log("Copied to clipboard");
