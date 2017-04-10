'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yeomanGenerator = require('yeoman-generator');

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

var _camelcase = require('camelcase');

var _camelcase2 = _interopRequireDefault(_camelcase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import yosay from 'yosay'


var _class = function (_Generator) {
  _inherits(_class, _Generator);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'initializing',
    value: function initializing() {
      this.composeWith(require.resolve('generator-git-init'));
      this.composeWith(require.resolve('generator-license'), {
        name: this.user.git.name(),
        email: this.user.git.email(),
        license: 'MIT'
      });
      this.composeWith(require.resolve('generator-travis'));
    }
  }, {
    key: 'prompting',
    value: function prompting() {
      var _this2 = this;

      // console.log(yosay('Hello, and welcome to my generator!'))
      var prompts = [{
        name: 'name',
        message: 'Module name',
        default: this.appname
      }, {
        name: 'description',
        message: 'Module description',
        default: 'This is a awesome project'
      }];
      return this.user.github.username().then(function (githubUsername) {
        return _this2.prompt(prompts).then(function (answers) {
          _this2.props = {
            name: answers.name,
            camelName: (0, _camelcase2.default)(answers.name),
            description: answers.description,
            author: {
              name: _this2.user.git.name(),
              email: _this2.user.git.email()
            },
            github: {
              username: githubUsername
            }
          };
        });
      });
    }
  }, {
    key: 'writing',
    value: function writing() {
      var _this3 = this;

      var tpls = ['.babelrc', '.gitignore', '.editorconfig', 'package.json', 'README.md', 'test/index.test.js', 'src/index.js'];
      tpls.forEach(function (tpl) {
        _this3.fs.copyTpl(_this3.templatePath(tpl), _this3.destinationPath(tpl), _this3.props);
      });
    }
  }, {
    key: 'install',
    value: function install() {
      this.installDependencies({ npm: false });
    }
  }, {
    key: 'end',
    value: function end() {
      console.log('Thanks for choosing Chopper.');
    }
  }]);

  return _class;
}(_yeomanGenerator2.default);

exports.default = _class;


module.exports = exports.default;