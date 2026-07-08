import type { ReviewQuestion } from "./types";

/** Lua 程序设计 · 函数复习题 */
export const lupFunctionsQuestions: ReviewQuestion[] = [
  {
    id: "lup-functions-1",
    chapter: "lup-functions",
    level: 1,
    question: "以下代码输出什么？解释多返回值展开规则。\n```lua\nlocal function f() return 1, 2 end\nlocal function g() return 3, 4 end\nprint(f(), g())\nprint(f(), 10)\nlocal a, b, c = f(), g()\n```",
    answer:
      "```\n1    3    4\n1    10\n1    3    4\n```\n\n规则：只有表达式列表**最后一个位置**的函数调用才展开所有返回值，其他位置只取第一个返回值。\n\n- `print(f(), g())`：f() 不在末尾，只取 1。g() 在末尾，展开 3, 4。→ 1 3 4\n- `print(f(), 10)`：f() 不在末尾，只取 1。→ 1 10\n- `local a, b, c = f(), g()`：f() 不在末尾，只取 1 赋给 a。g() 在末尾，展开 3, 4 赋给 b, c。→ a=1, b=3, c=4",
    tags: ["多返回值", "展开规则", "函数"],
  },
  {
    id: "lup-functions-2",
    chapter: "lup-functions",
    level: 2,
    question: "冒号语法 obj:method() 和点号语法 obj.method() 有什么区别？",
    answer:
      "**冒号语法 `obj:method(args)`**：隐式传递 self——等价 `obj.method(obj, args)`。定义 `function obj:method(args)` 等价 `function obj.method(self, args)`。\n\n**点号语法 `obj.method(args)`**：不自动传 self——需要手动传 `obj.method(obj, args)`。定义 `function obj.method(args)` 没有 self 参数。\n\n```lua\nlocal T = {value = 42}\nfunction T:getValue() return self.value end  -- 冒号定义\nprint(T:getValue())  -- 42（冒号调用，隐式传 self）\n\nfunction T.getValue2(self) return self.value end  -- 点号定义\nprint(T.getValue2(T))  -- 42（手动传 self）\n```\n\n最佳实践：方法用冒号（:），普通函数用点号（.）。",
    tags: ["冒号语法", "点号语法", "self"],
  },
  {
    id: "lup-functions-3",
    chapter: "lup-functions",
    level: 3,
    question: "Lua 的可变参数（...）如何使用？select 函数有什么作用？",
    answer:
      "可变参数 `...` 收集函数接收的任意数量参数：\n\n```lua\nlocal function sum(...)\n    local total = 0\n    for _, v in ipairs({...}) do  -- {...} 打包为 table\n        total = total + v\n    end\n    return total\nend\n```\n\nselect 函数操作可变参数：\n- `select(\"#\", ...)` — 返回参数个数\n- `select(n, ...)` — 返回第 n 个参数及之后所有\n\n```lua\nlocal function info(...)\n    local count = select(\"#\", ...)  -- 参数个数\n    local first = select(1, ...)    -- 第一个参数\n    local rest = {select(2, ...)}   -- 第二个及之后\nend\n```\n\n`table.unpack(t)` 是逆操作——将 table 展开为多个参数。`f(table.unpack(args))` 等价于 `f(args[1], args[2], ...)`。",
    tags: ["可变参数", "select", "..."],
  },
  {
    id: "lup-functions-4",
    chapter: "lup-functions",
    level: 4,
    question: '为什么 `local f = function() f() end` 在递归调用时会出错？如何修复？',
    answer:
      "问题：`local f = function() f() end` 中，函数体内部的 f 引用的是**全局** f（此时还没定义），而不是正在定义的局部 f。因为 local 声明在赋值完成后才生效——函数体定义时 local f 还不存在。\n\n调用时会报错：attempt to call a nil value (global 'f')。\n\n修复方法：\n\n1. **使用 local function 语法糖**（推荐）：\n```lua\nlocal function f() f() end\n-- 等价于 local f; f = function() f() end\n-- local function 会在函数体内部让 f 可见\n```\n\n2. **先声明后赋值**：\n```lua\nlocal f  -- 先声明\nf = function() f() end  -- 此时 f 已存在\n```\n\n规则：递归的局部函数必须用 `local function name()` 语法，不能用 `local name = function()` 赋值语法。",
    tags: ["递归", "local function", "前向声明"],
  },
];
