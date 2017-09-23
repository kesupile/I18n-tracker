# i18n-tracker
i18n-tracker is a command line tool that monitors the state of your I18n translation files and makes sure that none of your translation properties slip through the cracks. This package aims to make managing your translations simpler and works well with i18n based packages such as [this](https://github.com/JSxMachina/react-i18nify).

## Contents
1. [Setup](#setup)
2. [Track](#track)
3. [Get Translations](#get-translations)
4. [Upcoming Features](#upcoming-features)


## Setup

#### Install i18n-tracker globally
```
$ npm install -g i18n-tracker

```

#### File Structure
Create a translations folder where you will store all the translation files. Create the following files: **i18n-tracker.config.json** and **translationLanguage.js** (create a one for each supported language).

##### ./i18n-tracker.config.json
Two required properties: base (Array), translations (Object)
```json
{
  "base": ["en", "English"],
  "translations": {
    "de": "German",
    "fr": "French"
  }
}
```

##### ./en.js
```javascript
module.exports = {
  television: 'television',
  chair: 'chair',
  kitchen: {
    stove: 'stove',
    sink: 'sink'
  },
  bedroom: {
    bed: 'bed',
    wardrobe: 'wardrobe'
  }
}
```

##### ./de.js
```javascript
module.exports = {
  chair: 'Sessel',
  bedroom: {
    bed: 'Bett',
    wardrobe: 'Kleiderschrank'
  }
}
```

##### ./fr.js
```javascript
module.exports = {
  chair: 'chaise',
  kitchen: {
    stove: 'poêle'
  },
  bedroom: {
    bed: 'lit',
    wardrobe: 'garde-robe'
  }
}
```

## Track
i18n-tracker is installed globally and so can be used from any translation directory. Track will inspect translation files and log any discrepancies to the console.

##### Command
```
$ i18n-track
```

##### Result
![alt text](https://github.com/kesupile/I18n-tracker/blob/master/images/track_example.PNG?raw=true "i18n-track result")

## Get Translations

##### Install i18n-tracker-helper to merge files
```javascript
$ npm install --save i18n-tracker-helper
```

In your i18n file use **getTranslations** to merge

```javascript
const I18n = require('react-i18nify').I18n
const { getTranslations } = require('i18n-tracker-helper')

const translations = getTranslations()
/* returns
{
    en: {
        television: 'television',
        chair: 'chair',
        kitchen: {
            stove: 'stove',
            sink: 'sink'
        },
        bedroom: {
            bed: 'bed',
            wardrobe: 'wardrobe'
        }
    },
    de: {
        chair: 'Sessel',
        bedroom: {
            bed: 'Bett',
            wardrobe: 'Kleiderschrank'
        }
    },
    fr: {
        chair: 'chaise',
        kitchen: {
            stove: 'poêle'
        },
        bedroom: {
            bed: 'lit',
            wardrobe": "garde'robe'
        }
    }
} */

I18n.setTranslations(translations)

```

## Upcoming Features
1. Version 1.1.0 will have support for German, French and Spanish (ironic, i know ;) )
2. In version 1.2.0 i18n-tracker will automatically populate missing fields.
3. In version 1.3.0 i18n-tracker will be able to track additional props in translation files that are missing in the base file

Feel free to request features for this or the [i18n-tracker-helper](https://github.com/kesupile/i18n-tracker-helper) module. Stay tuned!
