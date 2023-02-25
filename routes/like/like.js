'use strict';

const express = require('express');
const router = express.Router();

const likeController = require('../../controllers/like')

module.exports = function() {
  router.post("/like", likeController.like);
  router.post("/unlike", likeController.unlike);

  return router;
}