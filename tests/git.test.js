const { expect } = require('chai');
const { Git } = require('../utils/git');

describe('Git:', () => {
  describe('История коммитов', function() {
    it('история из одного коммита', async () => {
      const git = new Git(),
        page = 1,
        size = 20;

      const history = [
        {
          hash: '47bf8fa8640ef92fd',
          author: 'Mikhail Guskov',
          timestamp: '2018-10-21 00:59:39 +0300',
          msg: 'first commit'
        }
      ];

      const output = '47bf8fa8640ef92fd\tMikhail Guskov\t2018-10-21 00:59:39 +0300\tfirst commit';

      git.executeGit = () => {
        return Promise.resolve(output);
      };

      const result = await git.gitHistory(page, size);
      expect(result).to.eql(history);
    });

    it('история из нескольких коммитов', async () => {
      const git = new Git(),
        page = 1,
        size = 20;

      const history = [
        {
          hash: '47bf8fa8640ef92fd',
          author: 'Mikhail Guskov',
          timestamp: '2018-10-21 00:59:39 +0300',
          msg: 'first commit'
        },
        {
          hash: 'd6bffbf443ff0f4183',
          author: 'Mikhail Guskov',
          timestamp: '2018-10-21 05:57:35 +0300',
          msg: 'Второй коммит'
        }
      ];

      const output =
        '47bf8fa8640ef92fd\tMikhail Guskov\t2018-10-21 00:59:39 +0300\tfirst commit\nd6bffbf443ff0f4183\tMikhail Guskov\t2018-10-21 05:57:35 +0300\tВторой коммит';

      git.executeGit = () => {
        return Promise.resolve(output);
      };

      const result = await git.gitHistory(page, size);
      expect(result).to.eql(history);
    });

    it('пустая история', async () => {
      const git = new Git();

      git.executeGit = () => {
        return Promise.resolve('');
      };

      const result = await git.gitHistory();
      expect(result).to.eql([]);
    });
  });

  describe('Файловая структура', function() {
    it('файл и папка', async () => {
      const git = new Git();
      const hash = 'd6bffbf443ff0f4183';

      const output =
        '040000 tree 47bf8fa8640ef92fd8c\tutils\n100644 blob 0d2de48d5a9f41563291d\tapp.js\n';

      const fileTree = [
        {
          type: 'tree',
          hash: '47bf8fa8640ef92fd8c',
          path: 'utils'
        },
        {
          type: 'blob',
          hash: '0d2de48d5a9f41563291d',
          path: 'app.js'
        }
      ];

      git.executeGit = () => {
        return Promise.resolve(output);
      };

      const result = await git.gitFileTree(hash);
      expect(result).to.eql(fileTree);
    });

    it('один файл', async () => {
      const git = new Git();
      const hash = 'd6bffbf443ff0f4183';

      const output = '100644 blob 0d2de48d5a9f41563291d\tapp.js\n';

      const fileTree = [
        {
          type: 'blob',
          hash: '0d2de48d5a9f41563291d',
          path: 'app.js'
        }
      ];

      git.executeGit = () => {
        return Promise.resolve(output);
      };

      const result = await git.gitFileTree(hash);
      expect(result).to.eql(fileTree);
    });
  });

  describe('Файл', function() {
    it('содержимое файла', async () => {
      const git = new Git();
      const hash = 'd6bffbf443ff0f4183';

      const fileContent = '# Домашнее задание: автотесты\n\n';

      git.executeGit = () => {
        return Promise.resolve(fileContent);
      };

      const result = await git.gitFileContent(hash);
      expect(result).to.eql(fileContent);
    });
  });
});
