import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "9. Displaying Lists with RecyclerView",
  "Adding a New Fragment and ViewModel",
  "Adding a RecyclerView",
  "Creating an Item View Layout",
  "Implementing a ViewHolder",
  "Implementing an Adapter to Populate the RecyclerView",
  "Recycling Views",
  "Cleaning Up Binding List Items",
  "Responding to Presses",
  "For the More Curious: ListView and GridView",
  "Challenge: RecyclerView ViewTypes"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第9章 Displaying Lists with RecyclerView" focus="把数据、Adapter、ViewHolder、item view和回收过程连接为可测列表流水线" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第9章 Displaying Lists with RecyclerView" focus="把数据、Adapter、ViewHolder、item view和回收过程连接为可测列表流水线" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第9章 Displaying Lists with RecyclerView" focus="列表绑定轨迹、回收验证、点击合同与多ViewType挑战" nodes={nodes} />; }
