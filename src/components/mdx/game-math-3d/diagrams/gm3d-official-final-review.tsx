import { GameMathOfficialLab, type GameMathSnapshot } from "./official-lab";
const snapshots:GameMathSnapshot[]=[
  {
    "label": "约定清单",
    "input": "用坐标变换、相机、碰撞、刚体和曲线相机的综合场景验收14章与附录A。",
    "operation": "手性、向上轴、角度单位、向量侧、矩阵布局和深度范围必须显式记录。",
    "output": "观察约定清单的数值与图形变化",
    "risk": "只分别测试模块，不测试矩阵、几何、物理和渲染之间的约定接口。"
  },
  {
    "label": "空间追踪",
    "input": "约定清单",
    "operation": "每个点、方向和法线都标记来源空间与目标空间。",
    "output": "观察空间追踪的数值与图形变化",
    "risk": "只保存成功截图，没有失败输入、残差和重放步骤。"
  },
  {
    "label": "不变量",
    "input": "空间追踪",
    "operation": "正交性、单位长度、重心权重和、动量与端点条件用于自动验收。",
    "output": "观察不变量的数值与图形变化",
    "risk": "只分别测试模块，不测试矩阵、几何、物理和渲染之间的约定接口。"
  },
  {
    "label": "误差预算",
    "input": "不变量",
    "operation": "浮点、离散积分和近似模型的允许误差在运行前定义。",
    "output": "观察误差预算的数值与图形变化",
    "risk": "只保存成功截图，没有失败输入、残差和重放步骤。"
  },
  {
    "label": "重放证据",
    "input": "误差预算",
    "operation": "保存输入、时间步、随机种子、状态快照和图形调试层。",
    "output": "最终项目用轨道相机观察一组刚体沿曲线进入碰撞区：显示物体、世界和相机基轴，记录裁剪坐标、接触参数、冲量、角速度和曲线弧长误差。",
    "risk": "只分别测试模块，不测试矩阵、几何、物理和渲染之间的约定接口。"
  }
];
export function Gm3dOfficialFinalReviewConceptLab(){return <GameMathOfficialLab title="《3D数学基础》全书总复习 · 概念" caption="切换原书核心单元，先固定对象、空间与约定。" mode="roadmap" snapshots={snapshots}/>}
export function Gm3dOfficialFinalReviewTransformLab(){return <GameMathOfficialLab title="《3D数学基础》全书总复习 · 变换" caption="拖动参数，观察数值与几何如何同步变化。" mode="roadmap" snapshots={snapshots} initial={1}/>}
export function Gm3dOfficialFinalReviewEvidenceLab(){return <GameMathOfficialLab title="《3D数学基础》全书总复习 · 证据" caption="用边界、残差和重放结果完成验收。" mode="roadmap" snapshots={snapshots} initial={2}/>}
