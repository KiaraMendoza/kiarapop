const jimp = require('jimp');

const doResize = async (imageToResize, imageFileName, directoryToSave) => {
    const adImage = await jimp.read(imageToResize);
    await adImage.resize(100, 100);
    const thumbnailPath = directoryToSave + imageFileName.substring(imageFileName.length - 4, 3) + '_thumb.png';
    const thumbnailName = imageFileName.substring(imageFileName.length - 4, 3) + '_thumb.png';
    await adImage.writeAsync(thumbnailPath);
    return { thumbnailPath, thumbnailName };
}

module.exports = doResize;