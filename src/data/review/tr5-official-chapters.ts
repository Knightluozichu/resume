import type { ReviewChapterSlug, ReviewQuestion } from "./types";

type ChapterReview = readonly [
  chapter: ReviewChapterSlug,
  title: string,
  question1: string,
  answer1: string,
  question2: string,
  answer2: string,
  tags: readonly string[],
];

const chapters: readonly ChapterReview[] = [
  ["tr5-learning-map", "学习地图", "第五版四个部分与学习顺序是什么？", "依次是Ruby初体验（1-3）、Ruby的基础（4-11）、Ruby的类（12-21）和动手制作工具（22-23）。所有路线先完成1-11章，文本/数据工具路线再完成核心类与项目章。", "怎样用四步证据判断一章真正掌握？", "先预测可观察结果，再执行最小完整程序，然后注入nil、坏编码、异常或中断等边界，最后脱离页面重画对象、控制、数据和owner关系。四类证据一致才通过。", ["学习地图", "四部分", "验收"]],
  ["tr5-first-ruby", "第1章 Ruby初探", "ruby脚本与irb在结果显示上有什么差异？", "脚本只自动输出显式puts/p/warn等操作，普通表达式结果不会自动显示；IRB为交互反馈会显示表达式结果。可复现脚本还应固定参数、工作目录和退出状态。", "为什么0和空字符串在Ruby条件中都为真？", "Ruby只有nil和false是假值，0、空字符串和空容器都是真。判断数量或内容必须显式比较，不能套用C/Python的空值规则。", ["第1章", "执行", "真值"]],
  ["tr5-useful-objects", "第2章 便利的对象", "Ruby中“对象接收方法”如何统一数字、字符串与容器操作？", "`receiver.method(args)`从receiver的类及ancestors查找方法；数字计算、字符串转换、数组遍历和散列查询都遵守同一消息发送模型。", "p与puts为什么适合不同的输出契约？", "puts面向用户并按行输出可读字符串，p通常输出inspect表示并返回对象，适合诊断类型、转义和结构。正式工具应区分用户输出与诊断输出。", ["第2章", "对象", "方法"]],
  ["tr5-building-command", "第3章 创建命令", "一个可自动判断成功失败的Ruby命令至少要声明什么？", "声明ARGV/stdin输入grammar、stdout正常结果、stderr诊断、exit status、工作目录与encoding；缺参、坏文件和空结果不能都用同一个状态。", "读取文件后统计匹配时怎样避免把所有错误都当成无结果？", "分别处理参数验证、open/read异常、decode/parse异常和合法零匹配；保留异常类与上下文，只有成功执行且计数为0才是无结果。", ["第3章", "CLI", "状态"]],
  ["tr5-objects-variables-constants", "第4章 对象、变量和常量", "Ruby变量赋值复制对象还是引用？", "普通赋值复制reference，两个变量可指向同一mutable对象；修改对象会从所有alias可见。需要snapshot时显式dup/deep copy，并说明浅复制边界。", "局部变量、实例变量、类变量、全局变量和常量的作用域差异是什么？", "局部变量按词法scope，实例变量属于单个对象，类变量在继承层次共享，全局变量跨作用域，常量按词法/ancestor规则查找且重赋值会警告。优先使用最窄作用域。", ["第4章", "变量", "作用域"]],
  ["tr5-conditional-judgment", "第5章 条件判断", "if、unless与case应怎样选择？", "正向条件用if，单一否定条件可用unless，多个模式或值分支用case；复杂否定和带else的unless通常降低可读性。case通过`===`匹配而非简单等号。", "怎样防止case分支漏掉未知输入？", "先定义允许的输入集合，为未知值提供显式else错误或结果；测试nil、边界值和未来新增值，不能让未匹配分支静默返回nil。", ["第5章", "条件", "case"]],
  ["tr5-loops", "第6章 循环", "为什么Ruby通常优先each/times而不是手写while索引？", "迭代器把推进和边界交给容器，减少off-by-one与忘记更新计数器；while适合条件驱动状态机，但必须写清progress invariant与终止条件。", "break、next与redo分别怎样改变循环控制？", "break结束循环并可给循环表达式返回值，next跳过本轮剩余部分，redo不重新判断条件而重做当前轮。使用redo时尤其要证明状态会推进，避免无限循环。", ["第6章", "循环", "不变量"]],
  ["tr5-methods", "第7章 方法", "Ruby方法参数契约应覆盖哪些形态？", "覆盖位置参数、默认参数、关键字参数、splat、block和缺失/多余参数；公开API优先明确关键字和返回schema，避免用可变参数掩盖错误。", "没有显式return时方法返回什么，为什么这可能造成bug？", "方法返回最后求值表达式。新增日志、条件或赋值可能意外改变返回值；关键API应组织末尾表达式或显式return，并用测试固定结果。", ["第7章", "方法", "参数"]],
  ["tr5-classes-modules", "第8章 类和模块", "include、prepend与extend怎样改变方法位置？", "include把模块实例方法放到类之后的查找链，prepend放到类之前以便包装super，extend把模块方法加入特定对象的singleton class。用ancestors验证实际顺序。", "继承与Mixin设计中怎样避免共享可变类状态？", "实例状态放实例变量；类级配置明确属于class instance variable还是继承共享；模块提供行为并要求显式接口。不要用类变量无意跨父子类共享。", ["第8章", "类", "模块"]],
  ["tr5-operators", "第9章 运算符", "为什么说Ruby运算符大多是方法调用？", "`a + b`通常分派为`a.+(b)`，比较、索引和一元操作也有对应方法，因此行为由左接收者类型决定；优先级和短路运算仍由语法规定。", "自定义`==`后为什么还要考虑eql?与hash？", "Hash键使用eql?和hash；若值对象只改==，集合与散列可能和普通比较不一致。相等对象必须给出一致hash，并测试对称、传递和不同类型。", ["第9章", "运算符", "相等性"]],
  ["tr5-errors-exceptions", "第10章 错误处理与异常", "rescue、else与ensure各自承担什么职责？", "rescue处理匹配异常，else只在无异常时运行，ensure无论成功失败都执行清理。恢复前必须确认状态不变量仍成立，ensure不能覆盖原始异常。", "为什么通常不应rescue Exception？", "Exception还包含SystemExit、Interrupt等进程控制异常。业务边界通常捕获StandardError或更具体类型，补充上下文后恢复或重新抛出。", ["第10章", "异常", "清理"]],
  ["tr5-blocks", "第11章 块", "yield与显式block参数各适合什么场景？", "只需调用块时用yield/block_given?更直接；需要保存、传递或组合回调时用`&block`转Proc，但会产生对象化成本。两者都要声明参数与返回值。", "迭代器在consumer提前break时怎样处理资源？", "普通迭代器不一定获知break；资源应由外层block-form owner管理，或提供显式close/ensure。不能依赖GC最终回收文件或数据库handle。", ["第11章", "块", "yield"]],
  ["tr5-numeric", "第12章 数值类", "Integer、Float与Rational应怎样按精度需求选择？", "Integer用于精确离散量，Float适合近似实数但有舍入，Rational保留分数精确性。金额常用整数最小单位或Decimal方案，并在边界检查range。", "除法与取整为什么必须测试负数？", "`/`、div、fdiv、%和remainder在类型与负数方向上语义不同。先声明向下、向零或最近取整，再用正负边界和零除测试固定契约。", ["第12章", "数值", "精度"]],
  ["tr5-arrays", "第13章 数组类", "`Array.new(3, [])`为什么危险？", "三个位置保存同一个数组reference，修改一项会同时影响全部。需要独立元素时使用`Array.new(3) { [] }`并用object_id测试。", "map、select、each_with_object分别适合什么结果语义？", "map一对一生成新集合，select保留满足条件的原元素，each_with_object累积到显式容器。选择能表达目标shape的方法，并测试空数组与块异常。", ["第13章", "数组", "alias"]],
  ["tr5-strings", "第14章 字符串类", "String#length、bytesize与each_char分别观察什么？", "length/size按字符语义计数，bytesize计算编码后的字节数，each_char按字符迭代；协议长度、UI字符和磁盘大小不能混用。", "冻结字符串能否保证整个对象图不可变？", "freeze只冻结该String对象；容器freeze也不递归冻结元素。需要深不可变时逐层构造/冻结，并避免保留外部mutable alias。", ["第14章", "字符串", "字节"]],
  ["tr5-hashes", "第15章 散列类", "`Hash.new([])`为什么会让不同key互相污染？", "缺失key都返回同一个默认数组，且不会自动写入hash。使用`Hash.new { |h, k| h[k] = [] }`为每个key建立独立值。", "Hash键对象为什么不应在插入后改变hash相关状态？", "Hash按eql?/hash定位bucket；键变异后可能再也查不到。使用immutable key，或变更后rehash，但设计上应避免mutable key。", ["第15章", "散列", "默认值"]],
  ["tr5-regular-expressions", "第16章 正则表达式类", "锚点`^/$`与`\\A/\\z`有什么边界差异？", "^和$按行边界匹配，\\A和\\z匹配整个字符串开头/结尾。验证完整输入grammar通常用\\A...\\z，避免多行尾部被误接受。", "为什么不能用正则或split(',')解析一般CSV？", "CSV允许quoted commas、escaped quotes和embedded newlines，需要状态化parser。正则适合字段内部模式验证，不负责完整CSV结构。", ["第16章", "正则", "锚点"]],
  ["tr5-io", "第17章 IO类", "IO读取返回nil、空字符串或异常分别意味着什么？", "具体API契约不同：nil常表示EOF，空字符串可能是合法零长度结果，异常表示I/O失败。循环必须按所用方法的完整返回协议处理。", "怎样设计不会泄漏handle的IO owner？", "优先block-form open，由创建者负责close；覆盖success、EOF、parse error、cancel和early return。不要把尚未声明owner的IO对象随意跨层传递。", ["第17章", "IO", "owner"]],
  ["tr5-file-dir", "第18章 File类与Dir类", "为什么路径规范化不能替代目录边界检查？", "clean/expand path只做语法处理，symlink、大小写和竞态仍可能越界。敏感操作应以可信root打开/解析并核对真实目标，必要时使用OS级安全API。", "原子写文件的基本流程是什么？", "在同一文件系统写临时文件，flush/按策略fsync，完成内容验证后rename替换，并明确权限、失败清理与旧版本保留。直接覆盖会暴露部分内容。", ["第18章", "File", "Dir"]],
  ["tr5-encoding", "第19章 Encoding类", "force_encoding与encode有什么本质区别？", "force_encoding只改变字节的编码标签，不转码也不验证；encode按源/目标编码转换并可能因invalid/undef失败。来源不明时不能靠force_encoding修乱码。", "怎样保留可审计的解码失败？", "保存source/version、原始bytes或locator、声明/探测encoding、异常类型与策略；关键字段不要silent replace，隔离坏记录并统计accepted/rejected。", ["第19章", "Encoding", "转码"]],
  ["tr5-time-date", "第20章 Time类与Date类", "elapsed duration与calendar arithmetic为什么要分开？", "持续时间比较instant差值；日历加一天受时区/DST影响，不一定等于86400秒。先声明业务意图，再选择Time、Date或时区库操作。", "怎样让时间测试稳定而不依赖真实当前时间？", "把clock/time zone作为依赖注入，固定instant与zone，覆盖DST重复/缺失本地时间、月末和闰年；输出中保留offset/zone语义。", ["第20章", "Time", "Date"]],
  ["tr5-proc", "第21章 Proc类", "Proc与lambda在参数和return上有什么关键差异？", "lambda严格检查参数且return只离开lambda；普通Proc参数较宽松，非lambda Proc中的return可能尝试离开创建它的方法并引发LocalJumpError。", "长期保存回调时怎样处理取消和目标生命周期？", "定义owner/token或generation，取消后拒绝late callback；捕获对象会延长其生命周期，需明确释放引用，并统一回调的成功/错误结果schema。", ["第21章", "Proc", "lambda"]],
  ["tr5-text-processing", "第22章 文本处理", "可维护文本处理管线应分哪些阶段？", "source acquisition、decode、parse、normalize/transform、aggregate、deterministic output和diagnostics；每阶段声明输入输出、边界与错误策略。", "怎样防止大文件、灾难正则或无限输出拖垮工具？", "采用streaming与bounded buffers，限制行/字段/匹配/输出数量，避免高风险回溯模式，设置deadline/cancel并对worst case做基准。", ["第22章", "文本处理", "管线"]],
  ["tr5-postal-code-search", "第23章 检索邮政编码", "怎样证明失败导入没有污染live查询？", "在独立candidate和transaction中导入，任意位置注入异常后断言rollback、candidate未activate、live version/hash/rows/sample query不变，并保留failure report。", "查询层除了参数化SQL还要声明哪些契约？", "声明输入grammar/normalization、exact/prefix/name match、LIKE escape或range、hard limit、stable order、empty/error status、allowed sort字段和dataset provenance。", ["第23章", "CSV", "SQLite"]],
  ["tr5-final-review", "总复习", "四类Ruby故障模型是什么，各追踪什么？", "对象状态追receiver/identity/alias；控制分派追method/block/result/exception；数据解释追range/shape/bytes/encoding/pattern；资源边界追owner/handle/transaction/cleanup。", "全书Capstone至少需要哪些验收场景？", "除正常路径外覆盖缺参、nil、坏编码、quoted newline、重复记录、中途异常、验证失败、数据库忙、重复执行、回滚和shutdown；每项验证结果、状态、资源与provenance不变量。", ["总复习", "故障模型", "capstone"]],
];

export const tr5OfficialChapterQuestions: ReviewQuestion[] = chapters.flatMap(
  ([chapter, title, question1, answer1, question2, answer2, tags]) => [
    {
      id: `${chapter}-1`,
      chapter,
      level: 2,
      question: question1,
      answer: answer1,
      tags: [title, ...tags],
    },
    {
      id: `${chapter}-2`,
      chapter,
      level: 3,
      question: question2,
      answer: answer2,
      tags: [title, ...tags],
    },
  ],
);
