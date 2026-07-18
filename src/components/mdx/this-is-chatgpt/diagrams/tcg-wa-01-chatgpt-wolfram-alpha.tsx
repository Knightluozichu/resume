import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["语言模型","计算知识","工具调用","查询翻译","结构化结果","答案整合"] as const;

export function TcgWa01ChatgptWolframAlphaMapLab() { return <OfficialTcgLab title="ChatGPT与Wolfram|Alpha" concepts={concepts} accent="#4d7c0f" view="map" />; }
export function TcgWa01ChatgptWolframAlphaProbabilityLab() { return <OfficialTcgLab title="ChatGPT与Wolfram|Alpha" concepts={concepts} accent="#4d7c0f" view="probability" />; }
export function TcgWa01ChatgptWolframAlphaEvidenceLab() { return <OfficialTcgLab title="ChatGPT与Wolfram|Alpha" concepts={concepts} accent="#4d7c0f" view="evidence" />; }
