import type { ReviewQuestion } from "./types";

export const ugcFpsBasicsQuestions: ReviewQuestion[] = [
  {
    id: "ugc-fps-basics-1",
    chapter: "ugc-fps-basics",
    level: 1,
    question: `FPS 为什么用 CharacterController 而非 Rigidbody？`,
    answer: `CharacterController 不依赖物理引擎，移动精确可控，适合 FPS 的精确操控。Rigidbody 受物理影响（摩擦/弹力），FPS 移动不需要物理模拟。CharacterController 有 isGrounded、Move、Slope Limit 等 FPS 专用功能。`,
    tags: ["CharacterController", "FPS移动"],
  },
  {
    id: "ugc-fps-basics-2",
    chapter: "ugc-fps-basics",
    level: 2,
    question: `为什么 FPS 用 Raycast 而非物理子弹？`,
    answer: `步枪子弹 900m/s，100 米飞行 0.1 秒玩家看不到弹道，物理子弹无意义还浪费性能。Raycast 瞬间检测命中，性能好判定准。只有慢速弹（火箭筒/弓箭）才用物理子弹因为玩家需要看到弹道。CS/使命召唤都用 Raycast。`,
    tags: ["Raycast", "射击方案"],
  },
  {
    id: "ugc-fps-basics-3",
    chapter: "ugc-fps-basics",
    level: 3,
    question: `FPS 敌人 AI 怎么实现视线检测？状态机怎么设计？`,
    answer: `视线检测：Raycast 从敌人眼睛到玩家，命中玩家则看得见，命中墙则看不见。状态机：Patrol（巡逻走巡逻点）→Chase（看到玩家用 NavMeshAgent 追击）→Attack（在攻击范围内停下射击）。Patrol→Chase 需要看见玩家，Chase→Attack 需要在攻击范围且看见，Attack→Chase 超出攻击范围。防止穿墙追击。`,
    tags: ["敌人AI", "视线检测", "状态机"],
  },
  {
    id: "ugc-fps-basics-4",
    chapter: "ugc-fps-basics",
    level: 4,
    question: `设计一个完整的 FPS 系统，包括移动、射击、敌人 AI。`,
    answer: `架构：1）FPSController：CharacterController 移动+Mouse Look 视角+跳跃+重力；2）射击系统：Raycast 从相机中心发射+fireRate 控制射速+SendMessage TakeDamage+弹孔特效+换弹系统；3）EnemyAI：NavMeshAgent 寻路+三状态机（Patrol/Chase/Attack）+Raycast 视线检测+血量+死亡；4）UI：血条+弹药数+准星+击杀提示；5）音效：枪声+脚步+受击。核心：Raycast 即时射击+状态机 AI。`,
    tags: ["FPS系统", "综合"],
  },
];
