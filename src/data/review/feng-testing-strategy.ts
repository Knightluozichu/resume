import type { ReviewQuestion } from "./types";

export const fengTestingStrategyQuestions: ReviewQuestion[] = [
  {
    id: "feng-testing-strategy-1",
    chapter: "feng-testing-strategy",
    level: 2,
    question: `测试金字塔的三层是什么？为什么底层多、顶层少？`,
    answer:
      `测试金字塔三层：底层是单元测试（隔离函数/模块，验证纯逻辑），中层是集成测试（组件+依赖协作，验证交互路径），顶层是 E2E 端到端测试（模拟真实用户全链路，验证业务流程）。底层多、顶层少的原因是投入产出比：单元测试速度快（毫秒级）、成本低、定位精确（失败就知道是哪个函数），可以大量写覆盖每个分支；E2E 测试速度慢（秒级）、成本高（需启动浏览器+服务）、脆弱（UI 改动易断）、失败定位难（要排查整条链路），只能少量写覆盖关键路径。金字塔倒置（E2E 多、单元少）会导致回馈慢、维护痛苦、脆性高。`,
    tags: ["测试", "测试金字塔", "策略"],
  },
  {
    id: "feng-testing-strategy-2",
    chapter: "feng-testing-strategy",
    level: 3,
    question: `Vitest 和 Jest 有什么区别？什么场景选哪个？`,
    answer:
      `Vitest 是 Vite 原生的测试框架，与 Vite 共享配置和转换管线，原生支持 ESM，不需要额外配置 Babel/ts-jest，启动快、HMR 友好。Jest 是生态最成熟的测试框架，快照测试、mock 生态丰富，社区插件多，但默认基于 CommonJS，对 ESM 支持需要额外配置（babel-jest / experimental-vm-modules），大型项目启动较慢。选 Vitest 的场景：项目已用 Vite 构建，想要零配置开箱即用、ESM 原生支持、与开发服务器共享转换。选 Jest 的场景：已有 Jest 配置基础、依赖 Jest 生态特定插件（如 jest-axe）、项目非 Vite 构建。两者 API 高度相似，迁移成本低。新 Vite 项目首选 Vitest。`,
    tags: ["测试", "Vitest", "Jest", "选型"],
  },
  {
    id: "feng-testing-strategy-3",
    chapter: "feng-testing-strategy",
    level: 3,
    question: `前端集成测试中 Testing Library 的核心哲学是什么？为什么不建议用 enzyme？`,
    answer:
      `Testing Library 的核心哲学是「以用户方式测试组件」——测试应该查询和交互 DOM 的方式与真实用户一致（通过角色、文本、标签等可访问属性），而不是通过组件实例或内部状态。它的指导原则是「组件越像黑盒越好」，避免测试实现细节（内部状态、私有方法），让测试更耐用——重构不破坏测试。不建议用 enzyme 的原因：enzyme 鼓励测试组件内部实现（shallow render、实例方法、setState），这导致测试与实现强耦合，一重构就大面积断测试，维护成本高且测试价值低。Testing Library 强制你从用户视角写测试，自然过滤掉脆弱的实现细节测试。这也符合「测行为不测实现」的工程原则。`,
    tags: ["测试", "Testing Library", "enzyme"],
  },
  {
    id: "feng-testing-strategy-4",
    chapter: "feng-testing-strategy",
    level: 4,
    question: `覆盖率 100% 一定好吗？如何看待和设定测试覆盖率目标？`,
    answer:
      `覆盖率 100% 不等于质量好。覆盖率只衡量「代码被执行过」，不衡量「分支被正确验证」——一个 if/else 都执行过但断言缺失的测试也能 100% 覆盖，却没有验证任何行为。盲目追求 100% 会产生大量低价值测试（为 getter/setter、纯样式等写无意义测试），增加维护负担。正确做法：①把覆盖率作为「底线」而非「目标」——设一个合理阈值（如核心逻辑 80-90%，工具函数 100%），低于阈值 CI 阻断，但不强求全线 100%；②关注「关键路径覆盖」而非数字——核心业务流程、边界条件、错误分支必须有测试，比覆盖率的行数更有价值；③测试质量比数量重要——好的测试名能描述行为、断言验证关键状态、失败时能快速定位。覆盖率是手段不是目的。`,
    tags: ["测试", "覆盖率", "质量"],
  },
];
