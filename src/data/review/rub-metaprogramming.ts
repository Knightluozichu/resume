import type { ReviewQuestion } from "./types";

/** Ruby 基础教程 · 元编程复习题 */
export const rubMetaprogrammingQuestions: ReviewQuestion[] = [
  {
    id: "rub-metaprogramming-1",
    chapter: "rub-metaprogramming",
    level: 1,
    question: `什么是 Open Class（打开类）？它有什么优势和风险？`,
    answer:
      `Open Class 允许在任何地方重新打开已存在的类（包括内置类），添加或修改方法。Ruby 没有类的\"封闭\"概念。\n\n\`\`\`ruby\nclass String\n  def shout; upcase + \"!!!\"; end\nend\nputs \"hello\".shout  # => HELLO!!!\n\`\`\`\n\n**优势**：\n- 灵活扩展——给内置类加方法（Rails 的 \`1.day.ago\`）\n- 修补第三方库的 bug\n\n**风险**：\n- \"猴子补丁\"可能破坏别人的代码\n- 覆盖内置方法影响全局\n- 难以追踪方法定义来源\n\n原则：谨慎修改内置类，优先用模块（module）扩展。`,
    tags: ["Open Class", "猴子补丁", "风险"],
  },
  {
    id: "rub-metaprogramming-2",
    chapter: "rub-metaprogramming",
    level: 2,
    question: `什么是 method_missing？覆盖它时必须同时做什么？`,
    answer:
      `**method_missing** 在调用不存在的方法时触发，可动态处理未知方法名。Rails ActiveRecord 的 \`find_by_name\` 由此实现。\n\n\`\`\`ruby\nclass DynamicFinder\n  def method_missing(name, *args)\n    if name.to_s =~ /^find_by_(.+)$/\n      field = $1.to_sym\n      @data.find { |item| item[field] == args[0] }\n    else\n      super  # 不匹配则交给父类\n    end\n  end\n\n  # 必须同时覆盖！\n  def respond_to_missing?(name, include_private = false)\n    name.to_s.start_with?(find_by_) || super\n  end\nend\n\`\`\`\n\n**必须同时覆盖 \`respond_to_missing?\`**：\n- \`respond_to?\` 默认不认识 method_missing 处理的幽灵方法\n- 不覆盖会导致 \`respond_to?(:find_by_name)\` 返回 false\n- 影响依赖 respond_to? 的代码（序列化器、method(:name) 等）`,
    tags: ["method_missing", "respond_to_missing?", "幽灵方法"],
  },
  {
    id: "rub-metaprogramming-3",
    chapter: "rub-metaprogramming",
    level: 3,
    question: `用 \`define_method\` 实现一个简化版的 \`attr_accessor\`。`,
    answer:
      `\`\`\`ruby\nclass Module\n  def my_attr_accessor(*names)\n    names.each do |name|\n      # 生成 getter\n      define_method(name) do\n        instance_variable_get(\"@#{name}\")\n      end\n\n      # 生成 setter\n      define_method(\"#{name}=\") do |value|\n        instance_variable_set(\"@#{name}\", value)\n      end\n    end\n  end\nend\n\nclass Person\n  my_attr_accessor :name, :age\nend\n\np = Person.new\np.name = \"Alice\"\np.age = 30\nputs p.name  # => Alice\nputs p.age   # => 30\n\`\`\`\n\n原理：\n1. \`define_method(name)\` 动态创建方法，块用闭包捕获 name\n2. \`instance_variable_get/set\` 按字符串名访问实例变量\n3. 这就是 \`attr_accessor\` 的底层实现\n\n理解了这一点就能理解 Rails 的 \`has_many\`、\`belongs_to\`——它们也是用 define_method 动态生成方法的宏。`,
    tags: ["define_method", "attr_accessor", "动态方法"],
  },
  {
    id: "rub-metaprogramming-4",
    chapter: "rub-metaprogramming",
    level: 4,
    question: `Rails 的 \`User.has_many :posts\` 是如何实现的？用元编程知识解释。`,
    answer:
      `\`has_many :posts\` 是 ActiveRecord 的类方法，在类定义时**动态生成关联方法**：\n\n\`\`\`ruby\nmodule ActiveRecord\n  module Associations\n    def self.included(base)\n      base.extend(ClassMethods)\n    end\n\n    module ClassMethods\n      def has_many(association_name)\n        # 动态生成实例方法 posts\n        define_method(association_name) do\n          associated_class = association_name.to_s.classify.constantize\n          associated_class.where(\"#{self.class.name.downcase}_id\" => self.id)\n        end\n\n        # 生成 build_post 方法\n        define_method(\"build_#{association_name.to_s.singularize}\") do |attrs|\n          # ...\n        end\n      end\n    end\n  end\nend\n\nclass User\n  include ActiveRecord::Associations\n  has_many :posts  # 调用类方法，动态生成 posts/build_post 方法\nend\n\`\`\`\n\n涉及的元编程技术：\n1. **include + extend**：included 钩子中 extend，让 has_many 成为类方法\n2. **define_method**：动态生成 posts、build_post 等方法\n3. **constantize**：\`\"Post\".constantize\` 从字符串获取类\n4. **method_missing**（补充）：\`find_by_email\` 由 method_missing 拦截\n\nRails 的优雅 = Ruby 元编程的极致应用。`,
    tags: ["Rails", "has_many", "define_method", "元编程应用"],
  },
];
