type Item = readonly [title: string, code: string, detail: string];

function AllocationMap({
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

const arrayItems = [
  ["Allocate", "operator new[]", "取得足够存储，典型实现还保留元素数元数据。"],
  ["Cookie", "element count", "实现可能在返回 pointer 前记录析构所需数量。"],
  ["Construct", "N constructors", "数组元素按索引顺序逐个开始生命周期。"],
  ["delete[]", "array form", "运行时按实现协议找到数组元数据。"],
  ["Destroy", "N destructors reverse", "元素按逆序全部析构。"],
  ["Deallocate", "operator delete[]", "以数组分配家族对应入口归还存储。"],
] as const;

const ownerItems = [
  [
    "Single",
    "unique_ptr<T>",
    "默认 deleter 执行 delete，接口提供 operator* 与 operator->。",
  ],
  [
    "Array",
    "unique_ptr<T[]>",
    "默认 deleter 执行 delete[]，接口提供下标访问。",
  ],
  [
    "Vector",
    "vector<T>",
    "动态数组通常优先使用值容器，自动保存 size/capacity。",
  ],
  ["Fixed", "array<T,N>", "编译期固定长度直接成为值成员，无独立 new。"],
  [
    "C buffer",
    "unique_ptr<T,D>",
    "malloc 或平台 API 通过 custom deleter 配对。",
  ],
  [
    "Factory",
    "typed owner result",
    "创建函数返回带正确 deleter 的 owner，不返回模糊 raw typedef。",
  ],
] as const;

const familyItems = [
  ["C++ single", "new / delete", "单对象构造析构与分配入口配对。"],
  ["C++ array", "new[] / delete[]", "数组元素数量与逆序析构协议配对。"],
  ["C heap", "malloc / free", "只管理原始字节，不自动运行 C++ 构造析构。"],
  ["Aligned", "aligned new/delete", "对齐参数和 delete overload 必须匹配。"],
  ["Platform", "Create/Destroy", "COM、GPU、socket 等使用提供方配对函数。"],
  [
    "Module",
    "same allocator boundary",
    "跨 DLL/CRT 时回到创建模块释放，避免 heap 不一致。",
  ],
] as const;

export function EcppArrayAllocationMap() {
  return (
    <AllocationMap
      ariaLabel="数组分配 cookie 构造 delete 数组析构释放六阶段图"
      caption="new[]/delete[] 是完整数组生命周期协议；错误 delete 既可能漏析构也可能读取错误元数据。"
      items={arrayItems}
    />
  );
}

export function EcppTypedOwnerFormMap() {
  return (
    <AllocationMap
      ariaLabel="单对象 owner 数组 owner vector array C buffer factory 六类所有权图"
      caption="用 owner 类型编码单对象、数组与 custom allocator，调用方无需记忆 delete 形式。"
      items={ownerItems}
    />
  );
}

export function EcppAllocationFamilyMap() {
  return (
    <AllocationMap
      ariaLabel="C++ 单对象数组 C heap 对齐平台模块六类分配家族图"
      caption="匹配的不只是括号：分配函数、构造协议、deleter 参数和模块 allocator 都必须成对。"
      items={familyItems}
    />
  );
}
