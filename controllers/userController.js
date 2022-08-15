const { User, Post } = require("../models");

const getUsers = (req, res) => {
    User.findAll()
        .then((users) => {
            res.status(200).send(JSON.stringify(users));
        })
        .catch((error) => {
            console.log(error);
            res.status(500)
        });
}

const getUser = (req, res) => {
    const id = req.params.id

    User.findAll({ where: { id: id } })
        .then((user) => {
            if (!user.length) res.status(404).send("Not found")
            
            res.status(200).send(JSON.stringify(user[0]));
        })
        .catch((error) => {
            console.log(error);
            res.status(500)
        });
}

const addUser = (req, res) => {
    const data = req.body;
    if (!data.username) res.status(400).send("username is required");
    if (!data.password) res.status(400).send("password is required");
    if (!data.password_confirm) res.status(400).send("password_confirm is required");
    if (data.password !== data.password_confirm) res.status(400).send("passwords do not match");

    User.create({ username: data.username, password: data.password })
        .then((user) => {
            res.status(201).send("Successfully created");
        })
        .catch((error) => {
            console.log(error);
            res.status(500)
        });
}

const updateUser = (req, res) => {
    const data = req.body;
    const id = req.params.id

    User.findAll({ where: { id: id } }).then((user) => {
        if (!user.length) {
            res.status(404).send("Not found")
        } else {
            User.update(data, { where: { id: id } })
                .then(() => {
                    res.status(201).send("Successfully updated");
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500)
                })
        }
    })
}

const deleteUser = (req, res) => {
    const id = req.params.id
    User.findAll({ where: { id: id } })
        .then((user) => {
            if (!user.length) res.status(404).send("User not found")

            User.destroy({ where: { id } })
                .then(() => {
                    res.status(204).send("User successfully deleted")
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500)
                });

        })
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
}