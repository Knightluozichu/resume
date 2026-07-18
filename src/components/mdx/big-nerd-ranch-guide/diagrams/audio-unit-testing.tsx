import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "20. Unit Testing and Audio Playback",
  "Creating a SoundPool",
  "Accessing Assets",
  "Loading Sounds",
  "Playing Sounds",
  "Test Dependencies",
  "Creating a Test Class",
  "Setting Up Your Test",
  "Writing Tests",
  "Data Binding Callbacks",
  "Unloading Sounds",
  "For the More Curious: Integration Testing",
  "For the More Curious: Mocks and Testing",
  "Challenge: Playback Speed Control",
  "Challenge: Play Sound Across Rotation"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第20章 Unit Testing and Audio Playback" focus="以SoundPool加载/播放/释放生命周期为被测边界，用测试替身核对对象交互和旋转行为" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第20章 Unit Testing and Audio Playback" focus="以SoundPool加载/播放/释放生命周期为被测边界，用测试替身核对对象交互和旋转行为" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第20章 Unit Testing and Audio Playback" focus="音频资源清单、SoundPool状态机、单元测试、mock交互与资源释放证据" nodes={nodes} />; }
