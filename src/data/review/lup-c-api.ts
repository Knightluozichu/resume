import type { ReviewQuestion } from "./types";

/** Lua 程序设计 · C API 复习题 */
export const lupCApiQuestions: ReviewQuestion[] = [
  {
    id: "lup-c-api-1",
    chapter: "lup-c-api",
    level: 1,
    question: `什么是 Lua 虚拟栈？为什么 Lua C API 使用栈而不是直接传递参数？`,
    answer:
      `Lua C API 通过一个**虚拟栈**在 C 和 Lua 之间交换数据。C 函数不能直接访问 Lua 的 table 或字符串——必须先 push 到栈上，再通过索引操作。\n\n使用栈的原因：\n1. **类型安全**：Lua 是动态类型，C 是静态类型。栈提供统一的接口，C 代码用 lua_type() 检查类型\n2. **GC 安全**：Lua 的 GC 管理 Lua 对象。栈上的对象受 GC 保护，C 指针不会悬空\n3. **桥接两种内存模型**：C 是手动内存管理，Lua 是 GC。栈隔离了两者的内存空间\n4. **简化 ABI**：所有 C API 函数操作同一个栈，无需复杂的参数传递约定\n\n基本操作：\n\`\`\`c\nlua_pushstring(L, \"hello\");   // 压入字符串\nconst char *s = lua_tostring(L, -1);  // 从栈顶读取\nlua_pop(L, 1);                // 弹出1个元素\n\`\`\`\n\n栈索引：正数从底向上（1,2,3...），负数从顶向下（-1,-2,-3...）。`,
    tags: ["虚拟栈", "C API", "数据交换"],
  },
  {
    id: "lup-c-api-2",
    chapter: "lup-c-api",
    level: 2,
    question: `如何将一个 C 函数注册为 Lua 可调用的函数？写出完整代码。`,
    answer:
      `\`\`\`c\n#include <lua.h>\n#include <lauxlib.h>\n\n// C 函数签名：int (*)(lua_State *L)\n// 返回值 = 压入栈的返回值数量\nstatic int l_add(lua_State *L) {\n    // 1. 从栈上读取参数\n    double a = luaL_checknumber(L, 1);  // 第1个参数\n    double b = luaL_checknumber(L, 2);  // 第2个参数\n    // 2. 计算\n    double sum = a + b;\n    // 3. 压入返回值\n    lua_pushnumber(L, sum);\n    // 4. 返回返回值个数\n    return 1;\n}\n\n// 注册函数\nint luaopen_mylib(lua_State *L) {\n    luaL_Reg funcs[] = {\n        {\"add\", l_add},\n        {NULL, NULL}  // 结束标记\n    };\n    luaL_newlib(L, funcs);  // 创建 table 并注册函数\n    return 1;  // 返回这个 table\n}\n\`\`\`\n\nLua 端使用：\n\`\`\`lua\nlocal mylib = require(\"mylib\")\nprint(mylib.add(3, 5))  -- 8\n\`\`\`\n\n关键：\n1. C 函数签名固定 \`int fn(lua_State *L)\`\n2. 参数从栈读取，返回值压栈\n3. \`luaL_Reg\` 注册函数名→C函数指针映射\n4. \`luaopen_xxx\` 是模块入口，模块名必须和 require 参数一致`,
    tags: ["C函数注册", "luaL_Reg", "模块"],
  },
  {
    id: "lup-c-api-3",
    chapter: "lup-c-api",
    level: 3,
    question: `在 C 中如何操作 Lua table？以读取 table 字段和设置 table 字段为例。`,
    answer:
      `\`\`\`c\n// 假设 Lua 端调用：mylib.process({name = \"Alice\", age = 30})\n\nstatic int l_process(lua_State *L) {\n    // 参数1 是 table，在栈位置 1\n    luaL_checktype(L, 1, LUA_TTABLE);\n\n    // === 读取 table 字段 ===\n    // 方法1：lua_getfield（简洁）\n    lua_getfield(L, 1, \"name\");     // 将 t.name 压栈\n    const char *name = lua_tostring(L, -1);\n    lua_pop(L, 1);                  // 弹出 name\n\n    // 方法2：lua_gettable（通用）\n    lua_pushstring(L, \"age\");       // 压入 key\n    lua_gettable(L, 1);             // t[\"age\"] 压栈（t 在位置1）\n    int age = (int)lua_tointeger(L, -1);\n    lua_pop(L, 1);                  // 弹出 age\n\n    // === 设置 table 字段 ===\n    // 方法1：lua_setfield（简洁）\n    lua_pushstring(L, \"Bob\");       // 压入 value\n    lua_setfield(L, 1, \"name\");     // t.name = \"Bob\"，弹出 value\n\n    // 方法2：lua_settable（通用）\n    lua_pushstring(L, \"processed\"); // 压入 key\n    lua_pushboolean(L, 1);          // 压入 value\n    lua_settable(L, 1);             // t[\"processed\"] = true，弹出 key+value\n\n    // === 遍历 table ===\n    lua_pushnil(L);                 // 第一个 key（nil 表示从头开始）\n    while (lua_next(L, 1) != 0) {\n        // 栈顶：-2 = key, -1 = value\n        printf(\"%s\\n\", lua_tostring(L, -2));\n        lua_pop(L, 1);              // 弹出 value，保留 key 给下次 lua_next\n    }\n\n    return 0;  // 无返回值\n}\n\`\`\`\n\n注意：操作完必须清理栈——每个 get 配一个 pop，否则栈会泄漏。\`lua_next\` 遍历时保留 key 是关键。`,
    tags: ["table操作", "lua_getfield", "lua_setfield"],
  },
  {
    id: "lup-c-api-4",
    chapter: "lup-c-api",
    level: 4,
    question: `如何在 C 中嵌入 Lua 解释器并执行一段 Lua 脚本？说明完整的生命周期。`,
    answer:
      `\`\`\`c\n#include <lua.h>\n#include <lauxlib.h>\n#include <lualib.h>\n#include <stdlib.h>\n\nint main(void) {\n    // 1. 创建 Lua 状态机\n    lua_State *L = luaL_newstate();\n    if (!L) {\n        fprintf(stderr, \"无法创建 Lua 状态机\\n\");\n        return 1;\n    }\n\n    // 2. 打开标准库\n    luaL_openlibs(L);\n\n    // 3. 注册 C 函数供 Lua 调用\n    luaL_Reg mylib[] = {\n        {\"add\", l_add},\n        {NULL, NULL}\n    };\n    luaL_newlib(L, mylib);\n    lua_setglobal(L, \"mylib\");\n\n    // 4. 执行 Lua 脚本\n    const char *script =\n        \"print(mylib.add(10, 20))\\n\"\n        \"function callback(x) return x * 2 end\";\n\n    if (luaL_dostring(L, script) != LUA_OK) {\n        // 5. 错误处理\n        const char *err = lua_tostring(L, -1);\n        fprintf(stderr, \"Lua 错误: %s\\n\", err);\n        lua_pop(L, 1);\n    }\n\n    // 6. 调用 Lua 函数\n    lua_getglobal(L, \"callback\");  // 获取函数\n    lua_pushnumber(L, 21);         // 压入参数\n    if (lua_pcall(L, 1, 1, 0) != LUA_OK) {  // 调用：1参数，1返回值\n        const char *err = lua_tostring(L, -1);\n        fprintf(stderr, \"调用错误: %s\\n\", err);\n        lua_pop(L, 1);\n    } else {\n        double result = lua_tonumber(L, -1);  // 42\n        printf(\"callback(21) = %f\\n\", result);\n        lua_pop(L, 1);\n    }\n\n    // 7. 关闭 Lua 状态机（释放所有资源）\n    lua_close(L);\n    return 0;\n}\n\`\`\`\n\n生命周期：\n1. \`luaL_newstate()\` — 创建状态机（分配内存、初始化栈）\n2. \`luaL_openlibs()\` — 加载标准库（base, string, table, math 等）\n3. 注册 C 函数 / 执行 Lua 代码\n4. \`lua_pcall\` 安全调用（出错不 crash，返回错误码）\n5. \`lua_close(L)\` — 释放所有 Lua 对象和内存\n\n这是游戏引擎嵌入 Lua 的核心模式：C 管理底层（渲染、物理），Lua 管理逻辑（AI、配置、热更新）。`,
    tags: ["嵌入Lua", "lua_pcall", "生命周期"],
  },
];
