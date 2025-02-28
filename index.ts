import { parseArgs } from "util";
import { parseFile } from "@fast-csv/parse";

const { values, positionals } = parseArgs({
  args: Bun.argv,
  allowPositionals: true,
  options: {
    width: {
      type: "string",
    },
    include: {
      type: "string",
    },
  },
});

// TODO better handle different arg amounts (e.g. bun run)
const filename = positionals.at(-1);

if (!filename) {
  console.error("no file specified!");
  process.exit(1);
}

const width = parseInt(values.width ?? "99999", 10);
const include = values.include?.split(",");

const rows: any[] = [];
parseFile(filename, { headers: true })
  .on("error", (err) => console.error(err.message))
  .on("data", (row: object) => {
    const newRow = {};
    for (const field in row) {
      // include only specified fields
      if (!include || include.includes(field)) {
        const value = row[field];
        // truncate based on width flag
        newRow[field] = value.substring(0, width);
      }
    }
    rows.push(newRow);
  })
  .on("end", (rowCount: number) => {
    console.log(`parsed ${rowCount} rows`);
    console.log(Bun.inspect.table(rows));
  });
