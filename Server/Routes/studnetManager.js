const express = require('express');
const router = express.Router();
const Student = require('../Models/student');

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

// Get a student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (student == null) {
            return res.status(404).json({ message: 'Cannot find student' });
        }
        res.json(student);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

// Create a new student
router.post('/', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        roll: req.body.roll,
        branch: req.body.branch,
        passed: req.body.passed
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
});

// Delete a student by ID
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (student == null) {
            return res.status(404).json({ message: 'Cannot find student' });
        }

        await Student.deleteOne({ _id: req.params.id });
        res.json({ message: 'Deleted Student' });
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

// Update a student by ID
router.patch('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (student == null) {
            return res.status(404).json({ message: 'Cannot find student' });
        }

        if (req.body.name != null) {
            student.name = req.body.name;
        }
        if (req.body.roll != null) {
            student.roll = req.body.roll;
        }
        if (req.body.branch != null) {
            student.branch = req.body.branch;
        }
        if (req.body.passed != null) {
            student.passed = req.body.passed;
        }

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
});

module.exports = router;
