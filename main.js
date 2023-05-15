const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
// handle location box
// add event 
const locationIcon = $('.nav_location-icon')
const locationBox = $('.location_box-overlay')
const closeLocationButton = $('.location_header-info button')
const body = $('body')

locationIcon.addEventListener('click', () => {
    locationBox.classList.remove('hide')
    body.style.overflowY = 'hidden'
})
closeLocationButton.addEventListener('click', (e) => {
    e.stopPropagation()
    locationBox.classList.add('hide')
    body.style.overflowY = 'unset'
})
// get provinces by API
const locationList = $('.location_list')
const handleProvinceList = async () => {
    const data = await fetch('https://provinces.open-api.vn/api/?depth=2').then(res => res.json())

    const longProvinces = data.map((provincesInfo) => {
        return provincesInfo.name
    })

    const provinces = longProvinces.map(province => {
        if (province.indexOf('Thành phố ') !== -1) {
            return province.replace('Thành phố ', '')
        } else if (province.indexOf('Tỉnh ') !== -1) {
            return province.replace('Tỉnh ', '')
        }
    })

    // const districts = data.map((provincesInfo)=>{
    //     const districtInfos = provincesInfo.districts
    //     const districts = districtInfos.map(districtInfo=>{
    //         return districtInfo.name
    //     })
    //     return districts
    // })
    handleProvince(provinces)
    getProvinceFromList()
}
handleProvinceList()

const handleProvince = function (provinces) {
    let htmls = provinces.map(province => {
        let html = `<li class="location_item">${province}</li>`
        return html
    })
    locationList.innerHTML = htmls.join('')
}

// get province from list 
function getProvinceFromList() {
    const locationItems = $$('.location_item')
    const locationText = $('.nav_location-text h1')

    locationItems.forEach(locationItem => {
        locationItem.addEventListener('click', (e) => {
            e.stopPropagation()
            locationText.innerHTML = locationItem.innerHTML
            locationBox.classList.add('hide')
            body.style.overflowY = 'unset'
        })
    })
}
// get province from search


// event on top_slider
const prevTopSilderBtn = $('.prevSliderBtn')
const nextTopSliderBtn = $('.nextSliderBtn')
const topSliderList = $('.top_slider-list')
const topSliderItems = $$('.top_slider-item')
const topSliderItemWidth = topSliderItems[0].offsetWidth
let positionTopSlider = 0

renderTopSliderBtn(positionTopSlider)
nextTopSliderBtn.addEventListener('click', function () {
    handleTopSlider(1)
})
prevTopSilderBtn.addEventListener('click', function () {
    handleTopSlider(-1)
})

function handleTopSlider(direction) {
    if (direction === 1) {
        if (positionTopSlider > -topSliderItemWidth * (topSliderItems.length - 1)) {
            positionTopSlider += -topSliderItemWidth
            topSliderList.style.left = positionTopSlider + 'px'
            renderTopSliderBtn(positionTopSlider)
        }
    } else if (direction === -1) {
        if (positionTopSlider < 0) {
            positionTopSlider += topSliderItemWidth
            topSliderList.style.left = positionTopSlider + 'px'
            renderTopSliderBtn(positionTopSlider)
        }
    }
}
function renderTopSliderBtn(position) {
    if (position === 0) {
        prevTopSilderBtn.classList.add('hide')
    } else {
        prevTopSilderBtn.classList.remove('hide')
    }
    if (position === -topSliderItemWidth * (topSliderItems.length - 1)) {
        nextTopSliderBtn.classList.add('hide')
    } else {
        nextTopSliderBtn.classList.remove('hide')
    }
}
setInterval(() => {
    autoTopSlider()
}, 3000);
function autoTopSlider() {
    if (positionTopSlider > -topSliderItemWidth * (topSliderItems.length - 1) && positionTopSlider <= 0) {
        positionTopSlider += -topSliderItemWidth
        topSliderList.style.left = positionTopSlider + 'px'
        renderTopSliderBtn(positionTopSlider)
    } else {
        positionTopSlider = 0
        topSliderList.style.left = positionTopSlider + 'px'
        renderTopSliderBtn(positionTopSlider)
    }
}


//flashsale slider 
//slider
const prevFlashsaleSliderbtn = $('.flashsale_prev')
const nextFlashsaleSliderbtn = $('.flashsale_next')
const flashsaleSliderList = $('.flashsale_slider-list')
const flashsaleSliderColumns = $$('.flashsale_slider-col')
const flashsaleSliderColumnWidth = flashsaleSliderColumns[0].offsetWidth
const flashsaleSliderItems = $$('.flashsale_slider-item')

let positionFlashsaleSlider = 0

renderFlashSaleSliderBtn(positionFlashsaleSlider)
nextFlashsaleSliderbtn.addEventListener('click', function () {
    handleflashsaleSlider(1)
})
prevFlashsaleSliderbtn.addEventListener('click', function () {
    handleflashsaleSlider(-1)
})

function handleflashsaleSlider(direction) {
    if (direction === 1) {
        // > max = (phần nguyên + dư)*width
        if (positionFlashsaleSlider > -((Math.floor(flashsaleSliderColumns.length / 6) - 1) * 6 + flashsaleSliderColumns.length % 6) * flashsaleSliderColumnWidth) {

            if (positionFlashsaleSlider > - Math.floor(flashsaleSliderColumns.length / 6) * flashsaleSliderColumnWidth) {
                positionFlashsaleSlider += -flashsaleSliderColumnWidth * 6
                flashsaleSliderList.style.left = positionFlashsaleSlider + 'px'
            } else {
                positionFlashsaleSlider += -flashsaleSliderColumns.length % 6 * flashsaleSliderColumnWidth
                flashsaleSliderList.style.left = positionFlashsaleSlider + 'px'
            }
        }
        renderFlashSaleSliderBtn(positionFlashsaleSlider)
    } else if (direction === -1) {
        // < 0
        if (positionFlashsaleSlider < 0) {

            if (positionFlashsaleSlider < -flashsaleSliderColumnWidth * 6) {
                positionFlashsaleSlider += flashsaleSliderColumnWidth * 6
                flashsaleSliderList.style.left = positionFlashsaleSlider + 'px'
            } else {
                positionFlashsaleSlider = 0
                flashsaleSliderList.style.left = positionFlashsaleSlider + 'px'
            }
        }
        renderFlashSaleSliderBtn(positionFlashsaleSlider)
    }
}

function renderFlashSaleSliderBtn(position) {
    if (position === 0) {
        prevFlashsaleSliderbtn.classList.add('hide')
    } else {
        prevFlashsaleSliderbtn.classList.remove('hide')
    }
    if (position === -((Math.floor(flashsaleSliderColumns.length / 6) - 1) * 6 + flashsaleSliderColumns.length % 6) * flashsaleSliderColumnWidth) {
        nextFlashsaleSliderbtn.classList.add('hide')
    } else {
        nextFlashsaleSliderbtn.classList.remove('hide')
    }
}
// render item remain percentage
flashsaleSliderItems.forEach((flashsaleSliderItem, index) => {
    const fracText = (flashsaleSliderItem.children[3]).children[2].innerHTML.slice(3, -5)
    const percent = eval(fracText) * 100

    const remainPercent = (flashsaleSliderItem.children[3]).children[1]
    remainPercent.style.width = percent + '%'

    //sold out 
    if (percent === 0) {
        flashsaleSliderItem.classList.add('sold-out')
    } else {
        flashsaleSliderItem.classList.remove('sold-out')
    }
});
// header countdown timer

setInterval(renderCountdownTimer, 100);
function renderCountdownTimer() {

    const today = new Date()
    const currentHours = today.getHours()
    const currentMinutes = today.getMinutes()
    const currentSeconds = today.getSeconds()

    let countdownHours = $('.endtime_countdown-hour')
    let countdownMinutes = $('.endtime_countdown-minute')
    let countdownSeconds = $('.endtime_countdown-second')

    const seconds = 60 - currentSeconds
    const minutes = 60 - (currentMinutes + 1)
    const hours = 20 - (currentHours + 1)

    if (hours < 0 || hours >= 12) {
        countdownHours.innerHTML = '00'
        countdownMinutes.innerHTML = '00'
        countdownSeconds.innerHTML = '00'
    } else {
        hours < 10 ? countdownHours.innerHTML = '0' + hours : countdownHours.innerHTML = hours

        if (minutes === 60) {
            countdownMinutes.innerHTML = '00'
        } else {
            minutes < 10 ? countdownMinutes.innerHTML = '0' + minutes : countdownMinutes.innerHTML = minutes
        }
        if (seconds === 60) {
            countdownSeconds.innerHTML = '00'
        } else {
            seconds < 10 ? countdownSeconds.innerHTML = '0' + seconds : countdownSeconds.innerHTML = seconds
        }
    }
}

// sticky banner 
const stickyBannerleft = $('.sticky_banner-left')
const stickyBannerRight = $('.sticky_banner-right')
window.onscroll = function () { handleSticky() };

function handleSticky() {
    if (document.body.scrollTop > 220 || document.documentElement.scrollTop > 220) {
        stickyBannerRight.classList.remove('hide')
        stickyBannerleft.classList.remove('hide')
    } else {
        stickyBannerRight.classList.add('hide')
        stickyBannerleft.classList.add('hide')
    }
}

// Menu box
const menuBtn = $('.header_nav-menu')
const closeMenuBtn = $('.menu_box-header button')
const headerMenuBox = $('.header_nav-menu-box')

menuBtn.addEventListener('click', () => {
    headerMenuBox.style.display = 'block'
    headerMenuBox.style.right = '0'
    body.style.overflowY = 'hidden'
})
closeMenuBtn.addEventListener('click', () => {
    headerMenuBox.style.display = 'none'
    headerMenuBox.style.right = '-100vw'
    body.style.overflowY = 'unset'
})