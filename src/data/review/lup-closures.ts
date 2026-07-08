import type { ReviewQuestion } from "./types";

/** Lua 程序设计 · 闭包复习题 */
export const lupClosuresQuestions: ReviewQuestion[] = [
  {
    id: "lup-closures-1",
    chapter: "lup-closures",
    level: 1,
    question: "什么是闭包？upvalue 是什么？",
    answer:
      "闭包 = 函数 + 其引用的外层局部变量（upvalue）。\n\n当内层函数引用外层函数的局部变量时，即使外层函数已返回，这些变量仍然存活——被闭包捕获为 upvalue。\n\n```lua\nlocal function makeCounter()\n    local count = 0           -- upvalue\n    return function()         -- 闭包\n        count = count + 1     -- 引用并修改 upvalue\n        return count\n    end\nend\n\nlocal c = makeCounter()\nprint(c())  -- 1\nprint(c())  -- 2\n-- count 在 makeCounter 返回后仍然存活——被闭包 c 捕获\n```\n\nupvalue 是闭包跨调用保持状态的关键——普通函数无状态，闭包有状态（通过 upvalue）。",
    tags: ["闭包", "upvalue", "状态封装"],
  },
  {
    id: "lup-closures-2",
    chapter: "lup-closures",
    level: 2,
    question: "以下代码输出什么？解释词法作用域。\n```lua\nlocal function makeAdder(n)\n    return function(x) return x + n end\nend\nlocal add10 = makeAdder(10)\nlocal add20 = makeAdder(20)\nprint(add10(5))\nprint(add20(5))\n```",
    answer:
      "```\n15\n25\n```\n\n`makeAdder(10)` 创建一个闭包，捕获 n=10 作为 upvalue。`add10(5)` 返回 5+10=15。\n\n`makeAdder(20)` 创建另一个闭包，捕获 n=20。`add20(5)` 返回 5+20=25。\n\n两个闭包有各自独立的 upvalue n——词法作用域决定了 n 的值在闭包**定义时**就确定了（makeAdder 调用时的参数值），而不是调用时。add10 的 n 永远是 10，add20 的 n 永远是 20。\n\n这就是词法作用域（静态作用域）：变量的可见性由代码结构决定，不由调用栈决定。",
    tags: ["词法作用域", "upvalue", "闭包实例"],
  },
  {
    id: "lup-closures-3",
    chapter: "lup-closures",
    level: 3,
    question: "用闭包实现一个 createBankAccount(initial) 函数，使得 balance 是私有的。",
    answer:
      "```lua\nlocal function createBankAccount(initial)\n    local balance = initial  -- upvalue，外部无法直接访问\n\n    return {\n        deposit = function(amount)\n            if amount > 0 then\n                balance = balance + amount\n                return true\n            end\n            return false\n        end,\n        withdraw = function(amount)\n            if amount > 0 and amount <= balance then\n                balance = balance - amount\n                return true\n            end\n            return false\n        end,\n        getBalance = function()\n            return balance\n        end\n    }\nend\n```\n\n关键：balance 是 createBankAccount 的局部变量，被返回的三个函数作为 upvalue 捕获。外部无法直接访问 balance——只能通过方法操作。即使设置 `acc.balance = 999`，只是在 table 上加了一个字段，不影响闭包内的 upvalue。\n\n这就是闭包实现私有状态封装——用 upvalue 模拟面向对象中的'私有成员'。",
    tags: ["私有状态", "upvalue", "封装"],
  },
  {
    id: "lup-closures-4",
    chapter: "lup-closures",
    level: 4,
    question: "闭包有哪三大应用场景？各举一例说明。",
    answer:
      "闭包三大应用：\n\n**1. 私有状态封装**：\n```lua\nlocal function counter()\n    local count = 0  -- 私有\n    return function() count = count + 1; return count end\nend\n```\n\n**2. 迭代器**（记住遍历位置跨调用）：\n```lua\nlocal function range(start, stop)\n    local i = start\n    return function()\n        if i <= stop then\n            local cur = i; i = i + 1; return cur\n        end\n    end\nend\nfor v in range(1, 5) do print(v) end  -- 1 2 3 4 5\n```\n\n**3. 回调中保持上下文**（在异步/事件处理中捕获外部变量）：\n```lua\nlocal function makeHandler(userId)\n    return function(event)\n        print(\"用户\" .. userId .. \"收到事件: \" .. event)\n    end\nend\nbutton.onClick = makeHandler(42)  -- 回调中记住 userId=42\n```\n\n三个场景的共同点：需要在函数调用之间保持状态，又不想用全局变量——闭包提供了干净的封装方式。",
    tags: ["闭包应用", "迭代器", "私有状态"],
  },
];
