const fs = require("fs");
const travisToken = process.env.TRAVIS_API_TOKEN;

if (travisToken) {
  fs.writeFile(
    `public/data.json`,
    JSON.stringify({ token: process.env.TRAVIS_API_TOKEN }),
    "utf8",
    (err) => {}
  );
} else {
  console.log("Travis token was not found");
}
