import { GameMathOfficialLab, type GameMathSnapshot } from "./official-lab";
const snapshots:GameMathSnapshot[]=[
  {
    "label": "速度",
    "input": "从单位、平均速度进入导数、加速度、积分、恒加速度和匀速圆周运动。",
    "operation": "位置对时间的导数，包含速率和方向。",
    "output": "观察速度的数值与图形变化",
    "risk": "把速度当作每帧位移，帧率变化时运动速度也变化。"
  },
  {
    "label": "加速度",
    "input": "速度",
    "operation": "速度对时间的导数，可改变速率、方向或两者。",
    "output": "观察加速度的数值与图形变化",
    "risk": "只看到圆周运动速率不变，就错误认为加速度为零。"
  },
  {
    "label": "导数",
    "input": "加速度",
    "operation": "差商在时间间隔趋于零时的极限，描述瞬时变化率。",
    "output": "观察导数的数值与图形变化",
    "risk": "把速度当作每帧位移，帧率变化时运动速度也变化。"
  },
  {
    "label": "积分",
    "input": "导数",
    "operation": "把微小变化累积为总量，与导数通过微积分基本定理连接。",
    "output": "观察积分的数值与图形变化",
    "risk": "只看到圆周运动速率不变，就错误认为加速度为零。"
  },
  {
    "label": "圆周运动",
    "input": "积分",
    "operation": "恒定速率仍有指向圆心的加速度，大小为速度平方除以半径。",
    "output": "跳跃轨迹先用解析恒加速度公式做基准，再对不同帧率的数值积分结果比较位置和能量误差；记录秒、米等单位，不能用每帧速度掩盖时间步。",
    "risk": "把速度当作每帧位移，帧率变化时运动速度也变化。"
  }
];
export function Gm3dLinearKinematicsCalculusConceptLab(){return <GameMathOfficialLab title="第11章 力学1：线性运动学与微积分 · 概念" caption="切换原书核心单元，先固定对象、空间与约定。" mode="kinematics" snapshots={snapshots}/>}
export function Gm3dLinearKinematicsCalculusTransformLab(){return <GameMathOfficialLab title="第11章 力学1：线性运动学与微积分 · 变换" caption="拖动参数，观察数值与几何如何同步变化。" mode="kinematics" snapshots={snapshots} initial={1}/>}
export function Gm3dLinearKinematicsCalculusEvidenceLab(){return <GameMathOfficialLab title="第11章 力学1：线性运动学与微积分 · 证据" caption="用边界、残差和重放结果完成验收。" mode="kinematics" snapshots={snapshots} initial={2}/>}
