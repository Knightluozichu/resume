import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第17章 设备与模块",
  label: "设备 · 调试与工程",
  color: "#1d4ed8",
  soft: "#dbeafe",
  chain: [
    "分类设备",
    "构建加载模块",
    "解析依赖参数",
    "建立设备模型",
    "发布sysfs属性",
    "注销排空并卸载",
  ],
  concepts: [
    "第17章 设备与模块",
    "17.1 设备类型",
    "17.2 模块",
    "17.2.1 Hello，World",
    "17.2.2 构建模块",
    "17.2.3 安装模块",
    "17.2.4 产生模块依赖性",
    "17.2.5 载入模块",
    "17.2.6 管理配置选项",
    "17.2.7 模块参数",
    "17.2.8 导出符号表",
    "17.3 设备模型",
    "17.3.1 kobject",
    "17.3.2 ktype",
    "17.3.3 kset",
    "17.3.4 kobject、ktype和kset的相互关系",
    "17.3.5 管理和操作kobject",
    "17.3.6 引用计数",
    "17.4 sysfs",
    "17.4.1 sysfs中添加和删除kobject",
    "17.4.2 向sysfs中添加文件",
    "17.4.3 内核事件层",
    "17.5 小结",
  ],
} as const;

export function Lkd17DevicesModulesMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd17DevicesModulesExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd17DevicesModulesEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
