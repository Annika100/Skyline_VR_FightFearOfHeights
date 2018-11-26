/*AFRAME.registerComponent('auto-enter-vr', {
    init: function () {
        document.querySelector('a-scene').enterVR();
    }
});*/

/*
window.addEventListener('vrdisplayactivate', function () {
    yourApp.enterVR();
});
*/


/*var registerComponent = require('../../core/component').registerComponent;
var utils = require('../../utils');*/
/**
 * Automatically enter VR, either upon vrdisplayactivate or immediately if possible.
 *//*
AFRAME.registerComponent('auto-enter-vr', {
    schema: {default: true},
    init: function () {
        var scene = this.el;
        if (utils.getUrlParameter('auto-enter-vr') === 'false') { return; }
        window.addEventListener('vrdisplayactivate', function () {
            console.log('vrdisplayactivate, enterVR()');
            scene.enterVR();
        }, false);
        this.el.addEventListener('enter-vr', function () {
            console.log('enter-vr');
        }, false);
        window.addEventListener('vrdisplaydeactivate', function () {
            console.log('vrdisplaydeactivate, exitVR()');
            scene.exitVR();
        }, false);
        this.el.addEventListener('exit-vr', function () {
            console.log('exit-vr');
        }, false);
        // just try to enter... turns out we need to wait for next tick
        setTimeout(function () { scene.enterVR(); }, 0);
    },
    update: function () {
        return (!this.data) ? this.el.exitVR() : this.el.enterVR();
    }
});
*/



AFRAME.registerComponent('auto-enter-vr', {
    init: function () {
        this.el.sceneEl.enterVR();
    }
});



/* Sound
 Sound auf iOS zu spielen, egal in welchem Browser, benötigt eine physische Benutzer Interaktion.
 Lösung: Audio Sprites mit Bibliothek Howler.js erstellen: https://github.com/goldfire/howler.js
 Note from: https://aframe.io/docs/0.8.0/components/sound.html */
var sound = new Howl({
    src: ['sounds/wind.mp3'],
    autoplay: true,
    loop: true,
    volume: 2
});

sound.play();




AFRAME.registerComponent('event-animate', { // A-Frame Component zur Animation auf 'click'
    schema: {
        target: {type: 'selector'}, //mehrere Targets um mehrere Animationen mit einem 'click' auszulösen
        target2: {type: 'selector'},
        target3: {type: 'selector'},
        aevent: {default: 'animation1'}, // verlinkung als 'begin' in einer Animation
        triggeraction: {default: 'click' }
    },

    init: function() {

        var data= this.data;

        this.el.addEventListener(data.triggeraction, function () {
            data.target.emit(data.aevent);
            data.target2.emit(data.aevent);
            data.target3.emit(data.aevent);
        });
    }
});



/* Component visible-changer entfernt Child Elemente */
AFRAME.registerComponent('visible-changer', {
    init: function () {
        var el = this.el;
        el.addEventListener('click', function (evt) {
            el.parentNode.removeChild(el);
        });
    }
});


/* Component visible-changer lässt Elemente verschwinden und zählt dabei den Score +1
* To remove an entity from the DOM and thus from the scene, we call .removeChild(element) from the parent element. If we have an entity, we have to ask its parent (parentNode) to remove the entity.*/
AFRAME.registerComponent('score-counter', {
    init: function () {
        var el = this.el;
        el.addEventListener('click', function (evt) {
            el.parentNode.removeChild(el);
            AFPS.scorestate.score++;
            var scoreEl = document.getElementById('scoredisplay');
            scoreEl.setAttribute('value', 'Score: ' + AFPS.scorestate.score);
        });
    }
});

window.AFPS = {
    scorestate: {
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
