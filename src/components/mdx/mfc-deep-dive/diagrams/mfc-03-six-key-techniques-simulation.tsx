import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "第3章 MFC六大关键技术之仿真",
  label: "第一篇 · 六大技术仿真",
  color: "#0f766e",
  soft: "#f0fdfa",
  chain: [
    "登记运行时类",
    "沿基类链识别",
    "调用创建函数",
    "读写对象状态",
    "查找消息表",
    "沿目标链传命令",
  ],
  concepts: [
    "第3章 MFC六大关键技术之仿真",
    "MFC类层次结构",
    "Frame 1范例程序",
    "MFC程序的初始化过程",
    "Frame 2范例程序",
    "RTTI（执行期类型识别）",
    "类别型录网与CRuntimeClass",
    "DECLARE_DYNAMIC/IMPLEMENT_DYNAMIC宏",
    "Frame 3范例程序",
    "IsKindOf（类型识别）",
    "Frame 4范例程序",
    "Dynamic Creation（动态生成）",
    "DECLARE_DYNCREATE/IMPLEMENT_DYNCREATE宏",
    "Frame 6范例程序",
    "Persistence（永久保存）机制",
    "Serialize（数据读写）",
    "DECLARE_SERIAL/IMPLEMENT_SERIAL宏",
    "没有范例程序",
    "Message Mapping（消息映射）",
    "Frame 7范例程序",
    "Command Routing（命令传递）",
    "Frame 8范例程序",
    "本章回顾",
  ],
} as const;

export function Mfc03SixKeyTechniquesSimulationMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function Mfc03SixKeyTechniquesSimulationExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function Mfc03SixKeyTechniquesSimulationEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
