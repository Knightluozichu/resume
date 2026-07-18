import { JfsBookLab } from "./official-jfs-lab";

const nodes = [
  "冻结业务输入",
  "浏览器采集与校验",
  "发送 HTTP 请求",
  "Node 解析并执行业务",
  "事务化保存数据",
  "返回并更新界面",
] as const;

export function JfsOfficialFinalReviewMapLab() {
  return (
    <JfsBookLab
      title="《JavaScript 全栈开发》全书总复习 · 机制地图"
      label="JavaScript 全栈开发 · 总复习"
      nodes={nodes}
      mode="map"
    />
  );
}

export function JfsOfficialFinalReviewExperimentLab() {
  return (
    <JfsBookLab
      title="《JavaScript 全栈开发》全书总复习 · 边界实验"
      label="JavaScript 全栈开发 · 总复习"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function JfsOfficialFinalReviewEvidenceLab() {
  return (
    <JfsBookLab
      title="《JavaScript 全栈开发》全书总复习 · 恢复证据"
      label="JavaScript 全栈开发 · 总复习"
      nodes={nodes}
      mode="evidence"
    />
  );
}
