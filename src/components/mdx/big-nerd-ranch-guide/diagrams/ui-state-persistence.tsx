import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "4. Persisting UI State",
  "Including the ViewModel Dependency",
  "Adding a ViewModel",
  "Saving Data Across Process Death",
  "ViewModel vs Saved Instance State",
  "For the More Curious: Jetpack, AndroidX, and Architecture Components",
  "For the More Curious: Avoiding a Half-Baked Solution"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第4章 Persisting UI State" focus="区分ViewModel跨配置存活与saved instance state跨进程恢复的不同合同" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第4章 Persisting UI State" focus="区分ViewModel跨配置存活与saved instance state跨进程恢复的不同合同" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第4章 Persisting UI State" focus="状态所有权表、旋转测试、进程死亡恢复测试和反例" nodes={nodes} />; }
