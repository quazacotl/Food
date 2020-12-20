function slider({container, slide, nextArrow, prevArrow, totalCount, currentCount, wrapper, field}) {
    const slides = document.querySelectorAll(slide),
        currentCounter = document.querySelector(currentCount),
        totalCounter = document.querySelector(totalCount),
        btnPrev = document.querySelector(prevArrow),
        btnNext = document.querySelector(nextArrow),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width,
        slider = document.querySelector(container);


    let slideIndex = 1,
        offset = 0;

    if (slides.length < 10) {
        totalCounter.textContent = '0' + (slides.length);
        currentCounter.textContent = `0${slideIndex}`
    } else {
        totalCounter.textContent = slides.length;
        currentCounter.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    btnNext.addEventListener('click', () => {
        if (offset == +width.match(/\d*/) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.match(/\d*/);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex ++
        }

        if (slides.length < 10) {
            currentCounter.textContent = `0${slideIndex}`;
        } else {
            currentCounter.textContent = slideIndex;
        }

        activateDots()
    });

    btnPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.match(/\d*/) * (slides.length - 1);
        } else {
            offset -= +width.match(/\d*/)
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex --
        }

        if (slides.length < 10) {
            currentCounter.textContent = `0${slideIndex}`;
        } else {
            currentCounter.textContent = slideIndex;
        }

        activateDots()
    });

    // dots

    const dotDiv = document.createElement('div');


    slider.style.position = 'relative';
    dotDiv.classList.add('carousel-indicators');
    slider.append(dotDiv);


    for (let i = 0; i < slides.length; i++) {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        dotDiv.append(dot);
    }

    const dots = document.querySelectorAll('.dot');

    dots[+currentCounter.textContent - 1].classList.add('dot_active');

    function activateDots(i = +currentCounter.textContent) {
        dots.forEach(item => {
            item.classList.remove('dot_active')
        });
        dots[i - 1].classList.add('dot_active');
    }

    dotDiv.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('dot')) {
            dots.forEach((item, i) => {
                if (item === e.target) {
                    activateDots(i+1);
                    offset = i * +width.match(/\d*/);
                    slidesField.style.transform = `translateX(-${offset}px)`;
                    currentCounter.textContent = `0${i+1}`;
                    slideIndex = i + 1;
                }
            });
        }
    });
}

export default slider