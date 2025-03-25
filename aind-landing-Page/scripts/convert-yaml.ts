/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");

// Path to your YAML file
const yamlFilePath = path.join(process.cwd(), "public", "tools-data.yaml"); // Update with your actual YAML filename
// Path where you want to save the JSON file (in the public directory)
const jsonFilePath = path.join(process.cwd(), "public", "tools-data.json");

try {
  // Make sure the YAML file exists
  if (!fs.existsSync(yamlFilePath)) {
    console.error(`YAML file not found at ${yamlFilePath}`);
    process.exit(1);
  }

  // Read the YAML file
  const yamlContent = fs.readFileSync(yamlFilePath, "utf8");

  // Convert YAML to JSON
  const jsonData = yaml.load(yamlContent);

  // Write the JSON to the public directory
  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

  console.log("Successfully converted YAML to JSON");
  console.log(`YAML file: ${yamlFilePath}`);
  console.log(`JSON file: ${jsonFilePath}`);
} catch (error) {
  console.error("Error converting YAML to JSON:", error);
  process.exit(1);
}
