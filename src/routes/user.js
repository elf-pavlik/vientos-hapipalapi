var UserController = require('./../controllers/user.js')

module.exports = function () {
  return [
    {
      method: 'POST',
      path: '/api/user/login',
      config: {
        handler: UserController.login,
        auth: {
          strategy: 'standard',
          mode: 'try'
        },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } }
      }
    }, {
      method: 'POST',
      path: '/api/user/register',
      config: {
        handler: UserController.register,
        auth: false
      }
    }, {
      method: 'PUT',
      path: '/api/user',
      config: {
        handler: UserController.update,
      }
    }, {
      method: 'DELETE',
      path: '/api/user/logout',
      config: {
        handler: UserController.logout
      }
    },
    {
      method: 'GET',
      path: '/api/user/existsemail',
      config: {
        handler: UserController.existsEmail,
        auth: false
      }
    },
    // COLLABORATIONS
    {
      method: 'POST',
      path: '/api/user/collaboration',
      config: {
        handler: UserController.addCollaboration
      }
    },
    {
      method: 'PUT',
      path: '/api/user/collaboration',
      config: {
        handler: UserController.updateCollaboration
      }
    }, {
      method: 'DELETE',
      path: '/api/user/collaboration',
      config: {
        handler: UserController.removeCollaboration
      }
    },
    // INTERESTS
    {
      method: 'POST',
      path: '/api/user/interests',
      config: {
        handler: UserController.addInterest
      }
    }, {
      method: 'DELETE',
      path: '/api/user/interests',
      config: {
        handler: UserController.removeInterest
      }
    },
    // CATEHGORIES
    {
      method: 'POST',
      path: '/api/user/categories',
      config: {
        handler: UserController.addCategory
      }
    }, {
      method: 'DELETE',
      path: '/api/user/categories',
      config: {
        handler: UserController.removeCategory
      }
    },
    // SKILLS
    {
      method: 'POST',
      path: '/api/user/skills',
      config: {
        handler: UserController.addSkill
      }
    }, {
      method: 'DELETE',
      path: '/api/user/skills',
      config: {
        handler: UserController.removeSkill
      }
    },
    // FOLLOWS
    {
      method: 'POST',
      path: '/api/user/follows',
      config: {
        handler: UserController.addFollow
      }
    }, {
      method: 'DELETE',
      path: '/api/user/follows/{id}',
      config: {
        handler: UserController.removeFollow
      }
    },
  ]
}()
