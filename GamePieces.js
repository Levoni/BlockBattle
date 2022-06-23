//-------------------------------------------------------------------------
// This file is responsible for quickly creating a array of the necessary
// pieces
//-------------------------------------------------------------------------
import Piece from './Piece'

// Creates an array of pieces
export default createTiles = (color) => {
  return [
    new Piece(0, [[0, 0]], color),
    new Piece(1, [[0, 0], [1, 0]], color),
    new Piece(2, [[0, 0], [1, 0], [2, 0]], color),
    new Piece(3, [[0, 0], [-1, 0], [0, 1]], color),
    new Piece(4, [[0, 0], [1, 0], [2, 0], [3, 0]], color),
    new Piece(5, [[0, 0], [-1, 0], [-2, 0], [0, -1]], color),
    new Piece(6, [[0, 0], [-1, 0], [1, 0], [0, 1]], color),
    new Piece(7, [[0, 0], [0, 1], [1, 0], [1, 1]], color),
    new Piece(8, [[0, 0], [0, -1], [1, 0], [1, 1]], color),
    new Piece(9, [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]], color),
    new Piece(10, [[0, 0], [-1, 0], [-2, 0], [-3, 0], [0, -1]], color),
    new Piece(11, [[0, 0], [-1, 0], [-2, 0], [0, -1], [1, -1]], color),
    new Piece(12, [[0, 0], [-1, 0], [-2, 0], [0, -1], [-1, -1]], color),
    new Piece(13, [[0, 0], [-1, 0], [-2, 0], [-2, -1], [0, -1]], color),
    new Piece(14, [[0, 0], [1, 0], [2, 0], [-1, 0], [0, 1]], color),
    new Piece(15, [[0, 0], [-1, 0], [-2, 0], [0, -1], [0, 1]], color),
    new Piece(16, [[0, 0], [0, -1], [0, -2], [1, 0], [2, 0]], color),
    new Piece(17, [[0, 0], [-1, 0], [0, 1], [1, 1], [-1, -1]], color),
    new Piece(18, [[0, 0], [0, -1], [0, 1], [1, 1], [-1, -1]], color),
    new Piece(19, [[0, 0], [1, 0], [0, 1], [0, -1], [-1, -1]], color),
    new Piece(20, [[0, 0], [-1, 0], [0, 1], [1, 0], [0, -1]], color)
  ]
}