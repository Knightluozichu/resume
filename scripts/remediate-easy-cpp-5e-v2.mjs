import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "easy-cpp-5e";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx/easy-cpp-5e/v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/easy-cpp-5e-v2-profiles.json");

const SOURCES = {
  publisher: "https://www.sbcr.jp/product/4797392593/",
  cinii: "https://ci.nii.ac.jp/ncid/BB23841999",
  ndl: "https://ndlsearch.ndl.go.jp/books/R100000002-I028210091",
  standard: "https://isocpp.org/std/the-standard",
};

const CHINESE_CONCEPTS = {
  "ecp-01": ["程序", "C++ 开发环境", "源代码", "编译"],
  "ecp-02": ["C++ 程序基本结构", "屏幕输出", "键盘输入", "注释"],
  "ecp-03": ["变量", "数据类型", "变量初始化", "常量"],
  "ecp-04": ["表达式", "算术运算符", "赋值运算符", "运算符优先级", "类型转换"],
  "ecp-05": ["if 语句", "switch 语句", "关系运算符", "逻辑运算符"],
  "ecp-06": [
    "for 循环",
    "while 循环",
    "do while 循环",
    "嵌套循环",
    "break 与 continue",
  ],
  "ecp-07": ["函数定义", "函数调用", "参数", "返回值", "函数重载"],
  "ecp-08": ["地址", "指针", "解引用", "引用", "动态内存"],
  "ecp-09": ["数组", "数组初始化", "多维数组", "数组与指针", "字符串"],
  "ecp-10": ["拆分文件", "头文件", "分离编译", "作用域", "命名空间"],
  "ecp-11": ["结构体", "枚举", "联合体", "类型别名"],
  "ecp-12": ["类", "对象", "数据成员", "成员函数", "访问控制"],
  "ecp-13": ["构造函数", "析构函数", "this 指针", "静态成员", "运算符重载"],
  "ecp-14": ["继承", "基类", "派生类", "重写", "虚函数"],
  "ecp-15": ["多态", "抽象类", "纯虚函数", "多重继承", "类与指针"],
  "ecp-16": ["文件", "文件输出", "文件输入", "打开文件", "输入输出错误"],
};

const LESSON_TITLES = [
  "Lesson 1：迈出第一步",
  "Lesson 2：C++ 的基本结构",
  "Lesson 3：变量",
  "Lesson 4：表达式与运算符",
  "Lesson 5：按情况处理",
  "Lesson 6：反复执行",
  "Lesson 7：函数",
  "Lesson 8：指针",
  "Lesson 9：数组",
  "Lesson 10：构建大型程序",
  "Lesson 11：各种类型",
  "Lesson 12：类的基本",
  "Lesson 13：类的功能",
  "Lesson 14：新的类",
  "Lesson 15：类的高级主题",
  "Lesson 16：文件输入输出",
];

const lessonSpecs = [
  {
    id: "ecp-01",
    chapterPath: "01-official/first-steps",
    componentBase: "EasyCppFirstSteps",
    title: LESSON_TITLES[0],
    description: "建立编辑、编译、链接、运行与诊断的第一条可重放证据链。",
    question: "怎样证明当前运行的可执行文件确实来自刚刚保存的源代码？",
    invariant:
      "源文件哈希不变时重建产物一致，修改后时间戳和运行输出都必须对应新版本。",
    fault: "修改源代码后不重新编译，继续运行陈旧产物",
    normalTrace: [
      "保存唯一源文件",
      "启用告警完成编译与链接",
      "运行新产物",
      "核对输出和退出状态",
    ],
    failureTrace: [
      "编辑未保存的缓冲区",
      "构建命令仍指向旧目录",
      "运行旧可执行文件",
      "把陈旧输出误判为代码逻辑",
    ],
    artifact:
      "源文件路径与哈希、完整构建命令、诊断、可执行文件时间戳、标准输出和退出状态。",
  },
  {
    id: "ecp-02",
    chapterPath: "02-official/cpp-basics",
    componentBase: "EasyCppBasics",
    title: LESSON_TITLES[1],
    description: "从 main、语句、标准输入输出和注释建立最小 C++ 程序的数据流。",
    question: "一条输入怎样经过 main 和语句顺序变成可验证的标准输出？",
    invariant: "成功读取前不得使用输入值，程序只从已验证状态生成输出。",
    fault: "输入流失败后仍读取未建立的值",
    normalTrace: [
      "进入 main",
      "输出明确提示",
      "验证 cin 读取成功",
      "用已初始化值计算并返回",
    ],
    failureTrace: [
      "提示与读取类型不一致",
      "cin 设置失败状态",
      "变量保持旧值或无效值",
      "输出看似正常但证据已断裂",
    ],
    artifact: "输入文本、流状态、变量初始化值、语句顺序、标准输出与退出码。",
  },
  {
    id: "ecp-03",
    chapterPath: "03-official/variables",
    componentBase: "EasyCppVariables",
    title: LESSON_TITLES[2],
    description:
      "用类型、初始化、赋值、作用域和 const 建立变量的有效状态模型。",
    question: "名字、存储、类型解释和有效值怎样共同决定一次变量读取是否合法？",
    invariant:
      "变量在每次读取前已经初始化，且其值满足类型与业务共同规定的范围。",
    fault: "读取尚未初始化的局部变量",
    normalTrace: [
      "声明类型与名字",
      "用可检查值初始化",
      "在有效作用域内更新",
      "读取前验证范围",
    ],
    failureTrace: [
      "只声明不初始化",
      "控制流跳过赋值",
      "第一次读取发生",
      "未定义行为污染后续输出",
    ],
    artifact:
      "声明位置、初始化路径、作用域、更新前后值、编译器告警和边界输入。",
  },
  {
    id: "ecp-04",
    chapterPath: "04-official/expressions-and-operators",
    componentBase: "EasyCppExpressions",
    title: LESSON_TITLES[3],
    description: "逐项追踪操作数类型、求值顺序、整数除法与显式转换。",
    question: "怎样在运行前预测表达式的结果类型和值，而不是凭数学直觉猜测？",
    invariant: "每个中间表达式的类型和范围明确，关键转换通过代码显式表达。",
    fault: "把整数除法结果赋给浮点变量后才期待保留小数",
    normalTrace: [
      "标注操作数类型",
      "按括号与优先级分组",
      "计算中间结果",
      "显式转换并核对范围",
    ],
    failureTrace: [
      "忽略两个操作数都是整数",
      "先执行截断除法",
      "结果再转为 double",
      "错误小数无法恢复",
    ],
    artifact:
      "原表达式、加括号版本、各中间类型和值、转换位置、边界输入和预期输出。",
  },
  {
    id: "ecp-05",
    chapterPath: "05-official/conditional-processing",
    componentBase: "EasyCppConditionals",
    title: LESSON_TITLES[4],
    description: "用边界表验证 if、else-if、switch、关系与逻辑运算。",
    question:
      "怎样证明所有互斥分支都可达、无重叠，并覆盖业务允许的完整输入域？",
    invariant: "任一合法输入恰好进入一个预期分支，非法输入进入显式拒绝路径。",
    fault: "相邻区间在边界值上同时遗漏或重叠",
    normalTrace: [
      "列出输入域",
      "写出互斥谓词",
      "生成边界表",
      "逐项核对唯一分支",
    ],
    failureTrace: [
      "凭样例编写条件",
      "遗漏等号或顺序错误",
      "边界进入错误分支",
      "随机测试未触达缺口",
    ],
    artifact: "输入域、谓词真值表、最小边界集合、实际分支标签和拒绝路径。",
  },
  {
    id: "ecp-06",
    chapterPath: "06-official/repetition",
    componentBase: "EasyCppLoops",
    title: LESSON_TITLES[5],
    description: "以初始化、条件、循环体、推进与不变量证明循环正确且可终止。",
    question: "怎样同时证明循环不会越界、不会漏项，并且一定能到达终止条件？",
    invariant:
      "每轮开始时已处理区间和待处理区间边界明确，推进量让剩余工作严格减少。",
    fault: "continue 跳过状态推进，导致条件永远保持为真",
    normalTrace: [
      "建立初值",
      "检查继续条件",
      "保持循环不变量",
      "推进并证明剩余量减少",
    ],
    failureTrace: [
      "条件成立进入循环",
      "分支触发 continue",
      "推进语句被跳过",
      "同一状态无限重放",
    ],
    artifact:
      "初值、每轮索引、循环不变量、推进量、终止度量、最后状态和迭代次数。",
  },
  {
    id: "ecp-07",
    chapterPath: "07-official/functions",
    componentBase: "EasyCppFunctions",
    title: LESSON_TITLES[6],
    description: "把声明、定义、调用、参数、返回值和重载组织为函数契约。",
    question:
      "怎样从调用点追到唯一函数定义，并证明参数身份和返回生命周期都正确？",
    invariant: "声明、定义与调用签名一致，所有非 void 路径返回有效对象或值。",
    fault: "声明与定义签名不一致却只检查调用语法",
    normalTrace: [
      "读取可见声明",
      "匹配实参与形参",
      "链接唯一匹配定义",
      "返回满足生命周期的结果",
    ],
    failureTrace: [
      "声明允许调用编译",
      "定义使用另一参数类型",
      "链接找不到目标符号",
      "误把链接失败当作语法错误",
    ],
    artifact:
      "声明、定义和调用签名、参数传递方式、重载候选、返回路径与链接器诊断。",
  },
  {
    id: "ecp-08",
    chapterPath: "08-official/pointers",
    componentBase: "EasyCppPointers",
    title: LESSON_TITLES[7],
    description: "从对象地址、指针类型、解引用和动态生命周期建立间接访问模型。",
    question: "一次解引用需要哪些对象存在性、类型、生命周期和所有权前提？",
    invariant:
      "被解引用地址指向仍在生命周期内且类型匹配的对象，并且释放责任唯一。",
    fault: "delete 后保留原地址并再次解引用",
    normalTrace: [
      "创建对象并取得地址",
      "检查指针非空与类型",
      "在对象生命周期内解引用",
      "释放后立即清除所有权状态",
    ],
    failureTrace: [
      "动态对象已经释放",
      "指针仍保存旧地址",
      "再次解引用悬空指针",
      "表面数值掩盖未定义行为",
    ],
    artifact:
      "对象创建点、地址、所有者、借用范围、释放点、空值状态和检测器诊断。",
  },
  {
    id: "ecp-09",
    chapterPath: "09-official/arrays",
    componentBase: "EasyCppArrays",
    title: LESSON_TITLES[8],
    description: "用容量、有效长度和下标不变量审计数组、多维映射与字符串边界。",
    question:
      "怎样证明每次下标访问都落在当前有效区间，而不是只落在分配容量内？",
    invariant:
      "访问下标严格小于有效长度，多维索引映射与字符串终止规则保持一致。",
    fault: "循环条件使用小于等于长度，访问末尾后一项",
    normalTrace: [
      "声明容量和有效长度",
      "生成合法下标",
      "完成元素访问",
      "核对最后一个合法位置",
    ],
    failureTrace: [
      "把长度当作最后下标",
      "循环到 index 等于 length",
      "越界读写相邻内存",
      "输出偶然正确",
    ],
    artifact:
      "数组容量、有效长度、每次下标、多维映射、终止字符位置和地址检测结果。",
  },
  {
    id: "ecp-10",
    chapterPath: "10-official/building-large-programs",
    componentBase: "EasyCppLargePrograms",
    title: LESSON_TITLES[9],
    description:
      "用头文件、翻译单元、分离编译、链接、作用域和命名空间建立模块边界。",
    question: "怎样区分预处理、编译和链接错误，并定位声明与定义跨文件的责任？",
    invariant: "共享接口只有一致声明，非 inline 定义在整个程序中恰有一个。",
    fault: "把同一个非 inline 函数定义写进头文件并由多个源文件包含",
    normalTrace: [
      "头文件提供受保护声明",
      "各源文件独立编译",
      "链接唯一外部定义",
      "运行跨模块调用",
    ],
    failureTrace: [
      "多个翻译单元展开同一定义",
      "各自编译成功",
      "链接发现重复符号",
      "错误被误判为 include 次序",
    ],
    artifact:
      "依赖图、预处理结果、各编译命令、目标文件符号表、链接命令和诊断阶段。",
  },
  {
    id: "ecp-11",
    chapterPath: "11-official/various-types",
    componentBase: "EasyCppVariousTypes",
    title: LESSON_TITLES[10],
    description: "比较结构体、枚举、联合体和类型别名的状态空间与合法读取规则。",
    question:
      "哪种用户定义类型能让非法状态最难表达，并保留清晰的活动成员证据？",
    invariant:
      "对象的标签与当前活动数据成员同步，读取方式与最近一次有效写入一致。",
    fault: "联合体写入一个成员后按另一个成员解释同一存储",
    normalTrace: [
      "选择能表达状态的类型",
      "初始化标签与数据",
      "只读取活动成员",
      "转换状态时同步更新",
    ],
    failureTrace: [
      "写入整型成员",
      "标签仍声称浮点成员活动",
      "按错误成员读取",
      "位模式被误当有效数值",
    ],
    artifact:
      "类型选择理由、对象布局、标签、活动成员、写入读取序列和非法状态反例。",
  },
  {
    id: "ecp-12",
    chapterPath: "12-official/class-basics",
    componentBase: "EasyCppClassBasics",
    title: LESSON_TITLES[11],
    description: "以类、对象、数据成员、成员函数和访问控制维护对象不变量。",
    question:
      "怎样让每个公开操作都保持对象有效，而不是把 private 仅当作语法限制？",
    invariant: "对象从构造完成到析构开始始终满足公开声明的不变量。",
    fault: "暴露可写数据成员，使调用者绕过验证直接破坏状态",
    normalTrace: [
      "构造有效对象",
      "通过公开成员验证输入",
      "更新私有状态",
      "从公开观察验证不变量",
    ],
    failureTrace: [
      "调用者直接写数据成员",
      "非法值绕过成员函数",
      "后续操作读取破坏状态",
      "错误远离根因出现",
    ],
    artifact:
      "类接口、构造初值、对象不变量、公开操作前后状态、非法输入和封装反例。",
  },
  {
    id: "ecp-13",
    chapterPath: "13-official/class-features",
    componentBase: "EasyCppClassFeatures",
    title: LESSON_TITLES[12],
    description: "用构造析构顺序、this、静态成员与运算符重载审计对象生命周期。",
    question:
      "拥有资源的类怎样保证构造、复制、赋值和析构形成一致的所有权协议？",
    invariant:
      "每项资源恰有一个负责释放的所有者，复制或移动后所有对象仍处于有效状态。",
    fault: "默认浅复制让两个对象析构时释放同一资源",
    normalTrace: [
      "构造获得资源",
      "按明确策略复制或禁止复制",
      "维护各对象不变量",
      "每项资源只释放一次",
    ],
    failureTrace: [
      "默认复制原始指针",
      "两个对象共享所有权却无协议",
      "第一个析构释放资源",
      "第二个析构发生重复释放",
    ],
    artifact:
      "构造析构日志、资源地址、复制赋值策略、this 身份、静态计数和检测器结果。",
  },
  {
    id: "ecp-14",
    chapterPath: "14-official/new-classes",
    componentBase: "EasyCppNewClasses",
    title: LESSON_TITLES[13],
    description:
      "从替换关系、构造析构顺序、virtual、override 与对象切片审计继承。",
    question: "怎样证明派生对象能在所有基类契约允许的位置安全替换基类对象？",
    invariant: "派生类不加强基类前置条件，虚调用和析构都保持基类公开契约。",
    fault: "按值传递派生对象给基类参数，发生对象切片",
    normalTrace: [
      "通过基类引用接收对象",
      "保留动态类型",
      "虚调用派发到覆盖函数",
      "经虚析构释放完整对象",
    ],
    failureTrace: [
      "按值复制到基类对象",
      "派生部分被切掉",
      "后续只剩基类状态",
      "行为与原动态对象不同",
    ],
    artifact:
      "类层次、is-a 契约、构造析构顺序、静态动态类型、虚调用结果和切片反例。",
  },
  {
    id: "ecp-15",
    chapterPath: "15-official/advanced-class-topics",
    componentBase: "EasyCppAdvancedClasses",
    title: LESSON_TITLES[14],
    description: "用抽象类、纯虚函数、对象指针与多重继承建立运行时多态边界。",
    question:
      "怎样让开放的多态接口扩展新类型，同时避免不安全向下转换和所有权混乱？",
    invariant:
      "调用者只依赖抽象接口，动态对象生命周期覆盖全部虚调用且析构路径完整。",
    fault: "未经验证把基类指针强制转换为错误派生类型",
    normalTrace: [
      "通过抽象接口持有对象",
      "虚调用按动态类型派发",
      "不需要具体派生假设",
      "通过虚析构释放",
    ],
    failureTrace: [
      "调用者猜测具体类型",
      "执行错误向下转换",
      "访问不存在的派生成员",
      "未定义行为破坏对象状态",
    ],
    artifact:
      "抽象接口、动态类型、派发轨迹、转换检查、多重继承路径、所有权和析构日志。",
  },
  {
    id: "ecp-16",
    chapterPath: "16-official/file-input-output",
    componentBase: "EasyCppFileIo",
    title: LESSON_TITLES[15],
    description:
      "以路径、打开模式、格式、流状态和往返测试建立文件输入输出合同。",
    question:
      "怎样证明写出的格式能被同一协议完整读回，并区分正常结束与读取失败？",
    invariant: "每次读写后检查流状态，成功往返后关键字段与原对象一致。",
    fault: "打开失败后仍进入读取循环并使用上一轮值",
    normalTrace: [
      "解析并记录路径与模式",
      "验证文件成功打开",
      "逐项读写并检查流状态",
      "往返比较原值与读回值",
    ],
    failureTrace: [
      "路径不存在导致打开失败",
      "代码忽略 fail 状态",
      "变量保留上一轮内容",
      "重复输出被误判为文件数据",
    ],
    artifact:
      "规范化路径、打开模式、文件内容、每步流状态、读写字段数、往返差异和错误消息。",
  },
];

const roleSpecs = [
  {
    id: null,
    role: "map",
    chapterPath: "00-intro/learning-map",
    componentBase: "EasyCppLearningMap",
    title: "高桥麻奈 C++ 入门教材第 5 版：16 课学习地图",
    description:
      "按公开 16 课目录串联开发循环、语言基础、内存、模块、对象与文件证据。",
    question:
      "16 课怎样从单文件运行闭环逐步扩展到对象生命周期、多态和文件往返？",
    invariant:
      "每一课都能指出输入、状态变化、失败模式和可重放证据，并与相邻课程形成前后依赖。",
    fault:
      "按“语法、面向对象、文件”三大主题粗分，跳过指针、数组和分离编译的中间合同",
    normalTrace: [
      "建立编译运行闭环",
      "学习值、控制流和函数",
      "进入内存与模块边界",
      "用对象和文件完成综合证据",
    ],
    failureTrace: [
      "直接跳到类语法",
      "缺少变量与函数契约",
      "指针数组错误无法定位",
      "大型程序故障被归为面向对象问题",
    ],
    artifact:
      "16 课依赖图、每课正式节点、正常与失败轨迹、编译阶段和综合项目验收表。",
    concepts: LESSON_TITLES,
  },
  {
    id: null,
    role: "review",
    chapterPath: "03-advanced/final-review",
    componentBase: "EasyCppFinalReview",
    title: "高桥麻奈 C++ 入门教材第 5 版：16 课总复习",
    description:
      "用成绩记录文件往返项目串联 16 课并按编译、路径、内存、对象和 I/O 层定位故障。",
    question:
      "怎样用一个可重放项目证明 16 课知识已经形成系统，而不是分别背过语法？",
    invariant:
      "同一输入文件和构建命令必须产生同一对象状态、输出文件与退出状态。",
    fault: "只核对最终输出文本，不保存编译、边界、生命周期和流状态证据",
    normalTrace: [
      "从干净目录完整构建",
      "读取并验证记录",
      "通过对象接口计算结果",
      "写出文件并完成往返比较",
    ],
    failureTrace: [
      "复用旧目标文件",
      "输入失败沿用旧值",
      "对象资源状态被破坏",
      "最终文本偶然与期望相同",
    ],
    artifact:
      "干净构建日志、输入输出文件、边界表、对象生命周期、参数哈希、流状态和故障注入记录。",
    concepts: LESSON_TITLES,
  },
];

const profiles = [
  roleSpecs[0],
  ...lessonSpecs.map((spec) => ({
    ...spec,
    role: "chapter",
    concepts: CHINESE_CONCEPTS[spec.id],
  })),
  roleSpecs[1],
];

const expectedPaths = [
  "00-intro/learning-map",
  "01-official/first-steps",
  "02-official/cpp-basics",
  "03-official/variables",
  "04-official/expressions-and-operators",
  "05-official/conditional-processing",
  "06-official/repetition",
  "07-official/functions",
  "08-official/pointers",
  "09-official/arrays",
  "10-official/building-large-programs",
  "11-official/various-types",
  "12-official/class-basics",
  "13-official/class-features",
  "14-official/new-classes",
  "15-official/advanced-class-topics",
  "16-official/file-input-output",
  "03-advanced/final-review",
];
if (
  profiles.length !== 18 ||
  profiles.some(
    (profile, index) => profile.chapterPath !== expectedPaths[index],
  )
) {
  throw new Error("18 页配置与现有课程路径不一致");
}

function managedSource(profile) {
  return `{/* ECP_SOURCE_V2_START */}
## 来源、版次与标准边界

“${profile.title}”以 [SB Creative 出版社书页](${SOURCES.publisher})核定高桥麻奈著、第 5 版、2017 年 6 月 14 日发行、ISBN 978-4-7973-9259-3；出版社页面标 596 页。[CiNii Books 书目与 16 课目录](${SOURCES.cinii})记录正文 xxiii+571 页，[日本国会图书馆书目](${SOURCES.ndl})记录 571 页。页数口径存在前置页差异，因此本课程不拿页码充当目录证据。

“${profile.title}”的中文说明、示例、交互、练习和答案均为独立教学重写。公开资料只确认 16 个 Lesson 标题；本页列出的细分概念是课程教学映射，不冒充原书逐级小节。技术规则参考 [ISO C++ 标准入口](${SOURCES.standard})复核，但 2017 年教材的 Visual Studio 2017 语境不会被静默升级为 C++23；现代写法只能明确标为迁移说明。

围绕“${profile.question}”，本页要求保留“${profile.artifact}”。若故障“${profile.fault}”无法在同一输入下制造首个分岔，应拒绝当前解释，而不是追加随机样例。
{/* ECP_SOURCE_V2_END */}`;
}

function managedEvidence(profile) {
  const concepts = profile.concepts
    .map(
      (concept, index) =>
        `- **${concept}**：在“${profile.title}”中核对输入、状态变化、失败模式和可复现证据；第 ${index + 1} 个节点必须能回到“${profile.invariant}”。`,
    )
    .join("\n");

  return `{/* ECP_EVIDENCE_V2_START */}
## 正式节点与章专属证据

${concepts}

先用输入合同检查本页正式节点，再在相同初值下逐步比较正常和失败轨迹，最后只启用“${profile.fault}”完成反例与复位。三个交互都必须能独立重置，且重置后再次满足“${profile.invariant}”。

<${profile.componentBase}ContractLab />

<${profile.componentBase}TraceLab />

<${profile.componentBase}FaultLab />
{/* ECP_EVIDENCE_V2_END */}

`;
}

function wrapperSource(profile) {
  const model = {
    unitId: profile.id ?? profile.role,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    steps: [
      {
        label: "输入与前置条件",
        contract: `为${profile.concepts[0]}声明输入类型、有效范围、对象生命周期和失败策略。`,
        evidence: `保存${profile.title}的原始输入、初值与第一条可检查诊断。`,
      },
      {
        label: "状态变化",
        contract: `逐步解释${profile.concepts[Math.min(1, profile.concepts.length - 1)]}改变了哪个值、对象或构建产物。`,
        evidence: `记录每步前后状态，并定位“${profile.fault}”造成的首个分岔。`,
      },
      {
        label: "结果与复位",
        contract: `输出、诊断和退出状态都必须能回到“${profile.invariant}”。`,
        evidence: `交付${profile.artifact}`,
      },
    ],
    normalTrace: profile.normalTrace,
    failureTrace: profile.failureTrace,
    invariant: profile.invariant,
    artifact: profile.artifact,
    fault: profile.fault,
  };

  return `"use client";

import {
  CppEvidenceLab,
  type CppEvidenceModel,
} from "./cpp-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies CppEvidenceModel;

export function ${profile.componentBase}ContractLab() {
  return <CppEvidenceLab model={model} view="contract" />;
}

export function ${profile.componentBase}TraceLab() {
  return <CppEvidenceLab model={model} view="trace" />;
}

export function ${profile.componentBase}FaultLab() {
  return <CppEvidenceLab model={model} view="fault" />;
}
`;
}

function stripManaged(body) {
  return body
    .replace(
      /\{\/\* ECP_SOURCE_V2_START \*\/\}[\s\S]*?\{\/\* ECP_SOURCE_V2_END \*\/\}\s*/g,
      "",
    )
    .replace(
      /\{\/\* ECP_EVIDENCE_V2_START \*\/\}[\s\S]*?\{\/\* ECP_EVIDENCE_V2_END \*\/\}\s*/g,
      "",
    )
    .replace(
      /^import \{ [^}]+ \} from "@\/components\/mdx\/easy-cpp-5e\/v2\/[^"]+";\s*$/gm,
      "",
    );
}

function transformPage(profile) {
  const filePath = path.join(CONTENT_ROOT, `${profile.chapterPath}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${filePath}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  let body = stripManaged(parsed.content);

  body = body.replace(
    /《やさしいC\+\+ 第5版》的官方目录从 Lesson 1「はじめの一歩」一路推进到 Lesson 16「ファイルの入出力」。/,
    "高桥麻奈的 C++ 入门教材第 5 版按 16 个 Lesson 从首次编译运行推进到文件输入输出。",
  );
  body = body.replace(
    /<Attribution[\s\S]*?\/>\s*$/,
    `<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-only"
  workTitle="高桥麻奈 2017 年 C++ 入门教材第 5 版"
  adaptedUrl="${SOURCES.publisher}"
/>`,
  );

  const wrapperImport = `import { ${profile.componentBase}ContractLab, ${profile.componentBase}TraceLab, ${profile.componentBase}FaultLab } from "@/components/mdx/easy-cpp-5e/v2/${path.basename(profile.chapterPath)}";`;
  body = body.replace(
    /import \{ Attribution \} from "@\/components\/mdx\/attribution";/,
    `import { Attribution } from "@/components/mdx/attribution";\n${wrapperImport}`,
  );

  if (!/<\/Objectives>/.test(body))
    throw new Error(`缺少 Objectives：${profile.chapterPath}`);
  body = body.replace(
    /<\/Objectives>\s*/,
    `</Objectives>\n\n${managedSource(profile)}\n\n`,
  );
  if (!/^## 小结$/m.test(body))
    throw new Error(`缺少小结：${profile.chapterPath}`);
  body = body.replace(/^## 小结$/m, `${managedEvidence(profile)}## 小结`);

  if (/[ぁ-ヿ]/.test(body))
    throw new Error(`页面仍有日文残留：${profile.chapterPath}`);

  const data = {
    ...parsed.data,
    title: profile.title,
    description: profile.description,
    demo: true,
    sourceUrl: SOURCES.publisher,
    qualityVersion: 2,
    practiceMode: "calculation",
    sourceMode: "independent-rewrite",
    ...(profile.id ? { officialUnitId: profile.id } : {}),
  };

  fs.writeFileSync(filePath, matter.stringify(body.trimStart(), data));
  const wrapperPath = path.join(
    COMPONENT_ROOT,
    `${path.basename(profile.chapterPath)}.tsx`,
  );
  fs.mkdirSync(path.dirname(wrapperPath), { recursive: true });
  fs.writeFileSync(wrapperPath, wrapperSource(profile));
}

for (const profile of profiles) transformPage(profile);

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const previous = manifest.books[BOOK];
const units = previous.units.map((unit) => {
  const profile = profiles.find((candidate) => candidate.id === unit.id);
  if (!profile) throw new Error(`清单存在未映射单元：${unit.id}`);
  const concepts = unit.concepts.map((aliases, index) => {
    const chinese = CHINESE_CONCEPTS[unit.id][index];
    return aliases.includes(chinese) ? aliases : [...aliases, chinese];
  });
  return {
    ...unit,
    title: profile.title,
    concepts,
    chapterPath: profile.chapterPath,
  };
});

manifest.books[BOOK] = {
  ...previous,
  edition:
    "高桥麻奈 C++ 入门教材第5版，SB Creative，2017年6月14日，ISBN 978-4-7973-9259-3；出版社标596页，CiNii记录xxiii+571页，NDL记录571页",
  sourceKind:
    "official-publisher-metadata-and-national-library-sixteen-lesson-outline",
  sourceUrl: SOURCES.publisher,
  secondarySourceUrls: [SOURCES.cinii, SOURCES.ndl, SOURCES.standard],
  verifiedAt: "2026-07-30",
  disclosureNote:
    "SB Creative页面确认作者、版次、发布日期、ISBN与596页；CiNii公开16个Lesson标题并记录xxiii+571页，NDL记录571页。页数口径有前置页差异，不影响16课分母。公开来源只确认Lesson级目录；清单中的细分概念是课程教学映射，不冒充原书逐级小节。正文仅用中文映射，日文原题保留在清单别名中用于溯源。",
  units,
  sourceAccess: "outline-only",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence: "quality/easy-cpp-5e-v2-profiles.json",
  factSourcePolicy:
    "公开书目只核定16课范围；技术规则以ISO C++标准入口交叉核对。课程示例、图示、交互、练习和答案独立编写，2017语境不静默升级为现代标准。",
};
fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);

fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      book: BOOK,
      generatedAt: "2026-07-30",
      officialSource: SOURCES.publisher,
      tocSources: [SOURCES.cinii, SOURCES.ndl],
      officialUnits: 16,
      teachingConceptMappings: Object.values(CHINESE_CONCEPTS).reduce(
        (sum, concepts) => sum + concepts.length,
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
  `已增强 ${profiles.length} 页，映射 16 个官方 Lesson、${Object.values(CHINESE_CONCEPTS).reduce((sum, concepts) => sum + concepts.length, 0)} 个教学概念，生成 ${profiles.length * 3} 个交互视图。`,
);
