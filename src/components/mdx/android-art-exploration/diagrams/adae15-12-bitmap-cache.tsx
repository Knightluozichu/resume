import { OfficialAdae15BookLab } from "./official-adae15-book-lab";

const nodes = [
  "第12章 Bitmap的加载和Cache",
  "12.1 Bitmap的高效加载",
  "12.2 Android中的缓存策略",
  "12.2.1 LruCache",
  "12.2.2 DiskLruCache",
  "12.2.3 ImageLoader的实现",
  "12.3 ImageLoader的使用",
  "12.3.1 照片墙效果",
  "12.3.2 优化列表的卡顿现象"
];

export function AdaeFlowLab() { return <OfficialAdae15BookLab mode="flow" unitTitle="第12章 Bitmap的加载和Cache" focus="按目标尺寸采样加载Bitmap，组合LruCache、DiskLruCache和ImageLoader，并解决照片墙列表卡顿" nodes={nodes} />; }
export function AdaeFailureLab() { return <OfficialAdae15BookLab mode="failure" unitTitle="第12章 Bitmap的加载和Cache" focus="按原尺寸解码大图、在主线程读磁盘，或让错位的异步结果覆盖复用列表项" nodes={nodes} />; }
export function AdaeEvidenceLab() { return <OfficialAdae15BookLab mode="evidence" unitTitle="第12章 Bitmap的加载和Cache" focus="采样计算、内存预算、缓存命中轨迹、并发去重、滚动帧时间和回收测试" nodes={nodes} />; }
