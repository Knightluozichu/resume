import type { ReviewQuestion } from "./types";

export const ndbgDevtoolsQuestions: ReviewQuestion[] = [
  {
    id: "ndbg-devtools-1",
    chapter: "ndbg-devtools",
    level: 2,
    question: `普通断点、条件断点、日志断点各自适用于什么场景？`,
    answer:
      `普通断点适用于确定问题出在某行附近时——每次执行到该行无条件暂停，适合定位阶段性问题。条件断点适用于循环或高频回调中只在特定条件下出 bug 的场景——例如循环第 1000 次出问题设条件 i === 999，特定用户出问题设条件 user.id === 'xxx'，避免前 999 次无意义暂停。日志断点适用于不想打断执行流但想观察变量变化轨迹的场景——它不暂停，只打印表达式值，相当于免改代码、免重启的 console.log。三者可以组合使用：先日志断点缩小范围，再条件断点精确定位，最后普通断点深入检查。`,
    tags: ["断点", "条件断点", "日志断点", "DevTools"],
  },
  {
    id: "ndbg-devtools-2",
    chapter: "ndbg-devtools",
    level: 3,
    question: `断点命中时 Scope 面板中 Local/Closure/Global 三段分别显示什么？`,
    answer:
      `Scope 面板按作用域链从内到外展示变量。Local 段显示当前函数的局部变量——包括参数、函数内声明的 let/const/var 变量、this 绑定。Closure 段显示闭包捕获的外层函数变量——如果当前函数是在另一个函数内部定义的，外层函数中当前函数引用的变量会出现在这里，闭包可能有多层（嵌套函数），每层一个 Closure 段。Global 段显示全局对象——Node.js 中是 global 和 process、console、require 等全局变量。通过点击 Call Stack 中的不同栈帧，可以切换到对应帧的 Scope 视图，检查调用链上每一层的变量状态。`,
    tags: ["Scope面板", "作用域链", "闭包", "DevTools"],
  },
  {
    id: "ndbg-devtools-3",
    chapter: "ndbg-devtools",
    level: 3,
    question: `断点暂停时 Console 面板有什么特殊能力？与正常运行时的 Console 有何区别？`,
    answer:
      `断点暂停时 Console 面板处于当前断点的执行上下文——所有表达式在断点位置的变量作用域中求值，可以访问局部变量、闭包变量和 this 绑定。能力包括：①检查任意变量值（直接输入变量名）；②执行表达式测试修复方案（如 items.map(i => i.trim()) 看结果）；③修改变量值测试不同分支（如 item = null 看后续代码行为）；④调用函数（如 processData('test') 看返回值）；⑤检查原型链（如 Object.getPrototypeOf(obj)）。与正常运行时的区别：正常运行时 Console 在全局作用域，只能访问全局变量；断点暂停时 Console 在断点作用域，能访问局部变量和闭包——相当于在代码执行的「中间状态」拥有一个完整的 REPL。`,
    tags: ["Console面板", "断点上下文", "运行时求值", "REPL"],
  },
  {
    id: "ndbg-devtools-4",
    chapter: "ndbg-devtools",
    level: 4,
    question: `如何用 chrome://inspect 连接远程 Linux 服务器上的 Node.js 进程进行调试？安全注意事项是什么？`,
    answer:
      `连接步骤：①在服务器上启动 node --inspect=0.0.0.0:9229 server.js（绑定到所有网卡）或 node --inspect server.js（仅 localhost）；②如果仅 localhost，用 SSH 隧道转发端口：ssh -L 9229:localhost:9229 user@server；③本地 Chrome 打开 chrome://inspect → Configure 添加 target host:port → 点击 Open dedicated DevTools for Node。安全注意事项：①绝不在生产环境直接暴露 9229 端口到公网——Inspector Protocol 可执行任意代码（Runtime.evaluate），等于完全控制服务器；②必须用 SSH 隧道或 VPN 隔离；③调试完立即关闭 --inspect；④--inspect-brk 比 --inspect 更安全（进程暂停不执行代码直到调试器接入）；⑤WebSocket 连接不加密，中间人可篡改命令，SSH 隧道提供加密保护。`,
    tags: ["chrome://inspect", "远程调试", "SSH隧道", "安全"],
  },
];
