import type { ReviewQuestion } from "./types";

export const wjMessageLoopQuestions: ReviewQuestion[] = [
  {
    id: "wj-message-loop-1",
    chapter: "wj-message-loop",
    level: 2,
    question: `Windows 消息循环的三步曲是什么？每一步分别做什么？`,
    answer:
      `消息循环三步曲：①\`GetMessage(&msg, NULL, 0, 0)\`——从调用线程的消息队列中取出一条消息，阻塞直到有消息（返回 \`TRUE\`），收到 \`WM_QUIT\` 时返回 \`FALSE\` 退出循环；②\`TranslateMessage(&msg)\`——将虚拟键消息（\`WM_KEYDOWN\`/\`WM_KEYUP\`）翻译为字符消息（\`WM_CHAR\`），根据键盘布局转换为 ASCII/Unicode 字符，如果按键不产生字符则不做任何事；③\`DispatchMessage(&msg)\`——将消息分发给该消息目标窗口的窗口过程函数（\`WindowProc\`）处理。三步构成一个循环：取出 → 翻译 → 分发 → 回到取出，直到 \`WM_QUIT\`。窗口过程通过 \`switch(message)\` 分支处理不同消息，未处理的消息交给 \`DefWindowProc\` 做默认处理。`,
    tags: ["消息循环", "核心机制"],
  },
  {
    id: "wj-message-loop-2",
    chapter: "wj-message-loop",
    level: 2,
    question: `PostMessage 和 SendMessage 的本质区别是什么？分别适用于什么场景？`,
    answer:
      `\`PostMessage\` 将消息放入目标窗口所在线程的消息队列后立即返回（异步），不等待处理结果——适用于「发后不管」场景，如通知另一个线程做某事、跨线程通信。\`SendMessage\` 直接调用目标窗口的窗口过程函数并等待返回结果（同步）——适用于需要立即获取处理结果的场景，如查询窗口状态、设置窗口属性。关键区别：\`PostMessage\` 跨线程安全（消息排队，由目标线程消息循环取出），\`SendMessage\` 跨线程时会阻塞调用线程直到目标线程处理完毕（可能死锁，需用 \`SendNotifyMessage\` 或超时版本 \`SendMessageTimeout\`）。同一线程内 \`SendMessage\` 就是直接函数调用，不经过队列。`,
    tags: ["消息机制", "同步异步"],
  },
  {
    id: "wj-message-loop-3",
    chapter: "wj-message-loop",
    level: 3,
    question: `消息队列分为系统队列和线程队列，消息如何从硬件事件到达窗口过程？`,
    answer:
      `消息流转路径：①硬件事件（键盘/鼠标）→ Windows 内核的原始输入队列（系统级）；②\`win32k.sys\`（内核态窗口管理模块）将原始输入转换为 \`WM_*\` 消息，放入目标线程的消息队列（线程级，每个 GUI 线程一个）；③\`GetMessage\` 从线程队列取出消息；④\`DispatchMessage\` 分发到窗口过程。此外，\`SendMessage\` 发送的消息不经过队列——同线程直接调用窗口过程，跨线程放入目标线程的「发送消息队列」并由内核唤醒目标线程直接调用窗口过程（不经过 \`GetMessage\`）。\`WM_PAINT\` 和 \`WM_TIMER\` 是低优先级消息，只有在队列为空时才生成（「合成消息」），避免频繁重绘。\`WM_QUIT\` 使 \`GetMessage\` 返回 \`FALSE\`，终止循环。`,
    tags: ["消息队列", "输入处理"],
  },
  {
    id: "wj-message-loop-4",
    chapter: "wj-message-loop",
    level: 4,
    question: `为什么跨线程 SendMessage 可能死锁？如何避免？`,
    answer:
      `跨线程 \`SendMessage\` 死锁场景：线程 A 调用 \`SendMessage\` 向线程 B 的窗口发消息，内核将消息放入 B 的发送队列并阻塞 A 等待 B 处理完毕。如果此时 B 正在等待 A 持有的锁（或 B 正在调用 \`SendMessage\` 向 A 发消息），就形成循环等待——A 等 B 处理消息，B 等 A 释放资源，双方都无法前进。避免方法：①使用 \`PostMessage\` 替代 \`SendMessage\`（异步，不阻塞）；②使用 \`SendNotifyMessage\`（不等返回结果，类似异步 \`SendMessage\`）；③使用 \`SendMessageTimeout\` 设置超时（如 \`SMTO_ABORTIFHUNG\`），超时后自动返回避免永久阻塞；④在窗口过程中避免持有锁时调用可能阻塞的操作；⑤用「消息传递」替代「锁共享」的架构设计，让线程间只通过消息通信。核心原则：绝不在线程 A 持有锁 L 时向线程 B 发 \`SendMessage\`，如果 B 可能需要锁 L。`,
    tags: ["消息机制", "死锁", "并发"],
  },
];
