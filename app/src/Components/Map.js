import React from "react"
const Map = ({routes, data}) => {
  const circles = routes.map((route, idx) => {
    const source = data.airports.find((a) => a.code === route.src)
    const destination = data.airports.find((a) => a.code === route.dest)
    const d = `M${source.long} ${source.lat} L ${destination.long} ${destination.lat}`

    return (
      <g key={source.name+destination.name+idx}>
        <circle className="source" cx={source.long} cy={source.lat}>
          <title>{source.name}</title>
        </circle>
        <circle className="destination" cx={destination.long} cy={destination.lat}>
          <title>{destination.name}</title>
        </circle>
        <path d={d} />
      </g>
    )
  })

  return (
    <section>
      <svg className="map" viewBox="-180 -90 360 180">
        <g transform="scale(1 -1)">
          <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>
          {circles}
        </g>
      </svg>
    </section>
  )
}

export default Map