import fs from "fs";
import path from "path";

export const unlinkIfExists = (filePath) => {
  try {
    if (!filePath) return;
    const abs = path.join(process.cwd(), filePath);
    if (fs.existsSync(abs)) fs.unlinkSync(abs);
  } catch (e) {
    console.error("unlink error:", e.message);
  }
};
