import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "12. Fragment Navigation",
  "Single Activity: Fragment Boss",
  "Fragment Arguments",
  "Using LiveData Transformations",
  "Updating the Database",
  "For the More Curious: Why Use Fragment Arguments?",
  "For the More Curious: Navigation Architecture Component Library",
  "Challenge: Efficient RecyclerView Reloading"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第12章 Fragment Navigation" focus="让单Activity拥有导航，以Fragment arguments表达稳定输入，以LiveData转换和数据库更新表达状态流" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第12章 Fragment Navigation" focus="让单Activity拥有导航，以Fragment arguments表达稳定输入，以LiveData转换和数据库更新表达状态流" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第12章 Fragment Navigation" focus="导航栈、argument合同、数据库写入生命周期和差量刷新测试" nodes={nodes} />; }
