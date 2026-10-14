import { spawnSync } from "node:child_process";
import {
	mkdirSync,
	mkdtempSync,
	readFileSync,
	rmSync,
	symlinkSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";
import { afterEach, describe, expect, it } from "vitest";

const fixtures: string[] = [];
afterEach(() => {
	for (const path of fixtures.splice(0))
		rmSync(path, { recursive: true, force: true });
});

function checkImage(image: Buffer) {
	const root = mkdtempSync(join(tmpdir(), "bread-assets-"));
	fixtures.push(root);
	mkdirSync(join(root, "scripts"));
	mkdirSync(join(root, "docs/assets"), { recursive: true });
	writeFileSync(
		join(root, "scripts/check-assets.ts"),
		readFileSync(new URL("../scripts/check-assets.ts", import.meta.url)),
	);
	symlinkSync(
		new URL("../node_modules", import.meta.url).pathname,
		join(root, "node_modules"),
	);
	writeFileSync(
		join(root, "docs/assets/source.svg"),
		'<svg xmlns="http://www.w3.org/2000/svg"></svg>',
	);
	writeFileSync(join(root, "docs/assets/bread-badge.png"), image);
	return spawnSync("bun", [join(root, "scripts/check-assets.ts")], {
		encoding: "utf8",
	});
}

describe("asset validation", () => {
	it("accepts a complete efficiently compressed PNG at the required dimensions", async () => {
		const png = await sharp({
			create: { width: 240, height: 96, channels: 3, background: "#121212" },
		})
			.png()
			.toBuffer();
		expect(png.length).toBeLessThan(5000);
		const result = checkImage(png);
		expect(result.stderr).toBe("");
		expect(result.status).toBe(0);
	});

	it("rejects corrupt pixel data even when its header and byte count pass", async () => {
		const png = await sharp({
			create: { width: 240, height: 96, channels: 3, background: "#121212" },
		})
			.png()
			.toBuffer();
		const corrupt = Buffer.concat([png.subarray(0, 33), Buffer.alloc(6000)]);
		expect(checkImage(corrupt).status).toBe(1);
	});

	it("rejects a complete PNG with the wrong dimensions", async () => {
		const png = await sharp({
			create: { width: 241, height: 96, channels: 3, background: "#121212" },
		})
			.png()
			.toBuffer();
		expect(checkImage(png).status).toBe(1);
	});
});
