import type { ReviewQuestion } from "./types";

export const flaAndroidBasicsQuestions: ReviewQuestion[] = [
  {
    id: "fla-ab-1",
    chapter: "fla-android-basics",
    level: 1,
    question: `Android系统的四层架构是什么？每层各包含哪些核心组件？`,
    answer:
      `Android四层架构从上到下：①应用层（Applications）——所有用户安装的应用程序，如电话、短信、浏览器，由开发者用Java/Kotlin编写。②应用框架层（Application Framework）——为应用层提供API，核心包括ActivityManager（管理Activity生命周期和任务栈）、WindowManager（管理窗口）、ContentProvider（数据共享）、View System（UI控件体系）、NotificationManager（通知管理）、PackageManager（包管理）、ResourceManager（资源管理）。开发者主要与这层交互。③系统运行层（Libraries + Android Runtime）——C/C++库（SQLite/OpenGL ES/Media Framework/WebKit）和Android运行时（Dalvik虚拟机→ART运行时，核心库+虚拟机执行DEX字节码）。④Linux内核层（Linux Kernel）——硬件驱动（显示/相机/蓝牙/USB驱动）、电源管理、进程管理、内存管理、安全机制。Android基于Linux内核但做了定制（如Binder IPC、wakelocks）。开发者在应用框架层写代码，但理解四层架构有助于定位问题和性能优化。`,
    tags: ["四层架构", "应用框架层", "系统运行层", "Linux内核"],
  },
  {
    id: "fla-ab-2",
    chapter: "fla-android-basics",
    level: 2,
    question: `Android项目的标准目录结构是什么？各目录的职责是什么？`,
    answer:
      `标准项目目录结构（Gradle项目）：app/src/main/是主源集。①java/com/example/app/——Java/Kotlin源码目录，包名结构对应com.example.app，存放Activity/Service/Fragment等类。②res/——资源目录：layout/存放布局XML文件（如activity_main.xml），values/存放字符串（strings.xml）、颜色（colors.xml）、样式（styles.xml）、尺寸（dimens.xml），drawable/存放图片和XML矢量图，mipmap/存放应用图标，menu/存放菜单XML。③AndroidManifest.xml——应用清单文件，注册四大组件（activity/service/receiver/provider）、声明权限（uses-permission）、配置应用元数据（application标签）。④build.gradle（Module级）——构建配置：compileSdkVersion（编译SDK版本）、minSdkVersion（最低支持版本）、targetSdkVersion（目标版本）、dependencies依赖声明。⑤build.gradle（Project级）——项目级构建配置和仓库。⑥gradlew/gradle-wrapper.properties——Gradle Wrapper，锁定Gradle版本确保团队一致性。⑦proguard-rules.pro——代码混淆规则。资源通过R类引用：R.layout.activity_main、R.string.app_name、R.id.xxx，R类由构建工具自动生成。`,
    tags: ["目录结构", "res资源", "AndroidManifest", "Gradle", "R类"],
  },
  {
    id: "fla-ab-3",
    chapter: "fla-android-basics",
    level: 2,
    question: `Android中的日志工具Log有哪几个级别？如何高效使用Logcat调试？`,
    answer:
      `Log工具的五个级别（从低到高）：①Log.v()——Verbose（详细），最详细的日志信息，开发调试用。②Log.d()——Debug（调试），调试信息，最常用。③Log.i()——Info（信息），重要业务信息。④Log.w()——Warning（警告），潜在问题。⑤Log.e()——Error（错误），严重错误。每个方法签名：Log.d(String tag, String msg)，tag通常用类名便于过滤。Logcat调试技巧：①过滤标签——在Logcat搜索栏输入tag:MainActivity只看该标签日志。②级别过滤——选择日志级别下拉框过滤Verbose及以下。③关键字搜索——在搜索栏输入关键文本过滤包含该文本的日志。④进程过滤——选择应用包名只看当前应用日志。⑤保存日志——adb logcat -d > log.txt 导出到文件。最佳实践：①每个类用private static final String TAG = \"ClassName\"统一管理tag。②发布版本用BuildConfig.DEBUG判断是否输出日志（避免Release泄露信息）。③日志包含上下文信息（方法名/参数值/状态），便于定位。④不要在循环中打大量日志（影响性能）。`,
    tags: ["日志工具", "Log级别", "Logcat", "调试技巧"],
  },
  {
    id: "fla-ab-4",
    chapter: "fla-android-basics",
    level: 1,
    question: `AndroidManifest.xml的作用是什么？必须注册哪些内容？`,
    answer:
      `AndroidManifest.xml是应用的清单文件，描述应用的全局配置信息，是Android系统了解应用的唯一入口。作用与必须注册内容：①包名——manifest标签的package属性定义应用包名（如com.example.app），也是R类的包路径。②四大组件注册——所有Activity、Service、BroadcastReceiver、ContentProvider必须在manifest中声明，否则系统无法识别。Activity用<activity>标签，Service用<service>，接收器用<receiver>，提供者用<provider>。③权限声明——<uses-permission>声明应用需要的系统权限（如android.permission.INTERNET网络权限、READ_EXTERNAL_STORAGE存储权限）。④应用配置——<application>标签配置应用级属性：icon（应用图标）、label（应用名称）、theme（全局主题）、name（自定义Application类）。⑤SDK版本——<uses-sdk>的minSdkVersion（最低支持版本）、targetSdkVersion（目标版本，影响行为变更）。⑥Intent过滤器——<intent-filter>声明组件能响应的隐式Intent（如MAIN+LAUNCHER声明为启动入口）。构建时manifest被打包进APK，安装时系统解析注册信息。未在manifest注册的Activity调用startActivity会抛ActivityNotFoundException。`,
    tags: ["AndroidManifest", "四大组件注册", "权限声明", "IntentFilter"],
  },
];
