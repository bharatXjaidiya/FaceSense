const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const mongoose = require("mongoose");
const NodeID3 = require("node-id3");

const imagekit = require("../src/services/imageKit.service");
const songModel = require("../src/models/song.model");

const SONGS_DIR = path.join(__dirname, "songs");
const AUDIO_EXT = [".mp3", ".m4a", ".wav", ".ogg"];

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");

    const moods = fs
        .readdirSync(SONGS_DIR, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);

    for (const mood of moods) {
        const files = fs
            .readdirSync(path.join(SONGS_DIR, mood))
            .filter((f) => AUDIO_EXT.includes(path.extname(f).toLowerCase()));

        for (const file of files) {
            const filePath = path.join(SONGS_DIR, mood, file);
            const buffer = fs.readFileSync(filePath);
            const tags = NodeID3.read(buffer);

            const title = tags.title || path.parse(file).name;
            const artist = tags.artist || "Unknown";

            // skip if this default song already exists (safe to re-run)
            const seedKey = `${mood}/${file}`;   // for example "happy/song1.mp3"

            const exists = await songModel.findOne({ seedKey });
            if (exists) {
                console.log(`Skipped (already exists): ${seedKey}`);
                continue;
            }

            let songFile = null;
            let posterFile = null;

            try {
                songFile = await imagekit.upload({
                    file: buffer,
                    fileName: file,
                    folder: "/face-sense/default-songs",
                });

                if (tags.image?.imageBuffer) {
                    posterFile = await imagekit.upload({
                        file: tags.image.imageBuffer,
                        fileName: `${path.parse(file).name}-poster.jpg`,
                        folder: "/face-sense/default-posters",
                    });
                }

                await songModel.create({
                    title,
                    artist,
                    album: tags.album || "",
                    mood,
                    songUrl: songFile.url,
                    songFileId: songFile.fileId,
                    posterurl: posterFile?.url,
                    posterFileId: posterFile?.fileId,
                    isDefault: true,   // no uploadedBy
                    seedKey
                });

                console.log(`Uploaded: ${title} (${mood})`);
            } catch (err) {
                console.error(`Failed: ${file}`, err.message);

                // rollback files of this song only
                await Promise.allSettled([
                    songFile && imagekit.deleteFile(songFile.fileId),
                    posterFile && imagekit.deleteFile(posterFile.fileId),
                ]);
            }
        }
    }

    await mongoose.disconnect();
    console.log("Seeding finished");
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});