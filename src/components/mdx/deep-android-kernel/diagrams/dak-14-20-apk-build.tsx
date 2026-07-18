import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第20章 Android应用程序的编译和打包",
  "20.1 另辟蹊径采用第三方工具——Ant",
  "20.2 通过命令行编译和打包APK",
  "20.3 APK编译过程详解",
  "20.4 信息安全基础概述",
  "20.5 应用程序签名",
  "20.6 应用程序签名源码简析"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第20章 Android应用程序的编译和打包" focus="从Ant与命令行编译追踪APK产物、信息安全、签名和验签源码" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第20章 Android应用程序的编译和打包" focus="把签名理解成给APK加密，或修改包后只重新压缩却不验证证书与摘要" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第20章 Android应用程序的编译和打包" focus="资源与字节码产物、ZIP结构、证书、公私钥、摘要、签名块和安装验证失败" nodes={nodes}/>;}
