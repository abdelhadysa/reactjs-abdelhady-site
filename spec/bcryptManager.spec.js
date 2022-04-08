import { hashPass, tryPass } from '../src/server/utils/bcryptManager.js'
describe('A Bcrypt Manager', () => {
    it('can hash a string and return it', async () => {
        const hash = await hashPass('Some cool pass')
        expect(hash).not.toBe(undefined)
        expect(hash).toEqual(jasmine.any(String))
    })
    it('can verify valid hash and return true', async () => {
        // Test hash
        // Bcrypt (Salt Rounds: 10, String: "Another cool pass")
        const pass = 'Another cool pass'
        const hash = '$2a$10$dRr5u/STKXD3H6bCQMqkOewszJG7qsn6bTE3nndNs4QdQEqqgx/2W'
        const verify = await tryPass(pass, hash)
        expect(verify).toBe(true)
    })
    it('can detect invalid hash and return false', async () => {
        // Test hash
        // Bcrypt (Salt Rounds: 10, String: "Another cool pass")
        const pass = 'This pass is wrong'
        const hash = '$2a$10$dRr5u/STKXD3H6bCQMqkOewszJG7qsn6bTE3nndNs4QdQEqqgx/2W'
        const verify = await tryPass(pass, hash)
        expect(verify).toBe(false)
    })
})