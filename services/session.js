import db from "../utils/database"

const editSession = (id, data) => {
  return db.class_session.update({
    where: {
      id,
    },
    data: data,
  })
}

export { editSession }
