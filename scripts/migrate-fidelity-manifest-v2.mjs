#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const manifestPath = path.resolve("quality/fidelity-manifests.json");
const document = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

function inferSourceAccess(sourceKind = "") {
  const kind = sourceKind.toLocaleLowerCase();
  if (
    /full-text|full-online|open-book|open-access-pdf|downloadable-full-pdf|complete-web-book/.test(
      kind,
    )
  ) {
    return "full-text-primary";
  }
  if (/sample|preview/.test(kind)) return "authorized-sample";
  if (kind) return "outline-only";
  return "secondary-only";
}

const AUTO_FACT_SOURCES = {
  "doe-ice": {
    title: "Internal Combustion Engine Basics",
    publisher: "U.S. Department of Energy",
    url: "https://www.energy.gov/cmei/vehicles/articles/internal-combustion-engine-basics",
  },
  "doe-lightweight": {
    title: "Lightweight and Propulsion Materials",
    publisher: "U.S. Department of Energy",
    url: "https://www.energy.gov/eere/vehicles/lightweight-and-propulsion-materials",
  },
  "nhtsa-crashworthiness": {
    title: "Crashworthiness",
    publisher: "NHTSA",
    url: "https://www.nhtsa.gov/research-data/crashworthiness",
  },
  "nhtsa-tests": {
    title: "Vehicle Test Procedures",
    publisher: "NHTSA",
    url: "https://www.nhtsa.gov/vehicle-manufacturers/test-procedures",
  },
  "nhtsa-tires": {
    title: "Tire Safety Ratings and Awareness",
    publisher: "NHTSA",
    url: "https://www.nhtsa.gov/vehicle-safety/tires",
  },
  "nhtsa-adas": {
    title: "Driver Assistance Technologies",
    publisher: "NHTSA",
    url: "https://www.nhtsa.gov/vehicle-safety/driver-assistance-technologies",
  },
  "bosch-motion": {
    title: "Vehicle Motion Management",
    publisher: "Bosch Mobility",
    url: "https://www.bosch-mobility.com/en/solutions/software-and-services/vehicle-motion-management/",
  },
  "bosch-brake": {
    title: "Brake-by-wire operating principle",
    publisher: "Bosch Mobility",
    url: "https://www.bosch-mobility.com/en/solutions/driving-safety/brake-by-wire/",
  },
  "afdc-hybrid": {
    title: "How Do Hybrid Electric Cars Work?",
    publisher: "U.S. Department of Energy AFDC",
    url: "https://afdc.energy.gov/vehicles/how-do-hybrid-electric-cars-work",
  },
  "afdc-electric": {
    title: "How Do All-Electric Cars Work?",
    publisher: "U.S. Department of Energy AFDC",
    url: "https://afdc.energy.gov/vehicles/how-do-all-electric-cars-work",
  },
  "toyota-assembly": {
    title: "Vehicles: Assembly",
    publisher: "Toyota Motor Corporation",
    url: "https://www.toyota-global.com/company/history_of_toyota/75years/data/automotive_business/production/production_engineering/vehicles/assembly/index.html",
  },
};

const AUTO_UNIT_SOURCE_REFS = [
  ["doe-ice", "bosch-motion"],
  ["doe-lightweight", "nhtsa-crashworthiness"],
  ["doe-ice"],
  ["doe-ice", "afdc-hybrid"],
  ["doe-ice", "bosch-motion"],
  ["bosch-motion", "nhtsa-tests"],
  ["bosch-motion", "nhtsa-tests"],
  ["bosch-brake", "nhtsa-tests"],
  ["nhtsa-adas", "bosch-motion"],
  ["nhtsa-tires", "nhtsa-tests"],
  ["afdc-hybrid", "afdc-electric"],
  ["toyota-assembly", "nhtsa-tests"],
];

document.version = 2;
for (const [bookSlug, book] of Object.entries(document.books)) {
  book.sourceAccess = book.sourceAccess ?? inferSourceAccess(book.sourceKind);
  book.defaultSourceMode =
    book.defaultSourceMode ??
    (bookSlug === "learnopengl"
      ? "licensed-adaptation"
      : "independent-rewrite");
  book.unitMappingEvidence =
    book.unitMappingEvidence ?? "quality/remediation-ledger.json";
  book.factSourcePolicy =
    book.factSourcePolicy ??
    (book.sourceAccess === "full-text-primary"
      ? "以可访问的一手正文核对范围与事实；章节仍须逐项记录引用。"
      : "目录只限定范围；技术事实必须由作者资料、官方文档、标准或厂商资料独立核对。无法核对时标记 blocked。");
  if (bookSlug === "learnopengl") {
    book.license = book.license ?? {
      name: "CC BY-NC 4.0",
      url: "https://creativecommons.org/licenses/by-nc/4.0/",
    };
  }
  if (bookSlug === "auto-why-car-runs") {
    book.factSources = AUTO_FACT_SOURCES;
    book.factSourcesVerifiedAt = "2026-07-18";
    book.units.forEach((unit, index) => {
      unit.factSourceRefs = AUTO_UNIT_SOURCE_REFS[index];
    });
  }
}

fs.writeFileSync(manifestPath, `${JSON.stringify(document, null, 2)}\n`);
