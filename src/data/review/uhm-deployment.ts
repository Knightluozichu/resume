import type { ReviewQuestion } from "./types";

export const uhmDeploymentQuestions: ReviewQuestion[] = [
  {
    id: "uhm-deployment-1",
    chapter: "uhm-deployment",
    level: 1,
    question: `HMI 部署与普通 App 部署的核心区别是什么？`,
    answer: `HMI 面向车规级/工业级平台，有严格约束：冷启动 2 秒内显示界面、7x24 小时稳定运行、通过安全认证（如 ISO 26262）、支持 OTA 远程更新且能回滚。普通 App 面向消费级平台，启动容忍度高、不需安全认证、通过应用商店更新。HMI 还需适配嵌入式硬件（有限 CPU/内存/存储）。`,
    tags: ["部署", "车规级", "OTA"],
  },
  {
    id: "uhm-deployment-2",
    chapter: "uhm-deployment",
    level: 2,
    question: `HMI 为什么需要 OTA？OTA 的关键要求是什么？`,
    answer: `车辆出厂后功能迭代和 Bug 修复都依赖 OTA，不能每次回 4S 店刷固件。关键要求：版本检查（知道何时更新）、差分下载（只下变化部分省流量）、数字签名（防篡改）、校验安装（确保包完整）、自动回滚（安装失败恢复旧版）。OTA 过程中 HMI 必须保持可用，不能在行驶中突然黑屏更新。`,
    tags: ["OTA", "差分下载", "回滚"],
  },
  {
    id: "uhm-deployment-3",
    chapter: "uhm-deployment",
    level: 3,
    question: `如何保证 HMI 冷启动 2 秒内显示界面？`,
    answer: `用 Addressables 按需加载资源：首屏只加载必需资源（背景+基本仪表），其他界面后台预加载或延迟加载。脚本用 IL2CPP 编译为原生代码提高启动速度。将启动流程拆分为「显示首屏」和「后台加载」两阶段，先让用户看到界面再逐步加载完整功能。避免在 Start/Awake 中做重计算，用协程延迟初始化。`,
    tags: ["冷启动", "Addressables", "启动优化"],
  },
  {
    id: "uhm-deployment-4",
    chapter: "uhm-deployment",
    level: 4,
    question: `HMI 多平台适配需要考虑哪些维度？IL2CPP 相比 Mono 有什么优势？`,
    answer: `三个维度：分辨率适配（CanvasScaler 的 Scale With Screen Size + Match 值）、输入适配（Input System 多设备映射）、性能适配（Quality Settings 按平台分级，嵌入式平台降低渲染精度）。IL2CPP 相比 Mono 的优势：将 C# 编译为 C++ 再编译为原生代码，执行效率高（约 2-3 倍）、内存占用小、代码被反编译难度高（安全性好）。HMI 平台资源有限且需要安全性，IL2CPP 是首选。`,
    tags: ["多平台适配", "IL2CPP", "综合"],
  },
];
