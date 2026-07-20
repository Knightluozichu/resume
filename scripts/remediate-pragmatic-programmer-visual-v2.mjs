#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "pragmatic-programmer";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const DIAGRAM_ROOT = path.join(
  ROOT,
  "src/components/mdx/pragmatic-programmer/diagrams",
);
const SOURCE_URL = "https://www.w3cschool.cn/booklist/booklist-k3pw3fff.html";

function walk(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walk(path.join(directory, entry.name))
        : entry.name.endsWith(".mdx")
          ? [path.join(directory, entry.name)]
          : [],
    )
    .sort();
}

function wrapperProfile(chapterSlug) {
  const wrapperPath = path.join(DIAGRAM_ROOT, `${chapterSlug}.tsx`);
  const source = fs.readFileSync(wrapperPath, "utf8");
  const scalar = (name) => {
    const match = source.match(new RegExp(`${name}:\\s*"([^"]+)"`));
    if (!match) throw new Error(`${chapterSlug} 缺少 ${name}`);
    return match[1];
  };
  const list = (name) => {
    const match = source.match(new RegExp(`${name}:\\s*(\\[[\\s\\S]*?\\])`));
    if (!match) throw new Error(`${chapterSlug} 缺少 ${name}`);
    return JSON.parse(match[1]);
  };
  return {
    unitId: scalar("unitId"),
    title: scalar("title"),
    nodes: list("nodes"),
    focuses: list("focuses"),
  };
}

function practiceMode(unitId) {
  if (/topic-(?:15|39)-/.test(unitId)) return "calculation";
  if (/topic-(?:03|20|24|25|34|38|43|46)-/.test(unitId)) return "diagnosis";
  if (/topic-(?:14|16|17|18|19|21|23|30|32|40|41|42)-/.test(unitId))
    return "code";
  if (/topic-(?:26|29|33|35|36)-/.test(unitId)) return "simulation";
  return "design";
}

function mechanismSection(profile) {
  const rows = profile.nodes
    .map(
      (node, index) =>
        `- **${node}**：进入时读取“${profile.focuses[index % profile.focuses.length]}”，退出前写明对象、状态变化、下游接收者与拒绝条件。`,
    )
    .join("\n");
  return `## 本页对象、状态与因果

${profile.title}不使用变化率、耦合率或置信度等虚构总分。它直接检查“${profile.nodes.join(" → ")}”中的真实对象；每次操作只改变“${profile.focuses.join("、")}”中的一个条件，并在第一处状态变化停下。

${rows}

这条链的基线是“${profile.nodes[0]}”收到完整的${profile.focuses[0]}，故障样本则只撤掉${profile.focuses[Math.min(2, profile.focuses.length - 1)]}。若下游仍显示成功，说明合同或观测点错误；恢复时必须从原始输入重放，不能手工修改最后一个节点。

## 本页最小可运行检查

\`\`\`yaml
unit: ${profile.unitId}
baseline:
  object: ${profile.nodes[0]}
  evidence: ${profile.focuses[0]}
intervention:
  only_change: ${profile.focuses[Math.min(1, profile.focuses.length - 1)]}
fault:
  remove: ${profile.focuses[Math.min(2, profile.focuses.length - 1)]}
expect:
  first_changed_node: ${profile.nodes[Math.min(2, profile.nodes.length - 1)]}
recovery:
  rebuild_evidence: ${profile.focuses[profile.focuses.length - 1]}
\`\`\`

先写出预期节点，再在交互图选择对象。${profile.title}的运行记录至少保存输入身份、当前节点、唯一干预、实际首差、拒绝原因、恢复动作和${profile.focuses[profile.focuses.length - 1]}；这些字段是可复查工件，不合成为一个漂亮分数。

`;
}

function replaceAttribution(source) {
  return source.replace(
    /<Attribution\b[\s\S]*?\/>\s*$/,
    `<Attribution mode="independent-rewrite" sourceBasis="outline-only" workTitle="David Thomas、Andrew Hunt《程序员修炼之道：通向务实的最高境界（第2版）》" adaptedUrl="${SOURCE_URL}" />\n`,
  );
}

const files = walk(CONTENT_ROOT);
if (files.length !== 71) throw new Error(`应有 71 页，实际 ${files.length}`);

for (const filePath of files) {
  const chapterSlug = path.basename(filePath, ".mdx");
  const profile = wrapperProfile(chapterSlug);
  const componentBase = chapterSlug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  let source = parsed.content;

  source = source.replace(
    /- 能计算变更触达、反馈延迟、知识漂移与证据置信度，并比较正常、边界、单故障/,
    `- 能操作“${profile.nodes.join(" → ")}”章专属图，一次只改变${profile.focuses[Math.min(1, profile.focuses.length - 1)]}并解释真实状态变化`,
  );
  source = source.replace(
    /## 四个可计算模型[\s\S]*?(?=## 正式目录逐项讲解)/,
    mechanismSection(profile),
  );
  source = source.replace(
    /<Step title="追踪系统边界与责任">[\s\S]*?<\/Step>/,
    `<Step title="定位${profile.nodes[0]}到${profile.nodes[profile.nodes.length - 1]}的对象关系">\n    标出${profile.nodes.join("、")}的输入、输出、所有者和拒绝出口；点击节点时只高亮该真实对象。\n    <${componentBase}SystemLab />\n  </Step>`,
  );
  source = source.replace(
    /<Step title="(?:调整变化、耦合与证据|操作章专属对象与反馈)">[\s\S]*?<\/Step>/,
    `<Step title="只改变${profile.focuses[Math.min(1, profile.focuses.length - 1)]}并找首差">\n    固定${profile.focuses[0]}，只改变${profile.focuses[Math.min(1, profile.focuses.length - 1)]}，观察“${profile.nodes.join(" → ")}”中第一处真实状态变化。\n    <${componentBase}FeedbackLab />\n  </Step>`,
  );
  source = source.replace(
    /<Step title="注入一个故障并保存证据">[\s\S]*?<\/Step>/,
    `<Step title="撤掉${profile.focuses[Math.min(2, profile.focuses.length - 1)]}并从基线恢复">\n    比较基线、单故障和清理后重放，要求故障停在${profile.nodes[Math.min(2, profile.nodes.length - 1)]}附近且${profile.focuses[profile.focuses.length - 1]}可以重建。\n    <${componentBase}EvidenceLab />\n  </Step>`,
  );
  source = source.replace(
    /先手算变更触达、反馈延迟、知识漂移与证据置信度，再让独立复核者只依据输入和验收合同重建；双方必须在相同首差拒绝故障，并保留相同回退状态。/g,
    `先预测“${profile.nodes.join(" → ")}”的状态，再让独立复核者只依据冻结输入与${profile.focuses.join("、")}重建；双方应在同一真实对象发现首差，并保留同一恢复状态。`,
  );
  source = source.replace(
    /一次只改变一个参数，观察变更触达、反馈延迟和知识漂移。/g,
    `一次只改变${profile.focuses[Math.min(1, profile.focuses.length - 1)]}，观察${profile.nodes.join("、")}的实际输入与输出。`,
  );
  source = replaceAttribution(source);

  const description = String(parsed.data.description ?? "").replace(/\s+$/, "");
  const data = {
    ...parsed.data,
    description,
    qualityVersion: 2,
    practiceMode: practiceMode(profile.unitId),
    sourceMode: "independent-rewrite",
    sourceUrl: SOURCE_URL,
  };
  fs.writeFileSync(filePath, matter.stringify(source, data));
}

console.log("已移除 71 页合成评分模型并登记质量 v2。 ");
