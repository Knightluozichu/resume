import { GameMathOfficialLab, type GameMathSnapshot } from "./official-lab";
const snapshots:GameMathSnapshot[]=[
  {
    "label": "世界空间",
    "input": "区分世界、物体、相机与直立空间，并用基向量解释嵌套空间变换。",
    "operation": "场景共享的全局参考系，适合比较不同对象的位置。",
    "output": "观察世界空间的数值与图形变化",
    "risk": "把局部方向当作世界方向直接参与寻路或物理计算。"
  },
  {
    "label": "物体空间",
    "input": "世界空间",
    "operation": "以模型自身原点和轴为参考，便于复用网格与局部动画。",
    "output": "观察物体空间的数值与图形变化",
    "risk": "父节点带非均匀缩放后仍把旋转子矩阵当作正交矩阵求逆。"
  },
  {
    "label": "相机空间",
    "input": "物体空间",
    "operation": "以观察者为原点，把可见性与投影问题统一到视线方向。",
    "output": "观察相机空间的数值与图形变化",
    "risk": "把局部方向当作世界方向直接参与寻路或物理计算。"
  },
  {
    "label": "基向量",
    "input": "相机空间",
    "operation": "一组独立方向定义坐标轴，坐标是向量在该基下的分量。",
    "output": "观察基向量的数值与图形变化",
    "risk": "父节点带非均匀缩放后仍把旋转子矩阵当作正交矩阵求逆。"
  },
  {
    "label": "嵌套变换",
    "input": "基向量",
    "operation": "局部空间沿父子层级逐层组合到世界或相机空间。",
    "output": "枪口特效应先从武器骨骼局部空间变到角色空间，再到世界空间；调试时同时画出每一级原点和三条基轴，能定位到底是哪一级方向或尺度错误。",
    "risk": "把局部方向当作世界方向直接参与寻路或物理计算。"
  }
];
export function Gm3dMultipleCoordinateSpacesConceptLab(){return <GameMathOfficialLab title="第3章 多个坐标空间 · 概念" caption="切换原书核心单元，先固定对象、空间与约定。" mode="spaces" snapshots={snapshots}/>}
export function Gm3dMultipleCoordinateSpacesTransformLab(){return <GameMathOfficialLab title="第3章 多个坐标空间 · 变换" caption="拖动参数，观察数值与几何如何同步变化。" mode="spaces" snapshots={snapshots} initial={1}/>}
export function Gm3dMultipleCoordinateSpacesEvidenceLab(){return <GameMathOfficialLab title="第3章 多个坐标空间 · 证据" caption="用边界、残差和重放结果完成验收。" mode="spaces" snapshots={snapshots} initial={2}/>}
