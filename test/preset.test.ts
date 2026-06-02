import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

import { configPath, packageName } from "../src/preset";

describe("tsdoc-config-nick2bad4u", () => {
    it("exports a TSDoc config that can be extended by package path", async () => {
        expect.assertions(5);

        const config = JSON.parse(await readFile(configPath, "utf8")) as {
            readonly extends?: readonly string[];
            readonly supportForTags?: Record<string, boolean>;
        };

        expect(packageName).toBe("tsdoc-config-nick2bad4u");
        expect(config.extends).toContain("typedoc/tsdoc.json");
        expect(config.extends).not.toContain(
            "./node_modules/typedoc/tsdoc.json"
        );
        expect(config.supportForTags?.["@throws"]).toBe(true);
        expect(config.supportForTags?.["@defaultValue"]).toBe(true);
    });
});
