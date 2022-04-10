// Ref: https://scoutapm.com/blog/express-error-handling

export default function errorResponder(err, req, res, next) {
    res.header('Content-Type', 'application/json')
    res.status(err.statusCode ? err.statusCode : 500).send(JSON.stringify({ error: err }, null, 4))
    res.end()
}