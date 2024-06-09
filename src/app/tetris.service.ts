import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TetrisService {
  private board: number[][] = [];
  private currentPiece: any;
  private currentPosition: { x: number; y: number; };

  private allPieces: any;

  private square: any = [
    [1, 1],
    [1, 1]
  ];

  private horLine = [
    [1, 1, 1, 1],
  ];

  // private verLine = [
  //   [1],
  //   [1],
  //   [1],
  //   [1]
  // ];

  private upArrow = [
    [0, 1, 0],
    [1, 1, 1]
  ];

  private rightZ = [
    [1, 1, 0],
    [0, 1, 1]
  ];

  private leftZ = [
    [0, 1, 1],
    [1, 1, 0]
  ];

  private rightL = [
    [1, 0, 0],
    [1, 1, 1]
  ];

  private leftL = [
    [0, 0, 1],
    [1, 1, 1]
  ];

  constructor() {
    this.currentPosition = { x: 4, y: 0 };

    this.allPieces = [];

    this.allPieces.push(this.square);
    // this.allPieces.push(this.verLine);
    this.allPieces.push(this.horLine);
    this.allPieces.push(this.upArrow);
    this.allPieces.push(this.rightZ);
    this.allPieces.push(this.leftZ);
    this.allPieces.push(this.rightL);
    this.allPieces.push(this.leftL);

    this.resetBoard();
  }

  getRandomNumber(n: number): number {
    return Math.floor(Math.random() * (n + 1));
  }

  resetBoard() {
    const cols = 10;
    const rows = 20;
    for (let i = 0; i < cols; i++) {
      // Create an array for each row
      const row = [];
      // Loop to fill each row with 0s
      for (let j = 0; j < rows; j++) {
        row.push(0);
      }
      // Push the row into the main array
      this.board.push(row);
    }
    this.spawnPiece();
  }

  private clearAndAddColumn(columnIndex: number) {
    // Use a delay function to simulate async operation

    // Clear the specified column
    for (let row = 0; row < this.board.length; row++) {
      this.board[row].splice(columnIndex, 1); // Remove the cell in the specified column
    }

    // Add an empty column to the start of each row
    for (let row = 0; row < this.board.length; row++) {
      this.board[row].unshift(0); // Add a new empty cell at the start of each row

      // Add a small delay to simulate async operation
    }
  }


  private checkAndClearRows() {
    let completedRows = 0;
    debugger;
    // Iterate through each row from bottom to top

    for (let y = 20 - 1; y >= 0; --y) {
      let isFull = true;
      for (let x = 0; x < 10; ++x) {
        if (!this.board[x][y]) {
          isFull = false;
          break;
        }
      }

      if (isFull) {
        this.clearAndAddColumn(y);
        ++y;
      }
    }

    // for (let y = 10 - 1; y >= 0; y--) {
    //   if (this.board[y].every(cell => cell !== 0)) {
    //     this.board.splice(y, 1); // Remove the completed row
    //     this.board.unshift(new Array(this.board[0].length).fill(0)); // Add a new empty row at the top
    //     completedRows++;
    //     y++; // Adjust y to recheck the current row after it has been replaced
    //   }
    // }

    // return completedRows; // Optional: return the number of completed rows
  }


  private spawnPiece() {
    this.checkAndClearRows();

    let randomNumber = this.getRandomNumber(6);
    this.currentPiece = this.allPieces[randomNumber];
    // this.currentPiece = this.square;

    let currentX = this.getRandomNumber(9);
    while (currentX + this.currentPiece[0].length - 1 >= 10) {
      currentX = this.getRandomNumber(9);
    }
    // debugger;
    this.currentPosition = { x: currentX, y: 0 };
    this.drawPiece();
  }

  // private drawPiece() {
  //   this.currentPiece.forEach((row: any, y: any) => {
  //     row.forEach((cell: any, x: any) => {
  //       if (cell) {
  //         this.board[this.currentPosition.y + y][this.currentPosition.x + x] = 1;
  //       }
  //     });
  //   });
  // }


  private drawPiece() {
    this.currentPiece.forEach((row: any, y: any) => {
      row.forEach((cell: any, x: any) => {
        if (cell) {
          this.board[this.currentPosition.x + x][this.currentPosition.y + y] = 1;
        }
      });
    });
  }

  getBoard() {
    return this.board;
  }

  movePieceDown() {
    if (this.canMoveDown()) {
      // console.log("Inside if");
      this.clearPiece();
      this.currentPosition.y++;
      this.drawPiece();
    } else {
      this.spawnPiece();
    }
  }

  movePieceDownWithArrow() {
    if (this.canMoveDown()) {
      // console.log("Inside if");
      this.clearPiece();
      this.currentPosition.y++;
      this.drawPiece();
    }
  }

  canSpawnPiece(): boolean {
    return true;
  }

  private canMoveDown(): boolean | undefined {
    let maxY = this.currentPosition.y + this.currentPiece.length - 1;
    let tempY = maxY;
    ++maxY;
    let x = this.currentPosition.x;
    let y = this.currentPosition.y;
    //  || this.board[x][maxY]
    if (maxY >= 20) {
      return false;
    }

    for (let i = 0; i < this.currentPiece[0].length; ++i) {
      let leastY = 0;
      for (let j = this.currentPiece.length - 1; j >= 0; --j) {
        if (this.currentPiece[j][i]) {
          leastY = j;
          break;
        }
      }

      // console.log("Least Y: ", leastY);
      // debugger;
      leastY = leastY + y;

      if (this.board[x + i][leastY] && this.board[x + i][leastY + 1]) {
        return false;
      }
    }

    // for (let i = 0; i < this.currentPiece[0].length; ++i) {
    //   if (this.board[x + i][tempY] && this.board[x + i][maxY]) {
    //     return false;
    //   }
    // }

    return true;
  }

  movePieceLeft() {
    if (this.canMoveLeft()) {
      // console.log("Inside if");
      this.clearPiece();
      this.currentPosition.x--;
      this.drawPiece();
    }
  }

  private canMoveLeft(): boolean | undefined {
    let minX = this.currentPosition.x;
    let y = this.currentPosition.y;

    //  || this.board[minX - 1][y]
    if (minX <= 0) {
      return false;
    }

    let newX = minX - 1;

    for (let i = 0; i < this.currentPiece.length; ++i) {
      if (this.board[minX][y + i] && this.board[newX][y + i]) {
        return false;
      }
    }

    return true;
  }

  movePieceRight() {
    if (this.canMoveRight()) {
      // console.log("Inside if");
      this.clearPiece();
      this.currentPosition.x++;
      this.drawPiece();
    }
  }

  private canMoveRight(): boolean | undefined {
    let maxX = this.currentPosition.x + this.currentPiece[0].length - 1;
    let tempX = maxX;
    ++maxX;
    let y = this.currentPosition.y;

    if (maxX >= 10) {
      return false;
    }

    for (let i = 0; i < this.currentPiece.length; ++i) {
      if (this.board[tempX][y + i] && this.board[maxX][y + i]) {
        return false;
      }
    }

    return true;
  }

  rotatePiece() {
    // Add Can rotate check
    this.clearPiece();
    this.currentPiece = this.rotateClockwise(this.currentPiece);
    this.drawPiece();
  }

  private rotateClockwise(piece: number[][]): number[][] {
    const nrows = piece.length;
    const ncols = piece[0].length;
    const result: number[][] = Array.from({ length: ncols }, () => Array(nrows).fill(0));

    for (let i = 0; i < nrows; ++i) {
      for (let j = 0; j < ncols; ++j) {
        result[j][nrows - 1 - i] = piece[i][j];
      }
    }

    console.log(result);

    return result;
  }

  // Method to clear the current piece from the board
  private clearPiece() {
    this.currentPiece.forEach((row: any, y: any) => {
      row.forEach((cell: any, x: any) => {
        if (cell) {
          this.board[this.currentPosition.x + x][this.currentPosition.y + y] = 0;
        }
      });
    });
  }
}
