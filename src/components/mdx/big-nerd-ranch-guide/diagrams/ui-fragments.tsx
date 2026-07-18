import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "8. UI Fragments and the Fragment Manager",
  "The Need for UI Flexibility",
  "Introducing Fragments",
  "Starting CriminalIntent",
  "Creating a Data Class",
  "Creating a UI Fragment",
  "Hosting a UI Fragment",
  "Application Architecture with Fragments"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第8章 UI Fragments and the Fragment Manager" focus="建立Activity宿主、FragmentManager、事务及Fragment视图生命周期的所有权图" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第8章 UI Fragments and the Fragment Manager" focus="建立Activity宿主、FragmentManager、事务及Fragment视图生命周期的所有权图" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第8章 UI Fragments and the Fragment Manager" focus="CriminalIntent骨架、Fragment事务轨迹、重建与泄漏测试" nodes={nodes} />; }
