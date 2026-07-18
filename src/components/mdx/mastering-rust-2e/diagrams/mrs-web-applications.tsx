import { MasteringRustOfficialLab, type MasteringRustCase } from "./official-lab";

const cases: MasteringRustCase[] = [
  { label: "Rust Web 应用边界", input: "目标与输入", rule: "Web应用把不可信HTTP请求转换为受约束的领域命令，再把结果映射为状态码与响应", evidence: "Rust Web 应用边界的边界测试与结果记录", invariant: "Web应用把不可信HTTP请求转换为受约束的领域命令，再把结果映射为状态码与响应；路由层不应直接承载全部业务和持久化逻辑。" },
  { label: "Hyper 类型化 HTTP", input: "Rust Web 应用边界", rule: "原书以Hyper展示请求、响应、header和body的类型化边界", evidence: "Hyper 类型化 HTTP的边界测试与结果记录", invariant: "原书以Hyper展示请求、响应、header和body的类型化边界；底层控制力更强也意味着调用者负责流式body、超时与连接生命周期。" },
  { label: "Actix-web 基础", input: "Hyper 类型化 HTTP", rule: "Actix-web把路由、提取器、中间件和应用状态组织成服务", evidence: "Actix-web 基础的边界测试与结果记录", invariant: "Actix-web把路由、提取器、中间件和应用状态组织成服务；框架API会演进，但验证、状态隔离和统一错误映射是不变架构。" },
  { label: "书签 API", input: "Actix-web 基础", rule: "原书书签API需要创建、读取和校验资源", evidence: "书签 API的边界测试与结果记录", invariant: "原书书签API需要创建、读取和校验资源；资源ID、幂等语义、分页、冲突与不存在必须对应明确HTTP行为。" },
  { label: "安全与可观察性", input: "书签 API", rule: "限制请求体、验证URL、设置超时并传播请求ID", evidence: "安全与可观察性的边界测试与结果记录", invariant: "限制请求体、验证URL、设置超时并传播请求ID；认证与授权分开，错误响应不泄漏内部栈或数据库细节。" },
];

export function MrsWebApplicationsModelLab() {
  return <MasteringRustOfficialLab title="使用 Rust 构建 Web 应用：概念执行链" caption="选择核心单元，沿输入、规则与证据追踪。" cases={cases} tone="cyan" />;
}

export function MrsWebApplicationsBoundaryLab() {
  return <MasteringRustOfficialLab title="使用 Rust 构建 Web 应用：边界切换" caption="切换单元，比较静态契约与运行期协议。" cases={cases} tone="amber" initial={1} />;
}

export function MrsWebApplicationsEvidenceLab() {
  return <MasteringRustOfficialLab title="使用 Rust 构建 Web 应用：验收证据" caption="把编译、测试与外部结果收束为可复现记录。" cases={cases} tone="emerald" initial={2} />;
}
