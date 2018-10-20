
# Выполнение домашнего задания

## Модульные тесты

### - Список логических блоков и их сценарии

- Получение истории коммитов (На вход принимает номер страницы и количество элементов на страницы, на выходе массив с историей коммитов. Включает в себя отдельный элемент коммит.)

- Получение списка файлов (Получение списка файлов для выбранного коммита по его `hash`. Включает в себя отдельный элемент файл.)

- Получение содержимого файла (На вход принимает `hash` файла и выводит его содержимое.)

---

# Домашнее задание: автотесты

Вам дано приложение на JavaScript и нужно написать для него автотесты: интеграционные тесты на интерфейс и модульные тесты на серверную часть.

## Предметная область

Приложение отображает в браузере информацию из git репозитория: список коммитов, файловую систему для выбранного коммита, содержимое выбранного файла (поддерживаются только текстовые форматы). Для удобства навигации на каджой странице отображаются "хлебные крошки".

## Как запустить

```sh
git clone git@github.com:dima117/shri-testing-homework.git
cd shri-testing-homework.git
npm i
npm start
```

## Интеграционные тесты

Сценарии для интеграционных тестов

- на всех страницах (история коммитов, просмотр файловой системы, просмотр содержимого файла) правильно отображается их содержимое;
- правильно работают переходы по страницам
  - из списка коммитов на список файлов
  - из списка файлов во вложенную папку
  - из списка файлов на страницу отдельного файла
  - переходы по хлебным крошкам

## Модульные тесты

- нужно добавить в README список логических блоков системы и их сценариев
- для каждого блока нужно написать модульные тесты
- если необходимо, выполните рефакторинг, чтобы реорганизовать логические блоки или добавить точки расширения
