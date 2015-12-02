'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to use Fay !'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'mobile',
      message: 'Would you like to enable to add mobile app?',
      default: false
    }, {
      type: 'confirm',
      name: 'editor',
      message: 'Would you like to enable to add editor?',
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copy([
        this.templatePath() + '/fay-builder/**', this.templatePath() + '/fay-builder/**/.*'],
      this.destinationPath('builder/')
    );

    this.fs.copy(this.templatePath('README.md'), this.destinationPath('README.md'));
    this.fs.copy(this.templatePath('package.json'), this.destinationPath('package.json'));

    if(this.props.mobile) {
      this.fs.copy([
          this.templatePath() + '/fay-mobile/**', this.templatePath() + '/fay-mobile/**/.*'],
        this.destinationPath('mobile/')
      );
    }

    if(this.props.editor) {
      console.log("======================");
    }
  },

  install: function () {
    this.installDependencies({bower: false});
  }
});
