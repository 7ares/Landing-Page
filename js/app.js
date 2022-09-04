// create logic to make logo appear and disappear in range of main page height
// depending on scroll up or down

const el_logoContainer = document.getElementById('logo-container-id')
const el_logo = document.getElementById('logo')
const el_mainPage = document.getElementById('home-content-id')
const el_menu = document.getElementById('menu')
const el_navBAr = document.getElementById('navbar-list')
const el_navBAr_col = document.getElementById('navbar-list-col')

const section = document.querySelectorAll('section')

const el_explore_img = document.getElementById('explore-img')

const menu_btn = document.getElementById('fa-bars')
const close_btn = document.getElementById('xmark')

// build dynamic menu list
function addSectionToMenu() {
  $('section').each(function () {
    let name = $(this).attr('id')
    let li_el = document.createElement('li')
    let a_tag = document.createElement('a')

    a_tag.href = '#' + name
    a_tag.textContent = name

    li_el.appendChild(a_tag)

    el_navBAr.appendChild(li_el)
  })
}
// add transition = 0
function addTransition(el) {
  el.style.transition = 'all 0s'
}

// handle menu style while screen sizing changed
function windowSizeTest(windowSize) {
  if (windowSize > 770) {
    menu_btn.style.display = 'none'
    close_btn.style.display = 'none'
    $('.menu-bar').css('display', 'flex')

    addTransition(menu_btn)
    addTransition(close_btn)
  } else {
    menu_btn.style.display = 'inline-block'
    $('.menu-bar').css('display', 'none')
  }
}
// close menu
close_btn.addEventListener('click', function () {
  $('.menu-bar').css('display', 'none')
  menu_btn.style.display = 'inline-block'
})

// open menu
menu_btn.addEventListener('click', function () {
  menu_btn.style.display = 'none'
  $('.menu-bar').css('display', 'block')
  close_btn.style.display = 'inline-block'
})


let windowSize = window.innerWidth
function reportWindowSize() {
  windowSize = window.innerWidth
  console.log(windowSize)
  windowSizeTest(window.innerWidth)
}
let heightValue = 0

$(document).ready(function () {
  addSectionToMenu()

  windowSizeTest(windowSize)
  window.addEventListener('resize', reportWindowSize)

  menu_btn.addEventListener('click', function () {
  
    $('.menu-bar').css('display', 'flex !important')
  })

  let heightLimit = el_mainPage.offsetHeight
  let menuHeight = el_menu.offsetHeight
  el_logoContainer.style.height = menuHeight + 'px'

  $(window).on('scroll load', function () {
    // control logo depending on scrolling
    let currentHeight = $(window).scrollTop()

    if (currentHeight <= heightLimit - 70) {
      if (currentHeight - heightValue > 0) {
        el_logoContainer.style.transition = 'all .2s linear'
        el_logo.style.transition = 'all .2s linear'
        el_logoContainer.style.height = '0'
        el_logo.style.top = '-100%'

        heightValue = currentHeight
      } else {
        el_logoContainer.style.transition = 'all 0s'
        el_logo.style.transition = 'all 0s'
        el_logoContainer.style.height = currentHeight + menuHeight + 'px'

        el_logo.style.top = currentHeight + menuHeight + 'px'

        heightValue = currentHeight
      }
    }
// add zctive class while in scroll to view port
    $('section').each(function () {
      let id = $(this).attr('id')
      let sectionHeight = $(this).height()
      let offset = $(this).offset().top - menuHeight

      if (currentHeight >= offset && currentHeight < sectionHeight + offset) {
        $('#navbar-list li a').removeClass('active-items')
        $('#navbar-list')
          .find('[href="#' + id + '"]')
          .addClass('active-items')
      }
    })
  })
  // end function

  // show only one content and change pic up on clicked element
  $('.showExploreContent').click(function (e) {
   
    //toggle between content
    $(this) + $('.explore-content').slideUp()
    $(this).next('.explore-content').slideDown()
    // change pic up on clicked content
    if ($(this).attr('id') == 'interior') {
      el_explore_img.src =
        'file:///H:/FE-Projects/Udacity/project-1/css/img/explore-interior-img.webp'
    } else if ($(this).attr('id') == 'exterior') {
      el_explore_img.src =
        'file:///H:/FE-Projects/Udacity/project-1/css/img/explore-img.webp'
    } else {
      el_explore_img.src =
        'file:///H:/FE-Projects/Udacity/project-1/css/img/explore-lights-img.webp'
    }
  })
})
