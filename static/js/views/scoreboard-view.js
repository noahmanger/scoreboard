'use strict'

var $ = require('jquery');
var Backbone = require('backbone');
var ScoreView = require('./score-view').ScoreView;
var board = require('../collections/board-collection').board;
var scoreboardTemplate = require('../../../views/partials/scoreboard.handlebars');

var ScoreboardView = Backbone.View.extend({
  el: '#scoreboard',
  $el: $('#scoreboard'),
  $list: $('#scoreboard-list'),
  collection: board,
  initialize: function() {
    this.collection.fetch();
    this.listenTo(this.collection, 'add', this.addScore);
  },
  addScore: function(e) {
    var score = new ScoreView({
      model: e,
      id: 'score-' + e.id,
    });
    this.$list.append(score.el);
  },
})

module.exports = {
  ScoreboardView: ScoreboardView
}
