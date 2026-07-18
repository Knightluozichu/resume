import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV211SwingComponentsMapLab() { return <JctContractMapLab title="卷II 第11章 Swing 用户界面组件 · 合同图" focus="用 MVC、布局、输入、选择、菜单、GridBag、自定义布局和对话框组织可适配界面" stages={stages} />; }
export function Jct14eV211SwingComponentsExperimentLab() { return <JctCapacityExperimentLab title="卷II 第11章 Swing 用户界面组件 · 容量实验" focus="组件模型图、布局约束表、键盘/缩放/对话框测试" stages={stages} />; }
export function Jct14eV211SwingComponentsEvidenceLab() { return <JctFailureEvidenceLab title="卷II 第11章 Swing 用户界面组件 · 失败证据" focus="使用绝对坐标假装布局完成，或把视图组件当作业务模型唯一状态源" stages={stages} />; }
