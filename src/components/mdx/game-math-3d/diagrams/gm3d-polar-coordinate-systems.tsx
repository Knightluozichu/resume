import { GameMathOfficialLab, type GameMathSnapshot } from "./official-lab";
const snapshots:GameMathSnapshot[]=[
  {
    "label": "二维极坐标",
    "input": "在二维极坐标、柱坐标与球坐标之间转换，并识别角度别名和奇点。",
    "operation": "用半径和方位角描述平面点，适合绕中心的运动。",
    "output": "观察二维极坐标的数值与图形变化",
    "risk": "用atan(y/x)计算角度，丢失象限并在x为零时除零。"
  },
  {
    "label": "坐标别名",
    "input": "二维极坐标",
    "operation": "不同角度甚至负半径可表示同一点，必须规定规范范围。",
    "output": "观察坐标别名的数值与图形变化",
    "risk": "跨越负pi与正pi边界时直接线性插值角度，产生一整圈绕行。"
  },
  {
    "label": "柱坐标",
    "input": "坐标别名",
    "operation": "在二维极坐标上增加高度，适合圆柱对称场景。",
    "output": "观察柱坐标的数值与图形变化",
    "risk": "用atan(y/x)计算角度，丢失象限并在x为零时除零。"
  },
  {
    "label": "球坐标",
    "input": "柱坐标",
    "operation": "用半径、方位角和俯仰角描述三维方向与位置。",
    "output": "观察球坐标的数值与图形变化",
    "risk": "跨越负pi与正pi边界时直接线性插值角度，产生一整圈绕行。"
  },
  {
    "label": "坐标转换",
    "input": "球坐标",
    "operation": "借助正弦、余弦和atan2在笛卡尔与极坐标之间转换。",
    "output": "环形UI、炮塔瞄准和球形相机适合在极坐标中编辑，但输出给渲染器前要固定角度范围、零半径行为和俯仰极点策略。",
    "risk": "用atan(y/x)计算角度，丢失象限并在x为零时除零。"
  }
];
export function Gm3dPolarCoordinateSystemsConceptLab(){return <GameMathOfficialLab title="第7章 极坐标系 · 概念" caption="切换原书核心单元，先固定对象、空间与约定。" mode="polar" snapshots={snapshots}/>}
export function Gm3dPolarCoordinateSystemsTransformLab(){return <GameMathOfficialLab title="第7章 极坐标系 · 变换" caption="拖动参数，观察数值与几何如何同步变化。" mode="polar" snapshots={snapshots} initial={1}/>}
export function Gm3dPolarCoordinateSystemsEvidenceLab(){return <GameMathOfficialLab title="第7章 极坐标系 · 证据" caption="用边界、残差和重放结果完成验收。" mode="polar" snapshots={snapshots} initial={2}/>}
