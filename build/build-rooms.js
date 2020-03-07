const { rooms } = require("../modules/rooms");
const { slugify } = require("../modules/utilities");
const fs = require("fs");
const path = require("path");

const header = `
/**
 * THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT THIS FILE DIRECTLY.
 * If you need to make changes to any of these templates, then make the 
 * changes in the build/build-rooms.js file.
 */
`;

/**
 * Iterate through all of the rooms and attach a slug.
 */
const slugifiedRooms = Object.values(rooms).map(room => {
  const slug = slugify(room.name);
  console.log(`Generating slug for ${room.name} => ${slug}`);
  room.slug = slug;
  return room;
});

const file = `${header}\nmodule.exports = ${JSON.stringify(slugifiedRooms, null, 2)}`;
const filename = 'generated-rooms.js';
const filePath = path.join(__dirname, filename);
fs.writeFileSync(filePath, file, { encoding: 'utf8', flag: 'w' });

console.log(`✅ ${filename} written to ${filePath}`);


