'use strict'

function Setup(){
    const canvas = document.getElementById("canvas-1");
    if(canvas.getContext){
        // drawing code here
        
        const ctx = canvas.getContext("2d");
        
        const case_size = 2;
        const canvas_width = canvas.getBoundingClientRect().width;
        const canvas_height = canvas.getBoundingClientRect().height;
        const grid_width = canvas_width/case_size;
        const grid_height = canvas_height/case_size;

        canvas.grid = Create_Grid(grid_height, grid_width);
        canvas.case_size = case_size;

        canvas.addEventListener('mousedown', Mouse_down);
        canvas.addEventListener('mouseup', Mouse_up);

        ctx.fillStyle = "rgb(0 0 0)";
        ctx.fillRect(0, 0, 500, 500);
        ctx.fillStyle = "rgb(0 256 256)";

        const interval = setInterval(Update_canvas, 5, canvas, grid_height, grid_width);

        // ctx.fillStyle = "rgb(0 0 200 / 50%)";
        // ctx.fillRect(0, 0, 200, 200);
    }
    else{
        // canvas-unsupported code here
    }
}

function Create_Grid(grid_height, grid_width){
    let grid = new Array(grid_height);

    for(let i = 0; i < grid_height; i++){
        grid[i] = new Array(grid_width);
        for(let j = 0; j < grid_width; j++){
            grid[i][j] = 0;
        }
    }

    return grid;
}

function Mouse_down(event){
    event.currentTarget.addEventListener('mousemove', Mouse_move);
    const case_size = event.currentTarget.case_size;
    let x = Math.floor(event.offsetX / case_size);
    let y = Math.floor(event.offsetY / case_size);
    console.log(x + ";" + y);
    event.currentTarget.grid[y][x] = 1;
}

function Mouse_up(event){
    event.currentTarget.removeEventListener('mousemove', Mouse_move);
    // const case_size = event.currentTarget.case_size;
    // let x = Math.floor(event.offsetX / case_size);
    // let y = Math.floor(event.offsetY / case_size);
    // console.log(x + ";" + y);
    // event.currentTarget.grid[y][x] = 1;
}

function Mouse_move(event){
    const case_size = event.currentTarget.case_size;
    let x = Math.floor(event.offsetX / case_size);
    let y = Math.floor(event.offsetY / case_size);
    console.log(x + ";" + y);
    // event.currentTarget.getContext("2d").fillRect(x*case_size, y*case_size, case_size, case_size);
    event.currentTarget.grid[y][x] = 1;
}

function Update_canvas(canvas, grid_height, grid_width){
    const case_size = canvas.case_size;
    canvas.grid = Get_next_grid(canvas.grid, grid_height, grid_width);
    
    canvas.getContext("2d").fillStyle = "rgb(0 0 0)";
    canvas.getContext("2d").fillRect(0, 0, 500, 500);
    canvas.getContext("2d").fillStyle = "rgb(0 256 256)";

    for(let i = 0; i < grid_height; i++){
        for(let j = 0; j < grid_width; j++){
            if(canvas.grid[i][j] == 1){
                canvas.getContext("2d").fillRect(j*case_size, i*case_size, case_size, case_size);
            }
        }
    }
}

function Get_next_grid(grid, grid_height, grid_width){
    let next_grid = Create_Grid(grid_height, grid_width);

    for(let i = grid_height - 1; i >= 0; i--){
        for(let j = 0; j < grid_width; j++){
            if(i == grid_height - 1){
                next_grid[i][j] = grid[i][j];
            }
            else if(grid[i][j] == 1 && next_grid[i + 1][j] == 0){
                next_grid[i + 1][j] = 1;
            }
            else if(grid[i][j] == 1 && next_grid[i + 1][j] == 1){
                let rand_val = Math.random();
                if(j == 0 && next_grid[i + 1][j + 1] == 0){
                    next_grid[i + 1][j + 1] = 1;
                }
                else if(j == grid_width - 1 && next_grid[i + 1][j - 1] == 0){
                    next_grid[i + 1][j - 1] = 1;
                }
                else if(j == 0 && next_grid[i + 1][j + 1] == 1 || j == grid_width - 1 && next_grid[i + 1][j - 1] == 1){
                    next_grid[i][j] = 1;
                }
                else if(next_grid[i + 1][j - 1] == 0 && rand_val <= 0.5){
                    next_grid[i + 1][j - 1] = 1;
                }
                else if(next_grid[i + 1][j + 1] == 0 && rand_val > 0.5){
                    next_grid[i + 1][j + 1] = 1;
                }
                else if(next_grid[i + 1][j - 1] == 0){
                    next_grid[i + 1][j - 1] = 1;
                }
                else if(next_grid[i + 1][j + 1] == 0){
                    next_grid[i + 1][j + 1] = 1;
                }
                else{
                    next_grid[i][j] = 1;
                }
            }
        }
    }

    return next_grid;
}

window.addEventListener("load", Setup);