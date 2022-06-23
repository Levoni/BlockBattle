//-------------------------------------------------------------------------
// This file is responible for quickly creating a piece with a id, color,
// and list of tiles
// input: id (number) - id for the tile
//        tiles (array of arrays) - array of tile information
//        color (string) - color for the piecces
//-------------------------------------------------------------------------
export default class Piece {

  constructor(id, tiles, color) {
    this.id = id
    this.tiles = tiles // [[0,0], [1,0], ...]
    this.color = color
  }
}