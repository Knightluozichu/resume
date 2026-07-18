import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第16章 Android字符编码格式",
  "16.1 字符编码格式背景",
  "16.2 ISO/IEC 8859",
  "16.3 ISO/IEC 10646",
  "16.4 Unicode",
  "16.5 String类型",
  "16.5.1 构建String",
  "16.5.2 String对多种编码的兼容"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第16章 Android字符编码格式" focus="从8859、10646、Unicode进入String构建和多编码兼容" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第16章 Android字符编码格式" focus="把字符、UTF-16代码单元和UTF-8字节混为一谈，用默认编码跨系统传输" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第16章 Android字符编码格式" focus="码点、代码单元、字节序列、解码错误、JNI边界、文件与网络往返样本" nodes={nodes}/>;}
