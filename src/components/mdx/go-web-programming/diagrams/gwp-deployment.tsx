import { GoWebOfficialLab, type GoWebCase } from "./official-lab";
const cases: GoWebCase[] = [
  { label: "Server", input: "二进制、模板与静态文件", boundary: "独立主机与进程管理", output: "监听服务", invariant: "资产路径、配置和日志随版本部署。" },
  { label: "Heroku", input: "源码或构建产物", boundary: "PaaS build与dyno", output: "平台路由服务", invariant: "监听平台端口且状态不依赖本地盘。" },
  { label: "App Engine", input: "应用与平台配置", boundary: "托管运行时", output: "自动扩缩实例", invariant: "平台限制进入设计与测试。" },
  { label: "Docker", input: "镜像、配置与挂载", boundary: "容器运行时", output: "可移植进程", invariant: "镜像固定且数据和秘密不烘焙进层。" },
];
export function GwpArtifactLab(){return <GoWebOfficialLab title="Go Web部署物" caption="单二进制之外还要追踪模板、静态资源和配置。" cases={cases}/>;}
export function GwpPlatformLab(){return <GoWebOfficialLab title="部署方式比较" caption="控制权、伸缩、约束和证据成本决定平台。" cases={cases} tone="amber" initial={1}/>;}
export function GwpDockerLab(){return <GoWebOfficialLab title="Docker发布链" caption="构建、镜像、运行和健康检查必须来自同一版本。" cases={cases} tone="emerald" initial={3}/>;}
