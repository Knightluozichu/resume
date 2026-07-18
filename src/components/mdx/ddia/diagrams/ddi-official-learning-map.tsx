import { OfficialDdiaLab } from "./official-ddia-lab";

const config = {
  unitTitle: "第1版权威学习地图",
  focus:
    "沿系统目标、数据表示、单机存储、分布式协调和派生数据五条因果链完成12章与术语表",
  invariant:
    "3部分、12章与术语表都有独立页面、目录节点、交互实验、失败反例和交付物",
  artifact: "15页路线、章节依赖图、跨章实验仓、版本边界表和全书清单",
  nodes: [
    "版本与正式分母",
    "第一部分：数据系统基础",
    "第二部分：分布式数据",
    "第三部分：派生数据",
    "跨章实验主线",
    "逐章证据门",
    "总复习与交接",
  ],
};

export function DdiOfficialLearningMapArchitectureLab() {
  return <OfficialDdiaLab {...config} mode="architecture" />;
}

export function DdiOfficialLearningMapFailureLab() {
  return <OfficialDdiaLab {...config} mode="failure" />;
}

export function DdiOfficialLearningMapEvidenceLab() {
  return <OfficialDdiaLab {...config} mode="evidence" />;
}
