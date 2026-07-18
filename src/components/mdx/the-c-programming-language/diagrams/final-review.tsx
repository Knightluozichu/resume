type Item = readonly [title: string, code: string, detail: string];

function ReviewMap({
  ariaLabel,
  caption,
  items,
}: {
  ariaLabel: string;
  caption: string;
  items: readonly Item[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map(([title, code, detail], index) => (
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
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {detail}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

const tutorialLoop = [
  [
    "Start",
    "int main(void)",
    "建立可编译入口和可观察输出，先确认工具链与宿主环境契约。",
  ],
  [
    "Model",
    "variables + arithmetic",
    "用温度表把声明、数值类型、表达式与格式化输出连起来。",
  ],
  [
    "Repeat",
    "for + #define",
    "用循环表达递进规则，用符号常量集中参数而非散落魔法数。",
  ],
  [
    "Stream",
    "getchar until EOF",
    "用 int 保存字符或文件尾，以返回值驱动读取并用 putchar 回显。",
  ],
  [
    "Accumulate",
    "arrays + functions",
    "数组保存计数，函数按值接收标量；数组形参调整为指针并另传长度。",
  ],
  [
    "Modularize",
    "extern + scope",
    "把声明、定义和内部链接分开，让跨文件状态只有一个所有者。",
  ],
] as const;

const contractLayers = [
  [
    "Representation",
    "types + conversions",
    "先确定值域、提升和溢出边界，再写表达式。",
  ],
  [
    "Control",
    "conditions + loops",
    "循环不变量和退出条件解释每条路径为何终止且不越界。",
  ],
  [
    "Interface",
    "prototype + ownership",
    "函数原型、容量、可空性、修改范围和失败状态共同构成契约。",
  ],
  [
    "Memory",
    "pointer + lifetime",
    "解引用同时需要有效对象、范围、对齐和仍在生命周期内。",
  ],
  [
    "Data model",
    "struct + invariant",
    "聚合成员表达整体事实，资源指针还需复制和销毁协议。",
  ],
  [
    "Boundary",
    "I/O + system",
    "外部输入先验证，输出检查提交，平台接口与 ISO C 分层。",
  ],
] as const;

const verificationLoop = [
  [
    "Predict",
    "state expected result",
    "运行前写下输出、边界和失败状态，避免只看程序是否崩溃。",
  ],
  [
    "Compile",
    "warnings enabled",
    "原型、格式、转换和未使用结果警告尽早暴露接口不一致。",
  ],
  [
    "Test",
    "normal + edge + failure",
    "空输入、最大边界、长记录、分配失败和短 I/O 都进入测试。",
  ],
  [
    "Instrument",
    "sanitizers where available",
    "动态工具扩大越界和未定义行为观测，但只覆盖实际执行路径。",
  ],
  [
    "Inspect",
    "return + state + resources",
    "同时核对值、错误状态、文件内容和资源释放，不只核对 stdout。",
  ],
  [
    "Refine",
    "small contract-preserving step",
    "一次改一条假设，回归全部测试并保留最小复现。",
  ],
] as const;

export function KrTutorialLoopMap() {
  return (
    <ReviewMap
      ariaLabel="K&R 第一章从 main 温度表 for 字符输入输出数组函数到外部变量六步教程图"
      caption="教程导论不是语法清单，而是一条从可运行程序到模块化文本处理器的反馈链。"
      items={tutorialLoop}
    />
  );
}

export function KrWholeBookContractMap() {
  return (
    <ReviewMap
      ariaLabel="K&R 全书类型控制函数指针结构和系统边界六层契约图"
      caption="读 C 代码时沿六层契约向外检查：表示、控制、接口、内存、数据模型和系统边界缺一不可。"
      items={contractLayers}
    />
  );
}

export function KrVerificationLoopMap() {
  return (
    <ReviewMap
      ariaLabel="K&R 总复习预测编译测试动态检查状态核对和小步改进六阶段验证图"
      caption="工具不是正确性证明；先写契约，再用静态警告、边界测试和动态观测互相补证。"
      items={verificationLoop}
    />
  );
}
