import type { ReviewQuestion } from "./types";

export const uhmInputHandlingQuestions: ReviewQuestion[] = [
  {
    id: "uhm-input-handling-1",
    chapter: "uhm-input-handling",
    level: 1,
    question: "Unity 新 Input System 的核心概念是什么？相比旧 Input Manager 有什么优势？",
    answer: "核心概念是 Input Action Asset：将物理设备信号抽象为逻辑动作（如 Confirm/Cancel/Navigate）。优势：支持多设备映射（触摸/旋钮/键盘/语音）、事件驱动而非轮询、设备热插拔、运行时重新映射。旧 Input Manager 用 Input.GetAxis 等全局函数轮询，不支持事件驱动和多设备统一。",
    tags: ["Input System", "事件驱动"],
  },
  {
    id: "uhm-input-handling-2",
    chapter: "uhm-input-handling",
    level: 2,
    question: "为什么 HMI 输入需要防抖？推荐的时间窗口是多少？",
    answer: "车载环境颠簸导致手指抖动，一次按压可能产生多个 PointerDown 事件；机械按钮的物理抖动也会产生多个信号。不防抖导致重复操作。推荐时间窗口 100-300ms：关键操作（确认/取消）用 300ms，快速操作（列表滚动）用 100ms。太短防不住抖动，太长影响操作流畅度。",
    tags: ["防抖", "去重"],
  },
  {
    id: "uhm-input-handling-3",
    chapter: "uhm-input-handling",
    level: 3,
    question: "HMI 如何实现多输入源的统一处理？为什么要这样做？",
    answer: "将所有物理输入（触摸/旋钮/方向盘按键/语音）映射到统一的逻辑动作（Confirm/Cancel/Navigate 等），UI 只响应逻辑动作不关心设备来源。这样做的好处：UI 代码与设备解耦，新增设备只需加映射不改 UI 逻辑；同一界面可被多种设备操作（如旋钮和触摸都能选中列表项）；测试时可用键盘模拟触摸操作。",
    tags: ["多输入源", "逻辑动作", "设备解耦"],
  },
  {
    id: "uhm-input-handling-4",
    chapter: "uhm-input-handling",
    level: 4,
    question: "HMI 输入处理与游戏输入处理的核心区别是什么？如何在「快速响应」和「防止误操作」之间取得平衡？",
    answer: "核心区别：HMI 输入要求即时响应（延迟低于 50ms）且防止误操作（颠簸环境不误触）；游戏输入可容忍几帧延迟且不需要严格防抖。平衡方法：用分层防抖策略——快速操作（列表滚动）用短窗口 100ms 保证流畅，关键操作（确认/取消）用长窗口 300ms 防误触；对危险操作（如格式化/重置）加二次确认机制；利用输入路由让焦点元素先响应，非焦点元素不响应，减少误触范围。此外，输入处理逻辑应在 FixedUpdate 或早期 Update 中执行，确保响应延迟最小化。",
    tags: ["HMI vs 游戏输入", "防抖策略", "综合"],
  },
];
