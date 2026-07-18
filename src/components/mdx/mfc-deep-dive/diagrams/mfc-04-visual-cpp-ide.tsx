import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "第4章 Visual C++集成开发环境",
  label: "第二篇 · IDE与资源",
  color: "#a16207",
  soft: "#fefce8",
  chain: [
    "建立Project",
    "配置工具选项",
    "生成骨干代码",
    "编辑资源",
    "编译链接",
    "断点检查产物",
  ],
  concepts: [
    "第4章 Visual C++集成开发环境",
    "安装与组成",
    "四个重要的工具",
    "内务府总管：Visual C++集成开发环境",
    "关于project",
    "关于工具设定",
    "Source Browser",
    "Online Help",
    "调试工具",
    "VC++调试器",
    "Exception Handling",
    "程序代码产生器：AppWizard",
    "东圈西点完成MFC程序骨干",
    "威力强大的资源编辑器",
    "Icon编辑器",
    "Cursor编辑器",
    "Bitmap编辑器",
    "工具栏（Toolbar）编辑器",
    "VERSIONINFO资源编辑器",
    "字符串表格（Accelerator）编辑器",
    "菜单（Menu）编辑器",
    "加速键（Accelerator）编辑器",
    "对话框（Dialog）编辑器",
    "Console程序的项目管理",
  ],
} as const;

export function Mfc04VisualCppIdeMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function Mfc04VisualCppIdeExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function Mfc04VisualCppIdeEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
