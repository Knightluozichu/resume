import { GameMathOfficialLab, type GameMathSnapshot } from "./official-lab";
const snapshots:GameMathSnapshot[]=[
  {
    "label": "最近点",
    "input": "把最近点与相交测试整理成带边界约定、退化处理和可复算证据的工具箱。",
    "operation": "通过投影或逐轴钳制找到图元上距离查询点最近的位置。",
    "output": "观察最近点的数值与图形变化",
    "risk": "先单位化零长度方向，再让NaN通过所有比较分支。"
  },
  {
    "label": "相交参数",
    "input": "最近点",
    "operation": "将两个图元方程联立，求满足各自参数范围的解。",
    "output": "观察相交参数的数值与图形变化",
    "risk": "不同查询对边界是否算命中采用不同规则，造成宽阶段与窄阶段不一致。"
  },
  {
    "label": "分离判据",
    "input": "相交参数",
    "operation": "找到能把两个图元分开的轴或平面即可证明不相交。",
    "output": "观察分离判据的数值与图形变化",
    "risk": "先单位化零长度方向，再让NaN通过所有比较分支。"
  },
  {
    "label": "退化输入",
    "input": "分离判据",
    "operation": "零方向、零面积、平行、共面和切触需要明确结果语义。",
    "output": "观察退化输入的数值与图形变化",
    "risk": "不同查询对边界是否算命中采用不同规则，造成宽阶段与窄阶段不一致。"
  },
  {
    "label": "容差策略",
    "input": "退化输入",
    "operation": "容差应与尺度和计算误差相关，不能用一个全局魔法常数。",
    "output": "为每个几何查询固定返回结构：是否命中、参数、最近点、法线和退化状态；测试明确区分穿过、切触、平行、共面、端点和零尺寸输入。",
    "risk": "先单位化零长度方向，再让NaN通过所有比较分支。"
  }
];
export function Gm3dGeometricTestsConceptLab(){return <GameMathOfficialLab title="附录A 几何测试 · 概念" caption="切换原书核心单元，先固定对象、空间与约定。" mode="tests" snapshots={snapshots}/>}
export function Gm3dGeometricTestsTransformLab(){return <GameMathOfficialLab title="附录A 几何测试 · 变换" caption="拖动参数，观察数值与几何如何同步变化。" mode="tests" snapshots={snapshots} initial={1}/>}
export function Gm3dGeometricTestsEvidenceLab(){return <GameMathOfficialLab title="附录A 几何测试 · 证据" caption="用边界、残差和重放结果完成验收。" mode="tests" snapshots={snapshots} initial={2}/>}
