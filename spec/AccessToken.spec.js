import AccessToken from '../src/server/utils/AccessToken'
describe('AccessToken', () => {
    it('can sign access tokens', async () => {
        const accessToken = new AccessToken({
            secret: '123',
            expiresIn: 30, // 30 seconds
            refreshAfter: 15, // 15 seconds
            log: true,
        })
        const token = await accessToken.sign({ username: 'tester1' })
        expect(token).toEqual(jasmine.any(String))
        expect(token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/) // RegEx to validate JWT tokens
        console.log('Token: ' + token)
    })
    it('can verify access tokens', async () => {
        const accessToken = new AccessToken({
            secret: '123',
            expiresIn: 30, // 30 seconds
            refreshAfter: 15, // 15 seconds
            log: true,
        })
        const token = await accessToken.sign({ username: 'tester1' })
        const verified = await accessToken.verify({ token, decode: false })
        expect(verified).toBe(true)
        console.log('Verified: ' + verified)
    })
    it('can decode access tokens', async () => {
        const accessToken = new AccessToken({
            secret: '123',
            expiresIn: 30, // 30 seconds
            refreshAfter: 15, // 15 seconds
            log: true,
        })
        const token = await accessToken.sign({ username: 'tester1' })
        const decoded = await accessToken.verify({ token, decode: true })
        expect(decoded).toEqual(jasmine.any(Object))
        expect(decoded.username).toBe('tester1')
        console.log('Decoded: ' + decoded.username + ', can refresh at ' + new Date(Math.floor(decoded.refreshAfter * 1000)))
    })
    it('can refresh access tokens', async () => {
        const accessToken = new AccessToken({
            secret: '123',
            expiresIn: 2, // expire in 2 seconds
            refreshAfter: 0, // renew immediately
            log: true,
        })
        const token = await accessToken.sign({ username: 'tester1' })
        const newToken = await accessToken.refresh(token)
        expect(newToken).toEqual(jasmine.any(String))
        expect(newToken).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/) // RegEx to validate JWT tokens
        console.log('New Token: ' + newToken)
    })
    it('throws an error if refreshAfter didn\'t pass yet', async () => {
        const accessToken = new AccessToken({
            secret: '123',
            expiresIn: 2, // expire in 2 seconds
            refreshAfter: 2, // renew immediately
            log: true,
        })
        const token = await accessToken.sign({ username: 'tester1' })
        await expectAsync(accessToken.refresh(token)).toBeRejectedWith(new Error('2 seconds left to be eligible for AccessToken refresh'))
    })
})