// Code for this carousel should be as a class

class CreateSlider {
    constructor() {
        this.slider = document.querySelector('.slider');
        this.images = document.querySelectorAll('.slide-img');
        this.imagesConfig = {
            currentId: 1,
            count: this.images.length,
            width: +document.body.clientWidth,
        };
        this.imagesConfig.widthPart = this.imagesConfig.width / 10;
        this.setTransform(this.imagesConfig.currentId * this.imagesConfig.width);
        this.interval = null;
    }

    setEvens() {
        this.images.forEach((img) => img.ondragstart = () => false);

        this.slider.onmousedown = (e) => {
            let start = e.pageX;
            let width = this.imagesConfig.currentId * this.imagesConfig.width;
            this.slider.onmousemove = (e) => {
                this.setTransform(width + (start > e.pageX ? (start - e.pageX) : -(e.pageX - start)));
            };

            document.onmouseup = () => {
                let currentX = +this.slider.style.transform.replace(/\D/g, '');
                let currentWidth = this.imagesConfig.currentId * this.imagesConfig.width;
                if (currentX - 20 > currentWidth) {
                    this.animate(currentX, 'right')
                } else if (currentX + 20 < currentWidth) {
                    this.animate(currentX, 'left')
                } else {
                    this.setTransform(currentWidth);
                }
                this.slider.onmousemove = null;
                document.onmouseup = null;
            };
        };

        document.querySelector('.left-arrow').addEventListener('click', this.animate.bind(this, null, 'left'));
        document.querySelector('.right-arrow').addEventListener('click', this.animate.bind(this, null, 'right'));
    }

    animate(x, direction) {
        clearInterval(this.interval);
        let currentX = Math.abs(x) || this.imagesConfig.width * this.imagesConfig.currentId;
        if (direction === 'right') {
            let nextWidth = this.imagesConfig.width * (this.imagesConfig.currentId + 1);
            this.interval = setInterval(() => {
                if ((currentX + this.imagesConfig.widthPart) < nextWidth) {
                    currentX += this.imagesConfig.widthPart;
                    this.setTransform(currentX);
                } else {
                    this.imagesConfig.currentId = this.imagesConfig.currentId + 1 > this.imagesConfig.count ? 1 : this.imagesConfig.currentId + 1;
                    this.setTransform(this.imagesConfig.currentId === 1 ? this.imagesConfig.width : nextWidth);
                    clearInterval(this.interval)
                }
            }, 40);
        } else {
            let nextWidth = this.imagesConfig.width * (this.imagesConfig.currentId - 1);
            this.interval = setInterval(() => {
                if ((currentX - this.imagesConfig.widthPart) > nextWidth) {
                    currentX -= this.imagesConfig.widthPart;
                    this.setTransform(currentX);
                } else {
                    this.imagesConfig.currentId = this.imagesConfig.currentId - 1 < 1 ? this.imagesConfig.count : this.imagesConfig.currentId - 1;
                    this.setTransform(this.imagesConfig.currentId === this.imagesConfig.count ? this.imagesConfig.width * this.imagesConfig.count : nextWidth);
                    clearInterval(this.interval)
                }
            }, 40);
        }
    }

    setTransform(value) {
        this.slider.style.transform = `translateX(${-value}px)`;
    }
}

let slider = new CreateSlider();
slider.setEvens();
