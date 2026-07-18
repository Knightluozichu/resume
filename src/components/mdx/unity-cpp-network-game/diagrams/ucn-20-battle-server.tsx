import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "启动战场框架",
  "生成双端协议数据",
  "运行聊天与战斗",
  "同步人员车辆飞行器",
  "监控资源并驱动AI",
  "双端调试后签发",
] as const;

export function Ucn20BattleServerMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第20章 开发战场服务器BattleServer"
      label="第4篇 C++网络开发实战（服务器）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn20BattleServerExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第20章 开发战场服务器BattleServer"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn20BattleServerEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第20章 开发战场服务器BattleServer"
      nodes={nodes}
      mode="evidence"
    />
  );
}
