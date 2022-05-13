const express = require('express');
const router = express.Router();

let TASKS = [
    {
        id: '1',
        createdBy: 'rajat',
        task: 'Learn Wizardry from Hogwarts',
        assignee: 'rajat',
        status: 'active'
    },
    {
        id: '2',
        createdBy: 'rajat',
        task: 'Become Minister of Magic by 2025',
        assignee: 'rajat',
        status: 'active'
    },
    {
        id: '3',
        createdBy: 'rajat',
        task: 'Establish Order of Pheonix to Fight Dark Wizards',
        assignee: 'rajat',
        status: 'active'
    }
];
const USERS = [];

const idLen = 10;

router.get(
    '/users',
    async (req, res) => {
        console.log('Get users ... ');
        res.json(USERS);
    }
);

router.post(
    '/user',
    (req, res) => {
        const { user = null } = req.body;
        console.log('Adding user ...');
        USERS.push(user);
        res.json({ data: USERS, msg: 'user added'});
    }
);

router.post(
    '/login',
    (req, res) => {
        const { email, password } = req.body;

        let foundUser = USERS.filter((user) => user.email == email && user.password == password);
        if (foundUser.length) {
            res.json({ status: true, msg: 'user found', user: foundUser[0]});
        }
        res.json({ status: false, msg: 'user not found' });
    }
);

router.post(
    '/signup',
    (req, res) => {
        const { email, password } = req.body;
        console.log('Adding user');
        USERS.push({ email, password });
        res.json({ status: true, numberOfUsers: USERS.length });
    }
);

router.get(
    '/tasks',
    (req, res) => {
        res.json(TASKS);
    }
);

router.post(
    '/task',
    (req, res) => {
        const task = req.body;
        task.id = TASKS.length + 1;
        TASKS.push(task);
        res.json({ status: true, taskId: task.id, msg: `task ${task.id} added` });
    }
);

router.delete(
    '/task/:id',
    (req, res) => {
        try {
            console.log('deleting task ...');
            const { id } = req.params;
            TASKS = TASKS.filter((task) => {
                return +task.id != +id
            });
            res.json({ status: true, msg: `task ${id} deleted` });
        } catch (err) {
            console.log(err);
            res.json({ status: false, msg: err });
        }
    }
);

router.put(
    '/task',
    (req, res) => {
        const task = req.body;
        TASKS = TASKS.map((tsk) => {
            if (tsk.id == task.id) tsk = task;
            return tsk;
        });
        res.json({ status: true, msg: `task ${task.id} edited` });
    }
);

module.exports = router;