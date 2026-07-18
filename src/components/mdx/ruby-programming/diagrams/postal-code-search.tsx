"use client";

import { RubyOfficialLab } from "./official-lab";

const sourceCases = [
  { label: "Acquire", fields: [["Input", "Official versioned URL/file"], ["Output", "Raw archive/CSV plus metadata"], ["Boundary", "Timeout, size, checksum, license"]] },
  { label: "Decode", fields: [["Input", "Raw bytes and declared encoding"], ["Output", "Strict UTF-8 text"], ["Boundary", "Invalid rows quarantined, not silently replaced"]] },
  { label: "Parse CSV", fields: [["Input", "Text stream"], ["Output", "Rows respecting quotes/newlines"], ["Boundary", "Headers/column count/type validation"]] },
  { label: "Normalize", fields: [["Input", "Validated row fields"], ["Output", "Canonical postal/name/search keys"], ["Boundary", "Preserve original display text and source row"]] },
] as const;

const importCases = [
  { label: "Schema", fields: [["Table", "postal_codes plus metadata"], ["Keys", "Source id/version and normalized fields"], ["Boundary", "Not every postal code is globally unique"]] },
  { label: "Index", fields: [["Target", "Exact postal and search columns"], ["Evidence", "EXPLAIN QUERY PLAN / benchmark"], ["Cost", "Write/storage overhead"]] },
  { label: "Transaction", fields: [["Flow", "Begin -> prepared inserts -> validate -> commit"], ["Failure", "Rollback leaves previous version intact"], ["Use", "Bulk import speed and atomicity"]] },
  { label: "Swap", fields: [["Flow", "Build new DB/table -> verify -> atomic activate"], ["Evidence", "Row counts/checksum/version"], ["Boundary", "Readers never observe partial import"]] },
] as const;

const queryCases = [
  { label: "Exact", fields: [["Input", "Canonical postal code"], ["SQL", "WHERE postal_code = ?"], ["Result", "Zero, one, or multiple rows by schema"]] },
  { label: "Prefix", fields: [["Input", "Validated prefix"], ["SQL", "Range/LIKE with escaped pattern"], ["Boundary", "Limit and stable order"]] },
  { label: "Name", fields: [["Input", "Normalized locality text"], ["SQL", "Indexed/FTS search strategy"], ["Boundary", "Normalization, ranking, ambiguity"]] },
  { label: "No result", fields: [["Input", "Valid query with no rows"], ["Result", "Empty result, not database error"], ["Output", "Stable schema/status and suggestions"]], alert: "SQL placeholders protect values, but table/column/order identifiers still require fixed allowlists." },
] as const;

export function RubyPostalSourceLab() {
  return <RubyOfficialLab cases={sourceCases} caption="Acquisition, decoding, CSV parsing, and normalization preserve source evidence while producing canonical rows." tone="cyan" />;
}

export function RubyPostalImportLab() {
  return <RubyOfficialLab cases={importCases} caption="Schema, indexes, transaction, and verified activation make a bulk import atomic and queryable." tone="violet" />;
}

export function RubyPostalQueryLab() {
  return <RubyOfficialLab cases={queryCases} caption="Exact, prefix, name, and empty-result queries require parameterization, limits, deterministic order, and ambiguity policy." tone="amber" />;
}
