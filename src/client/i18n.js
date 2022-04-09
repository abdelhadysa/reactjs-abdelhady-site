/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

// Ref: https://dev.to/adrai/how-to-properly-internationalize-a-react-application-using-i18next-3hdb

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { DateTime } from 'luxon'

const langs = {
    en: { nativeName: 'English' },
    ar: { nativeName: 'العربية' }
}

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: process.env.NODE_ENV === 'development' ? true : false,
        fallbackLng: 'en',
        supportedLngs: Object.keys(langs),
        keySeparator: '.',
        interpolation: {
            escapeValue: false,
            format: (value, format, lng) => {
                if (value instanceof Date) {
                    return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime[format])
                }
            }
        },
        react: {
            useSuspense: true,
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',  
        },
    })

export default i18n