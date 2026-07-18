import { GameMathOfficialLab, type GameMathSnapshot } from "./official-lab";
const snapshots:GameMathSnapshot[]=[
  {
    "label": "行列式",
    "input": "用行列式、逆矩阵、正交化、齐次矩阵和透视投影完成空间变换工具箱。",
    "operation": "度量有向面积或体积缩放，零值意味着变换压扁维度而不可逆。",
    "output": "观察行列式的数值与图形变化",
    "risk": "用行列式不为零作为唯一数值稳定标准，忽略接近奇异的病态矩阵。"
  },
  {
    "label": "逆矩阵",
    "input": "行列式",
    "operation": "撤销可逆变换；数值实现应避免显式求逆并检查条件。",
    "output": "观察逆矩阵的数值与图形变化",
    "risk": "忘记对点做透视除法，或把方向向量的w错误设为一。"
  },
  {
    "label": "正交矩阵",
    "input": "逆矩阵",
    "operation": "基向量两两垂直且单位化，逆等于转置。",
    "output": "观察正交矩阵的数值与图形变化",
    "risk": "用行列式不为零作为唯一数值稳定标准，忽略接近奇异的病态矩阵。"
  },
  {
    "label": "齐次坐标",
    "input": "正交矩阵",
    "operation": "用第四分量区分点和方向，并把平移纳入矩阵乘法。",
    "output": "观察齐次坐标的数值与图形变化",
    "risk": "忘记对点做透视除法，或把方向向量的w错误设为一。"
  },
  {
    "label": "透视投影",
    "input": "齐次坐标",
    "operation": "在齐次裁剪空间编码视锥，随后透视除法产生近大远小。",
    "output": "相机投影调试要保存视图空间、裁剪空间、NDC和屏幕空间四组坐标，并测试近平面、远平面和w接近零的点；只看最终像素无法区分矩阵与除法错误。",
    "risk": "用行列式不为零作为唯一数值稳定标准，忽略接近奇异的病态矩阵。"
  }
];
export function Gm3dMoreOnMatricesConceptLab(){return <GameMathOfficialLab title="第6章 矩阵进阶 · 概念" caption="切换原书核心单元，先固定对象、空间与约定。" mode="matrix" snapshots={snapshots}/>}
export function Gm3dMoreOnMatricesTransformLab(){return <GameMathOfficialLab title="第6章 矩阵进阶 · 变换" caption="拖动参数，观察数值与几何如何同步变化。" mode="matrix" snapshots={snapshots} initial={1}/>}
export function Gm3dMoreOnMatricesEvidenceLab(){return <GameMathOfficialLab title="第6章 矩阵进阶 · 证据" caption="用边界、残差和重放结果完成验收。" mode="matrix" snapshots={snapshots} initial={2}/>}
