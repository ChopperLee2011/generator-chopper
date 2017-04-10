import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'

describe('chopper:app ', () => {
  beforeEach(() => {
    return helpers.run(path.join(__dirname, '../app'))
      .withPrompts({name: 'testApp'})
  })

  it('generates expected files', () => {
    assert.file([
      'package.json',
      'LICENSE',
      '.git',
      '.babelrc',
      '.gitignore',
      '.editorconfig',
      'README.md',
      'test/index.test.js',
      'src/index.js'])
  })
})
