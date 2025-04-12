const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static("public"));

const publicFolder = path.join(__dirname, "public");
if (!fs.existsSync(publicFolder)) {
  fs.mkdirSync(publicFolder);
}

app.post("/execute", (req, res) => {
  const { language, code } = req.body;
  if (!language || !code) {
    return res.status(400).json({ error: "Missing language or code" });
  }

  const execId = uuidv4();
  let filename, command, outputFile;

  if (language.toLowerCase() === "python") {
    filename = `script-${execId}.py`;
    outputFile = `viz-${execId}.png`;
    command = `python ${filename}`;
  } else if (language.toLowerCase() === "r") {
    filename = `script-${execId}.R`;
    outputFile = `viz-${execId}.png`;
    command = `Rscript ${filename}`;
  } else {
    return res.status(400).json({ error: "Unsupported language" });
  }

  const replacedCode = code.replace(/{{EXEC_ID}}/g, execId);
  fs.writeFileSync(filename, replacedCode);

  exec(command, { timeout: 15000 }, (error) => {
    const generatedFile = fs
      .readdirSync(publicFolder)
      .find((f) => f.startsWith(`viz-${execId}`));

    if (generatedFile) {
      res.json({ vizUrl: `http://localhost:${PORT}/${generatedFile}` });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
