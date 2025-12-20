import fs from "fs";
import path from "path";

function restructure(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      restructure(fullPath);
    } else if (file.name.endsWith(".html") && file.name !== "index.html") {
      const baseName = file.name.replace(".html", "");
      const newDir = path.join(dir, baseName);
      const newPath = path.join(newDir, "index.html");

      fs.mkdirSync(newDir, { recursive: true });
      fs.renameSync(fullPath, newPath);
      console.log(`  ${file.name} -> ${baseName}/index.html`);
    }
  }
}

console.log("Restructuring dist to use /page/index.html format...");
restructure("./dist");
console.log("Done!");
