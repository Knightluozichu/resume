#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = process.cwd();
const BOOK = "go-in-action";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/go-in-action-v2-profiles.json");
const PUBLISHER = "https://www.manning.com/books/go-in-action";
const OUTLINE =
  "https://livebook.manning.com/book/go-in-action/table-of-contents";
const AUTHOR_REPO = "https://github.com/goinaction/code";
const AUTHOR_SNAPSHOT =
  "https://github.com/goinaction/code/tree/49fc99e6affb9aa48cab1889505aa6631ee31ace";

const SOURCES = {
  publisher: PUBLISHER,
  publisherOutline: OUTLINE,
  authorRepo: AUTHOR_REPO,
  authorSnapshot: AUTHOR_SNAPSHOT,
  goSpec: "https://go.dev/ref/spec",
  goCompatibility: "https://go.dev/doc/go1compat",
  goReleases: "https://go.dev/doc/devel/release",
  goModules: "https://go.dev/ref/mod",
  goModuleLayout: "https://go.dev/doc/modules/layout",
  goDependencies: "https://go.dev/doc/modules/managing-dependencies",
  goCommand: "https://pkg.go.dev/cmd/go",
  gofmt: "https://pkg.go.dev/cmd/gofmt",
  goVet: "https://pkg.go.dev/cmd/vet",
  slicesBlog: "https://go.dev/blog/slices-intro",
  slicesPackage: "https://pkg.go.dev/slices",
  mapsPackage: "https://pkg.go.dev/maps",
  generics: "https://go.dev/blog/intro-generics",
  whenGenerics: "https://go.dev/blog/when-generics",
  loopVariables: "https://go.dev/blog/loopvar-preview",
  memoryModel: "https://go.dev/ref/mem",
  raceDetector: "https://go.dev/doc/articles/race_detector",
  context: "https://pkg.go.dev/context",
  sync: "https://pkg.go.dev/sync",
  atomic: "https://pkg.go.dev/sync/atomic",
  errgroup: "https://pkg.go.dev/golang.org/x/sync/errgroup",
  diagnostics: "https://go.dev/doc/diagnostics",
  slog: "https://pkg.go.dev/log/slog",
  encodingJson: "https://pkg.go.dev/encoding/json",
  io: "https://pkg.go.dev/io",
  testing: "https://pkg.go.dev/testing",
  httptest: "https://pkg.go.dev/net/http/httptest",
  fuzzing: "https://go.dev/doc/tutorial/fuzz",
  coverage: "https://go.dev/doc/build-cover",
  benchstat: "https://pkg.go.dev/golang.org/x/perf/cmd/benchstat",
  security: "https://go.dev/doc/security/best-practices",
};

const SOURCE_META = {
  publisher: [
    "Manning《Go in Action》版本页",
    "official-publisher-edition-metadata",
    "核对作者、2015年11月、264页、ISBN 9781617291784与读者范围",
  ],
  publisherOutline: [
    "Manning liveBook 正式目录",
    "official-publisher-outline",
    "只核对9章及章内公开目录坐标，不承担原书正文事实",
  ],
  authorRepo: [
    "Manning 链接的官方示例仓库",
    "publisher-linked-example-code",
    "核对首版示例的包路径、空白导入、并发模式与测试工件身份",
  ],
  authorSnapshot: [
    "官方示例仓库固定提交49fc99e",
    "publisher-linked-reproducible-snapshot",
    "把历史示例核对固定到2017年10月20日最后提交；仓库无LICENSE",
  ],
  goSpec: [
    "Go 当前语言规范",
    "language-primary-standard",
    "核对当前go1.26语言版本、类型、表达式、语句、包和并发语义",
  ],
  goCompatibility: [
    "Go 1 兼容性承诺",
    "language-maintainer-policy",
    "核对语言与标准库兼容承诺及明确例外",
  ],
  goReleases: [
    "Go 发布历史",
    "language-maintainer-release-record",
    "核对首版时代与当前工具链之间的功能和行为变更",
  ],
  goModules: [
    "Go Modules 参考",
    "toolchain-primary-reference",
    "核对module、package、version、go.mod、go.sum与依赖图",
  ],
  goModuleLayout: [
    "Go module 组织指南",
    "toolchain-primary-guidance",
    "核对当前package、command、internal与多模块布局",
  ],
  goDependencies: [
    "Go 依赖管理指南",
    "toolchain-primary-guidance",
    "核对版本选择、go mod tidy、replace与本地联调边界",
  ],
  goCommand: [
    "Go command 文档",
    "toolchain-primary-reference",
    "核对build、test、list、run、install及构建身份参数",
  ],
  gofmt: [
    "gofmt 文档",
    "toolchain-primary-reference",
    "核对格式化工具输入、输出与自动化边界",
  ],
  goVet: [
    "go vet 文档",
    "toolchain-primary-reference",
    "核对静态检查的启发式范围和非完备性",
  ],
  slicesBlog: [
    "Go Slices：用法与内部机制",
    "language-maintainer-explanation",
    "核对slice header、底层数组、长度、容量与append别名",
  ],
  slicesPackage: [
    "标准库 slices 文档",
    "standard-library-primary-reference",
    "核对当前泛型slice操作及其变更底层数组的契约",
  ],
  mapsPackage: [
    "标准库 maps 文档",
    "standard-library-primary-reference",
    "核对当前泛型map辅助操作及迭代顺序边界",
  ],
  generics: [
    "Go 泛型介绍",
    "language-maintainer-explanation",
    "核对Go 1.18增加类型参数后的语言边界",
  ],
  whenGenerics: [
    "何时使用泛型",
    "language-maintainer-guidance",
    "核对接口、函数与通用容器之间的设计取舍",
  ],
  loopVariables: [
    "Go 1.22 循环变量语义说明",
    "language-maintainer-migration-guidance",
    "核对每轮迭代变量变化和go.mod语言版本边界",
  ],
  memoryModel: [
    "Go 内存模型",
    "language-primary-standard",
    "核对happens-before、同步事件与无数据竞态程序保证",
  ],
  raceDetector: [
    "Go 数据竞态检测器",
    "toolchain-primary-documentation",
    "核对-race的动态覆盖、支持平台与运行开销边界",
  ],
  context: [
    "标准库 context 文档",
    "standard-library-primary-reference",
    "核对取消、截止时间、值传播与API边界",
  ],
  sync: [
    "标准库 sync 文档",
    "standard-library-primary-reference",
    "核对Mutex、WaitGroup、Pool与内存模型同步边",
  ],
  atomic: [
    "标准库 sync/atomic 文档",
    "standard-library-primary-reference",
    "核对原子操作、类型化原子值与适用边界",
  ],
  errgroup: [
    "x/sync/errgroup 文档",
    "go-project-module-primary-reference",
    "核对带错误传播与取消的goroutine组生命周期",
  ],
  diagnostics: [
    "Go 诊断文档",
    "runtime-primary-documentation",
    "核对profile、trace、执行追踪及采集扰动",
  ],
  slog: [
    "标准库 log/slog 文档",
    "standard-library-primary-reference",
    "核对结构化日志记录、属性、handler与上下文",
  ],
  encodingJson: [
    "标准库 encoding/json 文档",
    "standard-library-primary-reference",
    "核对JSON编码解码、字段选择、未知字段与数值边界",
  ],
  io: [
    "标准库 io 文档",
    "standard-library-primary-reference",
    "核对Reader、Writer、EOF、短读写和组合契约",
  ],
  testing: [
    "标准库 testing 文档",
    "standard-library-primary-reference",
    "核对测试、示例、基准、模糊测试与缓存身份",
  ],
  httptest: [
    "标准库 net/http/httptest 文档",
    "standard-library-primary-reference",
    "核对HTTP recorder、测试服务器与网络边界",
  ],
  fuzzing: [
    "Go 模糊测试教程",
    "toolchain-primary-tutorial",
    "核对seed corpus、失败输入与可重复执行",
  ],
  coverage: [
    "Go 集成测试覆盖率文档",
    "toolchain-primary-documentation",
    "核对二进制覆盖率工件、目录与合并流程",
  ],
  benchstat: [
    "Go benchstat 文档",
    "go-project-tool-primary-reference",
    "核对原始benchmark样本的统计比较与置信区间",
  ],
  security: [
    "Go 开发安全最佳实践",
    "language-maintainer-security-guidance",
    "核对govulncheck、fuzz、race与供应链检查",
  ],
};

const PATHS = {
  "gia-01": "01-language/gia-go-philosophy",
  "gia-02": "01-language/gia-quick-start",
  "gia-03": "01-language/gia-packaging-tooling",
  "gia-04": "02-data/gia-arrays-slices",
  "gia-05": "02-data/gia-map-struct",
  "gia-06": "03-concurrency/gia-goroutines",
  "gia-07": "03-concurrency/gia-concurrency-patterns",
  "gia-08": "04-engineering/gia-standard-lib",
  "gia-09": "04-engineering/gia-testing-packaging",
};

const TITLES = {
  "gia-01": "第1章 Go语言介绍",
  "gia-02": "第2章 Go快速入门",
  "gia-03": "第3章 包与工具",
  "gia-04": "第4章 数组、切片和映射",
  "gia-05": "第5章 Go语言的类型系统",
  "gia-06": "第6章 并发",
  "gia-07": "第7章 并发模式",
  "gia-08": "第8章 标准库",
  "gia-09": "第9章 测试和性能",
};

const SPECS = {
  "gia-01": {
    question: "开发速度、并发、类型与内存四个承诺怎样变成可观察合同？",
    scenario:
      "固定一个小型命令和同一输入，保存格式化、构建、运行、并发轨迹与内存观察，再切换一个语言或调度假设",
    fault: "把并发直接等同于并行，并省略调度与同步前提",
    invariant: "语言主张必须绑定源码、语言版本、工具链、输入、资源与可观察结果",
    artifact: "版本矩阵、源码哈希、构建日志、并发时间线、内存观察与恢复记录",
    focus: "开发速度、并发、类型系统、内存管理、Hello Go与Playground",
    sourceIds: [
      "publisher",
      "publisherOutline",
      "authorRepo",
      "authorSnapshot",
      "goSpec",
      "goCompatibility",
      "goReleases",
    ],
  },
  "gia-02": {
    question: "完整Go程序的package、init、接口与错误怎样形成可追踪执行路径？",
    scenario:
      "从官方RSS搜索示例的main入口出发，画出包导入、init注册、接口分派、goroutine和错误返回的先后关系",
    fault: "删除承担注册副作用的空白导入，却仍假定matcher已经存在",
    invariant:
      "每个运行行为都能回溯到确定包、初始化边、输入数据、接口实现和错误路径",
    artifact: "包图、init顺序、接口分派表、输入快照、错误链和同输入回归",
    focus:
      "程序架构、main、search package、四个源文件、RSS matcher、接口、goroutine与错误",
    sourceIds: [
      "publisherOutline",
      "authorRepo",
      "authorSnapshot",
      "goSpec",
      "goCommand",
    ],
  },
  "gia-03": {
    question:
      "首版GOPATH、vendoring与gb怎样迁移到当前module和workspace证据链？",
    scenario:
      "为同一多包程序分别记录首版路径假设与当前go.mod依赖图，从干净缓存执行format、vet、test和build",
    fault:
      "把gb或仅vendor目录当成当前依赖真值，却遗漏go.mod、go.sum与工具链版本",
    invariant:
      "包身份、模块版本、替换、校验和、工具链与构建输出必须可重建且相互一致",
    artifact:
      "模块图、go env快照、go.mod/go.sum、工具输出、二进制哈希和迁移差分",
    focus: "包命名、import、init、Go工具、协作、vendoring、gb与当前modules",
    sourceIds: [
      "publisherOutline",
      "authorRepo",
      "authorSnapshot",
      "goModules",
      "goModuleLayout",
      "goDependencies",
      "goCommand",
      "gofmt",
      "goVet",
      "security",
    ],
  },
  "gia-04": {
    question: "数组复制、slice别名、append扩容与map操作怎样改变共享状态？",
    scenario:
      "固定元素序列，记录数组值复制、slice长度容量与底层数组身份、append前后地址以及map增删迭代",
    fault: "把仍共享底层数组的slice当作独立副本并在调用方不可见处修改",
    invariant:
      "每次集合操作都必须说明值复制、别名、长度、容量、键可比较性和迭代顺序边界",
    artifact: "别名图、len/cap轨迹、append分岔、map快照、边界测试与恢复记录",
    focus:
      "数组、slice、nil/empty、append、capacity、map内部语义与当前泛型辅助包",
    sourceIds: [
      "publisherOutline",
      "authorRepo",
      "authorSnapshot",
      "goSpec",
      "slicesBlog",
      "slicesPackage",
      "mapsPackage",
    ],
  },
  "gia-05": {
    question: "定义类型、方法集、receiver、接口与embedding怎样约束可调用行为？",
    scenario:
      "为值和指针各建方法集矩阵，注入typed nil与embedding冲突，再由编译错误和运行观察裁决",
    fault: "接口值持有typed nil指针，却把接口本身误判为nil并继续调用方法",
    invariant:
      "接口动态类型和值、方法集、receiver可寻址性、embedding与导出边界必须显式可查",
    artifact:
      "方法集矩阵、接口二元状态、编译诊断、dispatch轨迹、泛型取舍与回归测试",
    focus: "用户定义类型、方法、指针和值、接口、多态、embedding、导出与泛型",
    sourceIds: [
      "publisherOutline",
      "authorRepo",
      "authorSnapshot",
      "goSpec",
      "generics",
      "whenGenerics",
    ],
  },
  "gia-06": {
    question:
      "goroutine、scheduler、锁、原子操作与channel怎样建立happens-before？",
    scenario:
      "固定一个共享计数与生产消费任务，分别用无同步、Mutex、atomic和channel运行并保存-race及事件时间线",
    fault: "并发send与close没有同步边，或共享状态在锁外读写",
    invariant:
      "跨goroutine可见性必须由内存模型规定的同步事件支持，并由覆盖目标路径的-race运行辅助检查",
    artifact:
      "goroutine图、happens-before边、race报告、channel状态、取消轨迹与泄漏检查",
    focus:
      "并发与并行、goroutine、scheduler、竞态、atomic、Mutex及buffered/unbuffered channel",
    sourceIds: [
      "publisherOutline",
      "authorRepo",
      "authorSnapshot",
      "goSpec",
      "memoryModel",
      "raceDetector",
      "sync",
      "atomic",
      "loopVariables",
    ],
  },
  "gia-07": {
    question: "Runner、Pool与Work怎样获得有界生命周期、所有权与失败传播？",
    scenario:
      "固定任务数、资源数、deadline与第一个失败，比较首版模式和context/errgroup实现的启动、停止与回收轨迹",
    fault: "worker无界增长或首个错误后仍生产任务，导致取消不能收敛",
    invariant:
      "每个goroutine和资源都必须有创建者、停止信号、回收者、错误出口与有界等待",
    artifact:
      "生命周期图、队列上限、deadline轨迹、首错传播、goroutine profile和资源回收表",
    focus:
      "Runner、程序寿命、timeout、interrupt、Pooling、资源池、Work与worker pool",
    sourceIds: [
      "publisherOutline",
      "authorRepo",
      "authorSnapshot",
      "context",
      "sync",
      "errgroup",
      "diagnostics",
      "memoryModel",
    ],
  },
  "gia-08": {
    question: "log、JSON与io接口怎样在组合时保留结构、边界和失败？",
    scenario:
      "让同一事件经过结构化日志、JSON编码解码与故障Reader/Writer，保存字段、字节数、EOF和错误链",
    fault: "忽略短写、未知JSON字段或日志敏感属性，只根据最终字符串判断成功",
    invariant:
      "标准库组合必须保留字段语义、字节计数、错误、资源关闭、敏感数据策略与版本身份",
    artifact:
      "日志schema、脱敏样本、JSON契约、Reader/Writer轨迹、短写/EOF测试和关闭记录",
    focus:
      "标准库源码与文档、logging、JSON、input/output、Reader/Writer及包间互操作",
    sourceIds: [
      "publisherOutline",
      "authorRepo",
      "authorSnapshot",
      "slog",
      "encodingJson",
      "io",
      "security",
    ],
  },
  "gia-09": {
    question: "单元测试、HTTP测试、Example与benchmark怎样形成可重复发布证据？",
    scenario:
      "冻结工具链和输入，运行表驱动测试、httptest、Example、fuzz、race、coverage与多轮benchmark比较",
    fault: "用单次benchmark或缓存PASS宣称性能和正确性均已证明",
    invariant:
      "测试结论必须绑定工具链、源码、输入、缓存、环境、原始样本、失败seed和统计方法",
    artifact:
      "测试矩阵、HTTP transcript、Example输出、fuzz seed、race/coverage工件与benchstat比较",
    focus:
      "unit test、httptest、Example文档、benchmark、go test参数、fuzz、coverage与benchstat",
    sourceIds: [
      "publisherOutline",
      "authorRepo",
      "authorSnapshot",
      "testing",
      "httptest",
      "fuzzing",
      "raceDetector",
      "coverage",
      "benchstat",
      "goCommand",
    ],
  },
};

const MAP_SPEC = {
  question: "怎样把9章78个正式坐标组织成语言、状态、并发与工程证据地图？",
  scenario:
    "选择一个正式坐标，沿版本身份、输入、程序状态、唯一迁移、可观察结果和同输入恢复定位前置条件",
  fault: "把目录标题当成原书正文，或把当前Go能力静默倒灌到2015首版",
  invariant:
    "78个正式坐标都必须绑定首版边界、当前依据、可观察状态、单变量故障和恢复条件",
  artifact: "78坐标覆盖表、九章依赖图、首版/当前迁移矩阵与证据索引",
  focus: "9章根坐标与69个公开主题坐标的全书路线",
  sourceIds: Object.keys(SOURCES),
};

const REVIEW_SPEC = {
  question: "能否从一次构建、竞态或性能异常反查语言坐标与最小证据链？",
  scenario:
    "用同一小型服务贯穿module、类型、集合、并发、标准库和测试，依次注入一个可撤销故障",
  fault: "同时改变源码、依赖、并发度和测试环境，使首个分岔不可归因",
  invariant:
    "全书裁决必须由固定版本与输入、单变量故障、原始工件和同输入恢复共同支持",
  artifact: "全书证据索引、跨章状态图、78坐标答辩记录和发布复核表",
  focus: "9章跨章状态迁移、证伪实验、当前迁移与发布判断",
  sourceIds: Object.keys(SOURCES),
};

function conceptStrings(unit) {
  return unit.concepts.map((alternatives) => alternatives[0]);
}

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function alphabeticIndex(index) {
  let value = index + 1;
  let result = "";
  while (value > 0) {
    value -= 1;
    result = String.fromCharCode(65 + (value % 26)) + result;
    value = Math.floor(value / 26);
  }
  return result;
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function evidenceKey(index, profile) {
  const scope =
    profile.role === "learning-map"
      ? "MAP"
      : profile.role === "final-review"
        ? "REVIEW"
        : profile.id.replace("gia-", "UNIT");
  return `GIA-${scope}-${alphabeticIndex(index)}`;
}

function mechanismFor(concept, profile) {
  const value = concept.toLocaleLowerCase();
  const label = concept.replaceAll(".", "·");
  const lead = `${profile.title}把${label}`;
  if (/chapter \\d/.test(value))
    return `${lead}设为章级边界：先声明它在2015首版目录中的位置，再列出当前规范、工具链和实验工件；章名本身不证明任何运行行为。`;
  if (/development speed|hello|playground|programming challenges/.test(value))
    return `${lead}落实为编辑、格式化、构建和运行的可重复反馈环；在线Playground结果必须报告其受限环境，不能替代目标GOOS、GOARCH和工具链验证。`;
  if (/concurrency|parallelism|goroutine|scheduler/.test(value))
    return `${lead}分开任务结构、调度并行与同步可见性，记录goroutine创建、阻塞、唤醒、退出和happens-before边；“跑得更快”不是并发正确性的定义。`;
  if (/type system|types|variables|functions|methods|user-defined/.test(value))
    return `${lead}映射为静态类型、表示、方法集、接口满足和编译诊断；当前类型参数属于显式迁移内容，不能冒充2015首版范围。`;
  if (/memory management/.test(value))
    return `${lead}区分语言可达性、运行时回收和外部资源生命周期，保存分配与存活证据；垃圾回收不替代Close、取消或所有权设计。`;
  if (
    /program architecture|main package|search package|search\\.go|rss matcher/.test(
      value,
    )
  )
    return `${lead}落到包图、main入口、init注册、接口分派和错误返回；官方示例代码只用于历史身份核对，无LICENSE就不复制实现。`;
  if (
    /packages|package-naming|imports|remote imports|named imports|init/.test(
      value,
    )
  )
    return `${lead}绑定目录、package声明、导入路径、初始化依赖和副作用；当前module路径与首版GOPATH路径必须分别记录。`;
  if (
    /go tools|go vet|go format|go documentation|collaborating|repositories/.test(
      value,
    )
  )
    return `${lead}绑定具体命令、工具链版本、输入文件和退出工件；gofmt与vet各自只承担格式或启发式检查，不能取代测试和语义证明。`;
  if (/dependency management|vendoring|gb/.test(value))
    return `${lead}建立历史GOPATH/vendor/gb与当前go.mod、go.sum、module graph的迁移差分；目录存在不等于依赖身份可验证。`;
  if (/array|slice|nil and empty|append|capacity/.test(value))
    return `${lead}画出值复制、slice header、底层数组、len/cap和append前后别名；只有地址、元素变化与边界测试共同支持共享状态结论。`;
  if (/map internals|map iteration|maps/.test(value))
    return `${lead}记录键可比较性、nil map、增删、迭代无序和并发访问边界；当前maps辅助包不改变语言本身的map契约。`;
  if (/pointers|interfaces|polymorphism|embedding|exporting/.test(value))
    return `${lead}写成值/指针方法集、接口动态类型和值、embedding提升与包可见性矩阵；typed nil与名称冲突必须由反例验证。`;
  if (/race conditions|locking|atomic|mutex|channels|buffered/.test(value))
    return `${lead}定位到内存模型同步事件、共享位置和channel状态，使用-race覆盖目标路径；检测器没有报告不等于未执行路径不存在竞态。`;
  if (
    /runner|program lifetime|pooling|resource pool|work|worker pool/.test(value)
  )
    return `${lead}规定创建者、并发上限、所有权、deadline、停止信号、首错和回收者；首版模式可复现，但当前实现还要评估context与errgroup。`;
  if (/standard library|documentation and source|logging/.test(value))
    return `${lead}把API文档、目标Go版本与源代码身份分开，并为日志字段、级别、handler和敏感数据建立schema；字符串出现不等于结构化事件正确。`;
  if (/json|input and output|io\\.reader|interoperability/.test(value))
    return `${lead}追踪字段、字节、短读写、EOF、关闭与错误传播；包间接口只有在双方都遵守Reader/Writer和数据契约时才可组合。`;
  if (
    /unit testing|http testing|examples|documenting|benchmark|go test/.test(
      value,
    )
  )
    return `${lead}绑定源码、工具链、缓存、输入、原始输出与失败工件；benchmark还要冻结环境并用多轮样本比较，单次ns/op没有推广力。`;
  return `${lead}转换成版本化输入、可观察程序状态、唯一迁移、预期结果与同输入恢复，并明确首版目录和当前官方依据各自承担什么。`;
}

function enrich(id, title, target, concepts, spec, role, officialUnitId) {
  const chapterSlug = target.split("/").at(-1);
  const stages = [
    {
      label: "冻结版本与输入",
      input: `${title}的源码提交、go语言版本、工具链、依赖图、GOOS/GOARCH和固定数据`,
      state: "尚未执行，只建立可重建身份与预注册预测",
      transition: "读取身份和初始状态，不修改源码、依赖或运行对象",
      observation: `${title}的版本表、输入哈希、能力清单与缺失条件`,
    },
    {
      label: "建立参考状态",
      input: `在干净缓存或明确缓存身份下执行：${spec.scenario}`,
      state: `${title}的包图、值、goroutine、资源和测试基线`,
      transition: "只执行预注册参考路径，不注入故障",
      observation: `${title}的构建、运行、状态轨迹与成功条件`,
    },
    {
      label: "注入单一迁移",
      input: `保持其余身份不变，只注入“${spec.fault}”`,
      state: `${title}最靠近该变量的语言、包、值、同步或工件状态`,
      transition: "一次只改变一个源码、依赖、调度或输入条件",
      observation: `${title}相对参考状态的首个分岔、传播路径与竞争性解释`,
    },
    {
      label: "撤销并同输入恢复",
      input: "撤销唯一变量，从干净状态以相同源码、依赖、输入和环境重放",
      state: `${title}的最终状态、残留goroutine、文件、缓存与资源`,
      transition: "恢复受控源并重建，不直接修补生成物或测试输出",
      observation: `${title}重新满足“${spec.invariant}”且无残留状态`,
    },
  ];
  const experiments = [
    {
      name: `${title}首版历史复现`,
      setup: "Manning正式目录、官方示例固定提交49fc99e与匹配时代的隔离工具链",
      prediction: `可以核对${spec.focus}的历史问题和示例身份，并交付${spec.artifact}。`,
      boundary:
        "官方示例仓库无LICENSE；只做结构和行为核对，不复制原文、代码或图像，也不把当前结论写成作者观点。",
    },
    {
      name: `${title}当前Go迁移`,
      setup: "当前规范标示go1.26，记录go.mod语言版本、工具链、依赖图与平台",
      prediction: `接口与工具可能变化，但实验仍必须守住“${spec.invariant}”。`,
      boundary:
        "modules、generics、循环变量、fuzz、slog等新能力属于当前迁移轨道，不属于2015首版正文。",
    },
    {
      name: `${title}单故障恢复`,
      setup: "干净仓库、固定输入、明确超时、goroutine/文件清理与原始工件目录",
      prediction: `只注入“${spec.fault}”后，首个分岔可定位，撤销后同输入恢复。`,
      boundary:
        "无法固定工具链、依赖、网络、时钟或基线时，结论只能标记未知，不能调分或补叙事。",
    },
  ];
  const baselineTrace = stages.map(
    (stage, index) =>
      `${title}基线${index + 1}：${stage.label}，观察${stage.observation}。`,
  );
  const faultTrace = stages.map(
    (stage, index) =>
      `${title}故障${index + 1}：${stage.label}只追踪“${spec.fault}”，核对${stage.state}。`,
  );
  const recoveryTrace = stages.map(
    (stage, index) =>
      `${title}恢复${index + 1}：${stage.transition}，重新验证${stage.observation}。`,
  );
  const gates = [
    {
      label: "原版、目录与许可门",
      detail: `${title}只用Manning正式目录限定覆盖，以官方示例固定提交核对历史身份；无LICENSE代码和不可访问正文均不复制。`,
    },
    {
      label: "语言版本与工具链门",
      detail: `${title}分开2015首版和当前go1.26轨道，记录go.mod语言版本、go version、GOOS/GOARCH、依赖图与构建参数。`,
    },
    {
      label: "状态、首错与证伪门",
      detail: `${title}只改变“${spec.fault}”，保存首个程序状态分岔、原始工件、竞争性解释和检测盲区。`,
    },
    {
      label: "恢复、残留与发布门",
      detail: `${title}撤销后以同一输入重建并恢复基线，交付${spec.artifact}，同时报告失败、残留与未知项。`,
    },
  ];
  return {
    id,
    title,
    target,
    chapterSlug,
    componentBase: pascal(chapterSlug),
    concepts,
    role,
    officialUnitId,
    ...spec,
    stages,
    experiments,
    baselineTrace,
    faultTrace,
    recoveryTrace,
    gates,
  };
}

function objectives(profile) {
  return `<Objectives>

- 把${profile.focus}落实为版本化输入、程序状态、唯一迁移与可观察结果
- 只注入“${profile.fault}”，定位${profile.title}相对参考状态的首个分岔
- 交付${profile.artifact}，明确分开2015首版与当前Go 1.26迁移轨道

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sourceIds
    .map((id) => {
      const meta = SOURCE_META[id];
      if (!meta) throw new Error(`缺少来源元数据：${id}`);
      return `- [${meta[0]}](${SOURCES[id]})：${profile.title}用它${meta[2]}。`;
    })
    .join("\n");
  return `## 原版、来源访问与时代边界

${profile.title}以[Manning正式版本页](${PUBLISHER})核对 William Kennedy、Brian Ketelsen、Erik St· Martin 合著、2015年11月、264页与 ISBN 9781617291784；以[Manning liveBook公开目录](${OUTLINE})限定9章和本页正式坐标。来源访问级别是 outline-only：目录不能支持原书正文、图表、代码解释或作者判断。

Manning版本页链接到[官方示例仓库](${AUTHOR_REPO})。${profile.title}把历史代码核对固定到[提交49fc99e](${AUTHOR_SNAPSHOT})，该提交时间为2017年10月20日。${profile.title}核对的仓库含按章组织的Go示例，但没有LICENSE文件；公开可读不等于获得复制授权，本站不复制原文、示例代码或图像，只核对包路径、文件身份与历史实验范围。

${profile.title}是中文独立教学重构，不是翻译、节译或原书替代品。${profile.title}的历史轨道保留首版的GOPATH、remote import、vendoring、gb、传统日志与当时并发模式；当前轨道依据Go官方规范和项目文档核对modules、generics、go1·22循环变量、fuzz、结构化日志及当前工具链。当前能力不能倒灌成2015作者观点。

${profile.title}的实验可能启动网络服务、并发任务、profile、race detector、fuzz或外部依赖下载。必须使用可丢弃工作目录、固定依赖和端口、明确超时、敏感数据隔离及停止条件；动态检测只覆盖实际执行路径，性能采集也可能扰动结果。

### 本页独立事实来源

${links}`;
}

function conceptsSection(profile) {
  return `## 正式目录坐标逐项深读

${profile.concepts
  .map((concept, index) => {
    const key = evidenceKey(index, profile);
    const label = concept.replaceAll(".", "·");
    return `### ${concept}

**坐标 ${index + 1}/${profile.concepts.length}：${label}。稳定证据键 ${key}。** ${mechanismFor(concept, profile)} ${profile.title}在这个坐标必须保存版本化输入、参考状态、唯一迁移、首个分岔、原始观察、撤销结果和时代边界；编译成功、一次PASS、单张截图或单次benchmark都不能独立证明主张。`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 三个可重放状态实验

${profile.title}先写预测：若只注入“${profile.fault}”，哪个包、值、goroutine、channel、资源或测试工件最先变化？选择正式坐标与时代轨道，再逐步重放参考、故障与恢复，最后逐项打开发布门。

<Stepper>
  <Step title="版本合同：选择坐标、时代与程序阶段">
    <${profile.componentBase}VersionContractLab />
  </Step>
  <Step title="状态轨迹：比较基线、单故障与恢复">
    <${profile.componentBase}StateTraceLab />
  </Step>
  <Step title="发布门：闭合来源、语义、证伪与恢复">
    <${profile.componentBase}EvidenceGateLab />
  </Step>
</Stepper>`;
}

function protocolSection(profile) {
  return `## 最小可重现实验协议

1. ${profile.title}先冻结源码提交、go.mod语言版本、实际工具链、GOOS/GOARCH、依赖图、环境变量、输入数据、端口、并发度与成功条件。
2. ${profile.title}从干净构建和明确缓存身份建立参考状态，保存${profile.artifact}；参考状态不稳定就停止，不用故障结果解释语言机制。
3. ${profile.title}保持其余条件不变，只注入“${profile.fault}”，记录首个分岔、传播路径、竞争性解释、检测覆盖与停止条件。
4. ${profile.title}撤销受控变量，从干净状态以同一输入重建；结果、途中状态或资源残留没有一起恢复时，结论标记失败或未知。

<Callout type="trap" title="${profile.title}误区一：目录或示例等于原书全文">
${profile.title}的outline-only来源只能证明公开目录范围；官方示例仓库也没有LICENSE。课程不能从标题虚构原书判断，更不能复制不可授权的正文、代码或图像。
</Callout>

<Callout type="trap" title="${profile.title}误区二：首版工具路径就是当前最佳实践">
${profile.title}保留GOPATH、vendoring、gb和首版模式的历史身份，但当前工程必须重新核对module、语言版本和官方文档；迁移结论属于本站独立解释。
</Callout>

<Callout type="trap" title="${profile.title}误区三：能运行或检测无报错就证明正确">
${profile.title}不以一次运行、PASS、-race静默或更低ns/op裁决；必须固定输入，只改变一个条件，保存首错、检测盲区、撤销和同输入恢复。
</Callout>`;
}

function exercises(profile) {
  const coordinateQuestions = profile.concepts
    .map((concept, index) => {
      const key = evidenceKey(index, profile);
      const label = concept.replaceAll(".", "·");
      return `**问题 ${index + 1}：${concept}**

为${profile.title}的稳定证据键 ${key} 设计一个参考状态、一个单变量故障、一个可观察信号和一个恢复检查，并说明${label}在首版与当前轨道的边界。

<Answer>
先为${profile.title}冻结${profile.scenario}所需的源码、go语言版本、工具链、依赖、输入和停止条件；把 ${key} 映射到参考状态、唯一迁移与预期观察，只注入“${profile.fault}”。首个分岔必须能由该变量解释，撤销后从干净状态以同一输入重新满足“${profile.invariant}”；未执行路径、未固定环境和原书正文细节保留为未知。
</Answer>`;
    })
    .join("\n\n");
  const start = profile.concepts.length + 1;
  return `## 练习与答案

<Exercises>

${coordinateQuestions}

**问题 ${start}：为什么要保留双时间轨道**

${profile.title}为什么不能用当前modules、generics或测试能力静默改写首版GOPATH与示例？

<Answer>
${profile.title}的历史轨道回答“2015正式目录和官方示例当时展示什么问题与工件”，当前轨道回答“目标go.mod语言版本和工具链现在保证什么”。二者只能通过显式迁移差分连接；当前支持更好不等于首版实验毫无价值，也不能把当前结论写成原作者观点。
</Answer>

**问题 ${start + 1}：什么时候必须缩小结论**

${profile.title}在哪些情况下不能发布“正确”“无竞态”或“更快”的结论？

<Answer>
${profile.title}缺少固定源码、工具链、依赖图、输入、平台、缓存身份、原始工件、覆盖路径、重复样本或同输入恢复中的任一项，就只能报告观察或未知。-race只覆盖运行路径，测试PASS可能来自缓存，benchmark受环境影响；这些限制必须和结果一起发布。
</Answer>

</Exercises>`;
}

function glossary(profile) {
  const terms = [
    [
      "语言版本",
      `${profile.title}由go.mod的go指令及实际工具链共同限定的语义与可用能力`,
    ],
    [
      "参考状态",
      `${profile.title}在固定源码、依赖、输入和环境下的包、值、goroutine与工件状态`,
    ],
    [
      "状态迁移",
      `${profile.title}由一次函数调用、赋值、同步、I/O或工具命令引起的可观察变化`,
    ],
    ["首个分岔", `${profile.title}的故障轨迹最早偏离参考轨迹的位置`],
    [
      "检测覆盖",
      `${profile.title}测试、race、fuzz、profile或静态工具实际检查到的路径和未覆盖边界`,
    ],
    [
      "同输入恢复",
      `${profile.title}撤销唯一变量后从干净状态重建并恢复参考状态的断言`,
    ],
  ];
  return `## 六个裁决术语

${profile.title}使用${terms
    .map(
      ([term, definition]) =>
        `<Term def="${escapeAttribute(definition)}">${term}</Term>`,
    )
    .join(
      "、",
    )}构成最小证据语言；它们都指向真实版本、程序状态或工件，不生成置信度、成熟度或风险分。

<Glossary>
${terms
  .map(
    ([term, definition]) =>
      `<GlossaryItem term="${term}">${definition}。</GlossaryItem>`,
  )
  .join("\n")}
</Glossary>`;
}

function synthesis(profile) {
  return `## 小结与上架门

${profile.title}把${profile.focus}连接成可复核状态链：目录只给正式坐标，官方规范限定当前语义，双时间轨道防止时代错置，参考与单故障定位首错，原始工件和同输入恢复决定结论能否发布。最终交付${profile.artifact}，同时报告失败、检测盲区、资源残留与目标环境之外的未知项。

${exercises(profile)}

${glossary(profile)}

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-only"
  workTitle="William Kennedy、Brian Ketelsen、Erik St. Martin《Go in Action》第一版公开目录"
  adaptedUrl="${OUTLINE}"
/>`;
}

function wrapper(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    stages: profile.stages,
    experiments: profile.experiments,
    baselineTrace: profile.baselineTrace,
    faultTrace: profile.faultTrace,
    recoveryTrace: profile.recoveryTrace,
    gates: profile.gates,
  };
  return `"use client";

import {
  GoSemanticsEvidenceLab,
  type GoSemanticsEvidenceModel,
} from "@/components/mdx/go-in-action/v2/go-semantics-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies GoSemanticsEvidenceModel;

export function ${profile.componentBase}VersionContractLab() {
  return <GoSemanticsEvidenceLab model={model} view="version-contract" />;
}

export function ${profile.componentBase}StateTraceLab() {
  return <GoSemanticsEvidenceLab model={model} view="state-trace" />;
}

export function ${profile.componentBase}EvidenceGateLab() {
  return <GoSemanticsEvidenceLab model={model} view="evidence-gate" />;
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
  ${profile.componentBase}VersionContractLab,
  ${profile.componentBase}StateTraceLab,
  ${profile.componentBase}EvidenceGateLab,
} from "@/components/mdx/${BOOK}/v2/${profile.chapterSlug}";

${objectives(profile)}

## 为什么从这个问题开始

${profile.title}围绕“${profile.question}”建立贯穿任务：${profile.scenario}。先预测程序状态，再重放参考、单故障与恢复；只有守住“${profile.invariant}”并交付${profile.artifact}，目录标题、示例运行或工具输出才可能升级为可复核证据。

${sourceSection(profile)}

${conceptsSection(profile)}

${experimentSection(profile)}

${protocolSection(profile)}

${synthesis(profile)}
`;
  const data = {
    ...parsed.data,
    title: profile.title,
    section: profile.title,
    description: `${profile.title}覆盖${profile.concepts.length}个正式目录坐标，用版本合同、状态轨迹与发布门交付${profile.artifact}`,
    demo: true,
    math: false,
    sourceUrl: OUTLINE,
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
    wrapper(profile),
    "typescript",
  );
}

const document = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = document.books[BOOK];
if (!manifest) throw new Error(`缺少manifest：${BOOK}`);
if (manifest.units.length !== 9)
  throw new Error(`正式章数应为9，实际${manifest.units.length}`);

for (const unit of manifest.units) {
  const spec = SPECS[unit.id];
  const target = PATHS[unit.id];
  if (!spec || !target || !TITLES[unit.id])
    throw new Error(`缺少单元配置：${unit.id}`);
  if (conceptStrings(unit).length < 7)
    throw new Error(`${unit.id}公开主题坐标不足7`);
}

const allCoordinates = manifest.units.flatMap((unit) => [
  unit.title,
  ...conceptStrings(unit),
]);
if (allCoordinates.length !== 78)
  throw new Error(`正式坐标应为78，实际${allCoordinates.length}`);

const profiles = [
  enrich(
    "learningMap",
    "《Go语言实战》78坐标证据学习地图",
    "00-guide/gia-learning-map",
    allCoordinates,
    MAP_SPEC,
    "learning-map",
  ),
  ...manifest.units.map((unit) =>
    enrich(
      unit.id,
      TITLES[unit.id],
      PATHS[unit.id],
      [unit.title, ...conceptStrings(unit)],
      SPECS[unit.id],
      "chapter",
      unit.id,
    ),
  ),
  enrich(
    "finalReview",
    "《Go语言实战》78坐标全书证据总复习",
    "05-review/gia-final-review",
    allCoordinates,
    REVIEW_SPEC,
    "final-review",
  ),
];
if (profiles.length !== 11)
  throw new Error(`页面数量应为11，实际${profiles.length}`);

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

for (const unit of manifest.units) {
  unit.chapterPath = PATHS[unit.id];
  unit.sourceMode = "independent-rewrite";
  unit.sourceAccess = "outline-only";
  unit.factSourceIds = SPECS[unit.id].sourceIds;
}
manifest.edition =
  "Go in Action, First Edition, William Kennedy with Brian Ketelsen and Erik St. Martin, Manning, November 2015, 264 pages, ISBN 9781617291784";
manifest.sourceKind =
  "official-publisher-outline-plus-publisher-linked-example-repository-fixed-snapshot-plus-current-go-primary-documentation";
manifest.sourceUrl = OUTLINE;
manifest.secondarySourceUrls = Object.values(SOURCES).filter(
  (url) => url !== OUTLINE,
);
manifest.status =
  "verified-official-outline-independent-rewrite-current-go-cross-check";
manifest.verifiedAt = "2026-07-30";
manifest.sourceAccess = "outline-only";
manifest.defaultSourceMode = "independent-rewrite";
manifest.disclosureNote =
  "正式分母为9个章根坐标和公开目录整理出的69个主题坐标，共78个正式坐标。Manning版本页核对2015年11月、264页与ISBN；liveBook公开目录只限定范围。Manning链接的goinaction/code仓库固定到2017-10-20提交49fc99e，仓库无LICENSE，故不复制示例代码。首版GOPATH、remote import、vendoring、gb、传统日志与当时并发模式保留历史身份；当前go1.26规范、modules、generics、go1.22循环变量、fuzz、slog及工具链作为独立迁移轨道。";
manifest.unitMappingEvidence = "quality/go-in-action-v2-profiles.json";
manifest.factSourcePolicy =
  "Manning目录和版本页只核对原作范围与版本身份；官方示例固定提交只核对历史代码工件，因无LICENSE不复制。当前语言、标准库、工具链与安全事实由go.dev、pkg.go.dev及Go项目模块文档独立核对，不能倒灌成首版作者观点。";
manifest.factSources = Object.fromEntries(
  Object.entries(SOURCE_META).map(([id, [label, kind]]) => [
    id,
    { kind, label, url: SOURCES[id] },
  ]),
);
manifest.coverageMetrics = {
  targetFormalNodes: 78,
  coveredFormalNodes: 78,
  coveragePercent: 100,
};
manifest.metrics = {
  officialChapterRoots: 9,
  officialTopicCoordinates: 69,
  formalNodes: 78,
  officialUnits: 9,
  learningMapPages: 1,
  chapterPages: 9,
  finalReviewPages: 1,
  totalPages: 11,
  interactiveViews: 33,
};

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      generatedAt: "2026-07-30",
      sourceAccess: "outline-only",
      publisherEdition: "November 2015, ISBN 9781617291784",
      authorCodeSnapshot: "49fc99e6affb9aa48cab1889505aa6631ee31ace",
      formalNodes: 78,
      profiles: profiles.map((profile) => ({
        ...profile,
        filePath: `content/${BOOK}/${profile.target}.mdx`,
        componentPath: `src/components/mdx/${BOOK}/v2/${profile.chapterSlug}.tsx`,
      })),
    },
    null,
    2,
  )}\n`,
  "json",
);
await writeFormatted(
  MANIFEST_PATH,
  `${JSON.stringify(document, null, 2)}\n`,
  "json",
);

console.log("已重构11页、9章、69个公开主题、78个正式坐标与33个交互视图。");
