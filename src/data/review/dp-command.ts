import type { ReviewQuestion } from "./types";

/** 命令模式章复习题 */
export const dpCommandQuestions: ReviewQuestion[] = [
  {
    id: "dp-command-01",
    chapter: "dp-command",
    level: 1,
    question: `命令模式的核心思想——「将请求封装为对象」是什么意思？`,
    answer: `把一个请求（方法调用）的所有信息——调用谁、调什么方法、传什么参数——打包成一个对象。\n\n没有命令模式时：调用方直接调用 \`light.turnOn()\`，调用方和接收方紧耦合，请求是「即刻发生的一次方法调用」。\n封装成对象后：请求变成一个 \`Command\` 对象，里面有 \`execute()\` 方法。调用方不直接调接收方，而是构造命令对象、传递它、在合适时机调用 \`execute()\`。\n\n好处：请求可以被存储、传递、排队、记录、撤销——因为它现在是一个「东西」（对象），而不是「一个瞬间的动作」。这就是「封装」的力量：把动词变成了名词。`,
    tags: ["核心思想", "基础概念"],
  },
  {
    id: "dp-command-02",
    chapter: "dp-command",
    level: 2,
    question: `命令模式的四个角色（Invoker、Command、ConcreteCommand、Receiver）各自职责是什么？`,
    answer: `1. Command（命令接口）：声明 \`execute()\` 方法（通常还有 \`undo()\`），是所有命令的抽象。\n2. ConcreteCommand（具体命令）：实现 Command 接口，内部持有 Receiver 的引用，把 \`execute()\` 委托给 Receiver 的某个方法。它「绑定」了「谁」做「什么」。\n3. Receiver（接收者）：真正执行业务逻辑的对象（如 \`Light\`、\`Door\`），它不知道命令的存在。\n4. Invoker（调用者）：持有 Command 引用，在某个时机调用 \`command.execute()\`。它不关心命令具体做什么，只负责「触发」。\n\n调用链：Invoker → ConcreteCommand → Receiver。客户端负责创建 ConcreteCommand 并装配到 Invoker。核心解耦：Invoker 和 Receiver 互不认识，通过 Command 桥接。`,
    tags: ["四角色", "结构"],
  },
  {
    id: "dp-command-03",
    chapter: "dp-command",
    level: 3,
    question: `遥控器场景：每个按钮绑定不同命令，如何实现撤销功能？`,
    answer: `1. Command 接口除了 \`execute()\`，再声明 \`undo()\` 方法。\n2. ConcreteCommand 在 \`execute()\` 时记录「执行前的状态」或「反向操作」，以便 \`undo()\` 恢复。\n例如 \`LightOnCommand\`：\n- \`execute()\`：调用 \`light.on()\`，同时记住之前状态。\n- \`undo()\`：如果之前是关的，就调 \`light.off()\`。\n3. 遥控器（Invoker）维护一个「命令历史栈」，每次 \`execute()\` 后把命令压栈。\n4. 撤销按钮弹出栈顶命令，调用其 \`undo()\`。\n\n支持多步撤销：栈保留最近 N 条命令，反复弹栈即可逐步回退。\n\n关键点：撤销的本质是命令对象「知道自己怎么反悔」。没有命令模式，Invoker 无法撤销，因为它根本不知道之前做了什么；有了命令对象，每条命令自带「反操作」能力，Invoker 只管压栈弹栈。`,
    tags: ["撤销", "应用"],
  },
  {
    id: "dp-command-04",
    chapter: "dp-command",
    level: 4,
    question: `命令模式如何实现宏命令（批量执行）？这种实现体现了什么设计思想？`,
    answer: `宏命令（MacroCommand）本身也是一个 Command，但内部持有一组子 Command。\n- \`execute()\`：遍历子命令列表，依次调用每个的 \`execute()\`。\n- \`undo()\`：按相反顺序遍历，依次调用每个的 \`undo()\`。\n\n使用：把多个命令组装进一个宏命令，交给 Invoker，Invoker 调一次 \`execute()\` 就触发整批操作。\n\n这体现了两个设计思想：\n1. 组合模式（Composite）的递归组合思想：宏命令「是一个」命令，同时又「包含」命令。Invoker 不需要区分单命令还是宏命令，统一对待——这就是「透明性」。宏命令可以嵌套（宏命令里再套宏命令），无限组合。\n2. 开闭原则：新增命令类型（单命令或宏命令）不需要改 Invoker，只要实现 Command 接口即可。\n\n典型应用：一键「回家模式」（开灯 + 开空调 + 拉窗帘 + 放音乐）就是一个宏命令；事务也是宏命令的变体——批量执行，失败时整体回滚（undo）。`,
    tags: ["宏命令", "组合", "综合"],
  },
];
