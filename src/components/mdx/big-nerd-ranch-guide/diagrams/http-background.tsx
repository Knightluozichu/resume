import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "24. HTTP and Background Tasks",
  "Creating PhotoGallery",
  "Networking Basics with Retrofit",
  "Fetching JSON from Flickr",
  "Networking Across Configuration Changes",
  "Displaying Results in RecyclerView",
  "For the More Curious: Alternate Parsers and Data Formats",
  "For the More Curious: Canceling Requests",
  "For the More Curious: Managing Dependencies",
  "Challenge: Adding a Custom Gson Deserializer",
  "Challenge: Paging",
  "Challenge: Dynamically Adjusting the Number of Columns"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第24章 HTTP and Background Tasks" focus="以Retrofit合同、JSON反序列化、Repository、配置变化和列表呈现形成可取消网络切片" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第24章 HTTP and Background Tasks" focus="以Retrofit合同、JSON反序列化、Repository、配置变化和列表呈现形成可取消网络切片" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第24章 HTTP and Background Tasks" focus="PhotoGallery请求记录、解析测试、旋转取消、分页和列数适配证据" nodes={nodes} />; }
