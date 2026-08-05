import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import type { CmsConfig, Manifest } from "../../types.js";
import { runGenerate } from "../../core.js";
import { hasR2 } from "../../config.js";

interface Props {
  config: CmsConfig;
  manifest: Manifest;
  manifestPath: string;
}

export function GenerateScreen({ config, manifest, manifestPath }: Props) {
  const [notice, setNotice] = useState("");

  const variants = manifest.images.reduce((count, image) => count + image.variants.length, 0);
  const uploaded = manifest.images.reduce(
    (count, image) => count + image.variants.filter((variant) => variant.uploadedAt).length,
    0,
  );

  useInput((input) => {
    if (input === "g") {
      setNotice("regenerating...");
      void runGenerate(config, manifestPath, setNotice);
    }
  });

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">
        Generate registry
      </Text>
      <Text dimColor>
        {manifest.images.length} images · {uploaded}/{variants} variants uploaded
      </Text>
      <Text dimColor>R2: {hasR2(config) ? "configured" : "not configured"}</Text>
      <Text dimColor>output: {config.projectPath}/{config.registryOut}</Text>
      <Box marginTop={1} flexDirection="column">
        <Text>Press [g] to regenerate src/data/imageRegistry.ts from the manifest.</Text>
        <Text dimColor>
          The generated file drives the ResponsiveImage component: uploaded variants use R2, others fall
          back to the local path until they are uploaded.
        </Text>
        {notice ? <Text color="yellow">{notice}</Text> : null}
      </Box>
    </Box>
  );
}
