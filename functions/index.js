const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getLOTRChains = functions.https.onRequest((request, response) => {
  const fs = require("fs");

  fs.readFile("./assets/chain-filename.json", "utf-8", (err, data) => {
    if (err) throw err;
    response.send(JSON.parse(data));
  });
});

exports.textFromLOTR = functions.https.onRequest((req, res) => {
  const fs = require("fs");

  const getRand = max => {
    return Math.floor(Math.random() * max + 0);
  };

  fs.readFile("./assets/chain-filename.json", "utf-8", (err, data) => {
    if (err) throw err;
    const a = JSON.parse(data);
    let string = "";
    let nextKey = Object.keys(a)[getRand(Object.keys(a).length)];
    string = string.concat(nextKey);

    while (string.length < req.query.maxchar) {
      if (a[nextKey]) {
        nextKey = a[nextKey][getRand(a[nextKey].length)];
        string = string.concat(" " + nextKey);
      } else {
        nextKey = Object.keys(a)[getRand(Object.keys(a).length)];
      }
    }

    res.send(string);
  });
});
