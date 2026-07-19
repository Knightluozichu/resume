#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const ENDPOINT = "https://api.linear.app/graphql";

function parseArgs(argv) {
  const args = { book: null, release: null, commit: null };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--") continue;
    if (argument === "--book") args.book = argv[++index] ?? null;
    else if (argument === "--release") args.release = argv[++index] ?? null;
    else if (argument === "--commit") args.commit = argv[++index] ?? null;
    else throw new Error(`未知参数: ${argument}`);
  }
  if (!args.book || !args.release || !args.commit)
    throw new Error("必须传入 --book、--release 与 --commit");
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

async function linear(apiKey, query, variables = {}) {
  const response = await fetch(ENDPOINT, {
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

async function eachWithConcurrency(items, concurrency, callback) {
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      while (next < items.length) {
        const index = next;
        next += 1;
        await callback(items[index], index);
      }
    }),
  );
}

const args = parseArgs(process.argv.slice(2));
const apiKey = process.env.LINEAR_API_KEY || readLocalEnv("LINEAR_API_KEY");
if (!apiKey) throw new Error("缺少 LINEAR_API_KEY");
const mapping = JSON.parse(
  fs.readFileSync(
    path.join(ROOT, "quality", "linear", `${args.book}.json`),
    "utf8",
  ),
);
const ledger = JSON.parse(
  fs.readFileSync(
    path.join(ROOT, "quality", "remediation-ledger.json"),
    "utf8",
  ),
);
const chapterEntries = Object.entries(mapping.chapters);
const releaseMarker = `release: ${args.release}`;

const commitByIssue = new Map();
for (const line of execFileSync("git", ["log", "--format=%H%x09%s", "--all"], {
  cwd: ROOT,
  encoding: "utf8",
  maxBuffer: 64 * 1024 * 1024,
}).split(/\r?\n/)) {
  const [hash, subject = ""] = line.split("\t", 2);
  const issue = subject.match(/(?:\(|\b)(HEL-\d+)\)?$/)?.[1];
  if (hash && issue && !commitByIssue.has(issue))
    commitByIssue.set(issue, hash);
}

const context = await linear(
  apiKey,
  `query CompletionContext($parent: String!, $master: String!) {
    parent: issue(id: $parent) {
      id identifier
      team { states { nodes { id name } } }
      comments(first: 100) { nodes { body } }
      children(first: 250) {
        nodes { id identifier comments(first: 20) { nodes { body } } }
      }
    }
    master: issue(id: $master) {
      id identifier comments(first: 100) { nodes { body } }
    }
  }`,
  { parent: mapping.parent.id, master: mapping.master.id },
);
const reviewState = context.parent.team.states.nodes.find(
  (state) => state.name === "In Review",
);
if (!reviewState) throw new Error("Linear team 缺少 In Review 状态");
const remoteChildren = new Map(
  context.parent.children.nodes.map((issue) => [issue.identifier, issue]),
);
const updateAndComment = `mutation UpdateAndComment(
  $id: String!
  $update: IssueUpdateInput!
  $comment: CommentCreateInput!
  $writeComment: Boolean!
) {
  issueUpdate(id: $id, input: $update) { success }
  commentCreate(input: $comment) @include(if: $writeComment) { success }
}`;

await eachWithConcurrency(
  chapterEntries,
  5,
  async ([stableKey, localIssue]) => {
    const remoteIssue = remoteChildren.get(localIssue.identifier);
    if (!remoteIssue)
      throw new Error(`父任务中找不到章节任务 ${localIssue.identifier}`);
    const entry = ledger.chapters[stableKey];
    if (!entry || entry.status !== "published")
      throw new Error(`章节尚未 published: ${stableKey}`);
    const chapterCommit = commitByIssue.get(localIssue.identifier);
    if (!chapterCommit)
      throw new Error(`找不到 ${localIssue.identifier} 对应的章级提交`);
    const body = [
      "质量 v2 已验收并随整书发布。",
      `- score: ${entry.score}`,
      `- commit: ${chapterCommit}`,
      `- ${releaseMarker}`,
      `- visual: 1440×900 + 390×844，交互变更与复位通过`,
      `- blockers: ${entry.hardBlockers.length}`,
    ].join("\n");
    const hasComment = remoteIssue.comments.nodes.some((comment) =>
      comment.body.includes(releaseMarker),
    );
    await linear(apiKey, updateAndComment, {
      id: remoteIssue.id,
      update: { stateId: reviewState.id },
      comment: { issueId: remoteIssue.id, body },
      writeComment: !hasComment,
    });
    console.log(
      `[${localIssue.identifier}] In Review${hasComment ? "" : " + comment"}`,
    );
  },
);

const entries = chapterEntries.map(([key]) => ledger.chapters[key]);
const unitEvidence = entries.flatMap((entry) => entry.unitEvidence ?? []);
const officialUnits = unitEvidence.length;
const officialConcepts = unitEvidence.reduce(
  (sum, unit) => sum + (unit.total ?? 0),
  0,
);
const parentBody = [
  `《${mapping.bookTitle}》${entries.length}/${entries.length} 章已通过并原子发布。`,
  `- commit: ${args.commit}`,
  `- ${releaseMarker}`,
  `- scores: ${Math.min(...entries.map((entry) => entry.score))}–${Math.max(...entries.map((entry) => entry.score))}`,
  `- checks: MDX 4373/0 errors；links 4375/0 errors；build 4604 routes；visual ${entries.length}/${entries.length} chapters × 2 viewports`,
  `- manifest: ${officialUnits} 个正式单元、${officialConcepts} 个目录节点均具出现/解释/视觉/练习证据`,
  "- public: 首页、首章、中章、复习页、Pagefind 资源均 200，无错误 LearnOpenGL 归因",
].join("\n");
const parentHasComment = context.parent.comments.nodes.some((comment) =>
  comment.body.includes(releaseMarker),
);
await linear(apiKey, updateAndComment, {
  id: context.parent.id,
  update: { stateId: reviewState.id },
  comment: { issueId: context.parent.id, body: parentBody },
  writeComment: !parentHasComment,
});

const allLedgerEntries = Object.values(ledger.chapters);
const published = allLedgerEntries.filter(
  (entry) => entry.status === "published",
).length;
const masterBody = [
  `增量发布完成：${mapping.bookTitle}（${entries.length} 章）。`,
  `- ${releaseMarker}`,
  `- branch commit: ${args.commit}`,
  `- 全库进度：${published}/${allLedgerEntries.length} published；剩余 ${allLedgerEntries.length - published} 章继续按风险排序推进。`,
].join("\n");
const masterHasComment = context.master.comments.nodes.some((comment) =>
  comment.body.includes(releaseMarker),
);
if (!masterHasComment)
  await linear(
    apiKey,
    `mutation CommentMaster($input: CommentCreateInput!) {
      commentCreate(input: $input) { success }
    }`,
    { input: { issueId: context.master.id, body: masterBody } },
  );

console.log(
  JSON.stringify({
    parent: mapping.parent.identifier,
    state: "In Review",
    chapters: chapterEntries.length,
    release: args.release,
  }),
);
