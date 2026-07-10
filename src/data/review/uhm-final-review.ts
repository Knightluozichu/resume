import type { ReviewQuestion } from "./types";

export const uhmFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "uhm-final-review-1",
    chapter: "uhm-final-review",
    level: 1,
    question: `Unity for HMI 全书的知识脉络是什么？`,
    answer: `全书围绕核心三角展开：表现层（UI 是门面）——HMI 基础、UI 框架、动画系统；驱动层（数据是灵魂）——数据绑定、输入处理、多屏联动；保障层（性能是底线）——性能优化、部署发布、OTA。呈「搭界面→接数据→做动画→处理输入→优化性能→部署上线」的递进脉络。`,
    tags: ["知识脉络", "核心三角"],
  },
  {
    id: "uhm-final-review-2",
    chapter: "uhm-final-review",
    level: 2,
    question: `HMI 开发中的关键决策有哪些？分别选什么方案？`,
    answer: `Canvas 渲染模式选 Screen Space Camera（精确控制层级）；数据绑定用脏标记（减少无效刷新）；动画用 Tween 而非 Animator（轻量高效）；输入用新 Input System（多设备支持）；性能看 1% Low FPS（稳定性优先）；资源加载用 Addressables（按需加载控制启动时间）；脚本后端用 IL2CPP（性能好+安全性高）。`,
    tags: ["关键决策", "技术选型"],
  },
  {
    id: "uhm-final-review-3",
    chapter: "uhm-final-review",
    level: 3,
    question: `描述一个 HMI 项目从零到上线的完整流程。`,
    answer: `1. 需求分析：确定平台/屏幕/输入/安全等级。2. UI 搭建：Canvas+布局组件+CanvasScaler。3. 数据对接：可观察属性+脏标记，对接总线/传感器。4. 动画过渡：Tween 100-300ms。5. 输入处理：Input System+防抖。6. 性能优化：Profiler+DrawCall 合并+GC 控制。7. 平台测试：启动时间/帧率/内存。8. 部署上线：IL2CPP+Addressables+OTA。`,
    tags: ["项目流程", "全链路"],
  },
  {
    id: "uhm-final-review-4",
    chapter: "uhm-final-review",
    level: 4,
    question: `HMI 作为安全关键系统，每个功能需要回答哪三个问题？兜底机制如何设计？`,
    answer: `三个问题：掉帧时会怎样（用户是否误读数据）、数据错误时会怎样（是否显示危险信息）、界面崩溃时会怎样（是否有恢复机制）。兜底机制设计：数据不可用时显示默认安全值（如速度显示 0 而非上次值）；3D 渲染失败时降级为 2D 图标；OTA 失败时自动回滚旧版本；界面崩溃时 watchdog 重启并显示加载占位符。核心原则是「失败安全」——异常时进入最安全的状态而非最危险的状态。`,
    tags: ["安全约束", "兜底机制", "失败安全", "综合"],
  },
];
