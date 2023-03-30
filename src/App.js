import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mouseX: 0,
            mouseY: 0,
            pieceSize: 600/8,
            mouseDown: false
        };
        this.renderBoard = this.renderBoard.bind(this);
    }

    componentDidMount() {
        const canvas = this.canvasRef;
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
        this.setState({
            mouseX: event.clientX,
            mouseY: event.clientY,
        });
    }
    handleMouseDown = (event) => {
        this.setState({
            mouseDown: true
        })
    }
    handleMouseUp = (event) =>{
        this.setState({
            mouseDown: false
        })
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
    updateAnimation = () => {
        const canvas = this.canvasRef;
        const ctx = canvas.getContext('2d');
        this.renderBoard(ctx)
        // Clear the canvas
        console.log(this.state.mouseX, this.state.mouseY, this.state.mouseDown)

        // Draw a rectangle at the current mouse position

        // Request the next animation frame
        this.animationFrame = requestAnimationFrame(this.updateAnimation);
    }

    render() {
    return (
        <div>
        <canvas
            ref={(canvas) => { this.canvasRef = canvas; }}
            width={600}
            height={600}
            style={{ border: '1px solid #000000' }}
        />
        </div>
    );
    }
    }
    export default App;