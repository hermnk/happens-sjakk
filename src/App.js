import React, { Component } from 'react';
import {Pawn, Bishop, Knight, Queen, King, Rook} from './components/piece'
import './App.css'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mouseX: 0,
            mouseY: 0,
            pieceSize: 600/8,
            mouseDown: false,
            board: [
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
            ],
            selectedPiece: 0,
            holdPiece: 0
        };
        this.renderBoard = this.renderBoard.bind(this);
        this.drawPieces = this.drawPieces.bind(this);
    }

    componentDidMount() {
        const canvas = this.canvasRef;
        //white
        let board = this.state.board
        for(let x = 0;x<8;x++){
            let piece1 = new Pawn({x:x*this.state.pieceSize, y: 6*this.state.pieceSize}, 'w')
            board[6][x] = piece1
        }
        let bishop1 = new Bishop({x: 2*this.state.pieceSize, y: 7*this.state.pieceSize}, 'w')
        board[7][2] = bishop1
        let bishop2 = new Bishop({x: 5*this.state.pieceSize, y: 7*this.state.pieceSize}, 'w')
        board[7][5] = bishop2

        let queen1 = new Queen({x: 3*this.state.pieceSize, y: 7*this.state.pieceSize}, 'w')
        board[7][3] = queen1

        let king1 = new King({x: 4*this.state.pieceSize, y: 7*this.state.pieceSize}, 'w')
        board[7][4] = king1

        let rook1 = new Rook({x: 7*this.state.pieceSize, y: 7*this.state.pieceSize}, 'w')
        board[7][7] = rook1
        let rook2 = new Rook({x: 0*this.state.pieceSize, y: 7*this.state.pieceSize}, 'w')
        board[7][0] = rook2

        let knight1 = new Knight({x: 1*this.state.pieceSize, y: 7*this.state.pieceSize}, 'w')
        board[7][1] = knight1
        let knight2 = new Knight({x: 6*this.state.pieceSize, y: 7*this.state.pieceSize}, 'w')
        board[7][6] = knight2



        //black
        for(let x = 0;x<8;x++){
            let piece1 = new Pawn({x:x*this.state.pieceSize, y: 1*this.state.pieceSize}, 'b')
            board[1][x] = piece1
        }
        let bishop11 = new Bishop({x: 2*this.state.pieceSize, y: 0*this.state.pieceSize}, 'b')
        board[0][2] = bishop11
        let bishop22 = new Bishop({x: 5*this.state.pieceSize, y: 0*this.state.pieceSize}, 'b')
        board[0][5] = bishop22

        let queen11 = new Queen({x: 3*this.state.pieceSize, y: 0*this.state.pieceSize}, 'b')
        board[0][3] = queen11

        let king11 = new King({x: 4*this.state.pieceSize, y: 0*this.state.pieceSize}, 'b')
        board[0][4] = king11

        let rook11 = new Rook({x: 7*this.state.pieceSize, y: 0*this.state.pieceSize}, 'b')
        board[0][7] = rook11
        let rook22 = new Rook({x: 0*this.state.pieceSize, y: 0*this.state.pieceSize}, 'b')
        board[0][0] = rook22

        let knight11 = new Knight({x: 1*this.state.pieceSize, y: 0*this.state.pieceSize}, 'b')
        board[0][1] = knight11
        let knight22 = new Knight({x: 6*this.state.pieceSize, y: 0*this.state.pieceSize}, 'b')
        board[0][6] = knight22
        
        this.setState({board:board})
        this.animationFrame = requestAnimationFrame(this.updateAnimation);
        canvas.addEventListener('mousemove', this.handleMouseMove);
        canvas.addEventListener('mousedown', this.handleMouseDown)
        canvas.addEventListener('mouseup', this.handleMouseUp)
    }

    componentWillUnmount() {
        const canvas = this.canvasRef;
        cancelAnimationFrame(this.animationFrame);
        canvas.removeEventListener('mousemove', this.handleMouseMove);
        canvas.removeEventListener('mousedown', this.handleMouseDown);
        canvas.removeEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseMove = (event) => {
        const canvasRect = event.target.getBoundingClientRect();

        this.setState({
            mouseX: Math.floor(event.clientX- canvasRect.left),
            mouseY: Math.floor(event.clientY- canvasRect.top),
        });
    }
    handleMouseDown = (event) => {
        let newPiece =this.state.board[Math.floor(this.state.mouseY/this.state.pieceSize)][Math.floor(this.state.mouseX/this.state.pieceSize)]
        this.setState({
            mouseDown: true,
            selectedPiece: newPiece
        }, () =>{
                if(this.state.board[Math.floor(this.state.mouseY/this.state.pieceSize)][Math.floor(this.state.mouseX/this.state.pieceSize)] !== 0){
                    this.state.board[Math.floor(this.state.mouseY/this.state.pieceSize)][Math.floor(this.state.mouseX/this.state.pieceSize)].buffer_pos = {x: Math.floor(this.state.mouseX/this.state.pieceSize), y: Math.floor(this.state.mouseY/this.state.pieceSize)}
                }
            
            })

    }
    handleMouseUp = (event) =>{
        console.log(this.state.selectedPiece)
        this.setState({
            mouseDown: false
        })
        if(this.state.selectedPiece !== 0){
            this.state.selectedPiece.pos = {x: Math.floor(this.state.mouseX/this.state.pieceSize)*this.state.pieceSize, y: Math.floor(this.state.mouseY/this.state.pieceSize)*this.state.pieceSize}

            let board = this.state.board
            console.log(Math.floor(this.state.mouseX/this.state.pieceSize), this.state.selectedPiece.buffer_pos.x, Math.floor(this.state.mouseY/this.state.pieceSize), this.state.pieceSize)
            if(Math.floor(this.state.mouseX/this.state.pieceSize)=== this.state.selectedPiece.buffer_pos.x && Math.floor(this.state.mouseY/this.state.pieceSize) === this.state.selectedPiece.buffer_pos.y){
                console.log("hei")
           } else{
            console.log("hei")
                board[Math.floor(this.state.mouseY/this.state.pieceSize)][Math.floor(this.state.mouseX/this.state.pieceSize)] = this.state.selectedPiece
                board[this.state.selectedPiece.buffer_pos.y][this.state.selectedPiece.buffer_pos.x] = 0
           }
           
           
           
            this.setState({
                board:board,
                selectedPiece:0 
            }, ()=>{
                console.log(board)
            })
            
        }
    }
    renderBoard(ctx){
        let last_color = 1;
        for(let y = 0; y < 8; y++) {
            
            last_color = !last_color

            //drawing board
            for(let x = 0; x < 8; x++) {
                ctx.fillStyle = (last_color ? "#8877b7" : "#efefef");
                
                ctx.fillRect(x * this.state.pieceSize, y * this.state.pieceSize, this.state.pieceSize, this.state.pieceSize);
                last_color = !last_color

                //drawing characters
                ctx.fillStyle = (last_color ? "#8877b7" : "#efefef");
                ctx.font = "20px Arial";
                ctx.fillText(String.fromCharCode(97 + x), (this.state.pieceSize * x+55), (this.state.pieceSize * 8 - 10));
            }

            // drawing numbers
            ctx.fillStyle = (!last_color ? "#8877b7" : "#efefef");
            ctx.font = "20px Arial";
            ctx.fillText(8-y, 5, (this.state.pieceSize * y)+25);
        }
    }
    drawPieces(ctx){
        for(let x = 0;x<this.state.board.length;x++){
            for(let i = 0; i<this.state.board[x].length;i++){
                if(this.state.board[x][i] !== 0){
                    this.state.board[x][i].draw(ctx, this.state.pieceSize)
                }
            }
        }
        if(this.state.mouseDown == true && this.state.selectedPiece !== 0){
            this.state.selectedPiece.pos = {x: this.state.mouseX-(this.state.pieceSize/2), y: this.state.mouseY-(this.state.pieceSize/2)};
        }
    }
    drawMoves(ctx){
        if(this.state.holdPiece !== 0){
            
        }
    }
    updateAnimation = () => {
        const canvas = this.canvasRef;
        const ctx = canvas.getContext('2d');
        this.renderBoard(ctx)
        this.drawPieces(ctx);

        this.animationFrame = requestAnimationFrame(this.updateAnimation);
    }

    render() {
    return (
        <canvas
            ref={(canvas) => { this.canvasRef = canvas; }}
            width={600}
            height={600}
            style={{ border: '1px solid #000000' }}
        />
    );
    }
    }
    export default App;