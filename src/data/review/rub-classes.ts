import type { ReviewQuestion } from "./types";

/** Ruby 基础教程 · 类复习题 */
export const rubClassesQuestions: ReviewQuestion[] = [
  {
    id: "rub-classes-1",
    chapter: "rub-classes",
    level: 1,
    question: "`attr_accessor :name` 等价于什么？为什么不能直接用 `@name` 访问实例变量？",
    answer:
      "`attr_accessor :name` 等价于：\n```ruby\ndef name; @name; end           # getter\ndef name=(value); @name = value; end  # setter\n```\n\n不能直接用 `@name` 外部访问的原因：\n- Ruby 实例变量默认是**封装**的——外部无法直接读写\n- 必须通过方法（getter/setter）间接访问\n- `attr_accessor` 就是省去手写 getter/setter 的宏\n\n对比其他语言：\n- Java：手写 getName/setName 或 IDE 生成\n- Python：可直接 obj.name（无封装）\n- Ruby：用 attr_accessor 自动生成方法，既有封装又简洁\n\n子类可重写 getter 添加逻辑：`def name; @name&.upcase; end`",
    tags: ["attr_accessor", "封装", "getter"],
  },
  {
    id: "rub-classes-2",
    chapter: "rub-classes",
    level: 2,
    question: "以下代码能正确执行吗？如果不能，问题出在哪里？\n```ruby\nclass Counter\n  def initialize; @count = 0; end\n  def increment; @count += 1; end\n  def ==(other); other.count == @count; end\n  private\n  def count; @count; end\nend\na = Counter.new; b = Counter.new; a.increment\nputs a == b\n```",
    answer:
      "不能正确执行。`other.count` 会抛 `NoMethodError`。\n\n问题：`count` 是 private 方法，在 `==` 中通过 `other.count` 调用——显式指定了接收者 `other`。Ruby 的 private 方法**不能显式指定接收者**，即使是同类实例也不行。\n\n修复：将 `count` 改为 `protected`：\n```ruby\nprotected  # 改为 protected\ndef count; @count; end\n```\n\nprotected 允许同类实例之间访问彼此的方法——这正是 `==`、`<=>` 等比较方法需要的。这就是 protected 存在的意义。",
    tags: ["private", "protected", "访问控制"],
  },
  {
    id: "rub-classes-3",
    chapter: "rub-classes",
    level: 3,
    question: "子类的 `initialize` 忘记调用 `super` 会有什么问题？super 的三种形式分别是什么？",
    answer:
      "忘记调用 `super` 的问题：\n子类 `initialize` 不会自动调用父类的 `initialize`。如果父类在 `initialize` 中设置了关键实例变量（如 `@name`），子类不调用 `super` 会导致 `@name` 为 `nil`，引发后续 `NoMethodError`。\n\nsuper 的三种形式：\n```ruby\nclass Dog < Animal\n  def initialize(name, breed)\n    super(name)       # 传递指定参数给父类\n    super             # 传递所有参数（name, breed）给父类\n    super()           # 不传参数给父类\n    @breed = breed\n  end\nend\n```\n\n- `super(args)`：传指定参数\n- `super`（无括号）：传所有当前方法的参数\n- `super()`（空括号）：不传参数\n\n最佳实践：在子类 initialize 中，第一行调用 `super` 传递父类需要的参数。",
    tags: ["super", "initialize", "继承"],
  },
  {
    id: "rub-classes-4",
    chapter: "rub-classes",
    level: 4,
    question: "Ruby 的 private 和 Java/C++ 的 private 有什么本质区别？什么时候用 protected？",
    answer:
      "**本质区别**：\nRuby 的 private 比 Java/C++ 更严格——**不能显式指定接收者**，连 `self.method` 都不行。只能隐式调用：`method_name` 而非 `self.method_name`。\n\nJava/C++ 的 private：同类内可通过 `this.method()` 或 `other.method()` 调用。\nRuby 的 private：同类内只能 `method()`，不能 `other.method()` 或 `self.method()`。\n\n**protected 的使用场景**（很少需要）：\n只在需要访问**另一个同类实例**的内部方法时用。典型场景：\n```ruby\ndef ==(other)\n  other.balance == self.balance  # 访问另一个实例的 protected 方法\nend\n```\n\n**选择原则**：\n- 默认用 public\n- 内部实现细节用 private\n- 需要在 ==、<=> 等方法中访问其他实例的属性时用 protected\n- 大多数情况下 public + private 就够了",
    tags: ["private", "protected", "访问控制", "Java对比"],
  },
];
