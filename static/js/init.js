'use strict'

var $ = require('jquery');
var Backbone = require('backbone');
var Handlebars = require('handlebars');

// Collections
var BoardCollection = require('./collections/board-collection');

// Views
var ScoreboardView = require('./views/scoreboard-view').ScoreboardView;
var ScoreMakerView = require('./views/scoremaker-view').ScoreMakerView;

new ScoreboardView();
new ScoreMakerView();
