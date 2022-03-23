const crypto = require('crypto')
const dotenv = require('dotenv')
dotenv.config()
const metaUser = [
    {
        Uuid: crypto.randomUUID(),
        Username: 'abdelhady',
        Email: 'abdelhady@abdelhady.com.de',
        IpAddress: '127.0.0.1',
        Device: 'Unknown',
        Roles: [0, 1, 2],
    },
    {
        Uuid: crypto.randomUUID(),
        Username: 'abdelrahman',
        Email: 'abdelrahman@abdelrahman.com',
        IpAddress: '127.0.0.1',
        Device: 'Unknown',
        Roles: [0, 1],
    },
    {
        Uuid: crypto.randomUUID(),
        Username: 'marwan',
        Email: 'marwan@marwan.com',
        IpAddress: '127.0.0.1',
        Device: 'Unknown',
        Roles: [0],
    },
    {
        Uuid: crypto.randomUUID(),
        Username: 'minyoo',
        Email: 'minyoo@minyoo.com',
        IpAddress: '127.0.0.1',
        Device: 'Unknown',
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
        Name: process.env.DEFAULT_USER,
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
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get reactions',
        Description: 'Get all reactions',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get reaction',
        Description: 'Get one reaction',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Create reaction',
        Description: 'Create a new reaction',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Alter reaction',
        Description: 'Update or delete one reaction',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get logs',
        Description: 'Get all logs',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get log',
        Description: 'Get one log',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Create log',
        Description: 'Create a new log',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Alter log',
        Description: 'Update or delete one log',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get tags',
        Description: 'Get all tags',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get tag',
        Description: 'Get one tag',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Create tag',
        Description: 'Create a new tag',
        Roles: [2],
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Alter tag',
        Description: 'Update or delete one tag',
        Roles: [2],
    },
]

let metaRolePermission = []

for (const permission of metaPermission) {
    for (const permissionRole of permission.Roles) {
        metaRolePermission.push({
            Uuid: crypto.randomUUID(),
            RoleUuid: metaRole[permissionRole].Uuid,
            PermissionUuid: permission.Uuid,
        })
    }
}

let metaUserRolePermission = []

for (const user of metaUser) {
    for (const userRole of user.Roles) {
        for (const rolePermission of metaRolePermission) {
            if (rolePermission.RoleUuid === metaRole[userRole].Uuid) {
                metaUserRolePermission.push({
                    Uuid: crypto.randomUUID(),
                    UserUuid: user.Uuid,
                    RolePermissionUuid: rolePermission.Uuid,
                })
            }
        }
    }
}

const metaReaction = [
    {
        Uuid: crypto.randomUUID(),
        Name: 'Heart',
        Points: 1
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Support',
        Points: 2
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Confused',
        Points: 1
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Sad',
        Points: 1
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Angry',
        Points: 1
    }
]

let metaMessageReaction = []

for (const message of metaMessage) {
    for (const reaction of metaReaction) {
        metaMessageReaction.push({
            Uuid: crypto.randomUUID(),
            MessageUuid: message.Uuid,
            ReactionUuid: reaction.Uuid,
        })
    }
}

const metaUserMessageReaction = [
    {
        Uuid: crypto.randomUUID(),
        UserUuid: metaUser[0].Uuid,
        MessageReactionUuid: metaMessageReaction[0].Uuid,
    },
    {
        Uuid: crypto.randomUUID(),
        UserUuid: metaUser[0].Uuid,
        MessageReactionUuid: metaMessageReaction[1].Uuid,
    },
    {
        Uuid: crypto.randomUUID(),
        UserUuid: metaUser[1].Uuid,
        MessageReactionUuid: metaMessageReaction[2].Uuid,
    },
    {
        Uuid: crypto.randomUUID(),
        UserUuid: metaUser[2].Uuid,
        MessageReactionUuid: metaMessageReaction[3].Uuid,
    },
    {
        Uuid: crypto.randomUUID(),
        UserUuid: metaUser[3].Uuid,
        MessageReactionUuid: metaMessageReaction[4].Uuid,
    },
]

module.exports = {
    metaUser,
    metaMessage,
    metaRole,
    metaPermission,
    metaRolePermission,
    metaUserRolePermission,
    metaReaction,
    metaMessageReaction,
    metaUserMessageReaction,
}