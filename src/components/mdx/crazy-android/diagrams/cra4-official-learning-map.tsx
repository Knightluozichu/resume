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

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="《疯狂Android讲义（第4版）》权威学习地图" focus="沿Android 9.x与Java基线串联环境、界面、组件、资源、数据、图形、多媒体、网络、桌面、传感器、定位和两个综合项目" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="《疯狂Android讲义（第4版）》权威学习地图" focus="沿Android 9.x与Java基线串联环境、界面、组件、资源、数据、图形、多媒体、网络、桌面、传感器、定位和两个综合项目" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="《疯狂Android讲义（第4版）》权威学习地图" focus="19章525节点覆盖矩阵、Android组件图、五条项目路线、版本迁移账本和全书验收清单" nodes={nodes} />; }
