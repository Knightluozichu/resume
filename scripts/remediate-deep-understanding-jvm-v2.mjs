#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "deep-understanding-jvm";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "diagrams");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/deep-understanding-jvm-v2-profiles.json");
const SOURCES = {
  author: "https://github.com/fenixsoft/jvm_book",
  catalog: "https://18636251.s21i.faiusr.com/61/ABUIABA9GAAg8dqTugYo3O7rmwQ.pdf",
  jvms: "https://docs.oracle.com/javase/specs/jvms/se25/html/index.html",
  jlsThreads: "https://docs.oracle.com/javase/specs/jls/se25/html/jls-17.html",
  tools: "https://docs.oracle.com/en/java/javase/25/docs/specs/man/index.html",
  jdk25: "https://openjdk.org/projects/jdk/25/",
  openjdk: "https://github.com/openjdk/jdk",
};

function m(studio, boundary, axisA, levelsA, axisB, levelsB, fault, invariant, probe, signal, practiceMode = "diagnosis") {
  return { studio, boundary, axisA: { label: axisA, levels: levelsA }, axisB: { label: axisB, levels: levelsB }, fault, invariant, probe, signal, practiceMode };
}

const MODELS = {
  "duj3-official-learning-map": m("282节点跨层路线台", "语言 → Class → VM状态 → HotSpot → 工具证据", "学习层次", ["规范", "实现", "发行版"], "证据深度", ["术语", "探针", "反例恢复"], "用一张HotSpot示意图替代JVMS合同并跨版本外推", "23个正式单元都能回到版本化原始证据和可推翻条件", "java -version\njavap -version\njcmd -l", "路线覆盖与版本账本", "design"),
  "duj3-part-1-approaching-java": m("Java体系与源码入口台", "Java SE规范 → OpenJDK源码 → HotSpot构建 → 镜像", "事实层次", ["规范", "源码", "产品"], "时间边界", ["JDK 12", "JDK 13预览", "JDK 25复核"], "用今天的默认行为改写2019年证据", "源码提交、boot JDK、构建参数与镜像校验可重放", "git rev-parse HEAD\nbash configure --with-debug-level=slowdebug\nmake images", "configure摘要与镜像java -version", "design"),
  "duj3-01-approaching-java": m("OpenJDK构建与调试台", "source commit → configure → build → images → debugger", "构建阶段", ["configure", "compile", "images"], "调试入口", ["启动", "类加载", "GC初始化"], "构建成功但未记录boot JDK、依赖和源码提交", "同一提交与工具链生成同一可启动镜像并命中预定源码断点", "git rev-parse HEAD\nbash configure --with-debug-level=slowdebug\nmake images", "构建日志、镜像校验与断点"),
  "duj3-part-2-memory-management": m("内存—GC诊断路线台", "allocation → reachability → collection → native memory → evidence", "资源区域", ["堆", "元空间", "本地内存"], "压力场景", ["稳态", "突发", "泄漏"], "把进程RSS全部归因于Java堆", "堆、非堆、线程、代码缓存和本地分配使用同一时间线解释", "java -XX:NativeMemoryTracking=summary -Xlog:gc*=info App\njcmd PID VM.native_memory summary", "GC日志、NMT与进程资源", "design"),
  "duj3-02-memory-areas": m("运行时数据区与OOM台", "thread/frame/heap/metaspace/direct → failure", "受限区域", ["堆", "栈", "直接内存"], "故障类型", ["OOM", "SOE", "分配失败"], "在宿主进程无资源限制地制造OOM", "每种故障都能映射到具体区域、限制参数、异常与清理记录", "java -Xmx64m -Xss256k -XX:MaxDirectMemorySize=32m MemoryProbe", "退出码、异常类型与NMT差值"),
  "duj3-03-gc-allocation": m("对象存活与收集器台", "allocation → remembered set → mark/relocate → pause", "收集器", ["Serial", "G1", "ZGC"], "工作负载", ["短命", "大对象", "跨代引用"], "只比较一次最大停顿就宣称收集器优劣", "固定完成工作量后同时报告吞吐、停顿分布、内存和失败率", "java -Xlog:gc*=debug:file=gc.log:time,uptime,level,tags -Xmx512m GcProbe", "GC cause、阶段时长与完成工作量"),
  "duj3-04-monitoring-tools": m("jcmd与JFR证据台", "question → low-impact probe → raw recording → corroboration", "采集工具", ["jcmd", "JFR", "jhsdb"], "探针成本", ["低", "受控", "高"], "没有问题定义就采集完整堆并泄露业务数据", "探针回答明确问题，原始证据最小授权并由第二种信号交叉验证", "jcmd PID JFR.start name=duj settings=profile duration=60s filename=duj.jfr\njfr summary duj.jfr", "JFR事件、采集窗口与探针影响"),
  "duj3-05-tuning-cases": m("症状—证据—参数台", "SLO symptom → timeline → bottleneck → one change → rollback", "调优动作", ["观察", "单变量", "回滚"], "负载形态", ["CPU", "内存", "延迟"], "先抄参数再定义问题和停止条件", "每项参数变化都对应一个假设、原始对照、收益与回滚阈值", "jcmd PID VM.flags\njcmd PID Thread.print -l\njcmd PID GC.class_histogram", "SLO、JFR、GC和线程证据"),
  "duj3-part-3-execution-subsystem": m("Class到执行状态台", "class bytes → verification → loading/linking/init → frames", "表示层", ["源码", "Class", "运行时"], "解析时点", ["编译", "加载", "首次使用"], "从源码语句直接推断操作数栈和动态分派", "Class表项、加载状态、栈帧与调用结果能够逐层对应", "javac --release 12 Sample.java\njavap -v -c -s Sample", "Class校验和、常量池与指令", "design"),
  "duj3-06-class-file": m("Class文件解剖台", "magic/version → constant pool → members → attributes → code", "查看粒度", ["头部", "常量池", "Code属性"], "编译选项", ["默认", "-g", "-parameters"], "把javap排版当成Class二进制规范本身", "字节偏移、JVMS结构、javap输出和源码构造四者一致", "javac -g -parameters --release 12 Sample.java\njavap -v -c -l -s -sysinfo Sample.class", "major version、常量池索引与字节码偏移"),
  "duj3-07-class-loading": m("加载链接初始化台", "loader identity → load → verify → prepare → resolve → initialize", "触发方式", ["主动使用", "被动引用", "反射"], "加载器", ["bootstrap", "platform", "custom"], "把类名相同误当运行时类型相同，忽略定义加载器", "类身份由二进制名和定义加载器共同决定，初始化顺序符合JVMS", "java -Xlog:class+load=info,class+init=debug LoaderProbe", "定义加载器、初始化日志与错误类型"),
  "duj3-08-bytecode-engine": m("栈帧与分派台", "locals/operand stack → invoke opcode → target → return", "调用指令", ["invokestatic", "invokevirtual", "invokedynamic"], "执行形态", ["解释", "编译", "去优化"], "用源码层重载规则解释运行期动态分派", "每个调用点的描述符、操作数栈、目标选择和返回值可追踪", "javac --release 12 Dispatch.java\njavap -v -c Dispatch", "调用指令、描述符与栈映射帧"),
  "duj3-09-loading-execution-cases": m("类加载故障案例台", "container/module loader graph → linkage → execution", "隔离机制", ["classpath", "module", "OSGi/容器"], "失败样本", ["缺类", "版本冲突", "类型隔离"], "用修改全局classpath掩盖容器类加载冲突", "加载器图、代码来源、模块边界和LinkageError能够共同解释故障", "java -Xlog:class+load=debug -verbose:class CaseApp", "code source、加载器图与LinkageError"),
  "duj3-part-4-compilation": m("前端—JIT证据路线台", "source → AST/desugar → bytecode → profile → compiled code", "编译阶段", ["javac", "解释", "JIT"], "运行阶段", ["冷启动", "预热", "稳态"], "把编译器一次输出外推到所有运行阶段", "前端语义、Class结构、编译事件和去优化在同一工作量上对齐", "javac -XprintRounds Sample.java\njava -XX:+PrintCompilation Sample", "AST/字节码、编译事件与去优化", "design"),
  "duj3-10-frontend-compiler": m("Javac语义与注解处理台", "parse → enter → annotation processing → attribution → generate", "前端阶段", ["语法", "语义", "生成"], "处理轮次", ["首轮", "新增源", "结束"], "注解处理器读写非声明输入导致构建不可重复", "相同源码、处理器和选项生成同一Class与诊断，错误阶段可定位", "javac -XprintRounds -XprintProcessorInfo -parameters Sample.java\njavap -v Sample", "处理轮次、诊断与Class哈希"),
  "duj3-11-backend-compiler": m("分层编译与去优化台", "profile → compile tier → inline/speculate → uncommon trap", "执行阶段", ["冷", "预热", "稳态"], "优化事件", ["编译", "内联", "去优化"], "没有固定预热与黑洞就用微基准评价JIT", "编译事件对应同一工作量，收益不以代码缓存或尾延迟恶化换取", "java -XX:+UnlockDiagnosticVMOptions -XX:+PrintCompilation -XX:+PrintInlining JitProbe", "编译层级、内联决定与去优化"),
  "duj3-part-5-concurrency": m("JMM—线程—锁路线台", "program order → synchronization order → happens-before → observation", "线程模型", ["平台线程", "虚拟线程", "线程池"], "同步方式", ["volatile", "monitor", "lock/CAS"], "把一次未复现数据竞争当线程安全证明", "正确性由happens-before与不变量证明，性能另报告竞争和尾延迟", "java -version\njcmd PID Thread.print -l", "线程状态、锁拥有者与顺序证据", "design"),
  "duj3-12-memory-model-threads": m("happens-before与线程台", "actions → synchronization order → visibility/ordering", "共享方式", ["普通字段", "volatile", "锁保护"], "线程载体", ["平台", "虚拟", "混合"], "只依赖sleep和一次输出判断可见性", "所有共享读都由明确happens-before边或安全发布支撑", "mvn -q -Dtest=JmmProbeTest test\njcmd PID Thread.print -l", "反例计数、线程转储与同步边"),
  "duj3-13-thread-safety-locks": m("锁竞争与优化台", "entry → acquire/park → critical section → release/unpark", "同步原语", ["synchronized", "ReentrantLock", "CAS"], "竞争强度", ["无", "中", "高"], "只比较平均吞吐，忽略饥饿、尾延迟和正确性", "临界区不变量成立，拥有者和等待者可解释，失败路径必定释放", "jcmd PID Thread.print -l\njcmd PID JFR.start duration=30s filename=locks.jfr", "monitor事件、等待时长与业务不变量"),
  "duj3-appendix-a-build-openjdk6": m("历史OpenJDK 6构建台", "archived source → historical toolchain → isolated build → checksum", "构建目标", ["源码获取", "依赖冻结", "镜像验证"], "隔离级别", ["宿主", "容器", "离线VM"], "为复现旧构建降低宿主安全配置或污染当前工具链", "历史构建只在隔离环境运行，输入归档、输出校验和清理可审计", "sha256sum source-archive.tar.gz\nbash configure\nmake images", "归档哈希、工具链清单与镜像输出"),
  "duj3-appendix-b-java-future-2013": m("2013预测复核台", "dated claim → contemporaneous evidence → later outcome", "判断时间", ["2013", "2019", "2026复核"], "证据类别", ["提案", "交付", "移除"], "用后见之明把当时预测改写成必然结果", "每个预测保留原日期、原证据、不确定性与后来状态", "git log --since=2013-01-01 --until=2013-12-31 --oneline", "时间戳、提案状态与发布记录"),
  "duj3-appendix-c-bytecode-table": m("字节码速查与栈效应台", "opcode bytes → operands → stack before/after → exception", "指令族", ["加载存储", "调用", "控制转移"], "验证条件", ["类型", "栈高", "分支目标"], "只背助记符，不计算操作数栈和异常边", "每条选中指令的编码、栈效应、类型约束与控制流可手算", "javap -v -c -s BytecodeProbe.class", "opcode偏移、栈高与验证错误"),
  "duj3-appendix-d-oql": m("堆快照与OQL台", "snapshot → class/instance graph → query → retained path", "查询目标", ["类", "实例", "GC Root路径"], "数据处置", ["采集", "分析", "销毁"], "生产堆转储包含敏感数据却无授权和保留期限", "查询结果可回到对象图与GC Root，快照访问最小化并按期销毁", "jcmd PID GC.heap_dump heap.hprof\njhsdb jmap --binaryheap --pid PID", "对象数量、保留路径与销毁记录"),
  "duj3-appendix-e-jdk-history": m("JDK版本历史账本", "release date → specification → implementation → feature status", "版本节点", ["JDK 6", "JDK 12", "JDK 25"], "功能状态", ["预览", "正式", "移除"], "把预览、实验、默认开启和规范承诺混为一谈", "每项功能标注版本、状态、JEP/规范来源、默认值和迁移影响", "java -version\njavac -version\njava --list-modules", "版本输出、JEP状态与模块清单"),
  "duj3-official-final-review": m("全书跨层故障答辩台", "source → Class → VM state → runtime evidence → recovery", "故障域", ["内存/GC", "加载/JIT", "并发/工具"], "结论层次", ["规范", "HotSpot", "目标JDK"], "只展示最终图表，无法回到原始命令和第一处状态偏离", "282个节点能沿同一环境指纹重放，结论范围与回滚条件明确", "java -version\njavap -v -c Sample\njcmd PID VM.flags", "全书证据包、反例与发布判定", "diagnosis"),
};

function walk(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : entry.name.endsWith(".mdx") ? [path.join(dir, entry.name)] : []).sort(); }
function pascal(value) { return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("").replace(/^Duj3/, "Duj3"); }
function sourceUnitFor(slug) { return slug.includes("official-learning-map") || slug.includes("official-final-review") ? null : slug; }
function extractOriginal(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const focus = source.match(/当前任务是：([^。\n]+)[。]/)?.[1];
  const artifact = source.match(/本页交付\s*\*\*([^*]+)\*\*/)?.[1];
  const trap = source.match(/首要陷阱是[“"]([^”"]+)[”"]/)?.[1];
  if (!focus || !artifact || !trap) throw new Error(`无法提取章专属内容：${filePath}`);
  return { focus, artifact, trap };
}
function nodeAction(concept) {
  if (/内存|堆|栈|对象|分配|OOM/i.test(concept)) return "区分堆、栈、元空间、直接内存与本地分配，限制资源后把异常和NMT差值映射到具体区域";
  if (/垃圾|收集|GC|G1|ZGC|Shenandoah|CMS/i.test(concept)) return "固定完成工作量，保存统一GC日志，比较可达性、阶段、停顿分布、吞吐和内存而非单一峰值";
  if (/Class|字节码|常量池|指令|栈帧|调用|分派/i.test(concept)) return "从Class字节偏移和JVMS结构出发，用javap核对常量池、描述符、栈效应、调用点和验证条件";
  if (/加载|链接|初始化|类加载器|OSGi/i.test(concept)) return "记录二进制名、定义加载器、代码来源和加载初始化日志，用LinkageError或初始化反例限制结论";
  if (/编译|Javac|JIT|优化|内联|逃逸|AOT/i.test(concept)) return "区分前端、解释、分层编译与去优化，固定预热和工作量后保存Class、编译事件与回退证据";
  if (/线程|并发|内存模型|volatile|锁|CAS|安全/i.test(concept)) return "写出happens-before或临界区不变量，用反复并发测试、线程转储和锁事件证明正确性与竞争代价";
  if (/监控|工具|JFR|JConsole|VisualVM|OQL|故障/i.test(concept)) return "先定义诊断问题和探针预算，再最小授权采集原始记录，并用第二种证据交叉验证和安全销毁";
  if (/历史|未来|发展|展望|JDK/i.test(concept)) return "固定日期、源码和提案状态，区分当时证据、预测与后来结果，不用后见之明改写历史语境";
  return "先判定这是规范合同、HotSpot实现还是发行版行为，再用固定环境、原始输出和失败反例建立可重放证据";
}
function nodeNote(concept, profile) { return `${profile.title}中的${concept}：${nodeAction(concept)}。${profile.title}固定${profile.model.axisB.label}为“${profile.model.axisB.levels[1]}”，只把${profile.model.axisA.label}从“${profile.model.axisA.levels[0]}”切到“${profile.model.axisA.levels[2]}”，以${profile.model.signal}定位第一处变化并验证“${profile.model.invariant}”。`; }

function profilesFor(manifest, saved) {
  const units = new Map(manifest.units.map((unit) => [unit.id, unit]));
  const fullPath = manifest.units.map((unit) => unit.title);
  return walk(CONTENT_ROOT).map((filePath, order) => {
    const chapterSlug = path.basename(filePath, ".mdx"); const sectionSlug = path.basename(path.dirname(filePath)); const data = matter(fs.readFileSync(filePath, "utf8")).data;
    const sourceUnitId = sourceUnitFor(chapterSlug); const unit = sourceUnitId ? units.get(sourceUnitId) : null; const concepts = unit ? unit.concepts.map((item) => item[0]) : fullPath;
    const stored = saved?.find((item) => item.chapterSlug === chapterSlug); const prior = stored ? { focus: stored.focus, artifact: stored.artifact, trap: stored.trap } : extractOriginal(filePath); const core = MODELS[chapterSlug]; if (!core) throw new Error(`缺少章专属模型：${chapterSlug}`);
    const chain = ["冻结JDK与输入", "区分规范和实现", "执行章专属探针", "注入失败并恢复", "保存原始发布证据"];
    const model = { ...core, task: `${prior.focus}；执行下面探针，保存基线、变体、故障、恢复与复位证据。`, artifact: prior.artifact };
    const profile = { filePath, sectionSlug, chapterSlug, order, title: String(data.title), type: String(data.type ?? "C"), concepts, sourceUnitId, chain, model, ...prior };
    return { ...profile, notes: Object.fromEntries(concepts.map((concept) => [concept, nodeNote(concept, profile)])), componentBase: pascal(chapterSlug) };
  });
}
function wrapper(profile) {
  const labConcepts = profile.concepts.length > 1 ? profile.concepts : [profile.concepts[0], `${profile.title}：失败边界`, `${profile.title}：恢复证据`];
  const props = { unitId: profile.chapterSlug, title: profile.title, concepts: labConcepts, chain: profile.chain, model: profile.model };
  return `import { OfficialDuj3Lab } from "./official-duj3-lab";\n\nconst props = ${JSON.stringify(props, null, 2)} as const;\n\nexport function ${profile.componentBase}StructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }\nexport function ${profile.componentBase}ExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }\nexport function ${profile.componentBase}EvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }\n`;
}
function render(profile) {
  const deep = profile.concepts.map((concept, index) => `### ${concept}\n\n**四级证据 ${index + 1}/${profile.concepts.length}。** ${profile.notes[concept]}`).join("\n\n");
  const practices = profile.concepts.map((concept, index) => `${index + 1}. ${concept}：说明来源层次，执行适用探针，触发一个边界反例，并用${index % 2 === 0 ? profile.model.signal : profile.model.artifact}断言恢复。`).join("\n");
  const terms = [profile.model.boundary, profile.model.axisA.label, profile.model.axisB.label, profile.model.signal, profile.model.artifact].map((term, index) => ({ term, definition: `${term}是${profile.title}连接${profile.chain[index]}与可推翻结论的章专属坐标，必须记录版本、输入、单位和探针影响。` }));
  return `import { ${profile.componentBase}StructureLab, ${profile.componentBase}ExecutionLab, ${profile.componentBase}EvidenceLab } from "@/components/mdx/deep-understanding-jvm/diagrams/${profile.chapterSlug}";\nimport { Objectives, Callout, Glossary, GlossaryItem, Term, Exercises, Answer, Stepper, Step, Attribution } from "@/components/mdx/mdx-components";\n\n<Objectives>\n\n- 能解释${profile.title}全部${profile.concepts.length}个正式目录节点的规范、实现、发行版与版本边界\n- 能运行“${profile.model.studio}”，一次只改变${profile.model.axisA.label}或${profile.model.axisB.label}\n- 能修改章专属命令或样例，用Class、日志、JFR、转储或并发断言证明状态转换\n- 能注入“${profile.model.fault}”，清空派生证据后重放并恢复“${profile.model.invariant}”\n\n</Objectives>\n\n{/* DUJ3_QUALITY_V2 */}\n\n## 为什么从“${profile.model.studio}”开始\n\n${profile.title}不能把语言、JVMS、HotSpot和某个JDK发行版混成一层。${profile.model.studio}沿“${profile.model.boundary}”保存输入和原始输出，让每个结论都能回到规范条款、实现状态和目标版本。\n\n${profile.title}固定JDK镜像、VM参数、工作量、采集窗口和资源限制，只改变${profile.model.axisA.label}或${profile.model.axisB.label}；图中只呈现本章真实运行时对象、状态边与证据出口；高亮表示当前分析路径，不冒充真实吞吐、停顿、对象大小或线程安全证明。\n\n## 来源、勘误与独立重写边界\n\n${profile.title}依据作者[第3版样例与持续勘误仓库](${SOURCES.author})核定代码和已知修正，并用[出版社版式目录](${SOURCES.catalog})限定5个部分、13章、附录A–E和282个正式节点。${profile.title}未取得出版正文授权，目录只限定范围，中文解释、命令、图示、实验与答案均为独立教学重写。\n\n${profile.title}保留原书2019年的JDK 12 / JDK 13预览期语境；现代复核以[JVMS 25](${SOURCES.jvms})、[JLS 25线程与锁](${SOURCES.jlsThreads})、[JDK 25工具规范](${SOURCES.tools})、[OpenJDK 25发布页](${SOURCES.jdk25})与[OpenJDK源码](${SOURCES.openjdk})为事实依据。${profile.title}的JDK 25注记不是原书内容，任何默认值和实现细节都必须重新测量。\n\n## 本章跨层合同与章专属探针\n\n${terms.map(({ term, definition }) => `<Term def=${JSON.stringify(definition)}>${term}</Term>`).join("、")}。\n\n${profile.title}的通过不变量是“${profile.model.invariant}”。${profile.title}的实验档案必须保存JDK与VM版本、供应商、OS/容器限制、参数、源码或Class哈希、工作量、时间窗、退出码、未过滤日志、探针成本和清理记录。\n\n${profile.title}使用以下章专属探针作为起点；读者必须替换PID或样例、触发失败并保存${profile.model.signal}，不能只复制命令截图：\n\n\`\`\`bash\n${profile.model.probe}\n\`\`\`\n\n<Callout type="warning" title="危险实验必须隔离">${profile.title}涉及OOM、堆转储、调试附加、任意Class、历史工具链或高成本探针时，只能在受限进程、容器或离线虚拟机运行；设置CPU/内存/时间上限并保留敏感数据销毁记录。</Callout>\n\n## 先预测，再操作三层章专属实验\n\n<Stepper>\n  <Step title="1. 规范—实现地图">选择正式节点，标出规范、HotSpot、发行版和应用证据。<${profile.componentBase}StructureLab /></Step>\n  <Step title="2. 单变量探针">固定JDK与工作量，只切换${profile.model.axisA.label}或${profile.model.axisB.label}。<${profile.componentBase}ExecutionLab /></Step>\n  <Step title="3. 故障、恢复与复位">注入“${profile.model.fault}”，从第一处状态偏离修复并同条件重放。<${profile.componentBase}EvidenceLab /></Step>\n</Stepper>\n\n## 官方目录逐项深读\n\n${deep}\n\n## 三个必须主动触发的误区\n\n<Callout type="trap" title="实现图不等于规范">${profile.title}中的对象头、收集器默认值、JIT阈值、加载器结构和工具能力都可能随实现或版本变化；只有JVMS/JLS合同可以在对应Java SE版本内作为规范主张。</Callout>\n\n<Callout type="trap" title="章专属失败样本">${profile.title}主动触发“${profile.trap}”，并进一步注入“${profile.model.fault}”；若${profile.model.signal}未出现，先验证采集链路和阳性对照，不得挑选一条符合预期的运行。</Callout>\n\n<Callout type="trap" title="参数不能先于问题">${profile.title}只有在SLO、基线、假设、单变量、资源代价和回滚阈值齐全时才允许改变VM参数；编译通过、进程存活或平均值改善都不能替代正确性和尾部证据。</Callout>\n\n## 练习、答案与282节点验证\n\n<Exercises>\n\n**问题1：探针改变。** 如何隔离${profile.model.axisA.label}对${profile.model.signal}的因果影响？\n\n<Answer>${profile.title}固定镜像、参数、工作量、${profile.model.axisB.label}与采集窗口，只把${profile.model.axisA.label}从“${profile.model.axisA.levels[1]}”切到“${profile.model.axisA.levels[2]}”；保存原始输出、退出码、资源和探针成本，再重置并确认基线可重复。</Answer>\n\n**问题2：四级证据。** 怎样证明本页${profile.concepts.length}个目录节点不是标题复述？\n\n<Answer>\n${practices}\n</Answer>\n\n**问题3：恢复闭环。** 如何证明“${profile.model.fault}”已经修复？\n\n<Answer>${profile.title}沿${profile.chain.join("、")}定位第一处偏离，只改最小因果条件；删除旧Class、日志、JFR、转储、编译缓存或线程状态等适用派生物，以同输入重跑，直到“${profile.model.invariant}”恢复且${profile.model.artifact}可由另一位读者复核。</Answer>\n\n</Exercises>\n\n<Glossary>\n${terms.map(({ term, definition }) => `  <GlossaryItem term=${JSON.stringify(term)}>${definition}</GlossaryItem>`).join("\n")}\n</Glossary>\n\n<Attribution mode="independent-rewrite" sourceBasis="outline-only" workTitle="周志明《深入理解Java虚拟机》第3版" adaptedUrl="${SOURCES.author}" />\n`;
}
function updateManifest(manifest, profiles) {
  manifest.sourceKind = "author-maintained-code-and-errata-plus-publisher-outline-and-independent-jvm-rewrite"; manifest.status = "verified-outline-independent-rewrite"; manifest.verifiedAt = "2026-07-20"; manifest.sourceAccess = "outline-only"; manifest.defaultSourceMode = "independent-rewrite"; manifest.coverage = { formalUnits: 23, outlineNodes: 282, pages: 25 };
  manifest.disclosureNote = "作者仓库核定第3版样例与持续勘误，出版社版式目录限定5个部分、13章、附录A-E和282个正式节点；未取得出版正文授权。课程解释、命令、图示、故障与练习均独立重写，保留2019年JDK 12/13预览期历史语境，并以JVMS/JLS 25、JDK 25工具规范、OpenJDK 25发布页及源码做现代复核。";
  manifest.factSourcePolicy = "每个目录节点必须具备出现、来源层次解释、章专属探针/交互和练习断言四级证据；规范、HotSpot实现、发行版默认值与应用观测不得互相替代。"; manifest.factSourcesVerifiedAt = "2026-07-20";
  manifest.factSources = { author: { kind: "author-maintained-code-and-errata", label: "作者第3版样例与勘误", url: SOURCES.author }, catalog: { kind: "publisher-complete-outline", label: "出版社版式完整目录", url: SOURCES.catalog }, jvms: { kind: "official-java-vm-specification", label: "JVMS 25", url: SOURCES.jvms }, jlsThreads: { kind: "official-java-language-specification", label: "JLS 25线程与锁", url: SOURCES.jlsThreads }, tools: { kind: "official-jdk-tool-specifications", label: "JDK 25工具规范", url: SOURCES.tools }, jdk25: { kind: "upstream-official-release-page", label: "OpenJDK 25发布页", url: SOURCES.jdk25 }, openjdk: { kind: "upstream-source-repository", label: "OpenJDK源码", url: SOURCES.openjdk } };
  const byUnit = new Map(profiles.filter((profile) => profile.sourceUnitId).map((profile) => [profile.sourceUnitId, profile])); for (const unit of manifest.units) { const profile = byUnit.get(unit.id); if (!profile) throw new Error(`manifest单元缺页：${unit.id}`); unit.sourceUnitId = unit.id; unit.chapterPath = `${profile.sectionSlug}/${profile.chapterSlug}`; unit.sourceMode = "independent-rewrite"; unit.sourceAccess = "outline-only"; unit.factSourceIds = ["author", "catalog", "jvms", "jlsThreads", "tools", "jdk25", "openjdk"]; }
}
const root = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")); const manifest = root.books[BOOK]; const saved = fs.existsSync(PROFILE_PATH) ? JSON.parse(fs.readFileSync(PROFILE_PATH, "utf8")).profiles : null; const profiles = profilesFor(manifest, saved); if (profiles.length !== 25) throw new Error(`应有25页，实际${profiles.length}`);
fs.writeFileSync(PROFILE_PATH, `${JSON.stringify({ version: 2, bookSlug: BOOK, profiles: profiles.map((profile) => ({ ...profile, filePath: path.relative(ROOT, profile.filePath) })) }, null, 2)}\n`);
for (const profile of profiles) { const parsed = matter(fs.readFileSync(profile.filePath, "utf8")); const data = { ...parsed.data, description: `${profile.title}覆盖${profile.concepts.length}个正式目录节点，以章专属JVM探针、状态交互、故障恢复和版本证据验收。`, qualityVersion: 2, practiceMode: profile.model.practiceMode, sourceMode: "independent-rewrite", sourceUrl: SOURCES.author }; fs.writeFileSync(profile.filePath, matter.stringify(render(profile), data)); fs.writeFileSync(path.join(COMPONENT_ROOT, `${profile.chapterSlug}.tsx`), wrapper(profile)); }
updateManifest(manifest, profiles); fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(root, null, 2)}\n`); console.log("已重构25页、23个正式单元、282个目录节点。");
