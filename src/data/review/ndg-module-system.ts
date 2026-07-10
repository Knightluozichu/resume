import type { ReviewQuestion } from "./types";

export const ndgModuleSystemQuestions: ReviewQuestion[] = [
  {
    id: "ndg-module-system-1",
    chapter: "ndg-module-system",
    level: 2,
    question: `CommonJS 中 require() 的模块加载过程是怎样的？`,
    answer:
      `require() 执行三步：①路径解析（Module._resolveFilename）——核心模块（如 fs）直接返回；以 ./ 或 ../ 开头按相对路径解析；以 / 开头按绝对路径解析；裸模块名沿 node_modules 向上逐层查找；②文件定位——依次尝试 .js、.json、.node 扩展名，如果是目录则读 package.json 的 main 字段，找不到则尝试 index.js；③编译执行——将文件内容包装进函数 (function(exports, require, module, __filename, __dirname){ ... })，执行后缓存到 Module._cache，后续 require 同一模块直接返回缓存。这就是为什么模块只执行一次、修改后需重启进程的原因。`,
    tags: ["CommonJS", "require", "缓存"],
  },
  {
    id: "ndg-module-system-2",
    chapter: "ndg-module-system",
    level: 3,
    question: `CommonJS 的值拷贝和 ESM 的实时绑定（live binding）有什么区别？举例说明。`,
    answer:
      `CommonJS 导出的是值的拷贝——导出时把当前值复制一份，之后模块内部修改不影响导入方。例如 module.exports.count = 0; 导入后内部 setInterval 修改 count，导入方看到的仍是 0。ESM 导出的是实时绑定——导入方看到的是同一个引用，模块内部修改后导入方立即看到新值。例如 export let count = 0; 导入后内部修改 count，导入方看到更新后的值。这是因为 CJS 在运行时求值并拷贝，ESM 在实例化阶段建立绑定关系。此外 ESM 是静态分析（编译期确定依赖），支持 tree-shaking；CJS 是动态求值（运行时确定），无法 tree-shaking。`,
    tags: ["CommonJS", "ESM", "值拷贝", "live binding"],
  },
  {
    id: "ndg-module-system-3",
    chapter: "ndg-module-system",
    level: 3,
    question: `CommonJS 和 ESM 如何互操作？有哪些限制？`,
    answer:
      `CJS require ESM：不能直接 require ESM 模块（会报错 ERR_REQUIRE_ESM），需用动态 import() 返回 Promise。ESM import CJS：可以默认导入（import pkg from 'cjs-module'，得到 module.exports），但具名导入可能不可靠——CJS 的导出在运行时才确定，ESM 的具名导入在静态分析阶段就需要确定，Node 通过 cjs-module-lexer 尝试静态检测 module.exports 的属性来支持具名导入，但复杂表达式（如 exports[动态key]）无法检测。限制：ESM 中 this 是 undefined（严格模式），CJS 中 this === module.exports；ESM 不支持 __dirname/__filename（用 import.meta.url 替代）；ESM import 必须在顶层且路径带扩展名。推荐新项目用 ESM（package.json 设 type: module）。`,
    tags: ["CommonJS", "ESM", "互操作", "互操作限制"],
  },
  {
    id: "ndg-module-system-4",
    chapter: "ndg-module-system",
    level: 4,
    question: `为什么 require 的模块会被缓存？如何实现模块的热更新（不重启进程）？`,
    answer:
      `缓存原因：性能（避免重复编译执行）+ 正确性（保证单例——模块级状态全局共享）。Module._cache 以文件绝对路径为 key 存储已加载模块。热更新方案：①删除缓存 require.cache[require.resolve(path)] 再重新 require——但有风险：旧模块的引用可能仍被持有，导致内存泄漏和状态不一致；②用 module._compile 重新编译但不推荐（内部 API）；③生产推荐用 cluster + 信号重启 Worker（graceful reload）而非热更新——PM2 reload 就是这个原理。热更新的核心矛盾：缓存保证单例，但单例是状态共享的基础，清除缓存意味着放弃单例保证。所以社区共识是「不要热更新模块，而是重启进程」。`,
    tags: ["缓存", "热更新", "require.cache", "工程实践"],
  },
];
