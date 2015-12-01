'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the gnarly ' + chalk.red('generator-fay') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(this.templatePath('README.md'), this.destinationPath('README.md'));
    this.fs.copy(this.templatePath('package.json'), this.destinationPath('package.json'));

    var that = this;
    this.fetch("https://codeload.github.com/phodal-archive/echeveria-deploy/zip/master", "master.zip", function () {
      console.log("Get Builder Code...");
      that.extract("master.zip", "builder", function (err) {
        console.log(err);
        console.log("Extract ....");
      })

    })
  },

  install: function () {
    this.installDependencies();
  }
});
