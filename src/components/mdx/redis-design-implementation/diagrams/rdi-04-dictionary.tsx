import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第4章 字典",
  focus: "追踪dict、dictht和dictEntry的哈希、冲突链、双表rehash与渐进迁移",
  invariant:
    "迁移期间查找覆盖两张表，rehashidx单调推进，键只存在于正确位置且负载因子受控",
  artifact: "双哈希表图、冲突链样本、渐进rehash轨迹与负载测试",
  nodes: [
    "字典的实现",
    "哈希算法",
    "解决键冲突",
    "rehash",
    "渐进式rehash",
    "字典API",
    "重点回顾",
  ],
};

export function Rdi04DictionaryStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi04DictionaryTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi04DictionaryEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
