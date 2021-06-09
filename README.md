![](https://img.shields.io/npm/v/converter-locale-cartesian?style=for-the-badge)

# LngLatToLocaleCartesian
Convert coordinates to locale cartesian to use with webgl or others. This assume that you are using coordinates to draw polygons on a map (building or something else) and that you wish to use those points somewhere else (Three.js / D3, etc.)

## Installation

```sh
# yarn
$ yarn add converter-locale-cartesian

# npm
$ npm i converter-locale-cartesian
```

## Usage

```js
const center = [15.434, 19.0933]
const geometry = [{
  "lat": 22.31759647466327,
  "lng": 113.93006706496337
},
{
  "lat": 22.317262482317403,
  "lng": 113.93019349413271
},
{
  "lat": 22.317159427034767,
  "lng": 113.93023250571464
},
{
  "lat": 22.316962246238706,
  "lng": 113.93030714497549
},]

const lngLatToLocaleCartesian = LngLatToLocaleCartesian(center)
const points = geometry.map(({ lat, lng }) => {
  const converted = lngLatToLocaleCartesian.converter(lng, lat);
  return [converted.x, converted.y, converted.z]
}))
```
