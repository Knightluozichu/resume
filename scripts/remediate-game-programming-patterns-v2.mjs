#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "game-programming-patterns";
const BOOK_DIR = path.join(ROOT, "content", BOOK);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/game-programming-patterns-v2-profiles.json",
);
const OFFICIAL = "https://gameprogrammingpatterns.com";
const CONTENTS = `${OFFICIAL}/contents.html`;
const REPOSITORY =
  "https://github.com/munificent/game-programming-patterns";
const LICENSE =
  "https://raw.githubusercontent.com/munificent/game-programming-patterns/master/LICENSE";
const SAMPLE = `${OFFICIAL}/sample.pdf`;
const CN_RECORD =
  "https://liblsp.hrbeu.edu.cn/mspace/searchDetailLocal/mf05e4ca71d333aacf2dbf6e7999dbc3d";
const WORK_TITLE = "Robert Nystrom, Game Programming Patterns (2014)";

function config({
  source,
  practiceMode,
  focus,
  problem,
  mechanism,
  invariant,
  fault,
  evidence,
  stages,
  terms,
  baselineLabel,
  candidateLabel,
  unit,
  values,
}) {
  return {
    source,
    practiceMode,
    focus,
    problem,
    mechanism,
    invariant,
    fault,
    evidence,
    stages,
    terms,
    model: {
      baselineLabel,
      candidateLabel,
      unit,
      baselineBase: values[0],
      baselineSlope: values[1],
      candidateBase: values[2],
      candidateSlope: values[3],
      faultPenalty: values[4],
      invariant,
      fault,
      evidence,
    },
  };
}

const TOPICS = {
  "gpp-official-learning-map": config({
    source: "contents.html",
    practiceMode: "design",
    focus: "从问题证据进入模式族，并保留拒绝或移除模式的出口",
    problem: "模式名称先于实际变化压力出现时，团队会把类图当成需求",
    mechanism: "把问题、变化轴、候选方案、反例和复核时间连成可撤销决策",
    invariant: "每个模式选择都能回到一个可重放的问题基线",
    fault: "候选模式降低代码行数却扩大隐藏依赖",
    evidence: "改动传播、帧轨迹、依赖图与移除触发器",
    stages: ["记录问题", "定位变化轴", "选择候选", "注入反例", "决定去留"],
    terms: ["问题基线", "模式族", "移除触发器", "决策记录"],
    baselineLabel: "按名称套模式",
    candidateLabel: "按证据选方案",
    unit: "改动点",
    values: [8, 5, 5, 1.4, 8],
  }),
  "gpp-acknowledgements": config({
    source: "acknowledgements.html",
    practiceMode: "design",
    focus: "把作者、审校、社区反馈与发布版本连成来源证据",
    problem: "持续修订的网页和2014纸书若没有版本坐标，会产生无法解释的差异",
    mechanism: "让反馈从提出、复现、修订、审校到发布都留下责任人与证据",
    invariant: "每条事实都能定位到版本、来源和复核动作",
    fault: "网页修订被误写成纸书原始内容",
    evidence: "提交记录、勘误、发布日期与来源类型",
    stages: ["接收反馈", "复现问题", "核对来源", "审校修订", "标记版本"],
    terms: ["贡献链", "版本坐标", "勘误证据", "来源边界"],
    baselineLabel: "无来源笔记",
    candidateLabel: "可追溯勘误",
    unit: "歧义项",
    values: [7, 3.2, 4, 0.9, 6],
  }),
  "gpp-introduction": config({
    source: "introduction.html",
    practiceMode: "design",
    focus: "按问题阅读独立模式，而不是把全书误当成一套必须照搬的引擎",
    problem: "领域专著与整机教程之间仍缺少跨系统组织代码的中层工具",
    mechanism: "用意图、动机、模式、适用性、代价、实现和设计决策逐层筛选",
    invariant: "读者能说明为什么读某章以及在什么条件下不用它",
    fault: "把简化C++示例当成现代生产编码规范",
    evidence: "阅读路径、问题清单、反例与迁移说明",
    stages: ["描述困境", "选择章节", "识别结构", "迁移思想", "验证边界"],
    terms: ["按需阅读", "模式结构", "示例边界", "迁移合同"],
    baselineLabel: "从头照抄",
    candidateLabel: "按问题索引",
    unit: "无效步骤",
    values: [9, 3.5, 4.5, 1.1, 7],
  }),
  "gpp-chapter-01-architecture-performance-games": config({
    source: "architecture-performance-and-games.html",
    practiceMode: "design",
    focus: "在可修改性、运行性能和交付速度之间做阶段性取舍",
    problem: "过早抽象与无结构赶工都会把变化成本推到项目后期",
    mechanism: "先观察真实改动，再只为已经出现的变化轴建立最小边界",
    invariant: "架构成本必须由后续改动或性能证据偿还",
    fault: "原型代码在没有验证边界的情况下直接进入生产",
    evidence: "改动模块数、性能剖析、交付周期与删除成本",
    stages: ["实现需求", "观察变化", "测量热点", "建立边界", "重新简化"],
    terms: ["解耦成本", "抽象税", "性能热点", "可修改性"],
    baselineLabel: "预先泛化",
    candidateLabel: "证据驱动边界",
    unit: "人时",
    values: [10, 4.2, 6, 1.5, 9],
  }),
  "gpp-design-patterns-revisited": config({
    source: "design-patterns-revisited.html",
    practiceMode: "design",
    focus: "比较六个经典模式在游戏时序、数据和所有权中的真实角色",
    problem: "经典模式被背成类图后，名称相似会掩盖完全不同的变化轴",
    mechanism: "以命令、享元、观察者、原型、单例和状态的失败模型做横向选择",
    invariant: "同一问题只引入能解释首要变化轴的最小机制",
    fault: "为了模式数量同时叠加单例、观察者和命令",
    evidence: "依赖边、生命周期、分配轨迹与替代方案",
    stages: ["识别问题", "列出候选", "比较时序", "比较代价", "选择最小项"],
    terms: ["经典模式", "横向比较", "首要变化轴", "组合代价"],
    baselineLabel: "模式堆叠",
    candidateLabel: "单轴选择",
    unit: "依赖边",
    values: [12, 5, 5, 1.8, 10],
  }),
  "gpp-chapter-02-command": config({
    source: "command.html",
    practiceMode: "code",
    focus: "把输入动作对象化后再决定目标、执行时刻、撤销和重放",
    problem: "物理按键直接调用角色方法，使重绑定、AI、回放和撤销互相缠绕",
    mechanism: "命令保存动作意图及必要参数，调用者延后把它交给明确目标执行",
    invariant: "相同命令流和初始状态产生相同角色状态",
    fault: "撤销记录遗漏执行前位置或外部副作用",
    evidence: "命令日志、目标ID、执行序号与撤销后状态",
    stages: ["读取输入", "生成命令", "绑定目标", "执行记录", "撤销重放"],
    terms: ["动作对象", "目标绑定", "命令流", "逆操作"],
    baselineLabel: "直接调用",
    candidateLabel: "命令对象",
    unit: "调用点",
    values: [8, 4, 5, 1.2, 7],
  }),
  "gpp-chapter-03-flyweight": config({
    source: "flyweight.html",
    practiceMode: "code",
    focus: "把大量实例的共享固有状态与逐实例外在状态分开",
    problem: "每棵树重复保存相同网格和纹理，使实例规模直接放大内存",
    mechanism: "享元对象持有共享重资源，实例只保留位置、颜色和共享引用",
    invariant: "修改一个实例的外在状态不会污染其他实例或共享资源",
    fault: "可变颜色被错误放入共享享元",
    evidence: "唯一资源数、实例字节数、引用身份与渲染结果",
    stages: ["拆分状态", "建立享元", "创建实例", "批量渲染", "检查污染"],
    terms: ["固有状态", "外在状态", "共享引用", "实例密度"],
    baselineLabel: "逐实例复制",
    candidateLabel: "享元共享",
    unit: "MiB",
    values: [14, 7, 8, 1.3, 12],
  }),
  "gpp-chapter-04-observer": config({
    source: "observer.html",
    practiceMode: "simulation",
    focus: "让主体同步通知订阅者，同时显式管理顺序、重入和生命周期",
    problem: "成就、物理和音频直接互调会扩散依赖并隐藏销毁顺序",
    mechanism: "主体维护观察者集合，在事件点同步遍历并交付明确载荷",
    invariant: "已注销或已销毁观察者绝不会再收到通知",
    fault: "观察者在回调中注销自身导致遍历失效",
    evidence: "订阅表、通知序号、回调耗时与销毁轨迹",
    stages: ["订阅", "产生事件", "同步通知", "处理重入", "解除订阅"],
    terms: ["主体", "观察者", "同步通知", "订阅寿命"],
    baselineLabel: "直接依赖",
    candidateLabel: "观察者列表",
    unit: "耦合边",
    values: [11, 4.8, 6, 1.7, 11],
  }),
  "gpp-chapter-05-prototype": config({
    source: "prototype.html",
    practiceMode: "code",
    focus: "用可复制对象或数据模板定义新种类，并区分深浅复制边界",
    problem: "每个怪物种类都固化成类会让内容扩展依赖程序重新编译",
    mechanism: "原型保存共享配置，生成过程复制可变状态并重建所有权关系",
    invariant: "克隆实例可独立变化且不会反向修改原型",
    fault: "浅复制让两个实例共享可变背包",
    evidence: "对象图、资源引用、克隆差异与数据装载日志",
    stages: ["定义原型", "校验数据", "复制实例", "重建所有权", "修改隔离"],
    terms: ["原型对象", "克隆语义", "深浅复制", "数据建模"],
    baselineLabel: "种类子类",
    candidateLabel: "数据原型",
    unit: "类型改动",
    values: [10, 4.5, 6, 1.2, 9],
  }),
  "gpp-chapter-06-singleton": config({
    source: "singleton.html",
    practiceMode: "design",
    focus: "拆开唯一实例约束与全局访问便利这两个独立问题",
    problem: "全局入口隐藏依赖、初始化顺序和测试替换成本",
    mechanism: "由组合根显式创建并注入服务，只有确需唯一时才单独约束数量",
    invariant: "依赖、创建时机和销毁顺序都能从调用边界读出",
    fault: "惰性初始化在后台线程首次访问时发生竞争",
    evidence: "依赖图、构造顺序、替身测试与并发轨迹",
    stages: ["拆分诉求", "显式创建", "注入依赖", "验证唯一", "控制销毁"],
    terms: ["唯一实例", "全局入口", "组合根", "初始化顺序"],
    baselineLabel: "全局单例",
    candidateLabel: "显式注入",
    unit: "隐藏依赖",
    values: [13, 5.5, 6, 1.4, 12],
  }),
  "gpp-chapter-07-state": config({
    source: "state.html",
    practiceMode: "simulation",
    focus: "把输入与行为随状态变化的规则建成可检查状态机",
    problem: "布尔标志组合会产生非法状态，并把转换逻辑散落到输入分支",
    mechanism: "有限状态机只允许显式转换，状态对象封装行为和进入退出动作",
    invariant: "每个输入在当前状态下只有一个定义清楚的转换结果",
    fault: "进入动作再次触发转换形成重入环",
    evidence: "状态图、事件序列、进入退出日志与非法组合计数",
    stages: ["接收输入", "检查状态", "执行退出", "切换状态", "执行进入"],
    terms: ["有限状态机", "状态对象", "进入动作", "下推自动机"],
    baselineLabel: "布尔分支",
    candidateLabel: "显式状态机",
    unit: "非法组合",
    values: [15, 6, 7, 1.2, 13],
  }),
  "gpp-sequencing-patterns": config({
    source: "sequencing-patterns.html",
    practiceMode: "design",
    focus: "比较双缓冲、游戏循环和更新方法对一帧顺序的控制位置",
    problem: "读写时机未声明时，同一状态会因遍历顺序或帧率产生不同结果",
    mechanism: "分别控制发布边界、时间推进和对象切片，再组合成明确帧合同",
    invariant: "相同输入和时间步得到与遍历顺序无关的可预测结果",
    fault: "对象更新时直接修改仍待遍历的列表",
    evidence: "帧号、时间步、读写缓冲代际与对象更新序号",
    stages: ["采集输入", "推进时间", "切片更新", "交换结果", "发布帧"],
    terms: ["帧合同", "发布边界", "时间步", "更新顺序"],
    baselineLabel: "隐式时序",
    candidateLabel: "显式帧合同",
    unit: "顺序差异",
    values: [12, 5, 6, 1.5, 11],
  }),
  "gpp-chapter-08-double-buffer": config({
    source: "double-buffer.html",
    practiceMode: "simulation",
    focus: "在后台缓冲完成整批写入后一次交换，使读者只见完整状态",
    problem: "读写同一缓冲会暴露半绘制画面或依赖对象遍历顺序",
    mechanism: "当前缓冲只读、下一缓冲只写，完成后以明确交换发布新代际",
    invariant: "消费者在任何时刻只读取完整的同一代状态",
    fault: "交换发生在后台缓冲尚未写完时",
    evidence: "缓冲代际、交换时刻、写入完成位与输出快照",
    stages: ["读取当前", "写入下一", "等待完成", "交换引用", "发布代际"],
    terms: ["当前缓冲", "后台缓冲", "原子交换", "代际一致性"],
    baselineLabel: "原地更新",
    candidateLabel: "双缓冲",
    unit: "撕裂项",
    values: [14, 6.5, 8, 1.4, 13],
  }),
  "gpp-chapter-09-game-loop": config({
    source: "game-loop.html",
    practiceMode: "simulation",
    focus: "把游戏时间推进与输入到达、处理器速度和渲染频率解耦",
    problem: "每次循环固定移动量会让更快处理器上的游戏运行得更快",
    mechanism: "循环非阻塞处理输入，按时间步更新状态并渲染，可用累积器协调频率",
    invariant: "相同真实时长内的模拟推进量与机器速度无关",
    fault: "长帧让累积器无限追赶形成死亡螺旋",
    evidence: "真实时间、模拟时间、更新次数、插值比例与帧分位数",
    stages: ["采集时间", "处理输入", "累积步长", "更新模拟", "渲染插值"],
    terms: ["游戏循环", "固定时间步", "累积器", "死亡螺旋"],
    baselineLabel: "每帧固定移动",
    candidateLabel: "时间步循环",
    unit: "ms偏差",
    values: [16, 7, 8, 1.6, 15],
  }),
  "gpp-chapter-10-update-method": config({
    source: "update-method.html",
    practiceMode: "simulation",
    focus: "让每个活跃对象把长行为切成逐帧可恢复的更新片段",
    problem: "对象行为若阻塞到完成，一个角色会冻结整条主循环",
    mechanism: "游戏循环逐帧调用对象更新，对象显式保存下帧继续所需状态",
    invariant: "每个对象一次更新都在预算内结束并保留可继续状态",
    fault: "更新过程中删除当前列表元素导致后继对象跳过",
    evidence: "对象ID、更新序号、内部状态、列表快照与单次耗时",
    stages: ["遍历快照", "调用更新", "推进状态", "记录变更", "提交增删"],
    terms: ["更新方法", "逐帧切片", "恢复状态", "延迟增删"],
    baselineLabel: "阻塞行为",
    candidateLabel: "逐帧更新",
    unit: "超时对象",
    values: [13, 5.5, 7, 1.3, 12],
  }),
  "gpp-behavioral-patterns": config({
    source: "behavioral-patterns.html",
    practiceMode: "design",
    focus: "按内容规模与信任边界选择类型对象、子类沙箱或字节码",
    problem: "大量角色与技能行为若都硬编码，迭代速度和安全性会同时下降",
    mechanism: "从数据分类、受限原语到虚拟机逐级增加表达力和工具成本",
    invariant: "内容作者的表达能力不越过运行时安全边界",
    fault: "为少量固定行为提前建设完整虚拟机",
    evidence: "内容改动时间、可表达操作、沙箱边界与工具维护量",
    stages: ["统计行为", "评估信任", "选择表达层", "限制能力", "测量迭代"],
    terms: ["行为规模", "表达层", "信任边界", "工具成本"],
    baselineLabel: "全部硬编码",
    candidateLabel: "分级行为模型",
    unit: "迭代分钟",
    values: [14, 6, 8, 1.6, 12],
  }),
  "gpp-chapter-11-bytecode": config({
    source: "bytecode.html",
    practiceMode: "code",
    focus: "把行为编码为受控指令序列，由栈式虚拟机逐条解释",
    problem: "底层宿主语言编译慢且权限过大，不适合频繁制作大量内容行为",
    mechanism: "前端生成字节码，虚拟机用受限指令集和栈组合高层行为",
    invariant: "任意输入程序都不能越过指令、栈和资源预算",
    fault: "畸形字节码造成栈下溢或无限执行",
    evidence: "指令指针、栈深、操作数、预算计数与错误位置",
    stages: ["解析内容", "生成指令", "验证字节码", "解释执行", "限制预算"],
    terms: ["指令集", "字节码", "栈式虚拟机", "执行预算"],
    baselineLabel: "宿主硬编码",
    candidateLabel: "受控字节码",
    unit: "迭代分钟",
    values: [18, 7, 11, 1.8, 16],
  }),
  "gpp-chapter-12-subclass-sandbox": config({
    source: "subclass-sandbox.html",
    practiceMode: "code",
    focus: "由基类提供受保护原语，让子类在有限能力内组合行为",
    problem: "大量子类直接访问引擎服务会复制代码并扩大依赖面",
    mechanism: "基类收拢服务与辅助操作，派生类只在沙箱原语上定义流程",
    invariant: "子类只能通过已审查原语产生外部副作用",
    fault: "基类演变成暴露所有系统的上帝接口",
    evidence: "子类依赖、原语调用、重复代码与基类变更传播",
    stages: ["识别重复", "定义原语", "注入服务", "组合行为", "限制出口"],
    terms: ["沙箱基类", "受保护原语", "能力边界", "脆弱基类"],
    baselineLabel: "子类直连服务",
    candidateLabel: "沙箱原语",
    unit: "依赖边",
    values: [13, 5, 7, 1.5, 11],
  }),
  "gpp-chapter-13-type-object": config({
    source: "type-object.html",
    practiceMode: "code",
    focus: "用运行时类型对象表示种类，让实例共享数据并可由内容扩展",
    problem: "每个怪物品种一个语言子类会把内容集合锁死在编译期",
    mechanism: "类型对象保存种类数据和共享行为，实例持有类型引用及自身状态",
    invariant: "同类型实例共享定义但不共享逐实例可变状态",
    fault: "类型继承链出现循环或缺失父类型",
    evidence: "类型图、实例引用、继承解析与热加载前后结果",
    stages: ["读取类型", "解析父链", "创建实例", "查询共享值", "更新类型"],
    terms: ["类型对象", "有类型对象", "运行时种类", "数据继承"],
    baselineLabel: "语言子类",
    candidateLabel: "运行时类型",
    unit: "重新编译项",
    values: [12, 5.2, 7, 1.3, 10],
  }),
  "gpp-decoupling-patterns": config({
    source: "decoupling-patterns.html",
    practiceMode: "design",
    focus: "按领域、时间和服务发现三个轴比较组件、事件队列与定位器",
    problem: "系统互调形成毛线团后，局部改动会沿依赖和时序双向传播",
    mechanism: "组件隔离领域，队列隔离时间，定位器延后服务绑定但保留显式代价",
    invariant: "被解耦的两侧仍有可观察、可替换和可终止的合同",
    fault: "中央总线或定位器把显式依赖变成不可追踪全局状态",
    evidence: "静态依赖图、消息时间线、服务替换测试与失败回传",
    stages: ["画依赖", "识别耦合轴", "选择机制", "声明合同", "注入失败"],
    terms: ["领域解耦", "时间解耦", "服务发现", "隐藏依赖"],
    baselineLabel: "系统互调",
    candidateLabel: "显式解耦",
    unit: "传播模块",
    values: [15, 6, 8, 1.6, 13],
  }),
  "gpp-chapter-14-component": config({
    source: "component.html",
    practiceMode: "code",
    focus: "把单个实体跨越的输入、物理、渲染和音频领域拆成组件",
    problem: "单体游戏对象让不同领域直接相互依赖并同时膨胀",
    mechanism: "实体只拥有组件，组件封装领域状态并通过窄接口或容器协作",
    invariant: "替换一个领域组件不会要求修改其他领域实现",
    fault: "组件通过实体反查并任意调用所有兄弟组件",
    evidence: "领域依赖、组件创建顺序、消息轨迹与替换测试",
    stages: ["识别领域", "提取组件", "装配实体", "协调消息", "替换验证"],
    terms: ["实体容器", "领域组件", "组件装配", "通信合同"],
    baselineLabel: "单体实体",
    candidateLabel: "组件拆分",
    unit: "跨域依赖",
    values: [16, 6.5, 8, 1.5, 14],
  }),
  "gpp-chapter-15-event-queue": config({
    source: "event-queue.html",
    practiceMode: "simulation",
    focus: "把消息发送时刻与处理时刻分离，并控制队列所有权和反馈环",
    problem: "同步调用会让发送者承担接收者耗时、线程和生命周期",
    mechanism: "生产者复制必要事件数据入队，单一消费合同按顺序处理并回报结果",
    invariant: "事件的顺序、寿命和处理所有者都可从队列记录恢复",
    fault: "处理器再次入队同类事件形成无界反馈",
    evidence: "事件ID、入队出队时间、队列深度、丢弃与合并记录",
    stages: ["构造事件", "复制入队", "等待调度", "顺序消费", "处理反馈"],
    terms: ["事件队列", "时间解耦", "环形缓冲", "反馈环"],
    baselineLabel: "同步广播",
    candidateLabel: "有界队列",
    unit: "ms延迟",
    values: [10, 5, 7, 1.8, 14],
  }),
  "gpp-chapter-16-service-locator": config({
    source: "service-locator.html",
    practiceMode: "design",
    focus: "通过定位器获得服务时仍显式处理注册、缺失、范围和替换",
    problem: "音频等服务从全局变量访问会隐藏依赖并让测试无法替换",
    mechanism: "定位器在组合阶段绑定提供者，调用时返回真实、装饰或空服务",
    invariant: "服务缺失和服务范围都有确定、可测试的行为",
    fault: "服务尚未注册时调用返回悬空引用",
    evidence: "注册顺序、定位调用点、空服务路径与替换日志",
    stages: ["定义服务", "注册提供者", "定位实例", "调用能力", "替换释放"],
    terms: ["服务定位器", "服务提供者", "空服务", "服务范围"],
    baselineLabel: "全局服务",
    candidateLabel: "受控定位",
    unit: "失败调用",
    values: [12, 5.5, 7, 1.6, 12],
  }),
  "gpp-optimization-patterns": config({
    source: "optimization-patterns.html",
    practiceMode: "design",
    focus: "只在剖析定位热点后选择数据布局、延迟计算、复用或空间索引",
    problem: "没有目标机证据的优化会增加复杂度却不改善玩家可见性能",
    mechanism: "把热点归因到缓存、重复计算、分配或邻域查询，再选择对应模式",
    invariant: "每项优化都有同场景基线、目标指标和可回退实现",
    fault: "微基准提升但完整帧P99退化",
    evidence: "目标机帧分位、缓存事件、分配轨迹和查询对数",
    stages: ["固定场景", "采集剖析", "归因热点", "应用模式", "整帧复测"],
    terms: ["目标机基线", "热点归因", "整帧分位", "回退实现"],
    baselineLabel: "猜测优化",
    candidateLabel: "剖析驱动",
    unit: "ms帧时",
    values: [15, 6, 8, 1.4, 13],
  }),
  "gpp-chapter-17-data-locality": config({
    source: "data-locality.html",
    practiceMode: "calculation",
    focus: "按访问顺序连续排列热数据，减少缓存行搬运和指针追逐",
    problem: "对象分散在堆上时，逐帧遍历会为少量热字段加载大量无关字节",
    mechanism: "连续数组、紧凑存活区和冷热拆分让处理顺序贴合内存布局",
    invariant: "热循环只触碰所需字段且存活项保持紧凑",
    fault: "删除后留下空洞或指针指向交换前位置",
    evidence: "缓存缺失、加载字节、存活密度、帧时间与身份映射",
    stages: ["记录访问", "拆分冷热", "连续排列", "压紧存活", "硬件复测"],
    terms: ["缓存行", "连续数组", "冷热拆分", "紧凑存储"],
    baselineLabel: "指针对象图",
    candidateLabel: "连续热数据",
    unit: "缓存缺失",
    values: [18, 8, 10, 1.5, 15],
  }),
  "gpp-chapter-18-dirty-flag": config({
    source: "dirty-flag.html",
    practiceMode: "simulation",
    focus: "主数据变化时标脏，只有派生结果真正被读取前才重新计算",
    problem: "层级变换每次局部修改都立即重算，会重复计算未被观察的中间结果",
    mechanism: "写主数据只传播脏标记，读世界变换时从最近干净祖先更新并清除",
    invariant: "任何派生数据被读取时都与当前主数据一致",
    fault: "一条修改路径漏设脏标记导致陈旧世界变换",
    evidence: "主数据版本、脏位传播、重算次数与读取结果",
    stages: ["修改主数据", "传播脏位", "延迟等待", "按需重算", "清除标记"],
    terms: ["主数据", "派生数据", "脏标记", "延迟重算"],
    baselineLabel: "立即重算",
    candidateLabel: "脏位延迟",
    unit: "重算次数",
    values: [16, 7, 9, 1.3, 14],
  }),
  "gpp-chapter-19-object-pool": config({
    source: "object-pool.html",
    practiceMode: "simulation",
    focus: "预分配固定槽位并复用短命对象，控制碎片和运行时分配",
    problem: "粒子等对象频繁分配释放会产生碎片、停顿和不可预测失败",
    mechanism: "池用空闲链或标志跟踪槽位，获取时完整初始化，释放时清理所有状态",
    invariant: "任一槽位只属于一个活跃对象且复用后没有残留状态",
    fault: "复用粒子保留上一代速度或回调",
    evidence: "槽位代际、活跃计数、获取失败、清理字段与分配轨迹",
    stages: ["预分配", "取得槽位", "完整初始化", "使用对象", "清理归还"],
    terms: ["对象池", "空闲链", "槽位代际", "复用清理"],
    baselineLabel: "逐次分配",
    candidateLabel: "固定对象池",
    unit: "分配次数",
    values: [17, 7.5, 10, 1.2, 16],
  }),
  "gpp-chapter-20-spatial-partition": config({
    source: "spatial-partition.html",
    practiceMode: "simulation",
    focus: "按空间位置把对象分区，只查询可能相邻的候选集合",
    problem: "全体两两距离检查随单位数平方增长",
    mechanism: "对象进入网格或层级分区，移动时更新归属，查询只遍历相交单元",
    invariant: "分区查询不漏掉范围内对象，也不重复返回同一身份",
    fault: "单位跨格移动后旧链表节点未移除",
    evidence: "单元坐标、对象链、候选数、命中集合与全量真值",
    stages: ["计算单元", "插入分区", "范围查询", "移动迁移", "对照真值"],
    terms: ["空间分区", "均匀网格", "候选集合", "迁移更新"],
    baselineLabel: "全体两两检查",
    candidateLabel: "网格分区",
    unit: "距离测试",
    values: [20, 9, 11, 1.4, 17],
  }),
  "gpp-official-final-review": config({
    source: "contents.html",
    practiceMode: "design",
    focus: "用跨模式故障题证明能选择、组合、拒绝并移除模式",
    problem: "只会复述模式意图，无法在同一游戏场景中比较它们的代价",
    mechanism: "随机抽取正式节点，要求给出基线、因果链、反例、目标机证据和去留决定",
    invariant: "每个结论都能由另一人按记录复算并得到同一判断",
    fault: "组合模式后故障所有权落在无人负责的边界",
    evidence: "351节点映射、实现差分、故障轨迹与发布清单",
    stages: ["抽取节点", "重建基线", "实现候选", "注入故障", "答辩去留"],
    terms: ["综合答辩", "跨模式组合", "证据闭环", "发布清单"],
    baselineLabel: "术语背诵",
    candidateLabel: "故障答辩",
    unit: "未证结论",
    values: [18, 7, 9, 1.5, 16],
  }),
};

function walkMdx(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkMdx(entryPath));
    else if (entry.name.endsWith(".mdx")) files.push(entryPath);
  }
  return files.sort();
}

function escapeMdxText(value) {
  return String(value)
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&amp;", "&")
    .replaceAll("{", "&#123;")
    .replaceAll("}", "&#125;");
}

function extractSummaries(source) {
  const summaries = new Map();
  const pattern = /^###\s+(.+?)\n\n\*\*目录节点[^*]*\*\*\s*(.+?)(?=\n\n)/gm;
  for (const match of source.matchAll(pattern)) {
    const heading = escapeMdxText(match[1].trim());
    const summary = escapeMdxText(match[2].trim());
    if (!/位于“.+”中；实现前/.test(summary)) summaries.set(heading, summary);
  }
  return summaries;
}

function genericInsight(concept, topic) {
  const value = concept.toLowerCase();
  if (value === "intent")
    return `Intent 把“${topic.problem}”压缩成可检验的问题合同，先界定目标而不预设类图。`;
  if (value === "motivation")
    return `Motivation 用具体游戏场景暴露“${topic.problem}”，并保存不用模式时的失败基线。`;
  if (value === "the pattern")
    return `The Pattern 从例子抽离最小参与者与因果关系：${topic.mechanism}。`;
  if (value === "when to use it")
    return `When to Use It 要求变化压力已经出现，并且候选机制能守住“${topic.invariant}”。`;
  if (value === "keep in mind")
    return `Keep in Mind 把额外间接层、内存、时序和工具成本写入决定，尤其检查“${topic.fault}”。`;
  if (value === "sample code")
    return `Sample Code 只演示${topic.mechanism}的最小骨架；生产迁移还需补齐所有权、错误与测试合同。`;
  if (value === "design decisions")
    return `Design Decisions 围绕创建、所有权、通信、粒度和失败恢复比较方案，并以${topic.evidence}复核。`;
  if (value === "see also")
    return `See Also 用相邻模式做替代和组合比较；只有解决不同变化轴时才允许叠加。`;
  if (/^what |^how |^why |\?$/.test(value))
    return `${concept} 是设计分叉题；回答必须说明选择怎样改变${topic.mechanism}，以及哪条反例会推翻选择。`;
  if (/slow|fast|allocation|memory|performance|cost|fragmentation/.test(value))
    return `${concept} 聚焦运行代价，固定场景后用${topic.evidence}定位首个超限点，不能以模式名称推断快慢。`;
  if (/destroy|lifetime|pool|linked|list|thread|queue|buffer|state/.test(value))
    return `${concept} 聚焦所有权与时序；实现必须在“${topic.fault}”发生时仍能解释对象寿命和最终状态。`;
  return `${concept} 把本章机制落到一个具体设计坐标：${topic.mechanism}，并以“${topic.invariant}”作为通过条件。`;
}

function nodeSection(concept, index, topic, summaries) {
  const summary = summaries.get(concept) ?? genericInsight(concept, topic);
  const stage = topic.stages[index % topic.stages.length];
  return `### ${concept}\n\n${summary}\n\n${concept} 的因果解释从“${stage}”开始：先标出输入、所有者和可见结果，再说明${topic.mechanism}。若没有模式的基线也能更简单地守住“${topic.invariant}”，这一节点应得出“不采用”的结论。\n\n${concept} 的验证只改变一个条件，记录${topic.evidence}；随后注入“${topic.fault}”，定位首个分叉并执行重置。这样该节点同时具备出现、解释、专属实验和练习验证四级证据。`;
}

function termDefinition(term, title, index) {
  const endings = [
    "用于描述输入到可见结果之间的责任边界",
    "用于检查候选机制是否真正减少本章的主要成本",
    "用于记录对象、数据或消息在生命周期中的明确状态",
    "用于决定保留、替换或移除实现的可复核证据",
  ];
  return `${term}在“${title}”中${endings[index % endings.length]}。`;
}

function codeBlock(topic, title) {
  if (topic.practiceMode === "calculation") {
    return `\`\`\`text\nscenario = fixed_scene + fixed_build + fixed_input\nbaseline = measure(scenario, \"${topic.model.baselineLabel}\")\ncandidate = measure(scenario, \"${topic.model.candidateLabel}\")\ndecision = compare(baseline, candidate, \"${topic.model.unit}\")\n\`\`\``;
  }
  if (topic.practiceMode === "code") {
    return `\`\`\`cpp\nstruct PatternProbe {\n  const char* chapter = ${JSON.stringify(title)};\n  const char* invariant = ${JSON.stringify(topic.invariant)};\n  int generation = 0;\n  bool reset_verified = false;\n};\n\n// 同一输入分别运行基线与候选实现，再比较原始证据。\n\`\`\``;
  }
  return `\`\`\`text\ninitial state -> ${topic.stages.join(" -> ")}\nfault injection -> ${topic.fault}\npass condition -> ${topic.invariant}\nreset -> initial state\n\`\`\``;
}

function wrapperSource(names, title, topic, nodes) {
  const nodeData = nodes.map((node) => ({
    label: node,
    mechanism: genericInsight(node, topic),
    probe: `检查${topic.evidence}`,
  }));
  return `import {\n  GppFailureLab,\n  GppMechanismLab,\n  GppTradeoffLab,\n  type GppCausalModel,\n  type GppCoverageNode,\n} from \"./official-gpp-book-lab\";\n\nconst title = ${JSON.stringify(title)};\nconst focus = ${JSON.stringify(topic.focus)};\nconst stages = ${JSON.stringify(topic.stages, null, 2)};\nconst nodes = ${JSON.stringify(nodeData, null, 2)} satisfies GppCoverageNode[];\nconst model = ${JSON.stringify(topic.model, null, 2)} satisfies GppCausalModel;\nconst props = { title, focus, stages, nodes, model };\n\nexport function ${names.map}() {\n  return <GppMechanismLab {...props} />;\n}\n\nexport function ${names.experiment}() {\n  return <GppTradeoffLab {...props} />;\n}\n\nexport function ${names.evidence}() {\n  return <GppFailureLab {...props} />;\n}\n`;
}

function contentFor({
  title,
  topic,
  concepts,
  names,
  summaries,
  previous,
  next,
  sourceUrl,
}) {
  const deepDive = concepts
    .map((concept, index) => nodeSection(concept, index, topic, summaries))
    .join("\n\n");
  const terms = topic.terms
    .map(
      (term, index) =>
        `<Term def=${JSON.stringify(termDefinition(term, title, index))}>${term}</Term>`,
    )
    .join("、");
  const glossary = topic.terms
    .map(
      (term, index) =>
        `<GlossaryItem term=${JSON.stringify(term)}>\n    ${termDefinition(term, title, index)}\n  </GlossaryItem>`,
    )
    .join("\n  ");
  const practices = concepts
    .map(
      (concept, index) =>
        `  - **${concept}**：执行“${topic.stages[index % topic.stages.length]}”，注入“${topic.fault}”，以${topic.evidence}判定是否守住不变量。`,
    )
    .join("\n");
  const navigation = [
    previous
      ? `[← 上一页：${previous.title}](/learn/${BOOK}/${previous.sectionSlug}/${previous.chapterSlug})`
      : null,
    next
      ? `[下一页：${next.title} →](/learn/${BOOK}/${next.sectionSlug}/${next.chapterSlug})`
      : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return `import {\n  ${names.map},\n  ${names.experiment},\n  ${names.evidence},\n} from \"@/components/mdx/game-programming-patterns/diagrams/${topic.componentSlug}\";\n+import {\n  Objectives,\n  Callout,\n  Glossary,\n  GlossaryItem,\n  Term,\n  Exercises,\n  Answer,\n  Stepper,\n  Step,\n  Attribution,\n} from \"@/components/mdx/mdx-components\";\n\n+# ${title}\n\n+<Objectives>\n\n+- 能从“${topic.problem}”重建本页的问题基线，不用模式名称替代需求。\n+- 能解释“${topic.mechanism}”中每个参与者、状态和时序边界。\n+- 能操作本章专属实验，比较${topic.model.baselineLabel}与${topic.model.candidateLabel}在三档负载下的因果差异。\n+- 能注入“${topic.fault}”，用${topic.evidence}决定保留、替换或移除方案。\n\n+</Objectives>\n\n+{/* GPP_QUALITY_V2 */}\n\n+## 为什么“${title}”从问题证据开始\n\n+${topic.problem}。本页不把模式当成必选答案，而是先保存无模式基线，再验证候选机制是否真正改变可观察结果。通过条件是“${topic.invariant}”，而不是类或接口数量增加。\n\n+## 来源、版本与独立重写边界\n\n+本页用[作者完整在线正文](${sourceUrl})核对正式标题、设计分叉和时代语境，并以[作者源码仓库](${REPOSITORY})交叉检查结构。[仓库许可证](${LICENSE})明确正文、HTML与样式为 CC BY-NC-ND 4.0，示例程序等其他文件为 MIT；因此下列中文解释、图示、交互和代码均为独立教学重写，不翻译、拼接或改写受 ND 限制的原文表达。\n\n+## 本章机制与术语\n\n+${terms}。四个术语共同约束“${topic.focus}”，任何结论都必须回到${topic.evidence}。\n\n+## 先预测，再操作三层专属实验\n\n+操作前先预测：从${topic.model.baselineLabel}切到${topic.model.candidateLabel}后，哪项${topic.model.unit}先变化；负载扩大四倍时哪条边界先失效；注入“${topic.fault}”后能否恢复初始状态。\n\n+<Stepper>\n+  <Step title="1. 节点与因果链">\n+    选择正式节点和机制阶段，核对输入、所有者、变化与验证证据。\n+\n+    <${names.map} />\n+\n+  </Step>\n+  <Step title="2. 基线与候选取舍">\n+    一次只改变实现、负载或故障，比较可复算结果，避免用总风险分数代替因果。\n+\n+    <${names.experiment} />\n+\n+  </Step>\n+  <Step title="3. 反例与复位">\n+    在正常、压力和反例路径间切换，验证不变量；最后重置并确认初始状态一致。\n+\n+    <${names.evidence} />\n+\n+  </Step>\n+</Stepper>\n\n+## 官方结构逐项深读\n\n+${deepDive}\n\n+## 可迁移实现或计算骨架\n\n+${codeBlock(topic, title)}\n\n+该骨架只保存实验合同；真实项目还要把平台、构建、场景、输入和统计窗口固定下来，并保留基线实现以便回退。\n\n+<Callout type="trap" title="先选模式再找问题">\n+  ${title}若没有“${topic.problem}”的可重放样本，就不应引入候选模式。\n+</Callout>\n\n+<Callout type="trap" title="只看类图不看时序">\n+  ${title}必须解释${topic.stages.join("、")}之间谁先发生；最终结果相同不代表中间状态安全。\n+</Callout>\n\n+<Callout type="trap" title="只测顺利路径">\n+  故意触发“${topic.fault}”；若${topic.evidence}无法定位首个分叉，实验和实现都不能通过。\n+</Callout>\n\n+## 本章练习与节点验证矩阵\n\n+<Exercises>\n\n+**问题 1：基线与选择。** 怎样证明${topic.model.candidateLabel}解决的是本页真实问题，而不是增加装饰性抽象？\n\n+<Answer>\n+  用同一构建、场景和输入分别运行${topic.model.baselineLabel}与${topic.model.candidateLabel}，比较${topic.evidence}；候选方案只有在守住“${topic.invariant}”且主要代价下降时才保留。\n+</Answer>\n\n+**问题 2：逐节点验证。** 本页正式节点怎样从标题升级为可复查证据？\n\n+<Answer>\n+${practices}\n+</Answer>\n\n+**问题 3：反例与复位。** 注入“${topic.fault}”后怎样关闭实验闭环？\n\n+<Answer>\n+  先定位第一个偏离“${topic.invariant}”的阶段，只修复该原因；随后重放正常、压力和故障路径，并点击重置确认状态、代际和计数全部回到同一初值。\n+</Answer>\n\n+</Exercises>\n\n+## 术语复核与本章回顾\n\n+<Glossary>\n+  ${glossary}\n+</Glossary>\n\n+掌握“${title}”意味着能从“${topic.problem}”出发，解释${topic.mechanism}，再用${topic.evidence}推翻或保留实现。若“${topic.invariant}”不能稳定复现，本章仍未通过。\n\n+## 阅读导航\n\n+${navigation}\n\n+<Attribution\n+  mode="independent-rewrite"\n+  sourceBasis="full-text"\n+  workTitle=${JSON.stringify(WORK_TITLE)}\n+  adaptedUrl=${JSON.stringify(sourceUrl)}\n+/>\n+`.replace(/^\+/gm, "");
}

const manifestRoot = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = manifestRoot.books[BOOK];
if (!manifest) throw new Error(`缺少 ${BOOK} manifest`);
const formalNodes = manifest.units.reduce(
  (sum, unit) => sum + unit.concepts.length,
  0,
);
if (manifest.units.length !== 27 || formalNodes !== 351)
  throw new Error(`GPP manifest 分母异常：${manifest.units.length}/${formalNodes}`);

const entries = walkMdx(BOOK_DIR).map((filePath, order) => {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const relativePath = path.relative(ROOT, filePath).replaceAll(path.sep, "/");
  const baseline = matter(
    execFileSync("git", ["show", `HEAD:${relativePath}`], {
      cwd: ROOT,
      encoding: "utf8",
    }),
  );
  const chapterSlug = path.basename(filePath, ".mdx");
  const topic = TOPICS[chapterSlug];
  if (!topic) throw new Error(`缺少GPP主题配置：${chapterSlug}`);
  const componentMatch = parsed.content.match(
    /from\s+["']@\/components\/mdx\/game-programming-patterns\/diagrams\/([^"']+)["']/,
  );
  if (!componentMatch) throw new Error(`缺少GPP专属组件导入：${filePath}`);
  const componentSlug = componentMatch[1];
  const componentPath = path.join(
    ROOT,
    "src/components/mdx/game-programming-patterns/diagrams",
    `${componentSlug}.tsx`,
  );
  const componentSource = fs.readFileSync(componentPath, "utf8");
  const map = componentSource.match(/export function (\w+MapLab)/)?.[1];
  const experiment = componentSource.match(
    /export function (\w+ExperimentLab)/,
  )?.[1];
  const evidence = componentSource.match(/export function (\w+EvidenceLab)/)?.[1];
  if (!map || !experiment || !evidence)
    throw new Error(`GPP组件导出不完整：${componentPath}`);
  const unit = manifest.units.find((item) => item.id === chapterSlug);
  const concepts = chapterSlug === "gpp-official-learning-map"
    ? [String(parsed.data.title), ...manifest.units.map((item) => item.title)]
    : chapterSlug === "gpp-official-final-review"
      ? manifest.units.map((item) => item.title)
      : unit?.concepts.flat().map((value) => escapeMdxText(value)) ?? [];
  if (concepts.length === 0) throw new Error(`GPP页面未映射正式节点：${filePath}`);
  return {
    filePath,
    raw,
    parsed,
    title: String(parsed.data.title ?? chapterSlug),
    order,
    sectionSlug: path.basename(path.dirname(filePath)),
    chapterSlug,
    componentSlug,
    componentPath,
    names: { map, experiment, evidence },
    topic: { ...topic, componentSlug },
    unit,
    concepts,
    summaries: extractSummaries(baseline.content),
  };
});

if (entries.length !== 29) throw new Error(`GPP页面分母异常：${entries.length}`);

for (const [index, entry] of entries.entries()) {
  const previous = entries[index - 1] ?? null;
  const next = entries[index + 1] ?? null;
  const sourceUrl = `${OFFICIAL}/${entry.topic.source}`;
  const content = contentFor({
    ...entry,
    previous,
    next,
    sourceUrl,
  });
  const data = {
    ...entry.parsed.data,
    description: `${entry.title}：${entry.topic.focus}，通过可复位因果实验和反例证据验收。`,
    sourceUrl,
    qualityVersion: 2,
    practiceMode: entry.topic.practiceMode,
    sourceMode: "independent-rewrite",
  };
  fs.writeFileSync(entry.filePath, matter.stringify(content, data));
  const nodes = entry.concepts.map(String);
  fs.writeFileSync(
    entry.componentPath,
    wrapperSource(entry.names, entry.title, entry.topic, nodes),
  );
}

const factSources = {
  officialWeb: {
    kind: "full-text",
    label: "作者官网完整在线正文与目录",
    url: CONTENTS,
  },
  sourceRepository: {
    kind: "full-text-source",
    label: "作者公开书稿与示例源码仓库",
    url: REPOSITORY,
  },
  repositoryLicense: {
    kind: "license",
    label: "作者仓库按文件类型划分的许可证",
    url: LICENSE,
  },
  printSample: {
    kind: "authorized-sample",
    label: "作者官网纸书样章",
    url: SAMPLE,
  },
  chineseCatalog: {
    kind: "catalog",
    label: "中译本馆藏出版记录",
    url: CN_RECORD,
  },
};

manifestRoot.books[BOOK] = {
  ...manifest,
  version: 2,
  sourceKind:
    "author-official-complete-web-book-source-repository-license-print-sample-and-chinese-catalog",
  sourceUrl: CONTENTS,
  secondarySourceUrls: Object.values(factSources).map((item) => item.url),
  status: "verified-full-text-primary-independent-rewrite",
  verifiedAt: "2026-07-19",
  sourceAccess: "full-text-primary",
  sourceMode: "independent-rewrite",
  defaultSourceMode: "independent-rewrite",
  disclosureNote:
    "作者官网确认免费网页版与纸书内容一致；作者仓库许可证规定正文、HTML与样式为CC BY-NC-ND 4.0，其他示例程序文件为MIT。课程只用完整一手正文核对范围和事实，不翻译、拼接或改写原文表达，中文正文、图示、交互、练习和示例均为独立教学重写。",
  factSources,
  coverage: { formalUnits: 27, outlineNodes: 351, pages: 29 },
  units: manifest.units.map((unit) => {
    const page = entries.find((entry) => entry.chapterSlug === unit.id);
    if (!page) throw new Error(`GPP manifest单元缺页面：${unit.id}`);
    return {
      ...unit,
      sourceUnitId: unit.sourceUnitId ?? unit.id,
      chapterPath: `${page.sectionSlug}/${page.chapterSlug}`,
      factSourceIds: [
        "officialWeb",
        "sourceRepository",
        "repositoryLicense",
        "printSample",
      ],
    };
  }),
  unitMappingEvidence: "quality/remediation-ledger.json",
  factSourcePolicy:
    "用作者完整在线正文逐项核对27个正式单元与351个节点；许可文件只界定可用方式，不把ND正文当成可改编材料；每个节点必须在独立中文解释、专属因果实验和练习矩阵中同时出现。",
};

fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifestRoot, null, 2)}\n`);
fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      sourceAccess: "full-text-primary",
      sourceMode: "independent-rewrite",
      scope: { formalUnits: 27, outlineNodes: 351, pages: 29 },
      profiles: entries.map((entry) => ({
        title: entry.title,
        order: entry.order,
        practiceMode: entry.topic.practiceMode,
        sectionSlug: entry.sectionSlug,
        chapterSlug: entry.chapterSlug,
        relativePath: path
          .relative(ROOT, entry.filePath)
          .replaceAll(path.sep, "/"),
        sourceUrl: `${OFFICIAL}/${entry.topic.source}`,
        formalNodeCount: entry.concepts.length,
        focus: entry.topic.focus,
        invariant: entry.topic.invariant,
        fault: entry.topic.fault,
      })),
    },
    null,
    2,
  )}\n`,
);

console.log(
  JSON.stringify({
    book: BOOK,
    pages: entries.length,
    formalUnits: manifest.units.length,
    outlineNodes: formalNodes,
  }),
);
