import { UnityNetworkEvidenceLab } from "./official-unity-network-lab";

const nodes = [
  "冻结三大功能",
  "整理模型层级",
  "集中资源实例化",
  "实现移动爬坡相机",
  "拆分开火受击死亡",
  "物理边界后签发",
] as const;

export function Umm08TankBattleProjectMapLab() {
  return (
    <UnityNetworkEvidenceLab
      title="第8章 完整大项目《坦克大战》"
      label="第8章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Umm08TankBattleProjectExperimentLab() {
  return (
    <UnityNetworkEvidenceLab
      title="正常、边界与失败样本"
      label="第8章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Umm08TankBattleProjectEvidenceLab() {
  return (
    <UnityNetworkEvidenceLab
      title="双端证据与阶段门"
      label="第8章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
