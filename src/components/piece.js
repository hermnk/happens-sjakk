export class Piece{
    constructor(start_pos, color)
    {
        // {x: 0, y: 0}
        this.pos = start_pos;
        this.buffer_pos = {x:0,y:0};
        this.dragging_pos = start_pos;
        this.posibilities = [];
        this.color = color;
        this.dragging = false;
        this.has_moved = false;

        this.factor = this.color == "w" ? -1 : 1;
    }
}
export class Pawn extends Piece
{
    constructor(start_pos, color)
    {
        super(start_pos, color);
        this.image = new Image(50, 50);
        this.image.src = require("./media/pawn_w.png");
    }

    
    draw(context, piecesize)
    {
        context.drawImage(this.image, this.pos.x, this.pos.y, piecesize, piecesize);
    }


    AllowedMoves(board, pieceSize)
    {
        this.posibilities = [];

        if(this.color == 'w'){
            if(Math.floor(this.pos.y/pieceSize) === 6 && board[Math.floor(this.pos.y/pieceSize)-2][Math.floor(this.pos.x/pieceSize)] == 0){
                this.posibilities.push({x:Math.floor(this.pos.x/pieceSize), y:Math.floor(this.pos.y/pieceSize)-1})
                this.posibilities.push({x:Math.floor(this.pos.x/pieceSize), y:Math.floor(this.pos.y/pieceSize)-2})
            } else{
                this.posibilities.push({x:Math.floor(this.pos.x/pieceSize), y:Math.floor(this.pos.y/pieceSize)-1})
            }
        }
        if(this.color == 'b'){
            if(Math.floor(this.pos.y/pieceSize) === 6 && board[Math.floor(this.pos.y/pieceSize)-2][Math.floor(this.pos.x/pieceSize)] == 0){
                this.posibilities.push({x:Math.floor(this.pos.x/pieceSize), y:Math.floor(this.pos.y/pieceSize)+1})
                this.posibilities.push({x:Math.floor(this.pos.x/pieceSize), y:Math.floor(this.pos.y/pieceSize)+2})
            } else{
                this.posibilities.push({x:Math.floor(this.pos.x/pieceSize), y:Math.floor(this.pos.y/pieceSize)+1})
            }
        }
    }
}