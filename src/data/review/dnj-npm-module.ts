import type { ReviewQuestion } from "./types";

export const dnjNpmModuleQuestions: ReviewQuestion[] = [
  {
    id: "dnj-npm-module-1",
    chapter: "dnj-npm-module",
    level: 2,
    question: `CommonJS 的 require 模块解析路径是怎样的？模块缓存机制如何工作？`,
    answer:
      `require 解析顺序：①先查 Node.js 内置模块（fs、http、path 等，优先级最高）；②若非内置，按路径解析：绝对/相对路径直接找文件，补全扩展名（.js → .json → .node）；③若为包名（如 express），从当前目录的 node_modules 查找，找不到则逐级向上（../node_modules、../../node_modules）直到根目录；④找到包目录后读取 package.json 的 main 字段定位入口，无 main 则默认 index.js。缓存机制：每个模块首次 require 时执行并缓存到 Module._cache（key 为文件绝对路径），后续 require 同一模块直接返回缓存实例——不重新执行。这意味着模块级别的代码只执行一次，模块导出的对象是单例。这也是为什么修改模块导出对象的属性会影响所有引用方。清除缓存需 delete require.cache[modulePath]，热重载工具就是基于此实现。`,
    tags: ["CommonJS", "require", "模块解析", "缓存"],
  },
  {
    id: "dnj-npm-module-2",
    chapter: "dnj-npm-module",
    level: 3,
    question: `语义化版本（SemVer）的 MAJOR.MINOR.PATCH 含义是什么？^ 和 ~ 有什么区别？`,
    answer:
      `SemVer 格式 MAJOR.MINOR.PATCH：①MAJOR（主版本）——不兼容的 API 变更（breaking change），升级需改代码；②MINOR（次版本）——向下兼容的新功能，升级不需改代码；③PATCH（修订号）——向下兼容的 bug 修复。版本范围符号：①\`^1.4.2\`（caret）——允许 MINOR 和 PATCH 升级，锁定 MAJOR，即 >=1.4.2 且 <2.0.0。允许 1.5.0、1.4.3 但不允许 2.0.0。这是 npm install --save 的默认行为，因为 MINOR 向下兼容。②\`~1.4.2\`（tilde）——只允许 PATCH 升级，锁定 MAJOR.MINOR，即 >=1.4.2 且 <1.5.0。允许 1.4.3 但不允许 1.5.0。更保守。③\`1.4.2\`（无符号）——精确版本，不升级。生产环境推荐用精确版本 + lock 文件保证可复现。`,
    tags: ["NPM", "SemVer", "语义化版本", "caret", "tilde"],
  },
  {
    id: "dnj-npm-module-3",
    chapter: "dnj-npm-module",
    level: 3,
    question: `dependencies、devDependencies、peerDependencies 三种依赖有什么区别？peerDependencies 解决什么问题？`,
    answer:
      `①dependencies——运行时依赖，应用运行必须的包（如 express、lodash），npm install --production 时会安装。②devDependencies——开发时依赖，只在开发和测试时需要（如 jest、eslint、typescript），npm install --production 时不安装，减小生产镜像体积。③peerDependencies——对等依赖，声明「我的包需要宿主项目提供某个依赖」，但不会自动安装。典型场景：插件/中间件模式——eslint-plugin-react 声明 peerDep eslint，因为 eslint 应该由使用方安装（避免多个 eslint 版本冲突）。npm v7+ 会自动安装 peerDep，但若版本冲突会报错。区别总结：dependencies 是「我要用的」、devDependencies 是「开发才用的」、peerDependencies 是「你（宿主）应该提供的」。`,
    tags: ["NPM", "dependencies", "devDependencies", "peerDependencies"],
  },
  {
    id: "dnj-npm-module-4",
    chapter: "dnj-npm-module",
    level: 4,
    question: `什么是「幽灵依赖」？npm v3 的扁平化安装为什么会引发这个问题？pnpm 如何解决？`,
    answer:
      `幽灵依赖（Phantom Dependency）：项目中使用了未在 package.json 中声明的依赖，但能正常 require——因为 npm v3+ 的扁平化安装把深层依赖提升到了顶层 node_modules。例：项目依赖 express，express 依赖 qs，npm 把 qs 提升到顶层 node_modules/qs，项目代码可以直接 require('qs') 而无需声明。风险：①express 升级后不再依赖 qs，或换用别的库，项目的 require('qs') 会突然报错；②版本不可控——用的 qs 版本由 express 决定，express 升级可能引入不兼容的 qs 版本。pnpm 的解决方案：①node_modules 中只有 package.json 声明的直接依赖的软链接（符号链接），深层依赖在 .pnpm/ 目录下按真实结构嵌套存储；②require('qs') 如果未声明则找不到（因为顶层没有 qs），强制显式声明；③通过软链接共享存储（content-addressable store），磁盘只存一份。pnpm 同时解决了幽灵依赖和磁盘空间浪费两个问题。`,
    tags: ["NPM", "幽灵依赖", "扁平化", "pnpm", "node_modules"],
  },
];
