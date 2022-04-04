import * as jsonpatch from 'fast-json-patch/index.mjs';
import { applyOperation } from 'fast-json-patch/index.mjs';
import downloader from 'image-downloader';
import sharp from 'sharp';

export default class featureControllers {
    static async json_patch(req, res) {
        // apply patch
        if ((!(req.body.jsonObject) && !(req.body.jsonpatchObject)) || !(req.body)) {
            return res.status(400).json({ error: 'Patch Object empty or missing values' });
        }
        const patchedObject = jsonpatch.applyOperation(req.body.jsonObject, req.body.jsonPatchObject).newDocument;
        res.json({ patchedObject });
    }

    static async createThumbNail(req, res) {
        // get url and extension
        const imageTypes = ['jpg', 'tif', 'gif', 'png', 'svg', 'apng', 'avif', 'webp'];
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'Please fill in Url' });
        }
        const fileExtension = url.split('.').pop().split(/\#|\?/)[0];
        const imageName = url.split('/').pop().split('.')[0];
        // check extension if image
        if (imageTypes.includes(fileExtension)) {
            // download image and save
            const options = {
                url: url,
                dest: '../../images/original/',
            };
            downloader.image(options)
            .then(({ filename }) => {
                sharp(filename)
                .resize(50, 50)
                .toFile(`images/cropped/${imageName}.${fileExtension}`, (err) => {
                    if (err) return res.status(500).json({ error: 'Internal Server Error' });
                    return res.status(200).json({
                        converted: true, success: 'Image has been resized', thumbnail: `images/cropped/${imageName}.${fileExtension}`,
                    });
                });
            })
            .catch((err) => { res.status(400).json({ error: err }); });
        } else {
            res.status(400).json({ error: 'Prolem with image type/extension' });
        }
    }
}
