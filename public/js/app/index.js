document.addEventListener("DOMContentLoaded", () => {
  console.log("Lock and loaded!");


  //JS for the main navbar menus to open on hover and close when leaving (GAME, COMMUNITY, etc). It uses mobilenav-active because it just needs the display:block        
  let topNavAbsolute = document.getElementsByClassName("topNavAbsolute");
  let topNavList = document.getElementsByClassName("topNavList");
  let navList = document.getElementsByClassName("navList");
  let navAbsolute = document.querySelectorAll(".navAbsolute");
  let stillHere = 0;

  for (let i = 0; i < navList.length; i++) {
    //When you mouseover/click, menu appears
    navList[i].addEventListener("mouseout", () => {
      stillHere = 1;
      navAbsolute[i].classList.remove("navAbsoluteActive");
      setTimeout(() => {
        if (stillHere === 1) {
          navAbsolute.forEach(list => list.style.opacity = "0%");
        }
      }, 0);

    });
    navList[i].addEventListener("mouseover", () => {
      stillHere = 0;
      navAbsolute[i].classList.add("navAbsoluteActive");
      setTimeout(() => {
        navAbsolute[i].style.opacity = "100%";
      }, 10);
    });
    //when you mouseout/leave, menu dissapears
  }
  
  let mobileNavLi = document.querySelectorAll(".mobileNavLi");
  let mobileNavUl = document.querySelectorAll(".mobileNavUl");
  let mobileCaret = document.querySelectorAll(".mobileCaret");
  let mobileSameElementClicked = 7;
  mobileNavUl[0].classList.add('MobileNavULActive');

  mobileNavUl.forEach((ul,index) => ul.addEventListener('click', () => {
    mobileNavLi.forEach(li => li.style.display = "none");
    mobileNavUl.forEach(li => li.style.backgroundColor = "#0A0A0AFF");
    mobileCaret.forEach(li => li.classList.remove("mobileCaretActive"));
    if (mobileSameElementClicked !== index) {
      mobileNavUl[index].style.backgroundColor = "#3F3F3FFF";
      mobileNavLi[index].style.display = "block";
      mobileCaret[index].classList.add("mobileCaretActive");  
    }
    if (mobileSameElementClicked === index) {
      mobileSameElementClicked = 7;
    } else {
      mobileSameElementClicked = index;  
    }

  }));
  
  let mobileNavBar = document.querySelectorAll('.mobileNavBar');
  let mobileTransitionBar = document.querySelectorAll('.mobileTransition');
  let faBars = document.querySelectorAll('.fa-bars');
  let closeMobileMenu = document.querySelectorAll('.fa-times');
  let bodyHTML = document.body;

  faBars[0].addEventListener('click', () => {
    mobileNavBar[0].style.display = "block";
    mobileTransitionBar[0].style.display = "none";
    mobileTransitionBar[0].style.opacity = "0";
    bodyHTML.classList.add("stopScroll");
    setTimeout( () => {
      mobileNavBar[0].style.opacity = "1";
    }, 1);
  });
  
  closeMobileMenu[0].addEventListener('click', () => {
    mobileNavBar[0].style.opacity = "0";
    mobileTransitionBar[0].style.display = "grid";
    bodyHTML.classList.remove("stopScroll");
    setTimeout( () => {
      mobileNavBar[0].style.display = "none";
      mobileTransitionBar[0].style.opacity = "1";
    }, 500); 
  });
  


  // JS for stuff appearing on scroll (Some elements don't appear on-screen until you scroll down), not sure exactly how it works, would love if someone can explain it for me.

  // https://webdesign.tutsplus.com/tutorials/animate-on-scroll-with-javascript--cms-36671
  const scrollElements = document.querySelectorAll(".scrollFade");


  const elementInView = (el = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight)
    );
  };

  const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop > (window.innerHeight || document.documentElement.clientHeight)
    );
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) {
        el.classList.add("scrolled");
      } else {
        el.classList.remove("scrolled");
      }
    });
  };

  window.addEventListener('scroll', () => {
    handleScrollAnimation();
    console.log("You scrolled!");
  });


  //function to make highligthed text change colors/pulsate (it goes from white to gold and viceversa)
  let highlightText = document.querySelectorAll(".highlightText");
  let x = 0;

  function highlightPulse() {
    if (x < 1) {
      x++;
      highlightText.forEach(element => element.style.transition = "1s");
      highlightText.forEach(element => element.style.color = "#FFFFFF");
    } else {
      x--;
      highlightText.forEach(element => element.style.color = "#f7941d");
    }
  }

  setInterval(highlightPulse, 2000);


  // stuff for the ACU faction cards
  let acuCard = document.getElementsByClassName("acuCard");
  let factionCard = document.getElementsByClassName("factionCard");
  let xACU = 10;

  for (let i = 0; i < acuCard.length; i++) {
    acuCard[i].addEventListener("click", () => {
      for (let i = 0; i < acuCard.length; i++) {
        factionCard[i].classList.remove("factionActive");
        acuCard[i].classList.remove("acuActive");
      }
      if (xACU == i) {
        xACU = 5;
      } else {
        xACU = i;
        factionCard[i].classList.toggle("factionActive");
        acuCard[i].classList.toggle("acuActive");
      }
    });
  }
});

async function playerCounterJSON() {
  const response = await fetch('js/app/members/recent.json');
  const data = await response.json();
  return data;
}

playerCounterJSON()
  .then((data) => {
    document.getElementById('playerCounter').insertAdjacentHTML("afterbegin", data.length);
  });
