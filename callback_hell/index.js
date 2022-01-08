const { 
  readdir,
  readFile,
  writeFile } = require('fs').promises;
const { join } = require("path");
const inbox = join(__dirname, "inbox");
const outbox = join(__dirname, "outbox");

const reverseText = str =>
  str
  .split("")
  .reverse()
  .join("");

async function reverseFile(file) {
  let fileContent;

  try {
    fileContent = await readFile(join(inbox, file), "utf8");
  } catch(error) {
    throw('Error reading file ' + file)
  }

  try {
    await writeFile(join(outbox, file), reverseText(fileContent));
  } catch(error) {
    throw('Error writing file ' + file)
  }
}

async function main() {
  // Read and reverse contents of text files in a directory
  let files;

  try {
    files = await readdir(inbox);
  } catch(error) {
    console.log("Error: Folder inaccessible");
  }

  files.forEach(async (file) => reverseFile(file));

}

main().then(_ => console.log('Files reversed'));

// readdir(inbox, (error, files) => {
//   if (error) return console.log("Error: Folder inaccessible");
//   files.forEach(file => {
//     readFile(join(inbox, file), "utf8", (error, data) => {
//       if (error) return console.log("Error: File error");
//       writeFile(join(outbox, file), reverseText(data), error => {
//         if (error) return console.log("Error: File could not be saved!");
//         console.log(`${file} was successfully saved in the outbox!`);
//       });
//     });
//   });
// });