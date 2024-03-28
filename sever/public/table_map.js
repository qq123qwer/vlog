const action_map = {
  Article:require('../database/Article.Collection'),
  Column: require('../database/Column.Collection'),
  Comment: require('../database/Comment.Collection'),
  User: require('../database/User.Collection'),
}
module.exports = { action_map }