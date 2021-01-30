import React from "react"
import { Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/core"

const Stats = ({ className }) => {
  return (
    <div className={`border-t border-b border-gray-200 py-4 ${className}`}>
      <StatGroup className="text-center">
        <Stat>
          <StatLabel>Sessions</StatLabel>
          <StatNumber>6</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Duration</StatLabel>
          <StatNumber>45 Mins</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Ages</StatLabel>
          <StatNumber>3 to 8</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Size</StatLabel>
          <StatNumber>8 to 20</StatNumber>
        </Stat>
      </StatGroup>
    </div>
  )
}

export default Stats
