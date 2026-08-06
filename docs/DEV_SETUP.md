# Developer Setup

## Purpose

This document describes how to set up this project on your computer.
Use this document before you run any project command for the first time.


## Terms

| Term | Meaning |
| --- | --- |
| Project | The Team SEA-KERS website and its tools. |
| Turbo | The task runner that runs the build commands. |
| Remote cache | A shared storage area for the outputs of the build commands. |
| Token | A secret value that identifies you to the remote cache. |
| Environment file | A file that stores configuration values for the project. |
| Package manager | The tool that installs the project dependencies (pnpm). |
| Dependency | A software package that the project needs. |

## Prerequisites

You must have the following items before you set up the project:

- Node.js version 20 or later
- pnpm version 11.1.2
- Git

If you do not have pnpm, install it with the command for your operating system.

| Operating system | Command |
| --- | --- |
| Windows | `corepack enable pnpm` |
| macOS or Linux | `corepack enable pnpm` |

## Setup Procedure

Use the steps in this section in the order that they appear.

### Step 1: Install the Dependencies

Open a terminal in the project folder.

Run this command:

```sh
pnpm install
```

### Step 2: Create the Environment File

The project has an example environment file.

The example file is in this location:

```text
apps/web/.env.example
```

Copy the example file to this location:

```text
apps/web/.env
```

Open the new file.

Set the value of `VITE_SITE_URL` to the production URL.

```text
VITE_SITE_URL=https://team-seakers.com
```

The value of `VITE_CLOUDFLARE_ANALYTICS_TOKEN` is optional.
Leave it empty until you have a Cloudflare analytics token.

Note: Do not commit the `apps/web/.env` file.
The project ignores this file.

### Step 3: Set the Turbo Token

The remote cache stores the results of the build commands.
The remote cache speeds up the build on your computer and in the CI system.

The remote cache requires a token.
The token is stored in this file:

```text
tools/turbo-cache/.env
```

The file contains the value of `TURBO_TOKEN`.

Set the `TURBO_TOKEN` environment variable on your computer.
The command depends on your operating system.

On Windows:

```powershell
setx TURBO_TOKEN "<value>"
```

On macOS or Linux, add this line to your shell profile file:

```sh
export TURBO_TOKEN="<value>"
```

Replace `<value>` with the token from the `.env` file.

Note: The remote cache address and the team name are already in the `turbo.json` file.
You do not need to set `TURBO_API` or `TURBO_TEAM`.

### Step 4: Set Up the Image CMS (Optional)

The image CMS uploads images to a Cloudflare R2 bucket.
The CMS needs credentials if you upload images.

The credentials are stored in this file:

```text
tools/cms/.env
```

Use the example file as a guide:

```text
tools/cms/.env.example
```

Copy the example file to this location:

```text
tools/cms/.env
```

Fill in the values from the cloud account.
You do not need this step if you only run the website.

## Verification

Do these steps to verify the setup:

1. Run the command `pnpm typecheck`.
2. Run the command `pnpm typecheck` again.
3. Check the output of the second run.

The second run shows the message `cache hit`.
The second run is faster than the first run.

The message `Remote caching enabled` shows that the remote cache works.

## Common Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server. |
| `pnpm build` | Build the website. |
| `pnpm lint` | Check the code style. |
| `pnpm typecheck` | Check the code types. |
| `pnpm test` | Run the tests. |
| `pnpm validate` | Run lint, typecheck, tests, and build. |
| `pnpm preview` | Preview the production build. |
| `pnpm deploy` | Deploy the website to Cloudflare. |
| `pnpm cms` | Start the image CMS. |

## Notes

- The CI system and the local build use the same cache.
- The CI system rebuilds the production bundle with the correct environment variables.
- The `VITE_SITE_URL` value does not affect the cache.
- The `CI` value does not affect the cache.
- Do not commit secret values to the repository.
