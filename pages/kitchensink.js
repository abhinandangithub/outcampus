import CourseHero from "components/course/hero"
import CourseStats from "components/course/stats"
import CourseSchedule from "components/course/schedule"
import CourseStudents from "components/course/students"
import CourseListing from "components/course/listing"
import CourseReviews from "components/course/reviews"

export default (props) => (
  <div>
    <section>
      <div className="bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <CourseHero
            className="my-8"
            id={1}
            title="Yoga Guppy session with Rashmi Ramesh"
            description="Yoga Guppy is an amalgamation of live music, creative movement, sing-along songs, flashcards, and much more all taught using the medium of Yoga. Rashmi Ramesh is a certified Yoga teacher with 10+ years of experience teaching thousands of learners across India and abroad. Her Yoga Guppy sessions, which is a massive hit amongst kids that are designed for kids to have loads of fun and fall in love with Yoga at an early stage."
            objective="After this session, you will learn basic yoga breathing exercises, animal yoga poses and a fun yoga song"
            category="yoga"
            level="intermediate"
            price={600}
            cover="https://s3.ap-south-1.amazonaws.com/in.outcampus/courses/french.jpeg"
            rating={4.3}
            ratingCount={16}
            enrollment={18}
            teacher={{
              first_name: "Rashmi",
              last_name: "Ramesh",
              academy: "Le French Classe",
            }}
            permalink="https://outcampus.in/courses/15"
          />
        </div>
        <div className="max-w-screen-xl mx-auto px-4 my-8">
          <CourseStats />
        </div>
        <div className="max-w-screen-xl mx-auto px-4 my-6">
          <CourseSchedule />
        </div>
        <div className=" bg-yellow-50 py-4 my-6">
          <div className="max-w-screen-xl mx-auto px-4">
            <CourseStudents />
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto px-4 my-6">
          <CourseListing title="Other courses by Lisha" />
        </div>
        <div className="max-w-screen-xl mx-auto px-4 my-6">
          <CourseListing title="Other courses by Le French Classe" />
        </div>
        <div className="max-w-screen-xl mx-auto px-4 my-6">
          <CourseReviews />
        </div>
      </div>
    </section>
  </div>
)
