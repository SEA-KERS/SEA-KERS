import React, { useEffect, useState } from "react";
import { Box, Text, useInput } from "ink";
import TextInput from "ink-text-input";
import type { CmsConfig, Manifest } from "../../types.js";
import { runImport, type ImportInput } from "../../core.js";
import { hasR2 } from "../../config.js";

interface Props {
  config: CmsConfig;
  manifest: Manifest;
  manifestPath: string;
  refresh: () => void;
}

type Step = "path" | "collection" | "id" | "alt";

const STEP_ORDER: readonly Step[] = ["path", "collection", "id", "alt"];
const FIELD_LABEL: Record<Step, string> = {
  path: "Image file or folder to import",
  collection: "Collection (e.g. wins, team, hero)",
  id: "ID (optional - defaults to the file path, ignored for folders)",
  alt: "Alt text (optional)",
};

const EMPTY_VALUES: Record<Step, string> = { path: "", collection: "", id: "", alt: "" };

export function ImportScreen({ config, manifest, manifestPath, refresh }: Props) {
  const [step, setStep] = useState<Step>("path");
  const [values, setValues] = useState<Record<Step, string>>(EMPTY_VALUES);
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  if (running) {
    return (
      <ImportRunner
        config={config}
        manifestPath={manifestPath}
        input={{ path: values.path, collection: values.collection, id: values.id, alt: values.alt }}
        logs={logs}
        onLog={(message) => setLogs((current) => [...current, message])}
        onDone={() => {
          setRunning(false);
          setValues(EMPTY_VALUES);
          setLogs([]);
          setStep("path");
          refresh();
        }}
      />
    );
  }

  const submit = () => {
    if (step === "path" && !values.path.trim()) return;
    const index = STEP_ORDER.indexOf(step);
    if (index < STEP_ORDER.length - 1) setStep(STEP_ORDER[index + 1]);
    else {
      setLogs([]);
      setRunning(true);
    }
  };

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">
        Import
      </Text>
      <Text dimColor>
        Step {STEP_ORDER.indexOf(step) + 1}/{STEP_ORDER.length} - {FIELD_LABEL[step]}
      </Text>
      <TextInput
        value={values[step]}
        onChange={(value) => setValues((current) => ({ ...current, [step]: value }))}
        onSubmit={submit}
        placeholder={step === "path" ? "C:\\path\\to\\image.jpg or folder" : step === "collection" ? "wins" : ""}
      />
      <Box marginTop={1} flexDirection="column">
        <Text dimColor>
          R2: {hasR2(config) ? "configured - uploads happen on import" : "not configured - registered locally, run `pnpm cms:upload` later"}
        </Text>
        <Text dimColor>Enter confirms each field, then the 9-variant pipeline runs per image.</Text>
        {manifest.images.length > 0 ? (
          <Text dimColor>
            {manifest.images.length} images already registered ({config.sizes.length} sizes x 3 formats each).
          </Text>
        ) : null}
      </Box>
    </Box>
  );
}

function ImportRunner({
  config,
  manifestPath,
  input,
  logs,
  onLog,
  onDone,
}: {
  config: CmsConfig;
  manifestPath: string;
  input: ImportInput;
  logs: string[];
  onLog: (message: string) => void;
  onDone: () => void;
}) {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        await runImport(config, manifestPath, input, (message) => {
          if (!cancelled) onLog(message);
        });
        if (!cancelled) onLog("Done. Press Enter to continue.");
      } catch (error) {
        if (!cancelled) onLog(`Error: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        if (!cancelled) setFinished(true);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInput((_input, key) => {
    if (key.return && finished) onDone();
  });

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">
        Importing...
      </Text>
      {logs.slice(-15).map((line, index) => (
        <Text key={index}>{line}</Text>
      ))}
      <Text dimColor>{finished ? "Press Enter to continue." : "Working..."}</Text>
    </Box>
  );
}
