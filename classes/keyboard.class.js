class Keyboard {
    RIGHT = false;
    LEFT = false;
    SPACE = false;
    D = false;


    constructor() {
        window.addEventListener('keydown', (e) => {
            this.keydownListener(e);
        });
        document.addEventListener('keyup', (e) => {
            this.keyupListener(e);
        })

        window.addEventListener('load', () => {
            this.touchListener();
        })
    }


    keydownListener(e) {
        if (e.key == 'ArrowRight') {
            this.RIGHT = true;
        }
        if (e.key == 'ArrowLeft') {
            this.LEFT = true;
        }
        if (e.key == ' ') {
            this.SPACE = true;
        }
        if (e.key == 'd') {
            this.D = true;
        }
    }


    keyupListener(e) {
        if (e.key == 'ArrowRight') {
            this.RIGHT = false;
        }
        if (e.key == 'ArrowLeft') {
            this.LEFT = false;
        }
        if (e.key == ' ') {
            this.SPACE = false;
        }
        if (e.key == 'd') {
            this.D = false;
        }
    }


    touchListener() {
        this.touchStart();
        this.touchEnd();
    }


    touchStart() {
        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('btnJump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });
        document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        });
    }


    touchEnd() {
        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });
        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });
        document.getElementById('btnJump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });
        document.getElementById('btnThrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        });
    }
}