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
        this.image.src = require("./media/pawn_"+this.color+".png");
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
export class Knight extends Piece
{
    constructor(start_pos, color)
    {
        super(start_pos, color);
        this.image = new Image(50, 50);
        this.image.src = require("./media/knight_"+this.color+".png");
        this.legal_pos = [[-2,1], [-2,-1], [-1,-2], [-1,2], [1,-2], [1,2], [2,1], [2,-1]];
    }

    
    draw(context, piecesize)
    {
        context.drawImage(this.image, this.pos.x, this.pos.y, piecesize, piecesize);
    }


    AllowedMoves(board, pieceSize)
    {
        this.posibilities = [];

        for(let x = 0;x<this.legal_pos.length;x++){
            if(0 <= Math.floor(this.pos.y/pieceSize)+this.legal_pos[x][1] <= 7 && 0 <= Math.floor((this.pos.x/pieceSize))+this.legal_pos[x][0] <= 7){
                if(board[Math.floor(this.pos.y/pieceSize)+this.legal_pos[x][1]][Math.floor((this.pos.x/pieceSize))+this.legal_pos[x][0]] == 0){
                    this.pos_list.push({x:(Math.floor(this.pos.x/pieceSize)+this.legal_pos[x][0]), y:(Math.floor(this.pos.y/pieceSize)+this.legal_pos[x][1])})
                }
            }
        }
    }
}
export class Bishop extends Piece
{
    constructor(start_pos, color)
    {
        super(start_pos, color);
        this.image = new Image(50, 50);
        this.image.src = require("./media/bishop_"+this.color+".png");
        this.legal_pos = [{x:-1,y:1, stopped: false},{x:-1,y:-1, stopped: false},{x:1,y:1, stopped: false},{x:1,y:-1, stopped: false}] //index 0 is left up, index 1 is left down, index 2 is right up, index 3 is right down
        this.count = 0
        this.change_x = 0
        this.change_y = 0
    }

    
    draw(context, piecesize)
    {
        context.drawImage(this.image, this.pos.x, this.pos.y, piecesize, piecesize);
    }


    AllowedMoves(board)
    {
        this.posibilities = [];
        this.legal_pos = [{x:-1,y:1, stopped: false},{x:-1,y:-1, stopped: false},{x:1,y:1, stopped: false},{x:1,y:-1, stopped: false}]
        this.count = 0
        this.change_x = 0
        this.change_y = 0
        while(this.count < 4){
            this.change_x += 1
            this.change_y += 1
            for(let x = 0;x<this.legal_pos.length;x++){
        
                if(this.legal_pos[x].stopped === false){
                    
                    if(0 <= Math.floor(this.pos.y/pieceSize)+this.change_y*this.legal_pos[x].y &&  Math.floor(this.pos.y/pieceSize)+this.change_y*this.legal_pos[x].y <= 7 && 0 <= Math.floor(this.pos.x/pieceSize)+this.change_x*this.legal_pos[x].x &&Math.floor(this.pos.x/pieceSize)+this.change_x*this.legal_pos[x].x <= 7){
                        console.log("hei")
                        if(board[Math.floor(this.pos.y/pieceSize)+this.change_y*this.legal_pos[x].y][Math.floor(this.pos.x/pieceSize)+this.change_x*this.legal_pos[x].x] === 0){
                            this.posibilities.push({x:(Math.floor(this.pos.x/pieceSize)+this.change_x*this.legal_pos[x].x), y:(Math.floor(this.pos.y/pieceSize)+this.change_y*this.legal_pos[x].y)})
                        } else{
                            
                            this.legal_pos[x].stopped = true
                            this.count += 1
                        }
                    }
                    else{
                        
                        this.legal_pos[x].stopped = true
                        this.count += 1
                    }
                }
            }
        }
    }
}
export class Queen extends Piece
{
    constructor(start_pos, color)
    {
        super(start_pos, color);
        this.image = new Image(50, 50);
        this.image.src = require("./media/queen_"+this.color+".png");
        this.legal_pos = [{x:-1,y:1,stopped: false},{x:-1,y:-1, stopped: false},{x:1,y:1, stopped: false},{x:1,y:-1, stopped: false}, {x:1,y:0,stopped: false}, {x:0,y:1,stopped: false},{x:-1,y:0,stopped: false},{x:0,y:-1,stopped: false}]
        this.count = 0
        this.change_x = 0
        this.change_y = 0
    }

    
    draw(context, piecesize)
    {
        context.drawImage(this.image, this.pos.x, this.pos.y, piecesize, piecesize);
    }


    AllowedMoves(board)
    {
        this.posibilities = [];
        this.legal_pos = [{x:-1,y:1,stopped: false},{x:-1,y:-1, stopped: false},{x:1,y:1, stopped: false},{x:1,y:-1, stopped: false}, {x:1,y:0,stopped: false}, {x:0,y:1,stopped: false},{x:-1,y:0,stopped: false},{x:0,y:-1,stopped: false}]
        this.count = 0
        this.change_x = 0
        this.change_y = 0
        while(this.count < 8){
            this.change_x += 1
            this.change_y += 1
            for(let x = 0;x<this.legal_pos.length;x++){
        
                if(this.legal_pos[x].stopped === false){
                    
                    if(0 <= Math.floor(this.pos.y/pieceSize)+this.change_y*this.legal_pos[x].y &&  Math.floor(this.pos.y/pieceSize)+this.change_y*this.legal_pos[x].y <= 7 && 0 <= Math.floor(this.pos.x/pieceSize)+this.change_x*this.legal_pos[x].x && Math.floor(this.pos.x/pieceSize)+this.change_x*this.legal_pos[x].x <= 7){
                        console.log("hei")
                        if(board[Math.floor(this.pos.y/pieceSize)+this.change_y*this.legal_pos[x].y][Math.floor(this.pos.x/pieceSize)+this.change_x*this.legal_pos[x].x] === 0){
                            this.posibilities.push({x:(Math.floor(this.pos.x/pieceSize)+this.change_x*this.legal_pos[x].x), y:(Math.floor(this.pos.y/pieceSize)+this.change_y*this.legal_pos[x].y)})
                        } else{
                            
                            this.legal_pos[x].stopped = true
                            this.count += 1
                        }
                    }
                    else{
                        
                        this.legal_pos[x].stopped = true
                        this.count += 1
                    }
                }
            }
        }
    }
}
export class King extends Piece
{
    constructor(start_pos, color)
    {
        super(start_pos, color);
        this.image = new Image(50, 50);
        this.image.src = require("./media/king_"+this.color+".png");
        this.legal_pos = [{x:-1,y:1},{x:-1,y:-1},{x:1,y:1},{x:1,y:-1}, {x:1,y:0}, {x:0,y:1},{x:-1,y:0},{x:0,y:-1}]
    }

    
    draw(context, piecesize)
    {
        context.drawImage(this.image, this.pos.x, this.pos.y, piecesize, piecesize);
    }


    AllowedMoves(board, pieceSize)
    {
        this.posibilities = [];
        for(let x = 0;x<this.legal_pos.length;x++){
            if(board[Math.floor(this.pos.y/pieceSize)+1*this.legal_pos[x].y][Math.floor(this.pos.x/pieceSize)+1*this.legal_pos[x].x] === 0){
                this.posibilities.push({x: Math.floor(this.pos.x/pieceSize)+1*this.legal_pos[x].x, y: Math.floor(this.pos.y/pieceSize)+1*this.legal_pos[x].y})
            }
        }
    }
}
export class Rook extends Piece
{
    constructor(start_pos, color)
    {
        super(start_pos, color);
        this.image = new Image(50, 50);
        this.image.src = require("./media/rook_"+this.color+".png");
        this.legal_pos = [{x:-1,y:0, stopped: false},{x:1,y:0, stopped: false},{x:0,y:1, stopped: false},{x:0,y:-1, stopped: false}]
        this.count = 0
        this.change_x = 0
        this.change_y = 0
    }

    
    draw(context, piecesize)
    {
        context.drawImage(this.image, this.pos.x, this.pos.y, piecesize, piecesize);
    }


    AllowedMoves(board, pieceSize)
    {
        this.posibilities = [];
        this.legal_pos = [{x:-1,y:0, stopped: false},{x:1,y:0, stopped: false},{x:0,y:1, stopped: false},{x:0,y:-1, stopped: false}]
        this.count = 0
        this.change_x = 0
        this.change_y = 0
        while(this.count < 4){
            this.change_x += 1
            this.change_y += 1
            for(let x = 0;x<this.legal_pos.length;x++){
        
                if(this.legal_pos[x].stopped === false){
                    
                    if(0 <= Math.floor(this.pos.y/pieceSize)+this.change_y*this.legal_pos[x].y &&  Math.floor(this.pos.y/pieceSize)+this.change_y*this.legal_pos[x].y <= 7 && 0 <= Math.floor(this.pos.x/pieceSize)+this.change_x*this.legal_pos[x].x &&Math.floor(this.pos.x/pieceSize)+this.change_x*this.legal_pos[x].x <= 7){
                        if(board[Math.floor(this.pos.y/pieceSize)+this.change_y*this.legal_pos[x].y][Math.floor(this.pos.x/pieceSize)+this.change_x*this.legal_pos[x].x] === 0){
                            this.posibilities.push({x:(Math.floor(this.pos.x/pieceSize)+this.change_x*this.legal_pos[x].x), y:(Math.floor(this.pos.y/pieceSize)+this.change_y*this.legal_pos[x].y)})
                        } else{
                            
                            this.legal_pos[x].stopped = true
                            this.count += 1
                        }
                    }
                    else{
                        
                        this.legal_pos[x].stopped = true
                        this.count += 1
                    }
                }
            }
        }
    }
}