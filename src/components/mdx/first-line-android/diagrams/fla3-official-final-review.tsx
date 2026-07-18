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

export function FlaLifecycleLab() { return <OfficialFla3BookLab mode="lifecycle" unitTitle="《第一行代码 Android（第3版）》全书总复习" focus="以一个可发布Kotlin Android应用和一个可消费库综合复核16章的生命周期、状态、权限、数据、异步、UI和发布合同" nodes={nodes} />; }
export function FlaStateLab() { return <OfficialFla3BookLab mode="state" unitTitle="《第一行代码 Android（第3版）》全书总复习" focus="在多API级设备上重建、测试并发布天气App与PermissionX，注入旋转、进程死亡、断网、拒权、深色主题和升级" nodes={nodes} />; }
export function FlaEvidenceLab() { return <OfficialFla3BookLab mode="evidence" unitTitle="《第一行代码 Android（第3版）》全书总复习" focus="全书架构评审、设备/API测试矩阵、故障注入报告、签名App与版本化库制品" nodes={nodes} />; }
