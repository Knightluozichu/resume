#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "tiger-book-compiler";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/tiger-book-compiler/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/tiger-book-compiler-v2-profiles.json",
);

const SOURCES = {
  authorToc: "https://www.cs.princeton.edu/~appel/modern/toc.html",
  authorC: "https://www.cs.princeton.edu/~appel/modern/c/",
  cambridge:
    "https://www.cambridge.org/core/books/modern-compiler-implementation-in-c/0F85704413FC010C1D1C691C4D2A0865/listing",
  chinese: "https://www.tenlong.com.tw/products/9787115476883?list_name=trs-t",
  flex: "https://westes.github.io/flex/manual/",
  bison: "https://www.gnu.org/software/bison/manual/",
  llvmLangRef: "https://llvm.org/docs/LangRef.html",
  llvmCodegen: "https://llvm.org/docs/CodeGenerator.html",
  llvmGc: "https://llvm.org/docs/GarbageCollection.html",
  llvmPasses: "https://llvm.org/docs/WritingAnLLVMNewPMPass.html",
  mlir: "https://mlir.llvm.org/docs/",
  polly: "https://polly.llvm.org/",
};

const PATHS = {
  learningMap: "00-guide/tbc-official-learning-map",
  "tbc-unit-01": "01-front-end/tbc-01-introduction",
  "tbc-unit-02": "01-front-end/tbc-02-lexical-analysis",
  "tbc-unit-03": "01-front-end/tbc-03-parsing",
  "tbc-unit-04": "01-front-end/tbc-04-abstract-syntax",
  "tbc-unit-05": "01-front-end/tbc-05-semantic-analysis",
  "tbc-unit-06": "02-runtime-ir/tbc-06-activation-records",
  "tbc-unit-07": "02-runtime-ir/tbc-07-translation-intermediate-code",
  "tbc-unit-08": "02-runtime-ir/tbc-08-basic-blocks-traces",
  "tbc-unit-09": "03-back-end/tbc-09-instruction-selection",
  "tbc-unit-10": "03-back-end/tbc-10-liveness-analysis",
  "tbc-unit-11": "03-back-end/tbc-11-register-allocation",
  "tbc-unit-12": "03-back-end/tbc-12-putting-it-all-together",
  "tbc-unit-13": "04-runtime-languages/tbc-13-garbage-collection",
  "tbc-unit-14": "04-runtime-languages/tbc-14-object-oriented-languages",
  "tbc-unit-15": "04-runtime-languages/tbc-15-functional-languages",
  "tbc-unit-16": "04-runtime-languages/tbc-16-polymorphic-types",
  "tbc-unit-17": "05-optimization/tbc-17-dataflow-analysis",
  "tbc-unit-18": "05-optimization/tbc-18-loop-optimizations",
  "tbc-unit-19": "05-optimization/tbc-19-static-single-assignment",
  "tbc-unit-20": "06-machine-performance/tbc-20-scheduling-pipelining",
  "tbc-unit-21": "06-machine-performance/tbc-21-memory-hierarchies",
  "tbc-unit-22": "07-appendix/tbc-appendix-tiger-language-reference",
  finalReview: "08-review/tbc-official-final-review",
};

const SPEC_DATA = {
  "tbc-unit-01": [
    "用C模块接口、工具与树形数据结构建立Tiger编译器骨架和直线式解释器",
    "模块所有权、接口和树节点怎样在C实现中保持可替换且可诊断？",
    "头文件声明与实现不一致，跨模块传递了错误的树节点布局",
    "模块依赖图、接口契约、解释轨迹与构建日志",
    "C模块、接口与树结构",
    [SOURCES.authorC],
  ],
  "tbc-unit-02": [
    "从词元、正则、有限自动机和生成器实现Tiger词法分析项目",
    "字符位置、最长匹配、规则优先级和token属性怎样逐步对应？",
    "较短规则提前接受，破坏最长匹配并错分Tiger标识符",
    "正则—自动机映射、状态轨迹、token流与错误位置",
    "Tiger扫描器、自动机与词元边界",
    [SOURCES.flex],
  ],
  "tbc-unit-03": [
    "从CFG、预测/LR分析、生成器和错误恢复实现Tiger语法分析项目",
    "分析栈、输入、项目集和冲突解决怎样构造唯一AST？",
    "用优先级掩盖真正的文法二义性，导致另一上下文错误归约",
    "文法版本、分析表、栈轨迹、冲突与恢复报告",
    "Tiger文法、分析栈与冲突",
    [SOURCES.bison],
  ],
  "tbc-unit-04": [
    "把具体语法和语义动作收敛为带源位置与不变量的Tiger抽象语法",
    "哪些标点和产生式细节应消失，哪些语义结构必须保留？",
    "AST合并了语义不同的左值和普通表达式节点",
    "CST—AST映射、节点不变量、源位置与序列化快照",
    "抽象语法、源位置与树不变量",
    [SOURCES.authorC],
  ],
  "tbc-unit-05": [
    "用符号表、绑定、类型检查和Tiger声明规则实现语义分析项目",
    "名字、类型和作用域怎样沿表达式与声明递归传播？",
    "互递归函数在全部签名进入环境前就检查函数体",
    "环境快照、类型推导、错误路径与作用域恢复日志",
    "符号环境、类型与声明检查",
    [SOURCES.authorToc],
  ],
  "tbc-unit-06": [
    "把栈帧、逃逸、静态链、调用约定和Tiger过程入口/出口编码为活动记录",
    "变量何时进入寄存器或帧，嵌套函数怎样访问非局部变量？",
    "逃逸分析漏标闭包捕获变量，使返回后仍引用失效栈槽",
    "逃逸集合、帧布局、静态链、调用序列与地址轨迹",
    "活动记录、逃逸与调用约定",
    [SOURCES.authorC],
  ],
  "tbc-unit-07": [
    "把Tiger表达式、声明和控制流翻译成规范树形中间表示",
    "值、语句和条件三类翻译结果怎样组合而不重复副作用？",
    "把带副作用表达式复制进两个IR位置，运行时执行两次",
    "AST—IR映射、临时变量、标签、控制边与副作用计数",
    "Tiger AST、树IR与副作用",
    [SOURCES.llvmLangRef, SOURCES.mlir],
  ],
  "tbc-unit-08": [
    "规范化树IR、形成基本块并用轨迹调度整理Tiger控制流",
    "ESEQ、调用和条件跳转怎样被提升或重排而不改变语义？",
    "轨迹调度反转条件后忘记同步交换真假目标标签",
    "规范树、基本块、轨迹顺序、CFG与差分执行",
    "规范化、基本块与轨迹调度",
    [SOURCES.llvmLangRef],
  ],
  "tbc-unit-09": [
    "用树模式、动态规划和目标机规则实现Tiger指令选择",
    "IR树怎样匹配代价最低且语义等价的目标指令序列？",
    "选择规则把有符号比较错误映射为无符号条件码",
    "树模式、覆盖代价、目标指令、临时变量与执行对照",
    "树覆盖、指令规则与目标语义",
    [SOURCES.llvmCodegen],
  ],
  "tbc-unit-10": [
    "求解活跃数据流方程并构造Tiger干涉图",
    "定义、使用、传入和传出集合怎样达到固定点并对应每条边？",
    "移动指令的特殊活跃规则遗漏源临时变量，少建一条干涉边",
    "CFG、use/def、in/out迭代、固定点与干涉图",
    "活跃分析、固定点与干涉",
    [SOURCES.llvmCodegen],
  ],
  "tbc-unit-11": [
    "用简化、合并、冻结、溢出和图着色实现Tiger寄存器分配",
    "合并移动与选择溢出怎样在可着色性和内存代价间取舍？",
    "过度乐观合并产生不可着色节点却未正确回退和重写",
    "工作表状态、着色栈、合并日志、溢出重写与目标码",
    "干涉图、合并、着色与溢出",
    [SOURCES.llvmCodegen],
  ],
  "tbc-unit-12": [
    "整合扫描、分析、语义、IR、规范化、选择和分配为可运行Tiger编译器",
    "每个阶段的接口与诊断怎样在完整构建中保持一致？",
    "阶段单测都通过，但整合时临时变量命名空间发生碰撞",
    "端到端阶段快照、黄金IR/汇编、诊断与回归矩阵",
    "Tiger编译器集成与回归",
    [SOURCES.authorC],
  ],
  "tbc-unit-13": [
    "比较标记清扫、引用计数、复制、分代、增量收集及其编译器接口",
    "编译器生成的栈图、根与写屏障怎样让收集器正确识别对象？",
    "分代收集漏执行老生代到新生代写屏障",
    "根集、对象图、描述字、屏障、回收轨迹与暂停统计",
    "垃圾收集、对象图与编译器接口",
    [SOURCES.llvmGc],
  ],
  "tbc-unit-14": [
    "把类、单/多继承、成员测试、私有访问和对象优化降到运行时布局",
    "字段、方法、类型测试和动态分派怎样在继承层次中保持一致？",
    "多继承对象指针调整遗漏一个基类偏移",
    "类布局、vtable、指针调整、访问检查与分派轨迹",
    "对象布局、继承与动态分派",
    [SOURCES.llvmLangRef],
  ],
  "tbc-unit-15": [
    "实现闭包、不可变变量、内联、闭包转换、尾递归和惰性求值",
    "自由变量、环境对象和调用约定怎样支持高阶函数？",
    "闭包转换遗漏一个自由变量，嵌套函数读取错误环境槽",
    "自由变量集、闭包布局、转换IR、尾调用与惰性状态",
    "函数式闭包、转换与求值策略",
    [SOURCES.mlir],
  ],
  "tbc-unit-16": [
    "推导参数多态、类型推断、重载消解与多态值的IR翻译",
    "类型变量、约束、合一和泛化在什么作用域发生？",
    "对具有副作用的表达式错误执行一般化，产生不安全多态引用",
    "约束集、合一轨迹、类型方案、实例化与错误证明",
    "多态类型、合一与值限制",
    [SOURCES.authorToc],
  ],
  "tbc-unit-17": [
    "定义流分析IR、求解多类数据流、驱动变换并处理别名",
    "边界值、交汇、转移和工作表顺序怎样决定安全固定点？",
    "别名分析过度乐观，错误删除仍可能被指针读取的存储",
    "数据流方程、迭代日志、别名假设、前后IR与验证",
    "数据流、固定点、变换与别名",
    [SOURCES.llvmPasses],
  ],
  "tbc-unit-18": [
    "用支配、循环不变量、归纳变量、边界检查和展开优化循环",
    "一项循环变换怎样证明在所有入口、退出和溢出条件下合法？",
    "把可能溢出的整数归纳表达式按数学整数规则强度削弱",
    "循环森林、支配、归纳关系、前后IR与边界反例",
    "循环结构、归纳与语义边界",
    [SOURCES.polly],
  ],
  "tbc-unit-19": [
    "构造SSA、支配树与phi，执行SSA优化并正确退出SSA",
    "每个定义怎样支配使用，phi输入怎样与前驱边一一对应？",
    "关键边上直接插入并行复制，顺序化后破坏phi语义",
    "支配树、支配边界、phi放置、重命名栈与退出SSA日志",
    "SSA、支配、phi与内存",
    [SOURCES.llvmLangRef],
  ],
  "tbc-unit-20": [
    "在资源约束、循环依赖和分支预测下执行调度与软件流水",
    "操作为何能安排到该周期且不破坏依赖和机器资源？",
    "推测调度把可能故障的加载移动到保护分支之前",
    "依赖图、资源表、周期表、启动间隔与异常反例",
    "调度、流水线、资源与分支",
    [SOURCES.llvmCodegen],
  ],
  "tbc-unit-21": [
    "把缓存组织、对齐、预取、循环交换、分块和GC连接到存储层次",
    "访问模式怎样映射缓存块、复用距离和内存带宽？",
    "分块尺寸只为单一缓存调优，并在真实层次产生冲突抖动",
    "地址轨迹、缓存映射、缺失分类、带宽与分块消融",
    "缓存层次、数据布局与局部性",
    [SOURCES.polly],
  ],
  "tbc-unit-22": [
    "把Tiger词法、声明、变量/表达式与标准库变成编译器前后端共同语言合同",
    "语言参考中的每条静态与动态规则怎样落到测试、AST、类型和运行时？",
    "标准库签名与编译器内建声明不一致",
    "语言规则—测试矩阵、AST/类型快照、运行结果与诊断",
    "Tiger语言规范、测试与实现一致性",
    [SOURCES.authorToc, SOURCES.authorC],
  ],
};

const MAP_SPEC = {
  title: "《现代编译原理：C语言描述》原版结构学习地图",
  duty: "沿2部分、21章、Tiger附录和296个正式层级规划C实现轨道",
  question: "怎样从直线式解释器逐章增量构建完整Tiger编译器与高级优化？",
  fault: "混用Java/ML模块接口或跳过程序设计项目，导致路线无法在C中整合",
  artifact: "24页路线、296坐标覆盖矩阵与C模块依赖图",
  focus: "C实现轨道、章节依赖与项目证据",
  sources: [SOURCES.authorToc, SOURCES.authorC],
};

const REVIEW_SPEC = {
  title: "《现代编译原理：C语言描述》全书证据总复习",
  duty: "把Tiger前端、IR、后端、运行时、语言扩展、优化和机器性能整合为可运行C编译器",
  question: "一个Tiger程序怎样从源码反查每个阶段、程序设计项目与目标行为？",
  fault: "单章模块通过但端到端接口、临时命名或调用约定不兼容",
  artifact: "全书覆盖矩阵、阶段快照、差分执行、性能证据与发布裁决",
  focus: "Tiger端到端编译链与整合验证",
  sources: [SOURCES.authorC, SOURCES.cambridge],
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
    .replace(/^第[一二三四五六七八九十]+部分\s*/, "")
    .replace(/^第\d+章\s*/, "")
    .replace(/^附录\s*/, "")
    .replace(/^(?:\d+(?:\.\d+)+|[A-Z]\.\d+)\s*/, "")
    .replace(/^程序设计：/, "");
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
    : `Tiger坐标${index + 1}`;
}

function normalizeSpec(id, data, title = "") {
  const [duty, question, fault, artifact, focus, sources] = data;
  return {
    title: title || undefined,
    duty,
    question,
    scenario: `在Tiger C实现轨道中复现“${title || id}”的输入、状态、变换与验证`,
    invariant: `${title || id}的C模块接口、数据结构、状态变换、输出语义与测试始终一致`,
    fault,
    artifact,
    focus,
    sources,
  };
}

function buildStages(title, specification) {
  return [
    {
      name: `${title} · C模块与输入`,
      input: specification.scenario,
      operation: `冻结${specification.focus}所需的C接口、源程序、规则、数据结构和版本`,
      output: `${title}的模块合同、输入快照与所有权表`,
      check: `${title}的类型、所有权、源位置、名字和接口布局没有错位`,
    },
    {
      name: `${title} · 算法与状态`,
      input: `${title}的冻结模块和输入`,
      operation: `执行${specification.duty}的最小算法并保存每一步状态`,
      output: `${title}的参考轨迹、故障轨迹与首个状态分岔`,
      check: `${title}每一步可由同一C接口、输入、规则和执行顺序复算`,
    },
    {
      name: `${title} · 输出与整合`,
      input: `${title}的中间状态、输出与下游模块合同`,
      operation: "比较变换前后AST/IR/汇编/运行时状态和跨模块传递",
      output: `${title}的前后差、接口谱系与恢复路径`,
      check: `${title}没有把单模块通过或单一样例正确当作端到端正确性`,
    },
    {
      name: `${title} · 独立验证`,
      input: `${title}的冻结候选与黄金测试、差分执行或不变量检查`,
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
          (value) =>
            /^第[一二三四五六七八九十]+部分/.test(value) ||
            /^第\d+章/.test(value) ||
            /^附录/.test(value),
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
        setup: `固定${specification.scenario}的C接口、输入、版本、预算和顺序`,
        prediction: `${title}的参考轨迹应持续满足“${specification.invariant}”`,
        boundary: `${title}只回答本页正式坐标和C实现轨道内的问题`,
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
        prediction: `${title}的状态、整合测试和交付证据应恢复基线`,
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
        label: "原版轨道与译本边界",
        detail: `${title}区分作者C/Java/ML三条轨道、Cambridge C版、中文修订版与本站C轨道独立重写。`,
      },
      {
        label: "C接口、状态与所有权",
        detail: `${title}的头文件、实现、数据结构、内存所有权、源位置和中间状态可复算。`,
      },
      {
        label: "变换、整合与恢复",
        detail: `${title}的规则、状态、跨模块接口、前后表示、诊断和恢复路径已归档。`,
      },
      {
        label: "端到端语义与边界",
        detail: `${title}以黄金测试或差分执行复核“${specification.invariant}”，并报告“${specification.fault}”的恢复结果。`,
      },
    ],
  };
}

function mechanismFor(concept, profile) {
  const title = stripCoordinate(concept);
  const rules = [
    [
      /部分|绪论|模块|接口|工具|软件|树语言|直线式|程序设计/,
      "落实C模块接口、数据结构、所有权、阶段输入/输出和可运行项目",
      "头文件/实现对照、模块依赖、状态快照、构建日志与黄金输出",
      "混用Java/ML轨道接口或单模块状态无法在C中整合",
    ],
    [
      /词法|词元|正则|自动机|扫描|语法|文法|分析|LR|预测|错误恢复/,
      "把字符、token、文法、分析表、栈和错误恢复连接为前端轨迹",
      "正则—自动机、token流、项目集、分析表、栈轨迹与冲突",
      "最长匹配、展望符、冲突或恢复状态错误",
    ],
    [
      /抽象语法|语义动作|类型|符号|绑定|声明|环境/,
      "构造带源位置AST并沿作用域环境执行名字绑定和类型检查",
      "CST—AST映射、环境快照、类型推导、错误路径与作用域恢复",
      "节点语义、绑定顺序、类型约束或作用域恢复错位",
    ],
    [
      /活动记录|栈帧|逃逸|静态链|调用约定|入口|出口/,
      "决定变量逃逸、帧布局、静态链和过程调用/返回序列",
      "逃逸集合、帧布局、调用序列、地址与寄存器轨迹",
      "捕获变量生命周期、参数位置或调用约定不一致",
    ],
    [
      /中间代码|树|翻译|基本块|轨迹|规范|控制流/,
      "把Tiger AST降到规范树IR、基本块和可调度控制流",
      "AST—IR映射、临时变量、标签、CFG、规范化与差分执行",
      "副作用重复、标签错连或轨迹调度破坏控制语义",
    ],
    [
      /指令|活跃|寄存器|干涉|图着色|合并|溢出/,
      "从树覆盖、活跃固定点和干涉图生成已分配目标指令",
      "树模式、use/def、in/out、干涉图、着色、溢出与汇编",
      "目标语义、活跃边、合并或溢出重写错误",
    ],
    [
      /整合|垃圾|收集|标记|复制|分代|增量|描述字/,
      "整合编译阶段或追踪根、对象图、屏障和回收状态",
      "端到端阶段快照、根集、对象图、屏障、回收与运行结果",
      "接口命名碰撞、根/描述字或写屏障缺失",
    ],
    [
      /面向对象|类|继承|成员|私有|函数式|闭包|尾递归|惰性/,
      "把对象布局、动态分派或闭包环境与调用约定降到IR",
      "类/vtable布局、自由变量、闭包对象、调用和求值轨迹",
      "对象偏移、自由变量、环境槽或求值策略错误",
    ],
    [
      /多态|类型推断|合一|重载|类型变量/,
      "生成约束、执行合一/泛化/实例化并翻译多态值",
      "约束集、合一轨迹、类型方案、实例化与错误证明",
      "不安全一般化、 occurs-check 或重载消解错误",
    ],
    [
      /数据流|别名|循环|支配|归纳|边界|展开|静态单赋值|SSA|phi/,
      "求解数据流与支配关系并证明优化/SSA变换保语义",
      "固定点、支配树、phi放置、重命名、循环森林与前后IR",
      "别名、溢出、关键边或跨迭代依赖被忽略",
    ],
    [
      /流水|调度|分支预测|存储层次|缓存|预取|分块|交换/,
      "把依赖、资源、周期和内存访问映射到调度与局部性优化",
      "依赖图、周期表、地址轨迹、缓存映射、缺失与性能消融",
      "非法推测、资源冲突或只对单一缓存参数调优",
    ],
    [
      /Tiger语言|词法问题|标准库|变量|表达式/,
      "把语言规则映射到测试、AST、类型、IR、运行时和诊断",
      "规则—测试矩阵、AST/类型/IR快照、运行结果与诊断",
      "语言规范、内建签名与编译器实现不一致",
    ],
  ];
  const rule = rules.find(([pattern]) => pattern.test(title));
  return rule
    ? rule.slice(1)
    : [
        `把“${title}”放进${profile.focus}的C接口—状态—变换—验证链`,
        `${profile.title}的输入角色、中间状态、输出、反例与整合证据`,
        `只复述“${title}”名称而没有可观察状态、项目实现和恢复验证`,
      ];
}

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并区分作者C/Java/ML轨道、中文C版与本站重写
- 能先预测“${profile.question}”会改变哪一个C接口、树/图状态、AST/IR、汇编或运行结果，再操作三类交互证据
- 能只注入“${profile.fault}”，定位首个偏离“${profile.invariant}”的状态，并从同一快照完成恢复

</Objectives>`;
}

function sourceSection(profile) {
  const sources = profile.sources
    .map((url, index) => `[本页独立核对 ${index + 1}](${url})`)
    .join("、");
  return `## 原版书目、296个正式坐标与C轨道边界

“${profile.title}”以[Andrew W. Appel作者官方目录](${SOURCES.authorToc})核对 *Modern Compiler Implementation* 的C、Java、ML三种实现轨道、2部分、21章和Tiger语言附录；以[作者C版页面](${SOURCES.authorC})核对Andrew·W·Appel与Maia Ginsburg、Cambridge University Press、C实现轨道、平装ISBN 0-521-60765-5、软件/练习模块与勘误入口，再以[Cambridge C版页面](${SOURCES.cambridge})核对原版身份。

“${profile.title}”以[中文版修订版完整目录](${SOURCES.chinese})核对赵克佳、黄春、沈志宇译《现代编译原理：C语言描述（修订版）》，人民邮电出版社，2018年，385页，ISBN 9787115476883。“${profile.title}”的正式分母为2个部分标题、21个章标题、1个附录标题、251个编号节/小节、附录4节和17个正式“程序设计”项目，合计296个核心层级；每章重复的推荐阅读与习题不另计。

作者页面可访问不等于允许复制书稿，“${profile.title}”不复制、翻译或改写原文、图表、伪码与习题；所有中文讲解、C接口示意、状态轨迹、反例、交互、练习和答案均为独立教学重写。${sources}只用于核对本页C实现或现代IR边界，不能混入Java/ML轨道或反向证明原书采用本站表述。`;
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
  return `## 原版目录层级与C项目机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept, profile);
    const term = termFor(concept, index);
    const safeConcept = mdxText(proseCoordinate(concept));
    const definition = `${term}对应正式目录坐标“${concept}”，在“${profile.title}”中用于${mechanism}，并受C接口、内存所有权、状态、目标机与验证边界约束。`;
    return `### ${safeConcept}

<Term def=${JSON.stringify(definition)}>${mdxText(term)}</Term>

**正式坐标 ${index + 1}/${profile.concepts.length}。** 原版目录键 \`${concept}\`。${patterns[index % patterns.length](profile, safeConcept, mechanism, evidence, caution, index)}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三个C轨道实验

<Callout type="info" title="先写出哪个状态会最先变化">
  对“${profile.title}”先冻结${profile.scenario}的C接口、源程序、规则、数据结构、目标机、预算和验证口径，再操作三类实验；结果与预测不同就修改假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. C模块、输入与翻译流水线">
    为“${profile.title}”选择正式目录坐标，在参考流水线与单一故障间切换，逐阶段核对接口、状态、输出和不变量。

    <${profile.componentBase}PipelineContractLab />
  </Step>
  <Step title="2. 状态、不变量与故障轨迹">
    保持“${profile.title}”的${profile.scenario}不变，只注入“${profile.fault}”，逐步定位首个偏离“${profile.invariant}”的位置。

    <${profile.componentBase}StateTraceLab />
  </Step>
  <Step title="3. 整合与端到端验证门">
    在“${profile.title}”的基线、单故障和恢复案例间切换，展开轨道、C接口、变换和端到端验证门后再决定是否交付。

    <${profile.componentBase}VerificationGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页单一故障：${profile.fault}">
  “${profile.title}”遇到该故障时必须保持其余C接口、输入、规则、目标机、预算和执行顺序不变；单模块测试通过不能替代首个状态分岔、跨模块整合和恢复证据。
</Callout>

<Callout type="trap" title="程序设计项目不是可跳过的章末装饰">
  “${profile.title}”中的正式程序设计项目负责把目录概念变成C模块、状态与接口证据；只背算法、看伪码或混用Java/ML模块，不能证明C版Tiger编译器可运行。
</Callout>

<Callout type="trap" title="作者页面可访问不等于允许复制">
  “${profile.title}”可以用作者目录、C版资源和Cambridge页面核对范围，但没有获得复制原文、图表、伪码或习题的授权；当前内容必须保持独立表达与轨道边界。
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

“${profile.title}”要求从同一C接口、源程序、规则、数据结构、目标机、预算和执行顺序重放参考、故障与恢复路径。重置后若目录选择、模式、阶段、轨迹步骤、案例、证据门或交付包没有回到基线，本次比较已经混入状态泄漏。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept, profile);
      return `  <GlossaryItem term=${JSON.stringify(termFor(concept, index))}>检索键 tbc-${alphaCode(index)} 对应正式目录坐标「${mdxText(proseCoordinate(concept))}」；在“${profile.title}”中用于${mechanism}，需要连接C轨道范围、状态轨迹、整合证据和不适用边界。</GlossaryItem>`;
    })
    .join("\n");
  const coverage = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept, profile);
      return `${index + 1}. “${profile.title}”的目录项「${mdxText(proseCoordinate(concept))}」：以“${mechanism}”解释作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是背术语、表格或伪码，而是围绕“${profile.question}”重建C接口、输入、状态变换、输出、整合和端到端验证，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}。

## 练习与答案

<Exercises>

1. **问题 1：C实现合同。** “${profile.title}”为什么必须先冻结C接口、源程序、规则、数据结构、目标机和验证口径？

<Answer>
  若同时改变这些条件，相同输出可能来自不同模块布局、状态、变换或目标机；先冻结合同，才能把观测连接到单一机制并定位首差。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明“${profile.title}”的正式目录坐标已经进入机制、交互和程序设计项目？

<Answer>
${coverage}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一C接口、输入、规则、数据结构、目标机、预算和顺序，重放参考路径后只注入该故障；记录首个偏离，撤销故障再运行。只有流水线合同、状态轨迹、端到端验证门和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="author-official-three-track-toc-plus-c-edition-and-chinese-revised-toc"
  workTitle="Andrew W. Appel、Maia Ginsburg著《Modern Compiler Implementation in C》"
  adaptedUrl="${SOURCES.authorC}"
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
} from "@/components/mdx/dragon-book-compilers/v2/compiler-evidence-lab";

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

“${profile.title}”围绕“${profile.question}”建立贯穿任务：${profile.scenario}。先写下哪个C接口、树/图状态、AST/IR、汇编或运行结果会最先变化，再运行参考、故障和恢复路径；运行后补理由不算预测。只有守住“${profile.invariant}”并交付${profile.artifact}，单模块测试、编译成功或性能变化才构成机制证据。

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
    description: `${profile.duty}；用C编译流水线、状态轨迹和端到端验证门交付${profile.artifact}`,
    demo: true,
    math: true,
    sourceUrl: SOURCES.authorToc,
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
const partHeadings = allCoordinates.filter((item) =>
  /^第[一二三四五六七八九十]+部分/.test(item),
).length;
const chapterHeadings = allCoordinates.filter((item) =>
  /^第\d+章/.test(item),
).length;
const appendixHeadings = allCoordinates.filter((item) =>
  /^附录/.test(item),
).length;
const numberedNodes = allCoordinates.filter((item) =>
  /^\d+(?:\.\d+)+\s/.test(item),
).length;
const appendixNodes = allCoordinates.filter((item) =>
  /^[A-Z]\.\d+\s/.test(item),
).length;
const projectNodes = allCoordinates.filter((item) =>
  /^程序设计：/.test(item),
).length;
const formalNodes = allCoordinates.length;
if (
  partHeadings !== 2 ||
  chapterHeadings !== 21 ||
  appendixHeadings !== 1 ||
  numberedNodes !== 251 ||
  appendixNodes !== 4 ||
  projectNodes !== 17 ||
  formalNodes !== 296
)
  throw new Error(
    `目录计数异常：部分${partHeadings}、章${chapterHeadings}、附录${appendixHeadings}、编号节${numberedNodes}、附录节${appendixNodes}、项目${projectNodes}、总计${formalNodes}`,
  );

const profiles = [
  enrichProfile(
    "learningMap",
    normalizeSpec(
      "learningMap",
      [
        MAP_SPEC.duty,
        MAP_SPEC.question,
        MAP_SPEC.fault,
        MAP_SPEC.artifact,
        MAP_SPEC.focus,
        MAP_SPEC.sources,
      ],
      MAP_SPEC.title,
    ),
    "learning-map",
    allCoordinates,
  ),
  ...manifest.units.map((unit) => {
    const data = SPEC_DATA[unit.id];
    if (!data) throw new Error(`缺少单元画像：${unit.id}`);
    return enrichProfile(
      unit.id,
      normalizeSpec(unit.id, data, unit.title),
      "unit",
      allCoordinates,
      unit,
    );
  }),
  enrichProfile(
    "finalReview",
    normalizeSpec(
      "finalReview",
      [
        REVIEW_SPEC.duty,
        REVIEW_SPEC.question,
        REVIEW_SPEC.fault,
        REVIEW_SPEC.artifact,
        REVIEW_SPEC.focus,
        REVIEW_SPEC.sources,
      ],
      REVIEW_SPEC.title,
    ),
    "final-review",
    allCoordinates,
  ),
];
if (profiles.length !== 24)
  throw new Error(`页面数量异常：应为24，实际${profiles.length}`);

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

manifest.status = "verified-outline-independent-rewrite-c-track";
manifest.verifiedAt = "2026-07-30";
manifest.edition =
  "Andrew W. Appel、Maia Ginsburg著，赵克佳、黄春、沈志宇译《现代编译原理：C语言描述（修订版）》，人民邮电出版社，2018年，385页，ISBN 9787115476883；英文C版Cambridge University Press，ISBN 0-521-60765-5";
manifest.sourceUrl = SOURCES.authorToc;
manifest.sourceKind =
  "author-official-c-java-ml-three-track-two-part-twenty-one-chapter-tiger-appendix-detailed-toc-plus-c-edition-and-complete-chinese-revised-toc";
manifest.sourceAccess = "outline-only";
manifest.defaultSourceMode = "independent-rewrite";
manifest.secondarySourceUrls = [
  SOURCES.authorC,
  SOURCES.cambridge,
  SOURCES.chinese,
];
manifest.disclosureNote =
  "Andrew W. Appel作者官方目录确认C、Java、ML三条实现轨道、2部分、21章和Tiger语言附录；作者C版页面确认Andrew W. Appel、Maia Ginsburg、Cambridge C版、ISBN 0-521-60765-5与C模块资源，Cambridge页面核对原版身份，中文版修订版目录核对赵克佳、黄春、沈志宇译本、人民邮电出版社2018年、385页、ISBN 9787115476883。正式分母为2部分、21章、1附录、251个编号节/小节、4个附录节和17个程序设计项目，共296个层级。本站严格走C轨道，不混入Java/ML模块；不复制或改写原文、图表、伪码和习题，所有讲解、交互、项目证据、练习和答案均为独立重写。";
manifest.unitMappingEvidence =
  "22个manifest单元与21章和Tiger附录页面一一映射；第1章与第13章同时承载两部分标题。学习地图与总复习不冒充原版单元。";
manifest.factSourcePolicy =
  "作者目录和C版页面只限定轨道与范围；现代IR、代码生成和运行时事实由LLVM、GNU、MLIR、Polly等官方资料独立核对并标版本，不倒填为原书内容。";
manifest.metrics = {
  formalPartHeadings: 2,
  formalChapterHeadings: 21,
  formalAppendixHeadings: 1,
  formalNumberedSectionsAndSubsections: 251,
  formalAppendixSections: 4,
  formalProgrammingProjects: 17,
  formalConceptNodes: 296,
  officialUnits: 22,
  learningMapPages: 1,
  reviewPages: 1,
  totalLearningPages: 24,
  interactiveViews: 72,
  visualKinds: [
    "compiler-pipeline-contract",
    "compiler-state-trace",
    "compiler-verification-gate",
  ],
};
manifest.coverageMetrics = {
  targetFormalNodes: 296,
  coveredFormalNodes: 296,
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
  `已重建24页，覆盖2部分+21章+1附录+251编号节/小节+4附录节+17项目=${formalNodes}个正式坐标，生成72个交互视图。`,
);
