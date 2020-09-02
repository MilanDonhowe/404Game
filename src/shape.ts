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

    ctx.stroke();

}

export function fillRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, style: string){
    ctx.strokeStyle = style;
    roundRect(ctx, x, y, w, h);
    ctx.fillStyle = style;
    ctx.fill();
}

// okay... maybe use pixel font?

// Truncated Pixel Font from https://github.com/PaulBGD/PixelFont

interface boolArrDict {
    [index: string]: number[][];
}

const NumericFont : boolArrDict = {
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
        ]
}

export function drawPixelNumbers(ctx: CanvasRenderingContext2D, numstr: string, x: number, y: number, block_size: number){
    const num_color = "#161616";
    ctx.fillStyle = num_color;
    let x_cord = x;
    let x_inter = x;

    for (let i=0; i < numstr.length; i++){
        let pxlArr : number[][] = NumericFont[numstr[i]];
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