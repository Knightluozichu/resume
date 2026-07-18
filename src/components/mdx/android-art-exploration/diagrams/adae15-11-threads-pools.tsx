import { OfficialAdae15BookLab } from "./official-adae15-book-lab";

const nodes = [
  "第11章 Android的线程和线程池",
  "11.1 主线程和子线程",
  "11.2 Android中的线程形态",
  "11.2.1 AsyncTask",
  "11.2.2 AsyncTask的工作原理",
  "11.2.3 HandlerThread",
  "11.2.4 IntentService",
  "11.3 Android中的线程池",
  "11.3.1 ThreadPoolExecutor",
  "11.3.2 线程池的分类"
];

export function AdaeFlowLab() { return <OfficialAdae15BookLab mode="flow" unitTitle="第11章 Android的线程和线程池" focus="比较主/子线程、AsyncTask、HandlerThread、IntentService与ThreadPoolExecutor，并按任务特征选择线程池" nodes={nodes} />; }
export function AdaeFailureLab() { return <OfficialAdae15BookLab mode="failure" unitTitle="第11章 Android的线程和线程池" focus="无限创建线程、无界排队或依赖已废弃AsyncTask/IntentService而不声明历史边界" nodes={nodes} />; }
export function AdaeEvidenceLab() { return <OfficialAdae15BookLab mode="evidence" unitTitle="第11章 Android的线程和线程池" focus="线程归属表、AsyncTask源码时序、串并行实验、线程池参数、拒绝策略和取消记录" nodes={nodes} />; }
