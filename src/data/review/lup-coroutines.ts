import type { ReviewQuestion } from "./types";

/** Lua 程序设计 · 协程复习题 */
export const lupCoroutinesQuestions: ReviewQuestion[] = [
  {
    id: "lup-coroutines-1",
    chapter: "lup-coroutines",
    level: 1,
    question: "以下代码输出什么？解释 resume 和 yield 的数据交换。\n```lua\nlocal co = coroutine.create(function(a)\n    local b = coroutine.yield(a + 1)\n    return a + b\nend)\nprint(coroutine.resume(co, 10))\nprint(coroutine.resume(co, 20))\n```",
    answer:
      "```\ntrue    11\ntrue    30\n```\n\n1. 第一次 `resume(co, 10)`：参数 10 传给协程函数，a=10。执行到 `yield(a+1)` = `yield(11)`。协程挂起，yield 的参数 11 传给 resume 作为返回值。→ true, 11\n\n2. 第二次 `resume(co, 20)`：参数 20 传给 yield 的返回值，b=20。执行 `return a+b` = 10+20 = 30。协程结束。→ true, 30\n\n数据流：\n- resume 参数 → 协程函数参数（第一次）或 yield 返回值（后续）\n- yield 参数 → resume 返回值\n- return 值 → 最后一次 resume 返回值",
    tags: ["resume", "yield", "数据交换"],
  },
  {
    id: "lup-coroutines-2",
    chapter: "lup-coroutines",
    level: 2,
    question: "协程和线程有什么本质区别？为什么协程不需要锁？",
    answer:
      "本质区别：\n- **调度方式**：协程是协作式（程序员控制 yield/resume），线程是抢占式（OS 调度）\n- **并行性**：协程无（单线程内切换），线程有（多核并行）\n- **切换时机**：协程只在 yield 时切换，线程随时可能被切换\n- **资源开销**：协程极小（~300字节），线程大（MB级栈）\n\n协程不需要锁的原因：协作式调度——一个协程执行时不会被其他协程打断。只有在显式 yield 时才交出控制权。这意味着没有竞态条件——共享变量的操作不会被中断。线程则需要锁因为 OS 可能随时切换线程，导致两个线程同时访问同一数据。\n\n简单说：协程中'同时'不存在——一个协程执行时，没有其他协程在运行。",
    tags: ["协程", "线程", "协作式"],
  },
  {
    id: "lup-coroutines-3",
    chapter: "lup-coroutines",
    level: 3,
    question: "coroutine.create 和 coroutine.wrap 有什么区别？各自适合什么场景？",
    answer:
      "**coroutine.create(fn)**：\n- 返回协程对象（thread 类型）\n- 需要用 `coroutine.resume(co, args)` 恢复\n- resume 返回 (true, values...) 或 (false, error)\n- 出错时不抛异常，返回 false + 错误信息\n- 适合需要错误处理的场景\n\n```lua\nlocal co = coroutine.create(fn)\nlocal ok, result = coroutine.resume(co)\nif not ok then print(result) end  -- 错误处理\n```\n\n**coroutine.wrap(fn)**：\n- 返回函数（调用该函数 = resume）\n- 直接调用 `fn(args)`，只返回 yield/return 的值\n- 不返回 true/false\n- 出错时**抛出异常**（可用 pcall 捕获）\n- 适合实现迭代器（配合泛型 for）\n\n```lua\nlocal iter = coroutine.wrap(fn)\nfor v in iter do print(v) end  -- 直接当迭代器用\n```\n\n选择：需要错误处理用 create + resume，实现迭代器/简化调用用 wrap。",
    tags: ["create", "wrap", "迭代器"],
  },
  {
    id: "lup-coroutines-4",
    chapter: "lup-coroutines",
    level: 4,
    question: "用协程实现一个斐波那契数列生成器，支持按需取值。",
    answer:
      "```lua\n-- 方式1：create + resume\nlocal function fibGen()\n    local a, b = 0, 1\n    return coroutine.create(function()\n        while true do\n            coroutine.yield(a)\n            a, b = b, a + b\n        end\n    end)\nend\n\nlocal co = fibGen()\nfor i = 1, 10 do\n    local ok, val = coroutine.resume(co)\n    print(val)  -- 0 1 1 2 3 5 8 13 21 34\nend\n\n-- 方式2：wrap（更简洁）\nlocal function fibGen2()\n    return coroutine.wrap(function()\n        local a, b = 0, 1\n        while true do\n            coroutine.yield(a)\n            a, b = b, a + b\n        end\n    end)\nend\n\nlocal fib = fibGen2()\nfor i = 1, 10 do\n    print(fib())  -- 直接调用\nend\n```\n\n关键点：\n1. `while true do yield(a) ... end` 无限循环，每次 yield 产出当前值\n2. `a, b = b, a+b` 多重赋值更新斐波那契状态\n3. 协程记住 a,b 的值跨调用——这就是'有记忆的函数'\n4. wrap 方式更简洁，直接当函数调用",
    tags: ["生成器", "斐波那契", "协程应用"],
  },
];
