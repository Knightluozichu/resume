import type { ReviewQuestion } from "./types";

/** 复合模式章复习题 */
export const dpCompoundPatternsQuestions: ReviewQuestion[] = [
  {
    id: "dp-compound-patterns-01",
    chapter: "dp-compound-patterns",
    level: 1,
    question: `什么是复合模式？为什么需要把多个模式组合在一起使用？`,
    answer: `复合模式（Compound Pattern）是指把两个或多个设计模式组合在一起，协同解决一类问题。单个模式只解决一个维度的变化——Observer 解决「一对多通知」、Strategy 解决「算法可替换」、Composite 解决「部分-整体的统一处理」。但真实系统的需求往往是多维的：既要通知多个视图，又要可替换控制器，还要支持视图的嵌套组合。单一模式覆盖不了所有维度，把它们组合起来才能各司其职、产生协同效应。\n\n最经典的复合模式就是 MVC：它不是一个新的模式，而是 Observer + Strategy + Composite 三个模式的协作。Model 用 Observer 通知 View，View 用 Composite 组合子视图，Controller 以 Strategy 的身份被 View 持有和替换。三个模式缺一不可，组合后才构成完整的 MVC 架构。\n\n注意：复合模式不是「把模式随便堆在一起」，而是模式之间有明确的协作关系——每个模式负责一个解耦维度，彼此配合产生 1+1>2 的效果。`,
    tags: ["复合模式", "模式组合", "协同效应", "基础概念"],
  },
  {
    id: "dp-compound-patterns-02",
    chapter: "dp-compound-patterns",
    level: 2,
    question: `在 MVC 中，Observer、Strategy、Composite 三个模式各自扮演什么角色？`,
    answer: `MVC = Model + View + Controller，三个模式分别对应一条解耦链路：\n\n1. Observer 模式（Model ↔ View）：\n- Model 是被观察者（Subject），持有 observers 列表，提供 \`registerObserver\` / \`notifyObservers\`。\n- View 是观察者，注册到 Model，实现 \`update()\`。Model 状态变化时调用 \`notifyObservers()\`，所有注册的 View 自动收到通知并刷新。\n- 作用：解耦「数据变化」与「界面刷新」——Model 不需要知道有几个 View、是什么 View，只管通知。\n\n2. Strategy 模式（View ↔ Controller）：\n- View 持有一个 Controller 引用（策略接口），把用户输入的处理委托给 Controller。\n- Controller 是具体策略，实现 \`handleInput(event)\`。不同的 Controller 代表不同的输入响应策略，可以在运行时替换。\n- 作用：解耦「界面展示」与「输入处理逻辑」——View 不关心怎么处理点击，Controller 不关心怎么渲染。\n\n3. Composite 模式（View 内部）：\n- View 本身是一个 Composite 节点，可以包含子 View（Button、List、Panel 等），子 View 也可以是 Composite。\n- 所有 View 实现统一接口（\`display()\` / \`update()\`），父 View 的操作递归传递给所有子 View。\n- 作用：解耦「整体视图」与「局部视图」——一个复杂界面被组织成树形结构，刷新时递归调用整棵树即可。\n\n三个模式组合后：Model 变化 → Observer 通知 View 树根 → Composite 递归刷新所有子 View → 用户输入 → View 委托 Controller（Strategy）处理 → Controller 修改 Model → 循环。这就是 MVC 的完整闭环。`,
    tags: ["MVC", "Observer", "Strategy", "Composite", "角色分工"],
  },
  {
    id: "dp-compound-patterns-03",
    chapter: "dp-compound-patterns",
    level: 3,
    question: `设计一个简单的音乐播放器，用 MVC + 模式组合实现。`,
    answer: `场景：音乐播放器有播放/暂停/切歌按钮，显示当前歌曲名和进度条，支持多种播放策略（顺序播放、随机播放、单曲循环）。\n\n1. Model（被观察者，Observer 模式）：\n\`\`\`\nclass Playlist implements Subject {\n  private songs: Song[] = [];\n  private currentIndex = 0;\n  private observers: Observer[] = [];\n  // Observer 接口\n  registerObserver(o) { this.observers.push(o); }\n  notifyObservers() {\n    this.observers.forEach(o => o.update(this));\n  }\n  // 业务方法\n  next() { this.currentIndex++; this.notifyObservers(); }\n  getCurrentSong() { return this.songs[this.currentIndex]; }\n}\n\`\`\`\n\n2. View（观察者 + Composite 树节点）：\n\`\`\`\n// 统一的 View 接口（Composite）\nabstract class View implements Observer {\n  protected children: View[] = [];\n  add(v: View) { this.children.push(v); }\n  update(model) { this.render(model); this.children.forEach(c => c.update(model)); }\n  abstract render(model): void;\n}\nclass SongLabelView extends View {\n  render(model) { console.log('当前：' + model.getCurrentSong().name); }\n}\nclass ProgressBarView extends View {\n  render(model) { console.log('进度：' + model.getProgress()); }\n}\nclass PlayerView extends View {  // 根 View（Composite）\n  render(model) { /* 容器框架 */ }\n}\n// 组装树：PlayerView → [SongLabelView, ProgressBarView]\n\`\`\`\n\n3. Controller（Strategy 模式）：\n\`\`\`\ninterface PlayStrategy {\n  handleNext(playlist): void;\n}\nclass SequentialStrategy implements PlayStrategy {\n  handleNext(pl) { pl.next(); }  // 顺序播放\n}\nclass ShuffleStrategy implements PlayStrategy {\n  handleNext(pl) { pl.jumpTo(random()); }  // 随机播放\n}\nclass PlayerController {\n  private strategy: PlayStrategy;\n  setStrategy(s) { this.strategy = s; }  // 运行时切换\n  onNext(playlist) { this.strategy.handleNext(playlist); }\n}\n\`\`\`\n\n4. 组装闭环：\n- View 注册为 Playlist 的观察者。\n- 用户点击「下一首」→ PlayerView 委托 PlayerController.onNext() → Strategy 决定怎么切 → 修改 Playlist → Playlist.notifyObservers() → View 树递归刷新。\n- 用户切换「随机播放」→ controller.setStrategy(new ShuffleStrategy())，策略运行时替换，View 无感知。\n\n效果：Playlist 不知道 View 的存在（Observer 解耦），View 不知道播放逻辑（Strategy 解耦），界面树可自由嵌套（Composite 解耦）。三个模式各管一条解耦链，组合成完整的播放器架构。`,
    tags: ["应用", "音乐播放器", "MVC", "模式组合", "代码设计"],
  },
  {
    id: "dp-compound-patterns-04",
    chapter: "dp-compound-patterns",
    level: 4,
    question: `模式组合的风险是什么？过度组合会导致什么问题？`,
    answer: `模式组合能产生协同效应，但过度组合会带来严重的复杂度问题：\n\n1. 过度设计（Over-engineering）：\n最典型的风险。一个简单的 CRUD 页面，如果硬套 MVC + Observer + Strategy + Composite + Facade + 命令模式……会产生大量只有一层调用的「胶水类」。系统变得极其臃肿，每个需求改动都要穿越多层间接调用。模式的数量应该和问题的复杂度匹配——简单问题用简单方案，不要为了「显得专业」而堆模式。\n\n2. 理解成本爆炸：\n组合越多，抽象层次越多。读代码的人要在 Observer 的通知链、Strategy 的委托链、Composite 的递归树之间反复跳转，才能理解一个简单的「点击按钮→刷新界面」流程。新人上手成本极高，调试时调用栈深、跳转多，定位问题困难。\n\n3. 模式间相互干扰：\n模式不是正交的，组合时可能冲突。比如 Observer 的通知顺序和 Composite 的递归顺序叠加后，View 的刷新顺序可能不确定；Strategy 替换时如果 Observer 还在通知，可能产生竞态。这些跨模式的交互问题很难在设计阶段预见。\n\n4. 扩展性反而下降：\n模式本是为了扩展性，但过度组合后，加一个新功能可能要同时改多个模式的协作点（改 Observer 接口 + 改 Strategy 实现 + 改 Composite 节点），牵一发动全身。僵化的模式骨架反而成了负担。\n\n5. 性能损耗：\n每多一层模式就多一层间接调用。Observer 的动态分发、Composite 的递归遍历、Strategy 的接口调用……叠加起来在热路径上可能有可测量的性能开销。\n\n判断原则：\n- 模式是药不是维生素——有「病」（明确的扩展需求、变化点）才吃药，没病别吃。\n- 先用最简单的方案实现，等真正出现重复变化点时再引入模式重构（Refactoring to Patterns）。\n- 一个模式能解决就不要用两个；组合模式时要确保每个模式都有不可替代的职责。\n- 团队不熟悉的模式慎用——模式的认知成本也是成本。\n\n总结：复合模式的价值在于「协同解决多维问题」，但前提是问题真的有多维。如果只有一个维度的变化，单个模式足矣；如果问题本身简单，连模式都不需要。过度组合是把「好工具」变成「枷锁」的典型反模式。`,
    tags: ["风险", "过度设计", "过度组合", "工程实践", "权衡"],
  },
];
