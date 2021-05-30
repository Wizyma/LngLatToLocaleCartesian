// Copyright (c) 2021 André Gomes
// Co - authored with Nicolas Lequette
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export class LngLatToLocaleCartesian {
  #EARTH_RADIUS = 6378137;
  #X0: number;
  #Y0: number;
  #Z0: number;
  #cosL0: number;
  #sinL0: number;
  #cosLambda0: number;
  #sinLambda0: number;

  /**
   * Creates an instance of LngLatToLocaleCartesian.
   * @description 
   * in the constructor we have the coordinates of the local cartesian frame
   * 
   * @param {number} lng
   * @param {number} lat
   * @memberof LngLatToLocaleCartesian
   */
  constructor(lng: number, lat: number) {
    this.#cosL0 = Math.cos(lng * Math.PI / 180)
    this.#sinL0 = Math.sin(lng * Math.PI / 180)
    this.#cosLambda0 = Math.cos(lat * Math.PI / 180)
    this.#sinLambda0 = Math.sin(lat * Math.PI / 180)

    // coordinate of the origin on geo centric cartesian frame
    this.#X0 = this.#EARTH_RADIUS * this.#cosL0 * this.#cosLambda0
    this.#Y0 = this.#EARTH_RADIUS * this.#sinL0 * this.#cosLambda0
    this.#Z0 = this.#EARTH_RADIUS * this.#sinLambda0
  }

  /**
   * @method converter
   * @description project the lng / lat to local cartesian frame
   *
   * @param {number} lng
   * @param {number} lat
   * @returns { x: number; y: number; z: number }
   * @memberof LngLatToLocaleCartesian
   */
  public converter(lng: number, lat: number) {
    const cosL = Math.cos(lng * Math.PI / 180)
    const sinL = Math.sin(lng * Math.PI / 180)
    const cosLambda = Math.cos(lat * Math.PI / 180)
    const sinLambda = Math.sin(lat * Math.PI / 180)

    const xEarth = this.#EARTH_RADIUS * cosL * cosLambda - this.#X0;
    const yEarth = this.#EARTH_RADIUS * sinL * cosLambda - this.#Y0;
    const zEarth = this.#EARTH_RADIUS * sinLambda - this.#Z0;

    const x = -this.#sinL0 * xEarth + this.#cosL0 * yEarth;
    // const y = this.cosLambda0 * this.cosL0 * xEarth + this.cosLambda0 * this.sinL0 * yEarth + this.sinLambda0 * zEarth;
    const y = -this.#sinLambda0 * this.#cosL0 * xEarth + this.#sinLambda0 * this.#sinL0 * yEarth + this.#cosLambda0 * zEarth;
    // const z = this.sinLambda0 * this.cosL0 * xEarth + this.sinLambda0 * this.sinL0 * yEarth - this.cosLambda0 * zEarth;
    const z = this.#cosLambda0 * this.#cosL0 * xEarth + this.#cosLambda0 * this.#sinL0 * yEarth + this.#sinLambda0 * zEarth

    return {
      x,
      y,
      z,
    }
  }
}
