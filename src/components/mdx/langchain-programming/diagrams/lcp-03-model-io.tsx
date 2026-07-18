import { OfficialLcpLab } from "./official-lcp-lab";

const concepts = ["提示模板","示例选择器","聊天消息","模型适配器","采样","输出解析器"] as const;

export function Lcp03ModelIoGraphLab() { return <OfficialLcpLab title="第3章 模型输入与输出" concepts={concepts} accent="#4d7c0f" view="graph" />; }
export function Lcp03ModelIoRunLab() { return <OfficialLcpLab title="第3章 模型输入与输出" concepts={concepts} accent="#4d7c0f" view="run" />; }
export function Lcp03ModelIoFaultLab() { return <OfficialLcpLab title="第3章 模型输入与输出" concepts={concepts} accent="#4d7c0f" view="fault" />; }
