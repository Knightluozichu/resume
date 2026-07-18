import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第15章 APK应用程序的资源适配",
  "15.1 资源类型",
  "15.1.1 状态颜色资源",
  "15.1.2 图形资源",
  "15.1.3 布局资源",
  "15.1.4 菜单资源",
  "15.1.5 字符串资源",
  "15.1.6 样式资源",
  "15.1.7 其他资源",
  "15.1.8 属性资源",
  "15.2 提供可选资源",
  "15.3 最佳资源的匹配流程",
  "15.4 屏幕适配",
  "15.4.1 屏幕适配的重要参数",
  "15.4.2 如何适配多屏幕"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第15章 APK应用程序的资源适配" focus="覆盖资源类型、可选资源、最佳匹配与多屏适配" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第15章 APK应用程序的资源适配" focus="认为系统总会选名称最具体的目录，忽略限定符优先级、密度换算和运行配置" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第15章 APK应用程序的资源适配" focus="资源目录限定符、aapt产物、配置对象、候选消除顺序、密度缩放与屏幕样本矩阵" nodes={nodes}/>;}
