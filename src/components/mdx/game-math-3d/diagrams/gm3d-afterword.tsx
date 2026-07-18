import { GameMathOfficialLab, type GameMathSnapshot } from "./official-lab";
const snapshots:GameMathSnapshot[]=[
  {
    "label": "最小项目",
    "input": "把坐标、方位、图形、物理和曲线汇成可运行项目，并建立继续学习路线。",
    "operation": "用一个可运行场景串联相机、对象变换、碰撞和曲线路径。",
    "output": "观察最小项目的数值与图形变化",
    "risk": "不停阅读新公式，却没有一个能反复修改和测量的运行场景。"
  },
  {
    "label": "可视化调试",
    "input": "最小项目",
    "operation": "把基向量、法线、包围体、速度和接触点直接画进场景。",
    "output": "观察可视化调试的数值与图形变化",
    "risk": "只凭画面看起来正确验收，未保存数值、不变量和边界样例。"
  },
  {
    "label": "数值验收",
    "input": "可视化调试",
    "operation": "用不变量、解析基准和误差预算判断实现是否可信。",
    "output": "观察数值验收的数值与图形变化",
    "risk": "不停阅读新公式，却没有一个能反复修改和测量的运行场景。"
  },
  {
    "label": "知识迁移",
    "input": "数值验收",
    "operation": "将同一数学对象在渲染、物理、动画和工具中交叉验证。",
    "output": "观察知识迁移的数值与图形变化",
    "risk": "只凭画面看起来正确验收，未保存数值、不变量和边界样例。"
  },
  {
    "label": "继续学习",
    "input": "知识迁移",
    "operation": "在图形学、动力学、计算几何和数值方法中按项目瓶颈深入。",
    "output": "做一个可切换坐标空间的刚体样例：相机沿Bezier轨迹移动，物体发生旋转碰撞，画面叠加基轴、速度、法线和包围盒；每个模块都保留可重放输入。",
    "risk": "不停阅读新公式，却没有一个能反复修改和测量的运行场景。"
  }
];
export function Gm3dAfterwordConceptLab(){return <GameMathOfficialLab title="第14章 后记：接下来做什么 · 概念" caption="切换原书核心单元，先固定对象、空间与约定。" mode="roadmap" snapshots={snapshots}/>}
export function Gm3dAfterwordTransformLab(){return <GameMathOfficialLab title="第14章 后记：接下来做什么 · 变换" caption="拖动参数，观察数值与几何如何同步变化。" mode="roadmap" snapshots={snapshots} initial={1}/>}
export function Gm3dAfterwordEvidenceLab(){return <GameMathOfficialLab title="第14章 后记：接下来做什么 · 证据" caption="用边界、残差和重放结果完成验收。" mode="roadmap" snapshots={snapshots} initial={2}/>}
