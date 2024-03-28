const populate_map = {
  Article: [
    {
      path:'authorId',
      select: 'nikname email avatar',
    },
    {
      path:'columnId',
      select:'name'
    },
    {
      path:'comment',
      populate:{
        path:'uid',
        select:'avatar nikname'
      }
    },
  ],
  Comment:[
    {
      path:'uid',
      select:'nikname',
    },
    {
      path:'aid',
      select:'title'
    }
  ],
  Column:[
    {
      path:'aid',
      select:'name'
    }
  ]

}
module.exports = {populate_map}