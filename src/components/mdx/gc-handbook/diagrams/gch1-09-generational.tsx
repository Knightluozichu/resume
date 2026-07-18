import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第9章 分代垃圾回收",
  "9.1 示例",
  "9.2 测量时间",
  "9.3 分代假说",
  "9.4 分代与堆布局",
  "9.5 多代",
  "9.6 年龄记录",
  "整体晋升",
  "老化半空间",
  "Survivor空间与灵活性",
  "9.7 适应程序行为",
  "Appel式垃圾回收",
  "反馈控制晋升",
  "9.8 代际指针",
  "记忆集",
  "指针方向",
  "9.9 空间管理",
  "9.10 老对象优先垃圾回收",
  "9.11 Beltway",
  "9.12 分代回收的分析支持",
  "9.13 需要考虑的问题",
  "9.14 抽象分代垃圾回收"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="第9章 分代垃圾回收" focus="从分代假说、年龄记录、晋升控制、代际指针和空间管理推导多代与抽象分代回收" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="第9章 分代垃圾回收" focus="改变对象寿命分布、Survivor容量与晋升阈值，比较全堆、两代、多代及older-first策略" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="第9章 分代垃圾回收" focus="年龄与晋升状态机、记忆集精度表、晋升失败模型、反馈控制实验" nodes={nodes} />; }
