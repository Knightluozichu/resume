import { OfficialDdiaLab } from "./official-ddia-lab";

const config = {
  unitTitle: "第9章 一致性与共识",
  focus:
    "用线性一致、因果与全序广播描述可见顺序，再理解原子提交、共识与成员协调",
  invariant:
    "决定满足顺序与唯一性，任期和提交证据可追溯，少数故障不产生两个已提交事实",
  artifact: "历史检查、因果图、共识日志、成员变更与提交恢复记录",
  nodes: [
    "一致性保证",
    "线性一致性",
    "什么使系统线性一致",
    "依赖线性一致性",
    "实现线性一致系统",
    "线性一致性的代价",
    "顺序保证",
    "顺序与因果关系",
    "序列号排序",
    "全序广播",
    "分布式事务与共识",
    "原子提交与两阶段提交",
    "实践中的分布式事务",
    "容错共识",
    "成员与协调服务",
    "小结",
  ],
};

export function Ddi09ConsistencyConsensusArchitectureLab() {
  return <OfficialDdiaLab {...config} mode="architecture" />;
}

export function Ddi09ConsistencyConsensusFailureLab() {
  return <OfficialDdiaLab {...config} mode="failure" />;
}

export function Ddi09ConsistencyConsensusEvidenceLab() {
  return <OfficialDdiaLab {...config} mode="evidence" />;
}
