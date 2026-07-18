import { OfficialLcpLab } from "./official-lcp-lab";

const concepts = ["目录分母","Runnable","Model I/O","RAG","代理","可观测性"] as const;

export function LcpOfficialLearningMapGraphLab() { return <OfficialLcpLab title="《LangChain编程：从入门到实践》权威学习地图" concepts={concepts} accent="#0f766e" view="graph" />; }
export function LcpOfficialLearningMapRunLab() { return <OfficialLcpLab title="《LangChain编程：从入门到实践》权威学习地图" concepts={concepts} accent="#0f766e" view="run" />; }
export function LcpOfficialLearningMapFaultLab() { return <OfficialLcpLab title="《LangChain编程：从入门到实践》权威学习地图" concepts={concepts} accent="#0f766e" view="fault" />; }
