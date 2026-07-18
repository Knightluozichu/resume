import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "第16章 站上众人的肩膀——使用Components&activeX Controls",
  label: "第四篇 · Components与ActiveX",
  color: "#4d7c0f",
  soft: "#f7fee7",
  chain: [
    "选择Gallery组件",
    "审查生成改动",
    "集成ComTest",
    "插入ActiveX控件",
    "绑定属性方法事件",
    "验证注册与卸载",
  ],
  concepts: [
    "第16章 站上众人的肩膀——使用Components&activeX Controls",
    "什么是Component Gallery",
    "使用Components",
    "Splash screen",
    "system Info for About Dlg",
    "Tip of the Day",
    "Components实际运用：ComTest程序",
    "修改ComTest程序内容",
    "使用ActiveX Controls",
    "ActiveX Control基础观念：Properties、Methods、Events",
    "ActiveX Controls的五大使用步骤",
    "使用ActiveX Control：OcxTest程序",
  ],
} as const;

export function Mfc16ComponentsActivexMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function Mfc16ComponentsActivexExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function Mfc16ComponentsActivexEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
