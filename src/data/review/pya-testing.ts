import type { ReviewQuestion } from "./types";

/** 测试策略 复习题 */
export const pyaTestingQuestions: ReviewQuestion[] = [
  {
    id: "pya-testing-1",
    chapter: "pya-testing",
    level: 1,
    question: `pytest 的 fixture 和 unittest 的 setUp/tearDown 有什么区别？`,
    answer: `fixture 用 yield 分隔 setup/teardown，支持依赖注入和作用域（function/module/session），可在 conftest.py 共享。setUp/tearDown 是类方法，灵活性差。`,
    tags: ["fixture", "pytest"],
  },
  {
    id: "pya-testing-2",
    chapter: "pya-testing",
    level: 2,
    question: `什么是测试金字塔？为什么倒金字塔是反模式？`,
    answer: `金字塔：大量单元（快）在底层，适量集成在中层，少量 E2E 在顶层。倒金字塔慢、脆、难定位。应大量快速单元测试保证覆盖。`,
    tags: ["测试金字塔"],
  },
  {
    id: "pya-testing-3",
    chapter: "pya-testing",
    level: 3,
    question: `如何用 mock 测试依赖外部 API 的函数？`,
    answer: `用 patch 替换 API 客户端，设置 return_value 预设响应。测试函数逻辑不测 API 本身。用 assert_called_with 验证调用。`,
    tags: ["mock", "patch"],
  },
  {
    id: "pya-testing-4",
    chapter: "pya-testing",
    level: 4,
    question: `请设计一个项目的完整测试策略，说明每层职责和比例。`,
    answer: `单元测试70%（逻辑正确性，<10秒，每次commit运行）；集成测试20%（接口契约，<1分钟，每次PR运行）；E2E 10%（关键路径，<10分钟，每日运行）。`,
    tags: ["综合", "测试策略"],
  },
];
