
//const { users } = require("../model/user.js");
// import {users}  from "../model/user.js";
import {userRepo}  from "../repositories/user.js";


//lay tat ca user
// route.get('/', (req, res) => {
//     res.json(users);
// });


export const getUsers = async (req, res) => {
  try {
    const users = await userRepo.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//tim kiem user theo id
export const getUserById = (req, res) => {
    const userIdString = req.params.id;
    const userid=parseInt(userIdString);
    const userFound = userRepo.find(user => user.Id === userid);

    if (userFound) {
        res.json(userFound);
    } else {
        res.status(404).json({ message: `Không tìm thấy người dùng với Id: ${userIdString}` });
    }
};

export default { getUsers, getUserById };
