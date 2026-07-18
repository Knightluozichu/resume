import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "26. SearchView and SharedPreferences",
  "Searching Flickr",
  "Using SearchView",
  "Simple Persistence with SharedPreferences",
  "Polishing Your App",
  "Editing SharedPreferences with Android KTX",
  "Challenge: Polishing Your App Some More"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第26章 SearchView and SharedPreferences" focus="把SearchView事件、查询持久化和Android KTX编辑连接成可恢复搜索体验" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第26章 SearchView and SharedPreferences" focus="把SearchView事件、查询持久化和Android KTX编辑连接成可恢复搜索体验" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第26章 SearchView and SharedPreferences" focus="查询状态表、SharedPreferences读写、进程恢复与界面打磨检查" nodes={nodes} />; }
