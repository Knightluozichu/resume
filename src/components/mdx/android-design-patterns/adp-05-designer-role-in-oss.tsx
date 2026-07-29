"use client";

import { AndroidArchitectureLab } from "./android-architecture-lab";

const stages = [
  {
    label: "减少选择",
    owner: "维护者给出少量一致路径，让贡献者先解决产品问题。",
    flow: "角色分包、统一绑定方式和导航入口降低搜索空间。",
    failure: "让新贡献者完成同类页面，记录首次提交耗时。",
  },
  {
    label: "数据边界",
    owner: "Repository 隐藏来源差异，ViewModel 只接收领域结果。",
    flow: "远端或缓存 → Repository → ViewModel → 绑定层。",
    failure: "断网并返回旧缓存，验证错误与数据是否可区分。",
  },
  {
    label: "适度抽象",
    owner: "UseCase 只有在复用或业务规则复杂时才增加。",
    flow: "先画真实调用，再依据重复与变化频率抽取层次。",
    failure: "移除一层后若测试和协作没有变差，就不应保留。",
  },
] as const;

export function Adp05DesignerRoleInOssLab() {
  return (
    <AndroidArchitectureLab
      title="为不同经验的贡献者设计护栏"
      question="OSS 中的好架构为什么也要控制抽象数量？"
      stages={stages}
    />
  );
}
