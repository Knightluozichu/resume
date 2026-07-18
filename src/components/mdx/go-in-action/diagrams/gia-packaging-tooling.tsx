import { GoActionOfficialLab, type GoActionCase } from "./official-lab";
const cases: GoActionCase[] = [
  { label: "Package", input: "同目录Go文件", mechanism: "统一包名、导出规则和初始化", evidence: "可导入语义单元", invariant: "包名描述能力，不重复调用者路径。" },
  { label: "Import/init", input: "依赖图与包级变量", mechanism: "先依赖后当前包，按规则执行init", evidence: "main前初始化完成", invariant: "init不可成为隐藏网络或业务控制流。" },
  { label: "Tools", input: "源码与module", mechanism: "fmt、vet、doc、test、build", evidence: "统一格式和诊断", invariant: "工具版本与命令纳入CI。" },
  { label: "Dependency", input: "module path与版本", mechanism: "go.mod、go.sum和vendor", evidence: "可重建依赖图", invariant: "来源、版本、校验和替换可追溯。" },
];
export function GiaPackageLab(){return <GoActionOfficialLab title="包与导入" caption="包组织语义，导入形成无环依赖图，init只做必要初始化。" cases={cases}/>;}
export function GiaToolchainLab(){return <GoActionOfficialLab title="Go工具链" caption="格式、静态检查、文档、测试和构建使用同一源码坐标。" cases={cases} tone="violet" initial={2}/>;}
export function GiaDependencyLab(){return <GoActionOfficialLab title="协作与依赖" caption="原书vendor语境与现代module机制都要保留来源证据。" cases={cases} tone="emerald" initial={3}/>;}
