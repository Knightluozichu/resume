import type { ReviewQuestion } from "./types";

/** 类型提示 复习题 */
export const flpTypeHintsQuestions: ReviewQuestion[] = [
  {
    id: "flp-type-hints-1",
    chapter: "flp-type-hints",
    level: 1,
    question: "类型提示（type hints）在运行时会被 Python 解释器强制吗？它主要由谁使用？",
    answer:
      "不会被运行时强制。CPython 解释器在运行时基本忽略类型注解——`def greet(name: str): greet(123)` 不会因为传了 int 而报错，函数照常执行。\n\n类型提示主要由**静态检查工具**（mypy、pyright、IDE 的类型检查器）使用：它们在运行前扫描注解、对照调用，发现类型不一致就报错。注解也会存入函数对象的 `__annotations__` 属性，运行时可反射读取，供框架做依赖注入、序列化（如 Pydantic、FastAPI）。\n\n所以类型提示是「写给工具看」的契约，不改变 Python 的动态运行本质。",
    tags: ["类型提示", "静态检查", "运行时", "mypy"],
  },
  {
    id: "flp-type-hints-2",
    chapter: "flp-type-hints",
    level: 2,
    question: "什么是「渐进式类型」（gradual typing）？它解决了纯静态类型和纯动态类型各自的什么痛点？",
    answer:
      "渐进式类型指类型系统允许**部分标注、部分不标注**：标注了的地方由静态检查器严格检查，未标注的地方退回动态类型（视为 `Any`，不报错）。\n\n解决的痛点：\n1. 纯动态（无注解）：大型项目里类型 bug 要等到运行才暴露，重构时不敢动。渐进式类型让你能给关键模块加注解，提前拦截 bug。\n2. 纯静态（强制全标注）：迁移成本高、样板多，与 Python 灵活风格冲突。渐进式类型允许「逐步加固」，从核心库开始标注，不要求一步到位，可平滑引入老代码库。\n\n价值：既有动态语言的开发速度，又能按需获得静态类型的安全保障，是 Python 类型系统的核心设计哲学。",
    tags: ["渐进式类型", "Any", "静态类型", "动态类型"],
  },
  {
    id: "flp-type-hints-3",
    chapter: "flp-type-hints",
    level: 3,
    question: "请为以下函数添加类型注解，并指出 `list[str]` 与 `List[str]`、`Optional[int]` 与 `int | None` 的区别。",
    answer:
      "```python\ndef parse_tokens(text: str, max_len: int | None = None) -> list[str]:\n    tokens = text.split()\n    if max_len is not None:\n        tokens = tokens[:max_len]\n    return tokens\n```\n\n区别：\n1. `list[str]` vs `List[str]`：`list[str]`（小写内置）是 Python 3.9+ 支持的泛型语法，直接可用；`List[str]` 来自 `typing` 模块，3.9 以下必须用它。3.9+ 推荐 `list[str]`，更简洁、无需 import。\n2. `int | None` vs `Optional[int]`：语义完全相同（表示值可能是 int 或 None）。`int | None` 是 3.10+ 的 `X | Y` 联合类型语法，更直观；`Optional[int]` 是 `typing` 提供的别名（等价于 `Union[int, None]`），3.10 以下需用它。新版推荐 `int | None`。\n\n选型原则：用项目支持的最简语法，3.10+ 优先 `list[str]` 和 `int | None`。",
    tags: ["list泛型", "Optional", "联合类型", "版本差异"],
  },
  {
    id: "flp-type-hints-4",
    chapter: "flp-type-hints",
    level: 4,
    question: "有人说「加了类型提示 Python 就变慢了，而且和动态语言精神冲突」。请指出这种看法的两处偏差，并说明类型提示的真实成本与收益。",
    answer:
      "两处偏差：\n\n1. 性能：类型注解在运行时基本不产生执行开销——解释器只是把注解存进 `__annotations__` 字典，函数调用时不检查类型，所以不会让代码变慢（pydantic 等运行时校验库除外，那是主动选择）。相反，注解能帮工具发现性能反模式。\n2. 「与动态语言冲突」：类型提示是**渐进式**的，不强制全标注，未标注处仍是动态。它不是把 Python 变成 Java，而是给动态代码**可选地**加一层静态契约。运行时仍是动态分派，注解不改变运行行为。\n\n真实成本：\n1. 书写成本：要为函数签名写注解，类型复杂时（泛型、回调）注解本身较长。\n2. 维护成本：注解要随代码演进，否则过时注解会误导检查器。\n3. 工具链成本：需配置 mypy/pyright，CI 里跑类型检查。\n\n真实收益：\n1. 提前拦截类型 bug（传错参数、空值误用），减少运行时错误。\n2. 重构有保护：改函数签名时检查器指出所有受影响调用点。\n3. IDE 智能补全和跳转更准，提升开发效率。\n4. 充当文档：签名即契约，比注释更精确、不会过时。\n\n结论：对中大型项目或多人协作，收益远大于成本；对一次性脚本，不标注也无所谓——这正是渐进式类型的价值。",
    tags: ["性能", "渐进式类型", "成本收益", "工具链"],
  },
];
