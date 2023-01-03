import React from "react"
import { useState } from "react"

const Table = ({routes, format, columns}) => {
  let [page, setPage] = useState(0)

  const totalRoutes = routes.length

  let createRows = (ele) => {
    return columns.map((col) => {
      return <td key={col.property + col.value}>{format(col.property, ele)}</td>
    })
  }

  const rows = routes.slice(page * 25, page*25 + 25).map((ele, idx) => {
    return (
      <tr key={idx}>
        {createRows(ele)}
      </tr>
    )
  })

  const nextPage = () => {
   setPage(page + 1)
  }

  const previousPage = () => {
    setPage(page - 1)
  }

  return (
  <div className='table'>
    <table className="routes-table">
        <thead>
          <tr>
            {columns.map((col, idx) => {
              return <th key={idx}>{col.name}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      <div>
        <p>Showing {`${page * 25 + 1}-${page * 25 + totalRoutes}`} of {totalRoutes} routes </p>
        <button onClick={previousPage} disabled={page === 0}>Previous Page</button>
        <button onClick={nextPage} disabled={page * 25 + 25 >= totalRoutes}>Next Page</button>
      </div>
  </div>
  )
}


export default Table
