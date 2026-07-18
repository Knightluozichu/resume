import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV210GuiProgrammingMapLab() { return <JctContractMapLab title="卷II 第10章 图形用户界面编程 · 合同图" focus="掌握 UI 工具包历史、窗口、组件绘制、事件分派和 Preferences 持久化" stages={stages} />; }
export function Jct14eV210GuiProgrammingExperimentLab() { return <JctCapacityExperimentLab title="卷II 第10章 图形用户界面编程 · 容量实验" focus="EDT 时序、绘制/状态分离图、事件测试与偏好迁移方案" stages={stages} />; }
export function Jct14eV210GuiProgrammingEvidenceLab() { return <JctFailureEvidenceLab title="卷II 第10章 图形用户界面编程 · 失败证据" focus="阻塞事件分派线程，或在绘制回调中修改模型导致不可重复界面状态" stages={stages} />; }
