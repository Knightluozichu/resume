import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["句法语法","语义语法","计算语言","可执行结构","符号表示","自然语言"] as const;

export function TcgMain15SemanticGrammarMapLab() { return <OfficialTcgLab title="语义语法与计算语言的力量" concepts={concepts} accent="#b45309" view="map" />; }
export function TcgMain15SemanticGrammarProbabilityLab() { return <OfficialTcgLab title="语义语法与计算语言的力量" concepts={concepts} accent="#b45309" view="probability" />; }
export function TcgMain15SemanticGrammarEvidenceLab() { return <OfficialTcgLab title="语义语法与计算语言的力量" concepts={concepts} accent="#b45309" view="evidence" />; }
