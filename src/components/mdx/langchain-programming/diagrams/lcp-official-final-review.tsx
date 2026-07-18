import { OfficialLcpLab } from "./official-lcp-lab";

const concepts = ["端到端重放","依赖锁","首个分叉","故障注入","兼容矩阵","发布门禁"] as const;

export function LcpOfficialFinalReviewGraphLab() { return <OfficialLcpLab title="《LangChain编程：从入门到实践》全书总复习" concepts={concepts} accent="#1d4ed8" view="graph" />; }
export function LcpOfficialFinalReviewRunLab() { return <OfficialLcpLab title="《LangChain编程：从入门到实践》全书总复习" concepts={concepts} accent="#1d4ed8" view="run" />; }
export function LcpOfficialFinalReviewFaultLab() { return <OfficialLcpLab title="《LangChain编程：从入门到实践》全书总复习" concepts={concepts} accent="#1d4ed8" view="fault" />; }
