const express = require('express');

const router = express.Router();
const Posts = require('../data/db');
// 100% Functional
router.get('/', (req, res) => {
	Posts.find()
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(err => {
			res.status(500).json({ error: 'The posts information could not be retrieved.' });
		});
});
//GET not throwing back ID doesn't exist error.
router.get('/:id', (req, res) => {
	const postId = req.params.id;
	Posts.findById(postId)
		.then(post => {
			if (post) {
				res.status(201).json(post);
			} else {
				res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			}
		})
		.catch(err => {
			res.status(500).json({
				error : 'There was an error while saving the post to the database',
			});
		});
});
//GET not throwing back ID doesn't exist error.
router.get('/:id/comments', (req, res) => {
	const postId = req.params.id;
	Posts.findPostComments(postId)
		.then(post => {
			if (post) {
				res.status(201).json(post);
			} else {
				res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			}
		})
		.catch(err => {
			res.status(500).json({
				error : 'There was an error while saving the post to the database',
			});
		});
});
//100% Functional
router.post('/', (req, res) => {
	const newPost = req.body;
	if (!newPost.title || !newPost.contents) {
		res.status(400).json({
			errorMessage : 'Please provide title and contents for the post.',
		});
	}
	Posts.insert(newPost)
		.then(post => {
			res.status(201).json(post);
		})
		.catch(err => {
			res.status(500).json({
				error : 'There was an error while saving the post to the database',
			});
		});
});
// Not functional
router.post('/:id/comments', (req, res) => {
	const comment = req.body;
	if (!comment.text) {
		res.status(400).json({ errorMessage: 'Please provide text for the comment.' });
	}
	Posts.insertComment(comment)
		.then(comm => {
			res.status(201).json({ comm });
		})
		.catch(err => {
			res.status(500).json({
				error : 'There was an error while saving the comment to the database',
			});
		});
});
//100% functional
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	if (!changes.title || !changes.contents) {
		res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
	}
	Posts.update(id, changes)
		.then(updated => {
			if (updated) {
				res.status(200).json(changes);
			} else {
				res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			}
		})
		.catch(err => {
			res.status(500).json({ error: 'The post information could not be modified.' });
		});
});

//100% functional
router.delete('/:id', (req, res) => {
	const postId = req.params.id;
	Posts.remove(postId)
		.then(post => {
			if (post) {
				res.status(201).json({ message: 'You have successfully deleted this.' });
			} else {
				res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			}
		})
		.catch(err => {
			res.status(500).json({
				message : 'The post with the specified ID does not exist.',
			});
		});
});

module.exports = router;
