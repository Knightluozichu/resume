import { OfficialLcpLab } from "./official-lcp-lab";

const concepts = ["官方文档","源码版本","社区贡献","模板","LangServe","LangSmith"] as const;

export function Lcp10CommunityResourcesGraphLab() { return <OfficialLcpLab title="第10章 社区和资源" concepts={concepts} accent="#b45309" view="graph" />; }
export function Lcp10CommunityResourcesRunLab() { return <OfficialLcpLab title="第10章 社区和资源" concepts={concepts} accent="#b45309" view="run" />; }
export function Lcp10CommunityResourcesFaultLab() { return <OfficialLcpLab title="第10章 社区和资源" concepts={concepts} accent="#b45309" view="fault" />; }
