let snake = document.getElementsByClassName('snake')[0];
let startPosition = '50';
document.addEventListener('keydown', (event) => {
    console.log('Triggered');
    switch(event.key) {
        case 'ArrowRight' : {
            startPosition = parseInt(startPosition)+2;
            startPosition = startPosition.toString() + '%';
            if(startPosition === '98%') {
                snake.classList.add('color-blink');
                alert('Game Over');
                startPosition = '50%';
                snake.classList.remove('color-blink')
            }
            console.log(startPosition);
            snake.style.left = startPosition; 
            console.dir(snake);
            break;
        }
        case 'ArrowLeft' : {
            startPosition = parseInt(startPosition)-2;
            startPosition = startPosition.toString() + '%';
            if(startPosition === '0%') {
                snake.style.backgroundColor = 'red';
            }
            console.log(startPosition);
            snake.style.left = startPosition; 
            console.dir(snake);
            break;
        }
        case 'ArrowUp' : {
            startPosition = parseInt(startPosition)-2;
            startPosition = startPosition.toString() + '%';
            if(startPosition === '0%') {
                snake.style.backgroundColor = 'red';
            }
            console.log(startPosition);
            snake.style.top = startPosition; 
            console.dir(snake);
            break;
        }
        case 'ArrowDown' : {
            startPosition = parseInt(startPosition)+2;
            startPosition = startPosition.toString() + '%';
            if(startPosition === '88%') {
                snake.style.backgroundColor = 'red';
            }
            console.log(startPosition);
            snake.style.top = startPosition; 
            console.dir(snake);
            break;
        }        
    }
    console.log(event);
})