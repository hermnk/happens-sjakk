export class Piece{
    constructor(start_pos, color)
    {
        // {x: 0, y: 0}
        this.pos = start_pos;
        this.dragging_pos = start_pos;
        this.posibilities = [];
        this.color = color;
        this.dragging = false;
        this.has_moved = false;

        this.factor = this.color == "w" ? -1 : 1;
    }


    __draw(context, piecesize, image)
    {
        if(!this.dragging) {
            context.drawImage(image, piecesize*this.pos.x+10, piecesize*this.pos.y+10, piecesize-20, piecesize-20);

        } else {
            context.drawImage(image, this.dragging_pos.x-piecesize/2, this.dragging_pos.y-piecesize/2, piecesize, piecesize)
        }
    }
}
export class Pawn extends Piece
{
    constructor(start_pos, color)
    {
        super(start_pos, color);
        this.image = new Image(50, 50);
        this.image.src = "media/pawn_"+this.color+".png";
    }

    
    draw(context, piecesize)
    {
        this.__draw(context, piecesize, this.image)
    }


    AllowedMoves(board)
    {
        this.posibilities = [];

        if(this.pos.y < 7 && this.pos.y > 0) {
            if(!this.has_moved && board[this.pos.y+(this.factor*2)][this.pos.x] == 0 && board[this.pos.y+(this.factor*2)][this.pos.x] == 0) {
                this.posibilities.push({x: this.pos.x, y: this.pos.y+(this.factor*1)})
                this.posibilities.push({x: this.pos.x, y: this.pos.y+(this.factor*2)})
            }
            else if(board[this.pos.y+(this.factor*1)][this.pos.x] == 0) {
                this.posibilities.push({x: this.pos.x, y: this.pos.y+(this.factor*1)})
            }
            if(this.pos.x < 7) {
                let a = board[this.pos.y+(this.factor*1)][this.pos.x+1];
                if(a != 0 && a.color != this.color) {
                    this.posibilities.push({x: this.pos.x+1, y: this.pos.y+(this.factor*1)})
                }
            }
            if(this.pos.x > 0) {
                let a = board[this.pos.y+(this.factor*1)][this.pos.x-1];
                if(a != 0 && a.color != this.color) {
                    this.posibilities.push({x: this.pos.x-1, y: this.pos.y+(this.factor*1)})
                }
            }
        }
    }
}