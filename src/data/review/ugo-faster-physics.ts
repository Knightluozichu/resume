/** 复习题库 · 物理加速（ugo-faster-physics）。Unity Game Optimization Ch5 改编。 */

import type { ReviewQuestion } from "./types";

export const ugoFasterPhysicsQuestions: ReviewQuestion[] = [
  {
    id: "ugo-fp-1",
    chapter: "ugo-faster-physics",
    level: 1,
    question: "Update 与 FixedUpdate 在 Unity 中各与什么同步？",
    answer:
      "Update 与渲染帧同步，每帧调用次数随 FPS 变化。FixedUpdate 与 Fixed Timestep（默认 0.02s 物理步）同步，每秒约固定 50 次，与帧率解耦。对 Rigidbody 施力、读物理状态应在 FixedUpdate。",
    tags: ["Update", "FixedUpdate", "Fixed Timestep"],
  },
  {
    id: "ugo-fp-2",
    chapter: "ugo-faster-physics",
    level: 1,
    question: "Profiler 里 Physics 模块主要反映什么开销？",
    answer:
      "主要反映 PhysX 在 FixedUpdate 中的模拟成本：broadphase、窄相碰撞检测、约束求解等。Physics ms 高说明物理步或接触对过多，需查 Fixed Timestep、Layer Matrix、Sleep 与 CCD 设置。",
    tags: ["Profiler", "PhysX", "Physics"],
  },
  {
    id: "ugo-fp-3",
    chapter: "ugo-faster-physics",
    level: 1,
    question: "Fixed Timestep 从 0.02 改为 0.01 对 Physics CPU 有何典型影响？",
    answer:
      "物理步数约从 50 次/秒变为 100 次/秒，PhysX 模拟次数翻倍，Physics CPU ms 往往近似线性上涨。仅在需要更高物理稳定性时权衡使用，不应作为首选优化手段。",
    tags: ["Fixed Timestep"],
  },
  {
    id: "ugo-fp-4",
    chapter: "ugo-faster-physics",
    level: 2,
    question: "为什么不应在 Update 里直接改 Dynamic Rigidbody 的 transform.position？",
    answer:
      "Dynamic 刚体的 transform 由 PhysX 在物理步写入；Update 与物理步不同步，每帧修改会被下一步覆盖，产生抖动和穿透。应使用 FixedUpdate 里的 AddForce/velocity，或 Kinematic 的 MovePosition。",
    tags: ["Update", "Rigidbody"],
  },
  {
    id: "ugo-fp-5",
    chapter: "ugo-faster-physics",
    level: 2,
    question: "Layer Collision Matrix 如何降低物理成本？",
    answer:
      "在 Project Settings → Physics 中取消不需要的层×层勾选后，这些层组合的物体永不进入碰撞 broadphase/窄相检测，减少检测对数量。比运行时 Physics.IgnoreCollision 更早、全局生效。",
    tags: ["Layer Collision Matrix", "broadphase"],
  },
  {
    id: "ugo-fp-6",
    chapter: "ugo-faster-physics",
    level: 2,
    question: "Rigidbody Sleep 是什么？什么条件下刚体会被唤醒？",
    answer:
      "Sleep：速度/角速度低于阈值且稳定时，PhysX 跳过该刚体的积分与碰撞直到唤醒。唤醒条件包括：与 Awake 体碰撞、受力、WakeUp()、Kinematic 移动穿过等。持续微抖或挤在一起会阻止睡眠。",
    tags: ["Rigidbody Sleep"],
  },
  {
    id: "ugo-fp-7",
    chapter: "ugo-faster-physics",
    level: 2,
    question: "Discrete 与 Continuous Dynamic 碰撞检测各适合什么物体？",
    answer:
      "Discrete（默认）：每物理步检测一次，便宜，适合行走、慢速交互。Continuous Dynamic：沿运动扫掠，防高速小物体 tunneling（穿墙），更贵，只应给子弹、高速球等少数 Dynamic 刚体。",
    tags: ["Collision Detection", "CCD"],
  },
  {
    id: "ugo-fp-8",
    chapter: "ugo-faster-physics",
    level: 3,
    question: "Physics ms 很高时，建议的排查顺序是什么？",
    answer:
      "① Profiler 确认 Physics/FixedUpdate 占比；② 检查 Fixed Timestep 是否过低（步频过高）；③ Layer Collision Matrix 关掉无业务层对；④ 减少 Awake Dynamic 数量、促 Sleep（静态用 Collider/Kinematic）；⑤ 仅对高速体开 Continuous，简化碰撞体形状。",
    tags: ["优化清单", "Profiler"],
  },
  {
    id: "ugo-fp-9",
    chapter: "ugo-faster-physics",
    level: 3,
    question: "Layer Collision Matrix 与 Physics.Raycast 的 layerMask 有何区别？",
    answer:
      "矩阵：全局规定哪些层与层之间永不模拟碰撞，影响所有 PhysX 检测。layerMask：单次 Raycast/Overlap 只测指定层，减少该次查询范围。矩阵管持续模拟；mask 管单次查询，二者互补。",
    tags: ["Layer Matrix", "Raycast", "layerMask"],
  },
  {
    id: "ugo-fp-10",
    chapter: "ugo-faster-physics",
    level: 3,
    question: "大量敌人挤在一起时 Sleep 失效、Physics ms 高，常见原因与修法？",
    answer:
      "原因：持续接触与微分离力使全体保持 Awake；Enemy×Enemy 矩阵仍开启产生大量接触对。修法：矩阵关 Enemy×Enemy；减少同屏 Dynamic 敌人数；远距改 Kinematic；避免每帧 WakeUp 或微小 AddForce。",
    tags: ["Sleep", "Enemy"],
  },
  {
    id: "ugo-fp-11",
    chapter: "ugo-faster-physics",
    level: 2,
    question: "永不移动的关卡几何应如何设置碰撞体以节省物理？",
    answer:
      "使用 Static Collider（无 Rigidbody）或 Kinematic Rigidbody，不要用 Dynamic Rigidbody。Static 不参与动力学积分；Dynamic 即使不动也要等 Sleep 条件满足。复杂 Mesh 用 Box/Sphere proxy 或 convex MeshCollider。",
    tags: ["Static Collider", "Kinematic"],
  },
];
