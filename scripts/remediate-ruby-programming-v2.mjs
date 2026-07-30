import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "ruby-programming";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/ruby-programming/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/ruby-programming-v2-profiles.json",
);

const SOURCES = {
  support: "https://tanoshiiruby.github.io/5/",
  listings: "https://tanoshiiruby.github.io/5/list/",
  answers: "https://tanoshiiruby.github.io/5/answer/",
  errata: "https://tanoshiiruby.github.io/5/errata.html",
  rubyDocs: "https://docs.ruby-lang.org/en/2.3.0/",
  rubyRelease:
    "https://www.ruby-lang.org/en/news/2015/12/25/ruby-2-3-0-released/",
};

const UNIT_PATHS = {
  "tr5-01": "01-first-experience/first-ruby",
  "tr5-02": "01-first-experience/useful-objects",
  "tr5-03": "01-first-experience/building-command",
  "tr5-04": "02-foundations/objects-variables-constants",
  "tr5-05": "02-foundations/conditional-judgment",
  "tr5-06": "02-foundations/loops",
  "tr5-07": "02-foundations/methods",
  "tr5-08": "02-foundations/classes-modules",
  "tr5-09": "02-foundations/operators",
  "tr5-10": "02-foundations/errors-exceptions",
  "tr5-11": "02-foundations/blocks",
  "tr5-12": "03-classes/numeric",
  "tr5-13": "03-classes/arrays",
  "tr5-14": "03-classes/strings",
  "tr5-15": "03-classes/hashes",
  "tr5-16": "03-classes/regular-expressions",
  "tr5-17": "03-classes/io",
  "tr5-18": "03-classes/file-dir",
  "tr5-19": "03-classes/encoding",
  "tr5-20": "03-classes/time-date",
  "tr5-21": "03-classes/proc",
  "tr5-22": "04-tools/text-processing",
  "tr5-23": "04-tools/postal-code-search",
};

const SCENARIOS = {
  "tr5-01": {
    question: "怎样区分 Ruby 文件运行、命令行执行与交互环境显示的责任？",
    invariant:
      "同一脚本、参数和 Ruby 版本产生可解释的输出、错误通道与退出状态。",
    fault: "把交互环境自动显示的表达式结果误当成脚本输出",
  },
  "tr5-02": {
    question: "怎样从数组、符号、散列和正则的对象形状预测一次读取或更新？",
    invariant: "容器身份、键语义、默认值和匹配范围在操作前后都明确可查。",
    fault: "让多个键或数组位置意外共享同一个可变默认对象",
  },
  "tr5-03": {
    question:
      "怎样让命令行参数、文件读取、模式匹配和方法返回形成一个可重放命令？",
    invariant: "输入路径和模式先验证，资源始终关闭，正常数据与诊断通道分离。",
    fault: "文件读取失败后仍沿用旧内容并输出成功状态",
  },
  "tr5-04": {
    question: "怎样证明变量名、对象身份、作用域与常量查找没有被混为一谈？",
    invariant: "每次读取都能指出名字所属作用域、当前对象和允许的重新绑定规则。",
    fault: "把赋值理解为深复制，修改别名后仍期待原对象不变",
  },
  "tr5-05": {
    question: "怎样用边界表证明 Ruby 条件、逻辑运算与分支顺序覆盖完整输入域？",
    invariant: "任一合法输入进入唯一预期分支，nil、false、0 与空容器不被混淆。",
    fault: "把 0 或空字符串当作假值，导致合法输入进入拒绝分支",
  },
  "tr5-06": {
    question:
      "怎样为 times、while、until、each 与 loop 选择可证明终止的驱动方式？",
    invariant: "每轮都保持处理区间不变量，并让剩余工作量严格减少或显式退出。",
    fault: "在 next 分支跳过状态推进，使循环重复同一个状态",
  },
  "tr5-07": {
    question: "怎样把接收者、参数、块、返回值与方法可见性写成可检查契约？",
    invariant: "调用点匹配唯一意图，所有返回路径满足参数和结果约束。",
    fault: "省略接收者和括号后误判参数边界，调用了非预期方法",
  },
  "tr5-08": {
    question: "怎样用类不变量和方法查找链解释继承、模块混入与单例方法？",
    invariant: "公开操作保持对象有效，方法来源和 self 在每个调用点都可追踪。",
    fault: "混入同名方法后不核对 ancestors，错误实现静默覆盖原行为",
  },
  "tr5-09": {
    question: "怎样从解析优先级、接收者分派与返回类型解释运算符表达式？",
    invariant: "加括号后的语法树、方法调用和中间值与最终结果一致。",
    fault: "凭数学直觉读取优先级，忽略运算符实际派发到接收者方法",
  },
  "tr5-10": {
    question: "怎样划分异常的产生、传播、恢复与 ensure 清理责任？",
    invariant: "只捕获当前层能够恢复的异常，资源清理覆盖成功和失败路径。",
    fault: "捕获过宽异常并返回成功值，掩盖状态已经不可信",
  },
  "tr5-11": {
    question: "怎样区分方法拥有的流程与块注入的策略、局部变量和返回语义？",
    invariant: "yield 次数、块参数、返回位置与外部状态变化都能逐步解释。",
    fault: "把普通 Proc 中的 return 当作只离开 Proc，意外提前退出外层方法",
  },
  "tr5-12": {
    question: "怎样为整数、浮点、随机数与近似比较选择正确数值域和边界？",
    invariant: "每个中间值的类型、范围、舍入策略和随机种子都明确。",
    fault: "先执行整数除法再转为浮点，错误的小数部分已经无法恢复",
  },
  "tr5-13": {
    question: "怎样用容量、索引、元素身份和初始化策略证明数组操作正确？",
    invariant: "所有索引落在有效区间，嵌套元素的共享或复制行为符合声明。",
    fault: "使用 Array.new 的同一默认对象初始化多行矩阵",
  },
  "tr5-14": {
    question: "怎样区分字符串内容、字节、编码、可变性与外部命令结果？",
    invariant: "每次连接、切片、比较和转换都保留明确的编码与数据来源。",
    fault: "把反引号命令输出当成可信字符串，忽略命令失败和外部编码",
  },
  "tr5-15": {
    question: "怎样证明散列的键相等、默认值、更新与合并没有制造隐藏共享？",
    invariant: "每个键的规范化、哈希相等、默认对象和写回时机都可观察。",
    fault: "使用 Hash.new([]) 后直接修改默认数组却没有为键写回独立对象",
  },
  "tr5-16": {
    question: "怎样把正则模式、输入编码、捕获范围和替换结果放进同一证据链？",
    invariant: "模式只处理声明的文本语法，匹配边界和捕获结果与原输入可对应。",
    fault: "用局部正则匹配代替结构化格式解析，错误接受残缺记录",
  },
  "tr5-17": {
    question: "怎样区分流能力、文件位置、缓冲、文本模式与外部进程生命周期？",
    invariant: "读写前确认流状态，资源所有者覆盖关闭、刷新和子进程退出。",
    fault: "写入后未刷新或关闭就读取文件大小，把缓冲状态误判为数据丢失",
  },
  "tr5-18": {
    question: "怎样让路径、目录遍历、临时文件和复制删除操作保持原子与可回退？",
    invariant: "路径归属、符号链接策略、权限与替换顺序在每次文件变更前明确。",
    fault: "先删除目标再写新文件，中途失败后同时失去旧版本和新版本",
  },
  "tr5-19": {
    question: "怎样从原始字节、编码标签、有效性与转码错误定位乱码根因？",
    invariant: "来源编码有可信元数据，转换严格，任何替换性数据损失都有记录。",
    fault: "对未知字节直接 force_encoding 为 UTF-8 并把标签变化当作转码成功",
  },
  "tr5-20": {
    question: "怎样区分时间点、日历日期、偏移量、时区规则与字符串格式？",
    invariant: "解析和计算明确日历、偏移与边界，格式化结果可以往返或解释损失。",
    fault: "把固定 UTC 偏移当成时区规则，跨夏令时计算得到错误本地时间",
  },
  "tr5-21": {
    question: "怎样解释 Proc、lambda、块参数转换与 return 的控制流差异？",
    invariant: "参数严格度、调用位置、捕获变量和返回目标在执行前已声明。",
    fault: "把 lambda 与 Proc 的参数和 return 语义视为完全相同",
  },
  "tr5-22": {
    question:
      "怎样把下载、解码、正文提取、匹配和上下文展示做成可复核文本管线？",
    invariant: "原始材料保留，解析规则固定，匹配位置可回指且输出有界稳定。",
    fault: "用正则删除 HTML 标签后把残缺文本当成可靠正文",
  },
  "tr5-23": {
    question: "怎样从邮政编码原始数据重建可验证、可切换、可回滚的查询索引？",
    invariant: "原始数据、模式、事务导入、完整性检查和活动版本形成闭环。",
    fault: "直接向在线数据库逐行写入，失败时暴露半完成数据集",
  },
};

const ROLE_PROFILES = [
  {
    id: null,
    role: "learning-map",
    chapterPath: "00-basics/rub-learning-map",
    title: "Ruby基础教程（第5版）· 学习地图",
    section: "Ruby基础教程（第5版）· 导学",
    question:
      "怎样把四部分 23 章组织成对象、控制、数据与边界逐层累积的学习路线？",
    invariant: "每个官方章节都有唯一页面、前置依赖、故障回退点和掌握证据。",
    fault: "按几个宽泛主题压缩课程，跳过方法、异常、编码和工具整合的中间合同",
  },
  {
    id: null,
    role: "final-review",
    chapterPath: "03-meta/rub-final-review",
    title: "Ruby基础教程（第5版）· 全书总复习",
    section: "Ruby基础教程（第5版）· 总复习",
    question: "怎样用一个可重建的数据工具证明 23 章知识已经形成系统？",
    invariant:
      "同一输入、Ruby 版本和构建参数产生相同状态、结果、诊断与回滚行为。",
    fault: "只核对最终查询结果，不保存对象状态、异常传播、编码和事务证据",
  },
];

function toPascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join("");
}

function sectionForUnit(id) {
  const number = Number(id.slice(-2));
  if (number <= 3) return "Ruby基础教程（第5版）· Ruby 初体验";
  if (number <= 11) return "Ruby基础教程（第5版）· Ruby 基础";
  if (number <= 21) return "Ruby基础教程（第5版）· 核心类";
  return "Ruby基础教程（第5版）· 工具实践";
}

function artifactFor(title) {
  return `${title}的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。`;
}

function enrichProfile(profile) {
  const concepts = profile.concepts;
  const last = concepts.at(-1);
  return {
    ...profile,
    componentBase: `Rub${toPascal(path.basename(profile.chapterPath))}`,
    artifact: artifactFor(profile.title),
    stages: [
      {
        label: `建立${concepts[0]}输入`,
        input: `固定${concepts[0]}所需的原始值、Ruby 版本和调用入口。`,
        state: `在执行前记录接收者身份，并声明${concepts[1] ?? last}的允许状态。`,
        evidence: `保存${profile.title}的初值、参数、编码或资源位置。`,
      },
      {
        label: `执行${concepts[1] ?? concepts[0]}`,
        input: `保持相同输入，只改变与${concepts[1] ?? concepts[0]}直接相关的一项操作。`,
        state: `逐步记录${concepts[2] ?? last}造成的对象、控制或边界变化。`,
        evidence: `定位“${profile.fault}”出现时的第一处不同状态。`,
      },
      {
        label: `验收${last}`,
        input: `恢复基线，再以${last}覆盖正常、错误和重复执行。`,
        state: `最终状态必须重新满足：${profile.invariant}`,
        evidence: `交付${artifactFor(profile.title)}`,
      },
    ],
    normalTrace: [
      `固定${concepts[0]}的输入和接收者`,
      `执行${concepts[1] ?? concepts[0]}并记录状态`,
      `观察${concepts[2] ?? last}的返回或副作用`,
      `用${last}核对不变量并复位`,
    ],
    failureTrace: [
      `保持${profile.title}的输入与初值不变`,
      `仅注入故障：${profile.fault}`,
      `记录首个对象、控制或边界分岔`,
      `拒绝把最终现象误当成根因`,
    ],
  };
}

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const previousManifest = manifestDocument.books[BOOK];
if (!previousManifest) throw new Error(`缺少 ${BOOK} fidelity manifest`);

const unitProfiles = previousManifest.units.map((unit) => {
  const chapterPath = UNIT_PATHS[unit.id];
  const scenario = SCENARIOS[unit.id];
  if (!chapterPath || !scenario)
    throw new Error(`缺少 ${unit.id} 的路径或场景配置`);
  return enrichProfile({
    id: unit.id,
    role: "chapter",
    chapterPath,
    title: unit.title,
    section: sectionForUnit(unit.id),
    concepts: unit.concepts.map((alternatives) => alternatives[0]),
    ...scenario,
  });
});

const chapterTitles = unitProfiles.map((profile) => profile.title);
const roleProfiles = ROLE_PROFILES.map((profile) =>
  enrichProfile({ ...profile, concepts: chapterTitles }),
);
const profiles = [roleProfiles[0], ...unitProfiles, roleProfiles[1]];

if (profiles.length !== 25 || Object.keys(UNIT_PATHS).length !== 23) {
  throw new Error("Ruby 第 5 版必须映射 23 个官方章节与 2 个课程角色页");
}

function sourceBlock(profile) {
  return `{/* RUB_SOURCE_V2_START */}
## 来源、版次与运行边界

“${profile.title}”以[作者维护的第 5 版支持页](${SOURCES.support})核定 2016 年 3 月 12 日首刷、两位作者、松本行弘监修以及四部分 23 章目录；[逐章程序清单](${SOURCES.listings})、[练习答案](${SOURCES.answers})和[勘误](${SOURCES.errata})只作为公开支持材料，不被冒充为原书全文。

对“${profile.title}”而言，中文解释、示例、交互、练习和答案均为独立教学重写；站内中文章名是与官方 23 章顺序对应的课程映射，不宣称是日文小节的逐字翻译，也不从公开程序清单复制整段实现。

“${profile.title}”固定在 Ruby 2.3 语境；[Ruby 2.3.0 官方文档](${SOURCES.rubyDocs})与[稳定版发布说明](${SOURCES.rubyRelease})用于核对当时可用的语言和标准库行为。现代 Ruby 的差异只能另列迁移说明，不能静默改变本页示例的版本结论。

围绕“${profile.question}”，本页验收“${profile.artifact}”。先预测正常轨迹，再只注入“${profile.fault}”；若无法定位第一处状态分岔，就拒绝当前解释。
{/* RUB_SOURCE_V2_END */}`;
}

function objectivesBlock(profile) {
  return `{/* RUB_OBJECTIVES_V2_START */}
<Objectives>

- 能解释${profile.concepts[0]}与${profile.concepts[1] ?? profile.concepts[0]}在“${profile.title}”中的责任边界
- 能围绕“${profile.question}”运行正常与故障轨迹并定位首个分岔
- 能用“${profile.artifact}”证明“${profile.invariant}”

</Objectives>
{/* RUB_OBJECTIVES_V2_END */}`;
}

function evidenceBlock(profile) {
  const conceptRows = profile.concepts
    .map(
      (concept, index) =>
        `- <Term def="在“${profile.title}”中，${concept}必须连接输入、状态变化与可复核结果。">${concept}</Term>：第 ${index + 1} 个正式节点要能回到“${profile.invariant}”，并说明故障发生前后的第一处差异。`,
    )
    .join("\n");

  return `{/* RUB_EVIDENCE_V2_START */}
## 正式节点与章专属证据

${conceptRows}

<Callout type="trap" title="边界误区：${profile.fault}">
  在“${profile.title}”中，这个故障会破坏“${profile.invariant}”。保持其余输入不变，只比较正常与失败轨迹；修复后使用每个交互右上角的重置控制恢复同一基线。
</Callout>

<${profile.componentBase}ObjectModelLab />

<${profile.componentBase}ControlTraceLab />

<${profile.componentBase}BoundaryProbeLab />
{/* RUB_EVIDENCE_V2_END */}

`;
}

function practiceBlock(profile) {
  const glossaryConcepts = profile.concepts;
  const glossary = glossaryConcepts
    .map(
      (concept) =>
        `  <GlossaryItem term="${concept}">“${profile.title}”中的正式节点；必须说明它接收什么、改变什么，以及用什么结果复核。</GlossaryItem>`,
    )
    .join("\n");
  const allConcepts = profile.concepts.join("、");

  return `{/* RUB_PRACTICE_V2_START */}
## 练习与答案

<Exercises>
  1. **问题 1：建立正常轨迹。** 回答“${profile.question}”，并写出四步执行记录。

  <Answer question="怎样建立“${profile.title}”的正常轨迹？">先固定${profile.concepts[0]}的输入与接收者，再执行${profile.concepts[1] ?? profile.concepts[0]}，观察${profile.concepts[2] ?? profile.concepts.at(-1)}的返回或副作用，最后用${profile.concepts.at(-1)}复核“${profile.invariant}”。每一步都保留前后状态，不能只抄最终输出。</Answer>

  2. **问题 2：注入单一故障。** 只制造“${profile.fault}”，应从哪里开始定位？

  <Answer question="“${profile.title}”的单一故障如何定位？">复用问题 1 的输入和初值，仅打开故障开关；比较两条轨迹的第一处不同对象、控制位置或资源状态。第一处差异才是根因候选，后续报错或输出只是传播结果；修复后重置并复跑正常轨迹。</Answer>

  3. **问题 3：覆盖正式节点。** 用一个证据包串联${allConcepts}，说明为什么结论可由另一位读者独立复核。

  <Answer question="“${profile.title}”需要交付哪些复核材料？">${profile.artifact}证据包还应逐项标记${allConcepts}出现的位置，并同时保存正常、错误和复位结果。若任一正式节点只能由口头解释而不能回到输入、状态或输出，本章仍未验收。</Answer>
</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="authorized-sample"
  workTitle="Ruby 基础教程第 5 版作者支持资料"
  adaptedUrl="${SOURCES.support}"
/>
{/* RUB_PRACTICE_V2_END */}`;
}

function wrapperSource(profile) {
  const model = {
    unitId: profile.id ?? profile.role,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    stages: profile.stages,
    normalTrace: profile.normalTrace,
    failureTrace: profile.failureTrace,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
  };

  return `"use client";

import {
  RubyEvidenceLab,
  type RubyEvidenceModel,
} from "./ruby-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies RubyEvidenceModel;

export function ${profile.componentBase}ObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function ${profile.componentBase}ControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function ${profile.componentBase}BoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
`;
}

function stripManaged(body) {
  return body
    .replace(
      /\{\/\* RUB_OBJECTIVES_V2_START \*\/\}[\s\S]*?\{\/\* RUB_OBJECTIVES_V2_END \*\/\}\s*/g,
      "",
    )
    .replace(
      /\{\/\* RUB_SOURCE_V2_START \*\/\}[\s\S]*?\{\/\* RUB_SOURCE_V2_END \*\/\}\s*/g,
      "",
    )
    .replace(
      /\{\/\* RUB_EVIDENCE_V2_START \*\/\}[\s\S]*?\{\/\* RUB_EVIDENCE_V2_END \*\/\}\s*/g,
      "",
    )
    .replace(
      /\{\/\* RUB_PRACTICE_V2_START \*\/\}[\s\S]*?\{\/\* RUB_PRACTICE_V2_END \*\/\}\s*/g,
      "",
    )
    .replace(
      /^import \{ Objectives \} from "@\/components\/mdx\/objectives";\s*$/gm,
      "",
    )
    .replace(/^import \{ Term \} from "@\/components\/mdx\/term";\s*$/gm, "")
    .replace(
      /^import \{ Callout \} from "@\/components\/mdx\/callout";\s*$/gm,
      "",
    )
    .replace(
      /^import \{ Answer, Exercises \} from "@\/components\/mdx\/exercises";\s*$/gm,
      "",
    )
    .replace(
      /^import \{ Glossary, GlossaryItem \} from "@\/components\/mdx\/glossary";\s*$/gm,
      "",
    )
    .replace(
      /^import \{ Attribution \} from "@\/components\/mdx\/attribution";\s*$/gm,
      "",
    )
    .replace(
      /^import \{\s*(?:[A-Za-z0-9_]+,?\s*)+\} from "@\/components\/mdx\/ruby-programming\/v2\/[^"]+";\s*/gm,
      "",
    )
    .replace(/\n## 术语表\s*$/m, "")
    .replaceAll("《たのしいRuby 第5版》", "《Ruby基础教程（第5版）》")
    .replaceAll("たのしいRuby 第5版", "Ruby基础教程（第5版）");
}

async function writeFormatted(filePath, source, parser) {
  const output = await format(source, { parser });
  const current = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "";
  if (current !== output) fs.writeFileSync(filePath, output);
}

async function transformPage(profile) {
  const filePath = path.join(CONTENT_ROOT, `${profile.chapterPath}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${filePath}`);

  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  let body = stripManaged(parsed.content).trim();
  const firstHeading = body.search(/^## /m);
  if (firstHeading < 0) throw new Error(`缺少正文标题：${profile.chapterPath}`);

  const wrapperImport = `import { ${profile.componentBase}ObjectModelLab, ${profile.componentBase}ControlTraceLab, ${profile.componentBase}BoundaryProbeLab } from "@/components/mdx/ruby-programming/v2/${path.basename(profile.chapterPath)}";`;
  const imports = `import { Objectives } from "@/components/mdx/objectives";
import { Term } from "@/components/mdx/term";
import { Callout } from "@/components/mdx/callout";
import { Answer, Exercises } from "@/components/mdx/exercises";
import { Glossary, GlossaryItem } from "@/components/mdx/glossary";
import { Attribution } from "@/components/mdx/attribution";
${wrapperImport}`;

  body = `${imports}

${objectivesBlock(profile)}

${sourceBlock(profile)}

${body}`;

  const recapPattern = /^## 本章回顾[^\n]*$/m;
  if (!recapPattern.test(body))
    throw new Error(`缺少本章回顾：${profile.chapterPath}`);
  body = body.replace(recapPattern, `${evidenceBlock(profile)}$&`);
  body = `${body.trim()}

${practiceBlock(profile)}
`;

  if (/[ぁ-ヿ]/.test(body))
    throw new Error(`页面仍有日文假名：${profile.chapterPath}`);

  const data = {
    ...parsed.data,
    title: profile.title,
    section: profile.section,
    demo: true,
    sourceUrl: SOURCES.support,
    qualityVersion: 2,
    practiceMode: "calculation",
    sourceMode: "independent-rewrite",
    ...(profile.id ? { officialUnitId: profile.id } : {}),
  };

  await writeFormatted(
    filePath,
    matter.stringify(body.trimStart(), data),
    "mdx",
  );
  await writeFormatted(
    path.join(COMPONENT_ROOT, `${path.basename(profile.chapterPath)}.tsx`),
    wrapperSource(profile),
    "typescript",
  );
}

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

const units = previousManifest.units.map((unit) => {
  const profile = unitProfiles.find((candidate) => candidate.id === unit.id);
  if (!profile) throw new Error(`清单存在未映射单元：${unit.id}`);
  return {
    ...unit,
    title: profile.title,
    chapterPath: profile.chapterPath,
  };
});

manifestDocument.books[BOOK] = {
  ...previousManifest,
  edition:
    "Ruby基础教程第5版；日文原版第5版于2016年3月12日首刷，面向Ruby 2.3；中文版ISBN 9787115462947",
  sourceKind:
    "official-author-support-metadata-toc-program-list-answers-errata-and-ruby-2-3-documentation",
  sourceUrl: SOURCES.support,
  secondarySourceUrls: [
    SOURCES.listings,
    SOURCES.answers,
    SOURCES.errata,
    SOURCES.rubyDocs,
    SOURCES.rubyRelease,
  ],
  verifiedAt: "2026-07-30",
  disclosureNote:
    "作者支持页确认第5版首刷日期、作者、监修与四部分23章目录，并公开逐章程序清单、部分习题答案和勘误；这些支持材料不是原书全文。站内中文章名是课程映射，不冒充日文小节逐字翻译。正文删除日文假名，原版题名只在本清单中保留用于溯源。",
  units,
  sourceAccess: "authorized-sample",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence: "quality/ruby-programming-v2-profiles.json",
  factSourcePolicy:
    "目录与官方支持材料只限定课程范围和当时示例；技术事实用Ruby 2.3官方文档与发布说明核对。现代Ruby差异必须明确标为迁移说明，不得静默升级。",
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
      officialSource: SOURCES.support,
      supportSources: [
        SOURCES.listings,
        SOURCES.answers,
        SOURCES.errata,
        SOURCES.rubyDocs,
        SOURCES.rubyRelease,
      ],
      officialUnits: 23,
      teachingConceptMappings: unitProfiles.reduce(
        (sum, profile) => sum + profile.concepts.length,
        0,
      ),
      interactiveViews: profiles.length * 3,
      pages: profiles.map((profile) => ({
        chapterPath: profile.chapterPath,
        title: profile.title,
        role: profile.role,
        officialUnitId: profile.id,
        concepts: profile.concepts,
        question: profile.question,
        invariant: profile.invariant,
        fault: profile.fault,
        artifact: profile.artifact,
      })),
    },
    null,
    2,
  )}\n`,
);

console.log(
  `已增强 ${profiles.length} 页，映射 23 个官方章节、${unitProfiles.reduce((sum, profile) => sum + profile.concepts.length, 0)} 个教学概念，生成 ${profiles.length * 3} 个交互视图。`,
);
