## How to release

```console
$ export NEXT_VERSION = 1.0.2

## Generate CHANGELOG.md
$ git-chglog --next-tag $NEXT_VERSION $NEXT_VERSION

## Update version & Add git tag
$ yarn version --new-version $NEXT_VERSION

## Push
$ git push --tags

## Generate zip
$ zip -r ext.zip dist/ext

## Publish zip
$ open https://chrome.google.com/webstore/devconsole
$ open https://addons.mozilla.org/ja/developers
```
