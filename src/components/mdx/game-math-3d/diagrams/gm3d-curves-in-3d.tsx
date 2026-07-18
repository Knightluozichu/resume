import { GameMathOfficialLab, type GameMathSnapshot } from "./official-lab";
const snapshots:GameMathSnapshot[]=[
  {
    "label": "参数曲线",
    "input": "用参数多项式、插值、Hermite、Bezier、细分与样条构造可控连续曲线。",
    "operation": "位置是参数t的向量函数，几何形状与采样速度是不同问题。",
    "output": "观察参数曲线的数值与图形变化",
    "risk": "直接用参数t匀速前进，却把曲线上的非匀速运动误判为插值错误。"
  },
  {
    "label": "多项式插值",
    "input": "参数曲线",
    "operation": "构造通过给定数据点的多项式，但高阶全局插值可能振荡。",
    "output": "观察多项式插值的数值与图形变化",
    "risk": "只保证相邻曲线端点重合，没有保证切线方向或大小连续。"
  },
  {
    "label": "Hermite曲线",
    "input": "多项式插值",
    "operation": "用端点位置和端点切向量控制一段三次曲线。",
    "output": "观察Hermite曲线的数值与图形变化",
    "risk": "直接用参数t匀速前进，却把曲线上的非匀速运动误判为插值错误。"
  },
  {
    "label": "Bezier曲线",
    "input": "Hermite曲线",
    "operation": "由控制点和Bernstein基加权，de Casteljau算法可稳定求值与细分。",
    "output": "观察Bezier曲线的数值与图形变化",
    "risk": "只保证相邻曲线端点重合，没有保证切线方向或大小连续。"
  },
  {
    "label": "样条连续性",
    "input": "Bezier曲线",
    "operation": "分段曲线通过结点连接，并以参数或几何连续性约束平滑程度。",
    "output": "相机轨迹要分别验收位置连续、切线连续和近似恒速；编辑器显示控制多边形、切向量和曲率热点，运行时按弧长表重参数化，不能假设等间隔t就是等距离。",
    "risk": "直接用参数t匀速前进，却把曲线上的非匀速运动误判为插值错误。"
  }
];
export function Gm3dCurvesIn3dConceptLab(){return <GameMathOfficialLab title="第13章 三维曲线 · 概念" caption="切换原书核心单元，先固定对象、空间与约定。" mode="curves" snapshots={snapshots}/>}
export function Gm3dCurvesIn3dTransformLab(){return <GameMathOfficialLab title="第13章 三维曲线 · 变换" caption="拖动参数，观察数值与几何如何同步变化。" mode="curves" snapshots={snapshots} initial={1}/>}
export function Gm3dCurvesIn3dEvidenceLab(){return <GameMathOfficialLab title="第13章 三维曲线 · 证据" caption="用边界、残差和重放结果完成验收。" mode="curves" snapshots={snapshots} initial={2}/>}
