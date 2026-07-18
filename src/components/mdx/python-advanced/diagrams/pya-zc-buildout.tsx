import { PythonAdvancedOfficialLab, type PythonAdvancedCase } from "./official-lab";
const cases: PythonAdvancedCase[] = [
  { label: "zc.buildout哲学", input: "需求与输入", action: "buildout把环境拆成声明式part并由recipe生成结果，历史价值在于可重复组装应用", evidence: "zc.buildout哲学的测试与迁移记录", invariant: "buildout把环境拆成声明式part并由recipe生成结果，历史价值在于可重复组装应用；今天阅读重点是输入、解析、产物和可重建性，而非默认采用旧工具。" },
  { label: "配置结构与命令", input: "zc.buildout哲学", action: "buildout节定义parts、下载源和版本，其他节配置recipe", evidence: "配置结构与命令的测试与迁移记录", invariant: "buildout节定义parts、下载源和版本，其他节配置recipe；配置继承会增强复用也会隐藏来源，验收要输出最终解析配置。" },
  { label: "recipe机制", input: "配置结构与命令", action: "recipe把配置转换为文件、脚本或服务定义，必须声明输入并实现幂等更新与卸载", evidence: "recipe机制的测试与迁移记录", invariant: "recipe把配置转换为文件、脚本或服务定义，必须声明输入并实现幂等更新与卸载；任意网络下载会破坏可复现和供应链审计。" },
  { label: "Atomisator环境", input: "recipe机制", action: "案例把应用包、数据库和入口脚本装配成一套环境", evidence: "Atomisator环境的测试与迁移记录", invariant: "案例把应用包、数据库和入口脚本装配成一套环境；现代迁移可用锁定依赖、容器或部署清单重建，但仍需保持组件边界。" },
  { label: "发布与分发", input: "Atomisator环境", action: "发布配置把开发依赖与生产依赖分开，并从版本化输入构建", evidence: "发布与分发的测试与迁移记录", invariant: "发布配置把开发依赖与生产依赖分开，并从版本化输入构建；秘密不进入配置模板，制品摘要和回滚版本必须可查。" },
];
export function PyaZcBuildoutModelLab(){return <PythonAdvancedOfficialLab title="使用 zc.buildout 管理环境：执行链" caption="沿需求、实现和证据追踪本章核心。" cases={cases} tone="cyan" />;}
export function PyaZcBuildoutBoundaryLab(){return <PythonAdvancedOfficialLab title="使用 zc.buildout 管理环境：边界" caption="切换单元，比较历史工具与现代迁移边界。" cases={cases} tone="amber" initial={1} />;}
export function PyaZcBuildoutEvidenceLab(){return <PythonAdvancedOfficialLab title="使用 zc.buildout 管理环境：证据" caption="用测试、环境和制品证明结果可重放。" cases={cases} tone="emerald" initial={2} />;}
