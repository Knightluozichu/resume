import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第7章 Android启动过程简析",
  "7.1 第一个系统进程（init）",
  "7.1.1 init.rc语法",
  "7.1.2 init.rc实例分析",
  "7.2 系统关键服务的启动简析",
  "7.2.1 Android的DNS服务器——ServiceManager",
  "7.2.2 孕育新的线程和进程——Zygote",
  "7.2.3 Android的系统服务——SystemServer"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第7章 Android启动过程简析" focus="追踪init.rc、ServiceManager、Zygote与SystemServer的系统关键服务启动序列" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第7章 Android启动过程简析" focus="按日志时间猜启动因果，不核对init触发条件、进程父子关系和服务可用断点" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第7章 Android启动过程简析" focus="init动作与服务、进程PID、socket、Binder服务注册、zygote fork和SystemServer服务表" nodes={nodes}/>;}
