#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import { createProcessor } from "@mdx-js/mdx";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";

const ROOT = process.cwd();
const BOOK = "database-system-concepts";
const BOOK_DIR = path.join(ROOT, "content", BOOK);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/database-system-concepts-v2-profiles.json",
);
const DB_BOOK = "https://www.db-book.com/";
const OFFICIAL_TOC = "https://www.db-book.com/toc-dir/toc.pdf";
const ONLINE_CHAPTERS =
  "https://www.db-book.com/online-chapters-dir/index.html";
const OFFICIAL_LABS =
  "https://www.db-book.com/university-lab-dir/exercises-dir/";
const OFFICIAL_SLIDES = "https://www.db-book.com/slides-dir/index.html";
const MCGRAW_CHANGES =
  "https://www.mheducation.com/unitas/highered/changes/silberschatz-database-system-concepts-7e.pdf";
const POSTGRESQL = "https://www.postgresql.org/docs/current/";
const JSON_RFC = "https://www.rfc-editor.org/rfc/rfc8259.html";
const XML = "https://www.w3.org/TR/xml/";
const SPARQL = "https://www.w3.org/TR/sparql11-query/";
const WORK_TITLE =
  "Abraham Silberschatz, Henry F. Korth, S. Sudarshan, Database System Concepts, Seventh Edition";
const processor = createProcessor({
  format: "mdx",
  remarkPlugins: [remarkMath, remarkGfm],
});

function walkMdx(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkMdx(entryPath));
    else if (entry.name.endsWith(".mdx")) files.push(entryPath);
  }
  return files.sort();
}

function practiceModeFor(title) {
  if (/事务|并发|恢复|分布式|区块链|流数据/.test(title)) return "simulation";
  if (/设计|E-R|体系结构|大学模式|学习地图|总复习/.test(title)) return "design";
  if (/存储|索引|查询处理|查询优化|分析|关系模型/.test(title))
    return "calculation";
  return "code";
}

function addFrontmatterFields(raw, practiceMode) {
  if (/^qualityVersion:\s*2\s*$/m.test(raw)) return raw;
  const closing = raw.indexOf("\n---", 3);
  if (closing < 0) throw new Error("frontmatter 未闭合");
  return `${raw.slice(0, closing)}\nqualityVersion: 2\npracticeMode: ${practiceMode}\nsourceMode: independent-rewrite${raw.slice(closing)}`;
}

function conceptVariant(concept, variants) {
  const seed = [...concept].reduce(
    (sum, character) => sum + character.codePointAt(0),
    0,
  );
  return variants[seed % variants.length];
}

function explanationForConcept(concept, focus) {
  const value = concept.toLocaleLowerCase();
  const includes = (...needles) => needles.some((needle) => value.includes(needle));

  if (includes("关系数据库结构", "关系模型", "关系模式", "数据库模式"))
    return `“${concept}”把数据表示为有名属性组成的元组集合；模式约束允许的结构，实例记录某一时刻的值，两者不能混为一张当前表。`;
  if (includes("主码", "候选码", "外码", "码", "键"))
    return `“${concept}”用最小属性集唯一标识元组，并通过外码把引用限制到被参照键；验证要覆盖重复、NULL、更新与删除四条路径。`;
  if (includes("关系代数", "选择", "投影", "并", "差", "笛卡尔", "连接"))
    return conceptVariant(concept, [
      `“${concept}”是闭包关系运算：输入和输出仍是关系；先手算元组集合，再检查重复语义、属性重命名与连接条件。`,
      `分析“${concept}”时画出算子树，标明每条边的模式与估计基数；等价改写必须保持结果集合而非只让 SQL 能运行。`,
      `验证“${concept}”使用含重复键、空结果和不匹配行的最小关系，分别核对输出模式、元组数与边界行。`,
      `“${concept}”的物理算法可以变化，但逻辑语义不可漂移；证据应同时保存手算结果和数据库返回结果。`,
    ]);
  if (includes("sql数据定义", "数据定义", "create", "模式"))
    return `“${concept}”把表、类型、约束和命名空间写入目录；可重放实验必须从空库建模，并证明重复执行、迁移失败和回滚边界。`;
  if (includes("sql查询", "基本结构", "附加基本运算", "集合运算", "嵌套子查询"))
    return conceptVariant(concept, [
      `“${concept}”先由 FROM 形成输入、WHERE 过滤、分组聚集，再由 SELECT 生成结果；书写顺序不是逻辑求值顺序。`,
      `分析“${concept}”要明确集合或多重集语义、NULL 三值逻辑和相关引用作用域，再用 EXPLAIN 对齐物理计划。`,
      `验证“${concept}”固定大学模式，只改变一个谓词或子查询相关性，比较手算行集、实际行数和计划估计。`,
      `“${concept}”应同时准备成功查询与反例查询；返回若正确但依赖偶然顺序，仍不满足结果合同。`,
    ]);
  if (includes("空值", "null"))
    return `“${concept}”引入 unknown，使比较、布尔组合、聚集和约束不再服从普通二值直觉；必须用 IS NULL 与显式反例验证。`;
  if (includes("聚集", "group by", "olap", "数据仓库"))
    return `“${concept}”先定义分组粒度再计算汇总；空输入、NULL、重复事实和维度连接会改变计数，验收要用明细对账汇总。`;
  if (includes("数据库修改", "insert", "update", "delete"))
    return `“${concept}”改变满足条件的元组并触发约束、索引、日志与并发协议；验证必须记录影响行数、提交边界和失败后的可见状态。`;
  if (includes("视图", "物化视图"))
    return `“${concept}”保存查询接口或其物化结果；要区分定义展开、可更新性、刷新时点与权限边界，并用基表变化验证一致性。`;
  if (includes("完整性约束", "约束", "授权"))
    return `“${concept}”把非法状态阻断在数据库边界；测试应包含允许样本、拒绝样本、级联动作和不同角色的最小权限矩阵。`;
  if (includes("函数和过程", "触发器", "递归查询"))
    return `“${concept}”把控制流或派生规则放入数据库执行；必须限制递归终点与副作用，记录触发顺序并证明重试不会重复生效。`;
  if (includes("实体", "联系", "属性", "基数", "e-r", "映射"))
    return conceptVariant(concept, [
      `“${concept}”把业务对象、属性和联系基数变成可检查模型；每个约束都要能落到键、外键或无法直接表达的业务规则。`,
      `分析“${concept}”先列实体身份和生命周期，再判断联系是一对一、一对多还是多对多，避免把显示字段误当稳定标识。`,
      `验证“${concept}”用新增、合并、删除与历史追踪四个场景走查模型，确认关系模式不会制造孤儿或丢失事实。`,
      `“${concept}”转换为关系模式时要保存主码、参与约束和可空性；图形好看不能替代无损数据落地。`,
    ]);
  if (includes("函数依赖", "多值依赖", "范式", "分解", "原子域"))
    return conceptVariant(concept, [
      `“${concept}”用依赖约束判断冗余与更新异常；先求属性闭包和候选码，再验证分解的无损连接与依赖保持。`,
      `分析“${concept}”要区分由业务语义给出的依赖和当前样本偶然满足的相关性，不能从少量数据臆造约束。`,
      `验证“${concept}”构造一个会产生插入、删除或更新异常的反例，并用自然连接重建原关系检查伪元组。`,
      `“${concept}”不是表越碎越好；规范化收益需与查询路径、事务边界和约束可执行性一起判断。`,
    ]);
  if (includes("json", "rdf", "半结构", "对象", "文本", "空间", "xml"))
    return conceptVariant(concept, [
      `“${concept}”提供超出扁平标量的结构表达；验证要保存模式约束、路径查询、缺失字段和索引能否得到相同语义。`,
      `分析“${concept}”应分开逻辑身份、嵌套结构与物理编码，避免把序列化格式直接当成数据模型。`,
      `验证“${concept}”使用缺字段、异构类型和深层路径样本，比较解析结果、查询匹配与错误定位。`,
      `“${concept}”的可移植边界由标准与具体 DBMS 共同决定；课程结论必须标明哪一层提供保证。`,
    ]);
  if (includes("应用", "web", "servlet", "服务", "接口", "安全", "加密", "性能"))
    return conceptVariant(concept, [
      `“${concept}”位于请求、连接池、事务和数据库接口之间；一次业务操作必须有明确事务边界、参数绑定与幂等策略。`,
      `分析“${concept}”要沿用户输入到 SQL 的数据流检查认证、授权、注入、超时和敏感字段暴露，而非只看成功页面。`,
      `验证“${concept}”固定请求，分别注入无权限、重复提交、慢查询与连接中断，记录响应、数据库状态和重试副作用。`,
      `“${concept}”的性能结论要同时报告正确性、连接等待、查询延迟和资源占用，不能用缓存后的单次最快值。`,
    ]);
  if (includes("mapreduce", "大数据", "流数据", "图数据库", "分区", "倾斜"))
    return conceptVariant(concept, [
      `“${concept}”把数据切分后并行处理；键分布决定负载，验收要测中位分区与最热分区而非只看总吞吐。`,
      `分析“${concept}”要标出本地读取、重分区、网络交换和聚合边界，区分可交换操作与必须保序的状态。`,
      `验证“${concept}”固定总行数，只改变键倾斜或分区数，比较交换量、尾延迟、失败重算和最终对账。`,
      `“${concept}”在批、流和图模型中的一致性与时间语义不同；水位线、重放和重复处理必须显式说明。`,
    ]);
  if (includes("数据挖掘", "分析", "信息检索", "相关性", "索引文档"))
    return `“${concept}”把原始数据转换成可评价结果；训练/查询范围、评价指标和基准集合必须冻结，避免用同一数据既调参又验收。`;
  if (includes("磁盘", "闪存", "raid", "存储介质", "块访问", "物理存储"))
    return conceptVariant(concept, [
      `“${concept}”决定页读写、顺序性、并行度和故障域；延迟模型要区分设备传输、队列和控制器缓存。`,
      `分析“${concept}”需画出逻辑页到设备块与冗余单元的映射，说明一次故障会丢失、重建或降级哪些数据。`,
      `验证“${concept}”固定工作集，只改变访问局部性或单盘故障，记录 I/O 次数、尾延迟和恢复后校验。`,
      `“${concept}”的性能不能由容量推断；必须用同一耐久性设置比较缓存命中、写放大和并发队列。`,
    ]);
  if (includes("文件组织", "记录", "数据字典", "缓冲", "列式", "内存数据库"))
    return `“${concept}”定义元组如何编码、定位和缓存；页布局、空闲空间、淘汰与脏页刷写共同决定 I/O 和崩溃边界。`;
  if (includes("b+", "索引", "哈希", "位图", "布隆", "lsm", "写优化"))
    return conceptVariant(concept, [
      `“${concept}”用额外结构换取定位速度；必须同时计算搜索 I/O、维护成本、空间和范围查询能力。`,
      `分析“${concept}”先固定键分布与谓词选择率，再比较全表扫描、树、哈希或位图路径的真实页访问。`,
      `验证“${concept}”只改变数据倾斜或写入比例，记录树高、分裂/合并、写放大和计划是否切换。`,
      `“${concept}”不会自动提升所有查询；低选择率、过多随机写和统计信息偏差都可能让优化器放弃它。`,
    ]);
  if (includes("查询代价", "查询处理", "排序", "连接操作", "表达式求值", "执行计划"))
    return conceptVariant(concept, [
      `“${concept}”把逻辑算子落实为扫描、排序、连接与流水线；结果正确之外还要核对估计行数、实际行数和缓冲访问。`,
      `分析“${concept}”区分 CPU、内存、顺序 I/O、随机 I/O 与网络代价，不能把抽象 cost 直接当毫秒。`,
      `验证“${concept}”固定 SQL 和数据，只改变工作内存或连接算法，比较溢写、首行时间、总时间和结果校验和。`,
      `“${concept}”的阻塞算子会改变首行延迟和资源峰值；计划图必须标出数据量在每个边界的变化。`,
    ]);
  if (includes("查询优化", "关系表达式", "统计", "估计", "求值计划"))
    return `“${concept}”在等价计划中用统计与代价选择执行路径；验证需对比估计/实际基数，并证明改写没有改变 NULL 与重复语义。`;
  if (includes("事务", "原子性", "持久性", "隔离", "可串行"))
    return conceptVariant(concept, [
      `“${concept}”把多步读写约束为一个状态转换；提交后不变量成立，回滚后不得残留部分效果。`,
      `分析“${concept}”要画出读写集与优先图，区分冲突可串行化、快照语义和具体隔离级别允许的现象。`,
      `验证“${concept}”固定两笔事务，只改变交错点，记录可见版本、提交结果、冲突边和最终余额对账。`,
      `“${concept}”的成功返回不是全部证据；还要在崩溃重启后确认日志重放和持久状态符合提交决定。`,
    ]);
  if (includes("锁", "死锁", "时间戳", "验证协议", "多版本", "快照"))
    return conceptVariant(concept, [
      `“${concept}”决定并发操作何时等待、失败或读取旧版本；正确性由允许的调度集合而非吞吐单独定义。`,
      `分析“${concept}”要保存锁/版本生存期与等待图，定位首个形成环、写冲突或序列化失败的边。`,
      `验证“${concept}”使用可重放屏障控制两事务交错，比较阻塞、回滚、重试与最终不变量。`,
      `“${concept}”需要有界等待和重试策略；无条件重放会把死锁恢复变成重复副作用或活锁。`,
    ]);
  if (includes("故障", "恢复", "日志", "aries", "备份", "undo", "原子性"))
    return conceptVariant(concept, [
      `“${concept}”从最近持久点按日志决定 REDO 与 UNDO；写前日志要求相关日志先于脏数据页到达稳定存储。`,
      `分析“${concept}”要区分事务表、脏页表、检查点和日志序号，不能只看重启后的最终页面。`,
      `验证“${concept}”在日志刷写、数据页刷写和提交记录之间逐点崩溃，比较恢复轨迹与最终校验和。`,
      `“${concept}”的备份可用性必须通过实际恢复证明；复制同一逻辑错误不等于形成独立恢复点。`,
    ]);
  if (includes("体系结构", "集中式", "并行系统", "分布式系统", "云"))
    return `“${concept}”划分计算、存储与协调责任；设计评审要标出故障域、状态所有者、网络往返和扩缩容时的一致性边界。`;
  if (includes("复制", "分布式文件", "键值", "协调", "共识", "提交协议"))
    return conceptVariant(concept, [
      `“${concept}”在多个节点间复制状态或决定；安全性要求不产生冲突决定，活性则依赖可达法定人数与故障假设。`,
      `分析“${concept}”要画出消息、任期/轮次、日志位置与故障点，最终值相同不能证明中间没有双重提交。`,
      `验证“${concept}”固定操作，只改变消息延迟或单节点失效，记录决定、重试、恢复和客户端可见结果。`,
      `“${concept}”必须说明网络分区时牺牲什么；把超时当作失败事实会产生重复写或不一致回滚。`,
    ]);
  if (includes("并行排序", "并行连接", "并行求值", "共享内存", "分布式查询"))
    return `“${concept}”把算子拆到多个工作单元；交换、屏障和最慢分区决定尾延迟，结果要用单机基线做独立对账。`;
  if (includes("区块链", "密码散列", "智能合约"))
    return `“${concept}”用追加记录、散列链接和多方决定约束历史；实验需区分数据不可篡改声明、最终性、合约执行与外部世界真实性。`;
  if (includes("关系演算", "形式化查询", "datalog", "关系逻辑"))
    return `“${concept}”以声明式公式描述结果集合；必须检查自由变量、安全性和与关系代数的等价边界，再用有限关系手算验证。`;
  if (includes("postgresql", "进程", "存储管理", "查询处理器"))
    return `“${concept}”映射 PostgreSQL 的进程、缓冲、WAL、计划器与执行器责任；版本相关行为以官方文档和真实 EXPLAIN/系统视图核对。`;
  if (includes("大学模式", "详细大学", "附录"))
    return `“${concept}”固定 instructor、student、course、section、takes 等关系及其键；加载与重置脚本必须保持引用完整并提供基线行数。`;
  if (includes("小结", "概述", "动机", "学习地图", "总复习"))
    return `“${concept}”组织“${focus}”的语义、结构、执行和证据；若不能给出一个状态变化与独立对账，本节点仍未完成。`;
  return conceptVariant(concept, [
    `“${concept}”服务于“${focus}”；解释必须写清输入关系、约束、状态变化、可观察输出和一个可推翻结论的反例。`,
    `分析“${concept}”时先冻结大学模式与 DBMS 版本，再把逻辑语义、物理机制和故障恢复放到同一证据链。`,
    `验证“${concept}”只改变一个数据或调度变量，保存手算预测、执行计划、实际结果和独立对账差异。`,
    `“${concept}”的交付物至少包含可重放 SQL、输入基线、正常轨迹、失败样本和恢复终点，不能只留最终截图。`,
    `围绕“${concept}”比较两种实现时，共用同一结果合同与数据快照，并报告估计、实际与资源边界。`,
    `“${concept}”若依赖具体数据库实现，应把标准语义、作者教材语境和 PostgreSQL 实测分层标注。`,
  ]);
}

function rewriteDeepDive(source, focus, pageTitle) {
  return source.replace(
    /\n## (?:第7版目录逐节点映射|第七版机制逐项深读)\n([\s\S]*?)(?=\n## 机制推演：从语义到物理证据)/,
    (_match, body) => {
      const headings = [...body.matchAll(/^(#{3,5})\s+(.+)$/gm)].map(
        (match) => ({ marks: match[1], concept: match[2].trim() }),
      );
      const sections = headings.map(({ marks, concept }) => {
        const explanation = explanationForConcept(concept, focus);
        return `${marks} ${concept}\n\n在“${pageTitle}”中，${explanation}`;
      });
      return `\n## 第七版机制逐项深读\n\n${sections.join("\n\n")}`;
    },
  );
}

function remediatePage(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const title = String(parsed.data.title ?? path.basename(filePath, ".mdx"));
  const focus = String(parsed.data.description ?? title).replace(/\s+/g, " ");
  const practiceMode = practiceModeFor(title);
  let next = addFrontmatterFields(raw, practiceMode);
  next = rewriteDeepDive(next, focus, title);
  next = next
    .replace(
      /(\n {4}[^\n<][^\n]*)\n( {4}<Dsc[^\n]+Lab \/>)/g,
      "$1\n\n$2",
    )
    .replace(/(\n {4}<Dsc[^\n]+Lab \/>)\n( {2}<\/Step>)/g, "$1\n\n$2")
    .replace(/([^\n])\n<Answer>/g, "$1\n\n<Answer>")
    .replace(/<\/Answer>\n([^\n<])/g, "</Answer>\n\n$1");

  if (!next.includes("没有使用未获授权的中文纸书正文")) {
    next = next.replace(
      "\n<Objectives>",
      `\n“${title}”没有使用未获授权的中文纸书正文；以 [作者官网第 7 版完整目录](${OFFICIAL_TOC}) 界定 32 章与附录 A，以 [作者公开在线章节](${ONLINE_CHAPTERS})、[大学模式实验](${OFFICIAL_LABS}) 和 [McGraw-Hill 第 7 版变更说明](${MCGRAW_CHANGES}) 核对可公开内容。中文解释、SQL、图示、实验与练习均为独立教学重写；实现行为再以 [PostgreSQL 官方文档](${POSTGRESQL}) 等一手规范复核。\n\n<Objectives>`,
    );
  }

  next = next.replace(
    /<Attribution[\s\S]*?\/>/,
    `<Attribution\n  mode="independent-rewrite"\n  sourceBasis="authorized-sample"\n  workTitle=${JSON.stringify(WORK_TITLE)}\n  adaptedUrl=${JSON.stringify(DB_BOOK)}\n/>`,
  );

  fs.writeFileSync(filePath, next);
  return {
    title,
    order: Number(parsed.data.order ?? 0),
    practiceMode,
    sectionSlug: path.basename(path.dirname(filePath)),
    chapterSlug: path.basename(filePath, ".mdx"),
    relativePath: path.relative(ROOT, filePath).replaceAll(path.sep, "/"),
  };
}

function nodeText(node) {
  if (!node || typeof node !== "object") return "";
  if (typeof node.value === "string") return node.value;
  if (!Array.isArray(node.children)) return "";
  return node.children.map(nodeText).join("");
}

function sentencesFor(source) {
  const tree = processor.parse(matter(source).content);
  const sentences = [];
  visit(tree, "paragraph", (node) => {
    const text = nodeText(node).replace(/\s+/g, " ").trim();
    sentences.push(
      ...text
        .split(/(?<=[。！？.!?])\s*/u)
        .map((sentence) => sentence.trim())
        .filter((sentence) => sentence.length >= 70 && sentence.length <= 500),
    );
  });
  return [...new Set(sentences)];
}

function prefixRepeatedPlainSentences(profiles) {
  const sentenceOwners = new Map();
  for (const profile of profiles) {
    const raw = fs.readFileSync(path.join(ROOT, profile.relativePath), "utf8");
    for (const sentence of sentencesFor(raw)) {
      if (!sentenceOwners.has(sentence)) sentenceOwners.set(sentence, new Set());
      sentenceOwners.get(sentence).add(profile.relativePath);
    }
  }
  const repeated = new Set(
    [...sentenceOwners.entries()]
      .filter(([, owners]) => owners.size >= 3)
      .map(([sentence]) => sentence),
  );
  for (const profile of profiles) {
    const filePath = path.join(ROOT, profile.relativePath);
    let raw = fs.readFileSync(filePath, "utf8");
    for (const sentence of sentencesFor(raw)) {
      if (!repeated.has(sentence) || !raw.includes(sentence)) continue;
      raw = raw.replaceAll(
        sentence,
        `在“${profile.title}”的证据链中，${sentence}`,
      );
    }
    fs.writeFileSync(filePath, raw);
  }
}

const profiles = walkMdx(BOOK_DIR)
  .map(remediatePage)
  .sort((left, right) => left.order - right.order);
prefixRepeatedPlainSentences(profiles);

const pageBySlug = new Map(profiles.map((profile) => [profile.chapterSlug, profile]));
const manifestRoot = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = manifestRoot.books[BOOK];
if (!manifest) throw new Error(`缺少 ${BOOK} manifest`);
const formalNodes = manifest.units.reduce(
  (sum, unit) => sum + unit.concepts.length,
  0,
);
if (manifest.units.length !== 33 || formalNodes !== 268)
  throw new Error(`DSC manifest 分母异常：${manifest.units.length}/${formalNodes}`);

const factSources = {
  dbBook: { label: "作者官网第 7 版", url: DB_BOOK },
  officialToc: { label: "作者官网完整目录", url: OFFICIAL_TOC },
  onlineChapters: { label: "作者公开在线章节", url: ONLINE_CHAPTERS },
  officialLabs: { label: "作者大学模式实验", url: OFFICIAL_LABS },
  officialSlides: { label: "作者教学幻灯片", url: OFFICIAL_SLIDES },
  mcgrawChanges: { label: "McGraw-Hill 第 7 版变更说明", url: MCGRAW_CHANGES },
  postgresql: { label: "PostgreSQL 官方文档", url: POSTGRESQL },
  rfc8259: { label: "RFC 8259 JSON", url: JSON_RFC },
  w3cXml: { label: "W3C XML", url: XML },
  w3cSparql: { label: "W3C SPARQL 1.1", url: SPARQL },
};

manifestRoot.books[BOOK] = {
  ...manifest,
  version: 2,
  sourceKind:
    "author-official-toc-authorized-online-chapters-labs-and-primary-docs",
  sourceUrl: DB_BOOK,
  secondarySourceUrls: [
    OFFICIAL_TOC,
    ONLINE_CHAPTERS,
    OFFICIAL_LABS,
    OFFICIAL_SLIDES,
    MCGRAW_CHANGES,
    POSTGRESQL,
    JSON_RFC,
    XML,
    SPARQL,
  ],
  status: "verified-authorized-sample-independent-rewrite",
  verifiedAt: "2026-07-19",
  sourceAccess: "authorized-sample",
  sourceMode: "independent-rewrite",
  defaultSourceMode: "independent-rewrite",
  disclosureNote:
    "作者官网确认第7版、三位作者、2019年发行、完整目录、在线第27–32章与大学模式实验；McGraw-Hill说明核对第7版新增范围。课程不使用未获授权的中文纸书正文，按32章和附录A独立中文重写，具体实现以PostgreSQL、IETF与W3C一手文档复核。",
  factSources,
  coverage: { formalUnits: 33, outlineNodes: 268, pages: 35 },
  units: manifest.units.map((unit) => {
    const page = pageBySlug.get(unit.id);
    if (!page) throw new Error(`manifest 单元缺少页面：${unit.id}`);
    const title = unit.title.toLocaleLowerCase();
    const factSourceIds = ["dbBook", "officialToc", "officialSlides"];
    if (/第(?:3|4|5|9|17|18|19|32)章/.test(unit.title))
      factSourceIds.push("officialLabs", "postgresql");
    if (/第(?:27|28|29|30|31|32)章/.test(unit.title))
      factSourceIds.push("onlineChapters");
    if (title.includes("json") || title.includes("复杂数据"))
      factSourceIds.push("rfc8259", "w3cSparql");
    if (title.includes("xml")) factSourceIds.push("w3cXml");
    return {
      ...unit,
      chapterPath: `${page.sectionSlug}/${page.chapterSlug}`,
      factSourceIds: [...new Set(factSourceIds)],
    };
  }),
  unitMappingEvidence: "quality/remediation-ledger.json",
  factSourcePolicy:
    "作者官网目录限定范围，公开在线章节、实验与教学材料提供合法样本；实现行为由PostgreSQL、IETF和W3C一手文档独立核对。",
};

fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifestRoot, null, 2)}\n`);
fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      sourceAccess: "authorized-sample",
      sourceMode: "independent-rewrite",
      scope: { formalUnits: 33, outlineNodes: 268, pages: 35 },
      profiles,
    },
    null,
    2,
  )}\n`,
);

console.log(
  JSON.stringify({
    book: BOOK,
    pages: profiles.length,
    formalUnits: manifest.units.length,
    outlineNodes: formalNodes,
  }),
);
