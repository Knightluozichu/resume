import type { ReviewQuestion } from "./types";

export const craLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "cra-lm-1",
    chapter: "cra-learning-map",
    level: 1,
    question: `《疯狂Android讲义》全书的知识体系结构和递进逻辑是什么？`,
    answer:
      `全书分为十个章节（含学习地图和全书复习），覆盖Android开发的三大知识维度：①UI与交互——六大布局管理器（LinearLayout/RelativeLayout/TableLayout/FrameLayout/GridLayout/AbsoluteLayout）、常用UI组件（TextView/EditText/Button/ImageView等）、AdapterView列表（ListView/GridView/Spinner + Adapter）、事件处理（基于监听/基于回调/触摸/按键/手势）、高级UI（对话框/菜单/通知/ActionBar/滚动视图）；②四大组件与后台——Activity（生命周期/Intent跳转传参）、Service（startService启动式/bindService绑定式/前台Service）、BroadcastReceiver（标准/有序广播/动态静态注册）、ContentProvider（跨应用数据共享）；③数据与网络——数据持久化（SharedPreferences/文件IO/SQLite/ContentProvider）、多媒体与图形（MediaPlayer/SoundPool/Canvas绘图/动画/传感器）、网络通信（WebView/HttpURLConnection/Socket/XML与JSON解析）。递进逻辑：从入门（系统架构/项目结构）到UI（布局/控件/事件）到高级UI（对话框/菜单/通知）到数据持久化到四大组件（Service/Broadcast）到多媒体到网络，每个主题建立在前一个之上，最终汇聚为完整的Android应用开发能力。`,
    tags: ["学习地图", "知识体系", "四大组件", "递进逻辑"],
  },
  {
    id: "cra-lm-2",
    chapter: "cra-learning-map",
    level: 2,
    question: `《疯狂Android讲义》与《第一行代码Android》在技术栈和侧重点上有什么区别？`,
    answer:
      `《疯狂Android讲义》以Java为开发语言，侧重传统Android API的系统性讲解，覆盖从UI布局、事件处理、四大组件到多媒体、网络通信的完整API体系，示例丰富、偏API手册式覆盖广度。《第一行代码Android》同样以Android应用开发为主线，但更偏向Kotlin+Jetpack现代化技术栈（ViewModel/LiveData/Room/Navigation/Material Design），注重MVVM架构和现代开发实践。核心区别：疯狂Android讲义强调「Java + 传统API全栈覆盖」（手写SQLite、HttpURLConnection、Adapter列表等底层实现），第一行代码强调「Kotlin + Jetpack现代化」（Room ORM、Retrofit网络、MVVM架构）。两者互补：前者打API地基，后者做架构升级。`,
    tags: ["技术对比", "Java", "Kotlin", "Jetpack", "侧重点"],
  },
  {
    id: "cra-lm-3",
    chapter: "cra-learning-map",
    level: 2,
    question: `用一次完整的Android应用开发流程，串联《疯狂Android讲义》全书的知识体系。`,
    answer:
      `主线：从零开发一个功能完整的Android应用。①入门——创建项目，理解Android四层架构（应用/框架/库与运行时/内核）和项目结构（src/main/java源码、res资源、AndroidManifest清单、build.gradle构建），用LogCat调试。②UI——用六大布局设计界面（LinearLayout线性排列、RelativeLayout相对定位），添加常用控件（TextView/Button/EditText/ImageView），用ListView+Adapter展示列表数据。③事件处理——基于监听（setOnClickListener）处理点击，基于回调（onTouchEvent/onKeyDown）处理触摸和按键，GestureDetector检测手势，Handler实现子线程到主线程通信。④高级UI——AlertDialog弹出确认框，OptionsMenu/ContextMenu提供菜单，Notification发送通知，ActionBar提供操作栏。⑤数据持久化——SharedPreferences保存用户设置，SQLite存储结构化数据，ContentProvider跨应用共享。⑥Service与Broadcast——startService后台播放音乐，BroadcastReceiver监听系统广播（网络变化/开机），电话短信API。⑦多媒体——MediaPlayer播放音视频，Canvas 2D绘图，属性动画，传感器。⑧网络——WebView内嵌网页，HttpURLConnection子线程请求API，Socket通信，JSON/Gson解析响应。依赖关系：UI是界面基础，事件处理是交互核心，高级UI是体验增强，数据持久化是状态保持，四大组件是后台与通信，多媒体和网络是高级能力。`,
    tags: ["应用开发", "知识串联", "完整流程", "全栈"],
  },
  {
    id: "cra-lm-4",
    chapter: "cra-learning-map",
    level: 1,
    question: `Android系统四层架构各层的职责是什么？应用开发者主要在哪一层工作？`,
    answer:
      `Android四层架构：①Applications（应用层）——用户和系统应用（电话/短信/浏览器等），用Java/Kotlin编写，调用框架层API。应用开发者绝大部分工作在这一层。②Application Framework（框架层）——提供核心API，包括ActivityManager（管理Activity生命周期和任务栈）、WindowManager（窗口管理）、ContentProvider（数据共享接口）、View System（UI系统）、NotificationManager（通知）、PackageManager（包管理）等。开发者直接调用这些API。③Libraries + Android Runtime——C/C++库（SQLite/OpenGL ES/WebKit/Media Framework）和Android Runtime（Dalvik/ART虚拟机+核心Java库）。开发者通过框架层间接使用。④Linux Kernel（内核层）——驱动（Display/Camera/Bluetooth/Binder IPC）、进程管理、电源管理、安全机制。开发者通常不直接操作内核。应用开发者主要在应用层和框架层工作，但理解下层架构才能解释性能问题、ANR、后台限制等深层现象的根因。`,
    tags: ["系统架构", "四层架构", "框架层", "应用层"],
  },
];
