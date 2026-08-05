import { DEFAULT_MANIFEST_PATH, hasR2, loadConfig } from "./config.js";
import { runGenerate, runImport, runScan, runUpload } from "./core.js";
import { loadManifest } from "./manifest.js";
import { FORMATS } from "./types.js";

const log = (message: string): void => console.log(message);

const usage = `
SEA-KERS Image CMS

Usage:
  pnpm cms                  Launch the interactive TUI
  pnpm cms:scan             Register images from public/images into the manifest
  pnpm cms:upload           Encode (3 sizes x 3 formats) and upload every image to R2
  pnpm cms:upload --only-missing
  pnpm cms:generate         Regenerate the web app's imageRegistry.ts from the manifest
  pnpm cms import <path> [--collection <c>] [--id <id>] [--alt <alt>]
  pnpm cms status           Print config and manifest summary
`;

const parseFlags = (args: string[]): Record<string, string> => {
  const flags: Record<string, string> = {};
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const next = args[index + 1];
    if (next !== undefined && !next.startsWith("--")) {
      flags[key] = next;
      index += 1;
    } else {
      flags[key] = "true";
    }
  }
  return flags;
};

const printSummary = (summary: { total: number; uploaded: number; added: number; failed: number }): void => {
  log(`\n${summary.total} total · ${summary.uploaded} uploaded · ${summary.added} added · ${summary.failed} failed`);
};

async function main(): Promise<void> {
  const [command, ...rest] = process.argv.slice(2);
  const config = loadConfig();
  const manifestPath = process.env.SEA_KERS_MANIFEST_PATH || DEFAULT_MANIFEST_PATH;

  switch (command) {
    case undefined:
    case "tui": {
      const { launchTui } = await import("./index.js");
      launchTui();
      return;
    }
    case "scan": {
      const stats = await runScan(config, manifestPath, log);
      log(`\nscanned ${stats.total} files · ${stats.added} added · ${stats.updated} updated · ${stats.failed} failed · ${stats.pruned} pruned`);
      return;
    }
    case "upload": {
      const flags = parseFlags(rest);
      const summary = await runUpload(config, manifestPath, {
        onlyMissing: flags["only-missing"] === "true",
        concurrency: flags.concurrency ? Number(flags.concurrency) : 2,
      }, log);
      printSummary(summary);
      return;
    }
    case "import": {
      const target = rest[0];
      if (!target) {
        log("usage: pnpm cms import <path> [--collection <c>] [--id <id>] [--alt <alt>]");
        process.exitCode = 1;
        return;
      }
      const flags = parseFlags(rest.slice(1));
      const summary = await runImport(config, manifestPath, {
        path: target,
        collection: flags.collection,
        id: flags.id,
        alt: flags.alt,
      }, log);
      printSummary(summary);
      return;
    }
    case "generate": {
      await runGenerate(config, manifestPath, log);
      return;
    }
    case "status": {
      const manifest = loadManifest(manifestPath);
      const variants = manifest.images.reduce((count, image) => count + image.variants.length, 0);
      const uploaded = manifest.images.reduce(
        (count, image) => count + image.variants.filter((variant) => variant.uploadedAt).length,
        0,
      );
      log(`project:    ${config.projectPath}`);
      log(`registry:   ${config.projectPath}/${config.registryOut}`);
      log(`sourceRoot: ${config.projectPath}/${config.sourceRoot}`);
      log(`sizes:      ${config.sizes.map((size) => `${size.name} ${size.width}px`).join(", ")}`);
      log(`formats:    ${FORMATS.join(", ")}`);
      log(`qualities:  ${Object.entries(config.qualities).map(([format, q]) => `${format}@${q}`).join(", ")}`);
      log(`r2 account: ${config.r2.accountId || "(unset)"}`);
      log(`r2 bucket:  ${config.r2.bucketName || "(unset)"}`);
      log(`r2 url:     ${config.r2.publicUrl || "(unset)"}`);
      log(`r2 status:  ${hasR2(config) ? "configured" : "MISSING CREDENTIALS - set tools/cms/.env"}`);
      log(`manifest:   ${manifestPath}`);
      log(`images:     ${manifest.images.length}`);
      log(`variants:   ${uploaded}/${variants} uploaded`);
      return;
    }
    default:
      log(usage);
      if (command === "help" || command === "--help" || command === "-h") return;
      process.exitCode = 1;
  }
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
