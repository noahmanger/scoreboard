'use strict'

var $ = require('jquery');
var Backbone = require('backbone');
var Handlebars = require('handlebars');

// Templates
var scoreboardTemplate = require('../../views/partials/scoreboard.handlebars');
var scoreTemplate = require('../../views/partials/score.handlebars');

// Models
var Score = Backbone.Model.extend({
  urlRoot: '/scores',
});

// Collections
var ScoreboardCollection = Backbone.Collection.extend({
  model: Score,
  url: '/scores',
});

var scoreboard = new ScoreboardCollection;
scoreboard.fetch();

// Views
var ScoreMaker  = Backbone.View.extend({
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
    var score = new Score(this.scoreProperties);
    scoreboard.add(score);
    score.save();
  }
})

var ScoreView = Backbone.View.extend({
  events: {
    'click #add-count': 'addCount',
    'click #subtract-count': 'subtractCount'
  },
  template: scoreTemplate,
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.drawBar(this.model.get('count'));
    return this;
  },
  addCount: function() {
    this.model.set({count: this.model.get('count') + 1});
  },
  subtractCount: function() {
    this.model.set({count: this.model.get('count') - 1});
  },
  drawBar: function(count) {
    this.$el.find('.bar').css({
      width: count + '%'
    })
  }

})

var ScoreboardView = Backbone.View.extend({
  el: '#scoreboard',
  $el: $('#scoreboard'),
  $list: $('#scoreboard-list'),
  collection: scoreboard,
  initialize: function() {
    this.listenTo(scoreboard, 'add', this.addScore);
  },
  addScore: function(e) {
    var score = new ScoreView({
      model: e,
      id: 'score-' + e.id,
    });
    this.$list.append(score.el);
  }
})

new ScoreboardView();
new ScoreMaker();
