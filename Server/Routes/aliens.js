const express = require('express');
const router = express.Router();
const Alien = require('../Models/alien');


router.get('/', async (req, res) => {
    try {
        const aliens = await Alien.find();
        res.json(aliens);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id);
        if (alien == null) {
            return res.status(404).json({ message: 'Cannot find alien' });
        }
        res.json(alien);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});


router.post('/', async (req, res) => {
    const alien = new Alien({
        name: req.body.name,
        roll: req.body.roll,
        branch: req.body.branch,
        passed: req.body.passed
    });

    try {
        const a1 = await alien.save();
        res.status(201).json(a1);
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id);
        if (alien == null) {
            return res.status(404).json({ message: 'Cannot find alien' });
        }

        if (req.body.name != null) {
            alien.name = req.body.name;
        }
        if (req.body.roll != null) {
            alien.roll = req.body.roll;
        }
        if (req.body.branch != null) {
            alien.branch = req.body.branch;
        }
        if (req.body.passed != null) {
            alien.passed = req.body.passed;
        }

        const updatedAlien = await alien.save();
        res.json(updatedAlien);
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
});

module.exports = router;
