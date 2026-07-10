import type { ReviewQuestion } from "./types";

/** Python编程：从入门到实践 · 类与对象复习题 */
export const pccClassesQuestions: ReviewQuestion[] = [
  {
    id: "pcc-classes-1",
    chapter: "pcc-classes",
    level: 1,
    question: `Python 中 self 的作用是什么？为什么实例方法需要它？`,
    answer:
      `\`self\` 是实例方法的第一个参数，指向调用该方法的实例对象。Python 在调用 \`my_dog.speak()\` 时，自动将 \`my_dog\` 作为 \`self\` 传入 \`speak(self)\` 方法。\n\nself 的作用：\n1. 访问实例属性：\`self.name\` 获取当前实例的 name 属性\n2. 调用实例方法：\`self.other_method()\` 调用同一实例的其他方法\n3. 区分实例属性和局部变量：\`self.name\` 是实例属性，\`name\` 是局部变量\n\n没有 self，方法无法知道操作的是哪个实例的数据。self 让同一方法能服务于不同实例——\`dog1.speak()\` 和 \`dog2.speak()\` 访问各自的数据。`,
    tags: ["self", "实例方法", "实例属性"],
  },
  {
    id: "pcc-classes-2",
    chapter: "pcc-classes",
    level: 2,
    question: `什么是多态？以下代码如何体现多态？\n\`\`\`python\nfor animal in [Dog(\"Rex\"), Cat(\"Whiskers\")]:\n    print(animal.speak())\n\`\`\``,
    answer:
      `多态（Polymorphism）是指同一接口（方法名）在不同类型上有不同的实现。调用者不需要知道对象的具体类型，只需调用统一接口，实际执行的方法由对象的实际类型决定。\n\n上述代码中，\`animal.speak()\` 的调用方式完全相同，但 Dog 实例调用 Dog.speak() 返回 \"Rex says Woof!\"，Cat 实例调用 Cat.speak() 返回 \"Whiskers says Meow!\"。循环不需要判断 animal 是 Dog 还是 Cat——Python 的方法分派机制自动找到正确的实现。\n\n多态的好处：新增动物类型（如 Bird）时，只需定义 Bird 类并实现 speak()，循环代码不需要任何修改。这就是"对扩展开放、对修改关闭"。`,
    tags: ["多态", "继承", "方法重写"],
  },
  {
    id: "pcc-classes-3",
    chapter: "pcc-classes",
    level: 3,
    question: `__str__ 和 __repr__ 有什么区别？什么时候用哪个？`,
    answer:
      `**\`__str__\`**：\`print(obj)\` 或 \`str(obj)\` 时调用，返回用户友好的可读字符串。面向最终用户。\n\n**\`__repr__\`**：\`repr(obj)\` 或在交互式环境中直接输入变量名时调用，返回开发者友好的精确表示。面向开发者调试。\n\n区别示例：\n\`\`\`python\nclass Book:\n    def __str__(self):\n        return f\"{self.title} by {self.author}\"  # 面向用户\n    def __repr__(self):\n        return f\"Book('{self.title}', '{self.author}')\"  # 面向开发者\n\`\`\`\n\`print(book)\` → \"1984 by Orwell\"（调 __str__）\n\`repr(book)\` → \"Book('1984', 'Orwell')\"（调 __repr__）\n\n规则：如果只实现一个，实现 __repr__——因为 print 会回退到 __repr__。理想情况下 __repr__ 返回的字符串能用 eval() 重建对象。`,
    tags: ["__str__", "__repr__", "特殊方法"],
  },
  {
    id: "pcc-classes-4",
    chapter: "pcc-classes",
    level: 4,
    question: `以下代码有什么 bug？解释原因并修复。\n\`\`\`python\nclass Dog:\n    tricks = []\n    def __init__(self, name):\n        self.name = name\n    def add_trick(self, trick):\n        self.tricks.append(trick)\n\`\`\``,
    answer:
      `Bug：\`tricks = []\` 是**类属性**，所有实例共享同一个列表。\`dog1.add_trick(\"sit\")\` 会影响 \`dog2.tricks\`——因为 \`self.tricks.append()\` 修改的是类属性指向的同一个列表对象。\n\n\`\`\`python\nd1 = Dog(\"Rex\"); d2 = Dog(\"Buddy\")\nd1.add_trick(\"sit\")\nprint(d2.tricks)  # [\"sit\"] — 本应为空！\n\`\`\`\n\n修复：将 tricks 改为实例属性，在 __init__ 中创建：\n\`\`\`python\nclass Dog:\n    def __init__(self, name):\n        self.name = name\n        self.tricks = []  # 实例属性：每个实例独立\n    def add_trick(self, trick):\n        self.tricks.append(trick)\n\`\`\`\n\n规则：可变对象（list、dict、set）不应该作为类属性——除非确实需要所有实例共享。需要每个实例独立的可变数据时，在 __init__ 中创建实例属性。`,
    tags: ["类属性", "实例属性", "可变对象陷阱"],
  },
];
