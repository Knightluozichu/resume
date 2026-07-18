import { OfficialApo12BookLab } from "./official-apo12-book-lab";

const nodes = [
  "第8章 图形",
  "8.1 布局优化",
  "8.1.1 相对布局",
  "8.1.2 合并布局",
  "8.1.3 重用布局",
  "8.1.4 ViewStub",
  "8.2 布局工具",
  "8.2.1 层级视图",
  "8.2.2 layoutopt",
  "8.3 OpenGL ES",
  "8.3.1 扩展",
  "8.3.2 纹理压缩",
  "8.3.3 Mipmap",
  "8.3.4 多APK",
  "8.3.5 着色",
  "8.3.6 场景复杂性",
  "8.3.7 消隐",
  "8.3.8 渲染模式",
  "8.3.9 功耗管理",
  "8.4 总结"
];

export function Apo12PipelineLab() { return <OfficialApo12BookLab mode="pipeline" unitTitle="第8章 图形" focus="从布局优化与层级工具进入OpenGL ES扩展、纹理压缩、Mipmap、多APK、着色、场景复杂度、消隐与功耗" nodes={nodes} />; }
export function Apo12ExperimentLab() { return <OfficialApo12BookLab mode="experiment" unitTitle="第8章 图形" focus="只追求更少View或更高纹理质量，忽略设备扩展、显存、填充率、场景复杂度与图形功耗的联合约束" nodes={nodes} />; }
export function Apo12EvidenceLab() { return <OfficialApo12BookLab mode="evidence" unitTitle="第8章 图形" focus="布局层级、测绘制时间、纹理格式与显存、设备扩展、多APK选择、GPU帧与功耗对照" nodes={nodes} />; }
