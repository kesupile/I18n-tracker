# i18n-tracker
i18n-tracker is a command line tool that monitors the state of your I18n translation files and makes sure that none of your translation properties slip through the cracks. This package aims to make managing your translations simpler and works well with i18n based packages such as [this](https://github.com/JSxMachina/react-i18nify).
i18n-tracker logs messages in either English, Spanish, German or French, depending on what locale your OS is set to.

## Contents
1. [Setup](#setup)
2. [Track](#track)
3. [Automatic Injection](#automatic-injection)
4. [Get Translations](#get-translations)
5. [Upcoming Features](#upcoming-features)


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
Add this file to your **gitignore** if you don't want to push it to github. **NOTE:** This file is needed if you intend to use [i18n-tracker-helper](#get-translations)

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


## Automatic Injection
i18n-tracker can inject the missing props into your translation files with very little effort. To do this you must add a **placeholder** property to your **i18n-tracker.config.json**. The placeholder can be set to any string of your choosing. Alternatively you can use the default string by setting the placeholder property to ```true```, in which case the placeholder will be **"\_\_\_REPLACE ME\_\_\_"**. After that simply run the following command:

##### command
```
$ i18n-track
```

###### Result
![alt text](https://github.com/kesupile/I18n-tracker/blob/master/images/before_after_automatic_injection.png?raw=true "i18n-track injection result")

Note the console will still log the missing properties to the console for your reference.

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
1. In version 1.3.0 i18n-tracker will be able to track additional props in translation files that are missing in the base file

Feel free to request features for this or the [i18n-tracker-helper](https://github.com/kesupile/i18n-tracker-helper) module. Stay tuned!
