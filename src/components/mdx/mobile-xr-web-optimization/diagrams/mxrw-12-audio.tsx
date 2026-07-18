import { MobileXrWebEvidenceLab } from "./official-mobile-xr-web-lab";

const nodes = [
  "WAV源文件",
  "平台导入",
  "Load Type",
  "运行播放",
  "内存CPU",
  "听感签发",
] as const;

export function Mxrw12AudioMapLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单元12：Audio导入、加载与采样率优化"
      label="官方单元 12"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Mxrw12AudioExperimentLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单元12：Audio导入、加载与采样率优化"
      label="官方单元 12"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Mxrw12AudioEvidenceLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单元12：Audio导入、加载与采样率优化"
      label="官方单元 12"
      nodes={nodes}
      mode="evidence"
    />
  );
}
