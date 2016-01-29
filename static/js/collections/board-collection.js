'use strict'

var Backbone = require('backbone');
var ScoreModel = require('../models/score-model').ScoreModel;

// Collections
var BoardCollection = Backbone.Collection.extend({
  model: ScoreModel,
  url: '/scores',
  initialize: function() {
    
  },
});

var board = new BoardCollection;
module.exports = {
  BoardCollection: BoardCollection,
  board: board
}
