const jwt_map = {
  // 更新的字段
  Article: ["title", "columnId", "body", "cover"],
  User: ["password", "avatar", "nikname"],
  Comment: ["content"]
}
const auth_map = {
  Article: "authorId",
  User: "_id",
  Comment: "uid",
}
module.exports={auth_map , jwt_map}