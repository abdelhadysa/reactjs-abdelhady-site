/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

class httpException extends Error {
    constructor (status, message) {
        super()
        this.name = this.constructor.name
        this.statusCode = status
        this.message = `HTTP ERROR ${status}: ${message}`
    }
}

export default httpException