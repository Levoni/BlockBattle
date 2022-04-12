export default class Piece {

  constructor(id, tiles, color) {
    this.id = id
    this.tiles = tiles // [[0,0], [1,0], ...]
    this.color = color
  }
}