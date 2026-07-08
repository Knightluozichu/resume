import type { ReviewQuestion } from "./types";

export const uhmAnimationQuestions: ReviewQuestion[] = [
  {
    id: "uhm-animation-1",
    chapter: "uhm-animation",
    level: 1,
    question: "Tween 动画和 Animator 动画的区别是什么？HMI 中优先用哪个？",
    answer: "Tween 通过代码插值属性值，无需 Animator 组件，轻量高效，适合简单的位移/缩放/透明度过渡。Animator 基于状态机和动画层，适合复杂多状态切换，但有初始化和状态机开销。HMI 中 90% 的动画是简单过渡，优先用 Tween；只有复杂状态切换才用 Animator。",
    tags: ["Tween", "Animator"],
  },
  {
    id: "uhm-animation-2",
    chapter: "uhm-animation",
    level: 2,
    question: "HMI 中三种常用缓动曲线分别用于什么场景？",
    answer: "Ease Out（快进慢出）用于元素出现和展开——快速进入视野然后减速到位，让用户注意到但不眩晕。Ease In（慢进快出）用于元素消失和收起——缓慢开始然后快速离开。Ease In Out（慢进慢出）用于状态切换——两端慢中间快，过渡自然。选择依据是动画的方向和用户注意力引导需求。",
    tags: ["缓动曲线", "Ease Out", "Ease In"],
  },
  {
    id: "uhm-animation-3",
    chapter: "uhm-animation",
    level: 3,
    question: "HMI 动画为什么不能太长？推荐的时长范围是多少？",
    answer: "HMI 的核心是信息传达，动画太长让用户等待，违反实时性约束。用户看仪表盘是为了读数据不是看动画。推荐时长：界面过渡 100-300ms，数据指示器 50-150ms。超过 300ms 的动画只用于非关键信息（如页面切换）。关键数据指示器的动画必须快速完成，确保用户能及时读取最新值。",
    tags: ["动画时长", "实时性"],
  },
  {
    id: "uhm-animation-4",
    chapter: "uhm-animation",
    level: 4,
    question: "如何实现「数据驱动动画」？它与传统手动调用动画有什么本质区别？",
    answer: "数据驱动动画：在数据源的 setter 中自动触发动画，动画是数据变更的副产品。例如车速属性变化时，指针角度自动从当前值过渡到新值，无需外部代码调用动画方法。本质区别：传统方式是「先改数据再调动画」，两步可能不同步；数据驱动是「改数据即触发动画」，天然同步。实现方式：在 ObservableProperty 的 setter 中启动 Tween 协程，先停掉旧动画再启动新动画，保证过渡从当前位置开始。",
    tags: ["数据驱动", "实现模式", "综合"],
  },
];
