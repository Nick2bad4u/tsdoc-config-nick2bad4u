import * as path from "node:path";
import { fileURLToPath } from "node:url";

/** Packaged TSDoc config filename. */
export const configFileName = "tsdoc.json" as const;

/** Published package name for this shared TSDoc config. */
export const packageName = "tsdoc-config-nick2bad4u" as const;

/**
 * Resolves the packaged TSDoc config from an ESM module URL.
 *
 * @param fromUrl - Module URL to resolve from.
 *
 * @returns Absolute path to the packaged TSDoc config file.
 */
export function resolveConfigPath(fromUrl: string = import.meta.url): string {
    return path.join(
        path.dirname(fileURLToPath(fromUrl)),
        "..",
        configFileName
    );
}

/** Absolute path to the packaged TSDoc config file. */
export const configPath: string = resolveConfigPath();
