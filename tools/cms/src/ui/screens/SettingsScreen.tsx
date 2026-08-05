import React from "react";
import { Box, Text } from "ink";
import type { CmsConfig } from "../../types.js";
import { hasR2 } from "../../config.js";

export function SettingsScreen({ config }: { config: CmsConfig }) {
  const configured = hasR2(config);
  return (
    <Box flexDirection="column">
      <Text bold color="cyan">
        Settings
      </Text>
      <Text>project    {config.projectPath}</Text>
      <Text>registry   {config.projectPath}/{config.registryOut}</Text>
      <Text>sourceRoot {config.projectPath}/{config.sourceRoot}</Text>
      <Text>
        sizes      {config.sizes.map((size) => `${size.name} ${size.width}px`).join(" / ")}
      </Text>
      <Text>
        quality    avif {config.qualities.avif} · webp {config.qualities.webp} · jpeg {config.qualities.jpeg}
      </Text>
      <Text>account    {config.r2.accountId || "(unset)"}</Text>
      <Text>bucket     {config.r2.bucketName || "(unset)"}</Text>
      <Text>publicUrl  {config.r2.publicUrl || "(unset)"}</Text>
      <Text color={configured ? "green" : "yellow"}>
        R2: {configured ? "configured - uploads enabled" : "MISSING - set tools/cms/.env from .env.example"}
      </Text>
    </Box>
  );
}
