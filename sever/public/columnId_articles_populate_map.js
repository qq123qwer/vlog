const IdArticles = [
  {
    path: 'columnId',
    select: 'name',
  },
  {
    path: 'comment',
    populate: {
      path: 'uid',
      select: 'avatar'
    }
  },
  {
    path: 'authorId',
    select: 'nikname email avatar'
  }
]
module.exports = { IdArticles }
