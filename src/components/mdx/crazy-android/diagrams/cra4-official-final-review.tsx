import { OfficialCra4BookLab } from "./official-cra4-book-lab";

const nodes = [
  "第1章 Android应用和开发环境",
  "第2章 Android应用的界面编程",
  "第3章 Android事件机制",
  "第4章 深入理解Activity与Fragment",
  "第5章 使用Intent和IntentFilter通信",
  "第6章 Android应用资源",
  "第7章 图形与图像处理",
  "第8章 Android数据存储与IO",
  "第9章 使用ContentProvider实现数据共享",
  "第10章 Service和BroadcastReceiver",
  "第11章 多媒体应用开发",
  "第12章 OpenGL与3D开发",
  "第13章 Android网络应用",
  "第14章 管理Android系统桌面",
  "第15章 传感器应用开发",
  "第16章 GPS应用开发",
  "第17章 整合高德Map服务",
  "第18章 合金弹头",
  "第19章 电子拍卖系统"
];

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="《疯狂Android讲义（第4版）》全书总复习" focus="随机抽取目录节点，从用户症状反向定位组件、生命周期、线程、状态、权限、外部协议与Android 9版本边界" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="《疯狂Android讲义（第4版）》全书总复习" focus="随机抽取目录节点，从用户症状反向定位组件、生命周期、线程、状态、权限、外部协议与Android 9版本边界" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="《疯狂Android讲义（第4版）》全书总复习" focus="目录节点答辩、故障时间线、可重放构建、测试报告、现代targetSdk迁移和回滚记录" nodes={nodes} />; }
