import db from "utils/database"

const registerUser = async ({
  parentName, childName, parentEmail, phone, ageGroup, courseName, trialDate
}) => {
  try {
    return await db.register.create({
      data: {
        parent_name: parentName,
        child_name: childName,
        parent_email: parentEmail,
        phone: phone,
        course_name: courseName,
        age_group: ageGroup,
        trial_date: trialDate
      }
    })
  } catch (error) {
    throw error
  }
}

const fetchEmails = async () => {
  try {
    return await db.teacher_email.findMany()
  } catch (error) {
    throw error
  }
}

const addEmail = async ({
  email
}) => {
  try {
    return await db.teacher_email.create({
      data: {
        email: email
      }
    })
  } catch (error) {
    throw error
  }
}

const removeEmail = async (
   id 
) => {
  try {
    return await db.teacher_email.delete({
      where: { id: id },
    })
  } catch (error) {
    throw error
  }
}

export {
  registerUser,
  addEmail,
  removeEmail,
  fetchEmails
}

