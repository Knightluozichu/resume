#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "http-definitive-guide";
const CONTENT_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/http-definitive-guide-visual-v2-profiles.json",
);
const MARKER = "{/* HTTP_DEFINITIVE_GUIDE_VISUAL_V2 */}";

function walkMdx(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) return walkMdx(target);
      return entry.name.endsWith(".mdx") ? [target] : [];
    })
    .sort();
}

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join("");
}

function faultFor(title) {
  const value = title.toLocaleLowerCase();
  if (/缓存|cache|新鲜|验证/.test(value))
    return "缓存键或验证器不一致，却把旧表示当成新鲜命中";
  if (/代理|网关|隧道|proxy|wpad/.test(value))
    return "逐跳字段被错误转发，导致下一跳误解连接或认证状态";
  if (/认证|安全|cookie|客户端识别|auth/.test(value))
    return "身份、realm、cookie作用域或证书主体没有绑定到当前请求";
  if (/内容|编码|字符|语言|mime|国际/.test(value))
    return "Content-Type、字符集、Content-Encoding或长度与真实主体不一致";
  if (/重定向|发布|webdav|frontpage/.test(value))
    return "Location或资源状态改变后，客户端仍沿用旧请求目标和条件";
  if (/连接|报文|tcp|http-ng/.test(value))
    return "主体边界或连接关闭条件错误，使下一条报文从错误字节开始解析";
  return "只观察最终页面，没有保存两端原始报文和中间实体状态";
}

function evidenceFor(title) {
  const value = title.toLocaleLowerCase();
  if (/缓存|cache|新鲜|验证/.test(value))
    return "cache key、Age、freshness lifetime、ETag/Last-Modified、304与stored response";
  if (/认证|安全|cookie|auth/.test(value))
    return "request target、realm/origin、credentials、Set-Cookie/Cookie、TLS identity与status";
  if (/连接|报文|tcp/.test(value))
    return "TCP四元组、request/response bytes、message boundary、Connection字段、close与retry";
  return "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery";
}

function wrapperSource(profile) {
  const prefix = pascal(profile.chapterSlug);
  const model = {
    title: profile.title,
    focus: profile.focus,
    concepts: profile.concepts,
    fault: profile.fault,
    evidence: profile.evidence,
  };
  return `import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies HttpExperimentModel;

export function ${prefix}MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function ${prefix}FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function ${prefix}EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
`;
}

function augmentContent(content, profile) {
  if (content.includes(MARKER)) return content;
  const prefix = pascal(profile.chapterSlug);
  const importLine = `import { ${prefix}MessageLab, ${prefix}FlowLab, ${prefix}EvidenceLab } from "@/components/mdx/${BOOK}/v2/${profile.chapterSlug}";`;
  const imports = [...content.matchAll(/^import\s+.*;$/gm)];
  if (imports.length === 0)
    throw new Error(`页面缺少可定位 import: ${profile.relativePath}`);
  const lastImport = imports.at(-1);
  const insertionPoint = lastImport.index + lastImport[0].length;
  let next = `${content.slice(0, insertionPoint)}\n${importLine}\n\n${MARKER}${content.slice(insertionPoint)}`;
  const components = [
    `${prefix}MessageLab`,
    `${prefix}FlowLab`,
    `${prefix}EvidenceLab`,
  ];
  let stepIndex = 0;
  next = next.replace(/<Step\b[^>]*>[\s\S]*?<\/Step>/g, (block) => {
    if (stepIndex >= components.length) return block;
    const component = components[stepIndex++];
    return block.replace(
      /\s*<\/Step>\s*$/,
      `\n\n    <${component} />\n  </Step>`,
    );
  });
  if (stepIndex !== 3)
    throw new Error(
      `${profile.relativePath} 只找到 ${stepIndex} 个可插入实验的 Step`,
    );
  return next;
}

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = manifestDocument.books[BOOK];
if (!manifest) throw new Error(`缺少 ${BOOK} fidelity manifest`);
const unitByPath = new Map(
  manifest.units.map((unit) => [unit.chapterPath.replace(/\.mdx$/, ""), unit]),
);
const structuralConcepts = manifest.units.map((unit) => unit.title);
const profiles = walkMdx(CONTENT_DIR)
  .map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = matter(raw);
    const sectionSlug = path.basename(path.dirname(filePath));
    const chapterSlug = path.basename(filePath, ".mdx");
    const chapterPath = `${sectionSlug}/${chapterSlug}`;
    const unit = unitByPath.get(chapterPath);
    const concepts = unit
      ? unit.concepts.map((alternatives) => alternatives[0])
      : structuralConcepts;
    const profile = {
      title: String(parsed.data.title),
      focus: String(parsed.data.description ?? parsed.data.title),
      concepts,
      fault: faultFor(String(parsed.data.title)),
      evidence: evidenceFor(String(parsed.data.title)),
      sectionSlug,
      chapterSlug,
      chapterPath,
      relativePath: path.relative(ROOT, filePath).replaceAll(path.sep, "/"),
    };
    const nextContent = augmentContent(parsed.content, profile);
    fs.writeFileSync(filePath, matter.stringify(nextContent, parsed.data));
    return profile;
  })
  .sort((a, b) => a.chapterPath.localeCompare(b.chapterPath));

fs.mkdirSync(COMPONENT_DIR, { recursive: true });
for (const profile of profiles) {
  fs.writeFileSync(
    path.join(COMPONENT_DIR, `${profile.chapterSlug}.tsx`),
    wrapperSource(profile),
  );
}

manifest.visualImplementation = {
  version: 2,
  profiles: "quality/http-definitive-guide-visual-v2-profiles.json",
  sharedComponent:
    "src/components/mdx/http-definitive-guide/v2/official-http-transaction-lab.tsx",
  viewsPerPage: 3,
  kinds: ["raw-message", "intermediary-flow", "reproducible-evidence"],
};
manifest.metrics = {
  ...(manifest.metrics ?? {}),
  interactiveViews: profiles.length * 3,
};
fs.writeFileSync(
  MANIFEST_PATH,
  `${JSON.stringify(manifestDocument, null, 2)}\n`,
);

fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      book: BOOK,
      generatedAt: "2026-07-30",
      pages: profiles.map((profile) => ({
        chapterPath: profile.chapterPath,
        title: profile.title,
        concepts: profile.concepts,
        focus: profile.focus,
        fault: profile.fault,
        evidence: profile.evidence,
      })),
    },
    null,
    2,
  )}\n`,
);

console.log(
  JSON.stringify(
    {
      book: BOOK,
      pages: profiles.length,
      visualViews: profiles.length * 3,
      manifestUnits: manifest.units.length,
    },
    null,
    2,
  ),
);
