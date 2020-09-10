/* Functions for drawing arbitrary shapes on Canvas */


export function roundRect(ctx:CanvasRenderingContext2D,  x: number, y: number, w: number, h: number){
    
    // curve length
    const c = 15;

    ctx.beginPath();

    //top-left corner
    ctx.moveTo(x, y+c);
    ctx.quadraticCurveTo(x, y, x+c, y);

    ctx.lineTo(x+w-c, y);
    //top-right corner
    ctx.quadraticCurveTo(x+w, y, x+w, y+c);

    ctx.lineTo(x+w, y+h-c);
    //bottom-right corner
    ctx.quadraticCurveTo(x+w, y+h, x+w-c, y+h);

    //bottom-left corner
    ctx.lineTo(x+c, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-c);
    
    ctx.lineTo(x, y+c);

    ctx.closePath();

    //ctx.strokeStyle = "#111111"; 
    //ctx.stroke();

}

export function fillRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, style: string){
    ctx.strokeStyle = style;
    roundRect(ctx, x, y, w, h);
    ctx.fillStyle = style;
    ctx.fill();
}



interface boolArrDict {
    [index: string]: number[][];
}


/* PixelFont by PaulBGD @ GitHub */
const PixelFont : boolArrDict = {
    '.':[
            [,],
            [,],
            [,],
            [,],
            [1,]
        ],
        '0': [
            [1,1,1],
            [1,,1],
            [1,,1],
            [1,,1],
            [1,1,1]
        ],
        '1': [
            [, 1,],
            [1, 1,],
            [, 1,],
            [, 1,],
            [1,1,1]
        ],
        '2': [
            [1,1,1],
            [,,1],
            [1,1,1],
            [1,,],
            [1,1,1]
        ],
        '3':[
            [1,1,1],
            [,,1],
            [1,1,1],
            [,,1],
            [1,1,1]
        ],
        '4':[
            [1,,1],
            [1,,1],
            [1,1,1],
            [,,1],
            [,,1]
        ],
        '5':[
            [1,1,1],
            [1,,],
            [1,1,1],
            [,,1],
            [1,1,1]
        ],
        '6':[
            [1,1,1],
            [1,,],
            [1,1,1],
            [1,,1],
            [1,1,1]
        ],
        '7':[
            [1,1,1],
            [,,1],
            [,,1],
            [,,1],
            [,,1]
        ],
        '8':[
            [1,1,1],
            [1,,1],
            [1,1,1],
            [1,,1],
            [1,1,1]
        ],
        '9':[
            [1,1,1],
            [1,,1],
            [1,1,1],
            [,,1],
            [1,1,1]
        ],
        'A': [
            [, 1],
            [1, , 1],
            [1, , 1],
            [1, 1, 1],
            [1, , 1]
        ],
        'B': [
            [1, 1],
            [1, , 1],
            [1, 1, 1],
            [1, , 1],
            [1, 1]
        ],
        'C': [
            [1, 1, 1],
            [1],
            [1],
            [1],
            [1, 1, 1]
        ],
        'D': [
            [1, 1],
            [1, , 1],
            [1, , 1],
            [1, , 1],
            [1, 1]
        ],
        'E': [
            [1, 1, 1],
            [1],
            [1, 1, 1],
            [1],
            [1, 1, 1]
        ],
        'F': [
            [1, 1, 1],
            [1],
            [1, 1],
            [1],
            [1]
        ],
        'G': [
            [, 1, 1,,],
            [1,,],
            [1, , 1, 1,,],
            [1, , , 1,,],
            [, 1, 1,,]
        ],
        'H': [
            [1, , 1],
            [1, , 1],
            [1, 1, 1],
            [1, , 1],
            [1, , 1]
        ],
        'I': [
            [1, 1, 1],
            [, 1],
            [, 1],
            [, 1],
            [1, 1, 1]
        ],
        'J': [
            [1, 1, 1],
            [, , 1],
            [, , 1],
            [1, , 1],
            [1, 1, 1]
        ],
        'K': [
            [1, , , 1],
            [1, , 1],
            [1, 1],
            [1, , 1],
            [1, , , 1]
        ],
        'L': [
            [1],
            [1],
            [1],
            [1],
            [1, 1, 1]
        ],
        'M': [
            [1, 1, 1, 1, 1],
            [1, , 1, , 1],
            [1, , 1, , 1],
            [1, , , , 1],
            [1, , , , 1]
        ],
        'N': [
            [1, , , 1],
            [1, 1, , 1],
            [1, , 1, 1],
            [1, , , 1],
            [1, , , 1]
        ],
        'O': [
            [1, 1, 1],
            [1, , 1],
            [1, , 1],
            [1, , 1],
            [1, 1, 1]
        ],
        'P': [
            [1, 1, 1,],
            [1, , 1,],
            [1, 1, 1,],
            [1,,,],
            [1,,,]
        ],
        'Q': [
            [0, 1, 1],
            [1, , , 1],
            [1, , , 1],
            [1, , 1, 1],
            [1, 1, 1, 1]
        ],
        'R': [
            [1, 1],
            [1, , 1],
            [1, , 1],
            [1, 1],
            [1, , 1]
        ],
        'S': [
            [1, 1, 1],
            [1],
            [1, 1, 1],
            [, , 1],
            [1, 1, 1]
        ],
        'T': [
            [1, 1, 1],
            [, 1],
            [, 1],
            [, 1],
            [, 1]
        ],
        'U': [
            [1, , 1],
            [1, , 1],
            [1, , 1],
            [1, , 1],
            [1, 1, 1]
        ],
        'V': [
            [1, , , , 1],
            [1, , , , 1],
            [, 1, , 1],
            [, 1, , 1],
            [, , 1]
        ],
        'W': [
            [1, , , , 1],
            [1, , , , 1],
            [1, , , , 1],
            [1, , 1, , 1],
            [1, 1, 1, 1, 1]
        ],
        'X': [
            [1, , , , 1],
            [, 1, , 1],
            [, , 1],
            [, 1, , 1],
            [1, , , , 1]
        ],
        'Y': [
            [1, , 1],
            [1, , 1],
            [, 1],
            [, 1],
            [, 1]
        ],
        'Z': [
            [1, 1, 1, 1, 1],
            [, , , 1],
            [, , 1],
            [, 1],
            [1, 1, 1, 1, 1]
        ],
        ' ': [
            [, ,],
            [, ,],
            [, ,],
            [, ,],
            [, ,]
        ],
        ':':[
            [1,],
            [,],
            [,],
            [,],
            [1,],
        ]
}

export function drawPixelFont(ctx: CanvasRenderingContext2D, str: string, x: number, y:number, block_size:number, color_str: string = "#161616"){
    //const num_color = "#161616";
    ctx.fillStyle = color_str; //num_color;
    let x_cord = x;
    let x_inter = x;
    
    let sentence : string = str.toUpperCase();

    for (let i=0; i < str.length; i++){
        let pxlArr : number[][] = PixelFont[sentence[i]];
        let y_cord = y;
        x_cord = x_inter;
        
        let j =0;
        for (j=0; j < pxlArr.length; j++){
            x_cord = x_inter;
            for (let k=0; k < pxlArr[j].length; k++){
                
                if (pxlArr[j][k]){
                    ctx.fillRect(x_cord, y_cord, block_size, block_size);
                }
                

                x_cord += block_size;
            }

            y_cord += block_size;
        }
        x_inter += (block_size * (pxlArr[j-1].length+1));

    }

}



export function drawX(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, side_length: number): void {
    ctx.strokeStyle = color;
    let offset = 12;
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(x+offset,y+offset);
    ctx.lineTo(x+side_length-offset, y+side_length-offset);
    ctx.stroke();
    ctx.moveTo(x+side_length-offset, y+offset);
    ctx.lineTo(x+offset, y+side_length-offset);
    ctx.stroke();
    ctx.closePath();
    ctx.lineWidth = 0;
    
}