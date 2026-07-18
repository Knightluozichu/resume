type Item = readonly [title: string, code: string, detail: string];

function IoMap({
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

const streamStates = [
  [
    "Acquire",
    "stdin | stdout | fopen",
    "程序取得标准流或打开文件；FILE 是库管理的流对象，内部表示不公开。",
  ],
  [
    "Select mode",
    "read | write | update",
    "打开模式决定允许操作；文本与二进制差异由宿主环境定义。",
  ],
  [
    "Transfer",
    "fgets | fputs | fread",
    "每次先检查函数返回值；缓冲只改变传送时机，不改变错误责任。",
  ],
  [
    "Inspect",
    "feof | ferror",
    "只有一次读取失败后，才能区分正常文件尾与输入错误。",
  ],
  [
    "Synchronize",
    "fflush(output)",
    "需要对外可见时显式刷写输出；不能用 fflush(stdin) 丢弃输入。",
  ],
  [
    "Release",
    "fclose and check",
    "关闭可能在最后刷写时失败；只有成功关闭，写入事务才完整。",
  ],
] as const;

const formatContracts = [
  [
    "Format owns types",
    "%ld | %f | %s",
    "变参区没有自描述类型；转换说明必须与默认提升后的实参精确匹配。",
  ],
  [
    "printf values",
    "double for %f",
    "输出函数取得值；float 经默认提升成为 double，char 和 short 通常提升为 int。",
  ],
  [
    "scanf pointers",
    "double * for %lf",
    "输入函数取得目标地址；转换说明决定写入类型，指针类型不匹配会破坏对象。",
  ],
  [
    "Bounds",
    "%31s",
    "字段宽度限制最多消费的字符数；字符数组还要为结尾空字符保留空间。",
  ],
  [
    "Result",
    "assigned fields",
    "scanf 返回成功赋值项数；printf 返回写入字符数或负值，必须先检查再用结果。",
  ],
  [
    "Untrusted format",
    'printf("%s", text)',
    "外部文本只能作为数据参数，不能直接成为格式串。",
  ],
] as const;

const fileLifecycle = [
  [
    "Open",
    "fopen(path, mode)",
    "空指针表示失败；只有此时才读取 errno 或调用 perror 获取上下文。",
  ],
  [
    "Read loop",
    "while (fgets(...))",
    "以读取操作返回值驱动循环，不以 feof 预判下一次读取。",
  ],
  [
    "Validate",
    "parse whole field",
    "检查范围、尾随字符和长行分片；读取成功不等于业务数据有效。",
  ],
  [
    "Write",
    "fprintf + ferror",
    "格式化返回成功仍可能有延迟错误；关键边界还要检查刷写和关闭。",
  ],
  [
    "Diagnose",
    "context + strerror",
    "报告操作、路径和系统错误；清理可能改写 errno，必要时先保存。",
  ],
  [
    "Commit",
    "fclose(stream) == 0",
    "最后一批缓冲数据可能在关闭时才提交，关闭失败必须传播给调用者。",
  ],
] as const;

export function KrStreamStateMap() {
  return (
    <IoMap
      ariaLabel="K&R 第七章流的取得模式传送状态检查同步和关闭六阶段图"
      caption="把流看作有方向、位置、缓冲、文件尾和错误状态的协议对象，而不是一个可随意读写的地址。"
      items={streamStates}
    />
  );
}

export function KrFormatContractMap() {
  return (
    <IoMap
      ariaLabel="K&R 第七章 printf scanf 格式类型边界返回值和不可信格式六项契约图"
      caption="格式串就是运行时类型契约：输出读取值，输入写入指针，任何不匹配都不是自动转换请求。"
      items={formatContracts}
    />
  );
}

export function KrFileLifecycleMap() {
  return (
    <IoMap
      ariaLabel="K&R 第七章文件打开读取验证写入诊断关闭六阶段生命周期图"
      caption="可靠文件 I/O 从检查 fopen 开始，以检查 fclose 结束；文件尾、格式错误和设备错误必须分开。"
      items={fileLifecycle}
    />
  );
}
