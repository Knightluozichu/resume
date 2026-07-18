import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "25. Loopers, Handlers, and HandlerThread",
  "Preparing RecyclerView to Display Images",
  "Preparing to Download Bytes from a URL",
  "Downloading Lots of Small Things",
  "Assembling a Background Thread",
  "Messages and Message Handlers",
  "Listening to the View Lifecycle",
  "Retained Fragments",
  "For the More Curious: Solving the Image Downloading Problem",
  "For the More Curious: StrictMode",
  "Challenge: Observing View LifecycleOwner LiveData",
  "Challenge: Improving ThumbnailDownloader's Lifecycle Awareness",
  "Challenge: Preloading and Caching"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第25章 Loopers, Handlers, and HandlerThread" focus="用MessageQueue、Looper、Handler和HandlerThread解释跨线程调度，并把下载器绑定到View生命周期" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第25章 Loopers, Handlers, and HandlerThread" focus="用MessageQueue、Looper、Handler和HandlerThread解释跨线程调度，并把下载器绑定到View生命周期" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第25章 Loopers, Handlers, and HandlerThread" focus="缩略图下载状态机、消息轨迹、取消与缓存测试、StrictMode报告" nodes={nodes} />; }
