import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "11. Databases and the Room Library",
  "Room Architecture Component Library",
  "Creating a Database",
  "Defining a Data Access Object",
  "Accessing the Database Using the Repository Pattern",
  "Testing Queries",
  "Application Threads",
  "Using LiveData",
  "Challenge: Addressing the Schema Warning",
  "For the More Curious: Singletons"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第11章 Databases and the Room Library" focus="从Entity、DAO、Database、Repository、线程和LiveData建立单一事实源" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第11章 Databases and the Room Library" focus="从Entity、DAO、Database、Repository、线程和LiveData建立单一事实源" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第11章 Databases and the Room Library" focus="Room模式、DAO测试、线程检查、schema导出与迁移证据" nodes={nodes} />; }
