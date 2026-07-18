type Item = readonly [title: string, code: string, detail: string];

function StructureMap({
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

const values = [
  [
    "Order",
    "member addresses increase",
    "非位域成员按声明顺序排列，后成员地址更高；首成员前没有填充。",
  ],
  [
    "Padding",
    "between and after",
    "实现可在成员间与尾部插入填充，以满足数组元素和成员访问要求。",
  ],
  [
    "Inspect",
    "sizeof + offsetof",
    "用实现结果验证布局；不要从成员类型大小推导通用固定偏移。",
  ],
  [
    "Copy",
    "assignment copies value",
    "同类型结构可赋值、传参和返回；填充字节不属于字段相等语义。",
  ],
  [
    "Compare",
    "compare each member",
    "C 没有内建结构相等；memcmp 会把填充和表示差异也纳入，通常错误。",
  ],
  [
    "Wire",
    "encode fields explicitly",
    "文件和网络格式要规定宽度、字节序和版本，不能直接转储结构对象表示。",
  ],
] as const;

const selfReferences = [
  ["Tag", "struct Node", "标签可在类型尚未完整时标识同一个结构类型。"],
  [
    "Link",
    "struct Node *next",
    "指针大小在此已知，因此可指向未来完整定义的同类型对象。",
  ],
  [
    "No direct child",
    "struct Node child is invalid",
    "直接包含自身会要求无限大小；必须通过指针或其他间接容器。",
  ],
  [
    "Ownership",
    "who frees next?",
    "链接关系不自动表达所有权；插入、删除和销毁必须定义责任。",
  ],
  [
    "Invariant",
    "acyclic | sorted | bucketed",
    "链表或哈希桶要写出结构不变量，操作前后都验证。",
  ],
  [
    "Lookup",
    "hash -> bucket -> compare",
    "哈希只选候选桶，字符串比较确认键；碰撞通过链或其他策略解决。",
  ],
] as const;

const unions = [
  ["Tag", "enum ValueKind kind", "判别字段记录当前变体，所有读取先检查标签。"],
  [
    "Storage",
    "union ValueData data",
    "成员共享足以容纳任一成员并满足其对齐的存储。",
  ],
  [
    "Write",
    "set kind with member",
    "构造与更新同时维护标签和活动值，异常/失败路径不能只改一半。",
  ],
  [
    "Read",
    "switch(kind)",
    "按标签选择对应成员；任意跨成员读取不应作为可移植序列化或类型转换。",
  ],
  [
    "Bit-field",
    "unsigned flag : 1",
    "宽度可限制值位数，但分配顺序、单元与对齐由实现选择。",
  ],
  [
    "Boundary",
    "no address of bit-field",
    "位域不是可独立寻址对象；不要把其布局当网络协议或寄存器通用格式。",
  ],
] as const;

export function KrStructureValueMap() {
  return (
    <StructureMap
      ariaLabel="K&R 第六章结构体成员顺序填充检查复制比较和线格式六项值语义图"
      caption="结构体的字段顺序与值语义可移植，具体偏移、填充、对齐和对象表示由实现决定。"
      items={values}
    />
  );
}

export function KrSelfReferenceMap() {
  return (
    <StructureMap
      ariaLabel="K&R 第六章结构标签自引用指针所有权不变量哈希桶和表查找图"
      caption="自引用结构解决递归数据形状，正确性还依赖所有权、不变量、碰撞与销毁协议。"
      items={selfReferences}
    />
  );
}

export function KrTaggedUnionMap() {
  return (
    <StructureMap
      ariaLabel="K&R 第六章标签联合共享存储读写协议位域和地址限制图"
      caption="联合节省互斥变体的存储，但只有标签与成员同步维护，调用者才知道当前可读哪一项。"
      items={unions}
    />
  );
}
