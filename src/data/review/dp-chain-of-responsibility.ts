import type { ReviewQuestion } from "./types";

/** 责任链模式章复习题 */
export const dpChainOfResponsibilityQuestions: ReviewQuestion[] = [
  {
    id: "dp-chain-of-responsibility-01",
    chapter: "dp-chain-of-responsibility",
    level: 1,
    question: "责任链模式的意图是什么？",
    answer: "责任链模式为请求创建一条接收者链，沿链传递请求，直到有一个对象处理它为止。\n\n核心意图：让多个对象都有机会处理同一个请求，将请求的发送者和接收者解耦。发送者不需要知道最终由谁来处理，也不需要知道链的结构和顺序；每个处理者只关心「自己能不能处理」和「处理不了就传给下一个」。客户端只需把请求交给链的入口，链上的节点自行决定处理或转发。",
    tags: ["意图", "基础概念", "解耦"],
  },
  {
    id: "dp-chain-of-responsibility-02",
    chapter: "dp-chain-of-responsibility",
    level: 2,
    question: "责任链模式中 handler 如何决定是处理请求还是传递给下一个处理者？",
    answer: "每个 handler 都实现同一个处理接口（如 `handle(request)`），内部逻辑通常分两步：\n\n1. 判断自己能否处理：根据请求内容或自身职责范围判断。如果自己能处理，就执行处理逻辑并（通常）返回结果，不再向后传递。\n2. 处理不了则转发：如果自己不能处理，就调用 `next.handle(request)` 把请求传给链上的下一个节点；若自己已经是链尾且无人能处理，则请求「落空」。\n\n实现上有两种常见变体：\n- 纯责任链：一个请求要么被某个 handler 完全处理，要么到达链尾无人处理，handler 不既处理又传递。\n- 不纯责任链：handler 可以处理一部分后继续传递（如日志/过滤/预处理链），多个 handler 都能参与处理同一个请求。\n\n关键点：handler 持有对下一个 handler 的引用（`next`），自己不关心链的整体结构，只负责「处理或转发」这一局部决策。",
    tags: ["handler", "转发机制", "结构"],
  },
  {
    id: "dp-chain-of-responsibility-03",
    chapter: "dp-chain-of-responsibility",
    level: 3,
    question: "审批流程场景：请求金额按组长→经理→总监逐级审批，用责任链模式设计。",
    answer: "设计步骤：\n\n1. 定义请求对象 `ExpenseRequest`，包含 `amount`（金额）和 `purpose`（用途）。\n2. 定义处理者抽象 `Approver`，声明 `setNext(approver)` 和 `approve(request)` 方法，内部持有 `next: Approver | null`。`approve` 的默认行为：自己处理不了就调 `next.approve(request)`；若 `next` 为空则提示「无人有权审批」。\n3. 实现具体处理者，按权限划分：\n- `TeamLead`：金额 ≤ 1000，直接审批通过。\n- `Manager`：金额 ≤ 10000，审批通过。\n- `Director`：金额 ≤ 100000，审批通过；超过则上报「需董事会决议」。\n4. 组装链：`teamLead.setNext(manager).setNext(director)`，客户端只把请求交给 `teamLead.approve(request)`，不关心后面还有谁。\n\n效果：\n- 每个审批人只关心自己的额度上限，超过就上抛。\n- 新增审批层级（如插入「副总裁」）只需新建一个 `Approver` 并接到链中，原有节点和客户端代码都不用改。\n- 审批权限调整只需改具体 handler 的阈值，不影响链结构。",
    tags: ["应用", "审批流程", "组装"],
  },
  {
    id: "dp-chain-of-responsibility-04",
    chapter: "dp-chain-of-responsibility",
    level: 4,
    question: "责任链模式的缺点是什么？工程上如何缓解？",
    answer: "主要缺点：\n\n1. 请求可能无人处理：如果链上没有任何 handler 能处理该请求，且链尾没有兜底逻辑，请求会「落空」被静默丢弃，产生难以察觉的 bug。\n2. 调试困难：请求在链上流转，处理逻辑分散在多个节点中，出了问题很难快速定位是哪个 handler 处理的（或为何没处理），需要逐个节点排查。链太长时调用栈也不直观。\n3. 性能隐患：请求可能要遍历整条链才找到处理者，链过长会有性能开销；某些场景下每个节点都做判断也有浪费。\n4. 链的构建和维护需要额外成本：链的组装顺序写错（如把低权限节点放在高权限后面）会导致逻辑错误，且这种错误不易通过类型检查发现。\n\n缓解措施：\n- 链尾加一个「兜底 handler」，明确处理无人接收的请求（抛异常或记日志），避免静默丢失。\n- 给每个 handler 加请求追踪日志（请求 ID + 节点名 + 处理结果），方便调试定位。\n- 控制链的长度，节点过多时考虑用其他模式（如策略 + 工厂按条件直接路由）替代。\n- 链的组装集中在一处（如配置/工厂），避免分散在各处硬编码，便于维护和审查顺序。",
    tags: ["缺点", "调试", "工程实践"],
  },
];
