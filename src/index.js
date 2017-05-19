import Generator from 'yeoman-generator'
import yosay from 'yosay'
import camelCase from 'camelcase'

export default class extends Generator {
  initializing () {
    this.composeWith(require.resolve('generator-git-init'))
    this.composeWith(require.resolve('generator-license'), {
      name: this.user.git.name(),
      email: this.user.git.email(),
      license: 'MIT'
    })
    this.composeWith(require.resolve('generator-travis'))
  }

  prompting () {
    console.log(yosay('Hello, and welcome to chopper!'))
    const prompts = [{
      name: 'name',
      message: 'Module name',
      default: this.appname
    }, {
      name: 'description',
      message: 'Module description',
      default: 'This is a awesome project'
    }]
    return this.user.github.username()
      .then(githubUsername => {
        return this.prompt(prompts)
          .then(answers => {
            this.props = {
              name: answers.name,
              camelName: camelCase(answers.name),
              description: answers.description,
              author: {
                name: this.user.git.name(),
                email: this.user.git.email()
              },
              github: {
                username: githubUsername
              }
            }
          })
      })
  }

  writing () {
    const dottpls = ['babelrc', 'gitignore', 'editorconfig']
    const tpls = ['package.json', 'README.md', 'test/index.test.js', 'src/index.js']
    dottpls.forEach(tpl => {
      this.fs.copyTpl(
        this.templatePath(tpl),
        this.destinationPath(`.${tpl}`),
        this.props
      )
    })
    tpls.forEach(tpl => {
      this.fs.copyTpl(
        this.templatePath(tpl),
        this.destinationPath(tpl),
        this.props
      )
    })
  }

  install () {
    this.installDependencies({npm: true, bower: false})
  }

  end () {
    console.log('Thanks for choosing Chopper.')
  }
}

module.exports = exports.default
