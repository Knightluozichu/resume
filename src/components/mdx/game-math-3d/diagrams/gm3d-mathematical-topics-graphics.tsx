import { GameMathOfficialLab, type GameMathSnapshot } from "./official-lab";
const snapshots:GameMathSnapshot[]=[
  {
    "label": "渲染方程",
    "input": "沿渲染方程、观察变换、网格、光照、骨骼、法线贴图和实时管线追踪像素。",
    "operation": "出射辐亮度由自发光和入射光经材质散射的积分组成。",
    "output": "观察渲染方程的数值与图形变化",
    "risk": "在不同坐标空间里计算法线与光向量点积，画面随相机移动而改变。"
  },
  {
    "label": "视锥与裁剪空间",
    "input": "渲染方程",
    "operation": "相机参数定义可见体积，裁剪坐标让六个平面测试统一。",
    "output": "观察视锥与裁剪空间的数值与图形变化",
    "risk": "把Blinn-Phong当作能量守恒的完整物理模型，忽略其适用边界。"
  },
  {
    "label": "网格与属性插值",
    "input": "视锥与裁剪空间",
    "operation": "索引三角形共享顶点，重心权重在片元内插值纹理坐标和法线。",
    "output": "观察网格与属性插值的数值与图形变化",
    "risk": "在不同坐标空间里计算法线与光向量点积，画面随相机移动而改变。"
  },
  {
    "label": "局部光照",
    "input": "网格与属性插值",
    "operation": "环境、自发光、漫反射和高光只是完整光传输的局部近似。",
    "output": "观察局部光照的数值与图形变化",
    "risk": "把Blinn-Phong当作能量守恒的完整物理模型，忽略其适用边界。"
  },
  {
    "label": "切线空间与骨骼",
    "input": "局部光照",
    "operation": "局部基支持法线贴图，骨骼矩阵加权支持网格变形。",
    "output": "像素异常时保存模型、世界、视图、裁剪和屏幕坐标，另保存几何法线、切线空间法线和光向量；逐阶段对照比只修改着色器最终颜色更快定位问题。",
    "risk": "在不同坐标空间里计算法线与光向量点积，画面随相机移动而改变。"
  }
];
export function Gm3dMathematicalTopicsGraphicsConceptLab(){return <GameMathOfficialLab title="第10章 3D图形学中的数学主题 · 概念" caption="切换原书核心单元，先固定对象、空间与约定。" mode="graphics" snapshots={snapshots}/>}
export function Gm3dMathematicalTopicsGraphicsTransformLab(){return <GameMathOfficialLab title="第10章 3D图形学中的数学主题 · 变换" caption="拖动参数，观察数值与几何如何同步变化。" mode="graphics" snapshots={snapshots} initial={1}/>}
export function Gm3dMathematicalTopicsGraphicsEvidenceLab(){return <GameMathOfficialLab title="第10章 3D图形学中的数学主题 · 证据" caption="用边界、残差和重放结果完成验收。" mode="graphics" snapshots={snapshots} initial={2}/>}
