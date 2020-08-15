// This Smooth scrolling is generating some problems.
// Scrollbar.init(document.querySelector('#my-scrollbar'));
// var Scrollbar = window.Scrollbar;



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

console.log(typeof(myAnimation));

var text1 = $(".text-1");
var text2 = $(".text-2");
var text3 = $(".text-3");
var windowHeight = $(window).height();

jQuery(window).scroll(function(){
  var scrolledFromtop = $(window).scrollTop();
  var centreOfScreen = scrolledFromtop + windowHeight;


  if (centreOfScreen > text2.offset().top + text2.height() - 200) {
    // console.log("CHANGE TO 2nd");
    myAnimation.next();
  }
  else if(centreOfScreen > text1.offset().top + text1.height() - 200){
    // console.log("Change To 1st");
    myAnimation.previous();
  }



});