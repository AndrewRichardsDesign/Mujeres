const { ReplitConnectors } = require("@replit/connectors-sdk");
const fs = require("fs");
const path = require("path");

const connectors = new ReplitConnectors();

async function listFiles(query) {
  const params = new URLSearchParams({
    pageSize: "100",
    fields: "files(id,name,mimeType,parents)",
  });
  if (query) params.set("q", query);

  const response = await connectors.proxy("google-drive", `/drive/v3/files?${params}`, {
    method: "GET",
  });
  return await response.json();
}

async function listFolders() {
  console.log("Listing folders in your Google Drive...\n");
  const data = await listFiles("mimeType='application/vnd.google-apps.folder' and trashed=false");
  if (data.files && data.files.length > 0) {
    data.files.forEach((f) => {
      console.log(`  [FOLDER] ${f.name}  (id: ${f.id})`);
    });
  } else {
    console.log("  No folders found.");
  }
  return data.files || [];
}

async function listFilesInFolder(folderId) {
  console.log(`\nListing files in folder ${folderId}...\n`);
  const data = await listFiles(`'${folderId}' in parents and trashed=false`);
  if (data.files && data.files.length > 0) {
    data.files.forEach((f) => {
      console.log(`  ${f.mimeType.startsWith("image/") ? "[IMAGE]" : "[FILE]"} ${f.name}  (id: ${f.id}, type: ${f.mimeType})`);
    });
  } else {
    console.log("  No files found in this folder.");
  }
  return data.files || [];
}

async function downloadFile(fileId, fileName, destDir) {
  const response = await connectors.proxy("google-drive", `/drive/v3/files/${fileId}?alt=media`, {
    method: "GET",
  });
  const buffer = Buffer.from(await response.arrayBuffer());
  const destPath = path.join(destDir, fileName);
  fs.writeFileSync(destPath, buffer);
  console.log(`  Downloaded: ${destPath} (${buffer.length} bytes)`);
  return destPath;
}

async function downloadAllImages(folderId, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = await listFilesInFolder(folderId);
  const images = files.filter((f) => f.mimeType.startsWith("image/"));

  console.log(`\nDownloading ${images.length} images to ${destDir}...\n`);
  for (const img of images) {
    await downloadFile(img.id, img.name, destDir);
  }
  console.log(`\nDone! ${images.length} images downloaded.`);
}

const action = process.argv[2];
const arg = process.argv[3];
const arg2 = process.argv[4];

(async () => {
  try {
    if (action === "folders") {
      await listFolders();
    } else if (action === "list" && arg) {
      await listFilesInFolder(arg);
    } else if (action === "download" && arg) {
      await downloadAllImages(arg, arg2 || "./images");
    } else {
      console.log("Usage:");
      console.log("  node fetch-drive-photos.js folders              - List all folders");
      console.log("  node fetch-drive-photos.js list <folderId>      - List files in a folder");
      console.log("  node fetch-drive-photos.js download <folderId> [destDir]  - Download images");
    }
  } catch (err) {
    console.error("Error:", err.message || err);
  }
})();
