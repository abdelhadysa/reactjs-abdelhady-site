/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

// Ref: https://dev.to/adrai/how-to-properly-internationalize-a-react-application-using-i18next-3hdb

import { DateTime } from 'luxon'

//24-hour clock separation of times

export default function getGreetingTime(d = DateTime.now()) {
    const currentTime = parseFloat(d.toFormat('HH'))
    switch (currentTime) {
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11: return 'morning'
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18: return 'afternoon'
        case 19:
        case 20:
        case 21:
        case 22:
        case 23: return 'evening'
        default: return 'night'
    }
}