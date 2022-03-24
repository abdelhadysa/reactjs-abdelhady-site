const crypto = require('crypto')
const dotenv = require('dotenv')
dotenv.config()

const userRoleIdx = 0
const adminRoleIdx = 1

const abdelhadyUserIdx = 0
const abdelrahmanUserIdx = 1
const marwanUserIdx = 2
const minyooUserIdx = 3

/*
 * START META USER
 * ADD USERS
 */

const metaUser = [
    {
        Uuid: crypto.randomUUID(),
        Username: 'abdelhady',
        Email: 'abdelhady@abdelhady.com.de',
        IpAddress: '127.0.0.1',
        Device: 'Unknown',
        Roles: [userRoleIdx, adminRoleIdx],
    },
    {
        Uuid: crypto.randomUUID(),
        Username: 'abdelrahman',
        Email: 'abdelrahman@abdelrahman.com',
        IpAddress: '127.0.0.1',
        Device: 'Unknown',
        Roles: [userRoleIdx],
    },
    {
        Uuid: crypto.randomUUID(),
        Username: 'marwan',
        Email: 'marwan@marwan.com',
        IpAddress: '127.0.0.1',
        Device: 'Unknown',
        Roles: [userRoleIdx],
    },
    {
        Uuid: crypto.randomUUID(),
        Username: 'minyoo',
        Email: 'minyoo@minyoo.com',
        IpAddress: '127.0.0.1',
        Device: 'Unknown',
        Roles: [userRoleIdx],
    },
]

/*
 * END META USER
 * ADD USERS
 */

/*
 * START META MESSAGE
 * ADD MESSAGES
 */

const metaMessage = [
    {
        Uuid: crypto.randomUUID(),
        Title: 'I am abdelhady',
        Text: 'I like programming',
        UserUuid: metaUser[abdelhadyUserIdx].Uuid,
    },
    {
        Uuid: crypto.randomUUID(),
        Title: 'I am abdelrahman',
        Text: 'I like biology',
        UserUuid: metaUser[abdelrahmanUserIdx].Uuid,
    },
    {
        Uuid: crypto.randomUUID(),
        Title: 'I am marwan',
        Text: 'I like mathematics',
        UserUuid: metaUser[marwanUserIdx].Uuid,
    },
    {
        Uuid: crypto.randomUUID(),
        Title: 'I am minyoo',
        Text: 'I like mathematics too, as much as marwan does...',
        UserUuid: metaUser[minyooUserIdx].Uuid,
    },
    {
        Uuid: crypto.randomUUID(),
        Title: 'Did you know?',
        Text: 'I like anime, too!',
        UserUuid: metaUser[minyooUserIdx].Uuid,
    },
]

/*
 * END META MESSAGE
 * ADD MESSAGES
 */

/*
 * START META ROLE
 * ADD ROLES
 */

const metaRole = [
    {
        Uuid: crypto.randomUUID(),
        Name: process.env.DEFAULT_USER,
        Description: 'Regular user with normal privileges',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: process.env.SUPER_USER,
        Description: 'An advanced user with super privileges',
    },
]

/*
 * END META ROLE
 * ADD ROLES
 */

/*
 * START META PERMISSION
 * ADD PERMISSIONS
 */

let metaPermission = [
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get users',
        Description: 'Get all users',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get user',
        Description: 'Get one user',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Create user',
        Description: 'Create a new user',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Alter user',
        Description: 'Update or delete one user',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get roles',
        Description: 'Get all roles',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get role',
        Description: 'Get one role',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Create role',
        Description: 'Create a new role',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Alter role',
        Description: 'Update or delete one role',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get permissions',
        Description: 'Get all permissions',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get permission',
        Description: 'Get one permission',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Create permission',
        Description: 'Create a new permission',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Alter permission',
        Description: 'Update or delete one permission',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get messages',
        Description: 'Get all messages',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get message',
        Description: 'Get one message',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Create message',
        Description: 'Create a new message',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Alter message',
        Description: 'Update or delete one message',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get reactions',
        Description: 'Get all reactions',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get reaction',
        Description: 'Get one reaction',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Create reaction',
        Description: 'Create a new reaction',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Alter reaction',
        Description: 'Update or delete one reaction',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get logs',
        Description: 'Get all logs',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get log',
        Description: 'Get one log',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Create log',
        Description: 'Create a new log',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Alter log',
        Description: 'Update or delete one log',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get tags',
        Description: 'Get all tags',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Get tag',
        Description: 'Get one tag',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Create tag',
        Description: 'Create a new tag',
    },
    {
        Uuid: crypto.randomUUID(),
        Name: 'Alter tag',
        Description: 'Update or delete one tag',
    },
]

/*
 * END META PERMISSION
 * ADD PERMISSIONS
 */

/*
 * START META ROLE PERMISSION
 * ADD ROLE PERMISSIONS
 */

let metaRolePermission = []

metaPermission.forEach((permission) => {
    permission.Roles = [adminRoleIdx]
    switch (permission.Name) {
        case 'Get users':
        case 'Get user':
        case 'Get messages':
        case 'Get message':
        case 'Create message':
        case 'Get tags':
        case 'Get tag':
        case 'Create tag':
        case 'Get reactions':
        case 'Get reaction': {
            permission.Roles.push(userRoleIdx)
            break;
        }
    }
})

metaPermission.forEach((permission) => {
    permission.Roles && permission.Roles.forEach((permissionRole) => {
        metaRolePermission.push({
            Uuid: crypto.randomUUID(),
            RoleUuid: metaRole[permissionRole].Uuid,
            PermissionUuid: permission.Uuid,
        })
    })
})

/*
 * END META ROLE PERMISSION
 * ADD ROLE PERMISSIONS
 */

/*
 * START META USER ROLE PERMISSION
 * ADD USER ROLE PERMISSIONS
 */

let metaUserRolePermission = []

metaUser.forEach((user) => {
    user.Roles.forEach((userRole) => {
        metaRolePermission.filter((rolePermission) => rolePermission.RoleUuid === metaRole[userRole].Uuid).forEach((rolePermission) => {
            metaUserRolePermission.push({
                Uuid: crypto.randomUUID(),
                UserUuid: user.Uuid,
                RolePermissionUuid: rolePermission.Uuid,
            })
        })
    })
})

/*
 * END META USER ROLE PERMISSION
 * ADD USER ROLE PERMISSIONS
 */

/*
 * START META REACTION
 * ADD DEFAULT REACTIONS
 */

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

/*
 * END META REACTION
 * ADD DEFAULT REACTIONS
 */

/*
 * START META MESSAGE REACTION
 * ADD REACTIONS TO ALL MESSAGES
 */

let metaMessageReaction = []

metaMessage.forEach((message) => {
    metaReaction.forEach((reaction) => {
        metaMessageReaction.push({
            Uuid: crypto.randomUUID(),
            MessageUuid: message.Uuid,
            ReactionUuid: reaction.Uuid,
        })
    })
})

/*
 * END META MESSAGE REACTION
 * ADD REACTIONS TO ALL MESSAGES
 */

/*
 * START META USER MESSAGE REACTION
 * ADD USER REACTIONS TO ALL MESSAGES
 */

let metaUserMessageReaction = []

metaUser.forEach((user) => {
    metaMessage.forEach((message) => {
        const firstMessageReaction = metaMessageReaction.filter((messageReaction) => messageReaction.MessageUuid === message.Uuid)[0]
        metaUserMessageReaction.push({
            Uuid: crypto.randomUUID(),
            UserUuid: user.Uuid,
            MessageReactionUuid: firstMessageReaction.Uuid,
        })
    })
})

/*
 * END META USER MESSAGE REACTION
 * ADD USER HEART REACTIONS TO ALL MESSAGES
 */

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