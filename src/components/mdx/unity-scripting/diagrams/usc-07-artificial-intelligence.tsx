import {
  UnityScriptingLab,
  type UnityScriptingSnapshot,
} from "./official-scripting-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "Chapter 7 权威边界",
    action:
      "官方目录覆盖 Artificial Intelligence in games、Starting the project、Baking a navigation mesh、Starting an NPC agent、Finite State Machines in Mecanim、Finite State Machines in C# - getting started，以及 Creating the Idle、Patrol、Chase、Attack、Seek-Health (or flee) state。每个状态必须保留独立触发、动作和退出条件。",
    metric: "5 groups",
    evidence:
      "https://www.packtpub.com/en-us/product/mastering-unity-scripting-9781784390655 + https://subscription.packtpub.com/book/game-development/9781784390655/pref/preflvl1sec02/what-this-book-covers",
    boundary: "目录覆盖必须继续落到实验和失败重放。",
  },
  {
    label: "模型",
    stage: "感知、决策、导航与动作闭环",
    action:
      "感知层读取目标距离、视线、生命和路径可达性，决策层根据带迟滞的守卫条件选择状态，状态 Enter/Update/Exit 管理局部动作，NavMeshAgent 产生移动，Mecanim 表现动画，事件反馈命中或动作结束。状态机不能直接依赖动画名称和全局搜索；应把感知快照与动作接口分开，使相同决策可被测试。",
    metric: "producer -> consumer",
    evidence:
      "Artificial Intelligence in games；Starting the project；Baking a navigation mesh；Starting an NPC agent",
    boundary:
      "把 Animator 状态直接当业务状态会让决策依赖过渡时间和动画命名，难以测试与复用。",
  },
  {
    label: "实验",
    stage: "固定导航环境",
    action:
      "建立地面、障碍和目标轨迹，烘焙 NavMesh，记录 Agent 半径、速度、停止距离与可达/不可达样本。",
    metric: "single variable",
    evidence:
      "public readonly record struct Perception(float Distance, bool HasLineOfSight, float Health01, bool PathReady);",
    boundary: "同时改变多个输入会失去因果归属。",
  },
  {
    label: "失败",
    stage: "重放边界轨迹",
    action:
      "让目标穿过视线、距离和障碍边界，降低 NPC 生命，记录状态图、路径状态和动画参数，验证迟滞与优先级。",
    metric: "normal / edge / failure",
    evidence:
      "把 Animator 状态直接当业务状态会让决策依赖过渡时间和动画命名，难以测试与复用。；每帧重新 SetDestination、Raycast 和全场搜索会把一个简单 FSM 变成高成本轮询。",
    boundary:
      "现代 AI Navigation 包改变 NavMeshSurface、烘焙和链接工作流，Mecanim 与 NavMeshAgent 核心仍可映射。原章的状态与路径问题应保留，再用当前组件实现。更复杂行为树或 Utility AI 可以对照，但不能替代对五个原始状态和 C#/Mecanim FSM 的覆盖。",
  },
  {
    label: "验收",
    stage: "Chapter 7 证据包",
    action:
      "验收场景包含可达巡逻、目标出现、遮挡、进入攻击、退出攻击、低血寻找生命、无可达路径和目标丢失。日志给出感知快照、转换原因、Agent pathStatus 与动作结果；相同轨迹重放应得到同一状态序列。",
    metric: "replayable proof",
    evidence:
      "NavMesh 解决路径，FSM 解决何时做什么；感知快照、守卫、状态动作和反馈应解耦；迟滞、优先级与动作完成条件决定状态稳定性；现代 AI 包可替换烘焙载体，不能删除原始五状态边界",
    boundary: "没有固定输入和失败样本的成功截图不能签发。",
  },
] as const satisfies ReadonlyArray<UnityScriptingSnapshot>;

export function Usc07ArtificialIntelligenceMapLab() {
  return (
    <UnityScriptingLab
      title="第 7 章 Artificial Intelligence：NavMesh 与有限状态机"
      chapter="Chapter 7 · Mastering Unity Scripting"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function Usc07ArtificialIntelligenceExperimentLab() {
  return (
    <UnityScriptingLab
      title="第 7 章 Artificial Intelligence：NavMesh 与有限状态机"
      chapter="Chapter 7 · Mastering Unity Scripting"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function Usc07ArtificialIntelligenceEvidenceLab() {
  return (
    <UnityScriptingLab
      title="第 7 章 Artificial Intelligence：NavMesh 与有限状态机"
      chapter="Chapter 7 · Mastering Unity Scripting"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
