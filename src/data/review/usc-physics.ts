import type { ReviewQuestion } from "./types";

/** Unity 物理系统 复习题 */
export const uscPhysicsQuestions: ReviewQuestion[] = [
  {
    id: "usc-physics-1",
    chapter: "usc-physics",
    level: 1,
    question: `Rigidbody 的 isKinematic 和 isTrigger（Collider）有什么区别？`,
    answer: `isKinematic 是 Rigidbody 的属性——为 true 时该对象不受物理力影响（重力/碰撞推力），但可以通过代码移动并推动非 Kinematic 的 Rigidbody。isTrigger 是 Collider 的属性——为 true 时该碰撞体不产生物理阻挡（物体可以穿透），只产生触发事件（OnTriggerEnter）。简言之：isKinematic 控制「受不受力」，isTrigger 控制「挡不挡路」。`,
    tags: ["Rigidbody", "Collider", "isKinematic"],
  },
  {
    id: "usc-physics-2",
    chapter: "usc-physics",
    level: 2,
    question: `OnCollisionEnter 和 OnTriggerEnter 的触发条件有什么区别？`,
    answer: `OnCollisionEnter：双方都有 Collider，至少一方有非 Kinematic 的 Rigidbody，且 Collider 的 isTrigger=false。产生物理阻挡，回调参数是 Collision（含 contactPoints/impulse 等物理信息）。OnTriggerEnter：双方都有 Collider，至少一方有 Rigidbody（可以是 Kinematic），且至少一方的 Collider.isTrigger=true。无物理阻挡（穿透），回调参数是 Collider（对方碰撞体引用）。选择：需要物理碰撞用 Collision，只需检测进入区域用 Trigger。`,
    tags: ["碰撞事件", "触发事件", "区别"],
  },
  {
    id: "usc-physics-3",
    chapter: "usc-physics",
    level: 3,
    question: `为什么物理操作要放 FixedUpdate 而非 Update？Time.deltaTime 和 Time.fixedDeltaTime 有什么区别？`,
    answer: `FixedUpdate 按固定时间步（默认 0.02s）调用，物理引擎在此间隔内更新，保证模拟稳定。Update 每帧调用，帧率波动时物理计算会不稳定（穿透/抖动）。Time.deltaTime 是上一帧的实际耗时（Update 中用），Time.fixedDeltaTime 是固定时间步（FixedUpdate 中用）。物理力（AddForce）和移动（MovePosition）必须放 FixedUpdate 并用 Time.fixedDeltaTime，否则帧率变化会导致物理行为不一致。`,
    tags: ["FixedUpdate", "物理", "deltaTime"],
  },
  {
    id: "usc-physics-4",
    chapter: "usc-physics",
    level: 4,
    question: `设计一个近战攻击的碰撞检测方案，如何避免攻击穿透快速移动的敌人？`,
    answer: `1)不用 OnCollisionEnter（高速时可能穿透），用射线检测或范围检测：Physics.OverlapSphere(transform.position + offset, radius, enemyLayer) 获取攻击范围内的所有敌人；2)在攻击动画的关键帧（通过 AnimationEvent 触发）执行一次 OverlapSphere 检测，而非每帧检测；3)用 LayerMask 过滤只检测敌人层，避免误伤环境；4)对每个检测到的敌人调用 TakeDamage，用 HashSet 去重防止同一攻击多次伤害；5)如果攻击范围是扇形，用 Vector3.Angle 检查敌人是否在攻击前方角度内。优势：OverlapSphere 是球形范围检测，不受帧率影响，不会穿透。`,
    tags: ["碰撞检测", "OverlapSphere", "综合"],
  },
];
