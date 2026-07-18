import { OfficialCra4BookLab } from "./official-cra4-book-lab";

const nodes = [
  "第5章 使用Intent和IntentFilter通信",
  "5.1 Intent对象简述",
  "5.2 Intent的属性及intent-filter配置",
  "5.2.1 Component属性",
  "5.2.2 Action、Category属性与intent-filter配置",
  "5.2.3 指定Action、Category调用系统Activity",
  "实例：查看并获取联系人电话",
  "实例：返回系统Home桌面",
  "5.2.4 Data、Type属性与intent-filter配置",
  "实例：使用Action、Data属性启动系统Activity",
  "5.2.5 Extra属性",
  "5.2.6 Flag属性",
  "5.3 本章小结"
];

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="第5章 使用Intent和IntentFilter通信" focus="以Component、Action、Category、Data、Type、Extra和Flag建立显式与隐式通信合同" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="第5章 使用Intent和IntentFilter通信" focus="以Component、Action、Category、Data、Type、Extra和Flag建立显式与隐式通信合同" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="第5章 使用Intent和IntentFilter通信" focus="Intent匹配表、URI/MIME样例、权限核对、无响应者降级和返回栈轨迹" nodes={nodes} />; }
