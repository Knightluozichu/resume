#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import prettier from "prettier";

const ROOT = process.cwd();
const BOOK = "big-nerd-ranch-guide";
const CONTENT_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/big-nerd-ranch-guide-v2-profiles.json",
);
const GENERATED_START = "{/* BNR4_VISUAL_V2_START */}";
const GENERATED_END = "{/* BNR4_VISUAL_V2_END */}";

function design(task, owner, state, event, invariant, fault, evidence) {
  return { task, owner, state, event, invariant, fault, evidence };
}

const DESIGNS = {
  "learning-map": design(
    "把 GeoQuiz、CriminalIntent、BeatBox、PhotoGallery、NerdLauncher 与 DragAndDraw 串成 32 章可重放路线",
    "每个示例应用的明确状态所有者",
    "构建、界面、持久化、后台与外部合同",
    "从第一章构建到最终独立项目的里程碑提交",
    "每章都有章专属结果、反例、恢复路径和版本边界",
    "只按类名打卡 32 章，却没有保存六个项目的状态轨迹和失败证据",
    "项目提交、设备指纹、状态快照、失败测试和迁移差异",
  ),
  "first-app": design(
    "从源码、资源、清单和 Gradle 配置生成可安装并可重复启动的 GeoQuiz 首帧",
    "Gradle variant 与 MainActivity",
    "资源 ID、组件声明、安装包和首帧 View 树",
    "点击 Run 后执行编译、打包、安装与 Activity 创建",
    "同一提交和依赖锁定后，干净构建产生同身份 APK 与同首帧断言",
    "布局 XML 语法错误让 R 类生成失败，却继续使用旧 APK 截图验收",
    "构建日志、APK 哈希、安装记录、资源映射与首帧断言",
  ),
  "android-mvc": design(
    "让 GeoQuiz 的题目事实、界面表示和用户事件分别由 model、view 与 controller 承担",
    "QuizViewModel 与 Activity controller",
    "当前题号、答案事实、按钮可用性和反馈文本",
    "用户选择答案或切换上一题与下一题",
    "旋转和重复点击不能让题目事实与界面显示分叉",
    "把答案和题号只存进 TextView，View 重建后 model 状态丢失",
    "用户事件序列、题目索引、model 快照与界面断言",
  ),
  "activity-lifecycle": design(
    "沿 Activity 回调解释前后台、旋转、多窗口和实例重建中的可见状态变化",
    "Activity 实例与系统生命周期调度器",
    "created、started、resumed、paused、stopped、destroyed",
    "旋转设备、切到后台、返回应用与开启多窗口",
    "回调顺序可观察，但 onDestroy 不能被当作持久化成功承诺",
    "在 onDestroy 才保存答案，进程被杀后恢复到错误题目",
    "实例 ID、时间戳、回调日志、配置值与界面状态",
  ),
  "ui-state-persistence": design(
    "区分 View 临时状态、ViewModel 配置期状态、saved state 与持久事实",
    "QuizViewModel、SavedStateHandle 与持久仓库",
    "题号、作答记录、临时输入和可恢复事实",
    "旋转、后台进程回收与冷启动恢复",
    "每类状态只由适合其寿命的所有者恢复且不重复提交副作用",
    "只用 ViewModel 保存答案并假设它可以跨进程死亡",
    "保存键、序列化值、进程 ID、恢复轨迹和行为断言",
  ),
  debugging: design(
    "从稳定失败、堆栈首个业务帧和设备状态定位 Android 缺陷",
    "测试、Logcat、断点与问题工件的责任人",
    "失败输入、线程、异常、调用栈和修复假设",
    "重放最小失败用例并一次只改变一个原因",
    "同一失败输入在修复前稳定失败、修复后稳定通过且邻近用例不回归",
    "捕获异常或删除日志让界面不崩，却没有修复无效状态",
    "失败测试、完整堆栈、断点快照、修复差异和回归结果",
  ),
  "second-activity": design(
    "以显式 Intent 启动 CheatActivity，并用最小 extras 与结果合同交换数据",
    "发送 Activity、目标 Activity 与 ActivityResult 合同",
    "题目答案、作弊决定、返回结果和已处理标记",
    "启动第二界面、旋转、返回与重复结果到达",
    "缺失或重复结果不能让 GeoQuiz 错记作弊状态",
    "目标 Activity 重建后再次返回同一结果，发送方重复提交",
    "Intent extras、实例 ID、结果码、消费标记和题目状态",
  ),
  "sdk-compatibility": design(
    "把 compileSdk、targetSdk、minSdk 与运行设备 API 的责任分开验证",
    "构建配置、兼容库与运行时版本分支",
    "可编译 API、可安装范围、行为政策和回退路径",
    "在两个 API 级别安装并触发同一作弊提示",
    "版本判断围绕真实行为差异，不用编译成功代替运行兼容",
    "调用高版本 API 却只检查 compileSdk，低版本设备启动即崩溃",
    "Gradle 配置、设备 API、分支日志、兼容测试和回退截图",
  ),
  "ui-fragments": design(
    "区分 Fragment 实例与 Fragment View 生命周期，并由 FragmentManager 恢复结构",
    "FragmentManager、Fragment 实例与 viewLifecycleOwner",
    "fragment 状态、View binding、事务和容器内容",
    "创建、替换、旋转及 onDestroyView",
    "View 销毁后不再接收界面回调，Fragment 状态仍可按合同恢复",
    "Fragment 保存已销毁 View binding，异步回调写入旧界面",
    "Fragment/View 实例 ID、事务日志、回调序列和泄漏检查",
  ),
  recyclerview: design(
    "让 Adapter 以稳定事实完整绑定复用 ViewHolder，而非依赖旧位置状态",
    "Adapter 数据快照与每个 ViewHolder",
    "item ID、类型、绑定内容、选择与可见位置",
    "滚动复用、插入、删除、点击和数据刷新",
    "每次 bind 覆盖全部可变视图，点击按当前 item 身份解释",
    "复用后未重置 checkbox，上一行的选中状态泄漏到新数据",
    "绑定日志、holder ID、item ID、diff 结果与滚动断言",
  ),
  "layouts-widgets": design(
    "把 ConstraintLayout 约束、测量、布局与资源限定符落到多配置几何",
    "View 树、ConstraintLayout 求解器与资源匹配器",
    "约束、尺寸、边距、padding、文字和焦点顺序",
    "切换小屏、横屏、长文本、大字体与 RTL",
    "所有目标配置中信息不截断、控件不重叠且主要动作可达",
    "只在单一 Pixel 模拟器检查，德语大字体下按钮被挤出屏幕",
    "配置矩阵、Layout Inspector 几何、截图与可达性断言",
  ),
  "room-database": design(
    "用 Entity、DAO、RoomDatabase 与 Repository 建立 CriminalIntent 单一事实源",
    "Room 数据库和 Repository",
    "schema、Crime 实体、查询流、事务和迁移版本",
    "插入、更新、查询、进程重启和 schema 升级",
    "持久事实由数据库拥有，界面观察结果不绕过 DAO 直接改写",
    "升级 schema 后启用 destructive migration，用户案件无提示丢失",
    "schema 导出、DAO 测试、迁移样本、事务日志和查询断言",
  ),
  "fragment-navigation": design(
    "用 Fragment arguments、返回栈和数据库 ID 导航 CriminalIntent",
    "FragmentManager、导航容器与 CrimeRepository",
    "目的地、参数、返回栈、选中 Crime ID 和更新结果",
    "列表点击、详情编辑、返回、旋转与进程重建",
    "目的地只接收稳定 ID，并从事实源恢复详情而非携带整份可变对象",
    "状态保存后继续提交事务，旋转时抛出 state loss 或显示重复 Fragment",
    "事务、back stack、argument、实例 ID 和数据库更新断言",
  ),
  dialogs: design(
    "让 DatePicker DialogFragment 通过稳定结果合同更新 Crime 日期",
    "DialogFragment、调用 Fragment 与 FragmentResult",
    "初始日期、选择值、结果键和已消费状态",
    "打开、旋转、确认、取消与重复提交",
    "对话框重建不丢初值，结果只消费一次且取消不改事实",
    "旋转后旧监听器和新监听器都收到日期结果，数据库写入两次",
    "dialog tag、结果 bundle、消费计数和 Crime 日期快照",
  ),
  "app-bar": design(
    "把 CriminalIntent 的新增、删除、搜索和导航动作接入当前界面状态",
    "MenuHost、当前 Fragment 与列表状态",
    "菜单可见性、动作启用、空列表和导航结果",
    "创建菜单、选择动作、数据变空与配置重建",
    "菜单由当前状态派生，不能对已销毁目的地继续执行动作",
    "返回列表后旧详情 Fragment 仍处理删除菜单，删错 Crime",
    "menu item、目的地 ID、动作日志、列表快照和导航断言",
  ),
  "implicit-intents": design(
    "为电话、联系人和分享动作构造最小隐式 Intent 并处理解析结果",
    "Intent 发起方、PackageManager 与外部响应应用",
    "action、URI、MIME、extras、授权和候选列表",
    "点击嫌疑人或报告按钮并解析零个、一个或多个响应者",
    "没有响应者时提供可理解回退，敏感数据只授予必要目标",
    "无应用能处理 Intent 时仍直接 startActivity，导致崩溃",
    "Intent 字段、resolve 结果、选择器、授权范围和返回轨迹",
  ),
  "taking-pictures": design(
    "用 FileProvider URI 委托相机写入照片并按目标尺寸解码显示",
    "CrimeRepository、FileProvider、相机应用与 ImageView",
    "文件 URI、临时权限、照片字节、方向和解码尺寸",
    "拍照、取消、旋转、返回及照片加载",
    "只接受非空可解码文件，授权在任务结束后不继续扩大",
    "把 file URI 暴露给外部相机或全尺寸解码导致权限异常与 OOM",
    "URI grant、结果码、文件大小、EXIF、采样率和内存轨迹",
  ),
  localization: design(
    "让资源匹配器按 locale、方向、尺寸与密度选择可回退资源",
    "Android Resources 与 locale 配置",
    "字符串、复数、日期格式、布局方向和候选资源",
    "切换英语、中文、阿拉伯语、大字体与区域格式",
    "用户可见文本来自资源和 locale 格式化，不拼接固定英语语序",
    "把日期和数量手工拼进英文句子，阿拉伯语下语序和数字错误",
    "配置值、资源命中、伪本地化截图、RTL 与格式断言",
  ),
  accessibility: design(
    "让 TalkBack 用户以线性焦点、语义标签和可执行 action 完成同一任务",
    "View 语义树、AccessibilityService 与应用状态",
    "content description、role、state、action 和 announcement",
    "启用 TalkBack，遍历列表、编辑字段并触发状态变化",
    "非视觉用户获得与视觉用户等价的任务结果和变化反馈",
    "自定义图片按钮没有名称，TalkBack 只读出“未标记的按钮”",
    "无障碍节点树、焦点顺序、操作录制、Scanner 与任务断言",
  ),
  "data-binding-mvvm": design(
    "区分 MVVM 表示状态、Jetpack ViewModel 寿命与 Data Binding 更新",
    "BeatBoxViewModel、SoundViewModel 与 Binding",
    "资产列表、显示文本、用户命令、观察值和 View 状态",
    "加载资产、绑定列表、点击声音与旋转",
    "状态所有者不持有已销毁 View，Binding 只渲染可观察事实",
    "ViewModel 保存 Activity 或 Binding 引用，旋转后泄漏旧界面",
    "实例 ID、绑定求值、资产状态、点击事件和泄漏检查",
  ),
  "audio-unit-testing": design(
    "把 SoundPool 加载、播放、释放与可测试回调分离",
    "BeatBox、SoundPool 与测试替身",
    "sound ID、加载完成、播放请求、生命周期和释放状态",
    "加载资产、点击播放、旋转、重复点击与退出",
    "未加载完成不播放，释放后不再接收回调，同一事件不重复发声",
    "旋转后两个 SoundPool 同时存活，同一次点击播放两遍",
    "单元测试、load 回调、stream ID、实例计数和释放日志",
  ),
  "styles-themes": design(
    "让颜色、style、theme 与属性覆盖形成可解释的资源继承链",
    "Resources、Theme 与 View 属性解析器",
    "主题属性、style 父级、局部覆盖、日夜模式和最终像素",
    "切换 day/night、组件状态与局部 theme overlay",
    "内容语义与主题解耦，最终颜色保持对比度和状态可辨性",
    "在布局写死颜色，夜间主题下文字与背景对比度不足",
    "属性解析链、资源 ID、日夜截图、对比度和状态断言",
  ),
  "xml-drawables": design(
    "用 shape、selector、layer-list 与 9-patch 表达可缩放状态图形",
    "Drawable 资源、View state 与资源匹配器",
    "边角、描边、图层、pressed/disabled 状态和密度",
    "按下、禁用、缩放、换密度与切换主题",
    "图形状态与可点击语义一致，在目标密度不模糊或错位",
    "selector 缺少 disabled 项，禁用按钮仍看起来可点击",
    "drawable 命中、state set、像素边界、密度截图和交互断言",
  ),
  "more-intents-tasks": design(
    "区分 Activity back stack、task、document 与进程，并验证 launch flags",
    "ActivityTaskManager 与每个 task 返回栈",
    "intent、task ID、Activity 实例、flags 和顶层目的地",
    "从 NerdLauncher 启动、重复深链、Home 返回与 Back 导航",
    "栈策略决定导航实例但不自动提供业务副作用幂等",
    "滥用 CLEAR_TOP 修复重复界面，却让待保存编辑状态丢失",
    "task dump、intent flags、实例 ID、返回序列和业务提交计数",
  ),
  "http-background": design(
    "用 Retrofit 获取 Flickr JSON，在配置重建与取消中只提交当前响应",
    "PhotoGallery Repository、网络 call 与界面状态所有者",
    "查询、请求 ID、加载状态、结果页、错误与取消",
    "发起请求、旋转、断网、重试、分页与快速切换查询",
    "旧请求不能覆盖新查询，离线和解析错误都有可恢复状态",
    "查询 B 已显示后，较慢的查询 A 回调覆盖当前列表",
    "请求 ID、URL、HTTP 状态、解析错误、取消日志和列表断言",
  ),
  "looper-handler": design(
    "用 Looper、Handler 与 HandlerThread 串行下载缩略图并安全回传主线程",
    "ThumbnailDownloader、工作 Looper 与 viewLifecycleOwner",
    "请求队列、token、目标 holder、bitmap 和取消状态",
    "入队、后台下载、主线程回传、滚动复用与 View 销毁",
    "回调只更新仍绑定同一请求的可见 View，销毁后队列可取消",
    "Holder 已复用给新 URL，旧下载回调把错误图片写入当前行",
    "post/execute 线程、token、URL、holder ID、取消与绑定日志",
  ),
  search: design(
    "把 SearchView 输入、提交、防抖、SharedPreferences 与网络结果竞争分开",
    "查询状态所有者、偏好存储与 PhotoGallery Repository",
    "编辑文本、已提交查询、持久偏好、请求 ID 和结果",
    "输入、提交、清空、旋转、冷启动和旧响应返回",
    "轻量偏好只保存已确认查询，当前结果对应最新有效请求",
    "每个字符都立即写偏好并发请求，旧响应覆盖新输入",
    "输入事件、提交时刻、preference 值、请求 ID 和结果断言",
  ),
  workmanager: design(
    "用 Worker、约束、唯一工作、通知与用户开关表达可靠可延期轮询",
    "WorkManager 数据库、PollWorker 与用户设置",
    "WorkSpec、约束、attempt、唯一名称、结果和取消状态",
    "启用轮询、网络变化、进程重启、重试、通知与关闭轮询",
    "关闭后唯一工作不存在，重复启用不产生并行轮询",
    "把 PeriodicWorkRequest 当精确定时器，并重复入队多个同名任务",
    "WorkInfo、约束切换、attempt、唯一队列、通知和取消测试",
  ),
  "broadcast-intents": design(
    "区分普通 Intent 与广播，并把长任务从 Receiver 转交受约束工作",
    "BroadcastReceiver、注册作用域与 WorkManager",
    "action、extras、导出/权限、接收窗口和转交工作",
    "前后台切换、动态注册、发送广播与进程回收",
    "Receiver 只做短处理，外部广播受权限与导出边界约束",
    "在 onReceive 中同步联网，超过生命周期窗口被系统终止",
    "注册日志、发送方 UID、权限、onReceive 时长和转交 WorkInfo",
  ),
  webview: design(
    "比较隐式 Intent、Custom Tabs 与 WebView 的导航、信任和生命周期边界",
    "WebView、Activity 返回栈与受信任 URL 策略",
    "当前 URL、历史、加载状态、Cookie、脚本与返回行为",
    "打开页面、跳转、Back、旋转、离线与外部 scheme",
    "只加载允许来源，Back 优先级和配置恢复不吞掉安全错误",
    "无白名单启用 JavaScript bridge，让不可信页面调用本地对象",
    "URL 链、WebView 历史、SSL/加载错误、配置轨迹和安全断言",
  ),
  "custom-views-touch": design(
    "把 pointer 手势转换成 Box 几何，同时控制重绘、保存状态与无障碍操作",
    "BoxDrawingView、手势状态机与 saved state",
    "pointer ID、起止坐标、box 列表、绘制区域和语义节点",
    "按下、移动、抬起、多指、旋转与键盘替代操作",
    "每个手势只提交一个合法 box，重绘和状态恢复不依赖旧 Canvas",
    "忽略 pointer ID，多指切换后 box 突然跳到另一根手指",
    "MotionEvent 序列、pointer ID、box 快照、invalidate 区域和语义树",
  ),
  "property-animation": design(
    "用 ObjectAnimator 与 AnimatorSet 改变真实属性并同步交互边界",
    "Animator、View 属性与场景状态机",
    "属性起止值、时长、插值、运行阶段和点击区域",
    "启动、暂停、取消、组合动画、旋转与减少动态效果",
    "动画结束后的视觉、布局点击区域和无障碍边界一致",
    "只做 canvas 位移，按钮看似移动但点击区域仍留在原位",
    "属性快照、animator 状态、点击坐标、取消轨迹和可访问性边界",
  ),
  afterword: design(
    "把第四版跟做项目转化为可独立定义、构建、测试和发布的 Android 应用",
    "学习者的产品需求、状态模型和发布负责人",
    "用户任务、架构边界、依赖、测试矩阵和发布制品",
    "从空仓库实现最终挑战并由另一人复核",
    "项目在没有书中步骤提示时仍可重建、解释、失败和恢复",
    "复制完成代码后只改包名，无法解释状态所有者和目标 SDK 差异",
    "需求、设计决策、源码提交、测试、发布包和复盘记录",
  ),
  "final-review": design(
    "从六个项目重放组件、状态、线程、存储、外部合同与现代目标 SDK 迁移",
    "六个应用各自的事实源与生命周期所有者",
    "32 章工件、正常轨迹、失败轨迹、恢复和迁移差异",
    "干净构建六个项目并逐项注入章专属反例",
    "每个项目能在同一输入下重放基线、故障和恢复且不混淆第四版与当前政策",
    "只保留成功 APK 和截图，删除构建指纹、进程重建与失败测试",
    "六项目提交、设备矩阵、状态轨迹、故障包、迁移记录和签核",
  ),
};

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

async function writeFormatted(filePath, source) {
  fs.writeFileSync(
    filePath,
    await prettier.format(source, { filepath: filePath }),
  );
}

async function writeMdxFormatted(filePath, source) {
  const formatted = await prettier.format(source, { filepath: filePath });
  fs.writeFileSync(
    filePath,
    formatted
      .replaceAll("{/_", "{/*")
      .replaceAll("_/}", "*/}")
      .replaceAll("{/\\*", "{/*")
      .replaceAll("\\*/}", "*/}")
      .replaceAll(
        '`if\n  (!searchView.isIconified) {(searchView.isIconified = true)} else{" "}\n  {super.onBackPressed()}`',
        "`if (!searchView.isIconified) { searchView.isIconified = true } else { super.onBackPressed() }`",
      ),
  );
}

function conceptLabel(group) {
  return String(group[0]);
}

function sampleConcepts(concepts) {
  const indexes = [0, 0.24, 0.49, 0.74, 1].map((position) =>
    Math.min(concepts.length - 1, Math.round((concepts.length - 1) * position)),
  );
  return indexes.map((index) => concepts[index]);
}

function transitionsFor(profile) {
  const concepts = sampleConcepts(profile.concepts);
  const actions = ["冻结入口", "触发事件", "提交状态", "重建边界", "核对交付"];
  return concepts.map((concept, index) => ({
    action: `${actions[index]}：${concept}`,
    state:
      index === 0
        ? `记录${profile.owner}的初始${profile.state}`
        : index === 1
          ? `以“${profile.event}”改变${profile.state}`
          : index === 2
            ? `只由${profile.owner}提交新状态`
            : index === 3
              ? `在销毁、取消或重建后拒绝旧所有者回调`
              : `以“${profile.invariant}”判断通过`,
    evidence:
      index === 4
        ? profile.evidence
        : `${profile.evidence}中的“${concept}”轨迹`,
  }));
}

function scenariosFor(profile) {
  return [
    {
      label: "正常任务",
      input: `固定 SDK、设备配置和初始状态，触发“${profile.event}”`,
      expected: `由${profile.owner}提交${profile.state}，并持续满足“${profile.invariant}”`,
    },
    {
      label: "边界恢复",
      input: `保持正常输入不变，仅注入“${profile.fault}”`,
      expected: `找到首个状态分岔，撤销后以${profile.evidence}证明同输入恢复`,
    },
  ];
}

function augmentation(profile, componentBase) {
  return `${GENERATED_START}

## 章专属可重放状态实验

先预测“${profile.event}”发生后，${profile.owner}应怎样改变${profile.state}；再操作三个实验。第四版示例与当前 Android 政策分别记录，实验不把新 API 名称倒填为原书内容。

### 实验一：所有者—状态—结果合同

选择任一正式目录节点和正常/边界场景，检查它是否真的进入本章状态合同。目录标题只有同时出现在解释、可视状态和交付证据中才算覆盖。

<${componentBase}ContractLab />

### 实验二：事件与生命周期轨迹

沿五次转换逐步执行“${profile.event}”。每一步只允许${profile.owner}按职责提交状态，并持续核对“${profile.invariant}”。

<${componentBase}LifecycleLab />

### 实验三：章专属反例与同输入恢复

注入“${profile.fault}”，保存第一个偏离点；撤销后以完全相同的 SDK、设备状态和用户事件重放。只有${profile.evidence}一起恢复才算修复。

<${componentBase}FaultLab />

${GENERATED_END}`;
}

function wrapperSource(profile) {
  const slug = path.basename(profile.path);
  const componentBase = pascal(slug);
  const model = {
    unitId: profile.unitId ?? profile.role,
    title: profile.title,
    task: profile.task,
    owner: profile.owner,
    state: profile.state,
    event: profile.event,
    invariant: profile.invariant,
    fault: profile.fault,
    evidence: profile.evidence,
    concepts: profile.concepts,
    transitions: transitionsFor(profile),
    scenarios: scenariosFor(profile),
  };
  return `"use client";

import {
  AndroidStateLab,
  type AndroidStateModel,
} from "./android-state-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies AndroidStateModel;

export function ${componentBase}ContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function ${componentBase}LifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function ${componentBase}FaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
`;
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
const document = JSON.parse(manifestSource);
const manifest = document.books?.[BOOK];
if (!manifest) throw new Error(`缺少 fidelity manifest：${BOOK}`);
if (manifest.units.length !== 32)
  throw new Error(`正式单元应为 32，实际 ${manifest.units.length}`);
const formalNodes = manifest.units.reduce(
  (sum, unit) => sum + unit.concepts.length,
  0,
);
if (formalNodes !== 269)
  throw new Error(`正式目录节点应为 269，实际 ${formalNodes}`);

const entries = [
  {
    role: "learning-map",
    path: "00-official-learning-map/bnr4-official-learning-map",
    concepts: manifest.units.map((unit) => unit.title),
  },
  ...manifest.units.map((unit) => ({
    unitId: unit.id,
    path: unit.chapterPath,
    concepts: unit.concepts.map(conceptLabel),
  })),
  {
    role: "final-review",
    path: "33-official-final-review/bnr4-official-final-review",
    concepts: manifest.units.map((unit) => unit.title),
  },
];

fs.mkdirSync(COMPONENT_DIR, { recursive: true });

for (const entry of entries) {
  const designKey = entry.unitId ?? entry.role;
  const pageDesign = DESIGNS[designKey];
  if (!pageDesign) throw new Error(`缺少页面设计：${designKey}`);
  const profile = Object.assign(entry, pageDesign);
  const filePath = path.join(CONTENT_DIR, `${profile.path}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${profile.path}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  profile.title = String(parsed.data.title);
  const slug = path.basename(profile.path);
  const componentBase = pascal(slug);
  const generatedImport = `import { ${componentBase}ContractLab, ${componentBase}LifecycleLab, ${componentBase}FaultLab } from "@/components/mdx/${BOOK}/v2/${slug}";`;
  let body = parsed.content
    .replace(
      /^import\s+\{\s*[A-Za-z0-9]+ContractLab,\s*[A-Za-z0-9]+LifecycleLab,\s*[A-Za-z0-9]+FaultLab,?\s*\}\s+from\s+"@\/components\/mdx\/big-nerd-ranch-guide\/v2\/[^"]+";\n*/gm,
      "",
    )
    .replace(
      /\{\/\* BNR4_VISUAL_V2_START \*\/\}[\s\S]*?\{\/\* BNR4_VISUAL_V2_END \*\/\}\n*/g,
      "",
    )
    .trimStart();
  const experiment = augmentation(profile, componentBase);
  if (!/<Attribution[\s\S]*?\/>\s*$/.test(body)) {
    throw new Error(`页面缺少结尾 Attribution：${profile.path}`);
  }
  body = body.replace(/<Attribution[\s\S]*?\/>\s*$/, `${experiment}\n\n$&`);
  body = `${generatedImport}\n\n${body}`;

  const data = {
    ...parsed.data,
    description: `${profile.title}：保留第四版正文机制，以所有者—状态—结果合同、事件轨迹和章专属故障完成可重放验收。`,
    demo: true,
    draft: false,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
  };
  await writeMdxFormatted(filePath, matter.stringify(body, data));
  await writeFormatted(
    path.join(COMPONENT_DIR, `${slug}.tsx`),
    wrapperSource(profile),
  );
}

manifest.unitMappingEvidence = PROFILE_PATH.replace(`${ROOT}/`, "");
manifest.coverage = {
  formalUnits: 32,
  mappedUnits: 32,
  ratio: 1,
  outlineNodes: formalNodes,
  pages: entries.length,
};
manifest.metrics = {
  formalUnits: 32,
  formalNodes,
  coursePages: entries.length,
  interactiveViews: entries.length * 3,
};
manifest.visualImplementation = {
  viewsPerPage: 3,
  modes: ["contract", "lifecycle", "fault"],
  sharedComponent:
    "src/components/mdx/big-nerd-ranch-guide/v2/android-state-lab.tsx",
  retainedExistingVisuals: true,
};
fs.writeFileSync(
  MANIFEST_PATH,
  replaceBookManifest(manifestSource, BOOK, manifest),
);
await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      edition: manifest.edition,
      sourceBoundary:
        "InformIT metadata, authorized O'Reilly ebook TOC/sample and official errata define the fourth-edition boundary; Android Developers primary documentation verifies platform behavior; independent Chinese rewrite.",
      historicalBoundary:
        "The fourth edition is preserved as a 2019/2020 Kotlin and Android 5.0–8.1-era course. Current targetSdk policies are migration evidence, not silently backfilled original content.",
      coverage: manifest.coverage,
      metrics: manifest.metrics,
      pages: entries.map((profile) => ({
        role: profile.role,
        unitId: profile.unitId,
        path: profile.path,
        title: profile.title,
        concepts: profile.concepts,
        task: profile.task,
        owner: profile.owner,
        state: profile.state,
        event: profile.event,
        invariant: profile.invariant,
        fault: profile.fault,
        evidence: profile.evidence,
        model: {
          transitions: transitionsFor(profile),
          scenarios: scenariosFor(profile),
        },
      })),
    },
    null,
    2,
  )}\n`,
);

console.log(
  `已为 ${entries.length} 页补齐 ${formalNodes} 个目录节点的 ${entries.length * 3} 个章专属交互视图。`,
);
