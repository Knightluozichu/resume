import type { ReviewQuestion } from "./types";

/** Lua 程序设计 · 总复习题 */
export const lupFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "lup-final-review-1",
    chapter: "lup-final-review",
    level: 1,
    question: `Lua 全书四大板块是什么？它们之间的递进关系是什么？`,
    answer:
      `四大板块：\n1. **Lua 基础**：类型与值（nil, boolean, number, string, function, table, userdata, thread）\n2. **核心机制**：表达式（算术/关系/逻辑/字符串连接）与语句（赋值/控制流/local）\n3. **高级特性**：函数（多返回值/可变参数）、闭包（upvalue/词法作用域）、协程（resume/yield）\n4. **元编程与 C 交互**：元表（__index/__newindex/运算符重载）与 C API（虚拟栈/注册函数）\n\n递进关系：类型值是数据基础 → 表达式语句是操作工具 → 函数闭包协程是封装与控制 → 元表 C API 是扩展与嵌入。\n\n每一层建立在前一层之上：没有类型就没有表达式，没有表达式就没有函数，没有函数就没有闭包，没有闭包就理解不了协程，没有元表就无法实现 OOP，没有 C API 就无法嵌入宿主。`,
    tags: ["四大板块", "递进关系", "知识结构"],
  },
  {
    id: "lup-final-review-2",
    chapter: "lup-final-review",
    level: 2,
    question: `Lua 的'极简哲学'体现在哪些方面？这种设计有什么优缺点？`,
    answer:
      `Lua 的极简哲学体现在：\n1. **只有一种数据结构**：table 既是数组又是字典，还是对象和模块\n2. **没有 class 关键字**：用元表 + __index 实现 OOP\n3. **没有 continue/switch**：用 goto/table 模拟\n4. **标准库极小**：没有正则（用模式匹配替代）、没有丰富的容器\n5. **提供机制而非策略**：不预设编程范式，让用户自选 OOP/FP/过程式\n6. **核心约 20000 行 C 代码**：可嵌入几乎所有平台\n\n优点：\n- 极快（JIT 版本接近 C 性能）\n- 极小（嵌入成本低）\n- 极灵活（元表可自定义一切行为）\n- 学习曲线平缓（核心概念少）\n\n缺点：\n- 生态不如 Python/JS\n- 类型安全弱（动态类型 + 无类型注解）\n- 容易写出难以维护的代码（元表魔法）\n- 标准库弱，很多功能需自己实现`,
    tags: ["极简哲学", "优缺点", "设计理念"],
  },
  {
    id: "lup-final-review-3",
    chapter: "lup-final-review",
    level: 3,
    question: `解释 Lua 中闭包、元表和协程如何协同工作，以一个实际场景为例。`,
    answer:
      `以**实现一个带缓存的惰性序列**为例，展示三者协同：\n\n\`\`\`lua\n-- 闭包：封装状态 + 延迟计算\nlocal function lazySeq(init, step)\n    local state = init  -- upvalue\n    return function()\n        state = state + step\n        return state\n    end\nend\n\n-- 协程：按需取值（生成器模式）\nlocal function take(gen, n)\n    return coroutine.wrap(function()\n        for i = 1, n do\n            coroutine.yield(gen())  -- 闭包 + 协程配合\n        end\n    end)\nend\n\n-- 元表：让序列对象支持运算符\nlocal Seq = {}\nSeq.__index = Seq\nfunction Seq.new(init, step)\n    return setmetatable({\n        gen = lazySeq(init, step),  -- 闭包\n        cache = {}                  -- 缓存\n    }, Seq)\nend\nfunction Seq:__index(key)  -- 元方法：缓存 + 延迟计算\n    if self.cache[key] then return self.cache[key] end\n    local co = take(self.gen, key)  -- 协程\n    local val\n    for i = 1, key do val = co() end\n    self.cache[key] = val\n    return val\nend\nfunction Seq:__add(other)  -- 运算符重载\n    return setmetatable({gen = function()\n        return self.gen() + other.gen()\n    end}, Seq)\nend\n\nlocal s1 = Seq.new(0, 2)  -- 0,2,4,6,8...\nlocal s2 = Seq.new(1, 3)  -- 1,4,7,10,13...\nlocal s3 = s1 + s2         -- 1,6,11,16,21...\nprint(s3[5])               -- 21（第5项）\n\`\`\`\n\n三者角色：\n- **闭包**：封装 state（upvalue）和 step，每次调用更新状态——提供'有记忆的函数'\n- **协程**：实现 take(gen, n) 生成器——按需计算前 n 项\n- **元表**：__index 实现缓存+延迟计算，__add 重载加法——自定义对象行为\n\n这是 Lua 的精髓：小而美的原语（闭包/元表/协程）组合出强大的抽象能力。`,
    tags: ["闭包", "元表", "协程", "综合应用"],
  },
  {
    id: "lup-final-review-4",
    chapter: "lup-final-review",
    level: 4,
    question: `如果你要在游戏引擎中嵌入 Lua 作为脚本层，你会如何设计 C-Lua 交互架构？`,
    answer:
      `游戏引擎嵌入 Lua 的典型架构：\n\n**1. 分层设计**\n\`\`\`\n游戏逻辑（Lua 脚本）\n    ↑↓ 通过 C API 交互\n引擎层（C/C++：渲染、物理、音频）\n    ↑↓ \n平台层（OS / 硬件）\n\`\`\`\n\n**2. C → Lua（引擎调用脚本）**\n- 引擎事件触发 Lua 回调（如 onUpdate(dt), onCollision(obj)）\n- 用 \`lua_getglobal\` + \`lua_pcall\` 调用 Lua 函数\n- 热更新：运行时重新加载 Lua 文件，无需重启\n\n\`\`\`c\n// 每帧调用 Lua 的 update\nlua_getglobal(L, \"onUpdate\");\nlua_pushnumber(L, deltaTime);\nlua_pcall(L, 1, 0, 0);\n\`\`\`\n\n**3. Lua → C（脚本调用引擎）**\n- 引擎将 API 注册为 Lua 模块（如 engine.spawn, engine.draw）\n- Lua 脚本调用 C 函数操作引擎对象\n\n\`\`\`lua\n-- Lua 脚本：定义敌人行为\nfunction onUpdate(dt)\n    local enemy = engine.spawn(\"Enemy\")\n    enemy:moveTo(player.position)\n    if enemy:distanceTo(player) < 5 then\n        enemy:attack()\n    end\nend\n\`\`\`\n\n**4. 数据交换**\n- 引擎对象用 userdata（light userdata = 裸指针，full userdata = 带元表）\n- userdata 的元表定义方法（moveTo, attack 等），方法内部通过指针操作引擎对象\n\n**5. 性能优化**\n- 减少 C-Lua 边界调用（批量传数据而非逐个）\n- 热点路径用 LuaJIT 的 FFI 直接调用 C\n- 避免在 update 中频繁创建 table（GC 压力）\n\n**6. 安全边界**\n- 沙箱：移除危险函数（io.execute, os.remove）\n- 超时检测：在协程中检查执行时间\n- 内存限制：限制 Lua 状态机的内存上限\n\n这是 Lua 的核心应用场景——从魔兽世界到 Redis 到 Nginx，都是这个模式。`,
    tags: ["游戏引擎", "嵌入架构", "C-Lua交互"],
  },
];
