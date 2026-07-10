import type { ReviewQuestion } from "./types";

export const davPmsDeepQuestions: ReviewQuestion[] = [
  {
    id: "dav-pms-1",
    chapter: "dav-pms-deep",
    level: 1,
    question: `APK的文件结构是什么？PackageParser如何解析APK？`,
    answer: `APK是ZIP文件：AndroidManifest.xml（二进制XML）、classes.dex（字节码）、resources.arsc（资源索引）、res/（资源）、assets/（原始资源）、lib/（SO库按ABI分目录）、META-INF/（签名：MANIFEST.MF+CERT.SF+CERT.RSA）。PackageParser.parsePackage()解压APK读取AndroidManifest.xml→解析manifest/application/activity/service/receiver/provider标签→创建Package对象（包名/组件列表/权限列表/签名）。`,
    tags: ["APK结构", "PackageParser", "AndroidManifest", "META-INF"],
  },
  {
    id: "dav-pms-2",
    chapter: "dav-pms-deep",
    level: 2,
    question: `详细描述APK安装的六步流程。`,
    answer: `①拷贝APK到/data/app/；②PackageParser解析APK获取Package对象；③签名校验verifySignatures（提取证书验签+重算文件摘要对比+更新时与已有签名比对）；④权限检查授予（普通自动授予，危险记录待运行时请求，签名权限检查匹配）；⑤dex2oat编译（通过installd将DEX编译为OAT机器码，7.0+用AOT+JIT混合）；⑥注册组件写packages.xml并通知AMS。`,
    tags: ["APK安装", "签名校验", "dex2oat", "权限授予", "packages.xml"],
  },
  {
    id: "dav-pms-3",
    chapter: "dav-pms-deep",
    level: 2,
    question: `Android的权限管理模型是什么？运行时权限如何工作？`,
    answer: `四类：普通权限（自动授予）、危险权限（运行时请求）、签名权限（需同签名）、特权权限（priv-app）。运行时权限流程：安装时PMS记录危险权限但不授予→App调用requestPermissions()→系统弹框→用户授权→PMS.grantRuntimePermission()写入runtime-permissions.xml。校验：系统服务通过Binder.getCallingUid()获取调用方UID（内核记录不可伪造）→PMS.checkUidPermission(perm,uid)检查→未授权抛SecurityException。`,
    tags: ["权限管理", "运行时权限", "危险权限", "checkUidPermission", "Binder.getCallingUid"],
  },
  {
    id: "dav-pms-4",
    chapter: "dav-pms-deep",
    level: 3,
    question: `APK签名校验的流程是什么？V1和V2签名有什么区别？`,
    answer: `流程：collectCertificates提取CERT.RSA的X.509证书→用公钥验证CERT.SF签名确认MANIFEST.MF未篡改→重算每个文件SHA-1与MANIFEST.MF对比→更新安装时与已有签名比对必须一致。作用：完整性校验、身份认证、权限控制、更新校验。V1基于文件（MANIFEST.MF每文件SHA-1+CERT.SF+CERT.RSA），只签名文件内容不签名ZIP结构需解压全部。V2基于整个APK（插入APK Signing Block按区域分段签名），覆盖整个APK包括ZIP结构，校验更快更安全。V3支持密钥轮换。`,
    tags: ["签名校验", "V1签名", "V2签名", "X.509", "完整性"],
  },
];
