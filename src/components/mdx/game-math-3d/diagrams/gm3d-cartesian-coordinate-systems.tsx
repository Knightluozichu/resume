import { GameMathOfficialLab, type GameMathSnapshot } from "./official-lab";
const snapshots:GameMathSnapshot[]=[
  {
    "label": "笛卡尔坐标系",
    "input": "从一维数轴进入二维与三维坐标，固定手性、角度和三角函数约定。",
    "operation": "用原点、互相垂直的轴与单位刻度为点分配坐标。",
    "output": "观察笛卡尔坐标系的数值与图形变化",
    "risk": "把度数直接传给只接受弧度的三角函数，导致小角度运动也剧烈抖动。"
  },
  {
    "label": "坐标手性",
    "input": "笛卡尔坐标系",
    "operation": "右手系与左手系决定正向旋转、叉积和观察方向的符号约定。",
    "output": "观察坐标手性的数值与图形变化",
    "risk": "只翻转一个坐标分量却没有同步处理三角形绕序、法线和叉积。"
  },
  {
    "label": "弧度",
    "input": "坐标手性",
    "operation": "以弧长除以半径度量角度，一整圈等于二乘pi。",
    "output": "观察弧度的数值与图形变化",
    "risk": "把度数直接传给只接受弧度的三角函数，导致小角度运动也剧烈抖动。"
  },
  {
    "label": "三角函数",
    "input": "弧度",
    "operation": "正弦与余弦把角度映射为圆周上的坐标分量。",
    "output": "观察三角函数的数值与图形变化",
    "risk": "只翻转一个坐标分量却没有同步处理三角形绕序、法线和叉积。"
  },
  {
    "label": "求和记号",
    "input": "三角函数",
    "operation": "用Sigma压缩重复加法，并明确索引的起点、终点和项。",
    "output": "导入模型时先记录源工具的向上轴、前向轴与手性，再通过一个已知朝向的测试三角形验收转换；只看模型是否出现在画面里，会漏掉法线和旋转方向反转。",
    "risk": "把度数直接传给只接受弧度的三角函数，导致小角度运动也剧烈抖动。"
  }
];
export function Gm3dCartesianCoordinateSystemsConceptLab(){return <GameMathOfficialLab title="第1章 笛卡尔坐标系 · 概念" caption="切换原书核心单元，先固定对象、空间与约定。" mode="coordinate" snapshots={snapshots}/>}
export function Gm3dCartesianCoordinateSystemsTransformLab(){return <GameMathOfficialLab title="第1章 笛卡尔坐标系 · 变换" caption="拖动参数，观察数值与几何如何同步变化。" mode="coordinate" snapshots={snapshots} initial={1}/>}
export function Gm3dCartesianCoordinateSystemsEvidenceLab(){return <GameMathOfficialLab title="第1章 笛卡尔坐标系 · 证据" caption="用边界、残差和重放结果完成验收。" mode="coordinate" snapshots={snapshots} initial={2}/>}
