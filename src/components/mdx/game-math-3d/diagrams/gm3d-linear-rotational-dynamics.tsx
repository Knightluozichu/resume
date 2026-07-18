import { GameMathOfficialLab, type GameMathSnapshot } from "./official-lab";
const snapshots:GameMathSnapshot[]=[
  {
    "label": "牛顿定律",
    "input": "由牛顿定律、力、动量和冲量进入碰撞、转动惯量与实时刚体积分。",
    "operation": "合力等于动量变化率；作用与反作用力大小相等方向相反。",
    "output": "观察牛顿定律的数值与图形变化",
    "risk": "对已经分离的物体仍施加正向碰撞冲量，制造吸附或抖动。"
  },
  {
    "label": "动量与冲量",
    "input": "牛顿定律",
    "operation": "冲量是力对时间的积分，直接改变线动量。",
    "output": "观察动量与冲量的数值与图形变化",
    "risk": "显式欧拉配合刚性弹簧和大时间步，能量迅速爆炸。"
  },
  {
    "label": "碰撞响应",
    "input": "动量与冲量",
    "operation": "沿接触法线求冲量，并结合恢复系数和摩擦处理速度变化。",
    "output": "观察碰撞响应的数值与图形变化",
    "risk": "对已经分离的物体仍施加正向碰撞冲量，制造吸附或抖动。"
  },
  {
    "label": "转动惯量",
    "input": "碰撞响应",
    "operation": "物体对角速度变化的阻抗，取决于质量相对转轴的分布。",
    "output": "观察转动惯量的数值与图形变化",
    "risk": "显式欧拉配合刚性弹簧和大时间步，能量迅速爆炸。"
  },
  {
    "label": "数值积分",
    "input": "转动惯量",
    "operation": "实时模拟离散推进状态，时间步与积分器决定稳定性和误差。",
    "output": "刚体求解器用固定时间步、最大子步数和确定性接触排序；验收自由落体、弹簧、无摩擦碰撞和偏心碰撞四个基准，再观察能量漂移与穿透。",
    "risk": "对已经分离的物体仍施加正向碰撞冲量，制造吸附或抖动。"
  }
];
export function Gm3dLinearRotationalDynamicsConceptLab(){return <GameMathOfficialLab title="第12章 力学2：线性与旋转动力学 · 概念" caption="切换原书核心单元，先固定对象、空间与约定。" mode="dynamics" snapshots={snapshots}/>}
export function Gm3dLinearRotationalDynamicsTransformLab(){return <GameMathOfficialLab title="第12章 力学2：线性与旋转动力学 · 变换" caption="拖动参数，观察数值与几何如何同步变化。" mode="dynamics" snapshots={snapshots} initial={1}/>}
export function Gm3dLinearRotationalDynamicsEvidenceLab(){return <GameMathOfficialLab title="第12章 力学2：线性与旋转动力学 · 证据" caption="用边界、残差和重放结果完成验收。" mode="dynamics" snapshots={snapshots} initial={2}/>}
