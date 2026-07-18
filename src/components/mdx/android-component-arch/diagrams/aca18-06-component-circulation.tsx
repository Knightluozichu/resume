import { OfficialAca18BookLab } from "./official-aca18-book-lab";

const nodes = [
  "第6章 组件化流通",
  "6.1 内部流通",
  "6.1.1 Maven基础",
  "6.1.2 本地缓存",
  "6.1.3 远程仓库",
  "6.2 组件化SDK",
  "6.2.1 SDK基础知识",
  "6.2.2 Python脚本合并",
  "6.2.3 fat-aar脚本合并",
  "6.3 JCenter共享",
  "6.4 小结"
];

export function Aca18BoundaryLab() { return <OfficialAca18BookLab mode="boundary" unitTitle="第6章 组件化流通" focus="从Maven本地缓存与远程仓库建立组件版本流通，再比较SDK、Python合并、fat-aar和JCenter发布" nodes={nodes} />; }
export function Aca18FailureLab() { return <OfficialAca18BookLab mode="failure" unitTitle="第6章 组件化流通" focus="发布可变版本或把依赖打入fat-aar却不记录来源，导致重复类、资源覆盖和不可复现供应链" nodes={nodes} />; }
export function Aca18EvidenceLab() { return <OfficialAca18BookLab mode="evidence" unitTitle="第6章 组件化流通" focus="坐标与依赖图、校验和、仓库权限、AAR内容、合并冲突、发布消费与回滚记录" nodes={nodes} />; }
