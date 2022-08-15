const { User, Post } = require("../models");

const getPosts = (req, res) => {
    Post.findAll()
        .then((posts) => {
            res.status(200).send(JSON.stringify(posts));
        })
        .catch((error) => {
            console.log(error);
            res.status(500)
        });
}

const getPost = (req, res) => {
    const id = req.params.id

    Post.findAll({ where: { id: id } })
        .then((posts) => {
            if (!posts.length) res.status(404).send("Not found")

            res.status(200).send(JSON.stringify(posts[0]));
        })
        .catch((error) => {
            console.log(error);
            res.status(500)
        });
}

const addPost = (req, res) => {
    const data = req.body;
    if (!data.userId) res.status(400).send("userId is required");
    if (!data.body) res.status(400).send("body is required");

    User.findAll({ where: { id: data.userId } })
        .then((user) => {
            if (!user.length) res.status(404).send("User not found")

            Post.create(data)
                .then((post) => {
                    res.status(201).send("Successfully created");
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500)
                });
        })
}

const updatePost = (req, res) => {
    const data = req.body;
    const id = req.params.id

    Post.findAll({ where: { id: id } }).then((posts) => {
        if (!posts.length) {
            res.status(404).send("Not found")
        } else {
            Post.update({ body: data.body }, { where: { id: id } })
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

const deletePost = (req, res) => {
    const id = req.params.id
    Post.findAll({ where: { id: id } })
        .then((post) => {
            if (!post.length) res.status(404).send("Post not found")

            Post.destroy({ where: { id } })
                .then(() => {
                    res.status(204).send("Post successfully deleted")
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500)
                })
        })
}

module.exports = {
    getPosts,
    getPost,
    addPost,
    updatePost,
    deletePost
}