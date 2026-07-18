import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "第15章 定制一个AppWizard",
  label: "第四篇 · Custom AppWizard",
  color: "#0369a1",
  soft: "#f0f9ff",
  chain: [
    "定义向导需求",
    "设计输入对话框",
    "写入Macros",
    "执行Directives",
    "展开text template",
    "编译验收产物",
  ],
  concepts: [
    "第15章 定制一个AppWizard",
    "到底Wizard是什么？",
    "Custom AppWizard的基本操作",
    "剖析AppWizard Components",
    "Dialog Templates和Dialog classes",
    "Macros",
    "Directives",
    "动手修改Top Studio AppWizard",
    "利用资源编辑器修改IDD_CUSTOM1对话框画面",
    "利用ClassWizard修改IDD_CUSTOM1对话框的对应类CCustomlDlg",
    "改写OnDismiss虚拟函数，在其中定义macros",
    "修改text template",
    "Top Studio AppWizard执行结果",
    "更多的信息",
  ],
} as const;

export function Mfc15CustomAppwizardMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function Mfc15CustomAppwizardExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function Mfc15CustomAppwizardEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
