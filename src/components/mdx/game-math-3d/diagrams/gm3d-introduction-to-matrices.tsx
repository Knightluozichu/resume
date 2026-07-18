import { GameMathOfficialLab, type GameMathSnapshot } from "./official-lab";
const snapshots:GameMathSnapshot[]=[
  {
    "label": "矩阵维度",
    "input": "从矩阵记号、转置和乘法进入几何解释，建立行向量与列向量的一致约定。",
    "operation": "m行n列矩阵把n维输入映射为m维输出。",
    "output": "观察矩阵维度的数值与图形变化",
    "risk": "把内存布局和数学上的行向量/列向量约定混为一谈。"
  },
  {
    "label": "矩阵乘法",
    "input": "矩阵维度",
    "operation": "输出元素是左矩阵一行与右矩阵一列的点积。",
    "output": "观察矩阵乘法的数值与图形变化",
    "risk": "因为维度相同就交换矩阵乘法顺序，导致父子变换结果改变。"
  },
  {
    "label": "转置",
    "input": "矩阵乘法",
    "operation": "沿主对角线交换行列，并反转乘积的顺序。",
    "output": "观察转置的数值与图形变化",
    "risk": "把内存布局和数学上的行向量/列向量约定混为一谈。"
  },
  {
    "label": "行列约定",
    "input": "转置",
    "operation": "行向量与列向量都可用，但公式、存储和组合顺序必须一致。",
    "output": "观察行列约定的数值与图形变化",
    "risk": "因为维度相同就交换矩阵乘法顺序，导致父子变换结果改变。"
  },
  {
    "label": "几何解释",
    "input": "行列约定",
    "operation": "变换矩阵的基向量像描述坐标网格如何被拉伸、旋转或剪切。",
    "output": "CPU端与着色器对接时同时写明向量在左还是右、矩阵内存是行主序还是列主序、组合按哪一侧发生；用非对称测试矩阵验收，单位矩阵无法暴露转置错误。",
    "risk": "把内存布局和数学上的行向量/列向量约定混为一谈。"
  }
];
export function Gm3dIntroductionToMatricesConceptLab(){return <GameMathOfficialLab title="第4章 矩阵导论 · 概念" caption="切换原书核心单元，先固定对象、空间与约定。" mode="matrix" snapshots={snapshots}/>}
export function Gm3dIntroductionToMatricesTransformLab(){return <GameMathOfficialLab title="第4章 矩阵导论 · 变换" caption="拖动参数，观察数值与几何如何同步变化。" mode="matrix" snapshots={snapshots} initial={1}/>}
export function Gm3dIntroductionToMatricesEvidenceLab(){return <GameMathOfficialLab title="第4章 矩阵导论 · 证据" caption="用边界、残差和重放结果完成验收。" mode="matrix" snapshots={snapshots} initial={2}/>}
