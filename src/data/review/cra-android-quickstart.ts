import type { ReviewQuestion } from "./types";

export const craAndroidQuickstartQuestions: ReviewQuestion[] = [
  {
    id: "cra-aq-1",
    chapter: "cra-android-quickstart",
    level: 1,
    question: `Android项目结构中各核心目录和文件的作用是什么？`,
    answer:
      `Android项目核心结构：①src/main/java/——Java源码目录，按包名组织，存放Activity、Service等组件类。②src/main/res/——资源目录：layout/存放XML布局文件（如activity_main.xml）；values/存放字符串（strings.xml）、颜色（colors.xml）、尺寸（dimens.xml）、样式（styles.xml）；drawable/存放图片和XML矢量图；mipmap/存放应用图标。③src/main/AndroidManifest.xml——清单文件，声明应用的包名、组件（Activity/Service/Receiver/Provider）、权限、最低SDK版本等，是应用的全局配置中心。④assets/——原始资源目录，文件原样打包，通过AssetManager访问。⑤build.gradle——Gradle构建配置，声明依赖库、编译版本、签名等。⑥settings.gradle——声明包含的模块。每个组件都必须在AndroidManifest中注册，否则运行时找不到。`,
    tags: ["项目结构", "AndroidManifest", "res资源", "Gradle"],
  },
  {
    id: "cra-aq-2",
    chapter: "cra-android-quickstart",
    level: 2,
    question: `AndroidManifest.xml清单文件的核心作用和必须声明的内容有哪些？`,
    answer:
      `AndroidManifest.xml是应用的全局配置文件，核心作用：①声明包名——应用的唯一标识，作为R类和组件的命名空间。②注册四大组件——每个Activity/Service/BroadcastReceiver/ContentProvider都必须在此声明，未注册的组件无法启动（ActivityNotFoundException）。Activity用\`<activity>\`标签，Service用\`<service>\`，Receiver用\`<receiver>\`，Provider用\`<provider>\`。③声明权限——\`<uses-permission>\`声明应用需要的权限（INTERNET/READ_CONTACTS/CAMERA等），安装时提示用户。④声明最低SDK版本——\`<uses-sdk android:minSdkVersion>\`指定最低兼容版本。⑤声明应用图标和主题——\`<application>\`标签的icon、label、theme属性。⑥声明Intent Filter——组件的\`<intent-filter>\`定义其能响应的隐式Intent（如MAIN+LAUNCHER标记启动Activity）。清单文件在打包时编译进APK，系统安装和运行时都依赖它。`,
    tags: ["AndroidManifest", "四大组件注册", "权限声明", "Intent Filter"],
  },
  {
    id: "cra-aq-3",
    chapter: "cra-android-quickstart",
    level: 2,
    question: `Android的LogCat日志系统有哪几个级别？各自的使用场景是什么？`,
    answer:
      `LogCat日志系统提供5个级别（从低到高）：①Log.v(tag, msg)——VERBOSE详细，最详细的日志信息，开发期排查用，发布版通常过滤。②Log.d(tag, msg)——DEBUG调试，调试信息，开发期最常用，记录程序运行状态。③Log.i(tag, msg)——INFO信息，重要状态变化（如用户登录成功、网络连接建立），一般保留到发布版。④Log.w(tag, msg)——WARN警告，有潜在问题但不影响运行（如网络重试、缓存失效），需关注但不致命。⑤Log.e(tag, msg)——ERROR错误，严重错误（如异常捕获、API请求失败），通常伴随功能不可用。tag参数用于过滤标识，通常用类名。LogCat通过ADB或Android Studio的LogCat面板实时查看。DDMS（Dalvik Debug Monitor Service）提供线程/堆/文件浏览等更丰富的调试视图。`,
    tags: ["LogCat", "日志级别", "调试", "DDMS"],
  },
  {
    id: "cra-aq-4",
    chapter: "cra-android-quickstart",
    level: 3,
    question: `从零创建一个Android应用，从建项目到运行需要经过哪些步骤？每步的关键点是什么？`,
    answer:
      `①创建项目——Android Studio向导选择Empty Activity模板，填写应用名/包名/最低SDK。Gradle自动生成项目结构和build.gradle配置。关键点：包名是应用唯一标识，不可随意改；minSdkVersion决定兼容范围。②编写界面——在res/layout/下创建XML布局文件，用布局管理器（如LinearLayout）组织控件（TextView/Button等）。关键点：每个控件需设layout_width/layout_height；用@string引用values/strings.xml中的字符串，实现国际化。③编写逻辑——创建Activity类继承AppCompatActivity，在onCreate中setContentView载入布局，通过findViewById获取控件引用，设置事件监听。关键点：控件ID在R类自动生成。④注册组件——在AndroidManifest的\`<activity>\`标签中声明Activity，启动Activity需设MAIN+LAUNCHER的intent-filter。关键点：未注册的Activity无法启动。⑤运行——选择模拟器（AVD）或真机（开启USB调试），Gradle编译打包APK安装运行。关键点：真机调试更快，模拟器适合测试不同屏幕尺寸。`,
    tags: ["开发流程", "创建项目", "运行", "实战"],
  },
];
