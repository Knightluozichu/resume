import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "23. Afterword",
  "Where to Go from Here",
  "Shameless Plugs",
  "Thank You"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="23. Afterword" focus="把语言、对象模型、互操作、Android与协程能力转成后续项目和持续学习计划" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="23. Afterword" focus="收藏更多资料代替完成可验证项目" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="23. Afterword" focus="能力矩阵、薄弱点、下一项目、验收标准和版本迁移清单" nodes={nodes} />; }
