import { GameMathOfficialLab, type GameMathSnapshot } from "./official-lab";
const snapshots:GameMathSnapshot[]=[
  {
    "label": "权威目录",
    "input": "按第二版14章与几何测试附录建立从坐标到曲线、从公式到引擎证据的学习路线。",
    "operation": "第二版由14章、附录A几何测试和附录B练习答案组成。",
    "output": "观察权威目录的数值与图形变化",
    "risk": "按主题跳读却没有固定全书的手性、向量侧和矩阵组合约定。"
  },
  {
    "label": "空间主线",
    "input": "权威目录",
    "operation": "点和向量通过基、矩阵与层级在物体、世界、相机和裁剪空间流动。",
    "output": "观察空间主线的数值与图形变化",
    "risk": "把附录A当公式清单，未测试平行、切触、共面和退化输入。"
  },
  {
    "label": "方位主线",
    "input": "空间主线",
    "operation": "欧拉角、矩阵、轴角和四元数服务于不同编辑、计算和插值任务。",
    "output": "观察方位主线的数值与图形变化",
    "risk": "按主题跳读却没有固定全书的手性、向量侧和矩阵组合约定。"
  },
  {
    "label": "模拟主线",
    "input": "方位主线",
    "operation": "导数、积分、动量与冲量把轨迹和碰撞变成可验收状态更新。",
    "output": "观察模拟主线的数值与图形变化",
    "risk": "把附录A当公式清单，未测试平行、切触、共面和退化输入。"
  },
  {
    "label": "证据闭环",
    "input": "模拟主线",
    "operation": "每章同时交付推导、代码、交互图、反例和可重放测试。",
    "output": "学习时维护一个共享3D沙盒，每完成一章就增加一个可视层和一个断言：从坐标轴、向量与矩阵开始，逐步加入相机、图元、光照、刚体和曲线。",
    "risk": "按主题跳读却没有固定全书的手性、向量侧和矩阵组合约定。"
  }
];
export function Gm3dOfficialLearningMapConceptLab(){return <GameMathOfficialLab title="《3D数学基础》全书导览 · 概念" caption="切换原书核心单元，先固定对象、空间与约定。" mode="roadmap" snapshots={snapshots}/>}
export function Gm3dOfficialLearningMapTransformLab(){return <GameMathOfficialLab title="《3D数学基础》全书导览 · 变换" caption="拖动参数，观察数值与几何如何同步变化。" mode="roadmap" snapshots={snapshots} initial={1}/>}
export function Gm3dOfficialLearningMapEvidenceLab(){return <GameMathOfficialLab title="《3D数学基础》全书导览 · 证据" caption="用边界、残差和重放结果完成验收。" mode="roadmap" snapshots={snapshots} initial={2}/>}
