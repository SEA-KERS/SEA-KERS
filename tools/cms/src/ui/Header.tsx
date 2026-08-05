import React from "react";
import { Box, Text } from "ink";
import type { Screen } from "./screens/types.js";

const TABS: ReadonlyArray<{ key: string; id: Screen; label: string }> = [
  { key: "1", id: "library", label: "Library" },
  { key: "2", id: "import", label: "Import" },
  { key: "3", id: "settings", label: "Settings" },
  { key: "4", id: "generate", label: "Generate" },
];

export function Header({ screen }: { screen: Screen }) {
  return (
    <Box
      borderStyle="single"
      borderColor="cyan"
      flexDirection="column"
      paddingX={1}
    >
      <Box justifyContent="space-between">
        <Text bold color="cyan">
          SEA-KERS Image CMS
        </Text>
        <Text dimColor>q quit</Text>
      </Box>
      <Box marginTop={1}>
        {TABS.map((tab) => (
          <Box key={tab.id} marginRight={2}>
            <Text color={screen === tab.id ? "green" : undefined}>
              {screen === tab.id ? ">" : " "}[{tab.key}] {tab.label}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
