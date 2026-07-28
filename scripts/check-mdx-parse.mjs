import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";

const contentRoot = path.join(process.cwd(), "content");
const files = [];
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".mdx")) files.push(p);
  }
};
walk(contentRoot);

const failures = [];
let checked = 0;
for (const f of files) {
  checked++;
  const raw = fs.readFileSync(f, "utf8");
  let content;
  try {
    content = matter(raw).content;
  } catch {
    failures.push({ file: path.relative(contentRoot, f), err: "frontmatter-parse" });
    continue;
  }
  try {
    await compile(content, { jsx: true });
  } catch (e) {
    failures.push({ file: path.relative(contentRoot, f), err: String(e.message).split("\n")[0] });
  }
}
console.log(`检查 ${checked} 个 MDX，失败 ${failures.length} 个`);
for (const f of failures.slice(0, 60)) console.log(`  ${f.file} :: ${f.err}`);
fs.writeFileSync("/tmp/mdx-failures.json", JSON.stringify(failures, null, 2));
console.log(`完整列表写入 /tmp/mdx-failures.json`);
