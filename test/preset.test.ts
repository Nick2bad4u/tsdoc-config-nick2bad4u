import { TSDocConfiguration } from "@microsoft/tsdoc";
import { TSDocConfigFile } from "@microsoft/tsdoc-config";
import { readFile } from "node:fs/promises";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import {
    configFileName,
    configPath,
    packageName,
    resolveConfigPath,
} from "../src/preset";

describe("tsdoc-config-nick2bad4u", () => {
    it("ships TypeDoc as a runtime dependency for native extends resolution", async () => {
        expect.assertions(3);

        const packageJson = JSON.parse(
            await readFile(path.resolve("package.json"), "utf8")
        ) as {
            readonly dependencies?: Record<string, string>;
            readonly devDependencies?: Record<string, string>;
            readonly peerDependencies?: Record<string, string>;
        };

        expect(packageJson.dependencies?.["typedoc"]).toMatch(/^\^0\.28\./v);
        expect(packageJson.devDependencies?.["typedoc"]).toBeUndefined();
        expect(packageJson.peerDependencies?.["@microsoft/tsdoc-config"]).toBe(
            ">=0.18.0"
        );
    });

    it("exports package metadata and resolves the packaged config", () => {
        expect.assertions(4);

        expect(packageName).toBe("tsdoc-config-nick2bad4u");
        expect(configFileName).toBe("tsdoc.json");
        expect(path.basename(configPath)).toBe(configFileName);
        expect(resolveConfigPath(import.meta.url)).toBe(
            path.resolve(configFileName)
        );
    });

    it("keeps the raw config native and explicit about standard tags", async () => {
        expect.assertions(7);

        const config = JSON.parse(await readFile(configPath, "utf8")) as {
            readonly extends?: readonly string[];
            readonly noStandardTags?: boolean;
            readonly supportForTags?: Record<string, boolean>;
            readonly tagDefinitions?: readonly unknown[];
        };

        expect(config.extends).toContain("typedoc/tsdoc.json");
        expect(config.extends).not.toContain(
            "./node_modules/typedoc/tsdoc.json"
        );
        expect(config.noStandardTags).toBeUndefined();
        expect(config.supportForTags?.["@param"]).toBe(true);
        expect(config.supportForTags?.["@returns"]).toBe(true);
        expect(config.supportForTags?.["@link"]).toBe(true);
        expect(config.tagDefinitions).toBeUndefined();
    });

    it("loads into a parser with standard TSDoc and TypeDoc tags", () => {
        expect.assertions(10);

        const configFile = TSDocConfigFile.loadFile(configPath);
        const parserConfig = new TSDocConfiguration();

        configFile.configureParser(parserConfig);

        const tagNames = parserConfig.tagDefinitions.map(
            ({ tagName }) => tagName
        );

        expect(configFile.hasErrors).toBe(false);
        expect(configFile.getErrorSummary()).toBe("No errors.");
        expect(tagNames).toContain("@param");
        expect(tagNames).toContain("@returns");
        expect(tagNames).toContain("@deprecated");
        expect(tagNames).toContain("@alpha");
        expect(tagNames).toContain("@sealed");
        expect(tagNames).toContain("@defaultValue");
        expect(tagNames).toContain("@category");
        expect(tagNames).toContain("@linkcode");
    });
});
