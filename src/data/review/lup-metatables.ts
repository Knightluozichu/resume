import type { ReviewQuestion } from "./types";

/** Lua 程序设计 · 元表复习题 */
export const lupMetatablesQuestions: ReviewQuestion[] = [
  {
    id: "lup-metatables-1",
    chapter: "lup-metatables",
    level: 1,
    question: `什么是元表？\`__index\` 元方法的作用是什么？`,
    answer:
      `元表（metatable）是定义 table 行为的表——当一个 table 执行某操作（如索引、运算、比较）但没有对应实现时，Lua 查询其元表中的元方法。\n\n\`__index\` 元方法在 table[key] 查找失败时触发：\n1. 如果 \`__index\` 是一个 table，Lua 递归查找该 table[key]\n2. 如果 \`__index\` 是一个函数，Lua 调用它并返回结果\n\n\`\`\`lua\nlocal proto = {greet = function() return \"hello\" end}\nlocal obj = setmetatable({}, {__index = proto})\nprint(obj.greet())  -- hello（obj 没有 greet，查 __index → proto）\n\`\`\`\n\n\`__index\` 是实现继承的核心机制——子对象通过 \`__index\` 指向父对象，访问父对象的方法。`,
    tags: ["元表", "__index", "继承"],
  },
  {
    id: "lup-metatables-2",
    chapter: "lup-metatables",
    level: 2,
    question: `如何用元表实现运算符重载？以 \`__add\` 为例说明。`,
    answer:
      `运算符重载通过元表的算术元方法实现。每个算术运算符对应一个元方法：\`__add\`(+), \`__sub\`(-), \`__mul\`(*), \`__div\`(/), \`__concat\`(..) 等。\n\n\`\`\`lua\n-- 向量类型，重载 + 运算\nlocal Vector = {}\nVector.__index = Vector  -- 让实例能访问 Vector 的方法\n\nfunction Vector.new(x, y)\n    return setmetatable({x = x, y = y}, Vector)\nend\n\nfunction Vector.__add(a, b)  -- 重载 + 运算符\n    return Vector.new(a.x + b.x, a.y + b.y)\nend\n\nfunction Vector.__tostring(v)  -- 重载 tostring/tostring\n    return string.format(\"(%d, %d)\", v.x, v.y)\nend\n\nlocal v1 = Vector.new(1, 2)\nlocal v2 = Vector.new(3, 4)\nprint(v1 + v2)  -- (4, 6)\n\`\`\`\n\n关键：\`__add\` 的两个操作数中只要有一个的元表含 \`__add\`，Lua 就调用它。返回值可以是任意类型。`,
    tags: ["运算符重载", "__add", "元方法"],
  },
  {
    id: "lup-metatables-3",
    chapter: "lup-metatables",
    level: 3,
    question: `用元表实现一个完整的 OOP 类系统，包含构造函数、继承和方法。`,
    answer:
      `\`\`\`lua\n-- 类工厂：创建新类\nlocal function class(base)\n    local cls = {}\n    -- 设置元表实现方法查找（继承）\n    cls.__index = cls\n    -- 如果有基类，设置 __index 链\n    if base then\n        setmetatable(cls, {__index = base})\n    end\n    -- 构造函数\n    cls.new = function(...)\n        local obj = setmetatable({}, cls)\n        if obj.init then obj:init(...) end\n        return obj\n    end\n    return cls\nend\n\n-- 基类 Animal\nlocal Animal = class()\nfunction Animal:init(name)\n    self.name = name\nend\nfunction Animal:speak()\n    return self.name .. \" makes a sound\"\nend\n\n-- 子类 Dog 继承 Animal\nlocal Dog = class(Animal)\nfunction Dog:speak()  -- 重写\n    return self.name .. \" says Woof\"\nend\n\n-- 使用\nlocal a = Animal.new(\"Cat\")\nlocal d = Dog.new(\"Rex\")\nprint(a:speak())  -- Cat makes a sound\nprint(d:speak())  -- Rex says Woof\n\`\`\`\n\n核心：\n1. \`cls.__index = cls\` 让实例通过 __index 访问类方法\n2. \`setmetatable(cls, {__index = base})\` 让子类继承父类\n3. \`:method()\` 语法糖等价于 \`method(self)\`，自动传 self\n4. 方法查找链：实例 → 类 → 父类 → 祖父类（通过 __index 递归）`,
    tags: ["OOP", "继承", "类系统"],
  },
  {
    id: "lup-metatables-4",
    chapter: "lup-metatables",
    level: 4,
    question: `\`__index\` 和 \`__newindex\` 的区别是什么？如何用它们实现只读 table？`,
    answer:
      `**\`__index\`**：控制**读取**不存在的 key 时的行为。\n**\`__newindex\`**：控制**写入**不存在的 key 时的行为。\n\n区别：\`__index\` 在 \`t[k]\` 查找失败时触发（读取），\`__newindex\` 在 \`t[k] = v\` 且 k 不存在时触发（写入）。已存在的 key 不触发这两个元方法。\n\n实现只读 table：\n\`\`\`lua\nlocal function readOnly(t)\n    local proxy = {}\n    setmetatable(proxy, {\n        __index = t,          -- 读取：转发到原 table\n        __newindex = function(t, k, v)  -- 写入：报错\n            error(\"attempt to update a read-only table\", 2)\n        end\n    })\n    return proxy\nend\n\nlocal config = readOnly({host = \"localhost\", port = 8080})\nprint(config.host)   -- localhost（正常读取）\nconfig.port = 9090   -- error: attempt to update a read-only table\n\`\`\`\n\n关键：用 proxy table 隔离原 table，\`__index\` 允许读取，\`__newindex\` 拦截写入。这是代理模式的经典应用——元表让 table 行为完全可定制。`,
    tags: ["__newindex", "只读table", "代理模式"],
  },
];
