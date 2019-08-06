const express = require('express');

const router = express.Router();
const Posts = require('../data/db');

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
	if (!postId) {
		res.status(404).json({ message: 'The post with the specified ID does not exist.' });
	} else {
		Posts.findById(postId)
			.then(post => {
				res.status(201).json(post);
			})
			.catch(err => {
				res.status(500).json({
					error : 'There was an error while saving the post to the database',
				});
			});
	}
});
router.get('/:id/comments', (req, res) => {
	const postId = req.params.id;
	if (!postId) {
		res.status(404).json({ message: 'The post with the specified ID does not exist.' });
	} else {
		Posts.findPostComments(postId)
			.then(post => {
				res.status(201).json(post);
			})
			.catch(err => {
				res.status(500).json({
					error : 'There was an error while saving the post to the database',
				});
			});
	}
});

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
router.post('/:id/comments', (req, res) => {
	const postId = req.params.id;
	const comment = req.body;
	if (!postId) {
		res.status(404).json({ message: 'The post with the specified ID does not exist.' });
	} else if (!comment.text) {
		res.status(400).json({
			errorMessage : 'Please provide text for the comment.',
		});
	} else {
		Posts.insertComment(comment)
			.then(post => {
				res.status(201).json(post);
			})
			.catch(err => {
				res.status(500).json({
					error : 'There was an error while saving the comment to the database',
				});
			});
	}
});

module.exports = router;
