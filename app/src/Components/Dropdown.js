import React from "react"

const Dropdown = ({
  filterHandler,
  filterList,
  optionName,
  value,
}) => {
    return (
        <select onChange={filterHandler} value={value}>
          <option>{optionName}</option>
          {filterList.map((airline, idx) => {
              return <option key={idx+airline.name} disabled={airline.active}>{airline.name}</option>
          })}
        </select>
   )
}
export default Dropdown
