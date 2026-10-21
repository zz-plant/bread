// Builds the favicons from the BREAD toast stack in src/utils/bread-logo.mjs.
// The outputs are committed, so run this only when the mark changes:
//   node scripts/generate-icons.mjs
import { writeFileSync } from "node:fs";
import sharp from "sharp";
import { BREAD_ICON } from "../src/utils/bread-logo.mjs";

const publicDir = new URL("../public/", import.meta.url);

// White toast on black, like the BREAD FM cards. The mark fills 88% of the
// square, and sits a little high to balance the stack's heavy base.
const iconSvg = () => {
	const size = 100;
	const scale = (size * 0.88) / BREAD_ICON.width;
	const height = BREAD_ICON.height * scale;
	const x = (size - BREAD_ICON.width * scale) / 2;
	const y = (size - height) / 2 - 2;
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <title>BREAD</title>
  <rect width="${size}" height="${size}" fill="#000"/>
  <path transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${scale.toFixed(4)})" fill="#fff" fill-rule="evenodd" d="${BREAD_ICON.d}"/>
</svg>
`;
};

const svg = iconSvg();
writeFileSync(new URL("favicon.svg", publicDir), svg);

const png = (size) =>
	sharp(Buffer.from(svg), { density: 72 * Math.ceil(size / 25) })
		.resize(size, size)
		.png({ compressionLevel: 9 })
		.toBuffer();

await sharp(await png(180)).toFile(
	new URL("apple-touch-icon.png", publicDir).pathname,
);

// An .ico that wraps a 32px PNG, which every current browser reads.
const ico32 = await png(32);
const header = Buffer.alloc(6 + 16);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // one image
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt8(0, 8); // no palette
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // color planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(ico32.length, 14);
header.writeUInt32LE(header.length, 18);
writeFileSync(
	new URL("favicon.ico", publicDir),
	Buffer.concat([header, ico32]),
);

console.log("Wrote favicon.svg, favicon.ico, apple-touch-icon.png");
