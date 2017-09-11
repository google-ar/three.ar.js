(function() {
  if (window.webarSpeechRecognitionInstance) {

    function addEventHandlingToObject(object) {
      object.listeners = { };
      object.addEventListener = function(eventType, callback) {
        if (!callback) return this;
        var listeners = this.listeners[eventType];
        if (!listeners) {
          listeners = [];
          this.listeners[eventType] = listeners;
        }
        if (listeners.indexOf(callback) < 0) {
          listeners.push(callback);
        }
        return this;
      };
      object.removeEventListener = function(eventType, callback) {
        if (!callback) return this;
        var listeners = this.listeners[eventType];
        if (listeners) {
          var i = listeners.indexOf(callback);
          if (i >= 0) {
            this.listeners[eventType] = listeners.splice(i, 1);
          }
        }
        return this;
      };
      object.callEventListeners = function(eventType, event) {
        if (!event) event = { target : this };
        if (!event.target) event.target = this;
        event.type = eventType;
        var onEventType = 'on' + eventType;
        if (typeof(this[onEventType]) === 'function') {
          this[onEventType](event)
        }
        var listeners = this.listeners[eventType];
        if (listeners) {
          for (var i = 0; i < listeners.length; i++) {
            var typeofListener = typeof(listeners[i]);
            if (typeofListener === "object") {
              listeners[i].handleEvent(event);
            }
            else if (typeofListener === "function") {
              listeners[i](event);
            }
          }
        }
        return this;
      };
    } 

    addEventHandlingToObject(window.webarSpeechRecognitionInstance);
    var originalWebKitSpeechRecognition = window.webkitSpeechRecognition;
    window.webkitSpeechRecognition = function() {
      return window.webarSpeechRecognitionInstance;
    };
  }
})();