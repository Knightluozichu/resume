import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第21章 软件版本管理",
  "21.1 版本管理简述",
  "21.2 Git的安装",
  "21.2.1 Linux环境下安装Git",
  "21.2.2 Windows环境下安装Git",
  "21.3 Git的使用",
  "21.3.1 基础配置",
  "21.3.2 新建仓库",
  "21.3.3 文件状态",
  "21.3.4 忽略某些文件",
  "21.3.5 提交更新",
  "21.3.6 其他命令",
  "21.4 Git原理简析",
  "21.4.1 分布式版本系统的特点",
  "21.4.2 安全散列算法——SHA-1",
  "21.4.3 四个重要对象",
  "21.4.4 三个区域",
  "21.4.5 分支的概念与实例"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第21章 软件版本管理" focus="从Git安装和日常操作进入SHA-1、对象、三个区域与分支内部模型" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第21章 软件版本管理" focus="把Git当作文件备份工具，不理解对象不可变性、索引区和分支引用" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第21章 软件版本管理" focus="提交图、对象哈希、工作区/索引/仓库、分支引用、忽略规则和恢复演练" nodes={nodes}/>;}
