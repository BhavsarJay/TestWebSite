//This Smooth scrolling is generating some problems.

// Scrollbar.init(document.querySelector('#my-scrollbar'));
// var Scrollbar = window.Scrollbar;

//For Skrollr
var s = skrollr.init([easing = 'linear']);
skrollr.init({
  smoothScrolling: true,
  easing: "linear"
})

var myAnimation = new hoverEffect({
  parent: document.querySelector('.distortion'),
  intensity: 0.5,
  angle1: -Math.PI / 4,
  angle2: -Math.PI / 4,
  speedIn: 1,
  speedOut: 1,
  hover: false,
  image1: 'Projectimg1.png',
  image2: 'Projectimg3.png',
  imagesRatio: 1080/1150,
  displacementImage: 'https://res.cloudinary.com/therealsk/image/upload/v1593860931/heightMap_jjb5ng.png'
});

// console.log(typeof(myAnimation));

var text1 = $(".text-1");
var text2 = $(".text-2");
var windowHeight = $(window).height();
var imgIndex = 0;
var centreOfScreen;
var scrolledFromtop = 0;

jQuery(window).scroll(function(){
  
  scrolledFromtop = $(window).scrollTop();
  centreOfScreen = scrolledFromtop + windowHeight;

  if (centreOfScreen > text2.offset().top + text2.height()/2) {
    if(imgIndex != 2){
      myAnimation.next();
      imgIndex = 2;
      console.log("Change To 2nd");
    }
  }
  else if(centreOfScreen > text1.offset().top + text1.height()/2){
    if(imgIndex != 1){
      myAnimation.previous();
      imgIndex = 1;
      console.log("Change To 1st");
    }
  }


  parallaxScroll(scrolledFromtop);
  // incScale();
});

function parallaxScroll(scrolled){
  $('.background-text-items').css('top',(0 + (scrolled * 0.5)) + 'px');
  $('.bg-texts-container').css('top',(-200 + (scrolled * 0.5)) + 'px');
}