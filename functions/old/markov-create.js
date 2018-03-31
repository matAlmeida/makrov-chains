"use strict";
if (process.argv.length < 3) {
  console.log(`Usage: node ${process.argv[1]} FILENAME`);
  process.exit(1);
}

const fs = require("fs");
const filename = process.argv[2];

var a = {};

var max = 30;

fs.readFile(filename, "utf-8", (err, data) => {
  if (err) throw err;
  console.log("OK: " + filename);
  data.split(" ").map((word, index, textArray) => {
    // if (index > max) return;
    word = word.toLocaleLowerCase();
    word = removeSpecials(word);
    if (word !== "" && index < textArray.length) a[word] = [];
  });

  data.split(" ").map((word, index, textArray) => {
    // if (index > max) return;
    word = word.toLocaleLowerCase();
    word = removeSpecials(word);
    if (word !== "")
      if (
        index < textArray.length &&
        a[word].indexOf(textArray[index + 1]) !== 0
      )
        a[word].push(removeSpecials(textArray[index + 1]).toLocaleLowerCase());
  });

  function removeSpecials(str) {
    if (!str) return "";
    var lower = str.toLowerCase();
    var upper = str.toUpperCase();

    var res = "";
    for (var i = 0; i < lower.length; ++i) {
      if (lower[i] != upper[i] || lower[i].trim() === "") res += str[i];
    }
    return res.replace(/\r?\n|\r/g, "");
  }

  fs.writeFileSync(
    "./chain-" + "filename" + ".json",
    JSON.stringify(a),
    "utf-8"
  );

  function getRand(max) {
    return Math.floor(Math.random() * max + 0);
  }

  let string = "";
  let nextKey = Object.keys(a)[getRand(Object.keys(a).length)];
  string = string.concat(nextKey);

  while (string.length < 280) {
    if (a[nextKey]) {
      nextKey = a[nextKey][getRand(a[nextKey].length)];
      string = string.concat(" " + nextKey);
    } else {
      nextKey = Object.keys(a)[getRand(Object.keys(a).length)];
    }
  }

  // console.log(a);
  // console.log(a["bran"]);
  console.log("\n", string);
});
