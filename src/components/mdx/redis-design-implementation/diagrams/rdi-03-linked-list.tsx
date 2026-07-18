import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第3章 链表",
  focus: "沿listNode双向指针和list头尾、长度、复制与释放函数指针理解通用链表",
  invariant:
    "头尾、前后指针和长度在插入删除后相互一致，节点所有权与释放回调明确",
  artifact: "链表拓扑图、插删指针轨迹、复杂度表与结构断言",
  nodes: ["链表和链表节点的实现", "链表和链表节点的API", "重点回顾"],
};

export function Rdi03LinkedListStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi03LinkedListTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi03LinkedListEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
