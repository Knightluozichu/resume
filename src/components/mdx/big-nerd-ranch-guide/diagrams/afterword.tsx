import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "32. Afterword",
  "The Final Challenge",
  "Shameless Plugs",
  "Thank You"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第32章 Afterword" focus="把最终挑战拆成可交付应用，回看32章的边界、证据与继续学习路线" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第32章 Afterword" focus="把最终挑战拆成可交付应用，回看32章的边界、证据与继续学习路线" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第32章 Afterword" focus="全书能力矩阵、最终应用答辩、缺口清单和下一阶段计划" nodes={nodes} />; }
