const express = require('express');
const { StatusCodes } = require('http-status-codes');

const root = require(__dirname + '/../config').root;
const utility = require(root + '/utility');

const router = express.Router();

router.post('/update-current-time', (req, res, next) => {
    utility.requestUtil.ensureCertainFields(req.body,['source','currentTime']);
    if (!req.session.videos)
        req.session.videos = [];
    let i = req.session.videos.findIndex((element) => { return element.source === req.body.source });
    if (i === -1) {
        req.session.videos.push({
            source: req.body.source,
            currentTime: req.body.currentTime
        });
    }
    else {
        req.session.videos[i].currentTime = req.body.currentTime;
    }
    res.status(StatusCodes.OK).json(utility.responseUtil.getSuccessResponse());
});

router.get('/get-current-time', (req, res, next) => {
    if (!req.session.videos)
        req.session.videos = [];
    let source = decodeURI(req.query.source);
    let i = req.session.videos.findIndex((element) => { return element.source === source; });
    let data = {
        currentTime : 0
    }
    // console.log("i =",i);
    if (i !== -1) {
        data.currentTime = req.session.videos[i].currentTime;
    }
    res.status(StatusCodes.OK).json(utility.responseUtil.getSuccessResponse(data));
});

module.exports = router;