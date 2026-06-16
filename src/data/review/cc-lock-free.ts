/** 复习题库 · 无锁并发数据结构（cc-lock-free）。《C++ 并发编程实战》第2版 §7 改编章节。 */

import type { ReviewQuestion } from "./types";

export const ccLockFreeQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cc-lf-1",
    chapter: "cc-lock-free",
    level: 1,
    question:
      "什么叫「无锁（lock-free）」数据结构？它和「不用互斥量」是一回事吗？",
    answer:
      "无锁指：多个线程并发访问时**不使用任何锁**来协调，而是靠 `std::atomic` 上的原子操作（尤其 CAS）来保证正确性，并且**保证整体一定有线程在推进**——任一线程被挂起都不会卡住其他线程（不会出现「持锁者被换出、别人全等」）。它确实不用互斥量，但「不用互斥量」只是表象，关键是「无论怎么调度，总有线程能完成操作」这个进展保证。",
    tags: ["无锁", "lock-free", "定义"],
  },
  {
    id: "cc-lf-2",
    chapter: "cc-lock-free",
    level: 1,
    question: "「无等待（wait-free）」和「无锁（lock-free）」有什么区别？",
    answer:
      "都不上锁。**无锁**只保证「总有某个线程能在有限步内完成」——但具体某个线程可能因为 CAS 反复失败而一直重试、迟迟完不成（其他线程在推进）。**无等待**更强：保证**每个**线程都能在**有限步**内完成自己的操作，谁都不会被无限期饿死。无等待最难实现、约束最强；本章的无锁栈是无锁但非无等待（CAS 失败要重试）。",
    tags: ["无等待", "wait-free", "无锁", "区别"],
  },
  {
    id: "cc-lf-3",
    chapter: "cc-lock-free",
    level: 1,
    question: "什么是「CAS 重试循环」？无锁栈 push 为什么要用它？",
    answer:
      "CAS 重试循环 = 「读出当前值当作 expected → 算出想写的新值 → CAS，失败就拿回填的真实值重算、再 CAS，直到成功」的自旋。无锁栈 push 要这样：先读 head 当 expected、令 `new->next = head`，再 `CAS(head, expected, new)`；若中途别的线程改了 head，CAS 失败并把真实 head 回填进 expected，循环体重新接好 `new->next` 再试——不上锁，靠「head 还是不是我以为的值，是才改、不是就重来」协调。",
    tags: ["CAS重试循环", "无锁栈", "定义"],
  },
  {
    id: "cc-lf-4",
    chapter: "cc-lock-free",
    level: 1,
    question: "什么是「ABA 问题」？",
    answer:
      "ABA 问题：一个线程读到某值为 A，准备 CAS；其间别的线程把它从 A 改成 B、又改回 A（典型是 pop 掉某节点、释放其内存、又 push 一个**复用了同一地址**的新节点）。等第一个线程的 CAS 执行时，发现值仍是 A → **误判「没人动过」→ 成功**，可结构其实已经面目全非。根因是 CAS 只比较「值相不相等」，看不出「被改走又改回」。像离开一会儿账上的数被换走又换回原样，你没察觉。",
    tags: ["ABA问题", "CAS", "定义"],
  },
  {
    id: "cc-lf-5",
    chapter: "cc-lock-free",
    level: 1,
    question: "什么是「风险指针（hazard pointer）」？",
    answer:
      "一种无锁内存回收方案：线程访问某个节点前，先在一块**所有线程都能看到的公开列表**里登记一个指向该节点的「风险指针」（挂牌「我正用着它」）；回收线程想 delete 某节点前，先扫这块列表——只要还有任何风险指针指向它，就**推迟回收**（挂进待回收列表），等没有任何风险指针指向它时再真正删除。像动单子前先在「正在用」公告板挂牌，收单子的人见牌不扔。",
    tags: ["风险指针", "hazard pointer", "内存回收", "定义"],
  },
  {
    id: "cc-lf-6",
    chapter: "cc-lock-free",
    level: 1,
    question:
      "什么是「标签指针（tagged pointer，又叫带版本号的指针）」？它治的是什么问题？",
    answer:
      "把一个指针和一个**版本号 / 标签计数**捆成一个能被 CAS 原子比较的整体（如打包进双倍宽度的字、或借用指针对齐的低位存计数）。每次修改都让版本号 +1，于是即便指针地址被改走又改回原样，版本号也不同——CAS 比较的是「指针 + 版本号」整体，就能识别出「同地址但变过」。它专门用来治 **ABA 问题**。",
    tags: ["标签指针", "版本号", "ABA问题", "定义"],
  },
  // ── L2 理解：为什么 / 区别 ──
  {
    id: "cc-lf-7",
    chapter: "cc-lock-free",
    level: 2,
    question:
      "无锁栈的 `pop()` 把节点从链上摘下来后，为什么**不能马上 `delete` 这个节点**？",
    answer:
      "因为别的线程此刻可能**正拿着指向这个节点的裸指针**——它在自己的 pop 里读了 head（=这个节点）、还没来得及解引用或 CAS。如果你立刻 delete，它接下来访问就是**use-after-free**（悬空指针），读到垃圾或崩溃，甚至和内存复用一起触发 ABA。所以无锁结构里「摘下」和「释放」必须分离：摘下后要用风险指针 / 引用计数等机制确认「真的没人在用了」才能释放，这就是无锁内存回收难题。",
    tags: ["无锁栈", "内存回收", "use-after-free", "理解"],
  },
  {
    id: "cc-lf-8",
    chapter: "cc-lock-free",
    level: 2,
    question:
      "CAS 失败时，`compare_exchange_weak/strong` 会顺手把「当前真实值」写回 expected。这个行为对写 CAS 重试循环有什么意义？",
    answer:
      "意义重大：失败说明「我以为的 expected 已经过期」，而 CAS 已经替你把**真实的当前值**填进了 expected。所以重试循环体里往往**什么都不用额外读**——直接拿被刷新的 expected 重新计算新值、再 CAS 即可（如无锁栈失败后重新 `new->next = head` 用的就是回填后的真实 head）。这让重试循环写起来既简洁又少一次额外的原子读。",
    tags: ["CAS重试循环", "compare_exchange", "expected回填", "理解"],
  },
  {
    id: "cc-lf-9",
    chapter: "cc-lock-free",
    level: 2,
    question:
      "为什么无锁的 CAS 重试循环里通常用 `compare_exchange_weak` 而不是 `compare_exchange_strong`？",
    answer:
      "因为 `weak` 版允许**伪失败**（spurious failure）：在某些平台上即使当前值确实等于 expected，也可能偶尔返回 false。但在重试循环里这无所谓——伪失败只是让你**多转一圈再试**，结果照样正确。代价是：`weak` 在那些平台上能编译成更少/更高效的指令（不必为消除伪失败而内置一层循环），所以「本来就在循环里」时用 `weak` 通常更快。只有当你**没有循环**、单次就要确定成败时才用 `strong`。",
    tags: ["compare_exchange_weak", "伪失败", "重试循环", "理解"],
  },
  {
    id: "cc-lf-10",
    chapter: "cc-lock-free",
    level: 2,
    question:
      "风险指针和「引用计数（reference counting）」都能解无锁回收难题，它们的思路有什么不同？",
    answer:
      "**风险指针**是「访问前公开声明」：线程要用某节点就先在公告板挂牌，回收者扫板见牌就不删——把「谁在用」做成外部可见的登记表。**引用计数**是「给节点自带一个计数」：有线程开始访问就把计数 +1、用完 -1，计数归零才真正释放（无锁实现常用 split reference count——拆成外部/内部两个计数，或用 `atomic_shared_ptr` 的原子操作）。前者登记的是「指针」，后者维护的是「还有几个人引用」。",
    tags: ["风险指针", "引用计数", "内存回收", "区别", "理解"],
  },
  {
    id: "cc-lf-11",
    chapter: "cc-lock-free",
    level: 2,
    question:
      "无锁栈 push 里 `head.compare_exchange_weak(new_node->next, new_node, std::memory_order_release, std::memory_order_relaxed)` 为什么成功时用 release？这和上一章的内存序有什么联系？",
    answer:
      "push 在 CAS 成功**之前**先把数据写进了新节点（`new_node->data`、`new_node->next`）。用 `release` 是为了让「新节点的数据写入」**不被重排到 CAS 之后**，并和 pop 端读到这个 head 后的 `acquire` 配成一对 **release-acquire 同步**——这样 pop 的线程一旦通过 acquire 读到这个新 head，就**保证能看到** push 写好的节点数据，不会读到「指针已挂上、数据还没写」的半成品。失败分支用 `relaxed` 是因为失败时没有数据要发布，只是重试。",
    tags: ["内存序", "release-acquire", "无锁栈", "理解"],
  },
  // ── L3 应用：场景 / 判断 / 改代码 ──
  {
    id: "cc-lf-12",
    chapter: "cc-lock-free",
    level: 3,
    question:
      "判断对错：「无锁数据结构没有锁、不会阻塞，所以一定比用互斥量的版本更快。」",
    answer:
      "**错。** 无锁去掉了锁带来的阻塞/上下文切换，**低争用**时往往更快；但**高争用**下，大量线程的 CAS 会反复失败、反复自旋重试，白白烧 CPU，吞吐反而可能**比一把好锁还差**。而且无锁还有原子操作本身的开销、缓存行乒乓、内存回收（风险指针/引用计数）的额外成本，实现也更难写对。结论：无锁是「避免阻塞、提供进展保证」的工具，不是「天然更快」的银弹——该不该用要按争用程度实测，别想当然。",
    tags: ["无锁", "性能", "争用", "判断", "应用"],
  },
  {
    id: "cc-lf-13",
    chapter: "cc-lock-free",
    level: 3,
    question:
      "你在一个用 CAS 管理 head 指针的无锁栈上观察到偶发的诡异崩溃/数据错乱，怀疑是 ABA。可以用哪些办法消除 ABA？",
    answer:
      "几条常用解法：① **标签指针 / 版本号**——把 head 和一个每次修改都自增的版本号捆在一起 CAS，地址变回原样但版本号变了，CAS 就能识别出「动过」；② **延迟回收**让被弹出的节点地址**短期内不被复用**，从源头避免「同地址被复用」（风险指针、引用计数、RCU/静止状态回收都能做到）；③ 在支持的平台上用带版本的双宽 CAS（`DCAS`/`cmpxchg16b`）。实践中常把「ABA 防护」和「内存回收」一起设计。",
    tags: ["ABA问题", "标签指针", "延迟回收", "应用"],
  },
  {
    id: "cc-lf-14",
    chapter: "cc-lock-free",
    level: 3,
    question:
      "下面这段无锁栈 pop 的内存释放对吗？`Node* old = head.load(); while(!head.compare_exchange_weak(old, old->next)); T v = old->data; delete old; return v;`",
    answer:
      "**不对**，有两处隐患。① **`delete old` 太早**：CAS 成功只说明你把 old 摘下了链，但别的线程的 pop 可能正持有指向 old 的指针（它读了同一个 head 还没 CAS），立刻 delete 会让它 use-after-free——必须改用风险指针/引用计数**延迟回收**。② 循环里 `old->next` 在解引用 old，而 old 可能已被另一线程弹出并释放——也是 use-after-free，且这正是 ABA 的温床。修法：访问 old 前先用风险指针登记保护它，回收走延迟回收路径。",
    tags: ["无锁栈", "use-after-free", "风险指针", "改代码", "应用"],
  },
  {
    id: "cc-lf-15",
    chapter: "cc-lock-free",
    level: 3,
    question:
      "团队要为一个高并发场景实现共享栈，有人主张直接上无锁栈。从「值不值得」角度，你会怎么权衡、给什么建议？",
    answer:
      "先问三件事：① **真的需要无锁吗**——是否要求「某线程被挂起不能卡住全场」的进展保证（如实时/中断上下文）？若只是想快，未必比一把好锁强。② **争用有多高**——高争用下无锁的 CAS 重试会烧 CPU，要实测对比加锁版本。③ **回收和 ABA 谁来扛**——无锁栈必须配风险指针/引用计数做延迟回收、并防 ABA，实现复杂、易错。建议：先用基于锁的版本做对照基线，只有在确有进展保证需求或实测无锁明显更优时才采用，并务必把回收/ABA 防护一并设计、充分测试。",
    tags: ["无锁", "选型", "争用", "应用"],
  },
  // ── L4 分析：综合 / 推理 ──
  {
    id: "cc-lf-16",
    chapter: "cc-lock-free",
    level: 4,
    question:
      "把无锁编程的几个核心难点串起来：CAS 重试循环、ABA、内存回收，它们彼此是怎么关联的？为什么说内存回收是无锁结构的「真正硬骨头」？",
    answer:
      "一条因果链：无锁靠 **CAS 重试循环**协调（读—改—CAS—失败重来），但 CAS 只比较值，于是当被操作的对象（如指针指向的节点）**被释放又用同地址复用**时，就出现 **ABA**——CAS 误判没变过。要避免地址被过早复用，就得**延迟回收**：摘下的节点不能马上 delete，因为别的线程可能还拿着裸指针（use-after-free）。于是「能不能安全释放」成了核心问题，催生了风险指针、引用计数、RCU 等机制；这些机制既解决了 use-after-free，又因为「地址短期不复用」顺带缓解了 ABA。说它是硬骨头，是因为它把「正确性、ABA、性能开销、实现复杂度」全绑在一起——无锁算法本身往往不长，难的全在「什么时候、怎么安全地把内存还回去」。",
    tags: ["无锁", "CAS", "ABA问题", "内存回收", "分析"],
  },
  {
    id: "cc-lf-17",
    chapter: "cc-lock-free",
    level: 4,
    question:
      "为什么说无锁数据结构「写对」比基于锁的难得多？除了 ABA 和回收，还有哪些容易翻车的点？",
    answer:
      "因为无锁把「正确性」全压在原子操作和内存序的精确编排上，没有锁帮你把一段操作变「原子的临界区」。容易翻车的点：① **内存序**——成功/失败分支各该用什么序（push 发布数据要 release、pop 读取要 acquire），用错会读到半成品或被重排出 bug；② **ABA**——值比较看不出改走又改回；③ **内存回收 / use-after-free**——摘下的节点不能马上删；④ **进展保证**——无锁≠无等待，高争用下某线程可能一直重试饿死；⑤ **复合不变量**——多个原子变量要一起保持一致时，单个 CAS 挡不住中间态被别人看到；⑥ **可测性差**——竞态偶发、依赖具体调度，难复现难调试。所以实践原则是：能用锁满足需求就别上无锁，确需无锁则务必配套回收/ABA 防护并做高强度并发测试。",
    tags: ["无锁", "内存序", "进展保证", "可测性", "分析"],
  },
];
