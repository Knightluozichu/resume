import { compile } from "@mdx-js/mdx";
import remarkMath from "remark-math";

const mdx = 'Hello $\\sum_{k}$ world {notvar}';

const compiled = await compile(mdx, {
  jsx: false,
  remarkPlugins: [remarkMath],
});

const code = String(compiled);
console.log("--- Compiled code ---");
console.log(code);
console.log("--- Checking for 'k' references ---");
if (code.includes(' k ') || code.includes(' k,') || code.includes(' k]') || code.includes(',k,')) {
  console.log("WARNING: 'k' is referenced as a variable!");
} else {
  console.log("OK: 'k' is not referenced as a variable");
}
