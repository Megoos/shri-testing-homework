const assert = require('assert');

describe('отображение содержимого на странице', () => {
  it('история коммитов', function() {
    return this.browser
      .url('/')
      .isExisting('.commits-history')
      .then(exists => assert.ok(exists, 'история коммитов не отображается'));
  });

  describe('содержимое коммита', () => {
    it('информация', function() {
      return this.browser
        .url('/')
        .isExisting('.content .commit:first-child .commit__info')
        .then(exists => assert.ok(exists, 'коммит не содержит информации'));
    });
    it('сообщение коммита', function() {
      return this.browser
        .url('/')
        .isExisting('.content .commit:first-child .commit__msg')
        .then(exists => assert.ok(exists, 'коммит не содержит сообщения'));
    });
    it('ссылка', function() {
      return this.browser
        .url('/')
        .isExisting('.content .commit:first-child .commit__link a')
        .then(exists => assert.ok(exists, 'коммит не содержит ссылки'));
    });
  });

  it('файловая система', function() {
    return this.browser
      .url('/files/cc2284293758e32c50fa952da2f487c8c5e8d023/')
      .isExisting('.files-tree')
      .then(exists => assert.ok(exists, 'файловая система не отображается'));
  });

  it('содержимое файла', function() {
    return this.browser
      .url('/content/cc2284293758e32c50fa952da2f487c8c5e8d023/app.js')
      .isExisting('.file-content')
      .then(exists => assert.ok(exists, 'содержимое файла не отображается'));
  });
});

describe('переходы по страницам', () => {
  it('из списка коммитов на список файлов', function() {
    return this.browser
      .url('/')
      .click('.commit__link a')
      .isExisting('.files-tree')
      .then(exists => assert.ok(exists, 'из списка коммитов на список файлов не удался'));
  });

  it('из списка файлов во вложенную папку', function() {
    return this.browser
      .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
      .click('.files-tree li a[href$="utils"]')
      .isExisting('.files-tree')
      .then(exists => assert.ok(exists, 'из списка файлов во вложенную папку не удался'));
  });

  it('из списка файлов на страницу отдельного файла', function() {
    return this.browser
      .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
      .click('.files-tree li a[href$="app.js"]')
      .isExisting('.file-content')
      .then(exists => assert.ok(exists, 'из списка файлов на страницу отдельного файла не удался'));
  });

  it('переход по хлебным крошкам', function() {
    return this.browser
      .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
      .click('.breadcrumbs a[href="/"]')
      .isExisting('.commits-history')
      .then(exists => assert.ok(exists, 'переход по хлебным крошкам не удался'));
  });
});