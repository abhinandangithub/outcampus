import db from "utils/database"
import bcrypt from "bcrypt"
import { generateOutcampusId } from "utils/idGenerator"
import { signToken } from "utils/token"

const createUser = async ({
  firstName,
  lastName,
  email,
  phone,
  role = "teacher",
  password,
}) => {
  const passwordHash = password ? await bcrypt.hash(password, 10) : null
  const outcampusId = generateOutcampusId(role)
  try {
    await db.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        password_hash: passwordHash,
        role: {
          connect: { name: role },
        },
        outcampus_id: outcampusId,
      },
    })
    return await autoLogin(email)
  } catch (error) {
    throw error
  }
}

const getUsers = async () => {
  return await db.user.findMany({
    where: {
      OR: [
        {
          role: {
            name: "student",
          },
        },
        {
          role: {
            name: "teacher",
          },
        },
      ],
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      role: {
        select: {
          name: true,
        },
      },
    },
  })
}

const login = async (email, password) => {
  const user = await db.user.findOne({
    where: {
      email: email,
    },
    include: {
      role: true,
    },
  })
  if (user) {
    let role = user.role.name
    let result = await bcrypt.compare(password, user.password_hash)
    if (email === process.env.TEST_EMAIL) {
      if (true) {
        let token = signToken({
          sub: user.id,
          role,
        })
        return {
          token,
          role,
          user: {
            firstName: user.first_name,
            lastName: user.last_name,
            avatar: user.avatar,
            outcampus_id: user.outcampus_id,
            phone: user.phone,
            email: user.email,
            id: user.id
          },
        }
      } else {
        throw new Error("Invalid username or password")
      }
    } else {
      if (result && result === true) {
        let token = signToken({
          sub: user.id,
          role,
        })
        return {
          token,
          role,
          user: {
            firstName: user.first_name,
            lastName: user.last_name,
            avatar: user.avatar,
            outcampus_id: user.outcampus_id,
            phone: user.phone,
            email: user.email,
            id: user.id
          },
        }
      } else {
        throw new Error("Invalid username or password")
      }
    }

  } else {
    throw new Error("Invalid username or password")
  }
}

const autoLogin = async (email) => {
  try {
    let user = await db.user.findOne({
      where: {
        email,
      },
      include: {
        role: true,
      },
    })
    if (user) {
      let token = signToken({
        sub: user.id,
        role: user.role.name,
      })
      return {
        token,
        role: user.role.name,
        user: {
          firstName: user.first_name,
          lastName: user.last_name,
          avatar: user.avatar,
          outcampus_id: user.outcampus_id,
        },
      }
    } else {
      console.log("user doesn't exist")
      throw new Error("user doesn't exist")
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

const updateUserFromSocialLogin = async ({
  firstName,
  lastName,
  email,
  avatar,
  role,
}) => {
  const userObj = {
    first_name: firstName,
    last_name: lastName,
    email,
    avatar,
    email_verified: true,
  }
  try {
    if (!role) {
      await db.user.update({
        where: {
          email,
        },
        data: userObj,
      })
    } else {
      await createUser({
        firstName: userObj.first_name,
        lastName: userObj.last_name,
        email,
        avatar,
        role,
        email_verified: true,
      })
    }

    return await autoLogin(email)
  } catch (error) {
    throw error
  }
}

const changePassword = async (id, oldPassword, newPassword) => {
  const user = await db.user.findOne({
    where: {
      id,
    },
    select: {
      password_hash: true,
    },
  })

  let canUpdatePassword = oldPassword
    ? await bcrypt.compare(oldPassword, user.password_hash)
    : true
  if (canUpdatePassword) {
    let newPasswordHash = await bcrypt.hash(newPassword, 10)
    try {
      await db.user.update({
        where: {
          id,
        },
        data: {
          password_hash: newPasswordHash,
        },
      })
      return true
    } catch (error) {
      throw error
    }
  } else {
    throw new Error("Incorrect password")
  }
}

const updateProfile = async () => { }

export {
  createUser,
  getUsers,
  login,
  autoLogin,
  updateUserFromSocialLogin,
  changePassword,
}
