import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "1. Your First Android Application",
  "App Basics",
  "Creating an Android Project",
  "Navigating in Android Studio",
  "Laying Out the UI",
  "From Layout XML to View Objects",
  "Wiring Up Widgets",
  "Making Toasts",
  "Running on the Emulator",
  "For the More Curious: The Android Build Process",
  "Challenges",
  "Challenge: Customizing the Toast"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第1章 Your First Android Application" focus="从GeoQuiz最小切片理解资源、View对象、监听器、Toast、模拟器与构建产物" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第1章 Your First Android Application" focus="从GeoQuiz最小切片理解资源、View对象、监听器、Toast、模拟器与构建产物" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第1章 Your First Android Application" focus="可重放的GeoQuiz构建日志、资源映射、界面断言和APK" nodes={nodes} />; }
