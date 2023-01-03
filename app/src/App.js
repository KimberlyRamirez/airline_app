import React from 'react'
import { useState } from "react"
import data from "./data"
import './App.css'
import Table from "./Components/Table"
import Dropdown from './Components/Dropdown';
import Map from "./Components/Map"

const App = () => {
  let [routes, setRoutes] = useState(data.routes)
  let [airline, setAirline] = useState('All Airlines')
  let [airport, setAirport] = useState('All Airports')

  const allAirlines = data.airlines.map(airline => {
    return {name: airline.name, active: false}
  })

  const allAirports = data.airports.map(airport => {
    return {name: airport.name, active: false}
  })

  let [filteredAirlines, setFilteredAirlines] = useState(allAirlines)
  let [filteredAirports, setFilteredAirports] = useState(allAirports)
  let [filteredRoutes, setFilteredRoutes] = useState(data.routes)

  const columns = [
    { name: "Airline", property: "airline" },
    { name: "Source Airport", property: "src" },
    { name: "Destination Airport", property: "dest" },
  ]

  const formatValue = (property, value) => {
    if (property === 'airline') {
      return data.getAirlineName(value)
    } else {
      return data.getAirlineByCode(value, property)
    }
  }

  const matchingAirlines = (id) => {
    return data.airlines.map(air => {
      if (id === 'All') {
        return {name:air.name, active:false}
      } else if (air.id === id) {
        return {name:air.name, active:false}
      } else {
        return {name:air.name, active:true}
      }
    })
  }

  const matchingAirports  = (filteredRoutes) => {
    return data.airports.map(port => {
      let active = filteredRoutes.filter(route => {
        return port.code === route.src || port.code === route.dest
      })

      if (active.length < 1) {
        return {name: port.name, active: true}
      } else {
        return {name: port.name, active: false}
      }
    })
  }

  const disableAirports = (code) => {
    return data.airports.map(port => {
      if (code === 'All') {
        return {name:port.name, active:false}
      } else if (port.code === code) {
        return {name:port.name, active:false}
      } else {
        return {name:port.name, active:true}
      }
    })
  }

  const disableAirlines = (filteredRoutes) => {
    return data.airlines.map(air => {
      let active = filteredRoutes.filter(route => {
        return air.id === route.airline
      })

      if (active.length < 1) {
        return {name: air.name, active: true}
      } else {
        return {name: air.name, active: false}
      }
    })
  }

  const filterSelect = (airline, airport) => {
    if (airline === "All Airlines" && airport === "All Airports" ) {
      setFilteredAirlines(matchingAirlines("All"))
      setFilteredAirports(disableAirports("All"))
      setFilteredRoutes(data.routes)
      setRoutes(data.routes)
    } else if (airline !== "All Airlines" && airport === "All Airports") {
      let id = data.getAirlineId(airline)
      setFilteredAirlines(matchingAirlines(id))
      let filtered = data.routes.filter(route => route.airline === id)
      setFilteredAirports(matchingAirports(filtered))
      setFilteredRoutes(filtered)
      setRoutes(filtered)
    } else if (airline === "All Airlines" && airport !== "All Airports") {
      let code = data.getAirportCode(airport)
      setFilteredAirports(disableAirports(code))
      let filtered = data.routes.filter(route => route.src === code || route.dest === code)
      setFilteredRoutes(filtered)
      setFilteredAirlines(disableAirlines(filtered))
      setRoutes(filtered)
    } else {
      let code = data.getAirportCode(airport)
      let id = data.getAirlineId(airline)
      let filtered = data.routes.filter(route => route.airline === id)
      let resRoutes = filtered.filter(route => route.dest === code || route.src === code)
      setFilteredAirlines(disableAirlines(filtered))
      setFilteredAirports(disableAirports(code))
      setFilteredRoutes(resRoutes)
      setRoutes(resRoutes)
    }
  }

  const selectAirline = (event) => {
    let value = event.target.value
    setAirline(value)
    filterSelect(value, airport)
  }

  const selectAirport = (event) => {
    let value = event.target.value
    setAirport(value)
    filterSelect(airline, value)
  }

  const btnHandler = (event) => {
    setAirline("All Airlines")
    setAirport("All Airports")
    setFilteredAirlines(matchingAirlines("All"))
    setFilteredAirports(disableAirports("All"))
    setFilteredRoutes(data.routes)
    setRoutes(data.routes)
  }

  return (
    <>
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <Map routes={filteredRoutes} data={data}/>
        <section>
          <Dropdown
            btnHandler={btnHandler}
            isAll={airline === "All Airlines" && airport === "All Airports"}
            filterList={filteredAirlines}
            filterHandler={selectAirline}
            optionName={"All Airlines"}
            text={"Show routes on"}
            />
          <Dropdown
          filterList={filteredAirports}
          btnHandler={btnHandler}
          optionName={"All Airports"}
          text={"flying in or out"}
          filterHandler={selectAirport}
          isAll={airline === "All Airlines" && airport === "All Airports"}
          />
          <button
          onClick={btnHandler}
          disabled={airline === "All Airlines" && airport === "All Airports"}>
          Show all routes</button>
        </section>
        <section>
          <Table routes={routes} format={formatValue} columns={columns}/>
        </section>
      </div>
    </>
  )
}
export default App;
