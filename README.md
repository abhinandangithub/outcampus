# OutCampus full-stack

This is the proposed architecture. Some bits might not be reflected due to taking shortcuts for saving time

## Website

### Public URLs

- `/` - homepage
- `/terms` - terms of user
- `/privacy` - privacy policy
- `/login` - login
- `/signup` - signup
- `/courses` - all courses
- `/courses/{slug}-{id}` - course details
- `/teachers` - teachers listing
- `/teachers/{firstName}-{lastName}-{id}` - teacher profile

### Private URLs (These need the user to be logged in to access)

- `/dashboard`
- `/profile`
- `/payments`
- `/performance`
- `/classroom`
- `/inbox`
- `/admin` (only for admin/superadmin)

## REST API

The RESTful API is served under the endpoint `/api`

### Resources

All resources are collections and hence plurals are used. The table names use singular as a standard convention

- courses
- users
- subjects
- enrolments
- payments (In Progres)
- messages (In Progress)

#### Verbs

- POST `/courses\
	In case of teacher, create a new course
	In case of admin, create a new course and associate it with a teacher
