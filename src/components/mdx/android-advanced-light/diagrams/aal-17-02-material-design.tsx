import { OfficialAal17BookLab } from "./official-aal17-book-lab";

const nodes = [
  "第2章 Material Design",
  "2.1 Material Design概述",
  "2.1.1 核心思想",
  "2.1.2 材质与空间",
  "2.1.3 动画",
  "2.1.4 样式",
  "2.1.5 图标",
  "2.1.6 图像",
  "2.1.7 组件",
  "2.2 Design Support Library常用控件详解",
  "2.2.1 Snackbar的使用",
  "2.2.2 用TextInputLayout实现登录界面",
  "2.2.3 FloatingActionButton的使用",
  "2.2.4 用TabLayout实现类似网易选项卡的动态滑动效果",
  "2.2.5 用NavigationView实现抽屉菜单界面",
  "2.2.6 用CoordinatorLayout实现Toolbar隐藏和折叠",
  "2.3 本章小结"
];

export function Aal17PipelineLab() { return <OfficialAal17BookLab mode="pipeline" unitTitle="第2章 Material Design" focus="把材质、空间、动画、样式、图标、图像与组件原则落实到Snackbar、TextInputLayout、FAB、TabLayout、NavigationView和CoordinatorLayout" nodes={nodes} />; }
export function Aal17ExperimentLab() { return <OfficialAal17BookLab mode="experiment" unitTitle="第2章 Material Design" focus="把Material Design降为颜色和阴影皮肤，忽略信息层级、运动因果、输入反馈与可访问性" nodes={nodes} />; }
export function Aal17EvidenceLab() { return <OfficialAal17BookLab mode="evidence" unitTitle="第2章 Material Design" focus="层级与间距标注、动效状态、错误输入、无障碍语义、滚动协作与折叠边界截图" nodes={nodes} />; }
