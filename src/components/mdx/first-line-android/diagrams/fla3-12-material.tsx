import { OfficialFla3BookLab } from "./official-fla3-book-lab";

const nodes = [
  "第12章 最佳的UI体验，Material Design实战",
  "12.1 什么是Material Design",
  "12.2 Toolbar",
  "12.3 滑动菜单",
  "12.4 悬浮按钮和可交互提示",
  "12.5 卡片式布局",
  "12.6 下拉刷新",
  "12.7 可折叠式标题栏",
  "12.8 Kotlin课堂：编写好用的工具方法",
  "12.9 Git时间：版本控制工具的高级用法",
  "12.10 小结与点评"
];

export function FlaLifecycleLab() { return <OfficialFla3BookLab mode="lifecycle" unitTitle="第12章 最佳的UI体验，Material Design实战" focus="把Toolbar、Drawer、FAB、Snackbar、Card、刷新与折叠标题栏组织为一致、可访问和可恢复的Material交互" nodes={nodes} />; }
export function FlaStateLab() { return <OfficialFla3BookLab mode="state" unitTitle="第12章 最佳的UI体验，Material Design实战" focus="实现含抽屉、列表、FAB、刷新与折叠栏的页面，在深浅主题、字体放大、旋转和错误状态下视觉回归" nodes={nodes} />; }
export function FlaEvidenceLab() { return <OfficialFla3BookLab mode="evidence" unitTitle="第12章 最佳的UI体验，Material Design实战" focus="组件层级与Coordinator行为图、多尺寸主题截图、交互反馈与无障碍检查、Git发布记录" nodes={nodes} />; }
