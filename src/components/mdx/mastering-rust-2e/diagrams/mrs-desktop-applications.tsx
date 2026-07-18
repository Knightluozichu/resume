import { MasteringRustOfficialLab, type MasteringRustCase } from "./official-lab";

const cases: MasteringRustCase[] = [
  { label: "GUI 事件循环", input: "目标与输入", rule: "桌面界面由事件循环驱动，UI状态只能在规定线程更新", evidence: "GUI 事件循环的边界测试与结果记录", invariant: "桌面界面由事件循环驱动，UI状态只能在规定线程更新；耗时网络与解析任务移到worker，再用消息把不可变结果送回界面。" },
  { label: "GTK 与 gtk-rs", input: "GUI 事件循环", rule: "原书以GTK和gtk-rs展示原生组件绑定、信号与对象生命周期", evidence: "GTK 与 gtk-rs的边界测试与结果记录", invariant: "原书以GTK和gtk-rs展示原生组件绑定、信号与对象生命周期；具体API版本会变化，但主线程规则、回调所有权和资源释放必须保留。" },
  { label: "Hacker News 应用", input: "GTK 与 gtk-rs", rule: "示例应用把HTTP获取、JSON解析、列表模型和点击事件串联", evidence: "Hacker News 应用的边界测试与结果记录", invariant: "示例应用把HTTP获取、JSON解析、列表模型和点击事件串联；请求取消、加载态、空态、错误态与缓存是完整体验的一部分。" },
  { label: "状态与消息", input: "Hacker News 应用", rule: "把界面状态建模为Loading、Ready、Empty和Failed，消息驱动状态迁移", evidence: "状态与消息的边界测试与结果记录", invariant: "把界面状态建模为Loading、Ready、Empty和Failed，消息驱动状态迁移；回调不应直接修改多个隐式全局变量。" },
  { label: "桌面框架选择", input: "状态与消息", rule: "选择框架要比较平台覆盖、可访问性、打包体积、渲染模型和维护状态", evidence: "桌面框架选择的边界测试与结果记录", invariant: "选择框架要比较平台覆盖、可访问性、打包体积、渲染模型和维护状态；一次演示成功不能证明更新、签名和崩溃恢复可用。" },
];

export function MrsDesktopApplicationsModelLab() {
  return <MasteringRustOfficialLab title="使用 Rust 构建桌面应用：概念执行链" caption="选择核心单元，沿输入、规则与证据追踪。" cases={cases} tone="cyan" />;
}

export function MrsDesktopApplicationsBoundaryLab() {
  return <MasteringRustOfficialLab title="使用 Rust 构建桌面应用：边界切换" caption="切换单元，比较静态契约与运行期协议。" cases={cases} tone="amber" initial={1} />;
}

export function MrsDesktopApplicationsEvidenceLab() {
  return <MasteringRustOfficialLab title="使用 Rust 构建桌面应用：验收证据" caption="把编译、测试与外部结果收束为可复现记录。" cases={cases} tone="emerald" initial={2} />;
}
