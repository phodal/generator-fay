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
    this.fs.copy([
        this.templatePath() + '/fay-builder/**',
        this.templatePath() + '/fay-builder/**/.*',
        '!fay-builder/**/{gulpfile.js,bower.json,package.json,.git,.npmignore,.gitignore,wct.conf.js,docs,test}/**'],
      this.destinationPath('builder/')
    );

    this.fs.copy(this.templatePath('README.md'), this.destinationPath('README.md'));
    this.fs.copy(this.templatePath('package.json'), this.destinationPath('package.json'));

    this.fs.copy(
      this.templatePath('fay-builder/package.json'),
      this.destinationPath('builder/package.json')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
