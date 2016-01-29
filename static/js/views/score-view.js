'use strict'

var Backbone = require('backbone');
var scoreTemplate = require('../../../views/partials/score.handlebars');

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
    this.model.save({}, function(err, resp) {
      console.log(resp);
    });
  },
  subtractCount: function() {
    this.model.set({count: this.model.get('count') - 1});
    this.model.save();
  },
  drawBar: function(count) {
    this.$el.find('.bar').css({
      width: count + '%'
    })
  }
})

module.exports = {
  ScoreView: ScoreView
}
