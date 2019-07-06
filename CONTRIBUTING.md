## How to release

```console
$ export NEXT_VERSION=v1.0.2

## Generate CHANGELOG.md
$ git-chglog --next-tag $NEXT_VERSION $NEXT_VERSION

## Update version & Add git tag
$ vim src/ext/manifest.json
$ git add .
$ yarn version --new-version $NEXT_VERSION

## Push
$ git push
$ git push --tags

## Generate zip
$ rm -rf dist
$ yarn run build
$ zip -r ext.zip dist/ext

## Publish zip
$ open https://chrome.google.com/webstore/devconsole
$ open https://addons.mozilla.org/ja/developers
```
