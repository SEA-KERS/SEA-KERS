import React from "react";
import { Box, Text } from "ink";
import type { CmsConfig, Manifest } from "../types.js";
import { hasR2 } from "../config.js";

export function StatusBar({
  config,
  manifest,
}: {
  config: CmsConfig;
  manifest: Manifest;
}) {
  const uploaded = manifest.images.reduce(
    (count, image) => count + image.variants.filter((variant) => variant.uploadedAt).length,
    0,
  );
  const total = manifest.images.reduce((count, image) => count + image.variants.length, 0);
  const r2Ready = hasR2(config);

  return (
    <Box
      borderStyle="single"
      borderColor="gray"
      justifyContent="space-between"
      marginTop={1}
      paddingX={1}
    >
      <Text dimColor>
        {manifest.images.length} images · {uploaded}/{total} variants on R2
      </Text>
      <Text color={r2Ready ? "green" : "yellow"}>
        {r2Ready ? "R2 ready" : "R2 not configured"}
      </Text>
    </Box>
  );
}
