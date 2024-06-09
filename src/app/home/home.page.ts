import { Component, HostListener, OnInit } from '@angular/core';
import { TetrisService } from '../tetris.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  board: number[][] | undefined;

  constructor(private tetrisService: TetrisService) {
    // this.board = [[0]];
  }

  ngOnInit() {
    this.board = this.tetrisService.getBoard();

    console.log(this.board);

    setInterval(() => {
      this.tetrisService.movePieceDown();
      this.board = this.tetrisService.getBoard();
    }, 1000);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        // console.log("Left Arrow Pressed");
        this.tetrisService.movePieceLeft();
        break;
      case 'ArrowRight':
        // console.log("Right Arrow Pressed");
        this.tetrisService.movePieceRight();
        break;
      case 'ArrowUp':
        // console.log("Up Arrow Pressed");
        this.tetrisService.rotatePiece();
        break;
      case 'ArrowDown':
        // console.log("Down Arrow Pressed");
        this.tetrisService.movePieceDownWithArrow();
        break;
    }
    this.board = this.tetrisService.getBoard();
  }

}
