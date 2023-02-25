'use strict';

const express = require('express');
const router = express.Router();

const commentController = require('../../controllers/comment')

module.exports = function() {
  router.post("/", commentController.createComment);
  router.get("/", commentController.getComments);

  return router;
}