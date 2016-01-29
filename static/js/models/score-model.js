'use strict'

var Backbone = require('backbone');

var ScoreModel = Backbone.Model.extend({
  url: '/scores',
  urlRoot: '/',
  idAttribute: '_id',
  initialize: function() {
    if (this.isNew()) {
      this.save({},{
        error: function(model, response, opts) {
          console.log(response);
        },
      });
    }
  }
});

module.exports = {
  ScoreModel: ScoreModel
}
