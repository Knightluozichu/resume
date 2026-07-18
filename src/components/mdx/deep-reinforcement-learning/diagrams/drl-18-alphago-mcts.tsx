import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["围棋状态","MCTS","选择","扩展","评估","回传"] as const;

export function Drl18AlphagoMctsMapLab() {
  return <OfficialDrlLab title="第18章 AlphaGo与蒙特卡洛树搜索" concepts={concepts} accent="#be123c" view="map" />;
}

export function Drl18AlphagoMctsTraceLab() {
  return <OfficialDrlLab title="第18章 AlphaGo与蒙特卡洛树搜索" concepts={concepts} accent="#be123c" view="trace" />;
}

export function Drl18AlphagoMctsAuditLab() {
  return <OfficialDrlLab title="第18章 AlphaGo与蒙特卡洛树搜索" concepts={concepts} accent="#be123c" view="audit" />;
}
