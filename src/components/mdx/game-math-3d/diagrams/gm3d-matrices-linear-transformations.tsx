import { GameMathOfficialLab, type GameMathSnapshot } from "./official-lab";
const snapshots:GameMathSnapshot[]=[
  {
    "label": "旋转矩阵",
    "input": "用矩阵构造旋转、缩放、正交投影、反射与剪切，并分类组合变换。",
    "operation": "正交且行列式为一，保持长度、角度和朝向。",
    "output": "观察旋转矩阵的数值与图形变化",
    "risk": "默认SRT三个步骤可以任意交换，忽略矩阵乘法不满足交换律。"
  },
  {
    "label": "缩放与剪切",
    "input": "旋转矩阵",
    "operation": "分别改变基向量长度或让一个轴随另一个轴偏移。",
    "output": "观察缩放与剪切的数值与图形变化",
    "risk": "对法线直接使用带非均匀缩放的模型矩阵，破坏其与表面的垂直关系。"
  },
  {
    "label": "正交投影",
    "input": "缩放与剪切",
    "operation": "删除垂直于目标直线或平面的分量。",
    "output": "观察正交投影的数值与图形变化",
    "risk": "默认SRT三个步骤可以任意交换，忽略矩阵乘法不满足交换律。"
  },
  {
    "label": "变换组合",
    "input": "正交投影",
    "operation": "矩阵乘法把多个步骤折叠为一次映射，但顺序不可交换。",
    "output": "观察变换组合的数值与图形变化",
    "risk": "对法线直接使用带非均匀缩放的模型矩阵，破坏其与表面的垂直关系。"
  },
  {
    "label": "变换分类",
    "input": "变换组合",
    "operation": "线性、仿射、可逆、正交和刚体类别给出不同不变量。",
    "output": "模型实例的SRT组合必须用一组非均匀缩放、非零旋转和非零平移的测试姿态验收；只测原点、单位尺度或零角度，会让错误顺序看起来正确。",
    "risk": "默认SRT三个步骤可以任意交换，忽略矩阵乘法不满足交换律。"
  }
];
export function Gm3dMatricesLinearTransformationsConceptLab(){return <GameMathOfficialLab title="第5章 矩阵与线性变换 · 概念" caption="切换原书核心单元，先固定对象、空间与约定。" mode="transform" snapshots={snapshots}/>}
export function Gm3dMatricesLinearTransformationsTransformLab(){return <GameMathOfficialLab title="第5章 矩阵与线性变换 · 变换" caption="拖动参数，观察数值与几何如何同步变化。" mode="transform" snapshots={snapshots} initial={1}/>}
export function Gm3dMatricesLinearTransformationsEvidenceLab(){return <GameMathOfficialLab title="第5章 矩阵与线性变换 · 证据" caption="用边界、残差和重放结果完成验收。" mode="transform" snapshots={snapshots} initial={2}/>}
