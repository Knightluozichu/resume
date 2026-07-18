import { GameMathOfficialLab, type GameMathSnapshot } from "./official-lab";
const snapshots:GameMathSnapshot[]=[
  {
    "label": "向量与点",
    "input": "把向量同时看作代数分量和几何位移，掌握长度、单位化、点积与叉积。",
    "operation": "点描述位置，向量描述位移；两点相减得到向量，点加向量得到点。",
    "output": "观察向量与点的数值与图形变化",
    "risk": "把点和向量都存成三个数后忘记语义，结果对两个位置做了无意义的相加。"
  },
  {
    "label": "单位向量",
    "input": "向量与点",
    "operation": "长度为一的向量只保留方向，单位化前必须处理零向量。",
    "output": "观察单位向量的数值与图形变化",
    "risk": "单位化零向量或极短向量，产生NaN并污染后续矩阵。"
  },
  {
    "label": "点积",
    "input": "单位向量",
    "operation": "分量乘积之和，也等于两向量长度乘夹角余弦。",
    "output": "观察点积的数值与图形变化",
    "risk": "把点和向量都存成三个数后忘记语义，结果对两个位置做了无意义的相加。"
  },
  {
    "label": "叉积",
    "input": "点积",
    "operation": "生成垂直于两个输入的向量，方向由坐标手性决定。",
    "output": "观察叉积的数值与图形变化",
    "risk": "单位化零向量或极短向量，产生NaN并污染后续矩阵。"
  },
  {
    "label": "线性代数恒等式",
    "input": "叉积",
    "operation": "交换、结合、分配等规则决定公式能否安全重排。",
    "output": "角色视野判断先把目标位移与角色前向单位化，再比较点积和视野阈值；碰撞法线则用叉积与三角形绕序生成，并用已知朝外的面验收符号。",
    "risk": "把点和向量都存成三个数后忘记语义，结果对两个位置做了无意义的相加。"
  }
];
export function Gm3dVectorsConceptLab(){return <GameMathOfficialLab title="第2章 向量 · 概念" caption="切换原书核心单元，先固定对象、空间与约定。" mode="vector" snapshots={snapshots}/>}
export function Gm3dVectorsTransformLab(){return <GameMathOfficialLab title="第2章 向量 · 变换" caption="拖动参数，观察数值与几何如何同步变化。" mode="vector" snapshots={snapshots} initial={1}/>}
export function Gm3dVectorsEvidenceLab(){return <GameMathOfficialLab title="第2章 向量 · 证据" caption="用边界、残差和重放结果完成验收。" mode="vector" snapshots={snapshots} initial={2}/>}
