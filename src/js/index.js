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
        this.setTransform(this.getWidth());
        this.interval = null;
    }

    setEvens() {
        this.images.forEach((img) => img.ondragstart = () => false);

        this.slider.onmousedown = (e) => {
            let start = e.pageX;
            let currentWidth = this.getWidth();
            this.slider.onmousemove = (e) => {
                this.setTransform(currentWidth + (start > e.pageX ? (start - e.pageX) : -(e.pageX - start)));
            };

            document.onmouseup = () => {
                let currentX = +this.slider.style.transform.replace(/\D/g, '');
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
        let currentWidth = Math.abs(x) || this.getWidth();
        if (direction === 'right') {
            let nextWidth = this.getWidth(this.imagesConfig.currentId + 1);
            this.interval = setInterval(() => {
                if ((currentWidth + this.imagesConfig.widthPart) < nextWidth) {
                    currentWidth += this.imagesConfig.widthPart;
                    this.setTransform(currentWidth);
                } else {
                    this.imagesConfig.currentId = this.imagesConfig.currentId + 1 > this.imagesConfig.count ? 1 : this.imagesConfig.currentId + 1;
                    this.setTransform(this.imagesConfig.currentId === 1 ? this.imagesConfig.width : nextWidth);
                    clearInterval(this.interval)
                }
            }, 40);
        } else {
            let nextWidth = this.getWidth(this.imagesConfig.currentId - 1);
            this.interval = setInterval(() => {
                if ((currentWidth - this.imagesConfig.widthPart) > nextWidth) {
                    currentWidth -= this.imagesConfig.widthPart;
                    this.setTransform(currentWidth);
                } else {
                    this.imagesConfig.currentId = this.imagesConfig.currentId - 1 < 1 ? this.imagesConfig.count : this.imagesConfig.currentId - 1;
                    this.setTransform(this.imagesConfig.currentId === this.imagesConfig.count ? this.getWidth(this.imagesConfig.count) : nextWidth);
                    clearInterval(this.interval)
                }
            }, 40);
        }
    }

    setTransform(value) {
        this.slider.style.transform = `translateX(${-value}px)`;
    }

    getWidth(id) {
        return this.imagesConfig.width * (isNaN(id) ? this.imagesConfig.currentId : id)
    }
}

let slider = new CreateSlider();
slider.setEvens();
