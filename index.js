//This Smooth scrolling is generating some problems.

// Scrollbar.init(document.querySelector('#my-scrollbar'));
// var Scrollbar = window.Scrollbar;


//For Skrollr
// function detectMob() {
//   return ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 800 ) );
// }
// console.log(detectMob());
  
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
console.log(isMobile);
if (!isMobile) {
  var s = skrollr.init({
    smoothScrolling: false,
    smoothScrollingDuration: 500,
    easing: 'linear'
  });
  console.log('On Desktop');
}

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
  // imagesRatio: 1080/1150,
  displacementImage: 'distortion1.png'
});

// console.log(typeof(myAnimation));

var text1 = $(".text-1");
var text2 = $(".text-2");
var windowHeight = $(window).height();
var imgIndex = 0;
var centreOfScreen;
var scrolledFromtop = 0;
var codevengers_SVG = $('#scaleImg');
var matrixRegex = /matrix\(\s*1,\s*0,\s*0,\s*1,\s*(-?\d*\.?\d+),\s*(-?\d*\.?\d+)\)/,
matches = codevengers_SVG.css('transform').match(matrixRegex);

jQuery(window).scroll(function(){

  if(isMobile){
    return;
  }

  scrolledFromtop = $(window).scrollTop();
  centreOfScreen = scrolledFromtop + windowHeight;

  if (centreOfScreen > text2.offset().top + text2.height()/2) {
    if(imgIndex != 2){
      myAnimation.next();
      imgIndex = 2;
      // console.log("Change To 2nd");
    }
  }
  else if(centreOfScreen > text1.offset().top + text1.height()/2){
    if(imgIndex != 1){
      myAnimation.previous();
      imgIndex = 1;
      // console.log("Change To 1st");
    }
  }

  // parallaxScroll(scrolledFromtop);

  // Take WIDTH instead u dumbass
  var matrixRegex = /matrix\(\s*1,\s*0,\s*0,\s*1,\s*(-?\d*\.?\d+),\s*(-?\d*\.?\d+)\)/,
    matches = codevengers_SVG.css('transform').match(matrixRegex);

  _Xval = Number(matches[1]);
  // console.log(matches[0])
  if(_Xval < -30000){
    codevengers_SVG.css('visibility', 'hidden');
    // console.log('hide');
  }
  else{
    codevengers_SVG.css('visibility', 'visible');
    // console.log('show');
  }
});

// var isScrolling = false;
// $(document).on('scrollstart', function(){
//   isScrolling = true;
//   console.log(isScrolling);
// });
// $(document).on('scrollstop', function(){
//   isScrolling = false;
//   console.log(isScrolling);
// });



function parallaxScroll(scrolled){
  $('.background-text-items').css('top',(0 + (scrolled * 0.5)) + 'px');
  $('.bg-texts-container').css('top',(0 + (scrolled * 0.4)) + 'px');
}

var storyImg2 = $('#story-card-2');
var storyImg1 = $('#story-card-1');
var storyImg3 = $('#story-card-3');
// var background = $('#background');

var openStory = -1;
var imgs = [storyImg1, storyImg2, storyImg3];
var animProgress = 100;

if(!isMobile){
  storyImg1.click(function(){expandItem(0);});
  storyImg2.click(function(){expandItem(1);});
  storyImg3.click(function(){expandItem(2);});
  storyImg1.hover(function(){mouseEnter(0);}, function(){mouseLeave(0);});
  storyImg2.hover(function(){mouseEnter(1);}, function(){mouseLeave(1);});
  storyImg3.hover(function(){mouseEnter(2);}, function(){mouseLeave(2);});
}


function expandItem(cardIndex){
  if(animProgress == 100){
    if(openStory == -1){
      openCard(cardIndex);
    }
    else if(openStory != cardIndex){
      closeCard(openStory);
    }
  }
}

function mouseEnter(cardIndex){
  if(openStory == -1){
    var opacity_animation = anime({
      targets: imgs[cardIndex][0].children[0],
      opacity: ['40%', '70%'],
      easing: 'linear',
      direction: 'forwards',
      duration: 200
    });
  }
}

function mouseLeave(cardIndex){
  if(openStory == -1){
    var opacity_animation = anime({
      targets: imgs[cardIndex][0].children[0],
      opacity: ['70%', '40%'],
      easing: 'linear',
      direction: 'forwards',
      duration: 200
    });
  }
}

function openCard(cardIndex){
  var scale_animation = anime({
    targets: imgs[cardIndex][0],
    width: '50%',
    easing: 'easeInOutExpo',
    delay: 250,
    update: function(anim){
      animProgress = anim.progress;
    }
  });
  
  var backgroundImg = imgs[cardIndex][0].children[0];
  var opacity_animation = anime({
    targets: backgroundImg,
    opacity: ['70%', '100%'],
    scale: 1.2,
    easing: 'easeInOutExpo',
    delay: 0,
  });

  var headingText = imgs[cardIndex][0].children[1].children[0];
  var text_animation = anime({
    targets: headingText,
    top: 60,
    color: '#000',
    easing: 'easeInOutExpo',
    delay: 0
  });

  var para = imgs[cardIndex][0].children[1].children[1];
  var para_animation = anime({
    targets: para,
    opacity: [0, 1],
    top: '-=30',
    easing: 'easeInOutExpo',
    delay: 250,
    begin: function(anim){
      para.style.display = "initial";
    }
  });

  console.log('play');
  openStory = cardIndex;
}

function closeCard(cardIndex){
  var scale_animation = anime({
    targets: imgs[cardIndex][0],
    width: '25%',
    easing: 'easeInOutExpo',
    delay: 0,
    update: function(anim){
      animProgress = anim.progress;
    },
  });

  var backgroundImg = imgs[cardIndex][0].children[0];
  var opacity_animation = anime({
    targets: backgroundImg,
    opacity: ['100%', '70%'],
    scale: 1,
    easing: 'easeInOutExpo',
    delay: 250,
    complete: function(anim){
      mouseLeave(cardIndex)
    }
  });

  var headingText = imgs[cardIndex][0].children[1].children[0];
  var text_animation = anime({
    targets: headingText,
    top: '200',
    color: '#FFF',
    easing: 'easeInOutExpo',
    delay: 250
  });

  var para = imgs[cardIndex][0].children[1].children[1];
  var para_animation = anime({
    targets: para,
    opacity: [1, 0],
    top: '+=30',
    easing: 'easeInOutExpo',
    // delay: 250
    complete: function(anim){
      para.style.display = "none";
    }
  });

  console.log('reverse');
  openStory = -1;
}