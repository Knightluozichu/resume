import type { ReviewQuestion } from "./types";

/** 游戏循环与 Update 生命周期 复习题 */
export const usgGameLoopQuestions: ReviewQuestion[] = [
  {
    id: "usg-game-loop-1",
    chapter: "usg-game-loop",
    level: 1,
    question: `Unity 游戏循环的三阶段是什么？执行顺序如何？`,
    answer: `三阶段：1)初始化（一次）——Awake→OnEnable→Start；2)每帧循环（重复）——FixedUpdate→碰撞事件→Update→协程→LateUpdate；3)销毁（一次）——OnDisable→OnDestroy。Awake/Start/OnDestroy 只调用一次，OnEnable/OnDisable 每次启用/禁用都触发。FixedUpdate 按固定步长调用，Update/LateUpdate 按帧调用。`,
    tags: ["游戏循环", "生命周期", "执行顺序"],
  },
  {
    id: "usg-game-loop-2",
    chapter: "usg-game-loop",
    level: 2,
    question: `FixedUpdate、Update、LateUpdate 分别适合放什么逻辑？为什么？`,
    answer: `FixedUpdate 适合物理逻辑（Rigidbody 移动/施力）——按固定步长调用，物理引擎在此步长内做碰撞检测，保证模拟稳定。Update 适合游戏逻辑和输入——每帧调用，响应及时，移动需乘 deltaTime。LateUpdate 适合相机跟随——在所有 Update 之后执行，确保角色已移动到本帧最终位置，相机跟随不会有一帧延迟的抖动。三者分工：物理稳定用 FixedUpdate，逻辑响应用 Update，画面收尾用 LateUpdate。`,
    tags: ["FixedUpdate", "Update", "LateUpdate", "分工"],
  },
  {
    id: "usg-game-loop-3",
    chapter: "usg-game-loop",
    level: 3,
    question: `为什么相机跟随不能写在 Update 中？写在 LateUpdate 有什么好处？`,
    answer: `Update 中脚本执行顺序不确定——如果相机 Update 先于角色 Update 执行，相机会跟随上一帧的角色位置，产生一帧延迟的抖动。LateUpdate 在所有 Update 之后执行，确保角色等对象已移动到本帧最终位置后相机才更新，消除抖动。同理，任何需要「等所有对象更新完毕后再做」的逻辑都应放 LateUpdate，如追踪相机、后处理效果、动画事件收尾。`,
    tags: ["LateUpdate", "相机跟随", "执行顺序"],
  },
  {
    id: "usg-game-loop-4",
    chapter: "usg-game-loop",
    level: 4,
    question: `设计一个对象池子弹的完整生命周期管理方案。`,
    answer: `1)Awake：一次性初始化——缓存 Rigidbody/Collider 引用，设置伤害值等静态参数。2)OnEnable：每次从池取出时重置——位置归零、速度归零、重置存活时间、订阅事件、启动弹道协程。3)OnDisable：每次回收时清理——StopAllCoroutines()、取消事件订阅、_rb.velocity=Vector3.zero、重置碰撞体。4)OnDestroy：池销毁时释放资源。关键：不在 OnDisable 中 Destroy（否则池失效），不在 Awake 中依赖其他场景对象，用 SetActive 控制启用/禁用，OnEnable/OnDisable 处理每次复用的重置。`,
    tags: ["对象池", "生命周期", "综合"],
  },
];
