#!/usr/bin/env node
/**
 * scripts/check-links.mjs — HEL-221
 *
 * 内链守门：扫 .next/server/app/**\/*.html 里所有 <a href="...">，验证：
 *  - 外链（http:// https://，非本站）：跳过
 *  - 内链锚点 #xxx：当前 HTML 必须有 id="xxx" 或 name="xxx"
 *  - 跨页 /path#xxx：目标 HTML 必须存在，且该 HTML 内必须有 id="xxx"
 *  - 内链路径 /path：必须能映射到一个存在的 HTML（.next/server/app/path.html
 *    或 path/index.html）；redirects（next.config.ts）也算命中
 *
 * 不遇错即退，全量扫完统一报错。
 *
 * 前置：本脚本只读 .next/server/app/；调用方必须先 `pnpm build`。
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const APP_DIR = join(ROOT, ".next", "server", "app");

// Next.js redirects（手动同步自 next.config.ts；当前只有 HEL-48 的一条旧链兜底）
// 形态：[正则, 目标路径模板]——只用于「来源路径若被重定向到的目标存在则视为命中」。
const REDIRECTS = [
  {
    test: /^\/learn\/getting-started\/(.+)$/,
    to: (m) => `/learn/learnopengl/getting-started/${m[1]}`,
  },
];

/** 递归收集所有 .next/server/app 下的 .html。 */
function collectHtml(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...collectHtml(full));
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}

/** HTML 路径 → URL 路径。 .next/server/app/learn/x/y.html → /learn/x/y ；
 *  index.html / _not-found / _global-error 等特殊页跳过。 */
function htmlToUrlPath(htmlAbs) {
  const rel = relative(APP_DIR, htmlAbs).replace(/\\/g, "/");
  // 排除 _* 内部页与非 app 路由（pages router 已被 collectHtml 仅限 app/ 排除掉）
  if (rel.startsWith("_")) return null;
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return "/" + rel.slice(0, -"/index.html".length);
  if (rel.endsWith(".html")) return "/" + rel.slice(0, -".html".length);
  return null;
}

/** 提取一份 HTML 里所有 <a href="..."> 的 href 值（保序、含重复，调用方自行去重）。 */
function extractHrefs(html) {
  // 只匹配 <a ...> 标签的 href，避免把 <link>/<script src> 等也算进来。
  const out = [];
  const re = /<a\b[^>]*?\shref=("([^"]*)"|'([^']*)')/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    out.push(m[2] ?? m[3] ?? "");
  }
  return out;
}

/** 提取一份 HTML 里所有元素的 id="..." 与 name="..."（用于锚点验证）。 */
function extractAnchors(html) {
  const set = new Set();
  const idRe = /\sid=("([^"]*)"|'([^']*)')/gi;
  let m;
  while ((m = idRe.exec(html)) !== null) {
    const v = m[2] ?? m[3] ?? "";
    if (v) set.add(v);
  }
  // <a name="..."> 兼容老式锚点（站内极少用，但 KaTeX/部分组件可能产）
  const nameRe = /<a\b[^>]*?\sname=("([^"]*)"|'([^']*)')/gi;
  while ((m = nameRe.exec(html)) !== null) {
    const v = m[2] ?? m[3] ?? "";
    if (v) set.add(v);
  }
  return set;
}

/** 判断一个内链 URL path 是否能映射到已构建的 HTML。 */
function pathToHtml(urlPath, urlPathToHtml) {
  // 直接命中（urlPathToHtml 已含 / 和带尾段两种）
  if (urlPathToHtml.has(urlPath)) return urlPathToHtml.get(urlPath);
  // 末尾斜杠归一化
  if (urlPath.endsWith("/") && urlPath.length > 1) {
    const trimmed = urlPath.slice(0, -1);
    if (urlPathToHtml.has(trimmed)) return urlPathToHtml.get(trimmed);
  }
  // redirects 兜底：源路径若有规则、且目标存在，则视为命中
  for (const rule of REDIRECTS) {
    const m = urlPath.match(rule.test);
    if (m) {
      const dest = rule.to(m);
      if (urlPathToHtml.has(dest)) return urlPathToHtml.get(dest);
    }
  }
  return null;
}

function main() {
  const htmlFiles = collectHtml(APP_DIR);

  // URL 路径 → HTML 绝对路径
  const urlPathToHtml = new Map();
  for (const f of htmlFiles) {
    const url = htmlToUrlPath(f);
    if (url !== null) urlPathToHtml.set(url, f);
  }

  // 每页缓存的 anchors，避免重复 IO
  const anchorsCache = new Map();
  function anchorsOf(htmlPath) {
    let a = anchorsCache.get(htmlPath);
    if (!a) {
      a = extractAnchors(readFileSync(htmlPath, "utf8"));
      anchorsCache.set(htmlPath, a);
    }
    return a;
  }

  const failures = []; // { from, href, reason }

  for (const htmlPath of htmlFiles) {
    const fromUrl = htmlToUrlPath(htmlPath);
    if (fromUrl === null) continue; // _not-found / _global-error 等：不审核它们里头的 href
    const html = readFileSync(htmlPath, "utf8");
    const hrefs = extractHrefs(html);

    for (const raw of hrefs) {
      let href = raw.trim();
      if (!href) continue;
      // 协议级跳过：javascript: / mailto: / tel: / data:
      if (/^(javascript|mailto|tel|data):/i.test(href)) continue;
      // 外链：http(s):// 开头（非协议相对）一律跳过
      if (/^https?:\/\//i.test(href)) continue;
      // 协议相对 //example.com 视为外链跳过
      if (href.startsWith("//")) continue;

      // 拆 path + hash
      let path = href;
      let hash = "";
      const hashIdx = href.indexOf("#");
      if (hashIdx >= 0) {
        path = href.slice(0, hashIdx);
        hash = href.slice(hashIdx + 1);
      }
      // 去掉查询串
      const qIdx = path.indexOf("?");
      if (qIdx >= 0) path = path.slice(0, qIdx);

      // path 为空 = 同页锚点（#xxx）
      if (path === "") {
        if (!hash) continue; // 仅 `#` 不强校验
        const anchors = anchorsOf(htmlPath);
        if (!anchors.has(hash) && !anchors.has(decodeURIComponent(hash))) {
          failures.push({
            from: fromUrl,
            href: raw,
            reason: `anchor "#${hash}" not found in this page`,
          });
        }
        continue;
      }

      // 跳过资源链接：/_next/* /favicon.ico 等显然不是文档路由
      if (path.startsWith("/_next/")) continue;
      if (/\.(ico|png|jpe?g|gif|svg|webp|css|js|woff2?|mp4|webm|json|txt|xml|map)$/i.test(path))
        continue;
      // 站内相对路径（非以 / 开头）不在本守门覆盖范围（实际生成 HTML 里基本不会有）
      if (!path.startsWith("/")) continue;

      const targetHtml = pathToHtml(path, urlPathToHtml);
      if (!targetHtml) {
        failures.push({
          from: fromUrl,
          href: raw,
          reason: `target path "${path}" has no built HTML`,
        });
        continue;
      }

      if (hash) {
        const anchors = anchorsOf(targetHtml);
        if (!anchors.has(hash) && !anchors.has(decodeURIComponent(hash))) {
          failures.push({
            from: fromUrl,
            href: raw,
            reason: `anchor "#${hash}" not found in target page`,
          });
        }
      }
    }
  }

  const pageCount = urlPathToHtml.size;

  if (failures.length === 0) {
    console.log(`[link-check] ${pageCount} pages, 0 errors. ✓`);
    process.exit(0);
  }

  console.error(`[link-check] ${pageCount} pages, ${failures.length} errors:\n`);
  for (const { from, href, reason } of failures) {
    console.error(`${from}\n  href="${href}"\n  ${reason}\n`);
  }
  process.exit(1);
}

main();
