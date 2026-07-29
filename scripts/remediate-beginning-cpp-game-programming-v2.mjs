#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import prettier from "prettier";

const ROOT = process.cwd();
const BOOK = "beginning-cpp-game-programming";
const CONTENT_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(
  ROOT,
  "src/components/mdx",
  BOOK,
  "v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/beginning-cpp-game-programming-v2-profiles.json",
);

const SOURCES = {
  publisher:
    "https://www.packtpub.com/en-us/product/beginning-c-game-programming-9781835088258",
  repository:
    "https://github.com/PacktPublishing/Beginning-C-Game-Programming-Third-Edition",
  sfmlTutorials: "https://www.sfml-dev.org/tutorials/2.6/",
  sfmlView: "https://www.sfml-dev.org/documentation/2.6.1/classsf_1_1View.php",
  sfmlAudio: "https://www.sfml-dev.org/tutorials/2.6/audio-sounds.php",
};

const FACT_SOURCES = [
  {
    id: "publisher",
    title: "Packt：Beginning C++ Game Programming, Third Edition",
    url: SOURCES.publisher,
    use: "核对 2024 年第三版、C++20、SFML、四个项目、21 个正式教学章节及章节次序；不把商品页当作正文全文",
  },
  {
    id: "repository",
    title: "PacktPublishing：第三版官方代码仓库",
    url: SOURCES.repository,
    use: "核对 Timber、Pong、ZombieShooter、Run 四个项目的公开代码与资源组织；代码许可证不等于原书正文授权",
  },
  {
    id: "sfml-tutorials",
    title: "SFML 2.6 官方教程",
    url: SOURCES.sfmlTutorials,
    use: "核对本书使用的 SFML 2.6 系列 Window、Graphics、View、VertexArray、Shader 与 Audio API 语义",
  },
  {
    id: "sfml-view",
    title: "SFML 2.6.1：sf::View 官方参考",
    url: SOURCES.sfmlView,
    use: "核对 source rectangle 到 target viewport 的映射、主视图、HUD 与雷达视图边界",
  },
  {
    id: "sfml-audio",
    title: "SFML 2.6：Sounds and music 官方教程",
    url: SOURCES.sfmlAudio,
    use: "核对 SoundBuffer 生命周期、Sound/Music 区别、listener 与声音空间化边界",
  },
];

function p(value) {
  return value;
}

function zones(...items) {
  return items.map(([label, detail]) => ({ label, detail }));
}

function scenarios(...items) {
  return items.map(([label, input, expected]) => ({ label, input, expected }));
}

const PAGES = [
  p({
    role: "learning-map",
    path: "00-fundamentals/learning-map",
    concepts: ["21 章正式映射", "四个可玩项目", "C++20 与 SFML 2.6", "干净构建证据"],
    focus: "把 21 个正式章节放回 Timber、Pong、Zombie Arena 与 Run! 四条项目链，并为每章定义可运行产物",
    invariant: "任一学习路径都必须保留前置语言能力、项目产物、可观察证据和干净复现四项",
    fault: "按旧版十章摘要跳过第 11–21 章，却仍把课程标为第三版完整路线",
    evidence: "正式单元 ID、章节路径、项目里程碑、编译日志、运行轨迹与最终复现清单",
    zones: zones(
      ["正式目录", "21 个教学章节及其前置概念"],
      ["项目产物", "Timber、Pong、Zombie Arena、Run! 的可玩切片"],
      ["验收证据", "预测、日志、边界测试与干净构建"],
    ),
    trace: ["定位章节", "确认前置", "预测产物", "运行实验", "干净复现"],
    scenarios: scenarios(
      ["从零走完整路线", "从第 1 章开始，按四个项目依赖逐章推进", "21 个单元均有对应页面、项目产物和验收证据"],
      ["已有 C++ 基础补项目", "跳过语法讲解但先完成依赖诊断，再从 Pong 或 Zombie Arena 进入", "跳读不破坏所有权、实时循环、资源和视图前置条件"],
    ),
  }),
  p({
    unitId: "bcgp3-01",
    path: "01-game-basics/game-loop",
    focus: "从匹配架构的 C++20/SFML 构建开始，完成事件轮询、更新、clear-draw-display 与资源加载闭环",
    invariant: "窗口仍打开时每帧先处理事件，再更新状态，并且只按 clear、draw、display 顺序提交一次画面",
    fault: "忽略纹理加载失败或运行目录变化，让空精灵进入绘制阶段",
    evidence: "编译与链接命令、动态库架构、当前工作目录、loadFromFile 返回值和逐帧调用日志",
    zones: zones(
      ["构建与资源", "编译器、SFML 二进制、运行库和资源路径"],
      ["实时状态", "窗口事件、时间步与游戏对象更新"],
      ["可见提交", "clear、draw、display 的帧边界"],
    ),
    trace: ["配置目标", "创建窗口", "轮询事件", "更新并绘制", "提交帧"],
    scenarios: scenarios(
      ["干净启动 Timber", "清空构建目录后，以匹配架构编译并从规定工作目录运行", "窗口持续响应，背景纹理加载成功，每帧只提交一次"],
      ["资源路径失效", "保持二进制不变，把背景资源移出相对路径", "加载失败被显式报告，程序不把空纹理当作成功画面"],
    ),
  }),
  p({
    unitId: "bcgp3-02",
    path: "00-fundamentals/types-variables",
    focus: "用有类型的状态、运算符、随机样本、条件分支和帧时间驱动云与蜜蜂，而不是把运动绑在帧率上",
    invariant: "相同初始状态、随机种子和输入时间序列必须产生相同位置轨迹，速度使用每秒单位乘以 delta time",
    fault: "每帧直接增加固定像素，导致 60 Hz 与 144 Hz 下运动速度不同",
    evidence: "变量类型和值、随机种子、delta time、分支命中记录及逐帧位置序列",
    zones: zones(
      ["输入状态", "速度、边界、随机种子与当前时间"],
      ["更新规则", "运算符、if/else 与时间缩放"],
      ["动画结果", "云、蜜蜂位置及越界重置"],
    ),
    trace: ["固定种子", "读取时间", "判断状态", "积分位置", "检查边界"],
    scenarios: scenarios(
      ["稳定 60 Hz", "连续输入 1/60 秒的时间步并使用固定随机种子", "一秒后的位移等于速度乘一秒且轨迹可重放"],
      ["混合帧时间", "交替输入 1/30 与 1/120 秒时间步，总时间保持一秒", "总位移与稳定帧率近似一致，不因帧数改变速度"],
    ),
  }),
  p({
    unitId: "bcgp3-03",
    path: "01-game-basics/graphics-sfml",
    focus: "把字符串、玩家输入、暂停状态、得分文本与 SFML Time 统一到同一个 HUD 和时间条状态机",
    invariant: "暂停时游戏时间、得分和时间条不推进；重启会原子地恢复初始时间、消息与输入状态",
    fault: "暂停后仍按墙钟时间缩短时间条，恢复时立即触发结束条件",
    evidence: "事件与实时输入日志、paused 标志、游戏时钟、剩余时间、得分字符串和 HUD 绘制顺序",
    zones: zones(
      ["输入与阶段", "开始、暂停、恢复和按键边沿"],
      ["游戏状态", "得分、消息、游戏时间和剩余时间"],
      ["HUD 表现", "Text、字体与 time bar 几何"],
    ),
    trace: ["读取输入", "切换阶段", "推进游戏钟", "格式化文本", "绘制 HUD"],
    scenarios: scenarios(
      ["开始并计时", "按 Enter 从等待阶段开始，再提供一秒游戏时间", "消息切换、时间条缩短且得分文本与状态一致"],
      ["暂停后恢复", "运行半秒、暂停两秒墙钟时间，再恢复半秒", "游戏只消耗一秒，暂停期间状态保持不变"],
    ),
  }),
  p({
    unitId: "bcgp3-04",
    path: "00-fundamentals/flow-control",
    focus: "用循环、数组、enum class、switch 与函数把树枝生长和命中规则表达成有限、可检查的状态变换",
    invariant: "树枝数组的索引范围始终有效，新增状态只通过受控分支产生，函数调用前后保持数组长度与枚举合法性",
    fault: "把数组整体上移时从头向后复制，覆盖尚未读取的树枝状态",
    evidence: "循环上下界、每次数组快照、枚举值、switch 分支和函数输入输出",
    zones: zones(
      ["离散状态", "树枝数组、位置索引与 enum class"],
      ["控制规则", "for/while、switch 和函数边界"],
      ["游戏结果", "新树枝生成、旧树枝移动与可见布局"],
    ),
    trace: ["保存旧数组", "检查循环界", "移动元素", "生成新状态", "验证布局"],
    scenarios: scenarios(
      ["安全移动树枝", "给定一组已知树枝方向，从末尾向前移动数组", "每个旧元素只被读取一次，新元素仅写入首位"],
      ["边界枚举输入", "输入 None、Left、Right 三种合法状态并尝试非法整数", "合法状态命中唯一分支，非法值不能静默进入游戏状态"],
    ),
  }),
  p({
    unitId: "bcgp3-05",
    path: "01-game-basics/timber-finale",
    focus: "把玩家输入、木头飞行、精灵碰撞、声音与死亡条件提交成 Timber 的可玩回合",
    invariant: "一次砍击只提交一次分数、一次树枝移动和一次音效；死亡后更新规则停止但结束画面仍可绘制",
    fault: "在事件和实时输入两处同时处理同一次按键，造成一次砍击加两分并播放两次音效",
    evidence: "输入边沿、回合状态、碰撞矩形、分数增量、音效触发次数和结束条件日志",
    zones: zones(
      ["玩家意图", "左/右砍击与回合阶段"],
      ["规则提交", "碰撞、树枝移动、分数和死亡"],
      ["反馈表现", "飞行木头、声音与结束消息"],
    ),
    trace: ["捕获砍击", "计算碰撞", "提交回合", "触发反馈", "判断结束"],
    scenarios: scenarios(
      ["安全砍击", "玩家在无树枝的一侧触发单次按键边沿", "分数增加一次，木头与声音各触发一次，游戏继续"],
      ["树枝致死", "玩家所在一侧在树枝移动后被占据", "死亡状态只提交一次，后续输入不会继续加分"],
    ),
  }),
  p({
    unitId: "bcgp3-06",
    path: "00-fundamentals/classes-oop",
    focus: "用 Bat 类封装位置、速度和边界，通过构造、update 与 getShape 合同启动 Pong",
    invariant: "Bat 自己维护合法位置，外部只通过公开接口表达意图，渲染读取的形状与内部位置一致",
    fault: "把 position 和 shape 同时暴露给 main 修改，导致逻辑坐标与绘制坐标分叉",
    evidence: "构造参数、私有成员快照、公开方法调用、边界夹取和 shape.getPosition 结果",
    zones: zones(
      ["对象合同", "构造、公开方法与私有不变量"],
      ["状态更新", "方向、速度、delta time 与边界"],
      ["Pong 输出", "Bat 的 RectangleShape 位置与绘制"],
    ),
    trace: ["构造 Bat", "接收意图", "计算位移", "夹取边界", "同步形状"],
    scenarios: scenarios(
      ["向右移动", "按住右键一秒，窗口宽度足够容纳球拍", "位移等于速度乘时间且内部位置与形状一致"],
      ["触碰右边界", "从靠近右边界的位置继续输入向右", "球拍停在合法最大 x，不能离开窗口"],
    ),
  }),
  p({
    unitId: "bcgp3-07",
    path: "01-game-basics/collision-detection",
    focus: "用 Ball 类、AABB 重叠、速度反射、计分与三路比较运算符完成 Pong 的可重复碰撞规则",
    invariant: "一次接触只产生一次法线方向反射；分数变化与球越过边界事件一一对应",
    fault: "球仍与球拍重叠时每帧反转水平速度，造成速度来回抖动和粘连",
    evidence: "前后 AABB、穿透方向、碰撞法线、速度向量、接触阶段和计分事件",
    zones: zones(
      ["几何状态", "Ball/Bat AABB 与相对位置"],
      ["物理规则", "重叠判断、分离与速度反射"],
      ["回合结果", "出界、重置、计分与比较"],
    ),
    trace: ["保存旧位置", "检测 AABB", "求接触方向", "分离并反射", "提交计分"],
    scenarios: scenarios(
      ["正面击中球拍", "球从左侧进入球拍 AABB，水平速度指向右", "只反射 x 速度并先解除重叠，不发生重复碰撞"],
      ["球越过底线", "球完全越过玩家防守边界且未与球拍接触", "对手得一分，球按规定位置和速度重置"],
    ),
  }),
  p({
    unitId: "bcgp3-08",
    path: "01-game-basics/zombie-views",
    focus: "用 Player、主游戏循环和 sf::View 把大于窗口的 Zombie Arena 世界映射到相机视口",
    invariant: "世界对象使用世界坐标更新，View 只改变观察映射；窗口事件和 HUD 不应被相机位置污染",
    fault: "移动相机时同时改写所有僵尸的世界坐标，导致逻辑碰撞与渲染位置分叉",
    evidence: "Player 世界位置、View center/size/viewport、对象边界、窗口像素和映射结果",
    zones: zones(
      ["世界模型", "Player、僵尸和 Arena 的世界坐标"],
      ["观察映射", "sf::View 的 center、size 与 viewport"],
      ["窗口输出", "世界画面、事件和固定界面"],
    ),
    trace: ["更新玩家", "设置 View", "裁剪世界", "绘制对象", "呈现窗口"],
    scenarios: scenarios(
      ["玩家向右移动", "Player 世界 x 增加，相机跟随但 Arena 对象坐标不变", "玩家保持在预期屏幕位置，世界对象相对滚动"],
      ["窗口尺寸变化", "改变窗口像素尺寸并保持同一 View 世界尺寸", "可见世界范围按策略保持，逻辑坐标不被缩放写回"],
    ),
  }),
  p({
    unitId: "bcgp3-09",
    path: "00-fundamentals/functions",
    focus: "用 C++ 引用传递世界数据，以 sprite sheet 和 sf::VertexArray 批量构造可滚动背景",
    invariant: "非拥有引用的生命周期短于被引用对象，VertexArray 的 primitive type、顶点数、纹理坐标和世界坐标保持匹配",
    fault: "返回对局部 VertexArray 或临时纹理的引用，调用结束后继续绘制悬空对象",
    evidence: "引用绑定对象地址、所有者作用域、顶点数量、position/texCoords 和 draw 调用",
    zones: zones(
      ["数据所有权", "调用方对象、引用参数和资源寿命"],
      ["几何构造", "sprite sheet tile 到 VertexArray 顶点"],
      ["滚动输出", "纹理坐标、世界位置与批量绘制"],
    ),
    trace: ["绑定引用", "选择 tile", "写入顶点", "提交数组", "验证寿命"],
    scenarios: scenarios(
      ["构造 Arena 背景", "调用方预分配 VertexArray，并以引用交给背景构造函数", "函数返回后数组仍由调用方拥有且顶点可绘制"],
      ["临时资源误用", "把局部纹理地址写入离开作用域后仍使用的对象", "生命周期检查拒绝该设计，不用偶尔正常画面证明安全"],
    ),
  }),
  p({
    unitId: "bcgp3-10",
    path: "02-project/pointers-stl",
    focus: "区分拥有与观察指针，用 std::vector 管理可变实体集合，并把纹理生命周期提升到所有 Sprite 之上",
    invariant: "每个动态对象只有一个明确所有者，vector 变更后不继续使用可能失效的元素地址，纹理活得比 Sprite 久",
    fault: "保存 vector 元素指针后触发扩容，再通过旧地址更新僵尸",
    evidence: "所有权图、vector size/capacity、扩容前后地址、析构日志及纹理/精灵寿命",
    zones: zones(
      ["所有权", "对象创建、指针职责与析构"],
      ["集合变化", "vector 容量、插入、擦除和迭代"],
      ["资源绑定", "Texture 所有者与 Sprite 观察关系"],
    ),
    trace: ["创建所有者", "加入 vector", "记录容量", "更新实体", "按序销毁"],
    scenarios: scenarios(
      ["生成一波僵尸", "预留足够容量后创建并加入固定数量实体", "集合大小正确，所有对象被更新且退出时只析构一次"],
      ["触发重新分配", "保存元素地址后插入直到 vector 扩容", "旧地址被判定失效，代码改用索引、迭代器规则或稳定所有权"],
    ),
  }),
  p({
    unitId: "bcgp3-11",
    path: "02-project/texture-holder",
    focus: "让 TextureHolder 集中加载、缓存并借出纹理，同时把单实例便利性与隐藏全局状态的代价写清",
    invariant: "同一路径只加载一次，返回的 Texture 引用在所有 Sprite 使用期间稳定有效，失败项不进入缓存",
    fault: "用 map 的 operator[] 先插入空纹理，再忽略 loadFromFile 失败并返回该条目",
    evidence: "规范化资源键、缓存命中/未命中、加载返回值、Texture 地址和销毁顺序",
    zones: zones(
      ["资源请求", "路径键、调用点与静态访问入口"],
      ["缓存所有权", "TextureHolder、map 与稳定对象寿命"],
      ["借用结果", "Sprite 保存的 Texture 关系与加载错误"],
    ),
    trace: ["规范化键", "查找缓存", "加载纹理", "原子插入", "借出引用"],
    scenarios: scenarios(
      ["重复请求同一纹理", "两个 Sprite 依次请求同一个规范化路径", "只发生一次文件加载，两次获得同一稳定 Texture 对象"],
      ["纹理文件缺失", "请求一个不存在的资源路径", "失败被报告且缓存不留下伪成功空条目"],
    ),
  }),
  p({
    unitId: "bcgp3-12",
    path: "02-project/pickups-bullets",
    focus: "把 Bullet、准星、Pickup 与玩家—僵尸—子弹碰撞组织成有生命周期和冷却时间的明确规则",
    invariant: "子弹命中后只消费一次，Pickup 只在激活窗口内生效，同一实体不能在擦除后继续参与本帧碰撞",
    fault: "遍历 vector 时擦除当前子弹却继续使用失效迭代器，导致跳过下一颗或重复命中",
    evidence: "实体 active 标志、AABB 对、命中事件、迭代器位置、冷却计时和生命值变化",
    zones: zones(
      ["生成与瞄准", "准星、射击输入、Bullet 初始状态"],
      ["碰撞规则", "玩家、僵尸、子弹、Pickup 的交互矩阵"],
      ["生命周期", "激活、消费、冷却、擦除与重生"],
    ),
    trace: ["生成实体", "推进位置", "检测碰撞", "提交效果", "安全回收"],
    scenarios: scenarios(
      ["子弹命中僵尸", "一颗 active 子弹首次与一个活僵尸 AABB 重叠", "僵尸受一次伤，子弹立即失活且不再命中其他目标"],
      ["Pickup 超时", "Pickup 激活窗口结束后玩家进入其旧位置", "不再触发生命或弹药效果，状态等待下次合法生成"],
    ),
  }),
  p({
    unitId: "bcgp3-13",
    path: "02-project/layered-hud",
    focus: "在同一 RenderWindow 中显式切换 worldView 与 HUD view，更新 HUD、首页和升级界面而不混淆坐标空间",
    invariant: "世界对象只在 worldView 下绘制，HUD 只在固定界面 View 下绘制，每个 draw 调用前 View 状态可追踪",
    fault: "绘制 HUD 前忘记切回默认 View，导致文字随相机移动或缩放",
    evidence: "当前 View 标识、draw 调用序列、世界坐标、HUD 像素位置和窗口截图",
    zones: zones(
      ["世界层", "Arena、玩家、僵尸与 worldView"],
      ["界面层", "Text、血条、弹药与默认 View"],
      ["阶段层", "首页、游戏中、升级与重启画面"],
    ),
    trace: ["设置 worldView", "绘制世界", "切换 HUD view", "更新 HUD", "绘制界面"],
    scenarios: scenarios(
      ["相机跟随战斗", "worldView 中心移动而 HUD 数值不变", "世界滚动，血条和文字保持固定窗口位置"],
      ["进入升级界面", "从战斗阶段切换到 level-up 阶段", "世界更新按设计暂停，升级选项在 HUD View 中清晰显示"],
    ),
  }),
  p({
    unitId: "bcgp3-14",
    path: "02-project/sound-file-io",
    focus: "把最高分文件 I/O、SoundBuffer/Sound 生命周期、升级、新波次与重启组织成可失败且可恢复的提交",
    invariant: "高分文件只在完整解析后替换内存状态，SoundBuffer 在 Sound 播放期间存活，重启清空本局瞬态状态",
    fault: "直接覆盖高分文件后写入中断，下一次启动读取到半条数据并当作合法分数",
    evidence: "临时文件内容、解析结果、替换动作、音频缓冲地址、播放事件和重启前后状态快照",
    zones: zones(
      ["持久化", "读取、验证、临时写入与原子替换"],
      ["音频反馈", "SoundBuffer 所有权、Sound 与触发事件"],
      ["回合推进", "升级、新波次、死亡与重启"],
    ),
    trace: ["读取并验证", "更新游戏状态", "触发声音", "写临时文件", "提交或回滚"],
    scenarios: scenarios(
      ["保存新高分", "本局分数高于已验证的磁盘高分", "完整新值先写临时文件，成功后再替换旧文件"],
      ["损坏存档启动", "高分文件包含非数字或不完整内容", "程序报告并采用安全默认值，不让解析失败污染游戏状态"],
    ),
  }),
  p({
    unitId: "bcgp3-15",
    path: "02-project/game-project",
    focus: "让 Factory 验证并组装 GameObject、Transform、Update 与 Graphics 行为，用 unique_ptr 原子提交完整对象",
    invariant: "半构造对象不可进入世界；每个 GameObject 只有一个所有者，主循环只依赖统一更新与绘制合同",
    fault: "Factory 在资源加载完成前先把对象放入世界，随后失败留下缺少 Graphics 组件的实体",
    evidence: "创建请求、资源查找结果、组件清单、unique_ptr 移交点和每帧接口调用",
    zones: zones(
      ["创建请求", "实体类型、资源键与生成参数"],
      ["Factory 装配", "Transform、Update、Graphics 与验证"],
      ["世界提交", "unique_ptr 所有权和统一主循环"],
    ),
    trace: ["解析请求", "加载依赖", "组装组件", "验证合同", "提交所有权"],
    scenarios: scenarios(
      ["创建完整平台", "Factory 收到合法类型、纹理与 Transform 参数", "完整对象一次性进入世界并响应统一 update/draw"],
      ["缺失图形资源", "创建请求引用不存在的纹理键", "Factory 返回失败，世界对象数量和所有权图保持不变"],
    ),
  }),
  p({
    unitId: "bcgp3-16",
    path: "02-project/sound-game-logic",
    focus: "用 SoundEngine、游戏逻辑、事件或命令完成对象间通信，让 Player 与 Factory 不形成双向硬引用",
    invariant: "一个领域事件只被有效订阅者消费一次，发布者不需要知道接收者具体类型，声音是事件结果而非规则来源",
    fault: "Player 直接持有 SoundEngine 和 Factory 指针并在碰撞中同步调用，形成循环依赖和重复副作用",
    evidence: "事件 ID、发布顺序、订阅者列表、命令执行日志、对象引用图和音效触发次数",
    zones: zones(
      ["领域状态", "Player、碰撞、得分与游戏阶段"],
      ["通信边界", "事件、命令、接口与订阅关系"],
      ["副作用", "Factory 创建、SoundEngine 播放和界面反馈"],
    ),
    trace: ["更新 Player", "产生事件", "路由消息", "执行副作用", "记录结果"],
    scenarios: scenarios(
      ["玩家落地", "Player 从空中进入平台接触并产生一次 Landed 事件", "游戏逻辑与声音各消费一次，Player 不持有具体接收者"],
      ["重复消息重放", "用同一事件 ID 再投递一次", "幂等边界阻止重复得分或重复生成，日志保留拒绝原因"],
    ),
  }),
  p({
    unitId: "bcgp3-17",
    path: "02-project/graphics-cameras-action",
    focus: "集中 GameObject 绘制调用，并让主相机、雷达 View 与计时文本共享世界状态但使用各自观察边界",
    invariant: "同一世界快照可被不同 View 绘制，绘制不反向修改游戏状态，计时文本使用游戏时钟而非渲染次数",
    fault: "为雷达绘制再次调用 update，使对象在一个显示帧内推进两次",
    evidence: "世界版本号、update 次数、draw call 序列、各 View 参数、viewport 和计时文本值",
    zones: zones(
      ["世界快照", "已提交的 GameObject 与游戏时间"],
      ["观察系统", "主相机、雷达 View、裁剪和 viewport"],
      ["绘制提交", "draw calls、层次与 timer text"],
    ),
    trace: ["提交世界", "设置主 View", "绘制主画面", "设置雷达 View", "绘制 HUD"],
    scenarios: scenarios(
      ["同帧主画面与雷达", "固定一个世界快照，依次使用主 View 和雷达 View 绘制", "对象只更新一次但以两种观察范围出现"],
      ["暂停计时", "暂停游戏但继续重绘窗口和相机", "timer text 保持不变，绘制次数不会推进游戏时间"],
    ),
  }),
  p({
    unitId: "bcgp3-18",
    path: "02-project/platforms-player-animation-controls",
    focus: "把平台几何、玩家控制、Animator 帧选择与物理状态分离，使动画表现跟随已提交动作",
    invariant: "控制输入先形成意图，物理决定实际运动，Animator 根据已提交状态选帧；动画不能反向决定碰撞位置",
    fault: "按渲染帧数推进动画并用 sprite 帧宽修改碰撞体，造成帧率相关速度和碰撞抖动",
    evidence: "输入意图、物理速度、接地标志、动画状态、累计时间、帧索引和碰撞体",
    zones: zones(
      ["平台物理", "地形边界、接触和玩家 Transform"],
      ["控制状态", "左右、跳跃、速度和接地条件"],
      ["动画表现", "Animator、状态切换、帧时间与 sprite sheet"],
    ),
    trace: ["采样控制", "计算物理", "提交接触", "选择动画", "绘制当前帧"],
    scenarios: scenarios(
      ["地面奔跑", "玩家接地并持续输入向右，提供固定 delta time", "物理位置稳定推进，Animator 循环 run 帧且碰撞体不变"],
      ["空中释放方向", "玩家跳起后释放水平输入", "控制与物理按规则减速，动画切到 airborne 而不篡改位置"],
    ),
  }),
  p({
    unitId: "bcgp3-19",
    path: "02-project/menu-rain",
    focus: "用明确阶段处理开始、暂停、重启、退出，并把雨滴作为可组合 GameObject 接入 update 与 graphics 合同",
    invariant: "菜单动作只触发一次阶段迁移；暂停时世界 update 停止但菜单绘制和事件处理继续，雨滴服从相同对象合同",
    fault: "按键保持期间每帧执行 restart，持续重建世界并泄漏旧对象",
    evidence: "输入边沿、阶段迁移日志、世界实例 ID、对象数量、雨滴 update/draw 次数和析构记录",
    zones: zones(
      ["菜单协议", "Start、Pause、Restart、Quit 的合法迁移"],
      ["游戏阶段", "菜单、运行、暂停、结束与退出"],
      ["雨效组合", "Rain GameObject 的状态、更新和绘制"],
    ),
    trace: ["捕获按键边沿", "验证迁移", "提交阶段", "更新可运行对象", "绘制对应界面"],
    scenarios: scenarios(
      ["开始后暂停", "从 Menu 触发 Start，再用单次按键边沿触发 Pause", "世界实例保持，update 停止，菜单与事件仍工作"],
      ["结束后重启", "从 GameOver 触发一次 Restart", "旧世界完整销毁，只创建一个新世界并回到 Running"],
    ),
  }),
  p({
    unitId: "bcgp3-20",
    path: "02-project/fireballs-spatialization",
    focus: "让 Fireball 事件通过 SoundEngine 设置声源位置，并由 SFML listener、距离和衰减产生可解释的空间听感",
    invariant: "声源和 listener 使用同一世界坐标系，SoundBuffer 生命周期覆盖播放，HUD 音效不被错误空间化",
    fault: "把屏幕像素位置直接当世界声源位置，相机移动时听感漂移但火球逻辑位置未变",
    evidence: "Fireball 世界坐标、listener position/direction、minDistance、attenuation、SoundBuffer 地址和播放状态",
    zones: zones(
      ["世界事件", "Fireball 生成、运动、碰撞与生命周期"],
      ["音频空间", "listener、声源位置、距离和衰减"],
      ["非空间界面", "HUD 类、菜单提示与固定反馈"],
    ),
    trace: ["生成火球", "提交世界位置", "设置 listener", "播放声源", "检查衰减"],
    scenarios: scenarios(
      ["火球接近玩家", "火球沿世界 x 轴接近固定 listener", "声源距离变化可追踪，听感按配置变化且不依赖相机像素"],
      ["HUD 提示音", "触发不属于世界位置的升级界面提示", "使用非空间或相对 listener 的播放策略，不因玩家坐标衰减"],
    ),
  }),
  p({
    unitId: "bcgp3-21",
    path: "02-project/parallax-shaders",
    focus: "用相机位移驱动多层视差，并在 SFML 2.6 Shader/OpenGL 边界内加载、设置 uniform、绘制和回退",
    invariant: "每层偏移由同一相机状态和层系数确定，Shader 失败时仍有可见回退路径，uniform 与目标程序匹配",
    fault: "着色器编译失败后仍无条件用空 Shader 绘制，最终得到黑屏却没有错误日志",
    evidence: "相机位置、层系数、计算后偏移、Shader::isAvailable、loadFromFile 结果、uniform 值和回退 draw 调用",
    zones: zones(
      ["视差状态", "相机位置、层深度和纹理重复"],
      ["Shader 管线", "GLSL 源码、编译、uniform 与 RenderStates"],
      ["完成与回退", "最终合成、能力检测、错误日志和普通绘制"],
    ),
    trace: ["读取相机", "计算层偏移", "检查 Shader", "设置 uniform", "绘制或回退"],
    scenarios: scenarios(
      ["多层视差移动", "相机向右移动 100 世界单位，背景层使用不同视差系数", "近层位移大于远层，所有偏移可由同一公式复算"],
      ["Shader 不可用", "能力检测或编译返回失败", "记录原因并切换普通纹理绘制，游戏仍可操作且非黑屏"],
    ),
  }),
  p({
    role: "final-review",
    path: "02-project/final-review",
    concepts: ["语言与所有权", "实时循环与状态机", "资源与视图", "四项目干净复现"],
    focus: "把 21 章的语言、所有权、实时状态、资源、视图、音频与 Shader 证据串成四个可从空构建目录复现的游戏",
    invariant: "最终验收必须同时覆盖构建、输入、状态、所有权、资源失败、视觉输出与重启恢复，不能只演示一段录屏",
    fault: "只保留已编译二进制和成功截图，删除源码构建记录、资源失败路径与输入重放数据",
    evidence: "四项目源码提交、依赖版本、构建日志、固定输入轨迹、状态快照、失败注入与发布清单",
    zones: zones(
      ["语言与对象", "C++20 类型、类、引用、指针、容器与所有权"],
      ["实时系统", "输入、update、碰撞、阶段、通信与相机"],
      ["表现与发布", "纹理、HUD、音频、视差、Shader 与干净构建"],
    ),
    trace: ["清空构建", "固定依赖", "编译四项目", "重放验收", "归档证据"],
    scenarios: scenarios(
      ["全书干净复现", "在新构建目录按记录版本编译并运行四个项目的最小验收输入", "四个项目均可运行，关键状态与原验收轨迹一致"],
      ["单一资源故障", "分别移除一项纹理、声音或 Shader 资源后重放", "每个失败被定位并走明确回退或终止路径，恢复后结果一致"],
    ),
  }),
];

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

function sourceById(id) {
  const source = FACT_SOURCES.find((item) => item.id === id);
  if (!source) throw new Error(`未知事实来源：${id}`);
  return source;
}

function conceptLabel(group) {
  const english = String(group[0]);
  const chinese = group.find((value) => /[\u3400-\u9fff]/.test(value));
  return chinese && chinese.toLowerCase() !== english.toLowerCase()
    ? `${chinese}（${english}）`
    : english;
}

function objectives(profile) {
  return `<Objectives>

- 能解释“${profile.title}”如何${profile.focus}
- 能逐项定位 ${profile.concepts.join("、")}，说明它们位于源码、运行状态还是可见输出边界
- 能按 ${profile.trace.join(" → ")} 重放“${profile.scenarios[0].label}”，持续检查“${profile.invariant}”
- 能注入“${profile.fault}”，从${profile.evidence}找到第一个不一致并用同输入恢复

</Objectives>`;
}

function sourceSection(profile) {
  const sourceIds = ["publisher", "repository", "sfml-tutorials"];
  if (
    profile.unitId &&
    ["bcgp3-08", "bcgp3-13", "bcgp3-17"].includes(profile.unitId)
  ) {
    sourceIds.push("sfml-view");
  }
  if (
    profile.unitId &&
    ["bcgp3-14", "bcgp3-16", "bcgp3-20"].includes(profile.unitId)
  ) {
    sourceIds.push("sfml-audio");
  }
  profile.sourceIds = sourceIds;
  return sourceIds
    .map((id) => {
      const source = sourceById(id);
      return `- [${source.title}](${source.url})：在“${profile.title}”中，${source.use}。`;
    })
    .join("\n");
}

function conceptSection(profile) {
  return profile.concepts
    .map((concept, index) => {
      const zone = profile.zones[index % profile.zones.length];
      return `### ${concept}

这个正式目录节点落在 **${zone.label}** 边界：${zone.detail}。在本页中，它参与“${profile.focus}”。验收时保存${index % 2 === 0 ? profile.evidence : profile.invariant}，不能只凭最终画面判断。`;
    })
    .join("\n\n");
}

function augmentation(profile, componentBase) {
  const sources = sourceSection(profile);
  return `{/* BEGINNING_CPP_GAME_PROGRAMMING_QUALITY_V2_START */}

## 第三版来源、工具链与版本边界

“${profile.title}”对齐 Packt 2024 年第三版的对应章节范围，并以官方公开代码仓库和 SFML 官方文档核对本页可公开验证的工程事实。本页是独立中文重写，不复现原书正文，也不把商品页、目录或代码仓库冒充完整原版。

在“${profile.title}”中，第三版示例使用 **SFML 2.6.1 时代 API**。本页保留与本章有关的 2.6 系列合同；SFML 3 的事件、角度、时长和构造接口差异不会被静默回填。升级工具链时必须单独记录本章迁移补丁，不能把版本不匹配误判为“${profile.concepts[0]}”概念错误。

${sources}

## 正式概念与运行状态合同

${conceptSection(profile)}

| 验收项 | 本页合同 |
| --- | --- |
| 最小正常场景 | ${profile.scenarios[0].input} |
| 边界或恢复场景 | ${profile.scenarios[1].input} |
| 必须保持 | ${profile.invariant} |
| 单一故障 | ${profile.fault} |
| 可观察证据 | ${profile.evidence} |

## 先预测，再操作三个本页实验

### 实验一：从源码到可见结果

先预测“${profile.scenarios[0].label}”会怎样穿过 ${profile.zones.map((zone) => zone.label).join(" → ")}，再切换场景和正式概念。每次操作都必须能回到同一初始状态。

<${componentBase}PipelineLab />

### 实验二：逐步执行状态轨迹

依次执行 ${profile.trace.join(" → ")}。每一步只选中一个阶段，并持续检查“${profile.invariant}”。

<${componentBase}FrameLab />

### 实验三：单一故障与同输入恢复

注入“${profile.fault}”，定位第一项不一致；撤销后用完全相同的“${profile.scenarios[1].label}”重放。只有中间状态和最终输出一起恢复才算修复。

<${componentBase}FaultLab />

## 易错边界与工程取舍

<Callout type="trap" title="能显示不等于状态正确">
  偶尔出现正确画面、声音或分数，不能证明所有权、时间步和阶段提交正确。必须用${profile.evidence}复算中间状态。
</Callout>

<Callout type="trap" title="API 版本不能混用">
  “${profile.title}”以 SFML 2.6.1 时代接口为基线。直接粘贴 SFML 3 示例可能改变本页依赖的事件、时长、角度或构造合同；迁移必须围绕“${profile.invariant}”单独记录和验证。
</Callout>

<Callout type="trap" title="重置界面不等于恢复程序">
  重置按钮必须恢复源码/资源假设、初始状态和输入序列。若只清空可见提示，却没有重新满足“${profile.invariant}”，故障仍然存在。
</Callout>

{/* BEGINNING_CPP_GAME_PROGRAMMING_QUALITY_V2_END */}`;
}

function wrapperSource(profile) {
  const slug = path.basename(profile.path);
  const componentBase = pascal(slug);
  const model = {
    unitId: profile.unitId ?? profile.role,
    title: profile.title,
    focus: profile.focus,
    invariant: profile.invariant,
    fault: profile.fault,
    evidence: profile.evidence,
    concepts: profile.concepts,
    zones: profile.zones,
    trace: profile.trace,
    scenarios: profile.scenarios,
  };
  return `"use client";

import {
  CppGameBuildLab,
  type CppGameBuildModel,
} from "./cpp-game-build-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies CppGameBuildModel;

export function ${componentBase}PipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function ${componentBase}FrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function ${componentBase}FaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
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

function insertGeneratedImport(body, source) {
  const importMatches = [...body.matchAll(/^import .*;$/gm)];
  if (importMatches.length === 0) return `${source}\n\n${body}`;
  const last = importMatches.at(-1);
  const end = last.index + last[0].length;
  return `${body.slice(0, end)}\n${source}${body.slice(end)}`;
}

function updateManifest(document, profiles) {
  const manifest = document.books?.[BOOK];
  if (!manifest) throw new Error(`缺少 fidelity manifest：${BOOK}`);
  const formalPages = profiles.filter((profile) => profile.unitId);
  if (formalPages.length !== 21) {
    throw new Error(`正式单元应为 21，实际 ${formalPages.length}`);
  }

  manifest.edition =
    "Beginning C++ Game Programming, Third Edition (John Horton, Packt, May 2024; C++20 and SFML 2.6.1-era API)";
  manifest.status = "verified-outline";
  manifest.sourceUrl = SOURCES.publisher;
  manifest.secondarySourceUrls = [
    SOURCES.repository,
    SOURCES.sfmlTutorials,
    SOURCES.sfmlView,
    SOURCES.sfmlAudio,
  ];
  manifest.sourceKind =
    "official-publisher-outline-plus-official-code-repository-and-sfml-2.6-documentation";
  manifest.verifiedAt = "2026-07-30";
  manifest.disclosureNote =
    "本课程按 Packt 2024 年第三版的 21 个正式教学章节独立中文重写，不是原书翻译。商品页限定版次与目录，Packt 官方仓库核对公开项目代码，SFML 2.6 官方文档核对 API；SFML 3 迁移不被静默混入。";
  manifest.sourceAccess = "outline-only";
  manifest.sourceMode = "independent-rewrite";
  manifest.defaultSourceMode = "independent-rewrite";
  manifest.unitMappingEvidence = PROFILE_PATH.replace(`${ROOT}/`, "");
  manifest.factSourcePolicy =
    "Packt 商品页只核对版次、目录与项目范围；公开代码仓库只承担代码与资源组织证据；SFML 2.6 官方文档承担 API 语义。课程交互、状态合同、故障实验与答案为本站原创，不冒充原书正文。";
  manifest.factSources = FACT_SOURCES.map(({ id, title, url }) => ({
    id,
    title,
    url,
  }));
  const profileByUnit = new Map(
    formalPages.map((profile) => [profile.unitId, profile]),
  );
  manifest.units = manifest.units.map((unit) => {
    const profile = profileByUnit.get(unit.id);
    if (!profile) throw new Error(`正式单元缺少页面：${unit.id}`);
    return {
      ...unit,
      sourceUnitId: unit.id,
      chapterPath: profile.path,
      sourceMode: "independent-rewrite",
      sourceAccess: "outline-only",
      factSourceIds: profile.sourceIds,
    };
  });
  manifest.coverage = {
    formalUnits: 21,
    mappedUnits: 21,
    ratio: 1,
    platformPages: profiles.length,
  };
  manifest.metrics = {
    formalUnits: 21,
    formalNodes: manifest.units.reduce(
      (total, unit) => total + unit.concepts.length,
      0,
    ),
    coursePages: profiles.length,
    interactiveViews: profiles.length * 3,
  };
  manifest.visualImplementation = {
    viewsPerPage: 3,
    modes: ["pipeline", "frame", "fault"],
    sharedComponent:
      "src/components/mdx/beginning-cpp-game-programming/v2/cpp-game-build-lab.tsx",
    retainedStaticDiagrams: 8,
  };
}

const manifestSource = fs.readFileSync(MANIFEST_PATH, "utf8");
const document = JSON.parse(manifestSource);
const manifest = document.books?.[BOOK];
if (!manifest) throw new Error(`缺少 fidelity manifest：${BOOK}`);
const unitById = new Map(manifest.units.map((unit) => [unit.id, unit]));

fs.mkdirSync(COMPONENT_DIR, { recursive: true });

for (const profile of PAGES) {
  const filePath = path.join(CONTENT_DIR, `${profile.path}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${profile.path}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  profile.title = String(parsed.data.title);
  if (profile.unitId) {
    const unit = unitById.get(profile.unitId);
    if (!unit) throw new Error(`缺少正式单元：${profile.unitId}`);
    profile.concepts = unit.concepts.map(conceptLabel);
  }
  const slug = path.basename(profile.path);
  const componentBase = pascal(slug);
  const generatedImport = `import { ${componentBase}PipelineLab, ${componentBase}FrameLab, ${componentBase}FaultLab } from "@/components/mdx/${BOOK}/v2/${slug}";`;

  let body = parsed.content
    .replace(
      /import\s+\{\s*[A-Za-z0-9]+PipelineLab,\s*[A-Za-z0-9]+FrameLab,\s*[A-Za-z0-9]+FaultLab,?\s*\}\s+from\s+"@\/components\/mdx\/beginning-cpp-game-programming\/v2\/[^"]+";\n?/gm,
      "",
    )
    .replace(
      /\{\/\* BEGINNING_CPP_GAME_PROGRAMMING_QUALITY_V2_START \*\/\}[\s\S]*?\{\/\* BEGINNING_CPP_GAME_PROGRAMMING_QUALITY_V2_END \*\/\}\n*/g,
      "",
    )
    .replace(/<\/Term>\s*。\s*/g, "</Term>\n\n")
    .replace(/<Objectives>[\s\S]*?<\/Objectives>/, objectives(profile))
    .replaceAll(
      "https://subscription.packtpub.com/book/game-development/9781835081747/pref/preflvl1sec03/what-this-book-covers",
      SOURCES.publisher,
    );
  body = insertGeneratedImport(body, generatedImport);
  body = body.replace(
    "</Objectives>",
    `</Objectives>\n\n${augmentation(profile, componentBase)}`,
  );

  const data = {
    ...parsed.data,
    description: `${profile.title}：保留第三版项目代码讲解，并以源码—状态—输出切片、确定性轨迹和故障重放完成验收。`,
    demo: true,
    draft: false,
    sourceUrl: SOURCES.publisher,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
  };
  delete data.officialUnitId;
  if (profile.unitId) data.officialUnitId = profile.unitId;

  await writeFormatted(filePath, matter.stringify(body, data));
  await writeFormatted(
    path.join(COMPONENT_DIR, `${slug}.tsx`),
    wrapperSource(profile),
  );
}

updateManifest(document, PAGES);
fs.writeFileSync(
  MANIFEST_PATH,
  replaceBookManifest(manifestSource, BOOK, document.books[BOOK]),
);
await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      edition: document.books[BOOK].edition,
      sourceBoundary:
        "Packt official product page for edition/TOC, Packt official repository for public project code, SFML 2.6 docs for API semantics; independent Chinese rewrite, not a translation.",
      sfmlVersionBoundary:
        "The third-edition course preserves SFML 2.6.1-era APIs. SFML 3 migration requires an explicit, separately verified patch.",
      sources: FACT_SOURCES,
      coverage: document.books[BOOK].coverage,
      metrics: document.books[BOOK].metrics,
      pages: PAGES.map((profile) => ({
        role: profile.role,
        unitId: profile.unitId,
        path: profile.path,
        title: profile.title,
        concepts: profile.concepts,
        sourceIds: profile.sourceIds,
        focus: profile.focus,
        invariant: profile.invariant,
        fault: profile.fault,
        evidence: profile.evidence,
      })),
    },
    null,
    2,
  )}\n`,
);

console.log(
  `已治理 ${PAGES.length} 页、${PAGES.filter((page) => page.unitId).length} 个正式单元、${document.books[BOOK].metrics.formalNodes} 个正式概念组和 ${document.books[BOOK].metrics.interactiveViews} 个交互视图。`,
);
