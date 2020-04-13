const fs = require("fs");
const travisToken = process.env.TRAVIS_API_TOKEN;

if (travisToken) {
  fs.writeFile(
    `admin/src/containers/Admin/token.js`,
    `window.token = "${process.env.TRAVIS_API_TOKEN}";`,
    "utf8",
    (err) => {}
  );
} else {
  console.log("Travis token was not found");
}
