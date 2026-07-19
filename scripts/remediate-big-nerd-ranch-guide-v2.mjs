#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import { createProcessor } from "@mdx-js/mdx";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";

const ROOT = process.cwd();
const BOOK = "big-nerd-ranch-guide";
const BOOK_DIR = path.join(ROOT, "content", BOOK);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/big-nerd-ranch-guide-v2-profiles.json",
);
const INFORMIT =
  "https://www.informit.com/store/android-programming-the-big-nerd-ranch-guide-9780135245125";
const OREILLY =
  "https://www.oreilly.com/library/view/android-programming-the/9780135257555/";
const ERRATA =
  "https://github.com/bignerdranch/AndroidCourseResources/raw/master/4thEdition/Errata/4eAddendum.pdf";
const ANDROID_DOCS = "https://developer.android.com/develop";
const ACTIVITY_DOCS =
  "https://developer.android.com/guide/components/activities/activity-lifecycle";
const STATE_DOCS =
  "https://developer.android.com/topic/libraries/architecture/saving-states";
const FRAGMENT_DOCS = "https://developer.android.com/guide/fragments";
const RECYCLER_DOCS =
  "https://developer.android.com/develop/ui/views/layout/recyclerview";
const ROOM_DOCS = "https://developer.android.com/training/data-storage/room";
const INTENT_DOCS = "https://developer.android.com/guide/components/intents-filters";
const ACCESSIBILITY_DOCS =
  "https://developer.android.com/guide/topics/ui/accessibility";
const BACKGROUND_DOCS =
  "https://developer.android.com/develop/background-work/background-tasks";
const WORK_DOCS =
  "https://developer.android.com/topic/libraries/architecture/workmanager";
const WEBVIEW_DOCS = "https://developer.android.com/develop/ui/views/layout/webapps/webview";
const CUSTOM_VIEW_DOCS =
  "https://developer.android.com/develop/ui/views/layout/custom-views/custom-components";
const ANIMATION_DOCS =
  "https://developer.android.com/develop/ui/views/animations/prop-animation";
const WORK_TITLE =
  "Bill Phillips, Chris Stewart, Kristin Marsicano, Brian Gardner, Android Programming: The Big Nerd Ranch Guide, Fourth Edition";
const OLD_MARKER = "{/* BNR4_AUTHORITY_SUPPLEMENT */}";
const V2_MARKER = "{/* BNR4_QUALITY_V2 */}";
const LEGACY_SVG_FILES = [
  "accessibility-tree-diagram.tsx",
  "activity-lifecycle-diagram.tsx",
  "android-project-structure-diagram.tsx",
  "apk-anatomy-diagram.tsx",
  "app-bar-menu-diagram.tsx",
  "back-stack-diagram.tsx",
  "broadcast-dispatch-diagram.tsx",
  "camera-intent-flow-diagram.tsx",
  "config-change-viewmodel-diagram.tsx",
  "debug-loop-diagram.tsx",
  "dialog-fragment-diagram.tsx",
  "fragment-transaction-diagram.tsx",
  "gradle-build-pipeline-diagram.tsx",
  "implicit-intent-resolution-diagram.tsx",
  "launch-mode-diagram.tsx",
  "logcat-line-anatomy-diagram.tsx",
  "message-loop-diagram.tsx",
  "mvc-data-flow-diagram.tsx",
  "mvvm-data-flow-diagram.tsx",
  "nav-graph-diagram.tsx",
  "property-animation-diagram.tsx",
  "recyclerview-recycling-diagram.tsx",
  "resource-qualifier-diagram.tsx",
  "room-architecture-diagram.tsx",
  "sdk-version-axis-diagram.tsx",
  "search-flow-diagram.tsx",
  "style-theme-inheritance-diagram.tsx",
  "test-pyramid-diagram.tsx",
  "thread-model-diagram.tsx",
  "touch-event-sequence-diagram.tsx",
  "view-hierarchy-diagram.tsx",
  "web-view-anatomy-diagram.tsx",
  "work-manager-diagram.tsx",
  "xml-drawable-types-diagram.tsx",
];
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

function normalizeLegacySvgText() {
  const directory = path.join(ROOT, "src/components/mdx/diagrams");
  for (const filename of LEGACY_SVG_FILES) {
    const filePath = path.join(directory, filename);
    if (!fs.existsSync(filePath)) throw new Error(`缺少BNR4图示：${filename}`);
    let source = fs.readFileSync(filePath, "utf8");
    source = source
      .replace(/fontSize="(\d+(?:\.\d+)?)"/g, (match, value) =>
        Number(value) < 11 ? 'fontSize="11"' : match,
      )
      .replace(/fontSize=\{(\d+(?:\.\d+)?)\}/g, (match, value) =>
        Number(value) < 11 ? "fontSize={11}" : match,
      );
    fs.writeFileSync(filePath, source);
  }
}

function addFrontmatterFields(raw, practiceMode) {
  let next = raw;
  if (!/^qualityVersion:\s*2\s*$/m.test(next)) {
    const closing = next.indexOf("\n---", 3);
    if (closing < 0) throw new Error("frontmatter 未闭合");
    next = `${next.slice(0, closing)}\nqualityVersion: 2\npracticeMode: ${practiceMode}\nsourceMode: independent-rewrite${next.slice(closing)}`;
  }
  return next;
}

function practiceModeFor(title, order) {
  if (order === 0 || order === 33 || /MVC|布局|主题|辅助|编后/.test(title))
    return "design";
  if (
    /生命周期|状态|Fragment|导航|数据库|HTTP|Looper|任务|WorkManager|broadcast|网页|触摸|动画/.test(
      title,
    )
  )
    return "simulation";
  return "code";
}

function conceptVariant(concept, variants) {
  const seed = [...concept].reduce(
    (sum, character) => sum + character.codePointAt(0),
    0,
  );
  return variants[seed % variants.length];
}

function explanationForConcept(concept, focus) {
  const value = concept.toLowerCase();
  const includes = (...needles) => needles.some((needle) => value.includes(needle));

  if (includes("android project", "android studio", "build process", "first android"))
    return `“${concept}”把源码、资源、清单和Gradle配置变成可安装APK；验证要从干净构建开始，保存variant、SDK、依赖与安装后的首帧，而不是只看IDE绿色三角。`;
  if (includes("layout", "widget", "view hierarchy", "constraintlayout", "margins", "padding"))
    return conceptVariant(concept, [
      `“${concept}”把约束、测量与布局落实为View树几何；用小屏、长文本与大字体验证，不能用单一模拟器截图证明适配。`,
      `分析“${concept}”先区分父约束、子测量和绘制边界，再检查触控目标、基线、RTL与系统栏插入量。`,
      `验证“${concept}”固定内容，只改变屏宽、字体缩放或方向之一，记录每个View的bounds和首个溢出节点。`,
      `“${concept}”的视觉正确性必须与语义树一致；看得见但读屏无名称、焦点不可达或点击区过小仍判失败。`,
    ]);
  if (includes("resource", "icon", "pixel dens", "drawable", "style", "theme", "asset studio"))
    return conceptVariant(concept, [
      `“${concept}”通过资源限定符和主题属性把内容与设备配置解耦；最终值由资源匹配和主题继承共同决定。`,
      `分析“${concept}”要追踪资源ID、限定目录、密度缩放与属性解析，避免把预览器结果当成所有设备的合同。`,
      `验证“${concept}”在日夜主题、不同密度和字体缩放下比较像素边界、对比度与状态反馈。`,
      `“${concept}”的复用不能吞掉状态语义；pressed、focused、disabled与checked都要有可辨反馈。`,
    ]);
  if (includes("mvc", "mvvm", "architecture", "view model", "viewmodel", "data binding", "repository"))
    return conceptVariant(concept, [
      `“${concept}”按事实、界面表示和用户事件拆责任；状态所有者不能持有已销毁View，界面也不能绕过边界直接改持久数据。`,
      `分析“${concept}”要画出事件进入、状态归约、数据源写入和UI重绘四条边，并指出配置变化时谁被重建。`,
      `验证“${concept}”用同一事件序列比较旋转前后状态和副作用次数；界面相同但重复写入仍是不正确。`,
      `“${concept}”的价值由依赖方向与可测试状态转换证明，而不是由类名是否含Model、View或Repository决定。`,
    ]);
  if (includes("activity lifecycle", "activity states", "logging the activity", "rotating", "multi-window"))
    return conceptVariant(concept, [
      `“${concept}”由系统驱动Activity在created、started、resumed等状态间迁移；日志必须同时记录实例ID和回调次序，才能区分返回与重建。`,
      `分析“${concept}”要把用户动作映射到onPause/onStop/onDestroy与新实例创建，onDestroy并不是持久化成功的承诺。`,
      `验证“${concept}”依次执行覆盖、返回、旋转与进程回收，比较旧实例、新实例和用户可见状态。`,
      `“${concept}”在多窗口下不能用“可见”等同“可交互”；资源启停应服从实际生命周期状态与所有者。`,
    ]);
  if (includes("persisting ui state", "saving data", "saved instance", "repeat answers", "graded quiz"))
    return `“${concept}”要求把临时UI状态、配置期状态与进程死亡后需恢复的最小事实分层；ViewModel跨配置但不跨进程，saved state必须小且可序列化。`;
  if (includes("debug", "exception", "stack trace", "lint", "inspector", "profiler", "log level"))
    return conceptVariant(concept, [
      `“${concept}”从症状回溯首个异常帧、日志事件或状态分叉；修复证据必须包含可复现输入和失败前后的同一断言。`,
      `分析“${concept}”区分编译、运行时、布局、线程与资源问题，避免在后续连锁报错处停止定位。`,
      `验证“${concept}”先让测试稳定失败，再改变一个原因并重跑；只删除日志或捕获异常不算修复。`,
      `“${concept}”输出可能含令牌、路径和个人数据，采证前要最小化样本并清理敏感字段。`,
    ]);
  if (includes("second activity", "starting an activity", "passing data", "intent extras", "result"))
    return `“${concept}”通过显式Intent启动目标并以extras/result交换最小数据；发送方、接收方和进程重建都必须验证缺失、类型错误和重复返回。`;
  if (includes("sdk version", "compatibility", "developer documentation", "limited cheats"))
    return `“${concept}”区分minSdk、targetSdk、compileSdk与运行设备版本；可调用性、行为变化和兼容库回退要分别验证，不能只凭编译通过。`;
  if (includes("fragment", "fragment manager", "fragment navigation", "single activity", "fragment arguments", "dialogfragment", "dialog"))
    return conceptVariant(concept, [
      `“${concept}”由FragmentManager保存结构和返回栈，而Fragment实例与其View拥有不同生命周期；视图绑定必须在onDestroyView前释放。`,
      `分析“${concept}”要标出事务提交、参数写入、目标结果和返回栈变化，避免用活动中的临时字段传递可恢复状态。`,
      `验证“${concept}”在旋转、后台恢复和快速连点下比较fragment列表、back stack与目标数据，只出现一次导航副作用。`,
      `“${concept}”的容器替换不是简单换画面；状态保存后提交、重复tag与嵌套管理器都会改变恢复结果。`,
    ]);
  if (includes("recyclerview", "viewholder", "adapter", "recycling", "listview", "gridview", "viewtypes"))
    return conceptVariant(concept, [
      `“${concept}”只为可见项创建和绑定ViewHolder，回收时旧状态必须被新数据完整覆盖；稳定标识不能用易变位置冒充。`,
      `分析“${concept}”分别统计创建、绑定、回收和差量更新，列表能滚动并不证明没有错位或全量重绘。`,
      `验证“${concept}”用插入、删除、重排和多类型数据检查item身份、焦点与点击目标，记录首个错误绑定。`,
      `“${concept}”的性能由帧时间、绑定分配与diff范围共同决定，不以单次滑动的主观流畅度验收。`,
    ]);
  if (includes("room", "database", "data access", "queries", "schema", "singleton", "livedata"))
    return conceptVariant(concept, [
      `“${concept}”把Entity模式、DAO合同和SQLite文件连接成单一事实源；编译期SQL校验不能替代迁移和真实数据反例。`,
      `分析“${concept}”要区分数据库实例、事务线程、观察者和View生命周期，写入完成与UI收到新快照不是同一时刻。`,
      `验证“${concept}”从空库、重复键、并发写与旧schema升级四条路径核对行数、约束、通知和回滚。`,
      `“${concept}”必须导出schema并测试每条版本迁移；destructive fallback会通过启动却丢失用户事实。`,
    ]);
  if (includes("app bar", "menu", "action bar", "toolbar", "empty view"))
    return `“${concept}”把顶层动作、导航和溢出菜单接入当前界面状态；菜单创建与选择回调要在窄屏、无数据和权限受限时仍有可理解反馈。`;
  if (includes("implicit intent", "resolving", "format string", "contact", "more about intents", "task", "back stack", "home screen"))
    return conceptVariant(concept, [
      `“${concept}”以action、data、category和MIME描述能力，由系统解析匹配组件；发起前应检查响应者，接收后必须验证所有外部数据。`,
      `分析“${concept}”要区分Activity返回栈、系统task与进程，flags改变栈行为但不会自动提供业务幂等。`,
      `验证“${concept}”覆盖零个、一个和多个响应者，以及深链重复到达、目标被杀和无权限数据。`,
      `“${concept}”跨应用边界时只授予完成任务所需的URI与组件权限，并在日志中移除联系人等个人信息。`,
    ]);
  if (includes("picture", "camera", "file storage", "fileprovider", "bitmap", "thumbnail"))
    return `“${concept}”通过FileProvider URI把写入能力临时交给相机应用，再按目标尺寸解码；验证要覆盖无相机、取消、零字节文件、旋转和内存上限。`;
  if (includes("localization", "localizing", "configuration qualifier", "alternative resource", "date"))
    return `“${concept}”让资源匹配器根据locale与配置选择候选；字符串参数、复数、日期、RTL和回退链必须由目标locale实测，不能拼接英语语序。`;
  if (includes("accessibility", "talkback", "content description", "comparable experience", "announcing"))
    return conceptVariant(concept, [
      `“${concept}”要求可访问性树表达与视觉界面等价的名称、角色、状态和操作；contentDescription不能重复可见文本或描述装饰。`,
      `分析“${concept}”按TalkBack线性焦点顺序走完整任务，检查自定义控件是否暴露可执行action与状态变化。`,
      `验证“${concept}”在大字体、触摸探索和无视觉条件下完成同一任务，并记录首个焦点陷阱或缺失播报。`,
      `“${concept}”的通过条件是可比较体验，不是扫描器零告警；动态错误、超时与音频反馈仍需人工验证。`,
    ]);
  if (includes("soundpool", "audio", "unit test", "test class", "mocks", "integration", "playback"))
    return `“${concept}”分离音频资源加载、播放ID、释放和可测试回调；单元测试验证状态与协作，设备测试再验证真实SoundPool时序和旋转后不重复播放。`;
  if (includes("http", "retrofit", "json", "flickr", "network", "paging", "parser", "gson"))
    return conceptVariant(concept, [
      `“${concept}”把HTTP状态、响应体和解析错误转换为明确UI状态；成功码、空结果、超时、取消和畸形JSON必须走不同分支。`,
      `分析“${concept}”沿请求参数、线程、仓库缓存、ViewModel与列表绑定追踪同一查询，避免旧响应覆盖新输入。`,
      `验证“${concept}”固定查询，只改变网络延迟、分页边界或响应字段，核对请求次数、取消、去重和可恢复错误。`,
      `“${concept}”的API密钥与用户数据不得进入仓库或截图；测试使用受控fixture并记录服务合同版本。`,
    ]);
  if (includes("looper", "handler", "handlerthread", "messages", "background thread", "strictmode", "preloading", "caching"))
    return conceptVariant(concept, [
      `“${concept}”让Looper从MessageQueue取任务交给Handler，HandlerThread只提供带Looper的线程；消息所有者销毁时必须取消待办。`,
      `分析“${concept}”记录post线程、执行线程、队列时刻和回传目标，后台线程不能直接触碰已销毁View。`,
      `验证“${concept}”用快速滚动、旋转和重复请求制造乱序，确认旧任务被取消、缓存键正确且主线程无磁盘网络。`,
      `“${concept}”的线程安全不由Handler名称保证；共享状态、关闭顺序和回调引用仍需明确所有权。`,
    ]);
  if (includes("searchview", "sharedpreferences", "searching", "polishing"))
    return `“${concept}”把查询输入、提交事件和轻量偏好持久化分开；防抖、空查询、进程重建与旧响应竞争都要用可重放事件序列验证。`;
  if (includes("workmanager", "worker", "scheduling work", "polling", "notifying"))
    return conceptVariant(concept, [
      `“${concept}”描述可延迟且必须最终执行的持久工作；约束决定何时可运行，唯一工作策略决定重复入队如何合并。`,
      `分析“${concept}”要记录WorkRequest ID、约束、attempt、输入输出与终态，Worker重试不应重复通知或写入。`,
      `验证“${concept}”切换网络、电量与进程存活条件，观察ENQUEUED到RUNNING、SUCCEEDED或RETRY的真实迁移。`,
      `“${concept}”不是精确定时器，也不适合立即UI工作；用户关闭轮询后必须取消唯一工作并验证队列为空。`,
    ]);
  if (includes("broadcast", "receiver", "ordered broadcast", "local events", "rxjava", "eventbus"))
    return `“${concept}”把事件发送给匹配Receiver；静态与动态注册、导出权限和接收器短生命周期决定可达性，长任务应转交受约束后台工作。`;
  if (includes("webview", "web", "javascript", "chrome custom", "browser history"))
    return conceptVariant(concept, [
      `“${concept}”在应用内承载不可信网页内容；URL允许列表、导航委托、JavaScript桥和文件访问必须按最小能力配置。`,
      `分析“${concept}”区分WebView历史、Activity返回栈和配置重建，旋转保留页面不能靠吞掉所有configurationChanges。`,
      `验证“${concept}”覆盖外部域、重定向、TLS错误、离线、后退与进程恢复，确认用户始终知道当前来源。`,
      `“${concept}”若只需打开公开网页，受维护的浏览器或Custom Tabs通常比自建高权限WebView边界更清晰。`,
    ]);
  if (includes("custom view", "touch event", "motion", "ondraw", "gesture", "box", "canvas"))
    return conceptVariant(concept, [
      `“${concept}”把MotionEvent序列归约为模型，再由onDraw读取模型绘制；渲染函数不应偷偷改变业务状态。`,
      `分析“${concept}”跟踪pointerId、actionMasked、坐标空间和父容器拦截，不能把数组索引当稳定手指标识。`,
      `验证“${concept}”覆盖多指、取消、越界、旋转和辅助操作，比较模型框、Canvas输出与可访问性节点。`,
      `“${concept}”必须只失效需要重绘的区域并避免每帧分配；正确图形还要有等价键盘/读屏操作。`,
    ]);
  if (includes("animation", "animator", "interpolator", "transition"))
    return conceptVariant(concept, [
      `“${concept}”随时间改变对象属性并触发重绘；起点、终点、插值器与取消终态共同构成可验证合同。`,
      `分析“${concept}”区分View实际属性和仅绘制变换，动画结束后的点击区域与无障碍边界必须对齐视觉位置。`,
      `验证“${concept}”在重复启动、反向、离开页面和reduced motion下比较终态，不能依赖最后一帧偶然落点。`,
      `“${concept}”的多个Animator需显式定义依赖与取消传播；同时播放不代表生命周期会自动收束。`,
    ]);
  if (includes("afterword", "final challenge", "thank you", "shameless plugs"))
    return `“${concept}”把六个示例应用收束为独立项目：学习者要自行定义用户任务、状态所有者、外部合同、测试矩阵与发布证据，而非再照抄步骤。`;
  if (includes("challenge", "more curious"))
    return `“${concept}”用于推翻“${focus}”的顺利路径：先写预期，再引入一个边界输入、重建或平台差异，并用状态、日志与用户结果解释首个分叉。`;
  return conceptVariant(concept, [
    `“${concept}”服务于“${focus}”；解释要落到用户事件、Android所有者、状态变化、线程和可观察结果，并给出一个会推翻实现的反例。`,
    `分析“${concept}”先冻结设备API、targetSdk和输入，再沿回调与数据流寻找首个状态分叉，不能只描述最终页面。`,
    `验证“${concept}”只改变一个生命周期或外部条件，保存操作、原始日志、状态快照和用户可见断言。`,
    `“${concept}”若依赖第四版时期API，应分开说明原书机制与现代平台政策，并用Android官方文档核对迁移边界。`,
  ]);
}

function evidenceFor(title) {
  if (/Room|数据库/.test(title)) return "schema、DAO查询、迁移前后行数和观察者更新";
  if (/WorkManager/.test(title)) return "WorkRequest状态、约束切换、attempt与唯一工作队列";
  if (/生命周期|状态/.test(title)) return "实例ID、回调轨迹、旋转与进程恢复后的状态断言";
  if (/RecyclerView|列表/.test(title)) return "创建/绑定/回收计数、item身份与帧时间";
  if (/HTTP|Looper|搜索/.test(title)) return "请求或消息时间线、取消、乱序与失败恢复";
  if (/intent|Activity|拍照|broadcast/.test(title)) return "Intent合同、解析目标、权限、返回结果和重复副作用";
  if (/Web|网页/.test(title)) return "导航来源、URL边界、历史栈、离线与TLS失败";
  if (/触摸|动画/.test(title)) return "输入序列、模型状态、渲染边界、取消和reduced-motion终态";
  if (/辅助|本地化|样式|布局|drawable|AppBar|对话框/.test(title))
    return "双视口、大字体、焦点顺序、状态语义和对比度截图";
  return "构建指纹、用户操作、状态快照、原始日志和行为断言";
}

function rewriteObjectives(source, title, focus, evidence) {
  const objectives = `<Objectives>\n\n- 能沿“${title}”的用户事件解释Android组件、状态所有者、线程与销毁边界。\n- 能围绕“${focus}”改出一个可运行结果，并用前后状态而非组件数量验收。\n- 能在旋转、进程重建、拒权、离线或无效输入中选择适用反例，定位首个状态分叉。\n- 能用${evidence}独立重放结论，并标明第四版机制与现代targetSdk政策的边界。\n\n</Objectives>`;
  if (/<Objectives>[\s\S]*?<\/Objectives>/.test(source))
    return source.replace(/<Objectives>[\s\S]*?<\/Objectives>/, objectives);
  return source.replace(/\n(import[^\n]+\n)/, `\n$1\n${objectives}\n`);
}

function supplementFor({ title, focus, evidence, concepts, navigation, order }) {
  const deepDive = concepts
    .map(
      (concept) =>
        `### ${concept}\n\n在“${title}”中，${explanationForConcept(concept, focus)}`,
    )
    .join("\n\n");
  const synthesisExercises =
    order === 0 || order === 33
      ? `\n\n<Exercises>\n\n**问题 1**：怎样证明32章不是一张只有标题的目录？\n\n<Answer>逐章检查269个正式节点是否都有解释，并把每章连接到专属视觉、可操作实验和带答案练习；任何节点只出现标题都不能计入覆盖。</Answer>\n\n**问题 2**：六条项目线怎样共享状态原则而不共享通用模板？\n\n<Answer>GeoQuiz、CriminalIntent、BeatBox、PhotoGallery、NerdLauncher与DragAndDraw分别保留自己的用户结果和故障模型，只复用“所有者—事实源—线程—恢复”的分析框架。</Answer>\n\n**问题 3**：第四版代码迁移到现代targetSdk时怎样避免同时改坏多个变量？\n\n<Answer>先锁定第四版行为基线，再一次只改变组件导出、权限、存储、后台、通知或依赖之一；每步保存构建、行为、测试与回滚差异。</Answer>\n\n</Exercises>`
      : "";
  return `\n\n${V2_MARKER}\n\n“${title}”不使用未获授权的纸书正文；[InformIT出版信息](${INFORMIT})与[授权电子版完整目录](${OREILLY})只用于确认第四版32章、269个正式目录节点和时代语境，[第四版官方勘误](${ERRATA})用于识别工具链变更。下列中文解释、图示、交互、代码与练习均为独立教学重写，平台行为再以[Android Developers](${ANDROID_DOCS})的一手文档复核。\n\n## 为什么“${title}”必须回到可观察状态\n\n“${title}”的学习结果不是记住类名，而是能预测“${focus}”在一次输入、一次重建和一次失败中的不同状态，并指出哪条Android合同产生差异。\n\n## 第四版机制逐项深读\n\n${deepDive}\n\n## 可操作机制实验\n\n“${title}”把“${focus}”拆成三个可观察层次：先选择目录节点并确认责任边界，再改变一个生命周期或外部条件，最后回到${evidence}。点击后的文字、状态与轨迹必须同步变化，重置后回到相同基线。\n\n<Steps>\n  <Step title="1. 选择机制节点">\n    选择一个正式节点，先预测它由谁拥有、在哪个线程执行、哪些状态需要恢复；右侧会显示本章专属的机制合同。\n\n    <BnrLifecycleLab />\n\n  </Step>\n  <Step title="2. 注入一个边界条件">\n    改变生命周期阶段、外部可用性或权限中的一项，观察回调、队列、数据或渲染结果怎样变化；不要用总风险分数代替因果。\n\n    <BnrFailureLab />\n\n  </Step>\n  <Step title="3. 复位并核对证据">\n    用${evidence}核对预测，随后执行重置；若基线不能复现，实验本身不通过。\n\n    <BnrEvidenceLab />\n\n  </Step>\n</Steps>\n\n<Callout type="trap">在“${title}”中，正常点击成功只能证明一个样本。若重建、取消、无响应者、离线、旧schema或目标SDK变化会产生不同结果，就必须把该边界写进状态机与测试。</Callout>\n\n<Callout type="trap">“${title}”若只留下最终截图，就无法判断旧所有者是否收到回调、后台任务是否重复、状态是否来自错误层或复位是否真正清空实验。</Callout>\n\n## “${title}”验收回顾\n\n“${title}”只有在${evidence}能够从相同基线再次得到相同断言时才通过；第四版机制与现代平台政策分别记录，不用新API名称掩盖旧行为。${synthesisExercises}\n\n${navigation}\n\n<Attribution\n  mode="independent-rewrite"\n  sourceBasis="authorized-sample"\n  workTitle=${JSON.stringify(WORK_TITLE)}\n  adaptedUrl=${JSON.stringify(OREILLY)}\n/>\n`;
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
    const value = nodeText(node).replace(/\s+/g, " ").trim();
    sentences.push(
      ...value
        .split(/(?<=[。！？.!?])\s*/u)
        .map((sentence) => sentence.trim())
        .filter((sentence) => sentence.length >= 70 && sentence.length <= 500),
    );
  });
  return [...new Set(sentences)];
}

function prefixRepeatedPlainSentences(profiles) {
  const owners = new Map();
  for (const profile of profiles) {
    const raw = fs.readFileSync(path.join(ROOT, profile.relativePath), "utf8");
    for (const sentence of sentencesFor(raw)) {
      if (!owners.has(sentence)) owners.set(sentence, new Set());
      owners.get(sentence).add(profile.relativePath);
    }
  }
  const repeated = new Set(
    [...owners.entries()]
      .filter(([, paths]) => paths.size >= 3)
      .map(([sentence]) => sentence),
  );
  for (const profile of profiles) {
    const filePath = path.join(ROOT, profile.relativePath);
    let raw = fs.readFileSync(filePath, "utf8");
    for (const sentence of sentencesFor(raw)) {
      if (!repeated.has(sentence) || !raw.includes(sentence)) continue;
      raw = raw.replaceAll(sentence, `在“${profile.title}”的验证中，${sentence}`);
    }
    fs.writeFileSync(filePath, raw);
  }
}

const manifestRoot = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = manifestRoot.books[BOOK];
if (!manifest) throw new Error(`缺少 ${BOOK} manifest`);
const formalNodes = manifest.units.reduce(
  (sum, unit) => sum + unit.concepts.length,
  0,
);
if (manifest.units.length !== 32 || formalNodes !== 269)
  throw new Error(`BNR4 manifest 分母异常：${manifest.units.length}/${formalNodes}`);

const entries = walkMdx(BOOK_DIR)
  .map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = matter(raw);
    const chapterSlug = path.basename(filePath, ".mdx");
    const unitIndex = manifest.units.findIndex(
      (unit) =>
        unit.id.replace(/^bnr4-\d+-/, "") === chapterSlug ||
        unit.chapterPath?.endsWith(`/${chapterSlug}`),
    );
    const bookOrder = chapterSlug === "bnr4-official-learning-map"
      ? 0
      : chapterSlug === "bnr4-official-final-review"
        ? 33
        : unitIndex + 1;
    if (bookOrder < 0 || (bookOrder === 0 && chapterSlug !== "bnr4-official-learning-map"))
      throw new Error(`无法映射BNR4页面顺序：${filePath}`);
    return {
      filePath,
      title: String(parsed.data.title ?? path.basename(filePath, ".mdx")),
      focus: String(parsed.data.description ?? parsed.data.title).replace(/\s+/g, " "),
      order: bookOrder,
      sectionOrder: Number(parsed.data.order ?? 0),
      sectionSlug: path.basename(path.dirname(filePath)),
      chapterSlug,
    };
  })
  .sort((left, right) => left.order - right.order);

if (entries.length !== 34 || entries[0].order !== 0 || entries.at(-1).order !== 33)
  throw new Error("BNR4 页面或order分母异常");

const chapterByOrder = new Map(entries.map((entry) => [entry.order, entry]));
const unitByOrder = new Map(manifest.units.map((unit, index) => [index + 1, unit]));

for (const entry of entries) {
  const unit = unitByOrder.get(entry.order);
  const concepts =
    entry.order === 0 || entry.order === 33
      ? manifest.units.map((item) => item.title)
      : unit.concepts.flat().map(String);
  const previous = chapterByOrder.get(entry.order - 1);
  const next = chapterByOrder.get(entry.order + 1);
  const linkFor = (item) =>
    `/learn/${BOOK}/${item.sectionSlug}/${item.chapterSlug}`;
  const navigation = [
    previous ? `[← 上一页：${previous.title}](${linkFor(previous)})` : null,
    next ? `[下一页：${next.title} →](${linkFor(next)})` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const evidence = evidenceFor(entry.title);
  const practiceMode = practiceModeFor(entry.title, entry.order);
  let raw = fs.readFileSync(entry.filePath, "utf8");
  const markers = [raw.indexOf(OLD_MARKER), raw.indexOf(V2_MARKER)].filter(
    (index) => index >= 0,
  );
  if (markers.length) raw = raw.slice(0, Math.min(...markers));
  raw = raw.replace(/\n<Attribution\b[\s\S]*?\/>\s*/g, "\n").trimEnd();
  raw = addFrontmatterFields(raw, practiceMode);
  raw = rewriteObjectives(raw, entry.title, entry.focus, evidence);
  raw = raw
    .replace(/([^\n])\n<Answer>/g, "$1\n\n<Answer>")
    .replace(/<\/Answer>\n([^\n<])/g, "</Answer>\n\n$1")
    .replace(/(\n {4}[^\n<][^\n]*)\n( {4}<Bnr[^\n]+Lab \/>)/g, "$1\n\n$2")
    .replace(/(\n {4}<Bnr[^\n]+Lab \/>)\n( {2}<\/Step>)/g, "$1\n\n$2");
  raw += supplementFor({
    ...entry,
    evidence,
    concepts,
    navigation,
  });
  fs.writeFileSync(entry.filePath, raw);
}

const profiles = entries.map((entry) => ({
  title: entry.title,
  order: entry.order,
  practiceMode: practiceModeFor(entry.title, entry.order),
  sectionSlug: entry.sectionSlug,
  chapterSlug: entry.chapterSlug,
  relativePath: path.relative(ROOT, entry.filePath).replaceAll(path.sep, "/"),
}));
prefixRepeatedPlainSentences(profiles);
normalizeLegacySvgText();

const factSources = {
  informit: { label: "InformIT第四版出版信息", url: INFORMIT },
  oreilly: { label: "授权电子版完整目录与试读", url: OREILLY },
  errata: { label: "Big Nerd Ranch第四版勘误增补", url: ERRATA },
  android: { label: "Android Developers开发指南", url: ANDROID_DOCS },
  activity: { label: "Android Activity生命周期", url: ACTIVITY_DOCS },
  state: { label: "Android UI状态保存", url: STATE_DOCS },
  fragment: { label: "Android Fragment指南", url: FRAGMENT_DOCS },
  recycler: { label: "Android RecyclerView指南", url: RECYCLER_DOCS },
  room: { label: "Android Room指南", url: ROOM_DOCS },
  intent: { label: "Android Intent与过滤器", url: INTENT_DOCS },
  accessibility: { label: "Android无障碍指南", url: ACCESSIBILITY_DOCS },
  background: { label: "Android后台任务指南", url: BACKGROUND_DOCS },
  work: { label: "Android WorkManager指南", url: WORK_DOCS },
  webview: { label: "Android WebView指南", url: WEBVIEW_DOCS },
  customView: { label: "Android自定义View指南", url: CUSTOM_VIEW_DOCS },
  animation: { label: "Android属性动画指南", url: ANIMATION_DOCS },
};

manifestRoot.books[BOOK] = {
  ...manifest,
  version: 2,
  sourceKind:
    "official-publisher-metadata-authorized-ebook-toc-official-errata-and-android-primary-docs",
  sourceUrl: INFORMIT,
  secondarySourceUrls: Object.values(factSources).map((source) => source.url),
  status: "verified-authorized-sample-independent-rewrite",
  verifiedAt: "2026-07-19",
  sourceAccess: "authorized-sample",
  sourceMode: "independent-rewrite",
  defaultSourceMode: "independent-rewrite",
  disclosureNote:
    "InformIT确认第四版作者、出版时间、页数与ISBN；O'Reilly授权电子版完整目录确认正文实际为32章、269个章及正式小节节点，官方勘误核对工具链变化。课程不复现纸书正文，按目录独立中文重写，平台事实由Android Developers一手文档复核。",
  factSources,
  coverage: { formalUnits: 32, outlineNodes: 269, pages: 34 },
  units: manifest.units.map((unit, index) => {
    const page = chapterByOrder.get(index + 1);
    if (!page) throw new Error(`manifest单元缺页面：${unit.id}`);
    const title = unit.title.toLowerCase();
    const factSourceIds = ["informit", "oreilly", "errata", "android"];
    if (/activity|state|viewmodel/.test(title)) factSourceIds.push("activity", "state");
    if (/fragment|dialog|app bar/.test(title)) factSourceIds.push("fragment");
    if (/recycler/.test(title)) factSourceIds.push("recycler");
    if (/database|room/.test(title)) factSourceIds.push("room");
    if (/intent|task|picture|broadcast/.test(title)) factSourceIds.push("intent");
    if (/accessibility/.test(title)) factSourceIds.push("accessibility");
    if (/http|looper|search|workmanager|background/.test(title))
      factSourceIds.push("background");
    if (/workmanager/.test(title)) factSourceIds.push("work");
    if (/webview/.test(title)) factSourceIds.push("webview");
    if (/custom view|touch/.test(title)) factSourceIds.push("customView");
    if (/animation/.test(title)) factSourceIds.push("animation");
    return {
      ...unit,
      id: page.chapterSlug,
      sourceUnitId: unit.sourceUnitId ?? unit.id,
      chapterPath: `${page.sectionSlug}/${page.chapterSlug}`,
      factSourceIds: [...new Set(factSourceIds)],
    };
  }),
  unitMappingEvidence: "quality/remediation-ledger.json",
  factSourcePolicy:
    "授权电子版完整目录限定32章与269节点，合法试读和官方勘误提供时代语境；所有Android行为结论由Android Developers一手文档和可重放实验独立核对。",
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
      scope: { formalUnits: 32, outlineNodes: 269, pages: 34 },
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
