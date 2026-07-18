import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const stages = [
  ["Source / sink", "console · file · string", "选择设备，不改变格式化接口"],
  ["streambuf", "buffer ↔ device", "批量搬运字符并维护位置"],
  ["Extract / insert", "operator input · getline · output", "格式化字符与程序值"],
  ["iostate", "eof · fail · bad", "每次操作后记录可用性"],
  ["Recover", "clear → seek / retry", "先恢复状态，再调整位置"],
  ["Commit", "flush · close · destructor", "检查显式提交是否成功"],
] as const;

export function CppIOLibraryContractDiagram() {
  return <Frame caption="Chapter 8 的统一 IO 协议：设备由流类选择，缓冲区搬运字符，格式化操作更新状态，调用者依据状态恢复或提交。"><div role="img" aria-label="C++ Primer第八章IO类缓冲格式化流状态恢复和提交契约" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{stages.map(([title,code,meaning],index)=><section key={title} className="min-h-32 border border-border bg-bg/40 p-4"><div className="flex items-center justify-between gap-3"><strong className="text-sm text-primary">{title}</strong><span className="text-xs tabular-nums text-secondary">0{index + 1}</span></div><code className="mt-3 block text-xs text-accent">{code}</code><p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p></section>)}</div></Frame>;
}
