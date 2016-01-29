'use strict'

var $ = require('jquery');
var Backbone = require('backbone');

var board = require('../collections/board-collection').board;

var ScoreMakerView  = Backbone.View.extend({
  el: '#score-maker',
  events: {
    'change input': 'handleChange',
    'submit': 'handleSubmit'
  },
  scoreProperties: {},
  handleChange: function(e) {
    var $target = $(e.target);
    this.scoreProperties[$target.attr('name')] = $target.val();
    this.scoreProperties['count'] = 0;
  },
  handleSubmit: function(e) {
    e.preventDefault();
    board.add(this.scoreProperties);
  }
})

module.exports = {
  ScoreMakerView: ScoreMakerView
}
