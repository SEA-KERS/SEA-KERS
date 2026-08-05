import React, { useCallback, useMemo, useState } from "react";
import { Box, useApp, useInput } from "ink";
import { DEFAULT_MANIFEST_PATH, loadConfig } from "../config.js";
import { loadManifest } from "../manifest.js";
import type { Manifest } from "../types.js";
import { Header } from "./Header.js";
import { StatusBar } from "./StatusBar.js";
import { GenerateScreen } from "./screens/GenerateScreen.js";
import { ImportScreen } from "./screens/ImportScreen.js";
import { LibraryScreen } from "./screens/LibraryScreen.js";
import { SettingsScreen } from "./screens/SettingsScreen.js";
import type { Screen } from "./screens/types.js";

export function CmsApp() {
  const { exit } = useApp();
  const config = useMemo(() => loadConfig(), []);
  const manifestPath = process.env.SEA_KERS_MANIFEST_PATH || DEFAULT_MANIFEST_PATH;
  const [manifest, setManifest] = useState<Manifest>(() => loadManifest(manifestPath));
  const [screen, setScreen] = useState<Screen>("library");

  const refresh = useCallback(
    () => setManifest(loadManifest(manifestPath)),
    [manifestPath],
  );

  useInput((input, key) => {
    if (key.ctrl && input === "c") {
      exit();
      return;
    }
    if (screen !== "import") {
      if (input === "1") setScreen("library");
      else if (input === "2") setScreen("import");
      else if (input === "3") setScreen("settings");
      else if (input === "4") setScreen("generate");
      else if (input === "q" || input === "Q") exit();
    }
  });

  return (
    <Box flexDirection="column">
      <Header screen={screen} />
      <Box marginTop={1} flexDirection="column">
        {screen === "library" ? (
          <LibraryScreen
            config={config}
            manifest={manifest}
            manifestPath={manifestPath}
            refresh={refresh}
          />
        ) : null}
        {screen === "import" ? (
          <ImportScreen
            config={config}
            manifest={manifest}
            manifestPath={manifestPath}
            refresh={refresh}
          />
        ) : null}
        {screen === "settings" ? <SettingsScreen config={config} /> : null}
        {screen === "generate" ? (
          <GenerateScreen
            config={config}
            manifest={manifest}
            manifestPath={manifestPath}
          />
        ) : null}
      </Box>
      <StatusBar config={config} manifest={manifest} />
    </Box>
  );
}
