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


*/ Sound */

var audi = document.getElementById('audi');
console.log(audi);

document.getElementById('play-button').addEventListener("click", function(e){
    this.style.display = 'none';
    audi.play();
}, false);
