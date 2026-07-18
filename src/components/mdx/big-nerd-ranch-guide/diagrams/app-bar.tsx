import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "14. The App Bar",
  "AppCompat Default App Bar",
  "Menus",
  "Using the Android Asset Studio",
  "For the More Curious: App Bar vs Action Bar vs Toolbar",
  "For the More Curious: Accessing the AppCompat App Bar",
  "Challenge: An Empty View for the RecyclerView"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第14章 The App Bar" focus="解释AppCompat应用栏、菜单资源、选择回调和Asset Studio在导航与动作层的边界" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第14章 The App Bar" focus="解释AppCompat应用栏、菜单资源、选择回调和Asset Studio在导航与动作层的边界" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第14章 The App Bar" focus="菜单状态表、图标资源、空列表视图与配置变化测试" nodes={nodes} />; }
