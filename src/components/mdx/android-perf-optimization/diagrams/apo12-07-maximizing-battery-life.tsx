import { OfficialApo12BookLab } from "./official-apo12-book-lab";

const nodes = [
  "第7章 延长电池续航时间",
  "7.1 电池",
  "7.2 禁用广播接收器",
  "7.3 网络",
  "7.3.1 后台数据",
  "7.3.2 数据传输",
  "7.4 位置",
  "7.4.1 注销监听器",
  "7.4.2 更新频率",
  "7.4.3 多种位置服务",
  "7.4.4 筛选定位服务",
  "7.4.5 最后已知位置",
  "7.5 传感器",
  "7.6 图形",
  "7.7 提醒",
  "7.8 WakeLock",
  "7.9 总结"
];

export function Apo12PipelineLab() { return <OfficialApo12BookLab mode="pipeline" unitTitle="第7章 延长电池续航时间" focus="从电池计量、广播接收器、网络、位置、传感器、图形、提醒和WakeLock控制唤醒与无线电活动" nodes={nodes} />; }
export function Apo12ExperimentLab() { return <OfficialApo12BookLab mode="experiment" unitTitle="第7章 延长电池续航时间" focus="只减少CPU代码却频繁唤醒无线电、定位和传感器，或获取WakeLock后没有超时与finally释放" nodes={nodes} />; }
export function Apo12EvidenceLab() { return <OfficialApo12BookLab mode="evidence" unitTitle="第7章 延长电池续航时间" focus="电量基线、唤醒次数、传输批次、定位更新、传感器注销、图形负载、Alarm和WakeLock时长" nodes={nodes} />; }
