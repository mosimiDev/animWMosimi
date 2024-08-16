(function($){
	'use strict';

	// actors declaration
	var $backFallingLeaves = $("#brownLeaf, #orangeLeaf, #redLeaf"),
    $textlineone = $(".line-one"),
    $textlinetwo = $(".line-two"),
    $textlinethree = $(".line-three"),
    $textlinefour = $(".line-four") ,
    $treeLeaves = $("[id^=treeleaf]") ,
    $floorLeaves = $("[id^=floorleaf]") ,
    $bird= $("#Bird") ,
    $birdHat = $bird.find("#BirdHat") ,
    $birdEyes = $bird.find("#leftEye, #rightEye") ,
    $nest = $("#NestAndLeaves") ,
		$tree = $("#tree_trunk"),
		$cardContainer = $('.card.container'),
	$body=$('body')

	// clear stage
	function clearStage() {
		var clearTl = gsap.timeline()
		clearTl
      .set($backFallingLeaves, { autoAlpha: 0 })
      .set($textlineone, { autoAlpha: 0 })
      .set($textlinetwo, { autoAlpha: 0 })
      .set($textlinethree, { autoAlpha: 0 })
      .set($textlinefour, { autoAlpha: 0 })
      .set($treeLeaves, { autoAlpha: 0 })
      .set($bird, { y: "+=65", autoAlpha: 0 })
      .set($nest, { autoAlpha: 0 })
      .set($tree, { autoAlpha: 0 })
			.set($floorLeaves, { y:'+=275', onComplete:showContainer });
		
		function showContainer() {
			$cardContainer.css('display', 'block')
		}
  return clearTl;
 }

 // enter floor vegetation
	function enterFloorVegetation() {
		var fleavesTl = gsap.timeline();

		fleavesTl
      .to($floorLeaves, { y: 0, delay: 1, stagger: 0.01, ease: Back.inOut })
      .fromTo(
        $tree,
        {
          delay: 1.1,
          scaleY: 0.1,
          autoAlpha: 0,
          transformOrigin: "center bottom",
        },
        {
          scaleY: 1,
          autoAlpha: 1,
          transformOrigin: "center bottom",
          ease: Back.inOut,
        }
      )
      .fromTo(
        $tree,
        {
          delay: 0.9,
          scaleX: 0.2,
          autoAlpha: 0,
          transformOrigin: "center bottom",
        },
        {
          scaleX: 1,
          autoAlpha: 1,
          transformOrigin: "center bottom",
          ease: Back.inOut
								},
								'-=0.9'
      );

		return fleavesTl;
	}

	// enter tree
	
	function enterTreestuff() {
		var treeStuffTl = gsap.timeline();

		treeStuffTl
			.fromTo(
				$treeLeaves,
				{
					delay: 0.5,
					scale: 0.2,
					autoAlpha: 0,
					transformOrigin: "center bottom",
				},
				{
					scale: 1,
					autoAlpha: 1,
					transformOrigin: "center bottom",
					stagger: 0.02,
				}
			)
			.fromTo(
				$nest,
				{
					delay: 1,
					y: 0,
					scale: 0.2,
					autoAlpha: 0,
					transformOrigin: "center center",
				},
				{
					y: "-=15",
					scale: 1,
					autoAlpha: 1,
					transformOrigin: "center center",
					ease: Elastic.Out,
				},
				"+=0.1"
			)
			.to($nest, { delay: 0.3, y: "+=15", ease: Bounce.Out }, "-=0.2")
			.add("nest-pop-in")
			.set($birdHat, { rotation: 12, x: "+=6" })
			.to(
				$bird,
				{ delay: 1.4, y: "-=39", autoAlpha: 1, ease: Power4.inOut },
				"nest-pop-in+=0.1"
			)
			.add("bird-peeking")
			.set($birdEyes, { autoAlpha: 0 })
			.set($birdEyes, { autoAlpha: 1 }, "+=0.2")
			.set($birdEyes, { autoAlpha: 0 }, "+=0.3")
			.set($birdEyes, { autoAlpha: 1 }, "+=0.2")
			.add("bird-blinks")
			.to($bird, { delay: 0.8, y: "-=34", ease: Power4.inOut })
			.to($bird, { delay: 0.3, y: '+=8', ease: Back.Out })
			.to($birdHat, { delay: 0.2, y: '-=12' }, '-=0.6')
			.to($birdHat, { delay: 0.3, y: 0, rotation: 0, x: 0, onComplete: startBlinking }, '-=0.2')
			;
		function startBlinking() {
			var birdBlinksTl = gsap.timeline({ repeat: -1, repeatDelay: 5 });

			birdBlinksTl
        .set($birdEyes, { autoAlpha: 0 })
        .set($birdEyes, { autoAlpha: 1 }, "+=0.2")
        .set($birdEyes, { autoAlpha: 0 }, "+=1.2")
        .set($birdEyes, { autoAlpha: 1 }, "+=0.2");
			}
		return treeStuffTl;
	}
 

 // enter the greeting text
 
	function enterGreeting() {
		var greetingTl = gsap.timeline()
		
		greetingTl
			.fromTo($textlineone, {delay:1, y:'-=50',autoAlpha:0},{y:0, autoAlpha:1, onComplete:startLoops})
			.fromTo($textlinetwo, {delay:1, y:'-=25',autoAlpha:0},{y:0, autoAlpha:1})
			.fromTo($textlinethree, {delay:0.4,scale:2, transformOrigin:'center center',autoAlpha:0},{scale:1, autoAlpha:1, transformOrigin:'center center', stagger:0.1})
			.fromTo($textlinefour, { delay: 1, y: '-=25', autoAlpha: 0 }, { y: 0, autoAlpha: 1 })
		
// Background color loops
		function startLoops() {
			var colors = ['#edcc93', '#f7e3ae', '#f3ebcc', '#edcc93'];
			var bgTl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

			bgTl
        .to($body, { delay: 3,  backgroundColor: colors[0] })
        .to($body, { delay: 3,  backgroundColor: colors[1] }, "+=2")
        .to($body, { delay: 3,  backgroundColor: colors[2] }, "+=2")
        .to($body, { delay: 3,backgroundColor: colors[3] }, "+=2");
		}

		// falling leaves loop
		gsap.set($backFallingLeaves, { y: -80, autoAlpha: 0.2 })
  gsap.to("#brownLeaf", 10 + Math.random()*10, {y:'+=1200', autoAlpha:1, onComplete:repeatFall, onCompleteParams:['#brownLeaf'], ease: Power4.in})
  gsap.to("#redLeaf", 10 + Math.random() * 10, {
    y: "+=1200",
    autoAlpha: 1,
    onComplete: repeatFall,
    onCompleteParams: ["#redLeaf"],
    ease: Power4.in,
  });
		gsap.to("#orangeLeaf", 10 + Math.random() * 10, {
      y: "+=1200",
      autoAlpha: 1,
      onComplete: repeatFall,
      onCompleteParams: ["#orangeLeaf"],
      ease: Power4.in,
    });
		
		function repeatFall(leafId) {
			var range = Math.random() * 800,
				offset = 400,
				newXPosition = range - offset;
			
			gsap.set(leafId, { x: newXPosition, y: -100, autoAlpha: 0.2, rotation: Math.random() * 360 });
			gsap.to(leafId, 10 + Math.random() * 10, {
        y: "+=1200",
        autoAlpha: 1,
        onComplete: repeatFall,
        onCompleteParams: [leafId],
        ease: Power4.in,
      });
		}
		return greetingTl
	}
	
	
	// the START function 
	function start() {
		var tl = gsap.timeline();
		tl.add(clearStage(), "scene-clear-stage")
      .add(enterFloorVegetation(), "scene-floor-vegetation")
      .add(enterTreestuff(), "scene-enter-treestuff")
      .add(enterGreeting, "scene-greeting");
	}
	start();

})(jQuery);


