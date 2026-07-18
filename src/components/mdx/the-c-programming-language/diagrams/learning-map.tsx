const outline = [
  [
    "01",
    "Tutorial",
    "从完整小程序进入变量、循环、字符 I/O、数组、函数和值传递。",
  ],
  ["02", "Types", "建立类型、转换、位运算、优先级与求值顺序的表达式模型。"],
  ["03", "Control", "用分支、循环和跳转把状态转换组织成明确控制流。"],
  ["04", "Functions", "掌握外部变量、作用域、头文件、递归与预处理的程序结构。"],
  ["05", "Pointers", "统一地址、数组、字符串、多维数组、argv 与函数指针。"],
  ["06", "Structures", "用结构、指针、自引用、表查找、联合与位域组织数据。"],
  ["07", "I/O", "理解流、格式化 I/O、文件访问、错误通道和行输入输出。"],
  ["08", "UNIX", "下沉到 fd、read/write、open/close、lseek、目录与分配器。"],
] as const;

const loop = [
  ["Read", "写下前置条件", "先说出输入、输出、边界和未定义行为风险。"],
  ["Run", "开启严格告警", "用 C90/C17 两套模式编译，记录诊断与实际输出。"],
  ["Change", "一次只改一处", "改变类型、边界或控制流，先预测再运行。"],
  ["Explain", "回到语言规则", "不用“机器碰巧如此”解释结果，指出标准契约。"],
] as const;

export function KrOfficialOutlineMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="Kernighan 和 Ritchie 的 C 程序设计语言第二版八章官方目录学习责任图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {outline.map(([index, title, detail]) => (
            <section
              key={index}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                {index}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {title}
              </strong>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {detail}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        K&amp;R
        第二版八个正式章节：教程先给出完整程序，随后逐层收紧语言规则、数据组织与系统边界。
      </figcaption>
    </figure>
  );
}

export function KrReadingLoopMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="Kernighan 和 Ritchie 示例的阅读运行修改解释四步练习循环"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {loop.map(([title, action, detail], index) => (
            <section
              key={title}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {title}
              </strong>
              <code className="mt-3 block text-xs text-accent">{action}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {detail}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        学 K&amp;R
        不是抄完示例就结束：预测、严格编译、单点修改和规则解释必须形成闭环。
      </figcaption>
    </figure>
  );
}
