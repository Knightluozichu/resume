import { OfficialFla3BookLab } from "./official-fla3-book-lab";

const nodes = [
  "第1章 开始启程，你的第一行Android代码",
  "第2章 探究新语言，快速入门Kotlin编程",
  "第3章 先从看得到的入手，探究Activity",
  "第4章 软件也要拼脸蛋，UI开发的点点滴滴",
  "第5章 手机平板要兼顾，探究Fragment",
  "第6章 全局大喇叭，详解广播机制",
  "第7章 数据存储全方案，详解持久化技术",
  "第8章 跨程序共享数据，探究ContentProvider",
  "第9章 丰富你的程序，运用手机多媒体",
  "第10章 后台默默的劳动者，探究Service",
  "第11章 看看精彩的世界，使用网络技术",
  "第12章 最佳的UI体验，Material Design实战",
  "第13章 高级程序开发组件，探究Jetpack",
  "第14章 继续进阶，你还应该掌握的高级技巧",
  "第15章 进入实战，开发一个天气预报App",
  "第16章 编写并发布一个开源库，PermissionX"
];

export function FlaLifecycleLab() { return <OfficialFla3BookLab mode="lifecycle" unitTitle="《第一行代码 Android（第3版）》权威学习地图" focus="沿Android 10与Kotlin基线的16章，建立工具链、语言、组件、数据、媒体、后台、网络、Material、Jetpack和两个完整项目的递进体系" nodes={nodes} />; }
export function FlaStateLab() { return <OfficialFla3BookLab mode="state" unitTitle="《第一行代码 Android（第3版）》权威学习地图" focus="从空工程到天气App和PermissionX制品，逐阶段执行构建、生命周期、权限、网络、存储、测试和发布门禁" nodes={nodes} />; }
export function FlaEvidenceLab() { return <OfficialFla3BookLab mode="evidence" unitTitle="《第一行代码 Android（第3版）》权威学习地图" focus="136节点覆盖矩阵、组件生命周期图、数据与异步状态流、全书项目验收清单" nodes={nodes} />; }
