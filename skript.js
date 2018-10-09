/*AFRAME.registerComponent('hello-world', {
 init: function () {
 console.log('Hello, World!');
 }
 });*/

// HTML: <a-entity hello-world></a-entity>



/*AFRAME.registerComponent('log', {
 schema: {
 message: {type: 'string', default: 'Hello, World!'}
 },

 init: function () {
 console.log(this.data.message); // component’s property type values are available through this.data
 }
 }); */

// HTML: <a-entity log="message: Hello, Metaverse!"></a-entity>


// Component to change to a sequential color on click/ hover.
/*AFRAME.registerComponent('cursor-listener', {
 init: function () {
 var lastIndex = -1;
 var COLORS = ['red', 'green', 'blue'];
 this.el.addEventListener('click', function (evt) {
 lastIndex = (lastIndex + 1) % COLORS.length;
 this.setAttribute('material', 'color', COLORS[lastIndex]);
 console.log('I was clicked at: ', evt.detail.intersection.point);
 });
 }
 });
 */


/* Sound
 AFRAME.registerComponent('audiohandler', {
 init: function() {
 var playing = false;
 var audio = document.querySelector("[wave]");
 this.el.addEventListener('click', {
 if (!playing) {
 audio.play();
 }
 else {
 audio.pause();
 audio.currentTime = 0;
 }
 playing = !playing;
 });
 }
 });
 */


/* Sound

 var audi = document.getElementById('audi');
 console.log(audi);

 document.getElementById('play-button').addEventListener("click", function(e){
 this.style.display = 'none';
 audi.play();
 }, false);
 */



AFRAME.registerComponent('event-animate', { // A-Frame Component zur Animation auf 'click'
    schema: {
        target: {type: 'selector'}, //mehrere Targets um mehrere Animationen mit einem 'click' auszulösen
        target2: {type: 'selector'},
        aevent: {default: 'animation1'}, // verlinkung als 'begin' in einer Animation
        triggeraction: {default: 'click' }
    },

    init: function() {

        var data= this.data;

        this.el.addEventListener(data.triggeraction, function () {
            data.target.emit(data.aevent);
            data.target2.emit(data.aevent);
        });
    }
});



/* Geschwindigkeit des Verschwindens anpassen!!!
*
* Component cursor-listener lässt Elemente verschwinden
* To remove an entity from the DOM and thus from the scene, we call .removeChild(element) from the parent element. If we have an entity, we have to ask its parent (parentNode) to remove the entity.
*
* STATT removeChild "el.setAttribute('visible', false);" ODER "entityEl.object3D.visible = false;" ???*/

AFRAME.registerComponent('visible-changer', {
    init: function () {
        var el = this.el;
        el.addEventListener('click', function (evt) {
            el.setAttribute('scale', {x: 0, y: 0, z: 0});
            AFPS.gamestate.score++;
            var scoreEl = document.getElementById('scoredisplay');
            scoreEl.setAttribute('value', 'Score: ' + AFPS.gamestate.score);
                /* ODER BESSER: el.parentNode.removeChild(el);*/
                /*var score = score + 1;
                $("#score").setAttribute('text','value','Score '+score); */
        });
    }
});


window.AFPS = {
    gamestate: {
        score: 0
    }
};



/* necessary to refresh the ray caster after a model loads
 * Quelle: https://gamedevacademy.org/beginners-guide-to-a-frame-vr/ */
AFRAME.registerComponent('raycaster-autorefresh', {
    init: function () {
        var el = this.el;
        this.el.addEventListener('model-loaded', function () {
            var cursorEl = el.querySelector('[raycaster]');
            cursorEl.components.raycaster.refreshObjects();
        });
    }
});






/*
 var tick = 0;

 AFRAME.registerComponent('look-animate', {
 schema: {
 target: {type: 'selector'},
 target2: {type: 'selector'}, --> WEG
 target3: {type: 'selector'}, --> WEG
aevent: {default: 'animation1'}
},

init: function() {
    console.log('starting component look-animate');

    var data= this.data;
    var on = 0;


    this.el.addEventListener('mouseenter', function () { //wenn cursor auf dem Objekt
        on = 1;
        setInterval(function () {
            if(on ===1 ) tick++;
            console.log('Tick: ' + tick);
        }, 1000); // Animation wird nach n (hier 1 Sekunde) Sekunden ausgelöst
    });

    this.el.addEventListener('mouseleave', function () { // Wenn cursor nicht mehr auf dem Objekt ist, wird tick zurückgesetzt
        on = 0;
        tick = 0;
        console.log('Tick: ' + tick);
    });
},
tick: function() {
    var data= this.data;
    if(tick>=2) {
        data.target.emit(data.aevent);
        data.target2.emit(data.aevent); --> WEG
        data.target3.emit(data.aevent); --> WEG
    }
}
});
*/
