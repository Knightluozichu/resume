import type { ReviewQuestion } from "./types";

export const uapDesignPatternsQuestions: ReviewQuestion[] = [
  {
    id: "uap-design-patterns-1",
    chapter: "uap-design-patterns",
    level: 1,
    question: `Unity 项目最常用的四种设计模式是什么？各解决什么问题？`,
    answer: `单例（全局唯一管理器，提供全局访问点）、观察者（一对多事件广播，解耦发布者和订阅者）、状态（将行为封装为状态对象，消除巨型 if-else）、命令（将请求封装为对象，支持排队、回放、撤销）。四者分别解决全局访问、事件解耦、行为切换、操作可逆四个高频痛点。`,
    tags: ["设计模式", "概览"],
  },
  {
    id: "uap-design-patterns-2",
    chapter: "uap-design-patterns",
    level: 2,
    question: `为什么 Unity 中的单例模式要慎用？什么时候才该用？`,
    answer: `单例引入全局状态，破坏可测试性（无法 mock 替换）、隐藏依赖（调用方看不见依赖关系）、导致上帝对象（什么都往里塞）。只在「确实全局唯一且不可替换」时才用，如 AudioManager。其余用 DI 容器注入，测试时可替换 mock。能不用单例就不用——它是最被滥用的模式。`,
    tags: ["单例", "反模式", "可测试性"],
  },
  {
    id: "uap-design-patterns-3",
    chapter: "uap-design-patterns",
    level: 3,
    question: `用状态模式重构一个 7 状态角色的巨型 if-else，核心思路是什么？`,
    answer: `定义 ICharacterState 接口（Enter/Update/Exit），每个状态（Idle/Run/Attack 等）实现为独立类，只管自己的逻辑。角色持有当前状态对象，切换状态 = \`_state.Exit(this); _state = newState; _state.Enter(this);\`。新增状态 = 加一个类，不改现有状态（Open-Closed 原则）。消除 if-else 的根本原因是把「行为」从条件分支提取为「对象」，让扩展点变成新增类而非修改分支。`,
    tags: ["状态模式", "重构", "开闭原则"],
  },
  {
    id: "uap-design-patterns-4",
    chapter: "uap-design-patterns",
    level: 4,
    question: `用命令模式实现一个支持撤销和回放的移动系统，核心数据结构和流程是什么？`,
    answer: `核心是命令栈 \`Stack<ICommand>\` 和命令接口 \`ICommand{Execute(); Undo();}\`。执行时 \`cmd.Execute()\` 并 push 到栈；撤销时 pop 并 \`cmd.Undo()\`。命令对象封装执行和撤销所需全部数据（如移动方向、移动前位置）。回放：把执行的命令序列化存储，重放时按序 Execute。重做：加 redo 栈，撤销时 push 到 redo，重做时 pop redo 执行。命令模式的价值是把「操作」对象化，从而支持排队、回放、撤销——这些普通方法调用做不到。`,
    tags: ["命令模式", "撤销重做", "回放", "综合"],
  },
];
