import type { ReviewQuestion } from "./types";

export const aalPackagemanagerQuestions: ReviewQuestion[] = [
  {
    id: "aal-pm-1",
    chapter: "aal-packagemanager",
    level: 1,
    question: "PackageManager和PMS的关系是什么？常用的PackageManager API有哪些？",
    answer: "PackageManager与PMS的关系：PMS（Package Manager Service）运行在system_server进程，是包管理的服务端；PackageManager是客户端接口（通过Context.getPackageManager()获取），内部通过Binder与PMS通信。常用API：①getPackageInfo(name, flags)——获取PackageInfo，包含版本号、组件列表等；②getApplicationInfo(name, flags)——获取ApplicationInfo，包含应用元数据；③getInstalledPackages(flags)——获取所有已安装包的PackageInfo列表；④queryIntentActivities(intent, flags)——查询匹配Intent的所有Activity（用于隐式Intent）；⑤resolveActivity(intent, flags)——解析最佳匹配的Activity；⑥getInstalledApplications(flags)——获取所有ApplicationInfo；⑦getPackageInfo(name, GET_PERMISSIONS)——获取应用声明的权限列表；⑧hasSystemFeature(name)——检查设备是否支持某硬件/软件特性。flags参数控制返回信息的详细程度，如GET_ACTIVITIES、GET_SERVICES、GET_RECEIVERS、GET_PROVIDERS等。",
    tags: ["PackageManager", "PMS", "API", "客户端接口"]
  },
  {
    id: "aal-pm-2",
    chapter: "aal-packagemanager",
    level: 2,
    question: "APK文件的内部结构是怎样的？AndroidManifest.xml在其中起什么作用？",
    answer: "APK（Android Package）本质上是一个ZIP压缩文件，内部结构：①AndroidManifest.xml——应用清单文件（编译为二进制XML格式），声明包名、组件、权限、SDK版本等核心信息，是PMS解析APK的入口；②classes.dex——应用代码的DEX字节码（可能有多个dex文件：classes2.dex、classes3.dex，用于MultiDex）；③res/——编译后的资源文件（二进制XML + 图片等），如layout、drawable、values；④resources.arsc——编译后的资源索引表，记录资源ID到资源值的映射，供Resources类查找；⑤assets/——原始资源文件（不编译，原样打包），如字体、JSON、本地HTML；⑥META-INF/——签名信息，包含MANIFEST.MF（文件摘要）、CERT.SF（签名文件）、CERT.RSA（证书和签名）。AndroidManifest.xml的作用：①声明应用包名和版本号；②声明四大组件（Activity/Service/Receiver/Provider），PMS据此构建组件注册表；③声明所需权限和自定义权限；④指定最低SDK版本和目标SDK版本；⑤配置应用入口Activity和启动模式。PMS安装时首先解析AndroidManifest.xml提取这些信息。",
    tags: ["APK结构", "AndroidManifest", "DEX", "资源", "签名"]
  },
  {
    id: "aal-pm-3",
    chapter: "aal-packagemanager",
    level: 2,
    question: "Android的APK签名方案有哪些？v1、v2、v3签名方案的区别是什么？",
    answer: "Android APK签名方案：①v1签名（JAR签名，Android 7.0前）——基于JDK jarsigner，对APK中每个文件单独计算摘要并签名，记录在META-INF/MANIFEST.MF和CERT.SF/CERT.RSA中。缺点：只签名文件内容，不保护APK整体结构，攻击者可以修改ZIP元数据（如文件顺序）绕过签名验证；安装时需验证所有文件，速度慢。②v2签名（Android 7.0+）——全文件签名，对整个APK文件计算摘要并签名，签名数据嵌入ZIP的Signing Block中（在文件中央目录前）。优点：覆盖整个APK（包括ZIP元数据），安全性更高；安装时只需验证一个签名块，速度快。③v3签名（Android 9.0+）——在v2基础上支持密钥轮换（Key Rotation），允许旧密钥签名新密钥，实现签名密钥的平滑升级而不影响应用更新。支持设置签名 lineage（密钥历史链），应用可以用新密钥更新用旧密钥签名的应用。推荐使用apksigner工具同时启用v2+v3签名（向后兼容v1），兼顾安全性和兼容性。",
    tags: ["APK签名", "v1签名", "v2签名", "v3签名", "密钥轮换"]
  },
  {
    id: "aal-pm-4",
    chapter: "aal-packagemanager",
    level: 3,
    question: "PMS解析APK的流程是怎样的？PackageParser在其中做了什么？",
    answer: "PMS解析APK流程：①PackageParser初始化——创建PackageParser实例，设置数据源（APK文件路径）；②解析AndroidManifest.xml——PackageParser.parsePackage()读取二进制XML格式的AndroidManifest.xml，使用AssetManager和XmlResourceParser解析XML；③提取包信息——从Manifest中提取packageName、versionCode、versionName、minSdkVersion、targetSdkVersion、sharedUserId等；④解析组件——解析所有`<activity>`、`<service>`、`<receiver>`、`<provider>`标签，创建ActivityInfo/ServiceInfo/ActivityInfo/ProviderInfo对象，记录类名、IntentFilter、权限、启动模式等；⑤解析权限——解析`<uses-permission>`和`<permission>`标签，记录声明的权限和自定义权限；⑥解析资源——通过resources.arsc建立资源索引；⑦签名校验——验证APK签名完整性；⑧构建Package对象——将所有信息封装为Package对象（包含所有组件信息），存入PMS内存缓存；⑨注册组件——将组件信息注册到PMS的全局组件表中，供AMS查询Intent时使用。PackageParser是PMS的核心解析器，将APK文件转换为内存中的Package数据结构。",
    tags: ["PMS", "PackageParser", "APK解析", "组件注册"]
  }
];
