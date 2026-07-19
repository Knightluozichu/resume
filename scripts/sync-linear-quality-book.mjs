#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import matter from "gray-matter";

const ROOT = process.cwd();
const LINEAR_ENDPOINT = "https://api.linear.app/graphql";

function parseArgs(argv) {
  const args = { book: null, title: null, master: "HEL-338" };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--") continue;
    if (argument === "--book") args.book = argv[++index] ?? null;
    else if (argument === "--title") args.title = argv[++index] ?? null;
    else if (argument === "--master")
      args.master = argv[++index] ?? args.master;
    else throw new Error(`未知参数: ${argument}`);
  }
  if (!args.book || !args.title)
    throw new Error("必须传入 --book slug 与 --title 书名");
  return args;
}

function readLocalEnv(name) {
  const envPath = path.join(ROOT, "local.env");
  if (!fs.existsSync(envPath)) return null;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(
      /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/,
    );
    if (!match || match[1] !== name) continue;
    const value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    )
      return value.slice(1, -1);
    return value;
  }
  return null;
}

function walkMdx(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkMdx(entryPath));
    else if (entry.name.endsWith(".mdx")) files.push(entryPath);
  }
  return files.sort();
}

function chaptersFor(bookSlug) {
  const directory = path.join(ROOT, "content", bookSlug);
  if (!fs.existsSync(directory)) throw new Error(`书籍不存在: ${bookSlug}`);
  return walkMdx(directory).map((filePath) => {
    const relative = path
      .relative(path.join(ROOT, "content"), filePath)
      .replaceAll(path.sep, "/");
    const [book, section, fileName] = relative.split("/");
    const chapter = fileName.replace(/\.mdx$/, "");
    const frontmatter = matter(fs.readFileSync(filePath, "utf8")).data;
    return {
      key: `${book}/${section}/${chapter}`,
      path: relative,
      title: String(frontmatter.title ?? chapter),
    };
  });
}

async function linear(apiKey, query, variables = {}) {
  const response = await fetch(LINEAR_ENDPOINT, {
    method: "POST",
    headers: {
      authorization: apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const body = await response.json();
  if (!response.ok || body.errors)
    throw new Error(JSON.stringify(body.errors ?? body));
  return body.data;
}

const args = parseArgs(process.argv.slice(2));
const apiKey = process.env.LINEAR_API_KEY || readLocalEnv("LINEAR_API_KEY");
if (!apiKey) throw new Error("缺少 LINEAR_API_KEY");
const chapters = chaptersFor(args.book);

const context = await linear(
  apiKey,
  `query QualityContext($master: String!) {
    issue(id: $master) {
      id identifier title url
      project { id name }
      team {
        id key
        states { nodes { id name } }
        labels { nodes { id name } }
      }
      children(first: 250) { nodes { id identifier title description url } }
    }
  }`,
  { master: args.master },
);
const master = context.issue;
if (!master) throw new Error(`找不到总任务 ${args.master}`);
const contentLabel = master.team.labels.nodes.find(
  (label) => label.name.toLowerCase() === "content",
);
const inProgress = master.team.states.nodes.find(
  (state) => state.name === "In Progress",
);
if (!contentLabel || !inProgress)
  throw new Error("Linear team 缺少 content 标签或 In Progress 状态");

const parentTitle = `《${args.title}》全书质量 v2 整改与增量发布`;
let parent = master.children.nodes.find(
  (issue) =>
    issue.title === parentTitle ||
    issue.description?.includes(`bookSlug: ${args.book}`),
);
let sharedWithMaster = false;
const createMutation = `mutation CreateQualityIssue($input: IssueCreateInput!) {
  issueCreate(input: $input) {
    success
    issue { id identifier title description url }
  }
}`;
if (!parent) {
  try {
    const created = await linear(apiKey, createMutation, {
      input: {
        teamId: master.team.id,
        projectId: master.project.id,
        parentId: master.id,
        stateId: inProgress.id,
        labelIds: [contentLabel.id],
        title: parentTitle,
        description: [
          `bookSlug: ${args.book}`,
          `范围：${chapters.length} 个 MDX 页面，按质量 v2 SOP 逐章整改、逐章审查，整书通过后原子增量发布。`,
          "来源模式：independent-rewrite；目录限定范围，作者官网/官方模式目录/出版社资料核对事实。",
          "通过条件：总分 ≥90、各维度 ≥80%、无硬阻断项，桌面与移动端视觉及交互复位均通过。",
        ].join("\n\n"),
      },
    });
    if (!created.issueCreate.success) throw new Error("创建父任务失败");
    parent = created.issueCreate.issue;
    console.log(`created ${parent.identifier} ${parent.title}`);
  } catch (error) {
    if (!/USAGE_LIMIT_EXCEEDED|usage limit exceeded/i.test(String(error)))
      throw error;
    parent = master;
    sharedWithMaster = true;
    console.warn(
      `Linear 免费额度已满：《${args.title}》及其 ${chapters.length} 个章节临时复用总任务 ${master.identifier}；章级提交与本地稳定键仍独立保存`,
    );
  }
}

const parentContext = sharedWithMaster
  ? { issue: { children: { nodes: [] } } }
  : await linear(
      apiKey,
      `query ParentChildren($id: String!) {
        issue(id: $id) {
          children(first: 250) { nodes { id identifier title description url } }
        }
      }`,
      { id: parent.id },
    );
const existingChildren = parentContext.issue.children.nodes;
const issueByKey = new Map();
for (const issue of existingChildren) {
  const key = issue.description?.match(/stableKey: ([^\s]+)/)?.[1];
  if (key) issueByKey.set(key, issue);
}

const chapterIssues = {};
let sharedParentFallbacks = 0;
for (let index = 0; index < chapters.length; index += 1) {
  const chapter = chapters[index];
  let issue = issueByKey.get(chapter.key);
  let sharedWithParent = false;
  if (sharedWithMaster) {
    chapterIssues[chapter.key] = {
      id: master.id,
      identifier: master.identifier,
      title: master.title,
      url: master.url,
      sharedWithMaster: true,
    };
    continue;
  }
  if (!issue) {
    const number = String(index + 1).padStart(2, "0");
    try {
      const created = await linear(apiKey, createMutation, {
        input: {
          teamId: master.team.id,
          projectId: master.project.id,
          parentId: parent.id,
          stateId: inProgress.id,
          labelIds: [contentLabel.id],
          title: `章节 ${number}/${chapters.length}｜${chapter.title}`,
          description: [
            `stableKey: ${chapter.key}`,
            `文件：${chapter.path}`,
            "验收：来源/范围、知识深度、教学设计、专属视觉、实践闭环、可访问性、工程质量；自动审计与 1440×900、390×844 人工验收均通过后进入 In Review。",
          ].join("\n\n"),
        },
      });
      if (!created.issueCreate.success)
        throw new Error(`创建章节任务失败: ${chapter.key}`);
      issue = created.issueCreate.issue;
      console.log(`created ${issue.identifier} ${chapter.key}`);
    } catch (error) {
      const usageLimited = /USAGE_LIMIT_EXCEEDED|usage limit exceeded/i.test(
        String(error),
      );
      const isFinalReview = index === chapters.length - 1;
      if (!usageLimited || !isFinalReview) throw error;
      issue = parent;
      sharedWithParent = true;
      sharedParentFallbacks += 1;
      console.warn(
        `Linear 免费额度已满：${chapter.key} 临时复用父任务 ${parent.identifier} 作为审查入口`,
      );
    }
  }
  chapterIssues[chapter.key] = {
    id: issue.id,
    identifier: issue.identifier,
    title: issue.title,
    url: issue.url,
    ...(sharedWithParent ? { sharedWithParent: true } : {}),
  };
}

const outputPath = path.join(ROOT, "quality", "linear", `${args.book}.json`);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(
  outputPath,
  `${JSON.stringify(
    {
      version: 1,
      bookSlug: args.book,
      bookTitle: args.title,
      master: { id: master.id, identifier: master.identifier },
      parent: {
        id: parent.id,
        identifier: parent.identifier,
        title: parent.title,
        url: parent.url,
      },
      chapters: chapterIssues,
      trackingConstraint: sharedWithMaster
        ? {
            code: "linear-free-issue-limit",
            sharedMasterFallbacks: chapters.length,
            remediation:
              "额度升级后补建书级父任务和章级子任务，并以稳定键及章级提交回填映射。",
          }
        : sharedParentFallbacks > 0
          ? {
              code: "linear-free-issue-limit",
              sharedParentFallbacks,
              remediation:
                "额度升级后为 sharedWithParent 页面补建独立子任务并替换映射。",
            }
          : null,
    },
    null,
    2,
  )}\n`,
);
console.log(
  JSON.stringify({
    parent: parent.identifier,
    chapters: chapters.length,
    sharedParentFallbacks,
    sharedMasterFallbacks: sharedWithMaster ? chapters.length : 0,
  }),
);
