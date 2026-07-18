import { OfficialJpc22BookLab } from "./official-jpc22-book-lab";

const nodes = [
  "第1章 全新的Android UI框架",
  "第2章 了解常用UI组件",
  "第3章 定制UI视图",
  "第4章 状态管理与重组",
  "第5章 Compose组件渲染流程",
  "第6章 让页面动起来：动画",
  "第7章 增进交互体验：手势处理",
  "第8章 为Compose添加页面导航",
  "第9章 Accompanist与第三方组件库",
  "第10章 项目实战：小游戏Tetris",
  "第11章 项目实战：聊天应用Chatty"
];

export function Jpc22PipelineLab() { return <OfficialJpc22BookLab mode="pipeline" unitTitle="《Jetpack Compose从入门到实战》全书总复习" focus="用状态、组合、布局、绘制、输入、导航和项目数据流复盘全部章节，并以失败测试完成独立交接" nodes={nodes} />; }
export function Jpc22ExperimentLab() { return <OfficialJpc22BookLab mode="experiment" unitTitle="《Jetpack Compose从入门到实战》全书总复习" focus="只背API名称而无法从状态变化推导组合、布局、绘制、输入和产品数据流的证据" nodes={nodes} />; }
export function Jpc22EvidenceLab() { return <OfficialJpc22BookLab mode="evidence" unitTitle="《Jetpack Compose从入门到实战》全书总复习" focus="全书节点表、重组与渲染实验、手势轨迹、导航返回栈、依赖矩阵、游戏重放和聊天离线验收" nodes={nodes} />; }
