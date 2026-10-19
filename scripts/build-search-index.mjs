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
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  lstatSync,
  realpathSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(projectRoot, ".next", "server", "app");
const stagingDir = join(projectRoot, ".next", "pagefind-staging");
// No arbitrary destination: deployment output belongs to this fresh build only.
const cli = process.argv.slice(2);
const owned =
  cli.length === 2 && cli[0] === "--output-path" && cli[1] === ".next/pagefind";
if (cli.length && !owned)
  throw Error("Only --output-path .next/pagefind is supported");
const outputDir = join(projectRoot, owned ? ".next" : "public", "pagefind");
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
function absent(path) {
  try {
    lstatSync(path);
    return false;
  } catch (e) {
    if (e.code === "ENOENT") return true;
    throw e;
  }
}
function tree(base, independent = false) {
  const result = {};
  function walk(path) {
    const st = lstatSync(path);
    if (st.isSymbolicLink()) throw Error("Search tree symlink: " + path);
    if (st.isDirectory())
      for (const n of readdirSync(path).sort()) walk(join(path, n));
    else {
      if (!st.isFile() || (independent && st.nlink !== 1))
        throw Error("Search nonregular/shared file: " + path);
      if (Object.keys(result).length >= 50000)
        throw Error("Search file budget");
      result[relative(base, path).split("\\").join("/")] = digest(
        readFileSync(path),
      );
    }
  }
  walk(base);
  if (!Object.keys(result).length) throw Error("Empty search tree: " + base);
  return result;
}
function tools() {
  for (const key of [
    "PAGEFIND_BINARY_PATH",
    "PAGEFIND_EXTENDED_BINARY_PATH",
    "npm_config_arch",
  ])
    if (process.env[key])
      throw Error("Unsupported search tool override: " + key);
  const pf = realpathSync(join(projectRoot, "node_modules/pagefind"));
  const pkg = JSON.parse(readFileSync(join(pf, "package.json"), "utf8"));
  const name =
    "@pagefind/" +
    (process.platform === "win32" ? "windows" : process.platform) +
    "-" +
    process.arch;
  const require = createRequire(join(pf, "package.json"));
  let binary;
  for (const n of ["pagefind_extended", "pagefind"]) {
    try {
      binary = require.resolve(
        name + "/bin/" + n + (process.platform === "win32" ? ".exe" : ""),
      );
      break;
    } catch {}
  }
  if (!binary) throw Error("Missing installed Pagefind binary");
  const native = dirname(dirname(realpathSync(binary)));
  for (const p of [pf, native])
    if (!p.startsWith(projectRoot + "/node_modules/"))
      throw Error("Search tool escapes dependencies");
  const meta = JSON.parse(readFileSync(join(native, "package.json"), "utf8"));
  if (
    pkg.name !== "pagefind" ||
    meta.name !== name ||
    pkg.optionalDependencies?.[name] !== meta.version ||
    pkg.version !== meta.version
  )
    throw Error("Pagefind package identity mismatch");
  return {
    pagefindRoot: relative(projectRoot, pf),
    nativeRoot: relative(projectRoot, native),
    name,
    version: pkg.version,
    binary: relative(native, realpathSync(binary)),
    pagefindFiles: tree(pf),
    nativeFiles: tree(native),
    nodeSha256: digest(readFileSync(process.execPath)),
  };
}
function htmlInputs() {
  return Object.fromEntries(
    collectHtml(appDir)
      .sort()
      .map((p) => [p, digest(readFileSync(join(appDir, p)))]),
  );
}

// Next 内部页（错误/兜底页），不进搜索索引
const SKIP_HTML = new Set(["_not-found.html", "_global-error.html"]);

/** 递归收集 appDir 下所有 *.html（相对 appDir 的 posix 路径） */
function collectHtml(dir, base = dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (owned && lstatSync(full).isSymbolicLink())
      throw Error("Search input symlink: " + full);
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

  let before;
  if (owned) {
    for (const p of [
      projectRoot,
      join(projectRoot, ".next"),
      join(projectRoot, ".next/server"),
      appDir,
    ])
      if (realpathSync(p) !== p || !lstatSync(p).isDirectory())
        throw Error("Search parent escape/non-directory");
    for (const p of [
      join(projectRoot, "public/pagefind"),
      outputDir,
      stagingDir,
      join(projectRoot, ".next/pagefind-provenance.json"),
    ])
      if (!absent(p)) throw Error("Fresh search output required: " + p);
    before = {
      tools: tools(),
      htmlFiles: htmlInputs(),
      buildIdSha256: digest(readFileSync(join(projectRoot, ".next/BUILD_ID"))),
      scriptSha256: digest(readFileSync(fileURLToPath(import.meta.url))),
      lockSha256: digest(readFileSync(join(projectRoot, "pnpm-lock.yaml"))),
    };
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
  // 直接用当前 Node 执行 Pagefind 的官方 JS 入口，避开 .bin 下的平台 shell
  // 包装器；部署脚本和包管理器启动时都不再依赖 PATH 或 shell 行为。
  const pagefindEntry = join(
    projectRoot,
    "node_modules",
    "pagefind",
    "lib",
    "runner",
    "bin.cjs",
  );
  if (!existsSync(pagefindEntry)) {
    console.error(
      `✗ 未找到 ${pagefindEntry}，请先 \`pnpm install\`（pagefind 是 devDependency）`,
    );
    process.exit(1);
  }
  execFileSync(process.execPath, [pagefindEntry, ...args], {
    cwd: projectRoot,
    stdio: "inherit",
    ...(owned ? { timeout: 300000 } : {}),
  });

  if (owned) {
    const after = {
      tools: tools(),
      htmlFiles: htmlInputs(),
      buildIdSha256: digest(readFileSync(join(projectRoot, ".next/BUILD_ID"))),
      scriptSha256: digest(readFileSync(fileURLToPath(import.meta.url))),
      lockSha256: digest(readFileSync(join(projectRoot, "pnpm-lock.yaml"))),
    };
    if (JSON.stringify(before) !== JSON.stringify(after))
      throw Error("Search input/tool drift");
    const files = tree(outputDir, true);
    if (!("pagefind.js" in files) || !("pagefind-entry.json" in files))
      throw Error("Missing search entry files");
    writeFileSync(
      join(projectRoot, ".next/pagefind-provenance.json"),
      JSON.stringify({ schema: 1, ...before, files }) + "\n",
      { flag: "wx" },
    );
  }
  console.log(`==> pagefind 索引完成 → ${relative(projectRoot, outputDir)}`);
}

main();
