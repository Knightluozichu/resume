import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第2章 Android源码下载及编译",
  "2.1 Android源码下载指南",
  "2.1.1 基于Repo和Git的版本管理",
  "2.1.2 Android源码下载流程",
  "2.2 原生态系统编译指南",
  "2.2.1 建立编译环境",
  "2.2.2 编译流程",
  "2.3 定制产品的编译与烧录",
  "2.3.1 定制新产品",
  "2.3.2 Linux内核编译",
  "2.3.3 烧录",
  "2.4 Android系统映像文件",
  "2.4.1 boot.img",
  "2.4.2 ramdisk.img",
  "2.4.3 system.img",
  "2.5 OTA系统升级",
  "2.5.1 生成升级包",
  "2.5.2 获取升级包",
  "2.5.3 OTA升级—Recovery Mode",
  "2.6 Android反编译"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第2章 Android源码下载及编译" focus="贯通Repo/Git下载、原生与定制产品编译、内核、烧录、系统映像、OTA和反编译" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第2章 Android源码下载及编译" focus="跨分支下载源码和预编译件后仍宣称构建可复现，或烧录前不保存设备与回退映像" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第2章 Android源码下载及编译" focus="manifest与标签、构建环境、产物哈希、boot/ramdisk/system解包、升级签名与烧录日志" nodes={nodes}/>;}
