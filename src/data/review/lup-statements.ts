import type { ReviewQuestion } from "./types";

/** Lua 程序设计 · 语句复习题 */
export const lupStatementsQuestions: ReviewQuestion[] = [
  {
    id: "lup-statements-1",
    chapter: "lup-statements",
    level: 1,
    question: `Lua 变量默认是全局还是局部？应该用什么关键字声明局部变量？为什么？`,
    answer:
      `Lua 变量默认是全局的。必须用 \`local\` 关键字声明局部变量。\n\n\`\`\`lua\nx = 10        -- 全局变量（慎用！）\nlocal y = 20  -- 局部变量（推荐）\n\`\`\`\n\n应该用 local 的原因：\n1. **性能**：局部变量访问更快（编译为寄存器/数组访问），全局变量通过哈希表查找\n2. **安全**：全局变量容易被意外覆盖，局部变量有作用域限制\n3. **可维护性**：局部变量的生命周期和作用域明确，代码更清晰\n4. **内存**：局部变量在作用域结束后自动回收，全局变量持续存在\n\n规则：所有变量都用 local 声明，除非确实需要全局。`,
    tags: ["local", "全局变量", "作用域"],
  },
  {
    id: "lup-statements-2",
    chapter: "lup-statements",
    level: 2,
    question: `以下代码输出什么？解释 for 循环变量的行为。\n\`\`\`lua\nfor i = 1, 3 do\n    i = i + 10\n    print(i)\nend\n\`\`\``,
    answer:
      `输出：\n\`\`\`\n11\n12\n13\n\`\`\`\n\n解释：Lua 数值 for 循环的变量 i 是每次迭代创建的**新的局部变量**。在循环体内修改 i（\`i = i + 10\`）只影响当前迭代的局部变量——下一次迭代时 i 会被重新赋值为循环计数器的下一个值。\n\n三次迭代中 i 分别被设为 1+10=11、2+10=12、3+10=13。循环仍然执行 3 次（1 到 3），修改循环变量不会改变迭代次数或步进。\n\n如果需要根据条件跳过某些值或自定义步进，应该用 while 循环。`,
    tags: ["for循环", "循环变量", "局部变量"],
  },
  {
    id: "lup-statements-3",
    chapter: "lup-statements",
    level: 3,
    question: `Lua 没有 continue 语句。给出两种模拟 continue 的方法。`,
    answer:
      `方法1：使用 goto（Lua 5.2+）\n\`\`\`lua\nfor i = 1, 10 do\n    if i % 2 == 0 then\n        goto continue\n    end\n    print(i)\n    ::continue::\nend\n\`\`\`\n\n方法2：使用 if-else 结构\n\`\`\`lua\nfor i = 1, 10 do\n    if i % 2 ~= 0 then\n        print(i)\n    end\nend\n\`\`\`\n\n推荐：简单条件用 if-else，复杂逻辑用 goto。goto 跳转只能在同一作用域内，且不能跳入局部变量作用域。Lua 5.2 引入 goto，5.1 不支持。`,
    tags: ["continue", "goto", "控制流"],
  },
  {
    id: "lup-statements-4",
    chapter: "lup-statements",
    level: 4,
    question: `ipairs 和 pairs 有什么区别？各自适合什么场景？`,
    answer:
      `**ipairs**：遍历 table 的数组部分。从索引 1 开始，遇到 nil 停止。返回 i, v（索引和值）。顺序确定（1, 2, 3...）。\n\n\`\`\`lua\nlocal t = {10, 20, 30}\nfor i, v in ipairs(t) do print(i, v) end  -- 1,10 / 2,20 / 3,30\n\`\`\`\n\n**pairs**：遍历 table 的所有键值对（包括数组部分和字典部分）。返回 k, v。顺序不确定。\n\n\`\`\`lua\nlocal t = {name=\"A\", age=20, 10, 20}\nfor k, v in pairs(t) do print(k, v) end  -- 顺序不确定\n\`\`\`\n\n使用场景：\n- ipairs：遍历数组（从1开始的连续整数索引）\n- pairs：遍历字典或混合 table\n\n注意：如果数组中间有 nil，ipairs 会在 nil 处停止（可能漏掉后面的元素）。pairs 不受影响但顺序不确定。`,
    tags: ["ipairs", "pairs", "遍历"],
  },
];
