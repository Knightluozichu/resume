import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-03-06",
  title: "3.6 后端风云",
  family: "data",
  nodes: ["请求入口", "缓存命中", "选择分片", "读写副本", "故障转移"],
  concepts: [
    "3.6 后端风云",
    "数据库老头儿",
    "危机",
    "党委扩大会议",
    "分家",
    "Redis",
    "余数算法",
    "一致性Hash算法",
    "Hash槽 （Hash Slot）",
    "故障转移",
    "高可用的Nginx",
    "高可用的Tomcat",
    "数据库的读写分离",
  ],
  mechanism:
    "后端扩展需要分别处理缓存、分片、副本、负载均衡和故障转移；一致性哈希减少节点变化时的键迁移，却不自动解决副本一致性",
  success: "3.6 后端风云 的输入、机制、输出与复位轨迹一致",
  failure:
    "3.6 后端风云 在“扩容时直接改变取模分母，绝大多数键重新映射并造成缓存穿透或数据找不到”处拒绝",
} as const;

export function Crv18Section0306Lab() {
  return <CoderMechanismLab {...profile} />;
}
