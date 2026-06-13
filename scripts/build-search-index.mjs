// @ts-check
/**
 * 构建期站内搜索索引（HEL-42 · pagefind）
 *
 * 背景：本站 `output: "standalone"`，`next build` 把预渲染的 SSG HTML 产到
 * `.next/server/app/**\/*.html`，但文件名是「扁平」的——
 *   index.html                                  → 实际 URL /
 *   learn.html                                   → 实际 URL /learn
 *   learn/getting-started/shaders.html           → 实际 URL /learn/getting-started/shaders
 * pagefind 直接吃这个目录会把 URL 算成 /learn.html 之类，与线上路由不符。
 *
 * 故本脚本：
 *  1) 把上述扁平 HTML 镜像进一个临时 staging 目录，改写成「URL 树 + index.html」：
 *       index.html                         → <staging>/index.html
 *       learn.html                         → <staging>/learn/index.html
 *       learn/getting-started/shaders.html → <staging>/learn/getting-started/shaders/index.html
 *     pagefind 默认 `--keep-index-url=false` 会把结尾的 /index.html 去掉，
 *     于是产出的搜索结果 url 恰好等于线上路由（/、/learn、/learn/...）。
 *  2) 跑 pagefind 对 staging 建索引，bundle 输出到 public/pagefind，
 *     这样 deploy.sh 现有的 `cp -r public .next/standalone/` 会把索引一起带上线，
 *     站点以静态资源形式服务 /pagefind/*。
 *
 * 仅依赖 Node 内置模块 + pagefind CLI（devDependency），无运行时副作用。
 * 产物（staging 与 public/pagefind）均为构建产物，进 .gitignore，deploy 时本地生成。
 */
import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(projectRoot, ".next", "server", "app");
const stagingDir = join(projectRoot, ".next", "pagefind-staging");
const outputDir = join(projectRoot, "public", "pagefind");

// Next 内部页（错误/兜底页），不进搜索索引
const SKIP_HTML = new Set(["_not-found.html", "_global-error.html"]);

/** 递归收集 appDir 下所有 *.html（相对 appDir 的 posix 路径） */
function collectHtml(dir, base = dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      collectHtml(full, base, out);
    } else if (entry.endsWith(".html")) {
      out.push(relative(base, full).split("\\").join("/"));
    }
  }
  return out;
}

/**
 * 扁平 HTML 相对路径 → staging 下的 URL 树路径。
 *   "index.html"                      → "index.html"            （URL /）
 *   "learn.html"                      → "learn/index.html"      （URL /learn）
 *   "learn/.../shaders.html"          → "learn/.../shaders/index.html"
 */
function toStagingPath(rel) {
  if (rel === "index.html") return "index.html";
  const withoutExt = rel.slice(0, -".html".length); // 去掉结尾 .html
  return join(withoutExt, "index.html");
}

function main() {
  if (!existsSync(appDir)) {
    console.error(
      `✗ 未找到 ${appDir}，请先跑 \`next build\`（standalone）再建索引`,
    );
    process.exit(1);
  }

  // 1) 重建 staging
  rmSync(stagingDir, { recursive: true, force: true });
  mkdirSync(stagingDir, { recursive: true });

  const htmlFiles = collectHtml(appDir).filter((rel) => {
    const name = rel.split("/").pop() ?? "";
    return !SKIP_HTML.has(name);
  });

  if (htmlFiles.length === 0) {
    console.error("✗ appDir 下没有可索引的 HTML（构建是否成功？）");
    process.exit(1);
  }

  for (const rel of htmlFiles) {
    const src = join(appDir, rel);
    const dest = join(stagingDir, toStagingPath(rel));
    mkdirSync(dirname(dest), { recursive: true });
    cpSync(src, dest);
  }
  console.log(`==> staging 就绪：${htmlFiles.length} 个页面 → ${stagingDir}`);

  // 2) 跑 pagefind（清空旧 bundle，重建到 public/pagefind）
  rmSync(outputDir, { recursive: true, force: true });
  // --force-language zh：本站中文为主，统一按中文分词（CJK 分词 + 拉丁 fallback），
  //   避免 pagefind 因首页/英文术语误判语言而拆出多套语言索引。
  // --include-characters：技术站点把 . _ - 等并入「词」，让 gl.clearColor /
  //   gl_FragColor / vec3 这类标识符可整体检索。
  const args = [
    "--site",
    stagingDir,
    "--output-path",
    outputDir,
    "--force-language",
    "zh",
    "--include-characters",
    "._-",
  ];
  execFileSync("pagefind", args, {
    cwd: projectRoot,
    stdio: "inherit",
  });

  console.log(`==> pagefind 索引完成 → ${relative(projectRoot, outputDir)}`);
}

main();
