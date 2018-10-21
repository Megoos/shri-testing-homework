const { expect } = require('chai');
const { buildBreadcrumbs, buildFolderUrl, buildFileUrl } = require('../utils/navigation');

describe('Навигация:', () => {
  describe('Формирование пути', () => {
    it('к файловой структуре коммита', () => {
      const parentHash = '9d685b4d220edb9784edae8';
      const path = '';
      const url = '/files/9d685b4d220edb9784edae8/';

      const result = buildFolderUrl(parentHash, path);
      expect(result).to.eql(url);
    });

    it('к файлу', () => {
      const parentHash = '9d685b4d220edb9784edae8';
      const path = '';
      const url = '/content/9d685b4d220edb9784edae8/';

      const result = buildFileUrl(parentHash, path);
      expect(result).to.eql(url);
    });
  });

  describe('"Хлебные крошки"', () => {
    it('при наличии path', () => {
      const hash = '9d685b4d220edb9784edae8';
      const path = 'utils/git.js';

      const breadcrumbs = [
        { text: 'HISTORY', href: '/' },
        {
          text: 'ROOT',
          href: '/files/9d685b4d220edb9784edae8/'
        },
        {
          text: 'utils',
          href: '/files/9d685b4d220edb9784edae8/utils/'
        },
        { text: 'git.js' }
      ];

      const result = buildBreadcrumbs(hash, path);
      expect(result).to.eql(breadcrumbs);
    });

    it('корневая директория', () => {
      const result = buildBreadcrumbs();

      const breadcrumbs = [{ text: 'HISTORY', href: undefined }];
      expect(result).to.eql(breadcrumbs);
    });
  });
});
