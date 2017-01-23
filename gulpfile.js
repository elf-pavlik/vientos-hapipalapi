var gulp = require('gulp')
var server = require('gulp-develop-server')

gulp.task('default', ['server:start', 'server:restart'])

// run server
gulp.task('server:start', function () {
  server.listen({ path: './server.js' })
})

// restart server if app.js changed
gulp.task('server:restart', function () {
  gulp.watch([ './server.js' ], server.restart)
})

const MONGO_URL = 'mongodb://localhost:27017'
gulp.task('seed:user', () => {
  const UserManager = require('./src/managers/user')
  const Bcrypt = require('bcrypt-nodejs')
  const MongoClient = require('mongodb').MongoClient
  let password = 'lol'
  let user = {
    email: 'me@example.org',
    password: Bcrypt.hashSync(password),
    username: 'me'
  }
  MongoClient.connect(MONGO_URL, (err, db) => {
    if (err) throw err
    UserManager.insert(db, user, (doc) => {
      console.log('username:', user.username)
      console.log('password:', password)
      return db.close()
    })
  })
})

gulp.task('seed:projects', () => {
  const ProjectManager = require('./src/managers/project')
  const MongoClient = require('mongodb').MongoClient
  const data = require('vientos-dev-data')
  MongoClient.connect(MONGO_URL, (err, db) => {
    if (err) throw err
    Promise.all(data.projects.map(project => {
      return ProjectManager.insert(db, project, (doc) => { return Promise.resolve(doc) })
    })).then((all) => {
      console.log('imported', all.length, 'projects')
      db.close()
    })
  })
})

gulp.task('db:drop', () => {
  const MongoClient = require('mongodb').MongoClient
  MongoClient.connect(MONGO_URL, (err, db) => {
    if (err) throw err
    db.dropDatabase().then(() => db.close())
  })
})

gulp.task('db:stats', () => {
  const MongoClient = require('mongodb').MongoClient
  MongoClient.connect(MONGO_URL, (err, db) => {
    if (err) throw err
    db.collection('users').count()
      .then(count => console.log('users:', count))
      .then(() => db.collection('projects').count())
      .then(count => console.log('projects:', count))
      .then(() => db.close())
  })
})

gulp.task('seed', ['db:drop', 'seed:user', 'seed:projects', 'db:stats'])
