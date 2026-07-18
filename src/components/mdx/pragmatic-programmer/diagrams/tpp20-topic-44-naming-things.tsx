import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-44-naming-things",
  title: "44 事物命名",
  nodes: ["对象", "语境", "意图", "命名", "更名"],
  focuses: ["命名", "领域词汇", "作用域", "一致性", "重命名"],
} as const;

export function Tpp20Topic44NamingThingsSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic44NamingThingsFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic44NamingThingsEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
