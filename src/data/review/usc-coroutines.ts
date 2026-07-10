import type { ReviewQuestion } from "./types";

/** Unity 协程 复习题 */
export const uscCoroutinesQuestions: ReviewQuestion[] = [
  {
    id: "usc-coroutines-1",
    chapter: "usc-coroutines",
    level: 1,
    question: `什么是协程？它和多线程有什么区别？`,
    answer: `协程是 Unity 的跨帧异步执行机制，用 IEnumerator + yield 将逻辑分摊到多帧执行。协程在主线程运行，不是多线程——同一时刻只有一个协程在执行，yield 时挂起让出 CPU 给其他逻辑。区别：协程不涉及线程切换（无锁/无竞态），但不能做 CPU 密集计算（仍阻塞主线程）。多线程可以真正并行，但需要处理线程安全。`,
    tags: ["协程", "多线程", "区别"],
  },
  {
    id: "usc-coroutines-2",
    chapter: "usc-coroutines",
    level: 2,
    question: `WaitForSeconds 和 WaitForSecondsRealtime 有什么区别？`,
    answer: `WaitForSeconds 受 Time.timeScale 影响——游戏暂停（timeScale=0）时协程也暂停。WaitForSecondsRealtime 不受 timeScale 影响——暂停时仍继续计时。选择：游戏内动画序列用 WaitForSeconds（暂停时停止），UI 动画/系统提示用 WaitForSecondsRealtime（暂停时仍可播放）。注意：WaitForSeconds 是基于帧时间的近似延迟，不是精确计时。`,
    tags: ["WaitForSeconds", "timeScale"],
  },
  {
    id: "usc-coroutines-3",
    chapter: "usc-coroutines",
    level: 3,
    question: `协程在对象禁用时会怎样？如何正确管理协程生命周期？`,
    answer: `对象禁用（SetActive(false)或enabled=false）时，所有协程自动停止。重新启用时协程不会自动恢复——需要手动重新启动。管理：1)OnDisable 中 StopAllCoroutines() 确保干净停止（虽然自动停但显式更清晰）；2)OnEnable 中重新启动需要的协程；3)不要在协程中做对象禁用操作后再访问对象属性（已禁用）；4)StopCoroutine 需要传入 StartCoroutine 返回的 Coroutine 引用或方法名，不能传不同的 IEnumerator 实例。`,
    tags: ["协程", "生命周期", "OnDisable"],
  },
  {
    id: "usc-coroutines-4",
    chapter: "usc-coroutines",
    level: 4,
    question: `设计一个技能释放系统：释放后1秒前摇→伤害判定→0.5秒后摇→冷却5秒，如何用协程实现？`,
    answer: `IEnumerator CastSkill() { 1)前摇阶段：播放前摇动画，yield return new WaitForSeconds(1f)；2)伤害判定：Physics.OverlapSphere 检测范围内的敌人，对每个敌人调用 TakeDamage；3)后摇阶段：播放后摇动画，yield return new WaitForSeconds(0.5f)；4)冷却阶段：isCoolingDown=true，yield return new WaitForSeconds(5f)，isCoolingDown=false。释放入口：if (!isCoolingDown) StartCoroutine(CastSkill())。优化：1)前摇/后摇可用动画事件触发而非固定时间；2)冷却用协程或 Update 计时器，协程更简洁；3)如果技能可被打断，在协程中检查 _isInterrupted 标志，yield break 提前退出。关键：协程让时序逻辑线性化，避免嵌套回调地狱。`,
    tags: ["技能系统", "协程", "综合"],
  },
];
