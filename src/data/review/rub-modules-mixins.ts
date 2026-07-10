import type { ReviewQuestion } from "./types";

/** Ruby 基础教程 · 模块与 Mixin 复习题 */
export const rubModulesMixinsQuestions: ReviewQuestion[] = [
  {
    id: "rub-modules-mixins-1",
    chapter: "rub-modules-mixins",
    level: 1,
    question: `include 和 extend 的区别是什么？`,
    answer:
      `**include**：把模块的实例方法混入类——类的**实例**获得这些方法。\n\`\`\`ruby\nmodule Walkable; def walk; end; end\nclass Dog; include Walkable; end\nDog.new.walk  # 实例方法\n\`\`\`\n\n**extend**：把模块的方法变成**类方法**——类本身获得这些方法。\n\`\`\`ruby\nmodule Findable; def find(id); end; end\nclass User; extend Findable; end\nUser.find(1)  # 类方法\n\`\`\`\n\n记忆：include 给实例加方法，extend 给类本身加方法。常见模式：在 included 钩子中同时做 include 和 extend——模块提供实例方法和类方法。`,
    tags: ["include", "extend", "Mixin"],
  },
  {
    id: "rub-modules-mixins-2",
    chapter: "rub-modules-mixins",
    level: 2,
    question: `以下代码中 \`Foo.ancestors\` 的顺序是什么？\n\`\`\`ruby\nmodule A; end\nmodule B; end\nclass Base; end\nclass Foo < Base\n  include A\n  include B\n  prepend B  # 假设重新 prepend（理解查找链）\nend\n\`\`\``,
    answer:
      `查找链顺序（假设 prepend 不同模块 M3）：\n\`\`\`\n[M3(prepended), Foo, B(last included), A(first included), Base, Object, Kernel, BasicObject]\n\`\`\`\n\n规则：\n1. **prepend 的模块**在最前（最高优先级）\n2. **类自身**\n3. **include 的模块**——后 include 的在前（B 在 A 之前）\n4. **父类** Base\n5. **Object** 及其 include 的 Kernel\n6. **BasicObject**\n\n方法查找从前往后，第一个匹配的方法被执行。prepend 的价值是可以在 \`super\` 前后添加逻辑（环绕增强）。`,
    tags: ["ancestors", "查找链", "prepend"],
  },
  {
    id: "rub-modules-mixins-3",
    chapter: "rub-modules-mixins",
    level: 3,
    question: `prepend 和 include 的核心区别是什么？prepend 的独特价值是什么？`,
    answer:
      `**核心区别**：\n- **include**：模块在类**之后**查找——类方法优先于 include 的模块方法\n- **prepend**：模块在类**之前**查找——模块方法优先于类方法\n\n**prepend 的独特价值——环绕增强**：\n\n\`\`\`ruby\nmodule Logging\n  def save\n    puts \"开始保存...\"\n    result = super    # 调用原始 save 方法（类的）\n    puts \"保存完成: #{result}\"\n    result\n  end\nend\n\nclass Document\n  def save; \"OK\"; end\n  prepend Logging  # Logging#save 在 Document#save 之前\nend\n\nDocument.new.save\n# 开始保存...\n# 保存完成: OK\n\`\`\`\n\ninclude 无法做到这一点——include 的模块在类之后查找，类方法会"遮蔽"模块方法。prepend 让模块方法可以"拦截"类方法，在 super 前后添加逻辑。Rails 的 Callback 机制基于 prepend。`,
    tags: ["prepend", "include", "环绕增强"],
  },
  {
    id: "rub-modules-mixins-4",
    chapter: "rub-modules-mixins",
    level: 4,
    question: `用模块实现一个 \`Loggable\` Mixin，让任何类 include 后获得日志功能。要求同时提供实例方法和类方法。`,
    answer:
      `\`\`\`ruby\nmodule Loggable\n  # 钩子：模块被 include 时调用\n  def self.included(base)\n    base.extend(ClassMethods)  # 给类添加类方法\n  end\n\n  # 实例方法\n  def log(message, level = :info)\n    timestamp = Time.now.strftime(\"%H:%M:%S\")\n    puts \"#{timestamp} [#{level.upcase}] #{self.class}: #{message}\"\n  end\n\n  # 类方法模块\n  module ClassMethods\n    def log_class(msg)\n      puts \"[CLASS] #{self}: #{msg}\"\n    end\n  end\nend\n\nclass Order\n  include Loggable  # 获得 log 实例方法 + log_class 类方法\n\n  def process\n    log(\"开始处理\")\n    # 业务逻辑...\n    log(\"处理完成\")\n  end\nend\n\nOrder.log_class(\"类被加载\")    # 类方法\nOrder.new.process             # 实例方法\n# 10:30:00 [INFO] Order: 开始处理\n# 10:30:00 [INFO] Order: 处理完成\n\`\`\`\n\n关键点：\n1. \`self.included(base)\` 是钩子——include 时自动调用\n2. \`extend(ClassMethods)\` 给类添加类方法\n3. 多个类 include 同一模块，复用代码——Mixin 的核心价值\n4. 不影响继承链——Order 可继承其他类，同时获得 Loggable 能力`,
    tags: ["Loggable", "included钩子", "Mixin实现"],
  },
];
