import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "Allocating Scarce Resources",
  "Classifying Auctions",
  "Auctions for Single Items",
  "English auctions",
  "Dutch auctions",
  "First-price sealed-bid auctions",
] as const;

export function Mas14AllocatingScarceResourcesModelLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 14 Allocating Scarce Resources"
      concepts={concepts}
      accent="#b45309"
      view="pipeline"
    />
  );
}

export function Mas14AllocatingScarceResourcesGameLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 14 Allocating Scarce Resources"
      concepts={concepts}
      accent="#b45309"
      view="training"
    />
  );
}

export function Mas14AllocatingScarceResourcesEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 14 Allocating Scarce Resources"
      concepts={concepts}
      accent="#b45309"
      view="evidence"
    />
  );
}
