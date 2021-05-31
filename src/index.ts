// Copyright (c) 2021 André Gomes
// Co - authored with Nicolas Lequette
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export class LngLatToLocaleCartesian {
  #EARTH_RADIUS = 6378137;
  #cosLambda0: number;
  #lng0: number
  #lat0: number
  constructor(lng: number, lat: number) {
    this.#lng0 = lng;
    this.#lat0 = lat;
    this.#cosLambda0 = Math.cos(lat * Math.PI / 180)
  }

  public converter(lng: number, lat: number) {
    return {
      x: this.#EARTH_RADIUS * this.#cosLambda0 * (lng - this.#lng0) * Math.PI / 180,
      y: this.#EARTH_RADIUS * (lat - this.#lat0) * Math.PI / 180,
    }
  }
}
