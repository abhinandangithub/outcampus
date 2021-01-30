import { PublicLayout } from "components/layout"

export default (props) => (
  <PublicLayout title="About us">
    <div className="text-right py-10 relative">
      <div className="max-w-screen-xl px-4 lg:px-8 m-auto relative z-10 text-center">
        <h2 className="text-5xl font-bold mb-6">Our Mission</h2>
        <p className="max-w-screen-sm m-auto">
          Our mission is to create an ingenious one-stop solution that connects
          the students with educators and simplifies learning and teaching
          process for all skills; Caters to educators’ business and technology
          needs; Enables students to extract maximum value while enjoying
          learning
        </p>
      </div>
    </div>

    <div className="bg-yellow-300 text-center py-16">
      <div className="max-w-screen-xl px-4 lg:px-8 m-auto">
        <h2 className="text-5xl font-bold mb-6">Our Vision</h2>
        <p className="max-w-screen-sm m-auto">
          Our vision is to become the ultimate learning platform that unlocks
          the true potential of future generations
        </p>
      </div>
    </div>

    <div className="max-w-screen-xl px-4 lg:px-8 m-auto py-16 text-center">
      <h2 className="text-5xl font-bold mb-6">Our team</h2>
      <p className="max-w-screen-sm m-auto">
        Outcampus is founded in 2020 by a team of three IIT/IIM graduates with
        the aim of revolutionising vocational education for children
      </p>
    </div>
  </PublicLayout>
)
