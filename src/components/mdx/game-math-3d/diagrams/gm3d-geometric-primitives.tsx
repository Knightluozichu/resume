import { GameMathOfficialLab, type GameMathSnapshot } from "./official-lab";
const snapshots:GameMathSnapshot[]=[
  {
    "label": "参数射线",
    "input": "选择直线、射线、球、包围盒、平面、三角形和多边形的稳定表示。",
    "operation": "用起点加方向乘参数表示半直线，并规定参数下界。",
    "output": "观察参数射线的数值与图形变化",
    "risk": "默认射线方向一定单位化，却在距离比较中使用未经归一化的参数t。"
  },
  {
    "label": "包围体",
    "input": "参数射线",
    "operation": "AABB与包围球用便宜的保守测试筛掉不可能相交的对象。",
    "output": "观察包围体的数值与图形变化",
    "risk": "把退化三角形继续送入重心坐标除法，产生无限值或随机命中。"
  },
  {
    "label": "平面方程",
    "input": "包围体",
    "operation": "单位法线与常数定义平面，也直接给出有符号距离。",
    "output": "观察平面方程的数值与图形变化",
    "risk": "默认射线方向一定单位化，却在距离比较中使用未经归一化的参数t。"
  },
  {
    "label": "重心坐标",
    "input": "平面方程",
    "operation": "用三个权重表达三角形内点，并插值顶点属性。",
    "output": "观察重心坐标的数值与图形变化",
    "risk": "把退化三角形继续送入重心坐标除法，产生无限值或随机命中。"
  },
  {
    "label": "多边形三角化",
    "input": "重心坐标",
    "operation": "将简单多边形拆为三角形，同时处理凹性、绕序和退化边。",
    "output": "宽阶段用AABB筛选，窄阶段用射线或三角形测试；所有图元结构同时记录坐标空间、是否归一化和边界包含规则，避免同一接触在不同平台上忽隐忽现。",
    "risk": "默认射线方向一定单位化，却在距离比较中使用未经归一化的参数t。"
  }
];
export function Gm3dGeometricPrimitivesConceptLab(){return <GameMathOfficialLab title="第9章 几何图元 · 概念" caption="切换原书核心单元，先固定对象、空间与约定。" mode="geometry" snapshots={snapshots}/>}
export function Gm3dGeometricPrimitivesTransformLab(){return <GameMathOfficialLab title="第9章 几何图元 · 变换" caption="拖动参数，观察数值与几何如何同步变化。" mode="geometry" snapshots={snapshots} initial={1}/>}
export function Gm3dGeometricPrimitivesEvidenceLab(){return <GameMathOfficialLab title="第9章 几何图元 · 证据" caption="用边界、残差和重放结果完成验收。" mode="geometry" snapshots={snapshots} initial={2}/>}
