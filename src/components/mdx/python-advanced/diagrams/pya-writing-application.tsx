import { PythonAdvancedOfficialLab, type PythonAdvancedCase } from "./official-lab";
const cases: PythonAdvancedCase[] = [
  { label: "Atomisator案例", input: "需求与输入", action: "原书用Atomisator聚合订阅源，展示应用不是一个大脚本，而是解析、存储、生成和编排等可独立测试的包。", evidence: "Atomisator案例的测试与迁移记录", invariant: "原书用Atomisator聚合订阅源，展示应用不是一个大脚本，而是解析、存储、生成和编排等可独立测试的包。" },
  { label: "整体架构与工作环境", input: "Atomisator案例", action: "先画输入源、解析器、数据库、输出feed和主程序的依赖方向，再配置隔离环境", evidence: "整体架构与工作环境的测试与迁移记录", invariant: "先画输入源、解析器、数据库、输出feed和主程序的依赖方向，再配置隔离环境；基础设施只能依赖接口，不反向污染领域模型。" },
  { label: "测试运行器与包结构", input: "整体架构与工作环境", action: "测试入口和包结构在写业务前建立反馈环", evidence: "测试运行器与包结构的测试与迁移记录", invariant: "测试入口和包结构在写业务前建立反馈环；单元测试隔离解析与存储，集成测试再连接临时数据库和真实格式样本。" },
  { label: "parser、db与feed API", input: "测试运行器与包结构", action: "解析器输出稳定记录，数据库负责事务，feed只渲染查询结果", evidence: "parser、db与feed API的测试与迁移记录", invariant: "解析器输出稳定记录，数据库负责事务，feed只渲染查询结果；跨包API传领域值与显式错误，不泄漏ORM会话或全局连接。" },
  { label: "应用分发与依赖", input: "parser、db与feed API", action: "应用由多个包组成时要区分库依赖和部署配置，锁定完整运行环境并验证入口点", evidence: "应用分发与依赖的测试与迁移记录", invariant: "应用由多个包组成时要区分库依赖和部署配置，锁定完整运行环境并验证入口点；分发成功还要证明迁移、启动和关闭。" },
];
export function PyaWritingApplicationModelLab(){return <PythonAdvancedOfficialLab title="编写模块化应用：执行链" caption="沿需求、实现和证据追踪本章核心。" cases={cases} tone="cyan" />;}
export function PyaWritingApplicationBoundaryLab(){return <PythonAdvancedOfficialLab title="编写模块化应用：边界" caption="切换单元，比较历史工具与现代迁移边界。" cases={cases} tone="amber" initial={1} />;}
export function PyaWritingApplicationEvidenceLab(){return <PythonAdvancedOfficialLab title="编写模块化应用：证据" caption="用测试、环境和制品证明结果可重放。" cases={cases} tone="emerald" initial={2} />;}
