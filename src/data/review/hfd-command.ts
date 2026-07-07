import type { ReviewQuestion } from "./types";

/** Head First 设计模式 · 命令模式复习题 */
export const hfdCommandQuestions: ReviewQuestion[] = [
  {
    id: "hfd-command-1",
    chapter: "hfd-command",
    level: 1,
    question: "命令模式的定义是什么？它的四个核心角色是什么？",
    answer:
      "命令模式定义：将请求封装成对象，从而让你可以用不同的请求对客户进行参数化、排队请求、记录日志，以及支持撤销操作。\n\n四个核心角色：\n1. Command（命令接口）：声明 execute() 和 undo() 方法。\n2. ConcreteCommand（具体命令）：实现 Command 接口，持有 Receiver 引用，execute() 调用 Receiver 的方法。\n3. Receiver（接收者）：真正执行工作的对象（如 Light、GarageDoor）。\n4. Invoker（调用者）：持有 Command 引用，在某个时机调用 command.execute()，不关心 Receiver 是谁。\n\n此外 Client 负责创建 ConcreteCommand 并设置其 Receiver。\n\n以遥控器为例：RemoteControl 是 Invoker，LightOnCommand 是 ConcreteCommand，Light 是 Receiver。遥控器按键 → command.execute() → light.on()。",
    tags: ["定义", "四角色"],
  },
  {
    id: "hfd-command-2",
    chapter: "hfd-command",
    level: 2,
    question: "命令模式如何实现撤销（undo）功能？",
    answer:
      "撤销的实现：\n1. Command 接口增加 undo() 方法，与 execute() 对应——execute 做什么，undo 就做相反操作。\n2. ConcreteCommand 在 execute 时记录「之前的状态」，undo 时恢复到之前状态。\n3. Invoker 维护一个命令历史栈，每次 execute 后把命令压栈。撤销时弹栈调用 undo()。\n\n以灯光为例：\n```java\npublic class LightOnCommand implements Command {\n    Light light;\n    public void execute() { light.on(); }\n    public void undo() { light.off(); }  // 开的相反是关\n}\n```\n\n复杂场景（如调光灯调亮度）：\n```java\npublic class DimmerLightOnCommand implements Command {\n    Light light;\n    int prevLevel;  // 记录之前亮度\n    public void execute() {\n        prevLevel = light.getLevel();  // 保存状态\n        light.setLevel(75);\n    }\n    public void undo() {\n        light.setLevel(prevLevel);  // 恢复状态\n    }\n}\n```\n\n多步撤销：Invoker 用栈维护历史，连续 undo 依次弹栈。redo 则把 undo 的命令压入另一个栈。命令对象记录了足够的状态信息来恢复——这是命令模式「请求对象化」的核心价值。",
    tags: ["undo", "撤销", "状态记录"],
  },
  {
    id: "hfd-command-3",
    chapter: "hfd-command",
    level: 3,
    question: "用命令模式实现一个宏命令（一键执行一组操作），例如「一键回家模式：开灯+开空调+放音乐」。写出 Java 代码结构。",
    answer:
      "宏命令是命令模式的组合应用——把多个命令组合成一个命令：\n\n```java\n// 1. Command 接口\npublic interface Command {\n    void execute();\n    void undo();\n}\n\n// 2. 各设备命令（ConcreteCommand）\npublic class LightOnCommand implements Command {\n    Light light;\n    public LightOnCommand(Light l) { light = l; }\n    public void execute() { light.on(); }\n    public void undo() { light.off(); }\n}\npublic class ACOnCommand implements Command { /* ... */ }\npublic class MusicOnCommand implements Command { /* ... */ }\n\n// 3. 宏命令（组合命令）\npublic class MacroCommand implements Command {\n    Command[] commands;\n    public MacroCommand(Command[] cmds) { commands = cmds; }\n    public void execute() {\n        for (Command cmd : commands) cmd.execute();\n    }\n    public void undo() {\n        // 逆序撤销\n        for (int i = commands.length - 1; i >= 0; i--)\n            commands[i].undo();\n    }\n}\n\n// 4. 使用\nCommand[] partyOn = {\n    new LightOnCommand(livingRoomLight),\n    new ACOnCommand(ac),\n    new MusicOnCommand(stereo)\n};\nMacroCommand partyMode = new MacroCommand(partyOn);\nremote.setCommand(0, partyMode);\nremote.onButtonPressed(0);  // 一键执行\n```\n\n关键：MacroCommand 本身也是 Command，可以嵌套——宏命令里可以包含另一个宏命令。undo 逆序执行保证状态正确恢复。",
    tags: ["宏命令", "组合", "Java", "应用"],
  },
  {
    id: "hfd-command-4",
    chapter: "hfd-command",
    level: 4,
    question: "命令模式和策略模式结构很相似（都是把行为封装成对象），它们的本质区别是什么？分别适合什么场景？",
    answer:
      "结构相似但意图本质不同：\n\n1. 意图不同：\n- 命令模式：封装「请求」，让请求可以被存储、传递、排队、撤销——关注请求的生命周期管理。\n- 策略模式：封装「算法」，让算法可互相替换——关注算法的选择和切换。\n\n2. 角色关系：\n- 命令：Command 持有 Receiver 引用，execute 委托给 Receiver。Invoker 不知道 Receiver。\n- 策略：Context 持有 Strategy 引用，委托给 Strategy。没有独立的 Receiver——策略本身就是执行者。\n\n3. 调用方式：\n- 命令：Invoker 在某个时机「触发」command.execute()，命令对象记录上下文。\n- 策略：Context 在需要时「调用」strategy.algorithm()，通常立即执行。\n\n4. 核心能力：\n- 命令：可撤销（undo）、可排队、可记录日志、可宏组合——请求脱离调用栈。\n- 策略：可替换、可选择——算法的运行时切换。\n\n5. 场景判断：\n- 需要 undo/redo、任务队列、宏操作、日志 → 命令模式。\n- 需要运行时切换算法、消除 if-else 分支 → 策略模式。\n- 需要把「做什么」从「谁来做」「什么时候做」中解耦 → 命令。\n- 需要把「怎么做」从「谁来用」中解耦 → 策略。\n\n举例：遥控器按键 → 命令（请求需存储、可撤销）；支付方式选择 → 策略（算法需切换）。两者偶尔可以互换，但意图不同导致设计方向不同。",
    tags: ["综合", "命令 vs 策略", "对比"],
  },
];
