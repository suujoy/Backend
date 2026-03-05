const songModel = require("../models/song.model");
const { uploadFile } = require("../services/storage.service");
const id3 = require("node-id3");

const uploadSongController = async (req, res) => {
    const songBuffer = req.file.buffer;
    const { mood } = req.body;

    const tags = id3.read(songBuffer);

    // const songFile = await uploadFile({
    //     buffer: songBuffer,
    //     filename: tags.title + "mp3",
    //     folder: "/moodify/songs",
    // });

    // const posterFile = await uploadFile({
    //     buffer: tags.image.imageBuffer,
    //     filename: tags.title + "jpeg",
    //     folder: "/moodify/posters",
    // });

    const [songFile, posterFile] = await Promise.all([
        uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: "/moodify/songs",
        }),
        uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/moodify/posters",
        }),
    ]);

    const song = await songModel.create({
        url: songFile.url,
        title: tags.title,
        posterUrl: posterFile.url,
        mood,
    });

    res.status(201).json({
        message: "Song Created Successfully",
        song,
    });
};

const getSongController = async (req, res) => {
    const { mood } = req.query;

    const song = await songModel.findOne({ mood });

    res.status(200).json({
        message: "Song Fetched Successfully",
        song,
    });
};

module.exports = { uploadSongController,getSongController };
