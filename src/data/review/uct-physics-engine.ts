import type { ReviewQuestion } from "./types";

export const uctPhysicsEngineQuestions: ReviewQuestion[] = [
  {
    id: "uct-physics-engine-1",
    chapter: "uct-physics-engine",
    level: 1,
    question: "Unity 物理引擎是什么？FixedUpdate 和 Update 有什么区别？",
    answer: "Unity 内置 PhysX 物理引擎。Update 每帧调用，频率不固定。FixedUpdate 固定每 0.02 秒（50Hz）调用，与帧率无关。所有物理代码（AddForce、velocity、Raycast 在物理帧内）必须放 FixedUpdate，保证模拟稳定性。",
    tags: ["PhysX", "FixedUpdate"],
  },
  {
    id: "uct-physics-engine-2",
    chapter: "uct-physics-engine",
    level: 2,
    question: "Collision 和 Trigger 的区别？什么时候用哪个？",
    answer: "Collision 有物理阻挡，物体弹开，回调 OnCollisionEnter。Trigger 无阻挡可穿过，回调 OnTriggerEnter。Collision 用于物理交互（撞击/推箱子），Trigger 用于检测重叠（拾取/区域触发）。两者都需至少一个 Rigidbody。Collider 组件的 isTrigger 开关切换模式。",
    tags: ["Collision", "Trigger", "碰撞检测"],
  },
  {
    id: "uct-physics-engine-3",
    chapter: "uct-physics-engine",
    level: 3,
    question: "高速子弹穿墙怎么解决？Raycast 射击和物理碰撞射击有什么区别？",
    answer: "穿墙：把 Rigidbody 的 Collision Detection 从 Discrete 改为 Continuous 或 Continuous Dynamic，插值检测碰撞。射击方案：1）物理子弹——创建 Rigidbody 子弹，Continuous 检测，真实弹道但性能开销大；2）Raycast 射击——瞬间射线检测命中，无弹道但性能好。FPS 游戏通常用 Raycast（即时命中）+ 视觉特效模拟弹道。",
    tags: ["穿墙", "Raycast", "碰撞检测"],
  },
  {
    id: "uct-physics-engine-4",
    chapter: "uct-physics-engine",
    level: 4,
    question: "角色控制器抖动、穿墙、飘移，完整排查方案是什么？",
    answer: "1）抖动：物理代码是否在 FixedUpdate——移过去；检查是否同时用 transform.position 和 rb.MovePosition 移动——只用一种。2）穿墙：Collision Detection 改 Continuous；检查 Collider 尺寸是否太小；Fixed Timestep 是否太大（减小到 0.016）。3）飘移：增大 rb.drag 阻力；用 rb.velocity 而非 AddForce 精确控制速度；停止时 rb.velocity = Vector3.zero。核心原则：物理操作统一在 FixedUpdate，只用 Rigidbody API 移动。",
    tags: ["物理问题排查", "综合"],
  },
];
