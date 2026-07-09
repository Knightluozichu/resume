import type { ReviewQuestion } from "./types";

export const dakPmsPackageQuestions: ReviewQuestion[] = [
  {
    id: "dak-pms-1",
    chapter: "dak-pms-package",
    level: 1,
    question: "APK文件包含哪些核心文件？各有什么作用？",
    answer: "APK本质是ZIP压缩包，核心文件：①AndroidManifest.xml——应用配置清单，二进制XML格式（AXML），声明包名/版本号/SDK版本/四大组件/权限声明，PMS用PackageParser解析为Package对象；②classes.dex/classes2.dex——DEX字节码，应用可执行代码，方法数超65535时用多DEX；③res/——资源文件目录，含layout（布局XML）/drawable（图片）/values（字符串颜色尺寸），编译后二进制格式；④resources.arsc——资源索引表，建立资源ID到实际文件的映射，运行时通过R.java的ID查找；⑤lib/——SO库目录，按ABI分（arm64-v8a/armeabi-v7a），含native C/C++动态链接库；⑥assets/——原始资源目录，不编译通过AssetManager直接读取；⑦META-INF/——签名信息目录，含MANIFEST.MF（文件SHA-1摘要清单）、CERT.SF（摘要签名）、CERT.RSA（证书公钥+签名），用于签名校验防篡改。",
    tags: ["APK结构", "AndroidManifest", "dex", "resources.arsc", "META-INF"],
  },
  {
    id: "dak-pms-2",
    chapter: "dak-pms-package",
    level: 2,
    question: "APK安装的六步流程分别是什么？详细描述每一步。",
    answer: "六步流程（PMS.installPackage）：①拷贝APK——源APK拷贝到/data/app/包名/base.apk，创建/data/data/包名/数据目录；②解析AndroidManifest.xml——PackageParser.parsePackage()将二进制AXML解析为Package对象，提取包名/版本号/SDK版本，解析四大组件声明和uses-permission权限声明；③签名校验——PackageParser.collectCertificates()读取META-INF/CERT.RSA证书，验证MANIFEST.MF中每个文件摘要确保未篡改，验证CERT.SF签名，升级时校验新旧签名一致防冒充；④权限处理——PermissionManager.grantPermissions()遍历uses-permission声明，普通权限自动授予、危险权限标记运行时请求、签名权限签名匹配才授予，写入packages.xml；⑤dex2oat编译——installd执行dex2oat将DEX AOT编译为OAT机器码，生成odex文件提升启动速度；⑥组件注册——PMS将Package信息写入packages.xml持久化，组件信息供AMS查询，发送ACTION_PACKAGE_ADDED广播，安装完成。",
    tags: ["APK安装", "六步流程", "PackageParser", "签名校验", "dex2oat"],
  },
  {
    id: "dak-pms-3",
    chapter: "dak-pms-package",
    level: 2,
    question: "Android权限分几级？运行时权限请求流程是什么？",
    answer: "权限分三级：①普通权限（Normal）——protectionLevel=normal，安装时自动授予无需用户确认，如INTERNET/VIBRATE/WAKE_LOCK，风险低；②危险权限（Dangerous）——protectionLevel=dangerous，运行时需动态请求用户授权，如CAMERA/RECORD_AUDIO/ACCESS_FINE_LOCATION/READ_CONTACTS，涉及隐私安全，按Permission Group分组管理；③签名权限（Signature）——protectionLevel=signature，只有签名匹配的应用才被授予，如BIND_DEVICE_ADMIN，用于系统级或同签名应用间通信。运行时权限请求流程：①检查权限——ContextCompat.checkSelfPermission(context, permission)返回GRANTED或DENIED；②请求权限——未授权时ActivityCompat.requestPermissions()弹出系统权限对话框；③用户操作——授权或拒绝（同组权限一次授权后续自动通过）；④回调——onRequestPermissionsResult(requestCode, permissions, grantResults)返回授权结果；⑤校验——系统服务中Binder.getCallingUid()获取调用方UID，checkPermission校验，未授权抛SecurityException。PMS在packages.xml记录权限授予状态。",
    tags: ["权限管理", "普通权限", "危险权限", "签名权限", "运行时权限"],
  },
  {
    id: "dak-pms-4",
    chapter: "dak-pms-package",
    level: 3,
    question: "APK签名三代方案分别是什么？升级时如何校验签名？",
    answer: "三代签名方案：①v1签名（JAR签名）——基于META-INF目录，MANIFEST.MF记录每个文件SHA-1摘要，CERT.SF含MANIFEST.MF摘要和每个文件摘要的签名，CERT.RSA含证书公钥和对CERT.SF的RSA签名。缺点：只校验文件内容不校验APK整体，可篡改ZIP元数据不破坏签名。②v2签名（APK签名块）——Android 7.0引入，对整个APK文件按1MB分块计算摘要并签名，签名信息插入ZIP中央目录前的APK Signing Block区域。优点：覆盖整个APK（含ZIP元数据），防篡改更强，验证更快（只需读签名块无需解压所有文件）。③v3签名（支持密钥轮换）——Android 9.0引入，在v2基础上增加密钥轮换支持，签名块含历史密钥链（lineage），新密钥签名旧密钥背书证明密钥更替连续性，支持升级时更换签名密钥无需重新安装。升级校验：PMS安装升级包时校验新APK签名必须与已安装APK签名一致——不一致返回INSTALL_FAILED_UPDATE_INCOMPATIBLE拒绝安装，防止恶意应用冒充升级覆盖正版应用。v3签名下新旧签名能通过密钥链证明连续性也允许升级。",
    tags: ["APK签名", "v1签名", "v2签名", "v3签名", "密钥轮换", "签名校验"],
  },
];
