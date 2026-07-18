type Item = readonly [title: string, code: string, detail: string];

function UnixMap({
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

const descriptorFlow = [
  [
    "Open",
    "open(path, flags, mode)",
    "返回当前进程可用描述符或 -1；mode 只在创建文件的标志需要时传入。",
  ],
  [
    "Read",
    "read(fd, buf, cap)",
    "正数是本次字节数，0 是文件尾，-1 是错误；短读不等于文件尾。",
  ],
  [
    "Write",
    "write(fd, buf, left)",
    "成功也可能只写部分数据；游标按返回值推进，直到全部写完或失败。",
  ],
  [
    "Interrupt",
    "errno == EINTR",
    "阻塞操作可被信号中断；是否重试取决于操作、已完成量和调用协议。",
  ],
  [
    "Close",
    "close(fd)",
    "释放描述符引用并检查错误；关闭失败后不能无条件重试一个可能已复用的数字。",
  ],
  [
    "Cleanup",
    "one owner",
    "每条失败路径只关闭自己拥有的描述符，避免泄漏、重复关闭和误关新资源。",
  ],
] as const;

const layerFlow = [
  [
    "Descriptor",
    "int fd",
    "POSIX 进程表中的句柄，操作字节与共享文件偏移，不自带 stdio 格式或用户态缓冲。",
  ],
  [
    "Stream",
    "FILE *stream",
    "ISO C 流拥有缓冲、方向、文件尾和错误状态；其实现细节不由 C 标准规定。",
  ],
  [
    "Bridge",
    "fdopen | fileno",
    "POSIX 可在两层间建立关联，但所有权和缓冲同步必须明确。",
  ],
  [
    "Buffer",
    "getc consumes cache",
    "getc 快路径可从用户态缓冲取字符，耗尽后再调用补充函数。",
  ],
  [
    "Seek",
    "lseek(fd, off, whence)",
    "改变共享文件偏移；管道等对象不可定位，成功结果也不等于数据存在。",
  ],
  [
    "Do not mix",
    "one coordinated layer",
    "同一底层对象交错 stdio 与低级 I/O 会让缓冲位置失配，应选一层或严格同步。",
  ],
] as const;

const boundaryFlow = [
  [
    "Directory",
    "opendir + readdir",
    "目录是系统接口对象；使用 API 遍历，不解析实现私有的原始目录字节。",
  ],
  [
    "Metadata",
    "stat",
    "目录项名称与文件元数据分离；类型、大小和权限查询可能再次失败或发生竞态。",
  ],
  [
    "Allocator",
    "malloc + free",
    "分配器管理空闲块、对齐、拆分和合并；零大小与失败契约要由调用者处理。",
  ],
  [
    "Alignment",
    "suitable for any type",
    "返回地址必须满足标准要求，不能只按 int 或指针大小粗略对齐。",
  ],
  [
    "Overflow",
    "count <= SIZE_MAX / size",
    "乘法和块头计算先验证范围，避免小分配后发生大写入。",
  ],
  [
    "Production",
    "use maintained runtime",
    "教材实现用于理解边界标签与空闲链，不具备线程、安全加固和平台集成能力。",
  ],
] as const;

export function KrDescriptorTransferMap() {
  return (
    <UnixMap
      ariaLabel="K&R 第八章描述符打开读取部分写入信号中断关闭和所有权六阶段图"
      caption="低级 I/O 的核心不是函数名，而是每次只消费返回的实际字节数，并让所有失败路径保持单一所有者。"
      items={descriptorFlow}
    />
  );
}

export function KrUnixIoLayerMap() {
  return (
    <UnixMap
      ariaLabel="K&R 第八章描述符标准流桥接缓冲 getc 随机访问和分层同步图"
      caption="POSIX 描述符与 ISO C 流是两层状态机；桥接之后，缓冲、偏移和关闭责任仍必须统一。"
      items={layerFlow}
    />
  );
}

export function KrDirectoryAllocatorMap() {
  return (
    <UnixMap
      ariaLabel="K&R 第八章目录遍历元数据存储分配对齐溢出和生产边界图"
      caption="目录和分配器示例展示系统边界：只依赖公开接口，验证尺寸与生命周期，不复制实现私有布局。"
      items={boundaryFlow}
    />
  );
}
