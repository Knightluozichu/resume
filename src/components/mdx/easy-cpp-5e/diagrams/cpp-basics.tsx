const anatomyRows = [
  { token: "#include <iostream>", role: "声明可见性", when: "预处理 / 编译前" },
  { token: "int main()", role: "程序入口", when: "进程启动" },
  { token: "{ statements }", role: "函数体与执行单元", when: "运行期间" },
  { token: "return 0", role: "退出状态", when: "main 结束" },
] as const;

export function EcpCppBasicsProgramAnatomy() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="最小 C++ 程序中 include、main、函数体和返回值的结构解剖" className="grid gap-3 sm:grid-cols-2">
          {anatomyRows.map((row, index) => (
            <section key={row.token} className="min-h-40 border border-sky-500/30 bg-sky-500/10 p-4">
              <span className="text-xs text-secondary">part 0{index + 1}</span>
              <code className="mt-2 block break-words text-sm text-accent">{row.token}</code>
              <strong className="mt-4 block text-xs text-primary">{row.role}</strong>
              <span className="mt-2 block text-xs text-secondary">生效：{row.when}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        源码骨架中的每个符号都有责任和时机；先理解边界，再扩展语句。
      </figcaption>
    </figure>
  );
}

const streamStages = [
  { title: "键盘字符", detail: "'4' '1'", tone: "border-amber-500/35 bg-amber-500/10" },
  { title: "std::cin 提取", detail: "parse as int", tone: "border-violet-500/35 bg-violet-500/10" },
  { title: "变量与表达式", detail: "age = 41; age + 1", tone: "border-sky-500/35 bg-sky-500/10" },
  { title: "std::cout 插入", detail: "format 42 -> terminal", tone: "border-emerald-500/35 bg-emerald-500/10" },
] as const;

export function EcpCppBasicsStreamFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="字符 41 经标准输入转换、整数计算和标准输出格式化为 42 的数据流" className="grid gap-2 sm:grid-cols-4">
          {streamStages.map((stage, index) => (
            <section key={stage.title} className={`min-h-40 border p-4 ${stage.tone}`}>
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{stage.title}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{stage.detail}</code>
              {index < streamStages.length - 1 ? <span className="mt-3 block text-right text-accent" aria-hidden="true">→</span> : null}
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        流处理的是字符序列；目标类型决定如何解释输入，输出流再把计算结果格式化回字符。
      </figcaption>
    </figure>
  );
}

const errors = [
  { symptom: "expected ';'", layer: "语法", evidence: "首条编译诊断 + 上一行", action: "补齐语句边界" },
  { symptom: "输入 abc 后值无效", layer: "输入", evidence: "std::cin failure state", action: "拒绝输入或恢复流" },
  { symptom: "输出 43 而非 42", layer: "逻辑", evidence: "实际结果 vs 预期", action: "检查表达式与需求" },
] as const;

export function EcpCppBasicsErrorLab() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="C++ 基础程序中语法错误、输入失败和逻辑错误的证据与修正对照" className="grid gap-3 lg:grid-cols-3">
          {errors.map((error, index) => (
            <section key={error.symptom} className="min-h-56 border border-rose-500/30 bg-rose-500/10 p-4">
              <span className="text-xs text-secondary">case 0{index + 1} · {error.layer}</span>
              <code className="mt-3 block break-words text-xs text-accent">{error.symptom}</code>
              <p className="mb-0 mt-4 text-xs text-secondary">证据：{error.evidence}</p>
              <strong className="mt-4 block border-t border-border pt-3 text-xs text-primary">{error.action}</strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先判断哪一层违反契约，再读对应证据；“程序不对”不是足够精确的故障描述。
      </figcaption>
    </figure>
  );
}
