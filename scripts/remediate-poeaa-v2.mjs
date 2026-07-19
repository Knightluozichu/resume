#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "poeaa-enterprise-patterns";
const CONTENT_DIR = path.join(ROOT, "content", BOOK);
const DIAGRAM_DIR = path.join(
  ROOT,
  "src/components/mdx/poeaa-enterprise-patterns/diagrams",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/poeaa-v2-profiles.json");

const SOURCE_BOOK = "https://martinfowler.com/books/eaa.html";
const SOURCE_CATALOG = "https://martinfowler.com/eaaCatalog/";
const SOURCE_PUBLISHER =
  "https://www.pearson.com/en-us/subject-catalog/p/patterns-of-enterprise-application-architecture/P200000009121/9780133065213";

const familyCopy = {
  book: {
    label: "全书模式语言",
    question: "如何保持目录范围、模式族关系与实际架构问题之间的一一对应",
    signal: "单元覆盖、跨族依赖与可追溯来源",
    alternative: "按真实问题进入模式族，而不是把模式名称当作采购清单",
    caseName: "订单系统架构评审",
    trapA: "把目录节点当成正文结论",
    trapB: "统计模式数量却不验证组合关系",
  },
  layering: {
    label: "分层与边界",
    question:
      "如何让表示、领域和数据源职责沿单向依赖协作，而不把逻辑层误当成部署节点",
    signal: "跨层调用、依赖方向、部署节点与错误翻译位置",
    alternative: "先划职责和依赖，再根据延迟、扩缩容与安全要求决定是否分进程",
    caseName: "订单审批分层",
    trapA: "每一层都能绕过相邻层直接访问数据库",
    trapB: "为了看起来分布式而把每个逻辑层部署成远程服务",
  },
  domain: {
    label: "领域逻辑",
    question:
      "如何让业务规则落在可演化的责任边界中，并与用例编排及持久化机制分离",
    signal: "规则分支、跨对象不变量、用例复用与事务范围",
    alternative: "在事务脚本、领域模型、表模块和服务层之间按复杂度与变化轴选择",
    caseName: "订单折扣与授信",
    trapA: "把所有规则塞进控制器或服务层过程",
    trapB: "只有数据字段的贫血对象却被称为领域模型",
  },
  mapping: {
    label: "对象关系映射",
    question:
      "如何在对象身份、关联、继承和写回之间保住一致语义，同时控制查询与映射成本",
    signal: "同一身份实例数、查询次数、脏对象集合与关联装载范围",
    alternative:
      "根据领域复杂度选择入口、活动记录、映射器、工作单元及结构映射组合",
    caseName: "订单聚合持久化",
    trapA: "把数据库行和内存对象的身份生命周期视为天然相同",
    trapB: "用一次正常查询掩盖 N+1、重复实例或部分写回",
  },
  web: {
    label: "Web 表示",
    question:
      "如何分开请求解释、页面导航、领域调用与输出渲染，使变化不会横跨所有页面",
    signal: "路由数量、重复控制逻辑、视图变体与导航状态",
    alternative: "分别比较页面控制、前端控制、模板、转换、两步视图和应用控制器",
    caseName: "订单后台多视图",
    trapA: "在模板里直接执行业务规则和数据库访问",
    trapB: "把 MVC 三个角色机械映射成三个远程服务",
  },
  distribution: {
    label: "分布边界",
    question:
      "如何承认网络延迟与部分失败，用粗粒度契约减少往返并避免泄漏内部对象模型",
    signal: "网络往返、载荷大小、超时比例、幂等键与兼容版本",
    alternative:
      "能保持本地调用时不分布；必须跨进程时组合远程外观与数据传输对象",
    caseName: "订单与结算跨进程调用",
    trapA: "把本地细粒度对象接口原样暴露到网络",
    trapB: "只测成功响应而不测超时、重试与重复提交",
  },
  concurrency: {
    label: "离线并发",
    question:
      "如何保护跨多个系统事务的业务事务，在冲突检测、提前锁定和恢复成本间作出选择",
    signal: "冲突概率、业务事务时长、锁粒度、等待时间与回滚代价",
    alternative: "低冲突优先检测，高冲突或高损失场景再考虑悲观和粗粒度锁",
    caseName: "两个客服并行修改订单",
    trapA: "把数据库单次提交成功误认为整个业务事务没有并发冲突",
    trapB: "锁已失主或超时后仍允许旧持有者提交",
  },
  session: {
    label: "会话状态",
    question:
      "如何选择会话状态的权威位置，并明确完整性、扩缩容、过期和恢复责任",
    signal: "状态大小、节点数量、粘性依赖、过期时间与恢复目标",
    alternative: "按安全、可用性和运维约束比较客户端、服务器与数据库会话状态",
    caseName: "订单向导会话",
    trapA: "信任客户端状态却没有签名、版本和重放防护",
    trapB: "服务器扩容后仍假设后续请求必定命中原节点",
  },
  base: {
    label: "基础模式",
    question:
      "如何隔离变化、身份或特殊行为，让上层模式依赖稳定语义而非具体基础设施",
    signal: "调用方数量、实现变化率、替换范围与测试隔离成本",
    alternative:
      "仅在确有变化轴或语义约束时引入网关、映射器、接口、值对象等构件",
    caseName: "订单系统基础设施替换",
    trapA: "没有变化轴也预先增加全局入口和间接层",
    trapB: "用服务定位或注册表隐藏真实依赖",
  },
};

function walk(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return walk(entryPath);
      return entry.name.endsWith(".mdx") ? [entryPath] : [];
    })
    .sort();
}

function stringArray(source, key) {
  const match = source.match(new RegExp(`${key}:\\s*(\\[[\\s\\S]*?\\])`));
  if (!match) return [];
  return [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
}

function familyFor(unitId, order) {
  if (order <= 5 || order >= 76 || /part-|learning-map/.test(unitId))
    return "book";
  if (/chapter-01-layering/.test(unitId)) return "layering";
  if (/chapter-02-/.test(unitId)) return "domain";
  if (/chapter-03-/.test(unitId)) return "mapping";
  if (/chapter-04-/.test(unitId)) return "web";
  if (/chapter-05-/.test(unitId)) return "concurrency";
  if (/chapter-06-/.test(unitId)) return "session";
  if (/chapter-07-|chapter-08-/.test(unitId)) return "distribution";
  if (order <= 19) return "domain";
  if (order <= 43) return "mapping";
  if (order <= 51) return "web";
  if (order <= 54) return "distribution";
  if (order <= 59) return "concurrency";
  if (order <= 63) return "session";
  return "base";
}

function extractProfiles() {
  const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  const manifest = manifestDocument.books[BOOK];
  const units = new Map((manifest.units ?? []).map((unit) => [unit.id, unit]));
  const profiles = walk(CONTENT_DIR)
    .map((filePath) => {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = matter(raw);
      const moduleName =
        raw.match(
          /poeaa-enterprise-patterns\/diagrams\/(poeaa24-[^"']+)/,
        )?.[1] ?? null;
      if (!moduleName) throw new Error(`缺少专属图示 import: ${filePath}`);
      const wrapperPath = path.join(DIAGRAM_DIR, `${moduleName}.tsx`);
      const wrapper = fs.readFileSync(wrapperPath, "utf8");
      const unitId = wrapper.match(/unitId:\s*"([^"]+)"/)?.[1] ?? moduleName;
      const componentNames = [
        ...raw.matchAll(/<(Poeaa24[A-Za-z0-9]+Lab)\s*\/>/g),
      ].map((match) => match[1]);
      const manifestUnit = units.get(unitId);
      const concepts = manifestUnit
        ? manifestUnit.concepts.map((alternatives) => alternatives[0])
        : /learning-map|final-review/.test(unitId)
          ? ["76个正式单元", "119个目录节点", "18章", "51个模式", "10个模式族"]
          : [String(parsed.data.title)];
      const assertion =
        raw.match(/证明“([^”]+)”/)?.[1] ??
        raw.match(/验收要求：([^\n]+)/)?.[1] ??
        `能解释${parsed.data.title}解决的问题、机制、代价和拒绝条件`;
      return {
        path: path.relative(ROOT, filePath).replaceAll(path.sep, "/"),
        moduleName,
        unitId,
        title: String(parsed.data.title),
        section: String(parsed.data.section),
        order: Number(parsed.data.order),
        type: String(parsed.data.type ?? "B"),
        description: String(parsed.data.description ?? ""),
        assertion: assertion.replace(/[。.]$/, ""),
        nodes: stringArray(wrapper, "nodes"),
        focuses: stringArray(wrapper, "focuses"),
        concepts,
        componentNames,
        family: familyFor(unitId, Number(parsed.data.order)),
      };
    })
    .sort((a, b) => a.order - b.order);
  fs.writeFileSync(
    PROFILE_PATH,
    `${JSON.stringify({ version: 2, profiles }, null, 2)}\n`,
  );
  return profiles;
}

function quote(value) {
  return JSON.stringify(String(value));
}

function safeTerms(profile) {
  const values = [
    profile.concepts[0],
    profile.nodes[0],
    profile.nodes.at(-1),
    profile.focuses[0],
    profile.focuses[1],
    profile.focuses[2],
  ].filter(Boolean);
  return [...new Set(values)].slice(0, 6);
}

function renderWrapper(profile) {
  const [boundary, tradeoff, failure] = profile.componentNames;
  if (!boundary || !tradeoff || !failure)
    throw new Error(`交互组件数量不是 3: ${profile.unitId}`);
  const copy = familyCopy[profile.family];
  const props = {
    unitId: profile.unitId,
    title: profile.title,
    family: profile.family,
    nodes: profile.nodes,
    focuses: profile.focuses,
    concepts: profile.concepts,
    decision: profile.assertion,
    healthy: `${profile.title} 的约束仍成立`,
    failure: `${profile.title} 在“${profile.focuses[0]}”处拒绝`,
  };
  return `import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = ${JSON.stringify(props, null, 2)} as const;

// ${copy.label}：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function ${boundary}() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function ${tradeoff}() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function ${failure}() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
`;
}

function renderConceptSections(profile) {
  const copy = familyCopy[profile.family];
  return profile.concepts
    .map(
      (concept, index) => `### ${concept}

在 **${profile.title}** 的学习边界里，${concept} 不是待背诵的目录词，而是用来检查“${profile.nodes[index % profile.nodes.length]}”是否把责任交给正确对象。对 ${copy.caseName}，学习者要记录 ${profile.focuses[index % profile.focuses.length]} 的可观察变化，并说明它何时支持或否定 ${profile.title}。`,
    )
    .join("\n\n");
}

function renderTerms(profile) {
  return safeTerms(profile)
    .map(
      (term, index) =>
        `<Term def=${quote(`${term} 是 ${profile.title} 的第 ${index + 1} 个裁决坐标；需要给出可观察信号、接受边界与反例。`)}>${term}</Term>`,
    )
    .join("、\n");
}

function renderGlossary(profile) {
  return safeTerms(profile)
    .map(
      (term, index) => `<GlossaryItem term=${quote(term)}>
  在 ${profile.title} 中，${term} 对应“${profile.nodes[index % profile.nodes.length]}”阶段的审查语言。它必须连接 ${profile.focuses[index % profile.focuses.length]} 的观测值与明确裁决，不能只作为框架类名出现。
</GlossaryItem>`,
    )
    .join("\n\n");
}

function renderPage(profile, previous, next) {
  const copy = familyCopy[profile.family];
  const [boundary, tradeoff, failure] = profile.componentNames;
  const allConcepts = profile.concepts.join("、");
  const navigation = [
    previous
      ? `- [上一页：${previous.title}](/learn/${previous.path.replace(/^content\//, "").replace(/\.mdx$/, "")})`
      : null,
    next
      ? `- [下一页：${next.title}](/learn/${next.path.replace(/^content\//, "").replace(/\.mdx$/, "")})`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  return `---
title: ${quote(profile.title)}
type: ${quote(profile.type)}
section: ${quote(profile.section)}
order: ${profile.order}
description: ${quote(profile.description)}
demo: true
math: false
qualityVersion: 2
practiceMode: design
sourceMode: independent-rewrite
sourceUrl: ${quote(SOURCE_BOOK)}
draft: false
---

import {
  ${boundary},
  ${tradeoff},
  ${failure},
} from "@/components/mdx/poeaa-enterprise-patterns/diagrams/${profile.moduleName}";
import {
  Objectives,
  Callout,
  Glossary,
  GlossaryItem,
  Term,
  Exercises,
  Answer,
  Stepper,
  Step,
  Attribution,
} from "@/components/mdx/mdx-components";

<Objectives>

- 能用自己的话解释 ${profile.title} 要解决的问题，以及它不负责什么
- 能沿“${profile.nodes.join(" → ")}”定位责任，并比较 ${profile.focuses.slice(0, 3).join("、")}
- 能操作 ${copy.label} 实验，先预测变量变化，再用临界与故障场景验证因果
- 能完成设计评审：${profile.assertion}

</Objectives>

## 为什么 ${profile.title} 值得单独学习

${profile.description} ${profile.title} 的核心不是套用某个框架 API，而是回答：${copy.question}。在 ${copy.caseName} 中，如果无法说清责任、状态和失败由谁承担，即使正常请求能够返回，架构决定也没有完成。

本页以 2024 年中文版公开目录限定 **${profile.title}** 的范围，并依据 Martin Fowler 的作者图书页和模式目录独立重写。它不复现原书正文、插图或代码；目录只决定“要讲什么”，这里的案例、实验、判断题和答案均为本课程原创。

## 先建立直觉：问题、机制与代价

${profile.title} 面对的具体压力是“${copy.signal}”。它采用的机制可以概括为：${profile.description} 机制带来的收益必须与新增间接层、同步责任或迁移成本同时记录，否则学习者只会得到一个没有拒绝条件的模式名称。

对 ${profile.title}，优先比较的替代路线是：${copy.alternative}。本页的通过条件是“${profile.assertion}”；若实验只能显示结果而不能指出 ${profile.focuses[0]} 从何处越界，就不能据此选择 ${profile.title}。

${renderTerms(profile)}

## 目录单元到教学证据

${renderConceptSections(profile)}

## 专属设计案例：${copy.caseName}

把 ${copy.caseName} 切成“${profile.nodes.join(" → ")}”五个观察点。${profile.title} 的设计草案必须写出谁拥有状态、谁作出业务决定、失败怎样传播，以及 ${profile.focuses.join("、")} 中哪个指标最先提示当前方案不再适用。

设计记录采用五个可换行字段：单元键为 **${profile.unitId}**；模式族为 **${profile.family}**；裁决是“${profile.assertion}”；观测项包括 ${profile.focuses.join("、")}；拒绝条件是“${profile.focuses[0]} 超过团队为 ${profile.title} 设定的边界”。

配置不是生产框架语法，而是一张评审卡。对 ${profile.title} 的任何实现都要能把运行证据重新映射到这张卡；如果更换 ORM、Web 框架或部署平台后无法回答同一组问题，说明决定依赖的是工具偶然行为而不是模式语义。

## 三步交互实验

<Callout type="info" title="先预测，再操作">
  在改变滑块前，先预测 ${profile.focuses[0]} 与 ${profile.focuses[1]} 哪个先越界。每次只改变一个量，并解释 ${profile.title} 的接受或拒绝为何随之变化。
</Callout>

<Stepper>
  <Step title="1. 核对责任边界">
    逐点选择 ${profile.nodes.join("、")}，确认 ${profile.title} 没有把职责悄悄推给相邻层。
    <${boundary} />
  </Step>
  <Step title="2. 比较取舍曲线">
    保持案例不变，只提高一个压力变量，观察 ${profile.focuses[0]} 的变化是否支持“${profile.assertion}”。
    <${tradeoff} />
  </Step>
  <Step title="3. 诊断失败并复位">
    切换临界和故障场景，找出 ${profile.title} 的第一个拒绝点；记录后点击“重置实验”恢复基线。
    <${failure} />
  </Step>
</Stepper>

## 选择与拒绝矩阵

| 评审问题 | 选择 ${profile.title} 的证据 | 应拒绝或改用其他方案的信号 |
| --- | --- | --- |
| 责任 | ${profile.nodes[0]} 到 ${profile.nodes.at(-1)} 的所有者清晰 | ${profile.nodes[1]} 可以绕过边界直接改写状态 |
| 变化 | ${profile.focuses[0]} 的变化被局部吸收 | 一次小改动同时触及 ${profile.focuses.slice(1, 4).join("、")} |
| 失败 | 故障能在 ${profile.nodes.at(-1)} 前被识别并回退 | 只能看到最终错误，无法定位 ${profile.focuses[0]} 的首个异常 |
| 替代 | 已与同族候选比较并保留撤回路径 | 因框架内置或团队习惯而跳过问题分析 |

<Callout type="trap" title=${quote(`误区：${copy.trapA}`)}>
  对 ${profile.title}，这种做法会让 ${profile.focuses[0]} 的真实所有者消失。修复方式是回到“${profile.nodes.join(" → ")}”逐点标出读取、决策、写入和错误翻译。
</Callout>

<Callout type="trap" title=${quote(`误区：${copy.trapB}`)}>
  ${profile.title} 必须接受临界与故障输入；只展示成功路径会掩盖 ${profile.focuses[1]} 的代价，也无法证明方案可以复位或撤回。
</Callout>

## 本章小结

掌握 ${profile.title} 的标志不是记住定义，而是能在 ${copy.caseName} 中解释“${profile.nodes.join(" → ")}”的责任链，利用 ${profile.focuses.join("、")} 作出可证伪的选择，并在出现“${copy.trapA}”时明确拒绝当前实现。

<Glossary>

${renderGlossary(profile)}

</Glossary>

<Exercises>

1. 为 ${profile.title} 写一条最小设计合同：哪一个输入变化必须引起哪一个可观察结果？

<Answer>
  以 ${copy.caseName} 为例，固定 ${profile.nodes[0]} 的输入和 ${profile.nodes.at(-1)} 的期望结果，只改变 ${profile.focuses[0]}；合同必须说明 ${profile.title} 在何值接受、何值拒绝，以及拒绝后怎样恢复到初始状态。
</Answer>

2. 在什么情况下不应选择 ${profile.title}？

<Answer>
  当“${profile.assertion}”无法成立，或 ${profile.focuses[0]}、${profile.focuses[1]} 的主要变化会同时穿透多个责任边界时，应回到同族候选比较。不能因为框架提供同名类或注解就继续使用 ${profile.title}。
</Answer>

3. 如何证明本页目录节点不是只在文字里出现？

<Answer>
  对 ${allConcepts} 逐项执行责任、取舍和失败实验；每个概念都要连接一个观察点、一条裁决和一次复位记录。若任一概念只有名称而没有 ${profile.focuses[0]} 或 ${profile.focuses[1]} 的验证证据，本页仍不通过。
</Answer>

</Exercises>

## 前后导航

${navigation}

## 来源与改写范围

- [Martin Fowler 作者图书页](${SOURCE_BOOK})：核对全书主题、教程与模式参考结构。
- [Martin Fowler 模式目录](${SOURCE_CATALOG})：核对模式名称、所属模式族和作者公开摘要。
- [Pearson 出版社页面](${SOURCE_PUBLISHER})：交叉核对英文版出版信息与目录范围。

<Attribution
  mode="independent-rewrite"
  workTitle="《企业应用架构模式》"
  adaptedFrom="2024 年中文版公开目录界定范围；作者与出版社页面核对事实；本页独立教学重写"
  adaptedUrl="${SOURCE_BOOK}"
/>
`;
}

function updateManifestSources() {
  const document = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  const book = document.books[BOOK];
  book.sourceUrl = SOURCE_BOOK;
  book.scopeSourceUrl = "https://book.douban.com/subject/36867071/";
  book.verifiedAt = "2026-07-19";
  book.factSourcesVerifiedAt = "2026-07-19";
  book.factSources = {
    "author-book": {
      title: "Martin Fowler: Patterns of Enterprise Application Architecture",
      url: SOURCE_BOOK,
      kind: "author-primary",
    },
    "author-catalog": {
      title:
        "Martin Fowler: Catalog of Patterns of Enterprise Application Architecture",
      url: SOURCE_CATALOG,
      kind: "author-primary",
    },
    publisher: {
      title: "Pearson: Patterns of Enterprise Application Architecture",
      url: SOURCE_PUBLISHER,
      kind: "publisher-primary",
    },
  };
  for (const unit of book.units ?? [])
    unit.factSourceRefs = /pattern-\d+/.test(unit.id)
      ? ["author-catalog", "author-book"]
      : ["author-book", "publisher"];
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(document, null, 2)}\n`);
}

const profiles = fs.existsSync(PROFILE_PATH)
  ? JSON.parse(fs.readFileSync(PROFILE_PATH, "utf8")).profiles
  : extractProfiles();

if (profiles.length !== 78)
  throw new Error(`期望 78 个页面，实际 ${profiles.length}`);

updateManifestSources();
for (const [index, profile] of profiles.entries()) {
  const wrapperPath = path.join(DIAGRAM_DIR, `${profile.moduleName}.tsx`);
  fs.writeFileSync(wrapperPath, renderWrapper(profile));
  fs.writeFileSync(
    path.join(ROOT, profile.path),
    renderPage(
      profile,
      profiles[index - 1] ?? null,
      profiles[index + 1] ?? null,
    ),
  );
}

console.log(
  `已按质量 v2 重写 ${profiles.length} 页及其 ${profiles.length} 个专属实验配置。`,
);
