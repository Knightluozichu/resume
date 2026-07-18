type Item = readonly [title: string, code: string, detail: string];

function ConceptMap({
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

const strings = [
  [
    "Literal",
    '"hello"',
    "字符串字面量是含结尾空字符的字符数组；经转换可读，修改行为未定义。",
  ],
  [
    "Array copy",
    'char text[] = "hello"',
    "初始化产生独立数组对象，元素可修改；存储期由声明位置决定，不等于必在栈上。",
  ],
  [
    "Read pointer",
    "const char *text",
    "指针可改指向，接口通过 const 表达不经该指针修改字符。",
  ],
  [
    "Length",
    "strlen(text)",
    "返回首个空字符前的字符数，不含终止符；前提是可达范围内存在终止符。",
  ],
  [
    "Capacity",
    "length + 1 <= capacity",
    "复制必须为终止符预留一格，并在写入前证明目标容量。",
  ],
  [
    "Bytes",
    "not every char[] is a string",
    "任意字符数组可能没有空字符；只有满足终止协议时才能交给字符串函数。",
  ],
] as const;

const collections = [
  [
    "Pointer array",
    "char *lines[100]",
    "对象内含 100 个指针；每个字符串可在不同位置、长度不同。",
  ],
  [
    "Converted value",
    "lines -> char **",
    "多数表达式中数组转换为首个 char * 元素的地址，长度 100 随之丢失。",
  ],
  [
    "Pointer-to-pointer",
    "char **cursor",
    "只是指向 char * 对象的指针，不声明有多少个元素。",
  ],
  [
    "2D matrix",
    "char rows[100][80]",
    "连续存放 100 个固定宽度行，转换类型是 char (*)[80]。",
  ],
  [
    "Command line",
    "char *argv[] parameter",
    "函数参数调整为 char **；argc 给元素数，argv[argc] 是空指针哨兵。",
  ],
  [
    "Sort",
    "swap pointers, keep strings",
    "重排指针数组只改变视图顺序，不搬移或修改字符串字节。",
  ],
] as const;

const callbacks = [
  [
    "Return pointer",
    "int *find(void)",
    "find 是函数，参数为空，返回 int 指针。",
  ],
  [
    "Pointer to function",
    "int (*compare)(const void *, const void *)",
    "compare 是指针，指向接收两个 const void * 并返回 int 的函数。",
  ],
  [
    "Array of callbacks",
    "int (*handlers[4])(int)",
    "handlers 是四元素数组，每个元素是同一函数类型的指针。",
  ],
  [
    "Invoke",
    "compare(left, right)",
    "函数指针可像函数名调用；实参和返回类型必须与所指函数类型兼容。",
  ],
  [
    "Comparator",
    "negative | zero | positive",
    "比较器要稳定、一致且避免减法溢出；不得修改被比较元素。",
  ],
  [
    "Read",
    "start at identifier, honor ()",
    "从声明名字向外读，括号先改变结合；复杂接口可用 typedef 分层命名。",
  ],
] as const;

export function KrStringStorageContractMap() {
  return (
    <ConceptMap
      ariaLabel="K&R 第五章字符串字面量字符数组只读指针长度容量和终止协议图"
      caption="字符串安全取决于可达终止符、目标容量、对象生存期和可修改性，不取决于地址位于哪个俗称内存段。"
      items={strings}
    />
  );
}

export function KrStringCollectionTypeMap() {
  return (
    <ConceptMap
      ariaLabel="K&R 第五章指针数组指向指针二维字符矩阵命令行参数和排序类型对照图"
      caption="char **、char *array[N] 与 char matrix[N][M] 不是可互换布局；每一级指针步长由元素类型决定。"
      items={collections}
    />
  );
}

export function KrCallbackDeclarationMap() {
  return (
    <ConceptMap
      ariaLabel="K&R 第五章返回指针函数函数指针回调数组调用比较器与复杂声明阅读图"
      caption="函数指针把算法与策略分离，但声明类型、调用约定和比较器语义必须同时兼容。"
      items={callbacks}
    />
  );
}
