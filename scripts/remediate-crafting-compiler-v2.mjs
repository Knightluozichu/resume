#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "crafting-compiler";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "diagrams");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/crafting-compiler-v2-profiles.json",
);
const SOURCES = {
  authorToc: "https://i.loveruby.net/ja/stdcompiler/toc.html",
  javacc: "https://javacc.github.io/javacc/documentation/grammar.html",
  elf: "https://refspecs.linuxfoundation.org/elf/elf.pdf",
  readelf: "https://sourceware.org/binutils/docs/binutils/readelf.html",
  as: "https://sourceware.org/binutils/docs/as/",
  ld: "https://sourceware.org/binutils/docs/ld/",
};

function m(
  studio,
  boundary,
  axisA,
  levelsA,
  axisB,
  levelsB,
  fault,
  invariant,
  probe,
  signal,
  artifact,
  trap,
  practiceMode = "code",
) {
  return {
    studio,
    boundary,
    axisA: { label: axisA, levels: levelsA },
    axisB: { label: axisB, levels: levelsB },
    fault,
    invariant,
    probe,
    signal,
    artifact,
    trap,
    practiceMode,
  };
}

const MODELS = {
  "crc-official-learning-map": m(
    "116层级编译证据路线台",
    "C♭源文件 → token → AST/绑定 → IR → IA-32 → ELF → 进程",
    "观察层",
    ["前端", "中端", "机器/装载"],
    "样本族",
    ["合法", "边界", "故障"],
    "最终程序碰巧运行却有更早中间产物错误",
    "23个正式单元都能回到唯一输入、第一处分叉和可重建下游证据",
    "sample.cb -> tokens.json -> ast.json -> ir.txt -> sample.s -> sample.o -> sample",
    "116节点覆盖与首处分叉",
    "全链产物与回归索引",
    "只保存最终可执行文件",
    "design",
  ),
  "crc-01-start-compiler": m(
    "最小编译流水线台",
    "source → analyze → emit assembly → assemble → link → run",
    "流水线阶段",
    ["分析", "代码生成", "链接执行"],
    "程序规模",
    ["return常量", "表达式", "函数调用"],
    "旧目标文件让失败编译仍返回正确结果",
    "每一步消费本次输入并产出带哈希的唯一工件",
    "rm -rf build && ./cbc -S sample.cb && as --32 -o sample.o sample.s && ld -m elf_i386 -o sample sample.o",
    "退出码、工件哈希与返回值",
    "最小工具链重建包",
    "运行成功不代表扫描、语义和链接层都正确",
  ),
  "crc-02-cflat-cbc": m(
    "C♭语言—cbc边界台",
    "language contract → compiler phases → runtime assumptions",
    "语言构造",
    ["声明", "表达式", "控制流"],
    "编译出口",
    ["AST", "汇编", "可执行文件"],
    "把C语言或当前gcc行为当成C♭规范",
    "每个C♭构造有语法、类型、布局和诊断边界并映射到cbc阶段",
    "input: minimal.cb\noutputs: tokens+ast+ir+asm\nreference: cflat-contract",
    "构造覆盖与阶段归属",
    "C♭特性—cbc阶段矩阵",
    "相似语法不等于与C完全兼容",
  ),
  "crc-03-parsing-overview": m(
    "解析策略选择台",
    "token stream → grammar → lookahead → parse tree/error",
    "解析方法",
    ["手写", "生成器", "混合"],
    "歧义处理",
    ["改写文法", "局部LOOKAHEAD", "拒绝"],
    "无限增加全局前看掩盖二义性",
    "选择点的共同前缀、结合性和失败位置可由最小串解释",
    "grammar: expression-and-declaration\ncases: valid+ambiguous+truncated\ntrace: enabled",
    "选择轨迹与最小反例",
    "解析策略决策记录",
    "解析器接受样本不证明文法无歧义",
  ),
  "crc-04-lexical-analysis": m(
    "JavaCC词法状态台",
    "characters → lexical state → token/SKIP/MORE → source span",
    "词法规则",
    ["TOKEN", "SKIP", "MORE"],
    "输入类别",
    ["标识符", "字面量", "非法/截断"],
    "最长匹配吞掉后续字符或丢失源位置",
    "字符只被消费一次，token种类、文本和起止位置可重放",
    "javacc Parser.jj\njavac generated/*.java\njava TokenDump samples/lexical.cb",
    "token序列、跨度与词法状态",
    "词法差分与非法输入集",
    "忽略空白不等于可以丢失诊断位置",
  ),
  "crc-05-javacc-parser": m(
    "EBNF与前看决策台",
    "production → expansion choice → LOOKAHEAD → action",
    "前看深度",
    ["1", "局部2", "语义前看"],
    "产生式族",
    ["声明", "语句", "表达式"],
    "JAVACODE黑盒出现在选择点导致不可预测分支",
    "每个选择点有可解释前缀，合法串唯一选择且非法串在最早位置失败",
    "javacc -DEBUG_LOOKAHEAD=true Parser.jj\njava ParserProbe cases.txt",
    "LOOKAHEAD轨迹与ParseException",
    "文法选择点清单",
    "生成成功不等于生成的Java可编译或文法正确",
  ),
  "crc-06-syntax-analysis": m(
    "C♭语法树入口台",
    "definitions/statements/expressions/terms → parse result",
    "语法入口",
    ["定义", "语句", "表达式"],
    "嵌套深度",
    ["单层", "组合", "截断"],
    "表达式优先级或悬挂else生成错误树",
    "树形状保持结合性、优先级、声明边界和完整源跨度",
    "java AstDump samples/syntax.cb\njava AstDump samples/syntax-invalid.cb",
    "括号化AST与第一诊断",
    "语法样本金集",
    "能解析不代表AST形状符合语言语义",
  ),
  "crc-07-javacc-actions-ast": m(
    "Action纯度与AST节点台",
    "matched symbols → JavaCC action → immutable AST node",
    "Action职责",
    ["取值", "建节点", "禁止语义副作用"],
    "失败时点",
    ["匹配前", "Action中", "节点后"],
    "Action提前写符号表导致回溯或失败后状态污染",
    "同一token串只构造一次等价AST，失败路径不残留语义状态",
    "javacc Parser.jj\njava ActionTrace samples/actions.cb",
    "Action调用、节点ID与残留状态",
    "Action—节点所有权记录",
    "解析Action不应承担引用消解和类型检查",
  ),
  "crc-08-build-ast": m(
    "AST结构快照台",
    "expression/statement/declaration → typed node hierarchy",
    "节点族",
    ["表达式", "语句", "声明"],
    "比较方式",
    ["结构", "源跨度", "稳定序列化"],
    "用对象toString快照掩盖字段遗漏和顺序不稳定",
    "节点类型、子女次序、源跨度和声明边界与输入唯一对应",
    "java AstDump --format=json samples/ast.cb\ndiff -u expected/ast.json actual/ast.json",
    "结构差分与源跨度",
    "AST结构金集",
    "AST不是token列表，也不应提前固定机器细节",
  ),
  "crc-09-reference-resolution": m(
    "作用域与引用消解台",
    "declarations → nested scopes → name/type uses → unique binding",
    "作用域形态",
    ["全局", "函数", "嵌套块"],
    "引用结果",
    ["唯一绑定", "遮蔽", "未定义/重复"],
    "按字符串搜索最近声明而忽略命名空间和声明时点",
    "每个引用绑定唯一声明ID，遮蔽和未定义诊断保持源位置",
    "java ResolveDump samples/scope.cb\njava ResolveDump samples/scope-invalid.cb",
    "声明ID、作用域栈与诊断",
    "引用—声明绑定表",
    "名称相同不等于同一个实体",
  ),
  "crc-10-static-type-checking": m(
    "类型规则与转换台",
    "resolved AST → type rules → conversions → diagnostics",
    "表达式类别",
    ["标量", "指针", "左值"],
    "检查结果",
    ["精确匹配", "允许转换", "拒绝"],
    "为让样本通过而静默插入窄化或非法指针转换",
    "每个表达式有确定类型和值类别，转换显式且错误不进入IR",
    "java TypeDump samples/types.cb\njava TypeDump samples/types-invalid.cb",
    "类型推导、转换节点与错误集合",
    "静态类型证明包",
    "类型相容、可转换和表示宽度是不同问题",
  ),
  "crc-11-ir-conversion": m(
    "求值顺序IR台",
    "typed AST → addresses/values → labels → side-effect-safe IR",
    "表达式形态",
    ["纯值", "左值", "有副作用"],
    "控制流",
    ["直线", "分支", "循环"],
    "降低复合赋值时重复求值带副作用的左值",
    "每个副作用执行一次，地址和值区分，控制流目标闭合",
    "java IrDump samples/side-effects.cb\ndiff -u expected/ir.txt actual/ir.txt",
    "IR顺序、标签与副作用计数",
    "IR语义差分包",
    "更低层表示不能改变源语言求值次数",
  ),
  "crc-12-x86-overview": m(
    "IA-32数据与寄存器台",
    "C♭type → size/alignment → register/memory operand",
    "数据宽度",
    ["8位", "16位", "32位"],
    "存放位置",
    ["寄存器", "栈", "静态区"],
    "把x86-64寄存器和ABI默认值混入IA-32主线",
    "操作数宽度、符号扩展、对齐和寄存器破坏符合冻结的IA-32目标",
    "as --32 -o probe.o probe.s\nobjdump -drwC -Mintel probe.o",
    "编码字节、寄存器读写与宽度",
    "IA-32目标契约",
    "架构历史说明不能替代具体ABI合同",
  ),
  "crc-13-x86-assembly": m(
    "GNU as指令编码台",
    "AT&T syntax → instruction/operand → machine bytes → flags",
    "指令族",
    ["传送", "算术/位运算", "控制转移"],
    "操作数边界",
    ["寄存器", "内存", "立即数"],
    "源/目的次序或宽度后缀错误却因测试值偶然相同",
    "汇编、反汇编、标志位和预期状态逐指令一致",
    "as --32 -o probe.o probe.s\nobjdump -drwC probe.o",
    "机器码、操作数与EFLAGS",
    "指令级对照表",
    "汇编器接受指令不证明它实现了预期语义",
  ),
  "crc-14-functions-variables": m(
    "IA-32调用约定台",
    "caller arguments → call → callee frame → return value",
    "调用位置",
    ["调用者", "序言/函数体", "尾声"],
    "变量类别",
    ["参数", "局部", "全局"],
    "破坏被调用者保存寄存器或返回时栈指针不平衡",
    "参数偏移、保存集合、返回值和调用前后ESP满足冻结ABI",
    "objdump -drwC call.o\ngdb --batch -x frame.gdb ./call",
    "ESP/EBP、保存寄存器与返回值",
    "调用帧逐步记录",
    "函数能返回一次不证明嵌套调用约定正确",
  ),
  "crc-15-compile-expressions-statements": m(
    "IR到指令选择台",
    "IR node → x86 DSL → labels/operands → assembly",
    "IR类别",
    ["表达式", "赋值", "跳转"],
    "比较基线",
    ["预测汇编", "反汇编", "执行语义"],
    "只比较汇编文本格式或只比较最终返回值",
    "每个IR节点选择合法模式，标签闭合且反汇编语义与执行结果一致",
    "./cbc -S samples/codegen.cb\nas --32 -o codegen.o codegen.s\nobjdump -drwC codegen.o",
    "IR—指令对应与运行断言",
    "代码生成差分包",
    "文本相似不等于机器语义相同",
  ),
  "crc-16-stack-frame": m(
    "栈帧布局计算台",
    "parameters/locals/temps/alloca → offsets → prologue/epilogue",
    "帧对象",
    ["参数", "局部/临时", "动态分配"],
    "调用深度",
    ["叶函数", "嵌套调用", "递归"],
    "调整临时槽或alloca后未重算全部偏移与恢复路径",
    "所有槽不重叠、对齐满足ABI、每条返回路径恢复相同栈状态",
    "objdump -drwC frame.o\ngdb --batch -x stack.gdb ./frame",
    "帧大小、偏移、ESP平衡与哨兵",
    "栈帧布局表",
    "固定EBP偏移不能掩盖动态栈变化",
  ),
  "crc-17-optimization": m(
    "语义保持优化台",
    "baseline IR/asm → one transform → differential tests",
    "优化层",
    ["局部IR", "控制流", "机器相关"],
    "观察指标",
    ["正确性", "代码尺寸", "运行成本"],
    "删去看似无用但有副作用或未定义行为边界的表达式",
    "优化前后可观察语义一致，收益在固定样本与目标上可复现",
    "./regress --baseline no-opt --candidate one-pass\nsize -A before.o after.o",
    "差分结果、代码尺寸与失败样本",
    "单优化变换证据包",
    "更短汇编不是正确优化的充分条件",
  ),
  "crc-18-object-files": m(
    "ELF可重定位对象台",
    "sections → symbols → relocations → object file",
    "ELF视图",
    ["节", "符号", "重定位"],
    "全局对象",
    [".data", ".bss", "未定义"],
    "把节文件偏移当成运行地址或提前写死未解析地址",
    "节、符号绑定、大小和重定位引用相互一致并可由工具交叉解析",
    "readelf -h -S -s -r sample.o\nobjdump -drwC sample.o\nnm -n sample.o",
    "节/符号/重定位交叉引用",
    "ELF对象证据包",
    "目标文件节与可执行文件段不是同一概念",
  ),
  "crc-19-linking-libraries": m(
    "符号解析与库选择台",
    "objects/archives/shared objects → symbol resolution → relocations",
    "链接方式",
    ["目标文件", "静态库", "共享库"],
    "符号状态",
    ["定义", "未定义", "重复/弱符号"],
    "库顺序或宿主缓存让错误依赖偶然解析",
    "符号来源、库选择、重定位和最终依赖在干净环境可重现",
    "ld -m elf_i386 -Map=link.map -o app *.o\nreadelf -s -r app\nldd app",
    "link map、符号来源与动态依赖",
    "链接决策地图",
    "链接成功不等于选择了预期符号版本",
  ),
  "crc-20-program-loading": m(
    "ELF段映射与加载台",
    "program headers → mmap/protection → dynamic linker → entry",
    "加载阶段",
    ["映射", "重定位", "入口转移"],
    "观察方式",
    ["readelf", "LD_DEBUG", "进程映射"],
    "用节表解释运行期映射或忽略W^X权限",
    "PT_LOAD范围、权限、动态依赖和入口地址与运行映射一致",
    "readelf -l -d app\nLD_DEBUG=libs,reloc ./app\ncat /proc/PID/maps",
    "程序头、加载器轨迹与映射权限",
    "加载过程时间线",
    "加载器主要消费程序头而不是调试用节名",
  ),
  "crc-21-position-independent-code": m(
    "GOT/PLT与PIC台",
    "PIC reference → GOT/PLT → relocation → runtime address",
    "引用对象",
    ["局部", "全局数据", "外部函数"],
    "装载地址",
    ["基线", "随机化", "重定位压力"],
    "在代码段写绝对地址或把某次装载地址固化进结果",
    "不同装载地址下代码段保持可共享，数据/函数引用经正确重定位解析",
    "readelf -r -d pic.so\nobjdump -drwC pic.so\nLD_DEBUG=bindings ./pic-app",
    "重定位类型、GOT/PLT项与绑定轨迹",
    "PIC地址解析表",
    "PIE、PIC和共享库不是同一发布形态",
  ),
  "crc-22-further-reading": m(
    "机制缺口阅读路线台",
    "observed gap → primary reference → reproduction → extension",
    "扩展方向",
    ["前端语言", "优化", "链接加载"],
    "证据深度",
    ["术语", "最小复现", "实现扩展"],
    "按书名堆推荐列表却没有问题和验证产物",
    "每条阅读路线从cbc现有限制出发，产出可运行的最小扩展和回归",
    "gap: choose-one\nprimary_source: specification-or-upstream\nartifact: patch+tests+before-after",
    "问题—资料—实现—回归闭环",
    "扩展学习实验单",
    "阅读完成不等于实现理解",
    "design",
  ),
  "crc-appendix-resources": m(
    "附录来源可重放台",
    "reference → URL/source archive → version → checksum → experiment",
    "资源类型",
    ["参考文献", "在线资料", "源代码"],
    "可用状态",
    ["原始可达", "归档", "替代一手资料"],
    "链接失效后用无版本镜像替换且不披露",
    "每个资源记录身份、版本、访问状态、哈希和所支持的实验",
    "resource: title+author+url\nversion: tag-or-date\narchive: checksum+retrieved-at",
    "资源可达性、版本与哈希",
    "附录资源清单",
    "来源清单不等于授权复制正文",
    "design",
  ),
  "crc-official-final-review": m(
    "C♭端到端故障答辩台",
    "source → token → AST/binding/type → IR → IA-32 → ELF/load",
    "故障域",
    ["前端", "语义/IR", "机器/装载"],
    "发布决定",
    ["通过", "条件通过", "回滚"],
    "拼接不同构建的AST、汇编和ELF形成假证据",
    "116层级以同一源码与工具链指纹重建，首处分叉和回滚条件明确",
    "bundle: tokens+ast+bindings+ir+asm+elf\nidentity: source+toolchain+target\ndecision: pass-or-rollback",
    "全链哈希、首处分叉与回归",
    "全书发布证据包",
    "最终输出正确不能平均掉任何中间层失败",
    "diagnosis",
  ),
};

function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walk(path.join(dir, entry.name))
        : entry.name.endsWith(".mdx")
          ? [path.join(dir, entry.name)]
          : [],
    )
    .sort();
}
function pascal(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}
function nodeAction(concept, index) {
  const slot = index + 1;
  if (/词法|token|扫描|JavaCC|EBNF|语法|解析|action/i.test(concept))
    return `前端槽${slot}用合法、最长匹配、歧义、截断和非法字符样本核对“${concept}”的token、前看、树形与源位置`;
  if (/抽象语法树|AST|引用|消解|类型|中间代码|IR|副作用|左值/i.test(concept))
    return `语义槽${slot}为“${concept}”保存节点ID、声明绑定、类型/值类别、求值顺序和最小错误，失败后禁止产生伪IR`;
  if (/x86|汇编|指令|函数|变量|栈|表达式|语句|优化/i.test(concept))
    return `机器槽${slot}把“${concept}”落实到IA-32宽度、寄存器、栈效应、调用约定与反汇编，用哨兵和差分样本验证`;
  if (/ELF|目标文件|链接|库|加载|地址无关|全局|PIC/i.test(concept))
    return `装载槽${slot}用readelf、objdump、nm、link map与加载器轨迹核对“${concept}”的节/段、符号、重定位、权限和地址解析`;
  if (/参考|在线|源代码|扩展|书籍|语言功能/i.test(concept))
    return `资源槽${slot}把“${concept}”绑定到一手资料、版本、可达状态、最小复现与回归产物，不以阅读列表代替实践`;
  return `流水线槽${slot}将“${concept}”映射为输入、结构化产物、错误合同、第一处分叉和清理后重建断言`;
}
function profilesFor(manifest) {
  const files = walk(CONTENT_ROOT);
  const fullPath = manifest.units.map((unit) => unit.title);
  return files.map((filePath, order) => {
    const parsed = matter(fs.readFileSync(filePath, "utf8"));
    const chapterSlug = path.basename(filePath, ".mdx");
    const sectionSlug = path.basename(path.dirname(filePath));
    const unit =
      order > 0 && order < files.length - 1 ? manifest.units[order - 1] : null;
    const concepts = unit ? unit.concepts.map((item) => item[0]) : fullPath;
    const model = MODELS[chapterSlug];
    if (!model) throw new Error(`缺少章专属模型：${chapterSlug}`);
    const chain = [
      "冻结输入",
      "产出结构",
      "断言不变量",
      "触发首错",
      "清理重建",
    ];
    return {
      filePath,
      sectionSlug,
      chapterSlug,
      order,
      title: String(parsed.data.title),
      description: String(parsed.data.description),
      sourceUnitId: unit?.id ?? null,
      concepts,
      labConcepts:
        concepts.length > 1
          ? concepts
          : [
              concepts[0],
              `${parsed.data.title}失败边界`,
              `${parsed.data.title}重建证据`,
            ],
      chain,
      componentBase: pascal(chapterSlug),
      model: {
        ...model,
        task: `${parsed.data.title}固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变${model.axisA.label}或${model.axisB.label}。`,
      },
    };
  });
}
function wrapper(profile) {
  const props = {
    unitId: profile.chapterSlug,
    title: profile.title,
    concepts: profile.labConcepts,
    chain: profile.chain,
    model: profile.model,
  };
  return `import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";\n\nconst props = ${JSON.stringify(props, null, 2)} as const;\n\nexport function ${profile.componentBase}MapLab() { return <OfficialCraftingCompilerLab {...props} view="structure" />; }\nexport function ${profile.componentBase}ExperimentLab() { return <OfficialCraftingCompilerLab {...props} view="execution" />; }\nexport function ${profile.componentBase}EvidenceLab() { return <OfficialCraftingCompilerLab {...props} view="evidence" />; }\n`;
}
function render(profile) {
  const deep = profile.concepts
    .map(
      (concept, index) =>
        `### ${concept}\n\n**四级证据 ${index + 1}/${profile.concepts.length}。** ${nodeAction(concept, index)}；固定${profile.model.axisB.label}，只改变${profile.model.axisA.label}，以${profile.model.signal}找到第一处分叉并清理重建。`,
    )
    .join("\n\n");
  const practices = profile.concepts
    .map(
      (concept, index) =>
        `${index + 1}. ${concept}：${nodeAction(concept, index)}；用${index % 2 ? profile.model.artifact : profile.model.signal}断言。`,
    )
    .join("\n");
  const terms = [
    profile.model.boundary,
    profile.model.axisA.label,
    profile.model.axisB.label,
    profile.model.signal,
    profile.model.artifact,
  ].map((term, index) => ({
    term,
    definition: `${term}是${profile.title}连接${profile.chain[index]}与可推翻编译结论的章专属坐标，必须记录源码、工具版本、目标与原始产物。`,
  }));
  return `import { ${profile.componentBase}MapLab, ${profile.componentBase}ExperimentLab, ${profile.componentBase}EvidenceLab } from "@/components/mdx/crafting-compiler/diagrams/${profile.chapterSlug}";\nimport { Objectives, Callout, Glossary, GlossaryItem, Term, Exercises, Answer, Stepper, Step, Attribution } from "@/components/mdx/mdx-components";\n\n<Objectives>\n\n- 能解释${profile.title}全部${profile.concepts.length}个正式目录节点在C♭到进程链中的输入、输出和时代边界\n- 能运行“${profile.model.studio}”，一次只改变${profile.model.axisA.label}或${profile.model.axisB.label}\n- 能修改章专属C♭、JavaCC、IR、IA-32汇编或ELF样本，并保存最早结构化分叉\n- 能触发“${profile.model.fault}”，清理派生产物后证明“${profile.model.invariant}”\n\n</Objectives>\n\n{/* CRAFTING_COMPILER_QUALITY_V2 */}\n\n## 为什么从“${profile.model.studio}”开始\n\n${profile.title}沿“${profile.model.boundary}”转换信息。最终进程返回正确值只能证明一条执行路径；${profile.model.studio}保存token、AST、绑定、类型、IR、汇编、符号、重定位或加载轨迹中的适用层，让错误停在第一处分叉。\n\n${profile.title}固定C♭源码、cbc提交、JDK与JavaCC、GNU as/ld/binutils、IA-32目标、链接参数和运行环境，只改变${profile.model.axisA.label}或${profile.model.axisB.label}。交互评分只表达因果，不冒充真实编译器产物。\n\n## 来源、版本与独立重写边界\n\n${profile.title}以青木峰郎维护的[日文原版完整详细目录](${SOURCES.authorToc})限定4部分、22章、86个编号小节、附录和116个正式层级；本站未取得原书正文授权，中文解释、代码、图示、实验和答案均为独立教学重写。\n\n${profile.title}用[JavaCC完整语法文档](${SOURCES.javacc})、[ELF规范](${SOURCES.elf})、GNU [readelf](${SOURCES.readelf})、[as](${SOURCES.as})与[ld](${SOURCES.ld})文档核对技术事实。原书主线是JavaCC、Linux/IA-32、GNU工具与ELF；现代JDK、x86-64、PIE和新版binutils默认值必须单独记录，不能改写原书时代坐标。\n\n## 本章合同与可运行探针\n\n${terms.map(({ term, definition }) => `<Term def=${JSON.stringify(definition)}>${term}</Term>`).join("、")}。\n\n${profile.title}的通过不变量是“${profile.model.invariant}”。实验档案保存源码与期望、cbc提交、工具版本、目标ABI、命令与退出码、所有适用中间产物、标准错误、第一处分叉、清理记录和回归结果。\n\n\`\`\`bash\n${profile.model.probe}\n\`\`\`\n\n<Callout type="warning" title="历史IA-32工具链必须隔离">${profile.title}涉及旧JDK、旧JavaCC、32位链接器、任意目标文件或加载器变量时，在容器或离线虚拟机中运行；固定资源与超时，禁止执行不可信二进制，先检查ELF架构、入口和依赖。</Callout>\n\n## 先预测，再操作三层实验\n\n<Stepper>\n  <Step title="1. 结构与所有权">选择目录节点，标出生产者、数据结构、消费者和禁止越层的结论。<${profile.componentBase}MapLab /></Step>\n  <Step title="2. 单变量转换">固定工具链与样本，只切换${profile.model.axisA.label}或${profile.model.axisB.label}。<${profile.componentBase}ExperimentLab /></Step>\n  <Step title="3. 首错与重建">注入“${profile.model.fault}”，保存首处分叉，清理后从源码重建。<${profile.componentBase}EvidenceLab /></Step>\n</Stepper>\n\n## 官方目录逐项深读\n\n${deep}\n\n## 三个必须主动触发的误区\n\n<Callout type="trap" title="中间产物不能省略">${profile.title}不允许用最终返回值平均掉token、AST、绑定、类型、IR、汇编或ELF层失败；缺少适用中间证据即退回。</Callout>\n\n<Callout type="trap" title="章专属失败样本">${profile.title}主动触发“${profile.model.trap}”，再注入“${profile.model.fault}”。若${profile.model.signal}没有变化，先验证阳性对照和采集链，不能复用旧构建。</Callout>\n\n<Callout type="trap" title="机制与现代默认值分开">${profile.title}的IA-32、非PIE或旧工具行为必须显式冻结；x86-64、PIE、不同JavaCC/JDK和binutils版本的结果只能作为带版本的对照。</Callout>\n\n## 练习、答案与116层级验证\n\n<Exercises>\n\n**问题1：因果隔离。** 怎样测量${profile.model.axisA.label}对${profile.model.signal}的影响？\n\n<Answer>${profile.title}固定源码、cbc提交、目标、${profile.model.axisB.label}和工具链，只把${profile.model.axisA.label}从“${profile.model.axisA.levels[1]}”切到“${profile.model.axisA.levels[2]}”；比较首个结构化差分、退出码和下游停止位置，再复位并重建基线。</Answer>\n\n**问题2：四级覆盖。** 怎样证明本页${profile.concepts.length}个目录节点不是标题复述？\n\n<Answer>\n${practices}\n</Answer>\n\n**问题3：修复证明。** 怎样证明“${profile.model.fault}”已经修复？\n\n<Answer>${profile.title}沿${profile.chain.join("、")}定位首错，只改最小条件；删除旧token、AST、IR、汇编、目标文件与可执行文件，以同一输入重跑，直到“${profile.model.invariant}”恢复且${profile.model.artifact}可由另一位读者复现。</Answer>\n\n</Exercises>\n\n<Glossary>\n${terms.map(({ term, definition }) => `  <GlossaryItem term=${JSON.stringify(term)}>${definition}</GlossaryItem>`).join("\n")}\n</Glossary>\n\n<Attribution mode="independent-rewrite" sourceBasis="outline-only" workTitle="青木峰郎《ふつうのコンパイラをつくろう》/ 中文版《自制编译器》" adaptedUrl="${SOURCES.authorToc}" />\n`;
}
function updateManifest(manifest, profiles) {
  manifest.sourceKind =
    "author-maintained-complete-outline-plus-primary-javacc-elf-and-gnu-tool-documentation";
  manifest.status = "verified-outline-independent-rewrite";
  manifest.verifiedAt = "2026-07-20";
  manifest.sourceAccess = "outline-only";
  manifest.defaultSourceMode = "independent-rewrite";
  manifest.coverage = { formalUnits: 23, outlineNodes: 116, pages: 25 };
  manifest.disclosureNote =
    "作者维护的日文完整详细目录限定4部分、22章、86个编号小节、附录与116个正式层级；未取得原书正文授权。课程代码、解释、交互、图示、故障与答案独立重写，以JavaCC、ELF规范及GNU binutils文档核对技术事实，并明确区分原书Linux/IA-32时代主线与现代x86-64、PIE、JDK和binutils默认值。";
  manifest.factSourcePolicy =
    "每个目录节点必须具备出现、机制解释、章专属可运行探针/交互和练习断言四级证据；最终运行结果不得替代中间产物。";
  manifest.factSourcesVerifiedAt = "2026-07-20";
  manifest.factSources = {
    authorToc: {
      kind: "author-maintained-complete-outline",
      label: "作者完整详细目录",
      url: SOURCES.authorToc,
    },
    javacc: {
      kind: "upstream-parser-generator-documentation",
      label: "JavaCC完整语法文档",
      url: SOURCES.javacc,
    },
    elf: {
      kind: "primary-object-format-specification",
      label: "ELF规范",
      url: SOURCES.elf,
    },
    readelf: {
      kind: "upstream-tool-documentation",
      label: "GNU readelf",
      url: SOURCES.readelf,
    },
    as: {
      kind: "upstream-tool-documentation",
      label: "GNU as",
      url: SOURCES.as,
    },
    ld: {
      kind: "upstream-tool-documentation",
      label: "GNU ld",
      url: SOURCES.ld,
    },
  };
  const byUnit = new Map(
    profiles
      .filter((profile) => profile.sourceUnitId)
      .map((profile) => [profile.sourceUnitId, profile]),
  );
  for (const unit of manifest.units) {
    const profile = byUnit.get(unit.id);
    if (!profile) throw new Error(`manifest单元缺页：${unit.id}`);
    unit.sourceUnitId = unit.id;
    unit.chapterPath = `${profile.sectionSlug}/${profile.chapterSlug}`;
    unit.sourceMode = "independent-rewrite";
    unit.sourceAccess = "outline-only";
    unit.factSourceIds = ["authorToc", "javacc", "elf", "readelf", "as", "ld"];
  }
}
function replaceBookManifest(source, bookSlug, value) {
  const marker = `    ${JSON.stringify(bookSlug)}: `;
  const markerStart = source.indexOf(marker);
  if (markerStart < 0) throw new Error(`manifest 缺少书籍：${bookSlug}`);
  const objectStart = source.indexOf("{", markerStart + marker.length);
  let depth = 0;
  let inString = false;
  let escaped = false;
  let objectEnd = -1;
  for (let index = objectStart; index < source.length; index += 1) {
    const character = source[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') inString = true;
    else if (character === "{") depth += 1;
    else if (character === "}" && --depth === 0) {
      objectEnd = index;
      break;
    }
  }
  if (objectEnd < 0) throw new Error(`manifest 对象未闭合：${bookSlug}`);
  const serialized = JSON.stringify(value, null, 2)
    .split("\n")
    .map((line, index) => (index === 0 ? line : `    ${line}`))
    .join("\n");
  return `${source.slice(0, objectStart)}${serialized}${source.slice(objectEnd + 1)}`;
}

const manifestSource = fs.readFileSync(MANIFEST_PATH, "utf8");
const root = JSON.parse(manifestSource);
const manifest = root.books[BOOK];
const profiles = profilesFor(manifest);
if (profiles.length !== 25) throw new Error(`应有25页，实际${profiles.length}`);
fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify({ version: 2, bookSlug: BOOK, profiles: profiles.map((profile) => ({ ...profile, filePath: path.relative(ROOT, profile.filePath) })) }, null, 2)}\n`,
);
for (const profile of profiles) {
  const parsed = matter(fs.readFileSync(profile.filePath, "utf8"));
  const description = profile.description.replace(
    /\s*(?:覆盖\d+个正式目录层级。|本页覆盖\d+个正式目录层级，以章专属编译探针、首错定位和清理重建验收。)\s*$/,
    "",
  );
  const data = {
    ...parsed.data,
    description: `${description} 本页覆盖${profile.concepts.length}个正式目录层级，以章专属编译探针、首错定位和清理重建验收。`,
    qualityVersion: 2,
    practiceMode: profile.model.practiceMode,
    sourceMode: "independent-rewrite",
    sourceUrl: SOURCES.authorToc,
  };
  const chapter = render(profile).replace(
    "交互评分只表达因果，不冒充真实编译器产物。",
    `本页交互只移动${profile.model.boundary}中的真实对象和状态，不生成置信、风险或证据分数。`,
  );
  fs.writeFileSync(profile.filePath, matter.stringify(chapter, data));
  fs.writeFileSync(
    path.join(COMPONENT_ROOT, `${profile.chapterSlug}.tsx`),
    wrapper(profile),
  );
}
updateManifest(manifest, profiles);
fs.writeFileSync(
  MANIFEST_PATH,
  replaceBookManifest(manifestSource, BOOK, manifest),
);
console.log("已重构25页、23个正式单元、116个目录层级。");
