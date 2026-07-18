/** 复习题库 · 官方七章综合复盘（ico-final-review）。 */

import type { ReviewQuestion } from "./types";

export const icoFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ico-fr-1",
    chapter: "ico-final-review",
    level: 1,
    question:
      "跨进程共享内存中的 polymorphic object bytes 为什么不能在 host 直接调用？",
    answer:
      "bytes 含 source-process vptr、raw/member pointers、allocator-owned resources 与 ABI-specific virtual-base metadata；ASLR/mapping/code/type identity 和 object lifetime 在 host 都不同。共享格式只能传 versioned values、stable IDs、relative offsets，host/plugin 各自在本进程构造 local behavior object。",
    tags: ["foreign representation", "shared memory", "ABI"],
  },
  {
    id: "ico-fr-2",
    chapter: "ico-final-review",
    level: 2,
    question:
      "为什么 constructor virtual hook 和 raw-copy object pool 是同一 lifecycle 错误的两个方向？",
    answer:
      "constructor hook 试图在 derived subobjects/invariant 尚未建立时使用最终 dynamic behavior；raw copy 则在没有执行 target construction 时伪造已完成 object。前者越过 lifetime start 的阶段，后者绕过它。正确方案是 complete construction 后发布/start，pool 用 aligned storage + placement construct + matching destroy callback 管理真实 lifetime。",
    tags: ["construction phase", "object pool", "copy semantics"],
  },
  {
    id: "ico-fr-3",
    chapter: "ico-final-review",
    level: 3,
    question:
      "`Renderable*` 指向 multiple-inheritance Derived 的 secondary base，virtual call 崩溃时怎样区分 slot、thunk、this 与 foreign-vptr 问题？",
    answer:
      "先确认 pointer 来自合法 local Derived-to-Renderable conversion 且 lifetime active；记录 Derived/Renderable addresses。合法 base vptr 的 slot 可指向 thunk，thunk 固定/动态调整 this 后进 Derived body。若 slot address 不在 loaded module、plugin 已 unload、object 来自 memcpy/shared bytes，则先修 representation/lifetime；不能手改 vptr 掩盖 string/virtual-base 未构造。",
    tags: ["multiple inheritance", "thunk", "虚调用"],
  },
  {
    id: "ico-fr-4",
    chapter: "ico-final-review",
    level: 4,
    question:
      "为动态库多态节点系统设计稳定 ABI：template registration、exception、RTTI、create/destroy 和 shared record 分别如何处理？",
    answer:
      "跨界用 versioned C function table 与 opaque handle；create/destroy 在同一 creator module 配对，function entries noexcept 并把 exception catch-and-translate 为 status/error。template 只在 module 内生成 mapping，跨界交换 schema 分配的 stable type ID，不用 typeid hash/address。RTTI/dynamic_cast 仅在兼容 local hierarchy 内。shared record 含 size/version/values/relative offsets，不含 native object bytes。",
    tags: ["plugin ABI", "template", "exception", "RTTI"],
  },
];

export default icoFinalReviewQuestions;
