import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第4章 复制式垃圾回收",
  "4.1 半空间复制回收",
  "工作表实现",
  "示例",
  "4.2 遍历顺序与局部性",
  "4.3 需要考虑的问题",
  "分配",
  "空间与局部性",
  "移动对象"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="第4章 复制式垃圾回收" focus="掌握半空间复制、转发指针、Cheney工作表以及遍历顺序对空间、局部性和对象布局的影响" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="第4章 复制式垃圾回收" focus="对同一根集采用广度、深度和分层顺序复制，比较复制量、峰值空间、缓存局部性与对象邻接" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="第4章 复制式垃圾回收" focus="From/To空间迁移图、Cheney扫描指针轨迹、转发合同、遍历顺序局部性报告" nodes={nodes} />; }
