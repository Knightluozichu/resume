import { OfficialCra4BookLab } from "./official-cra4-book-lab";

const nodes = [
  "第14章 管理Android系统桌面",
  "14.1 改变壁纸",
  "14.1.1 开发动态壁纸（Live Wallpapers）",
  "14.1.2 实例：蜿蜒壁纸",
  "14.2 快捷方式",
  "14.2.1 静态快捷方式",
  "14.2.2 动态快捷方式",
  "14.2.3 桌面快捷方式（Pinned Shortcut）",
  "实例：让程序占领桌面",
  "14.3 管理桌面控件",
  "14.3.1 开发桌面控件",
  "实例：液晶时钟",
  "14.3.2 显示带数据集的桌面控件",
  "14.4 本章小结"
];

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="第14章 管理Android系统桌面" focus="通过动态壁纸、静态/动态/固定快捷方式和App Widget管理桌面入口与远程视图" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="第14章 管理Android系统桌面" focus="通过动态壁纸、静态/动态/固定快捷方式和App Widget管理桌面入口与远程视图" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="第14章 管理Android系统桌面" focus="桌面入口清单、快捷方式生命周期、Widget更新轨迹和重启恢复测试" nodes={nodes} />; }
