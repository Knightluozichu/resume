#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "dragon-book-compilers";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/dragon-book-compilers/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/dragon-book-compilers-v2-profiles.json",
);

const SOURCES = {
  pearson:
    "https://www.pearson.com/en-us/subject-catalog/p/compilers-principles-techniques-and-tools/P200000003472/9780133002140",
  pearsonToc: "https://www.pearson.de/media/muster/toc/toc_9781292037233.pdf",
  chineseCatalog:
    "https://www.tenlong.com.tw/products/9787111251217?list_name=rd",
  library:
    "https://opac.uibe.edu.cn/opac/book/072a939488f31ce107149cbd219f9386",
  authorResources: "http://dragonbook.stanford.edu/",
  flex: "https://westes.github.io/flex/manual/",
  bison: "https://www.gnu.org/software/bison/manual/",
  llvmLangRef: "https://llvm.org/docs/LangRef.html",
  llvmTutorial: "https://llvm.org/docs/tutorial/",
  llvmCodegen: "https://llvm.org/docs/CodeGenerator.html",
  llvmGc: "https://llvm.org/docs/GarbageCollection.html",
  llvmPasses: "https://llvm.org/docs/WritingAnLLVMNewPMPass.html",
  mlir: "https://mlir.llvm.org/docs/",
  polly: "https://polly.llvm.org/",
  gccSsa: "https://gcc.gnu.org/onlinedocs/gccint/Tree-SSA.html",
  souffle: "https://souffle-lang.github.io/",
};

const PATHS = {
  learningMap: "00-guide/dbc-official-learning-map",
  "dbc-unit-01": "01-foundations/dbc-01-introduction",
  "dbc-unit-02": "01-foundations/dbc-02-simple-syntax-directed-translator",
  "dbc-unit-03": "01-foundations/dbc-03-lexical-analysis",
  "dbc-unit-04": "02-syntax-semantics/dbc-04-syntax-analysis",
  "dbc-unit-05": "02-syntax-semantics/dbc-05-syntax-directed-translation",
  "dbc-unit-06": "02-syntax-semantics/dbc-06-intermediate-code-generation",
  "dbc-unit-07": "03-runtime-backend/dbc-07-runtime-environments",
  "dbc-unit-08": "03-runtime-backend/dbc-08-code-generation",
  "dbc-unit-09": "04-optimization/dbc-09-machine-independent-optimizations",
  "dbc-unit-10": "04-optimization/dbc-10-instruction-level-parallelism",
  "dbc-unit-11": "05-parallelism/dbc-11-parallelism-locality",
  "dbc-unit-12": "05-parallelism/dbc-12-interprocedural-analysis",
  "dbc-unit-13": "06-appendices/dbc-appendix-a-complete-front-end",
  "dbc-unit-14": "06-appendices/dbc-appendix-b-linear-independent-solutions",
  finalReview: "07-review/dbc-official-final-review",
};

const UNIT_SPECS = {
  "dbc-unit-01": {
    duty: "把语言处理器、编译阶段、符号表、趟、构造工具与语言作用域/状态/参数机制连接成流水线合同",
    question:
      "源程序的哪个信息在词法、语法、语义、IR、优化和代码生成阶段被保存或改变？",
    scenario: "让一个含作用域、别名和函数调用的小程序穿过编译器各阶段",
    invariant:
      "源位置、名字绑定、类型、控制/数据依赖与目标语义在阶段边界可追溯",
    fault: "符号表在离开嵌套作用域时未恢复外层绑定",
    artifact: "阶段接口表、符号表快照、IR谱系与源—目标映射",
    focus: "编译阶段、语言语义与接口",
    sources: [SOURCES.pearson, SOURCES.llvmTutorial],
  },
  "dbc-unit-02": {
    duty: "从文法、推导、语法树、属性、翻译方案、预测分析、词法、符号表到三地址码构造完整小翻译器",
    question: "一个词素怎样经过预测分析和语义动作变成可复算中间代码？",
    scenario: "为带表达式、声明和控制流的小语言构造一趟翻译器",
    invariant: "token流、预测选择、语法树、属性、符号表和三地址码顺序一致",
    fault: "语义动作移动到错误产生式位置，计算使用尚未就绪的属性",
    artifact: "token轨迹、预测栈、属性值、符号表与三地址码",
    focus: "小型前端、语法制导动作与IR",
    sources: [SOURCES.llvmTutorial, SOURCES.bison],
  },
  "dbc-unit-03": {
    duty: "从词法规约、正则表达式、NFA/DFA、子集构造、直接构造、最小化到Lex实现可验证扫描器",
    question: "最长匹配、规则优先级、预读和自动机状态怎样共同决定token？",
    scenario: "让同一输入串经过手写扫描器、NFA模拟和DFA扫描器",
    invariant: "字符位置、词素边界、规则顺序、接受状态、回退与token属性一致",
    fault: "提前接受较短规则，破坏最长匹配并吞错输入边界",
    artifact: "正则—NFA—DFA映射、状态轨迹、token流与冲突案例",
    focus: "词法边界、自动机与扫描状态",
    sources: [SOURCES.flex],
  },
  "dbc-unit-04": {
    duty: "比较CFG、文法改写、LL、LR/SLR/LALR、二义性解决、错误恢复与Yacc生成器",
    question:
      "同一输入在分析栈、项目集和动作表中为什么移进、归约、接受或报错？",
    scenario: "对一个含优先级、结合性和错误token的表达式文法重放LL与LR分析",
    invariant: "文法版本、FIRST/FOLLOW、项目闭包、分析表、栈和输入指针相互对应",
    fault: "合并LALR状态时丢失展望符，产生原文法不存在的归约",
    artifact: "文法变换、项目集、分析表、栈轨迹、冲突和恢复报告",
    focus: "文法、分析表、栈与错误恢复",
    sources: [SOURCES.bison],
  },
  "dbc-unit-05": {
    duty: "从继承/综合属性、依赖图、求值顺序、S/L属性、SDT和LL/LR实现验证语法制导翻译",
    question: "属性何时就绪，语义动作放在哪里才能避免循环依赖和副作用错序？",
    scenario: "为声明和表达式构建属性依赖图并选择可执行求值顺序",
    invariant: "依赖边、拓扑顺序、栈位置、属性角色和副作用时点一致",
    fault: "在依赖尚未计算时执行语义动作，结果偶然可用却不可重放",
    artifact: "属性依赖图、拓扑序、栈快照、语义动作与循环诊断",
    focus: "属性依赖、求值顺序与语义动作",
    sources: [SOURCES.bison],
  },
  "dbc-unit-06": {
    duty: "把DAG、三地址码、SSA、类型/声明、表达式、控制流、回填、switch和过程翻译成统一IR",
    question: "源级类型、值、地址和控制边怎样在IR中保持可验证语义？",
    scenario: "把含数组、短路布尔、循环、switch和调用的程序降到SSA式IR",
    invariant: "类型、定义—使用、基本块、控制边、phi输入、地址计算与源位置一致",
    fault: "回填列表连接到错误基本块，短路表达式执行了本应跳过的副作用",
    artifact: "AST/DAG、类型证明、CFG、SSA定义—使用链与回填日志",
    focus: "中间表示、类型与控制流",
    sources: [SOURCES.llvmLangRef, SOURCES.mlir],
  },
  "dbc-unit-07": {
    duty: "从存储组织、活动记录、非局部访问、堆管理与多类垃圾收集建立运行时对象图",
    question: "调用、返回、闭包、堆对象和收集器怎样共同维护可达性与生命周期？",
    scenario: "重放嵌套调用、逃逸对象和一次增量垃圾收集",
    invariant: "活动记录、静态/动态链、根集、对象图、写屏障和回收阶段一致",
    fault: "增量标记期间遗漏写屏障，使新引用对象被错误回收",
    artifact: "栈帧时间线、访问链、根集、对象图、屏障与暂停统计",
    focus: "运行时栈、堆、可达性与收集",
    sources: [SOURCES.llvmGc],
  },
  "dbc-unit-08": {
    duty: "从目标机、基本块、DAG、局部优化、寄存器分配、指令选择和动态规划生成目标代码",
    question: "IR操作怎样在寄存器、内存和目标指令之间满足语义与代价约束？",
    scenario: "为一个基本块执行指令选择、寄存器分配、溢出和窥孔优化",
    invariant:
      "定义—使用、活跃区间、寄存器类、调用约定、内存别名和代价模型一致",
    fault: "窥孔删除看似冗余的存储，却忽略别名指针随后读取该内存",
    artifact: "基本块DAG、活跃区间、干涉图、指令匹配与目标执行对照",
    focus: "指令选择、寄存器与目标语义",
    sources: [SOURCES.llvmCodegen],
  },
  "dbc-unit-09": {
    duty: "从数据流框架、半格、转移函数、常量传播、部分冗余、循环、区域和符号分析验证机器无关优化",
    question: "分析解为何收敛，变换在所有路径上如何证明保语义？",
    scenario: "在含分支、循环和不可达边的CFG上运行数据流分析与单一优化",
    invariant: "格、边界值、交汇、转移、工作表顺序、别名假设和验证用例明确",
    fault: "把不可执行路径上的常量合并为确定值并错误折叠分支",
    artifact: "格值迭代、收敛日志、前后CFG、语义对照与收益报告",
    focus: "数据流解、变换合法性与收益",
    sources: [SOURCES.gccSsa, SOURCES.llvmPasses],
  },
  "dbc-unit-10": {
    duty: "把处理器资源、数据/内存/控制依赖、列表调度、全局调度与软件流水线连接到时序约束",
    question: "一条指令为何能移动到该周期而不破坏依赖、异常和寄存器限制？",
    scenario: "在固定机器模型上调度基本块和循环迭代",
    invariant: "资源、延迟、数据/内存/控制依赖、寄存器压力和异常语义均满足",
    fault: "推测移动可能抛异常的指令越过守卫分支",
    artifact: "依赖图、周期表、资源占用、寄存器压力与异常反例",
    focus: "指令调度、依赖与资源",
    sources: [SOURCES.llvmCodegen],
  },
  "dbc-unit-11": {
    duty: "从迭代空间、仿射访问、复用、依赖、并行划分、同步、流水线和局部性优化推导循环变换",
    question: "循环坐标变换怎样同时保持依赖、并行性和缓存局部性？",
    scenario: "对矩阵计算循环嵌套执行交换、分块、并行化与向量化",
    invariant: "迭代域、访问关系、依赖方向、调度、同步与边界条件一致",
    fault: "交换循环后违反跨迭代写后读依赖，样例尺寸未触发错误",
    artifact: "迭代空间、依赖多面体、调度、缓存复用与等价性测试",
    focus: "仿射循环、依赖、并行与局部性",
    sources: [SOURCES.polly, SOURCES.mlir],
  },
  "dbc-unit-12": {
    duty: "比较调用图、上下文敏感性、Datalog、指针分析、BDD与安全漏洞检测的过程间分析",
    question: "调用上下文、堆抽象和指向关系怎样影响精度、成本与安全结论？",
    scenario: "在含虚调用、反射、别名和污点传播的小程序上运行过程间分析",
    invariant:
      "调用图、上下文键、抽象对象、流敏感性、规则、固定点和告警路径一致",
    fault: "忽略反射加载的目标后把不完整调用图当作无漏洞证明",
    artifact: "调用图、上下文摘要、Datalog事实/规则、固定点与告警证据",
    focus: "过程间上下文、指针关系与安全分析",
    sources: [SOURCES.souffle],
  },
  "dbc-unit-13": {
    duty: "把源语言、主程序、扫描器、符号表/类型、表达式/布尔/语句IR与分析器集成为完整前端",
    question: "各模块接口怎样从字符输入到类型正确IR保持同一源位置与错误恢复？",
    scenario: "构建并回归测试一个小语言完整前端",
    invariant: "token、AST、符号、类型、控制流、诊断位置和模块版本端到端一致",
    fault: "错误恢复跳过token后源位置没有同步，后续诊断和IR映射全部偏移",
    artifact: "模块接口、端到端轨迹、黄金IR、诊断快照与回归集",
    focus: "前端集成、接口与端到端诊断",
    sources: [SOURCES.authorResources, SOURCES.llvmTutorial],
  },
  "dbc-unit-14": {
    duty: "把寻找线性无关解的代数条件、候选生成、秩检验和数值边界转成可复算附录实验",
    question: "候选解在什么域与精度下线性无关，怎样证明而不是凭近似数值判断？",
    scenario: "对一组符号/数值候选向量逐步检验秩与独立性",
    invariant: "系数域、基、矩阵方向、容差、消元步骤和秩定义保持一致",
    fault: "使用任意浮点容差把近相关向量误判为线性无关",
    artifact: "候选矩阵、消元轨迹、秩证明、条件数与容差敏感性",
    focus: "线性独立、秩与数值边界",
    sources: [SOURCES.pearsonToc],
  },
};

const MAP_SPEC = {
  title: "《编译原理（第2版）》原版结构学习地图",
  duty: "沿12章、2附录和556个正式目录层级规划前端、IR、运行时、后端、优化、并行与过程间分析",
  question: "怎样按原版依赖从字符输入走到可验证目标代码和跨过程分析？",
  scenario: "为一个小语言编译器规划16页学习、实现与验收路线",
  invariant: "每个目录节点连接输入表示、状态变换、单故障、恢复和等价性验证",
  fault: "只讲词法与语法，遗漏运行时、后端、优化、并行、过程间分析和两个附录",
  artifact: "16页路线、556坐标覆盖矩阵与编译流水线依赖图",
  focus: "原版结构、先修依赖与编译证据",
  sources: [SOURCES.pearson, SOURCES.pearsonToc],
};

const REVIEW_SPEC = {
  title: "《编译原理（第2版）》全书证据总复习",
  duty: "把token、语法、属性、IR、运行时、目标代码、优化、调度、并行和过程间分析串成端到端编译器",
  question:
    "一次编译结果怎样从目标代码反查到源程序、每个中间状态、变换合法性与失败边界？",
  scenario: "复核一个覆盖前端、优化、后端和运行时的编译器交付包",
  invariant: "556个坐标、参考/故障/恢复轨迹与源—目标语义可以双向追溯",
  fault: "只凭编译成功或基准更快宣称编译器语义正确且优化有效",
  artifact: "全书覆盖矩阵、首差定位、差分执行、性能证据与发布裁决",
  focus: "全书语义链、变换与验证",
  sources: [SOURCES.pearson, SOURCES.llvmLangRef],
};

function conceptStrings(unit) {
  return unit.concepts.map((alternatives) => alternatives[0]);
}

function toPascal(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function stripCoordinate(value) {
  return value
    .replace(/^第\d+章\s*/, "")
    .replace(/^附录[A-Z]\s*/, "")
    .replace(/^(?:\d+(?:\.\d+)+|[A-Z]\.\d+)\s*/, "");
}

function mdxText(value) {
  return value
    .replace(/_/g, "\\_")
    .replace(/\{/g, "&#123;")
    .replace(/\}/g, "&#125;");
}

function proseCoordinate(value) {
  return value.replace(/\.(?=\d)/g, "·");
}

function alphaCode(index) {
  let value = index + 1;
  let output = "";
  while (value > 0) {
    value -= 1;
    output = String.fromCharCode(65 + (value % 26)) + output;
    value = Math.floor(value / 26);
  }
  return output;
}

function termFor(concept, index) {
  const short = stripCoordinate(concept)
    .split(/[；;：:——,，]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 30
    ? short
    : `编译原理坐标${index + 1}`;
}

function buildStages(title, specification) {
  return [
    {
      name: `${title} · 输入与表示`,
      input: specification.scenario,
      operation: `冻结${specification.focus}所需的源程序、文法/IR/机器版本、shape和符号角色`,
      output: `${title}的输入合同、版本表与基线快照`,
      check: `${title}的源位置、名字、类型、控制/数据依赖和可见性没有越界`,
    },
    {
      name: `${title} · 状态变换`,
      input: `${title}的冻结输入与表示`,
      operation: `执行${specification.duty}的最小算法并保存每一步状态`,
      output: `${title}的参考轨迹、故障轨迹与首个状态分岔`,
      check: `${title}每一步可由同一输入、规则、版本和顺序复算`,
    },
    {
      name: `${title} · 输出与代价`,
      input: `${title}的中间状态、候选变换与代价模型`,
      operation: "比较变换前后IR/目标状态、诊断、资源或分析精度",
      output: `${title}的前后差、语义映射、代价和恢复路径`,
      check: `${title}没有把编译成功、分析收敛或单一基准加速当作完整正确性`,
    },
    {
      name: `${title} · 独立验证`,
      input: `${title}的冻结候选与差分用例、解释器或独立不变量检查`,
      operation: "重放预测、单故障、恢复和不适用边界",
      output: `${title}的接受、回退或拒绝理由`,
      check: `${title}满足“${specification.invariant}”`,
    },
  ];
}

function enrichProfile(key, specification, role, allCoordinates, unit = null) {
  const target = PATHS[key];
  if (!target) throw new Error(`缺少页面路径：${key}`);
  const [, chapterSlug] = target.split("/");
  const title = specification.title ?? unit?.title;
  if (!title) throw new Error(`缺少标题：${key}`);
  const concepts =
    role === "unit"
      ? conceptStrings(unit)
      : allCoordinates.filter(
          (value) => /^第\d+章/.test(value) || /^附录[A-Z]/.test(value),
        );
  const stages = buildStages(title, specification);
  return {
    id: key,
    role,
    officialUnitId: role === "unit" ? unit.id : null,
    target,
    chapterSlug,
    componentBase: toPascal(chapterSlug),
    title,
    concepts,
    stages,
    ...specification,
    cases: [
      {
        name: `${title} · 基线`,
        setup: `固定${specification.scenario}的源程序、规则、版本、预算和顺序`,
        prediction: `${title}的参考轨迹应持续满足“${specification.invariant}”`,
        boundary: `${title}只回答本页正式坐标与已运行编译合同内的问题`,
      },
      {
        name: `${title} · 单故障`,
        setup: `保持其余条件不变，只注入“${specification.fault}”`,
        prediction: `${title}应出现可定位的首个状态分岔，而不是只在末端输出异常`,
        boundary: `${title}的故障结论不能外推到未运行的语言特性、目标机或程序`,
      },
      {
        name: `${title} · 恢复`,
        setup: `撤销故障并从同一快照重放${specification.scenario}`,
        prediction: `${title}的状态、独立验证和交付证据应恢复基线`,
        boundary: `${title}若不能复现恢复结果，就不能把异常归因给单一故障`,
      },
    ],
    referenceTrace: stages.map(
      (stage, index) =>
        `${title}参考步骤${index + 1}：${stage.operation}；保存${stage.output}。`,
    ),
    faultTrace: stages.map((stage, index) =>
      index === 1
        ? `${title}故障步骤${index + 1}：只注入“${specification.fault}”，记录首个偏离“${stage.check}”的状态。`
        : `${title}故障步骤${index + 1}：保持${stage.input}不变，检查${stage.output}如何受单一故障传播。`,
    ),
    gates: [
      {
        label: "原版结构与译本边界",
        detail: `${title}区分Pearson英文第二版、机械工业出版社中文译本目录、现代工具文档与本站独立重写。`,
      },
      {
        label: "输入、表示与状态合同",
        detail: `${title}的源程序、文法/IR/机器版本、名字、类型、控制/数据依赖和中间状态可复算。`,
      },
      {
        label: "变换、代价与恢复合同",
        detail: `${title}的规则、工作表/栈/图状态、变换前后表示、诊断、代价和恢复路径已归档。`,
      },
      {
        label: "语义等价与适用边界",
        detail: `${title}以差分执行或独立不变量复核“${specification.invariant}”，并报告“${specification.fault}”的恢复结果。`,
      },
    ],
  };
}

function mechanismFor(concept, profile) {
  const title = stripCoordinate(concept);
  const rules = [
    [
      /语言处理|编译器|词法分析|语法分析|语义分析|中间代码|优化|代码生成|符号表|程序设计语言|作用域|参数|别名/,
      "声明阶段接口、名字/类型/状态角色和源—目标语义映射",
      "阶段快照、符号表、类型、IR谱系、诊断和源位置",
      "阶段边界丢失绑定、类型、控制依赖或源位置",
    ],
    [
      /文法|推导|语法树|二义性|结合性|优先级|预测|左递归|翻译器|抽象语法|具体语法/,
      "让产生式、推导、分析选择、语义动作和树/IR状态逐步对应",
      "文法版本、分析栈、输入指针、树、属性和动作日志",
      "分析选择或语义动作时点与文法依赖不一致",
    ],
    [
      /词法|词素|词法单元|缓冲|正则|自动机|NFA|DFA|Lex|状态转换|nullable|firstpos|lastpos|followpos/,
      "把字符位置、正则规则、自动机状态、最长匹配和token属性连接起来",
      "正则—NFA—DFA映射、状态轨迹、接受/回退与token流",
      "规则优先级、最长匹配、预读或输入边界错误",
    ],
    [
      /上下文无关|FIRST|FOLLOW|LL|LR|SLR|LALR|移进|归约|项目|分析表|Yacc|错误恢复|句柄/,
      "构造项目集与分析表并重放栈、输入和错误恢复决定",
      "FIRST/FOLLOW、项目闭包、动作/转移表、栈轨迹与冲突",
      "展望符、状态合并或恢复动作让分析器接受错误串或拒绝合法串",
    ],
    [
      /属性|SDD|SDT|依赖图|求值顺序|语法制导|综合|继承/,
      "沿依赖图安排属性求值、语义动作和栈位置",
      "属性依赖图、拓扑序、栈快照、值与副作用日志",
      "属性未就绪、循环依赖或副作用错序",
    ],
    [
      /DAG|三地址|四元式|三元式|静态单赋值|SSA|类型|声明|表达式|控制流|回填|switch|过程/,
      "把源级值、地址、类型、控制边和定义—使用关系编码为IR",
      "AST/DAG、类型证明、CFG、SSA链、地址计算与回填列表",
      "类型、phi输入、控制边、地址或定义—使用关系错位",
    ],
    [
      /存储|活动|调用|非局部|访问链|display|堆|垃圾|回收|可达|引用计数|标记|复制/,
      "追踪栈帧、非局部绑定、根集、堆对象和收集阶段",
      "活动记录、访问链、根集、对象图、写屏障与暂停统计",
      "生命周期、根集或屏障错误导致悬垂引用、泄漏或误回收",
    ],
    [
      /目标语言|目标机|基本块|流图|窥孔|寄存器|指令|代码生成|Ershov|动态规划/,
      "在IR、寄存器、内存和目标指令间满足定义—使用、调用约定和代价",
      "基本块DAG、活跃区间、干涉图、指令匹配和差分执行",
      "别名、寄存器类、调用约定或目标副作用被忽略",
    ],
    [
      /数据流|半格|转移函数|到达定义|活跃变量|可用表达式|常量传播|冗余|循环|支配|区域|符号分析/,
      "求解数据流固定点并证明变换在所有控制流路径上保语义",
      "格值迭代、交汇/转移、收敛日志、前后CFG和等价性测试",
      "边界值、不可执行路径、别名或单调性假设错误",
    ],
    [
      /处理器|流水线|调度|依赖|并行|发射|推测|代码移动|拓扑排序|模变量/,
      "把资源、延迟、数据/内存/控制依赖和寄存器压力映射到周期表",
      "依赖图、周期表、资源占用、寄存器压力与异常反例",
      "非法移动跨越依赖、守卫、异常或资源限制",
    ],
    [
      /局部性|矩阵|迭代空间|仿射|复用|数组|同步|向量|SIMD|预取|划分|Farkas/,
      "以迭代域、访问关系和依赖约束证明循环变换、并行与局部性",
      "迭代空间、依赖关系、调度、缓存复用、同步与边界测试",
      "变换违反跨迭代依赖或只在样例尺寸上偶然正确",
    ],
    [
      /过程间|调用图|上下文|指针|Datalog|BDD|反射|SQL注入|缓冲区溢出|安全漏洞/,
      "求解调用、上下文、指向与污点关系并声明精度/成本边界",
      "调用图、上下文摘要、Datalog事实/规则、固定点与告警路径",
      "不完整调用目标或堆抽象被误当作无漏洞证明",
    ],
    [
      /前端|主程序|源语言|寻找线性无关|线性无关/,
      "集成模块接口或用明确系数域、秩与容差验证数学条件",
      "端到端轨迹、黄金IR、矩阵消元、秩证明与边界案例",
      "模块状态错位或任意数值容差导致错误结论",
    ],
  ];
  const rule = rules.find(([pattern]) => pattern.test(title));
  return rule
    ? rule.slice(1)
    : [
        `把“${title}”放进${profile.focus}的输入—状态—变换—验证链`,
        `${profile.title}的输入角色、中间状态、输出、反例与等价性证据`,
        `只复述“${title}”名称而没有可观察状态、单故障和恢复验证`,
      ];
}

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并区分Pearson英文第二版、中文译本、现代工具和本站重写
- 能先预测“${profile.question}”会改变哪一个输入、表示、栈/图状态、IR、目标代码或验证结果，再操作三类交互证据
- 能只注入“${profile.fault}”，定位首个偏离“${profile.invariant}”的状态，并从同一快照完成恢复

</Objectives>`;
}

function sourceSection(profile) {
  const sources = profile.sources
    .map((url, index) => `[本页独立核对 ${index + 1}](${url})`)
    .join("、");
  return `## 原版书目、556个正式坐标与访问边界

“${profile.title}”以[Pearson官方书页](${SOURCES.pearson})核对Alfred V. Aho、Monica S. Lam、Ravi Sethi、Jeffrey D. Ullman著 *Compilers: Principles, Techniques, and Tools, Second Edition*：英文精装ISBN 9780321486813，2006年版；Pearson明确列出12章与两个附录，并说明第10章“指令级并行”、第11章“并行与局部性优化”、第12章“过程间分析”是第二版新增重点。[Pearson官方目录](${SOURCES.pearsonToc})继续核对版本与章/附录框架。

“${profile.title}”再以[中文版完整目录](${SOURCES.chineseCatalog})与[高校馆藏书目](${SOURCES.library})核对赵建华、郑滔、戴新宇译《编译原理（第2版）》，机械工业出版社，2009年，631页，ISBN 9787111251217。正式分母计入12个章标题、2个附录标题、533个数字编号节/小节和附录A的9个编号节，合计556个核心目录层级；章末总结、练习、参考文献和索引不重复计为知识节点。

原书与译本均受版权保护，“${profile.title}”不复制、翻译或改写原文、图表、算法伪码和练习，只把官方目录当作范围坐标；中文讲解、状态轨迹、反例、交互、练习与答案均为独立教学重写。${sources}只用于核对现代IR、工具或实验边界，不反向证明原书采用本站表述。`;
}

const patterns = [
  (p, c, m, e, x, i) =>
    `在“${p.title}”的第${i + 1}个正式坐标中，「${c}」通过${m}推进${p.focus}；复核者保存${e}，出现${x}就撤回结论。`,
  (p, c, m, e, x, i) =>
    `围绕“${p.question}”，“${p.title}”在坐标${i + 1}把「${c}」落实为${m}；只有${e}可重放且反例排除${x}，本节点才算掌握。`,
  (p, c, m, e, x, i) =>
    `“${p.title}”的目录节点${i + 1}「${c}」不能停在术语或伪码：它要${m}，交付${e}，并把${x}设为单一反事实。`,
  (p, c, m, e, x, i) =>
    `对“${p.title}”而言，「${c}」在第${i + 1}次检查中改变可观察状态，因为它负责${m}；${e}必须与“${p.invariant}”对齐，不能接受${x}。`,
];

function conceptsSection(profile) {
  return `## 原版目录层级与可验证机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept, profile);
    const term = termFor(concept, index);
    const safeConcept = mdxText(proseCoordinate(concept));
    const definition = `${term}对应正式目录坐标“${concept}”，在“${profile.title}”中用于${mechanism}，并受源程序、表示、规则、目标机、代价与验证边界约束。`;
    return `### ${safeConcept}

<Term def=${JSON.stringify(definition)}>${mdxText(term)}</Term>

**正式坐标 ${index + 1}/${profile.concepts.length}。** 原版目录键 \`${concept}\`。${patterns[index % patterns.length](profile, safeConcept, mechanism, evidence, caution, index)}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三个章专属实验

<Callout type="info" title="先写出哪个状态会最先变化">
  对“${profile.title}”先冻结${profile.scenario}的源程序、文法/IR/机器版本、规则、预算和验证口径，再操作三类实验；结果与预测不同就修改假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 输入、表示与翻译流水线">
    为“${profile.title}”选择正式目录坐标，在参考流水线与单一故障间切换，逐阶段核对输入、变换、输出和不变量。

    <${profile.componentBase}PipelineContractLab />
  </Step>
  <Step title="2. 状态、不变量与反事实轨迹">
    保持“${profile.title}”的${profile.scenario}不变，只注入“${profile.fault}”，逐步定位首个偏离“${profile.invariant}”的位置。

    <${profile.componentBase}StateTraceLab />
  </Step>
  <Step title="3. 等价性与交付验证门">
    在“${profile.title}”的基线、单故障和恢复案例间切换，展开结构、状态、变换和等价性门后再决定是否交付。

    <${profile.componentBase}VerificationGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页单一故障：${profile.fault}">
  “${profile.title}”遇到该故障时必须保持其余源程序、表示、规则、目标机、预算和执行顺序不变；编译成功或样例输出正确不能替代首个状态分岔与恢复证据。
</Callout>

<Callout type="trap" title="分析收敛或基准加速不等于语义正确">
  “${profile.title}”中的固定点、冲突消失、目标码变短或基准更快只回答各自合同；它们不能自动证明所有路径、别名、异常、语言特性和目标机上的语义等价。
</Callout>

<Callout type="trap" title="目录可访问不等于允许翻译或复制">
  “${profile.title}”可以用Pearson和中文版目录核对范围，但没有获得复制原文、图表、伪码或练习的授权；当前内容必须保持独立表达、工具核对与版本边界。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放协议

| 阶段 | 允许动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stages
  .map(
    (stage) =>
      `| ${stage.name} | ${stage.operation} | ${stage.output} | 未满足“${stage.check}” |`,
  )
  .join("\n")}

\`\`\`yaml
unit: ${JSON.stringify(profile.id)}
question: ${JSON.stringify(profile.question)}
scenario: ${JSON.stringify(profile.scenario)}
invariant: ${JSON.stringify(profile.invariant)}
fault: ${JSON.stringify(profile.fault)}
evidence: ${JSON.stringify(profile.artifact)}
reset: restore_concept_mode_stage_trace_step_case_gates_and_artifact
\`\`\`

“${profile.title}”要求从同一源程序、文法/IR/机器版本、规则、预算和执行顺序重放参考、故障与恢复路径。重置后若目录选择、模式、阶段、轨迹步骤、案例、证据门或交付包没有回到基线，本次比较已经混入状态泄漏。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept, profile);
      return `  <GlossaryItem term=${JSON.stringify(termFor(concept, index))}>检索键 dbc-${alphaCode(index)} 对应正式目录坐标「${mdxText(proseCoordinate(concept))}」；在“${profile.title}”中用于${mechanism}，需要连接原版范围、状态轨迹、等价性证据和不适用边界。</GlossaryItem>`;
    })
    .join("\n");
  const coverage = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept, profile);
      return `${index + 1}. “${profile.title}”的目录项「${mdxText(proseCoordinate(concept))}」：以“${mechanism}”解释作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是背术语、表格或伪码，而是围绕“${profile.question}”重建输入、表示、状态变换、输出、代价和独立验证，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}。

## 练习与答案

<Exercises>

1. **问题 1：编译合同。** “${profile.title}”为什么必须先冻结源程序、文法/IR/机器版本、规则、预算和验证口径？

<Answer>
  若同时改变这些条件，相同输出可能来自不同语法、表示、代价、目标机或验证路径；先冻结合同，才能把观测连接到单一机制并定位首差。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明“${profile.title}”的正式目录坐标已经进入机制、交互和练习？

<Answer>
${coverage}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一源程序、规则、表示、目标机、预算和执行顺序，重放参考路径后只注入该故障；记录首个偏离，撤销故障再运行。只有流水线合同、状态轨迹、等价性门和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="pearson-second-edition-official-toc-plus-chinese-edition-complete-toc"
  workTitle="Aho、Lam、Sethi、Ullman著《Compilers: Principles, Techniques, and Tools, Second Edition》"
  adaptedUrl="${SOURCES.pearson}"
/>`;
}

function wrapperSource(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    stages: profile.stages,
    cases: profile.cases,
    referenceTrace: profile.referenceTrace,
    faultTrace: profile.faultTrace,
    gates: profile.gates,
  };
  return `"use client";

import {
  CompilerEvidenceLab,
  type CompilerEvidenceModel,
} from "./compiler-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies CompilerEvidenceModel;

export function ${profile.componentBase}PipelineContractLab() {
  return <CompilerEvidenceLab model={model} view="pipeline-contract" />;
}

export function ${profile.componentBase}StateTraceLab() {
  return <CompilerEvidenceLab model={model} view="state-trace" />;
}

export function ${profile.componentBase}VerificationGateLab() {
  return <CompilerEvidenceLab model={model} view="verification-gate" />;
}
`;
}

async function writeFormatted(filePath, source, parser) {
  const output = await format(source, { parser });
  const current = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "";
  if (current !== output) fs.writeFileSync(filePath, output);
}

async function transformPage(profile) {
  const filePath = path.join(CONTENT_ROOT, `${profile.target}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${filePath}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const body = `import {
  Objectives,
  Term,
  Callout,
  Stepper,
  Step,
  Exercises,
  Answer,
  Glossary,
  GlossaryItem,
  Attribution,
} from "@/components/mdx/mdx-components";
import {
  ${profile.componentBase}PipelineContractLab,
  ${profile.componentBase}StateTraceLab,
  ${profile.componentBase}VerificationGateLab,
} from "@/components/mdx/${BOOK}/v2/${profile.chapterSlug}";

${objectivesBlock(profile)}

## 为什么从这个问题开始

“${profile.title}”围绕“${profile.question}”建立贯穿任务：${profile.scenario}。先写下哪个输入、表示、栈/图状态、IR、目标代码或验证结果会最先变化，再运行参考、故障和恢复路径；运行后补理由不算预测。只有守住“${profile.invariant}”并交付${profile.artifact}，编译成功、分析收敛、目标码长度或基准加速才构成机制证据。

${sourceSection(profile)}

${conceptsSection(profile)}

${experimentSection(profile)}

${protocolSection(profile)}

${synthesisSection(profile)}
`;
  const data = {
    ...parsed.data,
    title: profile.title,
    section: profile.title,
    description: `${profile.duty}；用编译流水线、状态轨迹和等价性验证门交付${profile.artifact}`,
    demo: true,
    math: true,
    sourceUrl: SOURCES.pearson,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
  };
  if (profile.officialUnitId) data.officialUnitId = profile.officialUnitId;
  else delete data.officialUnitId;
  await writeFormatted(
    filePath,
    matter.stringify(body.trimStart(), data),
    "mdx",
  );
  await writeFormatted(
    path.join(COMPONENT_ROOT, `${profile.chapterSlug}.tsx`),
    wrapperSource(profile),
    "typescript",
  );
}

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = manifestDocument.books[BOOK];
if (!manifest) throw new Error(`缺少 fidelity manifest：${BOOK}`);
for (const unit of manifest.units) {
  unit.chapterPath = PATHS[unit.id];
  if (!unit.chapterPath) throw new Error(`缺少单元页面映射：${unit.id}`);
}

const allCoordinates = manifest.units.flatMap(conceptStrings);
const chapterHeadings = allCoordinates.filter((item) =>
  /^第\d+章/.test(item),
).length;
const appendixHeadings = allCoordinates.filter((item) =>
  /^附录[A-Z]/.test(item),
).length;
const numberedNodes = allCoordinates.filter((item) =>
  /^\d+(?:\.\d+)+\s/.test(item),
).length;
const appendixNumberedNodes = allCoordinates.filter((item) =>
  /^[A-Z]\.\d+\s/.test(item),
).length;
const formalNodes = allCoordinates.length;
if (
  chapterHeadings !== 12 ||
  appendixHeadings !== 2 ||
  numberedNodes !== 533 ||
  appendixNumberedNodes !== 9 ||
  formalNodes !== 556
)
  throw new Error(
    `目录层级计数异常：章${chapterHeadings}、附录${appendixHeadings}、数字节/小节${numberedNodes}、附录节${appendixNumberedNodes}、总计${formalNodes}`,
  );

const profiles = [
  enrichProfile("learningMap", MAP_SPEC, "learning-map", allCoordinates),
  ...manifest.units.map((unit) => {
    const specification = UNIT_SPECS[unit.id];
    if (!specification) throw new Error(`缺少单元画像：${unit.id}`);
    return enrichProfile(unit.id, specification, "unit", allCoordinates, unit);
  }),
  enrichProfile("finalReview", REVIEW_SPEC, "final-review", allCoordinates),
];
if (profiles.length !== 16)
  throw new Error(`页面数量异常：应为16，实际${profiles.length}`);

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

manifest.status = "verified-outline-independent-rewrite";
manifest.verifiedAt = "2026-07-30";
manifest.edition =
  "Alfred V. Aho、Monica S. Lam、Ravi Sethi、Jeffrey D. Ullman著，赵建华、郑滔、戴新宇译《编译原理（第2版）》，机械工业出版社，2009年，631页，ISBN 9787111251217；英文原版Pearson 2006，ISBN 9780321486813";
manifest.sourceUrl = SOURCES.pearson;
manifest.sourceKind =
  "pearson-official-second-edition-twelve-chapter-two-appendix-toc-plus-complete-chinese-edition-five-hundred-fifty-six-core-node-toc-and-library-metadata";
manifest.sourceAccess = "outline-only";
manifest.defaultSourceMode = "independent-rewrite";
manifest.secondarySourceUrls = [
  SOURCES.pearsonToc,
  SOURCES.chineseCatalog,
  SOURCES.library,
];
manifest.disclosureNote =
  "Pearson官方书页确认Aho、Lam、Sethi、Ullman英文第二版、2006年精装ISBN 9780321486813、12章和两个附录，并说明第10至12章为第二版新增重点；Pearson目录核对章/附录框架，中文版完整目录与高校馆藏核对赵建华、郑滔、戴新宇译本、机械工业出版社2009年、631页及ISBN 9787111251217。正式分母为12章标题、2附录标题、533个数字编号节/小节和附录A的9节，共556个核心层级；不重复计章末总结、练习、参考文献和索引。本站不复制或翻译原文、图表、伪码和习题，所有讲解、交互、反例、练习与答案均为独立重写。";
manifest.unitMappingEvidence =
  "14个manifest单元与12章、附录A、附录B页面一一映射；学习地图与总复习不冒充原版单元。";
manifest.factSourcePolicy =
  "原版与译本目录只限定范围；现代IR、编译工具和实现事实由LLVM、GNU、GCC、MLIR、Polly、Soufflé等官方资料独立核对并标版本，不倒填为2006年原书内容；无法核对时不得写成确定事实。";
manifest.metrics = {
  formalChapterHeadings: 12,
  formalAppendixHeadings: 2,
  formalNumberedSectionsAndSubsections: 533,
  formalAppendixSections: 9,
  formalConceptNodes: 556,
  officialUnits: 14,
  learningMapPages: 1,
  reviewPages: 1,
  totalLearningPages: 16,
  interactiveViews: 48,
  visualKinds: [
    "compiler-pipeline-contract",
    "compiler-state-trace",
    "compiler-verification-gate",
  ],
};
manifest.coverageMetrics = {
  targetFormalNodes: 556,
  coveredFormalNodes: 556,
  coveragePercent: 100,
};

const portableProfiles = profiles.map((profile) => ({
  id: profile.id,
  role: profile.role,
  officialUnitId: profile.officialUnitId,
  target: profile.target,
  title: profile.title,
  duty: profile.duty,
  question: profile.question,
  scenario: profile.scenario,
  invariant: profile.invariant,
  fault: profile.fault,
  artifact: profile.artifact,
  focus: profile.focus,
  concepts: profile.concepts,
  sources: profile.sources,
  sourceAccess: "outline-only",
  sourceMode: "independent-rewrite",
}));

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(portableProfiles, null, 2)}\n`,
  "json",
);
const manifestOutput = `${JSON.stringify(manifestDocument, null, 2)}\n`;
if (fs.readFileSync(MANIFEST_PATH, "utf8") !== manifestOutput)
  fs.writeFileSync(MANIFEST_PATH, manifestOutput);

console.log(
  `已重建16页，覆盖12章+2附录+533数字节/小节+9附录节=${formalNodes}个正式坐标，生成48个交互视图。`,
);
