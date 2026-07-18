import { OfficialCra4BookLab } from "./official-cra4-book-lab";

const nodes = [
  "第16章 GPS应用开发",
  "16.1 支持GPS的核心API",
  "16.2 获取LocationProvider",
  "16.2.1 获取所有可用的LocationProvider",
  "16.2.2 通过名称获得指定LocationProvider",
  "16.3 获取定位信息",
  "16.3.1 通过模拟器发送GPS信息",
  "16.3.2 获取定位数据",
  "16.3.3 Android 9新增的室内Wi-Fi定位",
  "16.4 临近警告",
  "16.5 本章小结"
];

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="第16章 GPS应用开发" focus="选择LocationProvider、申请定位权限、接收位置与室内Wi-Fi结果，并验证临近警告" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="第16章 GPS应用开发" focus="选择LocationProvider、申请定位权限、接收位置与室内Wi-Fi结果，并验证临近警告" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="第16章 GPS应用开发" focus="Provider选择、权限路径、位置样本、精度时效、临近事件和降级测试" nodes={nodes} />; }
