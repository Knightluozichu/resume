import { OfficialCra4BookLab } from "./official-cra4-book-lab";

const nodes = [
  "第1章 Android应用和开发环境",
  "1.1 Android的发展和历史",
  "1.1.1 Android的发展和简介",
  "1.1.2 Android 9.x平台架构及特性",
  "1.2 使用Gradle自动化构建项目",
  "1.2.1 下载和安装Gradle",
  "1.2.2 Gradle构建文件和创建任务",
  "1.2.3 Gradle的属性定义",
  "1.2.4 增量式构建",
  "1.2.5 Gradle插件和java、application等插件",
  "1.2.6 依赖管理",
  "1.2.7 自定义任务",
  "1.2.8 自定义插件",
  "1.3 搭建Android开发环境",
  "1.3.1 安装Android Studio",
  "1.3.2 下载和安装Android SDK",
  "1.3.3 在安装过程中常见的错误",
  "1.3.4 安装运行、调试环境",
  "1.4 Android常用开发工具的用法",
  "1.4.1 使用Monitor进行调试",
  "1.4.2 Android Debug Bridge（ADB）的用法",
  "1.4.3 使用mksdcard管理虚拟SD卡",
  "1.5 开始第一个Android应用",
  "1.5.1 使用Android Studio开发第一个Android应用",
  "1.5.2 通过Andorid Studio运行Android应用",
  "1.6 Android应用结构分析",
  "1.6.1 Android项目结构分析",
  "1.6.2 自动生成的R.java",
  "1.6.3 res目录说明",
  "1.6.4 Android应用的清单文件：AndroidManifest.xml",
  "1.6.5 应用程序权限说明",
  "1.7 Android应用的基本组件介绍",
  "1.7.1 Activity和View",
  "1.7.2 Service",
  "1.7.3 BroadcastReceiver",
  "1.7.4 ContentProvider",
  "1.7.5 Intent和IntentFilter",
  "1.8 使用Android 9来签名APK",
  "1.8.1 使用Android Studio对Android应用签名",
  "1.8.2 使用Android 9的命令对APK签名",
  "1.9 本章小结"
];

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="第1章 Android应用和开发环境" focus="锁定Android 9.x、Java、Gradle与Android Studio环境，从工程结构、组件、权限和签名建立第一个可安装应用" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="第1章 Android应用和开发环境" focus="锁定Android 9.x、Java、Gradle与Android Studio环境，从工程结构、组件、权限和签名建立第一个可安装应用" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="第1章 Android应用和开发环境" focus="环境指纹、Gradle任务图、组件清单、签名APK和安装日志" nodes={nodes} />; }
