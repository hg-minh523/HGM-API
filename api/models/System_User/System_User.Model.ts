// const {  Model } = require('sequelize');
// // Valid
// class User extends Model {
//     declare id: number; // this is ok! The 'declare' keyword ensures this field will not be emitted by TypeScript.
//   }
  
//   User.init({
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true
//     }
//   }, { sequelize });
  
//   const user = new User({ id: 1 });
//   user.id; // 1