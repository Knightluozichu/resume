import { OfficialCra4BookLab } from "./official-cra4-book-lab";

const nodes = [
  "第17章 整合高德Map服务",
  "17.1 调用高德Map服务",
  "17.1.1 获取Map API Key",
  "17.1.2 高德地图入门",
  "17.2 根据GPS信息在地图上定位",
  "17.3 实际定位",
  "17.3.1 地址解析与反向地址解析",
  "17.3.2 根据地址执行定位",
  "17.4 GPS导航",
  "17.5 本章小结"
];

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="第17章 整合高德Map服务" focus="获取高德Map API Key，把GPS、地图覆盖物、地址/反向地址解析和导航串成定位应用" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="第17章 整合高德Map服务" focus="获取高德Map API Key，把GPS、地图覆盖物、地址/反向地址解析和导航串成定位应用" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="第17章 整合高德Map服务" focus="Key与包签名配置、地图定位轨迹、地理编码结果、网络失败和密钥保护检查" nodes={nodes} />; }
