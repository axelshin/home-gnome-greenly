window.addEventListener('load', function () {

  const dwarfs1 = document.getElementsByClassName('gr-first__products_dwarf1-wrap')
  const dwarfs2 = document.getElementsByClassName('gr-first__products_dwarf2')

  setTimeout(() => {

    document.documentElement.classList.add('loaded')

    for(let dwarf1 of dwarfs1) {
      dwarf1.classList.add('dwarf1-animate')
    }

    for(let dwarf2 of dwarfs2) {
      dwarf2.classList.add('dwarf2-animate')
    }


  }, 100)


})

~function headerSize() {

  const header = document.querySelector('.layout-header')
  const headerNav = document.querySelector('.header__nav-box')

  if(!header) return console.error('headerSize: header not found')

  const showSize = () => {

    const height = header.offsetHeight - (headerNav && headerNav.offsetHeight || 0)
    document.documentElement.style.setProperty('--header-size', height + 'px')

  }

  showSize()
  new ResizeObserver(showSize).observe(header)

}()


~function sticky() {

  const rails = document.querySelector('.greenly-static-rails')
  const content = document.querySelector('.greenly-static')

  if(!rails) return console.error('sticky: rails not found')
  if(!content) return console.error('sticky: content not found')

  const handleScroll = () => {

    const slice = (offset = 0) => {

      const length = rails.scrollHeight - innerHeight - innerHeight * offset
      const delta = scrollY - rails.offsetTop
      const clamped = Math.min(length, Math.max(0, delta))
      const progress = clamped / length
      const arc = Math.sin(progress * Math.PI)
      return { progress, arc }

    }

    const { progress, arc: arc1 } = slice(0.2)
    const { arc: arc2 } = slice(0.2)

    content.style.setProperty('--arc-1', arc1)
    content.style.setProperty('--arc-2', arc2)
    content.style.setProperty('--progress', progress)

    if(progress > 0.5) {

      content.classList.add('stage-2')

    } else {

      content.classList.remove('stage-2')

    }

  }

  addEventListener('scroll', handleScroll)
  handleScroll()

}()

~function shine() {

  if(window.innerWidth <= 1024) return;

  let parent = document.getElementById('starshine')
  let length = 6
  let stars = []
  let sparkle = 10
  let size = 0
  let random = ['small', 'medium', 'large']
  let count = 0

  while (count < length) {

    if(count % 2 === 0) size = 0
    else if(count % 3 === 0) size = 1
    else size = 2

    createStar(size)
    count++

  }

  function createStar(size) {

    if(stars.length == length) {

      stars[0].remove()
      stars.shift()

    }

    let star = document.createElement('span')
    star.innerHTML = '&nbsp'
    star.classList = `${random[size]} shine`
    star.style.top = `${((Math.random() * 100) - 20)}%`
    star.style.left = `${(Math.random() * 100)}%`
    star.style.animationDelay = (Math.random() * sparkle) + 's'
    parent.append(star)
    stars.push(star)

  }

  let time = 0
  let newCount = 0

  function toCount() {

    time++
    if(time % 6 == 0) {

      if(newCount % 2 === 0) size = 0
      else if(newCount % 3 === 0) size = 1
      else size = 2

      createStar(size)
      newCount++

    }

  }


  setInterval(() => {
    toCount()
  }, 200)

}()