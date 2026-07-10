import type { ReviewQuestion } from "./types";

export const wjRegistryServiceQuestions: ReviewQuestion[] = [
  {
    id: "wj-registry-service-1",
    chapter: "wj-registry-service",
    level: 2,
    question: `注册表的五大根键分别是什么？各存储什么类型的配置？`,
    answer:
      `注册表五大根键：①\`HKEY_CLASSES_ROOT\`（HKCR）——文件关联和 COM 组件注册信息，决定双击文件用什么程序打开、\`.dll\`/\`.exe\` 的 COM 注册；②\`HKEY_CURRENT_USER\`（HKCU）——当前登录用户的个人配置，如桌面壁纸、环境变量、开始菜单设置，指向 \`HKEY_USERS\` 下当前用户 SID 子键的别名；③\`HKEY_LOCAL_MACHINE\`（HKLM）——系统全局配置，包含硬件信息、已安装软件、驱动程序、安全策略等，所有用户共享；④\`HKEY_USERS\`（HKU）——所有用户配置文件的集合，每个用户有一个 SID 子键，HKCU 是其别名；⑤\`HKEY_CURRENT_CONFIG\`（HKCC）——当前硬件配置文件，指向 \`HKLM\\SYSTEM\\CurrentControlSet\\Hardware Profiles\\Current\` 的别名。HKLM 和 HKCU 是最常操作的根键。`,
    tags: ["注册表", "根键"],
  },
  {
    id: "wj-registry-service-2",
    chapter: "wj-registry-service",
    level: 2,
    question: `注册表的基本数据结构是什么？常见的值类型有哪些？`,
    answer:
      `注册表是树形结构：根键 → 子键（SubKey，类似目录）→ 值项（Value Entry，类似文件）。每个值项由三部分组成：名称（Name）、类型（Type）、数据（Data）。常见值类型：①\`REG_SZ\`——字符串（以 null 结尾）；②\`REG_EXPAND_SZ\`——可展开环境变量的字符串（如 \`%SystemRoot%\\system32\`）；③\`REG_DWORD\`——32 位整数；④\`REG_QWORD\`——64 位整数；⑤\`REG_BINARY\`——原始二进制数据；⑥\`REG_MULTI_SZ\`——多字符串数组（以两个 null 结尾）；⑦\`REG_NONE\`——无类型。操作 API：\`RegOpenKeyEx\` 打开键、\`RegQueryValueEx\` 读取值、\`RegSetValueEx\` 写入值、\`RegCreateKeyEx\` 创建子键、\`RegCloseKey\` 关闭键、\`RegEnumKeyEx\` 枚举子键、\`RegDeleteKey\` 删除键。`,
    tags: ["注册表", "数据结构"],
  },
  {
    id: "wj-registry-service-3",
    chapter: "wj-registry-service",
    level: 3,
    question: `Windows 服务的生命周期和三种启动类型是什么？SCM 如何管理服务？`,
    answer:
      `服务控制管理器（SCM，\`services.exe\`）是 Windows 的服务管理中心，在系统启动时运行。服务生命周期：SCM 读取注册表 \`HKLM\\SYSTEM\\CurrentControlSet\\Services\` 下的服务配置 → 按启动类型决定是否自动启动 → 调用 \`StartService\` 启动 → 服务进程入口 \`ServiceMain\` 执行 → \`RegisterServiceCtrlHandler\` 注册控制处理器 → \`SetServiceStatus\` 上报运行状态 → 收到 \`SERVICE_CONTROL_STOP\` 时清理退出。三种启动类型：①\`SERVICE_AUTO_START\`（自动）——系统启动时自动启动；②\`SERVICE_DEMAND_START\`（手动）——由 \`StartService\` 按需启动；③\`SERVICE_DISABLED\`（禁用）——不可启动。服务可以与桌面交互（\`SERVICE_INTERACTIVE_PROCESS\`，已不推荐）或独立运行在 Session 0 中。\`ControlService\` 发送控制码（停止/暂停/继续），\`QueryServiceStatus\` 查询当前状态。`,
    tags: ["服务", "SCM", "生命周期"],
  },
  {
    id: "wj-registry-service-4",
    chapter: "wj-registry-service",
    level: 3,
    question: `服务的配置存储在注册表的什么位置？包含哪些关键信息？`,
    answer:
      `服务配置存储在 \`HKLM\\SYSTEM\\CurrentControlSet\\Services\\<服务名>\` 下，每个服务一个子键。关键值项：①\`ImagePath\`（\`REG_EXPAND_SZ\`）——服务可执行文件路径（如 \`%SystemRoot%\\system32\\svchost.exe -k netsvcs\`）；②\`Type\`——服务类型（\`SERVICE_WIN32_OWN_PROCESS\` 独立进程 / \`SERVICE_WIN32_SHARE_PROCESS\` 共享进程）；③\`Start\`——启动类型（2=自动 / 3=手动 / 4=禁用）；④\`ErrorControl\`——启动失败处理方式（0=忽略 / 1=正常 / 2=严重 / 3=关键）；⑤\`DisplayName\`——显示名称；⑥\`Description\`——描述文字；⑦\`DependOnGroup\`/\`DependOnService\`——依赖的服务组/服务（必须先启动）；⑧\`ObjectName\`——服务运行账户（如 \`LocalSystem\`/\`NT AUTHORITY\\NetworkService\`）。\`CurrentControlSet\` 是 \`ControlSet001\`/\`ControlSet002\` 的别名，\`LastKnownGood\` 指向最后一次成功启动的配置。`,
    tags: ["注册表", "服务配置", "系统机制"],
  },
];
