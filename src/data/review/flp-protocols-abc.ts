import type { ReviewQuestion } from "./types";

/** 协议与 ABC 复习题 */
export const flpProtocolsAbcQuestions: ReviewQuestion[] = [
  {
    id: "flp-protocols-abc-1",
    chapter: "flp-protocols-abc",
    level: 1,
    question: `什么是「结构性子类型」和「名义性子类型」？Python 里分别对应什么机制？`,
    answer:
      `结构性子类型：一个类型是否属于某接口，取决于它**有没有**所需方法（看形状），而不看它是否声明继承。Python 里对应 \`typing.Protocol\`——任何具备协议所定义方法的类都自动满足该协议，无需继承。这是「鸭子类型」的静态化。\n\n名义性子类型：一个类型是否属于某接口，取决于它**是否显式继承**了该接口（看血缘）。Python 里对应 \`abc.ABC\` + \`@abstractmethod\`——子类必须显式继承 ABC 并实现抽象方法，否则不能实例化。\n\n一句话：Protocol 看形状，ABC 看血缘。`,
    tags: ["结构性子类型", "名义性子类型", "Protocol", "ABC"],
  },
  {
    id: "flp-protocols-abc-2",
    chapter: "flp-protocols-abc",
    level: 2,
    question: `为什么说 Protocol 是「鸭子类型的静态化」？它比传统鸭子类型多了什么？`,
    answer:
      `传统鸭子类型是运行时行为：\`for x in obj\` 只要 obj 有 \`__iter__\` 就能迭代，解释器在运行时尝试调用，失败才抛异常。它灵活但没有静态保护——传错对象要等到运行才报错。\n\nProtocol 把鸭子类型**静态化**：定义一个 \`Protocol\` 类声明所需方法，mypy/pyright 能在运行前检查「这个对象有没有这些方法」，发现不匹配就静态报错，不必等到运行。\n\n它比传统鸭子类型多的：1. 静态检查的提前拦截，运行前就发现类型不匹配；2. 显式文档，协议本身说明了「我需要什么方法」；3. 不牺牲灵活性——仍然不要求显式继承，第三方类型只要形状对了就适配。所以 Protocol 兼顾了鸭子类型的灵活和静态类型的安全。`,
    tags: ["Protocol", "鸭子类型", "静态化", "mypy"],
  },
  {
    id: "flp-protocols-abc-3",
    chapter: "flp-protocols-abc",
    level: 3,
    question: `请定义一个 \`SupportsDraw\` 协议和一个 \`Drawable\` ABC，各要求 \`draw()\` 方法。说明二者对「未实现 draw 的类」的处理差异。`,
    answer:
      `\`\`\`python\nfrom typing import Protocol\nfrom abc import ABC, abstractmethod\n\n# 协议（结构性）\nclass SupportsDraw(Protocol):\n    def draw(self) -> None: ...\n\nclass Circle:                 # 不继承 SupportsDraw\n    def draw(self) -> None:\n        print(\"circle\")\n\n# ABC（名义性）\nclass Drawable(ABC):\n    @abstractmethod\n    def draw(self) -> None: ...\n\nclass Square(Drawable):\n    pass                      # 未实现 draw\n\`\`\`\n\n差异：\n1. \`Circle\` 不继承 \`SupportsDraw\`，但因有 \`draw\` 方法，mypy 认为它满足协议——这就是结构性。把它传给 \`def render(d: SupportsDraw)\` 静态检查通过。\n2. \`Square(Drawable)\` 未实现 \`draw\`，ABC 会在**实例化时**抛 \`TypeError: Can't instantiate abstract class Square with abstract method draw\`——这是运行时保护。即使不实例化，mypy 也会静态报错。\n\n所以：Protocol 是「你有方法就算」的静态契约；ABC 是「你必须继承并实现，否则不让实例化」的运行时+静态契约。`,
    tags: ["Protocol", "ABC", "abstractmethod", "实例化保护"],
  },
  {
    id: "flp-protocols-abc-4",
    chapter: "flp-protocols-abc",
    level: 4,
    question: `在设计一个库的公共接口时，应选 Protocol 还是 ABC？请从耦合度、可扩展性、第三方适配、过度继承四个维度综合论证。`,
    answer:
      `多数现代 Python 库优先 Protocol，ABC 作为需要强制契约时的补充。论证：\n\n1. 耦合度：Protocol 不要求使用者继承，第三方类型只要形状匹配就能用，耦合最低。ABC 要求显式继承，使用者必须导入你的基类，耦合较高。\n2. 可扩展性：Protocol 是结构性的，新加一个满足形状的类无需改动库代码（开闭原则）。ABC 是名义性的，新类型必须继承基类，库升级基类时所有子类受影响。\n3. 第三方适配：用 Protocol 时，已有的第三方类（如某个 ORM 模型）只要有相应方法就能直接适配，无需包装。用 ABC 时第三方类必须继承你的基类，往往要写适配器 wrapper。\n4. 过度继承：ABC 容易诱导出深继承树（多级 ABC），违反「组合优于继承」。Protocol 鼓励按形状定义小协议，避免继承膨胀。\n\nABC 的适用场景：需要**运行时强制**阻止半成品实例化（抽象方法未实现就报错）、需要提供混入（mixin）的默认实现、需要 \`isinstance\` 做名义判断时。这些是 Protocol 做不到的（Protocol 默认不支持 isinstance，除非 \`runtime_checkable\`，且只检查方法存在不检查签名）。\n\n结论：默认用 Protocol 追求松耦合和可扩展；当需要运行时实例化保护或共享默认实现时用 ABC。二者不是对立，可在同一库分层使用——对外暴露 Protocol，内部用 ABC 复用实现。`,
    tags: ["选型", "耦合度", "可扩展性", "组合优于继承", "mixin"],
  },
];
