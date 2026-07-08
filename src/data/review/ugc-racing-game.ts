import type { ReviewQuestion } from "./types";

export const ugcRacingGameQuestions: ReviewQuestion[] = [
  {
    id: "ugc-racing-game-1",
    chapter: "ugc-racing-game",
    level: 1,
    question: "WheelCollider 是什么？为什么赛车游戏用它？",
    answer: "WheelCollider 是 Unity 专门为车辆物理设计的组件，模拟轮胎摩擦（侧向/纵向）、悬挂弹簧、转向几何。用 AddForce 推方块没有抓地力和悬挂，感觉不像开车。WheelCollider 的 motorTorque/brakeTorque/steerAngle 是真实车辆参数，手感接近真实驾驶。",
    tags: ["WheelCollider", "车辆物理"],
  },
  {
    id: "ugc-racing-game-2",
    chapter: "ugc-racing-game",
    level: 2,
    question: "赛车游戏的前轮和后轮 WheelCollider 配置有什么不同？",
    answer: "前轮负责转向：steerAngle 控制转向角度，motorTorque 通常为 0（除非四驱）。后轮负责驱动：motorTorque 提供驱动力，steerAngle 为 0。刹车四个轮都加 brakeTorque。下压力用 rb.AddForce 模拟空气动力学防止高速飞起。",
    tags: ["前轮后轮", "转向驱动"],
  },
  {
    id: "ugc-racing-game-3",
    chapter: "ugc-racing-game",
    level: 3,
    question: "赛道检查点系统怎么实现？怎么防止抄近路？",
    answer: "赛道按顺序放检查点触发器（Trigger），编号 0~N。currentCheckpoint 记录当前应到的检查点。OnTriggerEnter 检查：只有到达 currentCheckpoint 对应的触发器才 currentCheckpoint++。必须按顺序 0→1→...→N 通过所有检查点再回到起点才算一圈。跳过检查点不计圈，防止抄近路。",
    tags: ["检查点", "赛道系统", "防抄近路"],
  },
  {
    id: "ugc-racing-game-4",
    chapter: "ugc-racing-game",
    level: 4,
    question: "车辆 AI 怎么实现自动驾驶？弯道怎么处理？",
    answer: "1）赛道放 Waypoint 路径点，弯道处加密；2）AI 找最近 Waypoint，用 InverseTransformPoint 算相对方向，steerAngle = relativePos.x / magnitude * maxAngle；3）转向用 Lerp 平滑而非直接设值；4）弯道减速：检测前方 Waypoint 与当前方向夹角大则减小 motorTorque 或加 brakeTorque；5）到达 Waypoint 切换下一个。核心：Waypoint 导航+WheelCollider 转向+弯道减速。",
    tags: ["车辆AI", "Waypoint", "综合"],
  },
];
