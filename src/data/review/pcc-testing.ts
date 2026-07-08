import type { ReviewQuestion } from "./types";

/** Python编程：从入门到实践 · 测试代码复习题 */
export const pccTestingQuestions: ReviewQuestion[] = [
  {
    id: "pcc-testing-1",
    chapter: "pcc-testing",
    level: 1,
    question: "为什么测试函数必须以 test_ 开头？如果不用这个前缀会怎样？",
    answer:
      "测试函数以 `test_` 开头是测试框架（unittest、pytest）的命名约定。框架在运行时自动扫描所有以 test_ 开头的函数并执行它们。\n\n如果不用 test_ 前缀，测试框架不会将其识别为测试函数，不会自动运行。这意味着：\n1. 运行 pytest 或 python -m unittest 时该函数不会被执行\n2. 测试实际上没有运行——你可能以为测试通过了，但实际上它从未执行\n3. 代码中的 bug 不会被检测到\n\n这就是为什么命名约定在测试中至关重要——它不只是风格问题，而是框架发现和运行测试的机制。",
    tags: ["test_命名", "测试框架", "命名约定"],
  },
  {
    id: "pcc-testing-2",
    chapter: "pcc-testing",
    level: 2,
    question: "unittest 常用的断言方法有哪些？assertRaises 怎么使用？",
    answer:
      "常用断言方法：\n- `assertEqual(a, b)` — a == b\n- `assertNotEqual(a, b)` — a != b\n- `assertTrue(x)` / `assertFalse(x)`\n- `assertIn(item, container)` — item in container\n- `assertAlmostEqual(a, b)` — 浮点数近似相等\n- `assertRaises(Exception)` — 期望抛出异常\n\nassertRaises 的两种用法：\n```python\n# 方式1：上下文管理器（推荐）\nwith self.assertRaises(TypeError):\n    \"hello\".split(2)  # split 不接受整数\n\n# 方式2：直接传入可调用对象\nself.assertRaises(ZeroDivisionError, divide, 10, 0)\n```\n\n方式1 更推荐——上下文管理器可以包含多行代码，且更清晰地表达了"这段代码应该抛出异常"的意图。",
    tags: ["断言", "assertRaises", "unittest"],
  },
  {
    id: "pcc-testing-3",
    chapter: "pcc-testing",
    level: 3,
    question: "测试覆盖率 100% 是否意味着代码没有 bug？为什么？",
    answer:
      "不是。覆盖率只衡量"测试执行了多少行代码"，不衡量"测了多少行为"。\n\n100% 覆盖率也可能漏掉 bug 的原因：\n1. **行覆盖 vs 分支覆盖**：if 语句的两条路径都执行了（行覆盖 100%），但可能只验证了一条路径的结果\n2. **边界条件未测**：覆盖了函数代码但没测边界值（如空列表、0、负数、最大值）\n3. **组合场景未测**：每个函数单独测了，但函数组合时的交互行为可能有问题\n4. **断言不够强**：执行了代码但 assert 只检查了不相关的属性\n\n好的测试策略：覆盖率作为参考指标（目标 80%+），同时确保测试了正常路径、边界条件和异常路径三类场景。测试质量比覆盖率数字更重要。",
    tags: ["覆盖率", "测试质量", "边界条件"],
  },
  {
    id: "pcc-testing-4",
    chapter: "pcc-testing",
    level: 4,
    question: "以下测试函数有什么问题？如何改进？\n```python\ndef test_is_even():\n    assert is_even(2) == True\n    assert is_even(3) == False\n    print(\"所有测试通过！\")\n```",
    answer:
      "问题：\n1. **缺少边界条件**：没有测试 0、负数（-2、-3）。bug 往往藏在边界情况中\n2. **print 是误导性的**：assert 失败时会中断，不会执行到 print。但如果函数名写错导致测试从未运行，print 也不会执行，反而掩盖了问题。测试框架会报告通过/失败，不需要手动 print\n3. **assert 风格不够 Pythonic**：`assert is_even(2) == True` 可以简化为 `assert is_even(2)`\n\n改进：\n```python\ndef test_is_even():\n    assert is_even(2)    # 正偶数\n    assert not is_even(3)  # 正奇数\n    assert is_even(0)    # 零\n    assert is_even(-2)   # 负偶数\n    assert not is_even(-3)  # 负奇数\n```\n\n删除 print——测试框架会报告结果。补充边界条件——覆盖正常路径、零值、负数等场景。",
    tags: ["测试质量", "边界条件", "pytest"],
  },
];
