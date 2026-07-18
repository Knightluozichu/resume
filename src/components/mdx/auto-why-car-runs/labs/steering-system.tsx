"use client";

import { SteeringLab as SteeringLabCore } from "../../auto/why-car-runs-lab";
import { withChapterReset } from "./chapter-lab-frame";

export const SteeringLab = withChapterReset(SteeringLabCore);
