const crypto = require('crypto')
const metaUser = [
    {
        Uuid: crypto.randomUUID(),
        Username: 'abdelhady',
        Roles: [0, 1, 2],
    },
    {
        Uuid: crypto.randomUUID(),
        Username: 'abdelrahman',
        Roles: [0, 1],
    },
    {
        Uuid: crypto.randomUUID(),
        Username: 'marwan',
        Roles: [0],
    },
    {
        Uuid: crypto.randomUUID(),
        Username: 'minyoo',
        Roles: [0],
    },
]

const metaMessage = [
    {
        Uuid: crypto.randomUUID(),
        Title: 'I am abdelhady',
        Text: 'I like programming',
        UserUuid: metaUser[0].Uuid,
    },
    {
        Uuid: crypto.randomUUID(),
        Title: 'I am abdelrahman',
        Text: 'I like biology',
        UserUuid: metaUser[1].Uuid,
    },
    {
        Uuid: crypto.randomUUID(),
        Title: 'I am marwan',
        Text: 'I like mathematics',
        UserUuid: metaUser[2].Uuid,
    },
    {
        Uuid: crypto.randomUUID(),
        Title: 'I am minyoo',
        Text: 'I like mathematics too, as much as marwan does...',
        UserUuid: metaUser[3].Uuid,
    },
    {
        Uuid: crypto.randomUUID(),
        Title: 'Did you know?',
        Text: 'I like anime, too!',
        UserUuid: metaUser[3].Uuid,
    },
]

const metaRole = [
    {
        Uuid: crypto.randomUUID(),
        Name: 'User',
        Description: 'Regular user with normal privileges',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Author',
        Description: 'A user who can submit new messages to the blog',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Admin',
        Description: 'An advanced user with super privileges',
    },
]

const metaPermission = [
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get users',
        Description: 'Get all users',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get user',
        Description: 'Get one user',
        Roles: [2, 1, 0],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Create user',
        Description: 'Create a new user',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Alter user',
        Description: 'Update or delete one user',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get roles',
        Description: 'Get all roles',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get role',
        Description: 'Get one role',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Create role',
        Description: 'Create a new role',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Alter role',
        Description: 'Update or delete one role',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get permissions',
        Description: 'Get all permissions',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get permission',
        Description: 'Get one permission',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Create permission',
        Description: 'Create a new permission',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Alter permission',
        Description: 'Update or delete one permission',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get messages',
        Description: 'Get all messages',
        Roles: [2, 1, 0],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get message',
        Description: 'Get one message',
        Roles: [2, 1, 0],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Create message',
        Description: 'Create a new message',
        Roles: [2, 1],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Alter message',
        Description: 'Update or delete one message',
        Roles: [2, 1],
    },
]

module.exports = {
    metaUser,
    metaMessage,
    metaRole,
    metaPermission,
}