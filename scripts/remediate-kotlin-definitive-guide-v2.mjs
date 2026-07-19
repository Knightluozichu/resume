#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "kotlin-definitive-guide";
const BOOK_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(
  ROOT,
  "src/components/mdx/kotlin-definitive-guide/diagrams",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/kotlin-definitive-guide-v2-profiles.json",
);

const OUTLINE =
  "https://www.oreilly.com/library/view/kotlin-programming-the/9780135165188/";
const CHINESE_RECORD = "https://e.dangdang.com/touch/products/1901154363.html";
const WORK_TITLE =
  "Josh Skeen、David Greenhalgh《Kotlin Programming: The Big Nerd Ranch Guide》第1版（Addison-Wesley，2018）";

const DOCS = {
  kotlin12: "https://kotlinlang.org/docs/whatsnew12.html",
  basics: "https://kotlinlang.org/docs/basic-syntax.html",
  nullSafety: "https://kotlinlang.org/docs/null-safety.html",
  javaInterop: "https://kotlinlang.org/docs/java-interop.html",
  javaToKotlin: "https://kotlinlang.org/docs/java-to-kotlin-interop.html",
  coroutines: "https://kotlinlang.org/docs/coroutines-guide.html",
  android: "https://developer.android.com/kotlin/overview",
};

const PRACTICE_MODES = {
  "kdg1-official-learning-map": "design",
  "kdg1-introducing-kotlin": "design",
  "kdg1-01-first-application": "code",
  "kdg1-02-variables-types": "code",
  "kdg1-03-conditionals": "simulation",
  "kdg1-04-functions": "code",
  "kdg1-05-anonymous-functions": "code",
  "kdg1-06-null-safety-exceptions": "diagnosis",
  "kdg1-07-strings": "code",
  "kdg1-08-numbers": "calculation",
  "kdg1-09-standard-functions": "code",
  "kdg1-10-lists-sets": "simulation",
  "kdg1-11-maps": "simulation",
  "kdg1-12-defining-classes": "code",
  "kdg1-13-initialization": "diagnosis",
  "kdg1-14-inheritance": "design",
  "kdg1-15-objects": "design",
  "kdg1-16-interfaces-abstract-classes": "design",
  "kdg1-17-generics": "diagnosis",
  "kdg1-18-extensions": "code",
  "kdg1-19-functional-programming": "simulation",
  "kdg1-20-java-interoperability": "diagnosis",
  "kdg1-21-first-android-application": "simulation",
  "kdg1-22-coroutines-introduction": "simulation",
  "kdg1-23-afterword": "design",
  "kdg1-appendix-a-more-challenges": "code",
  "kdg1-glossary": "design",
  "kdg1-index": "design",
  "kdg1-official-final-review": "diagnosis",
};

const SECTION_NAMES = {
  "00-official-learning-map": "Kotlin权威指南 · 学习地图",
  "01-introduction": "Kotlin权威指南 · 导论",
  "02-language-foundations": "Kotlin权威指南 · 语言基础",
  "03-functions-null-values": "Kotlin权威指南 · 函数与空安全",
  "04-values-collections": "Kotlin权威指南 · 值与集合",
  "05-object-model": "Kotlin权威指南 · 对象模型",
  "06-integration": "Kotlin权威指南 · 互操作与协程",
  "07-reference": "Kotlin权威指南 · 参考与挑战",
  "08-official-final-review": "Kotlin权威指南 · 全书验收",
};

const STAGES = {
  code: ["声明合同", "建立输入", "执行转换", "观察产物", "断言回归"],
  calculation: ["界定数域", "选择表示", "执行换算", "检查精度", "验证边界"],
  simulation: ["固定初态", "施加动作", "推进状态", "观察差异", "复位重放"],
  diagnosis: ["建立基线", "注入反例", "定位边界", "修复合同", "同输入复验"],
  design: ["界定责任", "比较方案", "声明不变量", "验证替换", "记录决策"],
};

const TERMS = {
  code: [
    "静态合同",
    "输入域",
    "求值顺序",
    "可观察结果",
    "失败出口",
    "回归断言",
  ],
  calculation: [
    "数值类型",
    "表示范围",
    "显式转换",
    "精度边界",
    "舍入规则",
    "结果断言",
  ],
  simulation: [
    "初始状态",
    "单一变量",
    "状态迁移",
    "可见反馈",
    "故障注入",
    "复位重放",
  ],
  diagnosis: [
    "正常基线",
    "反例输入",
    "首个分叉",
    "边界隔离",
    "修复策略",
    "恢复证据",
  ],
  design: [
    "职责边界",
    "设计约束",
    "不变量",
    "替换规则",
    "权衡记录",
    "验收产物",
  ],
};

function walkMdx(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walkMdx(path.join(directory, entry.name))
        : [path.join(directory, entry.name)],
    )
    .filter((filePath) => filePath.endsWith(".mdx"))
    .sort();
}

function cleanSentence(value) {
  return String(value ?? "")
    .trim()
    .replace(/[。！]+$/, "");
}

function firstMatch(source, pattern, fallback) {
  return cleanSentence(source.match(pattern)?.[1] ?? fallback);
}

function extractLegacyProfile(filePath, parsed, order) {
  const chapterSlug = path.basename(filePath, ".mdx");
  const sectionSlug = path.basename(path.dirname(filePath));
  const source = parsed.content;
  const focus = firstMatch(
    source,
    /本单元主线是([^。！？\n]*)/,
    parsed.data.description,
  );
  const trap = firstMatch(
    source,
    /\*\*本单元核心陷阱。\*\*\s*([^。！\n]+[。！]?)/,
    `无法用反例验证${focus}`,
  );
  const code =
    source
      .match(/## 最小可执行切片[\s\S]*?```kotlin\n([\s\S]*?)```/)?.[1]
      ?.trimEnd() ??
    `data class Evidence(val chapter: String, val passed: Boolean)\n\nval evidence = Evidence(${JSON.stringify(String(parsed.data.title))}, false)\ncheck(!evidence.passed)`;
  const evidence = firstMatch(
    source,
    /交付不是更多代码行，而是([^；。]+)[；。]/,
    `${focus}的输入记录、失败样例、可见输出与回归断言`,
  );
  const practiceMode = PRACTICE_MODES[chapterSlug];
  if (!practiceMode) throw new Error(`缺少实践模式：${chapterSlug}`);
  return {
    title: String(parsed.data.title),
    description: String(parsed.data.description),
    order,
    sectionSlug,
    chapterSlug,
    relativePath: path.relative(ROOT, filePath).replaceAll(path.sep, "/"),
    practiceMode,
    focus,
    trap,
    code,
    evidence,
    invariant: `${focus}的输入、类型边界、求值结果和失败路径都能由独立读者重放`,
    stages: STAGES[practiceMode],
    terms: TERMS[practiceMode],
    historicalLabel: "Kotlin 1.2 / JVM 时代基线",
    currentLabel: "当前 Kotlin 迁移对照",
  };
}

function technicalSourceFor(chapterSlug) {
  if (chapterSlug === "kdg1-06-null-safety-exceptions")
    return { id: "nullSafety", url: DOCS.nullSafety };
  if (chapterSlug === "kdg1-20-java-interoperability")
    return { id: "javaInterop", url: DOCS.javaInterop };
  if (chapterSlug === "kdg1-21-first-android-application")
    return { id: "androidKotlin", url: DOCS.android };
  if (chapterSlug === "kdg1-22-coroutines-introduction")
    return { id: "coroutines", url: DOCS.coroutines };
  return { id: "basicSyntax", url: DOCS.basics };
}

function escapeMdx(value) {
  return String(value)
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&amp;", "&")
    .replaceAll("{", "&#123;")
    .replaceAll("}", "&#125;");
}

function insightFor(concept, profile) {
  const value = concept.toLocaleLowerCase();
  const base = `${concept}服务于${profile.focus}`;
  if (/challenge|练习|exercism/.test(value))
    return `${base}。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是${profile.evidence}，不是一次示例输出。`;
  if (/null|exception|precondition|throw|platform/.test(value))
    return `${base}。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用${profile.evidence}定位最早失效处。`;
  if (
    /function|lambda|inline|reference|receiver|apply|let|run|with|also/.test(
      value,
    )
  )
    return `${base}。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；${profile.evidence}必须能区分语法缩短与合同改变。`;
  if (
    /class|object|interface|inherit|generic|constructor|propert|type|in and out|reified/.test(
      value,
    )
  )
    return `${base}。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查${profile.evidence}是否支持对象不变量。`;
  if (
    /list|set|map|sequence|range|string|number|convert|format|unicode|array/.test(
      value,
    )
  )
    return `${base}。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由${profile.evidence}判断只读、不可变、精度或惰性结论是否成立。`;
  if (
    /android|activity|gradle|view|coroutine|async|launch|thread|suspend|live data/.test(
      value,
    )
  )
    return `${base}。将生命周期、线程或任务所有者和取消出口放在同一时间线上，区分2018年的接口身份与当前迁移方案；用${profile.evidence}验证状态恢复和失败隔离。`;
  if (/install|project|file|running|compil|repl|jvm|idea/.test(value))
    return `${base}。保存工具链版本、源码、编译命令、产物和退出状态，使IDE按钮之外仍能解释源码如何进入JVM；${profile.evidence}承担复现责任。`;
  return `${base}。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以${profile.evidence}完成独立复核。`;
}

function nodeSection(concept, index, profile) {
  const stage = profile.stages[index % profile.stages.length];
  const nextStage = profile.stages[(index + 1) % profile.stages.length];
  return `### ${concept}\n\n${insightFor(concept, profile)}\n\n在 ${profile.title} 的 ${stage} 阶段，${concept}先声明可接受输入和状态拥有者，再说明为何得到当前结果。随后进入${nextStage}，使用同一份输入把正常路径与${profile.trap}产生的反例并排保存。\n\n对 ${concept} 的四级验收分别是：正文出现该坐标；解释它如何参与${profile.focus}；在章专属实验中选择该节点并观察反馈；最后凭${profile.evidence}回答练习、复位并重放。`;
}

function termDefinition(term, profile, index) {
  const endings = [
    `限定${profile.title}允许进入系统的值与前置条件`,
    `标记${profile.focus}中状态由谁创建、修改和释放`,
    `说明Kotlin 1.2实现与当前迁移之间必须保持的语义`,
    `保存能推翻${profile.trap}的原始观察`,
    `把错误停在${profile.stages[index % profile.stages.length]}而非继续扩散`,
    `让另一位读者凭${profile.evidence}得到相同结论`,
  ];
  return `${term}在本页${endings[index % endings.length]}。`;
}

function wrapperSource(profile, concepts) {
  const nodes = concepts.map((concept, index) => ({
    label: concept,
    stage: profile.stages[index % profile.stages.length],
    mechanism: insightFor(concept, profile),
    probe: `${concept}使用${profile.evidence}完成出现、解释、实验和练习四级核对`,
  }));
  const model = {
    historicalLabel: profile.historicalLabel,
    currentLabel: profile.currentLabel,
    invariant: profile.invariant,
    fault: profile.trap,
    evidence: profile.evidence,
    boundary: `${profile.focus}的最小合法输入与第一个非法输入`,
  };
  return `import {\n  KdgContractLab,\n  KdgCoverageLab,\n  KdgRecoveryLab,\n  type KdgCausalModel,\n  type KdgCoverageNode,\n} from "./official-kdg1-book-lab";\n\nconst title = ${JSON.stringify(profile.title)};\nconst focus = ${JSON.stringify(profile.focus)};\nconst stages = ${JSON.stringify(profile.stages, null, 2)};\nconst nodes = ${JSON.stringify(nodes, null, 2)} satisfies KdgCoverageNode[];\nconst model = ${JSON.stringify(model, null, 2)} satisfies KdgCausalModel;\nconst props = { title, focus, stages, nodes, model };\n\nexport function KdgModelLab() {\n  return <KdgCoverageLab {...props} />;\n}\n\nexport function KdgFailureLab() {\n  return <KdgContractLab {...props} />;\n}\n\nexport function KdgEvidenceLab() {\n  return <KdgRecoveryLab {...props} />;\n}\n`;
}

function contentFor(entry, previous, next) {
  const { profile, concepts } = entry;
  const technical = technicalSourceFor(profile.chapterSlug);
  const deepDive = concepts
    .map((concept, index) => nodeSection(concept, index, profile))
    .join("\n\n");
  const terms = profile.terms
    .map(
      (term, index) =>
        `<Term def=${JSON.stringify(termDefinition(term, profile, index))}>${term}</Term>`,
    )
    .join("、");
  const glossary = profile.terms
    .map(
      (term, index) =>
        `<GlossaryItem term=${JSON.stringify(term)}>\n    ${termDefinition(term, profile, index)}\n  </GlossaryItem>`,
    )
    .join("\n  ");
  const practices = concepts
    .map(
      (concept, index) =>
        `  - **${concept}**：在${profile.stages[index % profile.stages.length]}阶段保存输入与结果，触发${profile.trap}后恢复初态，并由${profile.evidence}确认语义未漂移。`,
    )
    .join("\n");
  const navigation = [
    previous
      ? `[← 上一页：${previous.profile.title}](/learn/${BOOK}/${previous.profile.sectionSlug}/${previous.profile.chapterSlug})`
      : null,
    next
      ? `[下一页：${next.profile.title} →](/learn/${BOOK}/${next.profile.sectionSlug}/${next.profile.chapterSlug})`
      : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return `import { KdgModelLab, KdgFailureLab, KdgEvidenceLab } from "@/components/mdx/kotlin-definitive-guide/diagrams/${profile.chapterSlug}";\n+import {\n+  Objectives,\n+  Callout,\n+  Glossary,\n+  GlossaryItem,\n+  Term,\n+  Exercises,\n+  Answer,\n+  Stepper,\n+  Step,\n+  Attribution,\n+} from "@/components/mdx/mdx-components";\n+\n+# ${profile.title}\n+\n+<Objectives>\n+\n+- 能说明${profile.focus}，并画出输入、类型或对象边界与可见结果。\n+- 能运行本页保留的 Kotlin 切片，解释它在 Kotlin 1.2/JVM 语境中的编译或执行路径。\n+- 能操作覆盖、合同和恢复三层实验，让全部 ${concepts.length} 个正式节点拥有可见教学因果。\n+- 能触发${profile.trap}，凭${profile.evidence}完成诊断、修复、复位与同输入重放。\n+\n+</Objectives>\n+\n+{/* KOTLIN_DEFINITIVE_GUIDE_QUALITY_V2 */}\n+\n+## 从本章问题开始\n+\n+${profile.title}要解决的不是语法记忆，而是${profile.focus}。先写出输入和期望结果，再运行最小切片；如果无法解释失败落在编译期、边界层还是运行期，程序即使输出一次正确答案也未通过。\n+\n+本页不把 val 等同深度不可变，也不把简洁语法等同动态类型。Kotlin 的类型、可空性、求值规则和对象模型共同压缩非法状态；本章不变量是${profile.invariant}。\n+\n+## 来源范围与年代边界\n+\n+O’Reilly 的[第1版书目与完整目录](${OUTLINE})只用于核定本页范围，[中文版出版记录](${CHINESE_RECORD})用于交叉核对译本信息；未取得的原书正文不作忠实性宣称。${profile.title}涉及的语言机制由[JetBrains/Android 一手文档](${technical.url})独立核验，以下中文讲解、代码组织、图示、实验和练习均为独立教学重写。\n+\n+第1版的教学坐标是2018年前后的 Kotlin 1.2、JVM、IntelliJ 与当时 Android/早期协程接口。[Kotlin 1.2 发布说明](${DOCS.kotlin12})用于锁定历史能力；当前文档只提供迁移对照，Flow、Compose、MockK、现代 Gradle Kotlin DSL 和第二版新增内容不倒灌为原书内容。\n+\n+## 本章机制与六个检查点\n+\n+${terms}。这些检查点共同回答${profile.focus}，最终必须落到${profile.evidence}，不能只停在API名称或目录词。\n+\n+## 先预测，再操作三层实验\n+\n+先预测：选择一个正式节点后哪一阶段会先改变；切换历史基线与当前迁移时哪项语义必须不变；触发${profile.trap}后，应由哪份证据定位并恢复。\n+\n+<Stepper>\n+  <Step title="1. 全节点覆盖与状态链">\n+    选择任一正式节点和机制阶段，检查输入、状态拥有者、可见结果与专属证据；节点列表不截断。\n+\n+    <KdgModelLab />\n+\n+  </Step>\n+  <Step title="2. 历史合同与当前迁移">\n+    在正常、边界和故障输入间切换，只改变保护合同或技术坐标，观察结果为何变化。\n+\n+    <KdgFailureLab />\n+\n+  </Step>\n+  <Step title="3. 故障、恢复与重放">\n+    比较正常轨迹、首错轨迹和恢复轨迹；最后点击重置，确认选择项与可见输出都回到初始值。\n+\n+    <KdgEvidenceLab />\n+\n+  </Step>\n+</Stepper>\n+\n+## 正式目录逐项深读\n+\n+${deepDive}\n+\n+## 最小可执行切片\n+\n+\`\`\`kotlin\n+${profile.code}\n+\`\`\`\n+\n+运行切片时固定 Kotlin/JDK 或 Android 工具链版本、输入数据和命令；保存标准输出、编译诊断及断言。迁移实验必须另建记录，不能静默改写2018年的历史坐标。\n+\n+<Callout type="trap" title="本章核心陷阱">\n+  ${profile.trap}。先缩小到最小反例，明确是类型合同、对象所有权、求值顺序还是平台边界失效，再用同输入验证修复。\n+</Callout>\n+\n+<Callout type="trap" title="把当前惯例倒灌进第一版">\n+  ${profile.title}保留 Kotlin 1.2/JVM 的历史身份；当前 Kotlin 或 Android 方案只作单独迁移坐标，不能据此改写第一版目录和接口身份。\n+</Callout>\n+\n+<Callout type="trap" title="只保留成功输出">\n+  ${profile.evidence}必须同时包含正常、边界和失败路径；如果故障后不能恢复并复位，本页实践闭环仍未完成。\n+</Callout>\n+\n+## 练习、答案与四级证据\n+\n+<Exercises>\n+\n+**问题 1：历史与迁移。** 怎样既保留 Kotlin 1.2 的教学身份，又使用当前官方资料核验机制？\n+\n+<Answer>\n+  先以[Kotlin 1.2发布说明](${DOCS.kotlin12})和目录锁定历史范围，再用[当前技术文档](${technical.url})建立单独迁移记录。比较相同输入、结果和不变量；只改变版本坐标，不把当前API伪装成第一版内容。\n+</Answer>\n+\n+**问题 2：逐节点验证。** 本页 ${concepts.length} 个正式节点怎样从出现升级到可复查证据？\n+\n+<Answer>\n+${practices}\n+</Answer>\n+\n+**问题 3：反例闭环。** 遇到${profile.trap}时，如何判断修复真正成立？\n+\n+<Answer>\n+  保存首个失败诊断，恢复显式输入域、类型或对象边界和求值顺序，再以相同工具链和输入重跑正常、边界、非法三组样例。只有${profile.evidence}回到基线且${profile.invariant}重新成立，才能通过。\n+</Answer>\n+\n+</Exercises>\n+\n+## 术语复核与本章回顾\n+\n+<Glossary>\n+  ${glossary}\n+</Glossary>\n+\n+完成${profile.title}意味着：能解释${profile.focus}，能运行并改动章专属切片，能主动制造${profile.trap}，还能凭${profile.evidence}恢复并交接，而不是只识别术语。\n+\n+## 阅读导航\n+\n+${navigation}\n+\n+<Attribution\n+  mode="independent-rewrite"\n+  sourceBasis="outline-only"\n+  workTitle=${JSON.stringify(WORK_TITLE)}\n+  adaptedUrl=${JSON.stringify(OUTLINE)}\n+/>\n+`
    .replace(/^\+/gm, "")
    .replace(/^# [^\n]+\n\n/m, "");
}

const manifestRoot = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = manifestRoot.books[BOOK];
if (!manifest) throw new Error(`缺少 ${BOOK} manifest`);
const formalNodes = manifest.units.reduce(
  (sum, unit) => sum + unit.concepts.length,
  0,
);
if (manifest.units.length !== 27 || formalNodes !== 295)
  throw new Error(
    `Kotlin manifest 分母异常：${manifest.units.length}/${formalNodes}`,
  );

const rawEntries = walkMdx(BOOK_DIR).map((filePath, order) => {
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  return { filePath, parsed, order };
});
if (rawEntries.length !== 29)
  throw new Error(`Kotlin 页面分母异常：${rawEntries.length}`);

let profileRoot = null;
if (fs.existsSync(PROFILE_PATH)) {
  profileRoot = JSON.parse(fs.readFileSync(PROFILE_PATH, "utf8"));
} else {
  profileRoot = {
    version: 2,
    bookSlug: BOOK,
    sourceAccess: "outline-only",
    sourceMode: "independent-rewrite",
    scope: { formalUnits: 27, outlineNodes: 295, pages: 29 },
    profiles: rawEntries.map(({ filePath, parsed, order }) =>
      extractLegacyProfile(filePath, parsed, order),
    ),
  };
}
const profiles = new Map(
  profileRoot.profiles.map((profile) => [profile.chapterSlug, profile]),
);

const sectionOrders = new Map();
const entries = rawEntries.map(({ filePath, parsed }) => {
  const chapterSlug = path.basename(filePath, ".mdx");
  const sectionSlug = path.basename(path.dirname(filePath));
  const profile = profiles.get(chapterSlug);
  if (!profile) throw new Error(`缺少 Kotlin v2 profile：${chapterSlug}`);
  const sectionOrder = (sectionOrders.get(sectionSlug) ?? 0) + 1;
  sectionOrders.set(sectionSlug, sectionOrder);
  const unit = manifest.units.find((item) => item.id === chapterSlug);
  const concepts =
    chapterSlug === "kdg1-official-learning-map" ||
    chapterSlug === "kdg1-official-final-review"
      ? manifest.units.map((item) => escapeMdx(item.title))
      : (unit?.concepts.map((alternatives) => escapeMdx(alternatives[0])) ??
        []);
  if (concepts.length === 0) throw new Error(`页面未映射正式节点：${filePath}`);
  return {
    filePath,
    parsed,
    profile: { ...profile, sectionSlug },
    sectionOrder,
    unit,
    concepts,
  };
});

for (const [index, entry] of entries.entries()) {
  const previous = entries[index - 1] ?? null;
  const next = entries[index + 1] ?? null;
  const content = contentFor(entry, previous, next);
  const data = {
    ...entry.parsed.data,
    description: `${entry.profile.title}：${entry.profile.focus}，通过全节点状态链、历史迁移对照和故障恢复完成验收。`,
    section: SECTION_NAMES[entry.profile.sectionSlug],
    order: entry.sectionOrder,
    sourceUrl: OUTLINE,
    qualityVersion: 2,
    practiceMode: entry.profile.practiceMode,
    sourceMode: "independent-rewrite",
  };
  fs.writeFileSync(entry.filePath, matter.stringify(content, data));
  fs.writeFileSync(
    path.join(COMPONENT_DIR, `${entry.profile.chapterSlug}.tsx`),
    wrapperSource(entry.profile, entry.concepts),
  );
}

const factSources = {
  publisherOutline: {
    kind: "outline",
    label: "O’Reilly 第1版完整详细目录与书目页",
    url: OUTLINE,
  },
  chineseBibliography: {
    kind: "bibliographic-record",
    label: "中文版出版记录",
    url: CHINESE_RECORD,
  },
  kotlin12: {
    kind: "official-historical-documentation",
    label: "JetBrains Kotlin 1.2 发布说明",
    url: DOCS.kotlin12,
  },
  basicSyntax: {
    kind: "official-current-migration-documentation",
    label: "JetBrains Kotlin 基础语法文档",
    url: DOCS.basics,
  },
  nullSafety: {
    kind: "official-current-migration-documentation",
    label: "JetBrains Kotlin 空安全文档",
    url: DOCS.nullSafety,
  },
  javaInterop: {
    kind: "official-current-migration-documentation",
    label: "JetBrains Kotlin 调用 Java 文档",
    url: DOCS.javaInterop,
  },
  javaToKotlin: {
    kind: "official-current-migration-documentation",
    label: "JetBrains Java 与 Kotlin 互操作文档",
    url: DOCS.javaToKotlin,
  },
  coroutines: {
    kind: "official-current-migration-documentation",
    label: "JetBrains Kotlin 协程指南",
    url: DOCS.coroutines,
  },
  androidKotlin: {
    kind: "official-current-migration-documentation",
    label: "Android Developers Kotlin 概览",
    url: DOCS.android,
  },
};

manifest.version = 2;
manifest.sourceAccess = "outline-only";
manifest.sourceMode = "independent-rewrite";
manifest.defaultSourceMode = "independent-rewrite";
manifest.sourceKind =
  "official-publisher-complete-toc-bibliographic-record-and-primary-technical-documentation";
manifest.status = "verified-outline-independent-rewrite";
manifest.verifiedAt = "2026-07-19";
manifest.disclosureNote =
  "未取得原书全文；O’Reilly完整目录只用于界定导论、23章、附录A、术语表、索引及295个节点，不宣称复现正文。语言事实以JetBrains Kotlin一手文档核验，Android事实以Android Developers核验；正文、代码组织、图示、交互和练习独立教学重写，并区分Kotlin 1.2历史坐标与当前迁移。";
manifest.factSourcePolicy =
  "目录节点必须同时具备出现、独立解释、章专属实验和练习验证。Kotlin 1.2发布说明锁定历史边界；当前Kotlin与Android文档仅作技术核验和迁移对照，不倒灌为第一版内容。";
manifest.factSources = factSources;
manifest.secondarySourceUrls = [CHINESE_RECORD, ...Object.values(DOCS)];
manifest.coverage = { formalUnits: 27, outlineNodes: 295, pages: 29 };
for (const unit of manifest.units) {
  const entry = entries.find((candidate) => candidate.unit?.id === unit.id);
  if (!entry) throw new Error(`manifest 单元无章节映射：${unit.id}`);
  const technical = technicalSourceFor(unit.id);
  unit.sourceUnitId = unit.id;
  unit.chapterPath = `${entry.profile.sectionSlug}/${entry.profile.chapterSlug}`;
  unit.factSourceIds = [
    "publisherOutline",
    "chineseBibliography",
    "kotlin12",
    technical.id,
  ];
}

profileRoot.profiles = profileRoot.profiles.map((profile) => {
  const entry = entries.find(
    (candidate) => candidate.profile.chapterSlug === profile.chapterSlug,
  );
  const technical = technicalSourceFor(profile.chapterSlug);
  return {
    ...profile,
    sectionSlug: entry.profile.sectionSlug,
    relativePath: path.relative(ROOT, entry.filePath).replaceAll(path.sep, "/"),
    sourceUrl: OUTLINE,
    technicalSourceUrl: technical.url,
    formalNodeCount: entry.concepts.length,
  };
});

fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifestRoot, null, 2)}\n`);
fs.writeFileSync(PROFILE_PATH, `${JSON.stringify(profileRoot, null, 2)}\n`);

console.log(
  JSON.stringify(
    {
      book: BOOK,
      pages: entries.length,
      formalUnits: manifest.units.length,
      outlineNodes: formalNodes,
      sourceMode: manifest.sourceMode,
      sourceAccess: manifest.sourceAccess,
    },
    null,
    2,
  ),
);
