var express = require('express');
var router = express.Router();
const linkModel = require('../models/Link');

router.post('/', async function (req, res, next) {
    const newLink = new linkModel({
        name: req.body.name,
        title: req.body.title,
        url: req.body.url
    });
    await newLink.save();
    res.status(200).json(newLink);
});

router.get('/', async function (req, res, next) {
    const links = await linkModel
        .find()
        .sort({date: 1});

    res.status(200).json(links);
});

router.delete('/:id', async function (req, res) {
    await linkModel.deleteOne({_id: req.params.id}, function (err) {
        if (err != null) {
            res.status(500).json(err);
            console.log(err);
            return;
        }
    });

    res.status(200).json({message: 'Link удален!'});
});

module.exports = router;
