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

export function Jpc22PipelineLab() { return <OfficialJpc22BookLab mode="pipeline" unitTitle="《Jetpack Compose从入门到实战》权威学习地图" focus="以11章197个节点贯通声明式基础、组件、状态、渲染、动画、手势、导航、生态与两个产品实战" nodes={nodes} />; }
export function Jpc22ExperimentLab() { return <OfficialJpc22BookLab mode="experiment" unitTitle="《Jetpack Compose从入门到实战》权威学习地图" focus="把全书压缩成布局、状态和导航几页，遗漏渲染流程、手势、第三方库以及两个完整项目" nodes={nodes} />; }
export function Jpc22EvidenceLab() { return <OfficialJpc22BookLab mode="evidence" unitTitle="《Jetpack Compose从入门到实战》权威学习地图" focus="11章197节点矩阵、版本卡、状态到渲染因果链、Tetris与Chatty交付路线、现代迁移账本" nodes={nodes} />; }
