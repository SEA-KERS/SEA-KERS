import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import type { CmsConfig, Manifest, ManifestImage } from "../../types.js";
import { FORMATS } from "../../types.js";
import { collectionImages, collections } from "../../manifest.js";
import { runGenerate, runUploadImage } from "../../core.js";
import { hasR2 } from "../../config.js";

interface Props {
  config: CmsConfig;
  manifest: Manifest;
  manifestPath: string;
  refresh: () => void;
}

type View = "collections" | "images" | "detail";

export function LibraryScreen({ config, manifest, manifestPath, refresh }: Props) {
  const [view, setView] = useState<View>("collections");
  const [cursor, setCursor] = useState(0);
  const [collection, setCollection] = useState<string | null>(null);
  const [image, setImage] = useState<ManifestImage | null>(null);
  const [notice, setNotice] = useState("");

  const collectionsList = collections(manifest);
  const imagesList = collection ? collectionImages(manifest, collection) : [];
  const list: Array<string | ManifestImage> =
    view === "collections" ? collectionsList : imagesList;

  const label = (item: string | ManifestImage): string =>
    typeof item === "string" ? item : item.id;

  const goBack = () => {
    setCursor(0);
    if (view === "detail") setView("images");
    else if (view === "images") setView("collections");
  };

  useInput((input, key) => {
    if (key.upArrow) {
      setCursor((c) => Math.max(0, c - 1));
      return;
    }
    if (key.downArrow) {
      setCursor((c) => Math.min(Math.max(list.length - 1, 0), c + 1));
      return;
    }
    if (key.return) {
      if (view === "collections") {
        const selected = collectionsList[cursor];
        if (selected) {
          setCollection(selected);
          setView("images");
          setCursor(0);
        }
      } else if (view === "images") {
        const selected = imagesList[cursor];
        if (selected) {
          setImage(selected);
          setView("detail");
          setCursor(0);
        }
      }
      return;
    }
    if (key.backspace || key.escape) {
      goBack();
      return;
    }
    if (view === "detail" && image) {
      if (input === "u" && hasR2(config)) {
        setNotice(`uploading ${image.id}...`);
        void runUploadImage(config, manifestPath, image.id, setNotice).then(() => {
          setNotice("");
          refresh();
        });
      } else if (input === "g") {
        void runGenerate(config, manifestPath, setNotice).then(() => refresh());
      } else if (input === "b") {
        goBack();
      }
    }
  });

  if (view === "detail" && image) {
    const uploaded = image.variants.filter((variant) => variant.uploadedAt).length;
    return (
      <Box flexDirection="column">
        <Text bold color="cyan">
          {image.id}
        </Text>
        <Text dimColor>
          collection {image.collection} · {image.width || "?"}x{image.height || "?"}px
          {image.ref ? ` · member ${image.ref}` : ""} · alt &quot;{image.alt || "—"}&quot;
        </Text>
        <Text dimColor>
          variants {uploaded}/{image.variants.length} uploaded
        </Text>
        {image.variants.length > 0 ? (
          <Box flexDirection="column">
            {config.sizes.map((size) => {
              const row = image.variants.filter((variant) => variant.width === size.width);
              return (
                <Text key={size.name}>
                  {size.name.padEnd(9)}
                  {String(size.width).padStart(4)}px{"  "}
                  {FORMATS.map((format) => {
                    const variant = row.find((entry) => entry.format === format);
                    const status = variant ? (variant.uploadedAt ? "uploaded" : "pending ") : "none   ";
                    return `${format}=${status}`;
                  }).join("  ")}
                </Text>
              );
            })}
          </Box>
        ) : (
          <Text dimColor>remote placeholder - import a replacement image to upload</Text>
        )}
        {notice ? <Text color="yellow">{notice}</Text> : null}
        <Text dimColor>u upload · g regenerate registry · b/backspace back</Text>
      </Box>
    );
  }

  if (list.length === 0) {
    return (
      <Box flexDirection="column">
        <Text bold color="cyan">
          Library
        </Text>
        <Text dimColor>
          {view === "collections"
            ? "No collections yet. Run `pnpm cms:scan` or use the Import tab."
            : `No images in ${collection}.`}
        </Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">
        {view === "collections" ? "Library" : `Collection: ${collection}`}
      </Text>
      {list.map((item, index) => (
        <Text key={label(item)} color={index === cursor ? "green" : undefined}>
          {index === cursor ? ">" : " "} {label(item)}
        </Text>
      ))}
      <Text dimColor>
        {view === "collections"
          ? "enter open · up/down move"
          : "enter open · backspace back"}
      </Text>
    </Box>
  );
}
