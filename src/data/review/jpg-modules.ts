import type { ReviewQuestion } from "./types";

export const jpgModulesQuestions: ReviewQuestion[] = [
  {
    id: "jpg-modules-1",
    chapter: "jpg-modules",
    level: 2,
    question: "ESM 的实时绑定和 CommonJS 的值拷贝有什么本质区别？举例说明。",
    answer:
      "ESM import 的是导出的「引用」——导出方修改后，导入方立即看到新值。CommonJS require 的是导出的「拷贝」——导出后修改不影响已 require 的副本。例：counter 模块 let count=0; function inc(){count++}。ESM 中 import {count, inc}，调用 inc() 后 count 变 1（实时绑定）。CommonJS 中 const {count, inc} = require()，调用 inc() 后 count 仍是 0（拷贝的是初始值）。这导致 ESM 的循环依赖能正确工作（双方实时同步），而 CJS 的循环依赖会拿到不完整的拷贝。实时绑定也使 ESM 的 tree-shaking 更可靠（编译期知道哪些被引用）。",
    tags: ["ESM", "CommonJS", "实时绑定", "值拷贝", "循环依赖"],
  },
  {
    id: "jpg-modules-2",
    chapter: "jpg-modules",
    level: 3,
    question: "为什么 ESM 支持 tree-shaking 而 CommonJS 不支持？",
    answer:
      "tree-shaking 依赖「静态分析」——编译期就能确定哪些导出被使用、哪些没用，从而剔除未用代码。ESM 的 import 是静态声明：必须在顶层、路径是字面量、具名导入明确指定用哪些。构建工具（webpack/esbuild/rollup）扫描 import 语句就能建立完整的依赖与使用图，把没被 import 的导出删掉。CommonJS 的 require 是运行时调用：可写在任意位置、路径可用变量拼接、require 返回整体对象后用哪个属性运行时才知。编译期无法确定哪些导出没用，故无法安全剔除。所以用 ESM 是 tree-shaking 生效的前提，CJS 代码会被整体打包。副作用代码（顶层有赋值/修改）会阻碍 tree-shaking，需在 package.json 标记 sideEffects:false。",
    tags: ["tree-shaking", "ESM", "CommonJS", "静态分析", "副作用"],
  },
  {
    id: "jpg-modules-3",
    chapter: "jpg-modules",
    level: 3,
    question: "ESM 和 CommonJS 在循环依赖处理上有什么不同？",
    answer:
      "CommonJS 循环依赖：require 会返回对方「已执行到当前行」的部分，可能不完整。例如 a require b，b 又 require a，当 b require a 时 a 还没执行完，b 拿到的是 a 此刻已赋值的 module.exports（可能只有部分导出），且是值拷贝——后续 a 补全的导出 b 看不到。这是 CJS 循环依赖坑的根源。ESM 循环依赖处理较好：因为是实时绑定（引用），a 的导出在 b 中是活的引用，a 后续补全的导出 b 能实时看到。但 ESM 循环依赖仍需注意——被循环引用的变量在未初始化时（TDZ）访问会报错。原则：尽量避免循环依赖，必要时用依赖反转（提取共享模块）解耦。",
    tags: ["循环依赖", "ESM", "CommonJS", "实时绑定", "值拷贝"],
  },
  {
    id: "jpg-modules-4",
    chapter: "jpg-modules",
    level: 4,
    question: "ESM 和 CommonJS 可以随便混用吗？互操作有什么限制？",
    answer:
      "不能随便混用，互操作有严格限制。Node 中 ESM 可以 import CommonJS 的默认导出（module.exports 整体作为 default），但无法可靠地具名导入 CJS 的属性——import {x} from './cjs.cjs' 可能失败，因为 CJS 是运行时求值，ESM 是静态分析，编译期不知道 CJS 导出了哪些具名（需用 cjs-module-lexer 兜底或整体 default 导入后取属性）。反向 CJS 用 require 加载 ESM 更受限——返回的是 namespace 对象且是 Promise 包装，需 await import()。工程上应统一用一种（现代项目选 ESM），混用靠构建工具（webpack/esbuild）桥接，并理解默认导出的坑。package.json \"type\":\"module\" 或 .mjs 扩展名启用 ESM，.cjs 强制 CJS。",
    tags: ["ESM", "CommonJS", "互操作", "默认导出", "Node"],
  },
];
