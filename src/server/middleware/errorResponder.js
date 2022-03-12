/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

// Ref: https://scoutapm.com/blog/express-error-handling

export default function errorResponder(err, req, res, next) {
    res.header('Content-Type', 'application/json')
    res.status(err.statusCode ? err.statusCode : 500).send(JSON.stringify({ error: err }, null, 4))
    res.end()
}