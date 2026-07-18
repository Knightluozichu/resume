import { GameMathOfficialLab, type GameMathSnapshot } from "./official-lab";
const snapshots:GameMathSnapshot[]=[
  {
    "label": "欧拉角",
    "input": "比较旋转矩阵、欧拉角、轴角、指数映射和四元数，并完成表示转换。",
    "operation": "按约定顺序绕三个轴旋转，直观但有顺序依赖与万向节锁。",
    "output": "观察欧拉角的数值与图形变化",
    "risk": "对四元数四个分量直接线性插值后不归一化，导致旋转漂移。"
  },
  {
    "label": "轴角与指数映射",
    "input": "欧拉角",
    "operation": "用旋转轴和角度描述角位移，适合小旋转与优化。",
    "output": "观察轴角与指数映射的数值与图形变化",
    "risk": "忽略q与负q等价，Slerp选择长弧并出现突然翻转。"
  },
  {
    "label": "单位四元数",
    "input": "轴角与指数映射",
    "operation": "单位四元数表示三维旋转，q与负q代表同一方位。",
    "output": "观察单位四元数的数值与图形变化",
    "risk": "对四元数四个分量直接线性插值后不归一化，导致旋转漂移。"
  },
  {
    "label": "球面插值",
    "input": "单位四元数",
    "operation": "Slerp沿单位四元数球面的短弧以恒定角速度插值。",
    "output": "观察球面插值的数值与图形变化",
    "risk": "忽略q与负q等价，Slerp选择长弧并出现突然翻转。"
  },
  {
    "label": "表示转换",
    "input": "球面插值",
    "operation": "矩阵、欧拉角、轴角与四元数各有边界，转换必须固定约定。",
    "output": "网络同步方位时保存归一化四元数，插值前做同半球修正；编辑器可以显示欧拉角，但运行时不能假设往返转换后角度分量保持不变。",
    "risk": "对四元数四个分量直接线性插值后不归一化，导致旋转漂移。"
  }
];
export function Gm3dRotationThreeDimensionsConceptLab(){return <GameMathOfficialLab title="第8章 三维旋转 · 概念" caption="切换原书核心单元，先固定对象、空间与约定。" mode="rotation" snapshots={snapshots}/>}
export function Gm3dRotationThreeDimensionsTransformLab(){return <GameMathOfficialLab title="第8章 三维旋转 · 变换" caption="拖动参数，观察数值与几何如何同步变化。" mode="rotation" snapshots={snapshots} initial={1}/>}
export function Gm3dRotationThreeDimensionsEvidenceLab(){return <GameMathOfficialLab title="第8章 三维旋转 · 证据" caption="用边界、残差和重放结果完成验收。" mode="rotation" snapshots={snapshots} initial={2}/>}
