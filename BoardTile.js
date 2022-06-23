// This class contains the information that a single tile on the board will hold
// The style is used to properly style the different borders on each tile
// The color is used to determine if a piece is played in the tile, and who it belongs to
export default class BoardTile {
  constructor(style, color = '#cccccc') {
      this.style = style
      this.color = color
  }

  static emptyColor = '#cccccc'
}