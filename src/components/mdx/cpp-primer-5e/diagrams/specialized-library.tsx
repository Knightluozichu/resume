import type { ReactNode } from "react";

function Frame({ children }: { children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Chapter 17 的选择图：先辨认数据或输出需求，再选择对应的专用标准库设施。
      </figcaption>
    </figure>
  );
}

const facilities = [
  ["异构记录", "tuple", "固定元素数，类型可不同", "get / tie"],
  ["定长位集合", "bitset", "位数在编译期确定", "set / test"],
  ["文本模式", "regex", "搜索、捕获与替换", "search / match"],
  ["随机样本", "random", "引擎生成序列，分布塑形", "engine + distribution"],
  ["格式化 I/O", "iomanip", "控制进制、精度、宽度", "hex / setprecision"],
] as const;

export function CppSpecializedLibraryDiagram() {
  return (
    <Frame>
      <div role="img" aria-label="C++ Primer第十七章tuple bitset正则随机数和格式化输入输出选择图" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {facilities.map(([need, facility, contract, api], index) => (
          <section key={facility} className="min-h-40 border border-border bg-bg/40 p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs tabular-nums text-secondary">0{index + 1}</span>
              <span className="text-xs text-secondary">{need}</span>
            </div>
            <strong className="mt-4 block text-base text-primary">{facility}</strong>
            <p className="mt-3 text-xs leading-5 text-secondary">{contract}</p>
            <code className="mt-3 block text-xs text-accent">{api}</code>
          </section>
        ))}
      </div>
    </Frame>
  );
}
