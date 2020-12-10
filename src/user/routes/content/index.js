const config = global.__config;
const requireUncached = require(config.root + '/src/utility/requireUncached');

const fs = require('fs');
const path = require('path');

const express = require('express');
const serveIndex = require('serve-index');

const services = require(config.root + '/src/user/services');
const settings = requireUncached(config.root + '/src/client-settings');

// eslint-disable-next-line new-cap
const router = express.Router();

const content = settings.location;
const supportedVideoFormatsReg = services.video.supportedVideoFormatsReg;
const supportedImageFormatsReg = services.image.supportedImageFormatsReg;

router.get(
    '/*',
    serveIndex(content, {
      icons: true,
      filter: function(file, pos, list, dir) {
        return (
          (fs.existsSync(path.join(dir, file)) &&
          fs.lstatSync(path.join(dir, file)).isDirectory()) ||
        supportedVideoFormatsReg.test(file) ||
        supportedImageFormatsReg.test(file)
        );
      },
    }),
);

router.use(require(config.root + '/src/user/routes/content/video'));

module.exports = router;
