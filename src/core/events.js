// core/events/EventEmitter.js

/**
 * @class EventEmitter
 * @description Provides basic publish/subscribe event handling capabilities.
 * Allows code to emit named events and other parts of the code to listen (subscribe)
 * for those events, passing along arguments. This helps decouple different parts
 * of an application.
 *
 * @example
 * // Create an instance
 * const emitter = new EventEmitter();
 *
 * // Define a listener function
 * function onMessage(sender, message) {
 * console.log(`${sender} says: ${message}`);
 * }
 *
 * // Subscribe to the 'message' event
 * emitter.on('message', onMessage);
 *
 * // Emit the 'message' event with arguments
 * emitter.emit('message', 'Alice', 'Hello World!'); // Output: Alice says: Hello World!
 *
 * // Unsubscribe the listener
 * emitter.off('message', onMessage);
 *
 * // Emit again - the listener won't be called
 * emitter.emit('message', 'Bob', 'Anyone there?'); // No output
 */
class EventEmitter {
  /**
   * Initializes the event storage.
   */
  constructor() {
    /**
     * @private
     * @type {Object.<string, Function[]>}
     * Stores event listeners. Keys are event names, values are arrays of listener functions.
     */
    this.events = {};
  }

  /**
   * Registers a listener function to be called when a specific event is emitted.
   * If the same listener is added multiple times for the same event, it will be
   * called multiple times when the event is emitted.
   *
   * @param {string} event - The name of the event to listen for (e.g., 'click', 'dataLoaded').
   * @param {Function} listener - The callback function to execute when the event is emitted.
   * This function will receive any arguments passed to emit().
   * @returns {void}
   */
  on(event, listener) {
    if (typeof listener !== "function") {
      console.warn(`Listener for event "${event}" is not a function.`);
      return;
    }
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  /**
   * Removes a previously registered listener function for a specific event.
   * The listener function must be the exact same reference as the one passed to on().
   *
   * @param {string} event - The name of the event to stop listening to.
   * @param {Function} listener - The specific listener function to remove.
   * @returns {void}
   */
  off(event, listener) {
    if (!this.events[event]) return;
    // Filter out the specific listener reference
    this.events[event] = this.events[event].filter((l) => l !== listener);
    // Optional: Clean up empty event arrays
    if (this.events[event].length === 0) {
      delete this.events[event];
    }
  }

  /**
   * Emits (or triggers) an event, calling all registered listeners for that event
   * with the provided arguments. Listeners are called synchronously in the order
   * they were registered.
   *
   * @param {string} event - The name of the event to emit.
   * @param {...any} args - Optional arguments to pass to each listener function.
   * @returns {void}
   */
  emit(event, ...args) {
    // Use slice() to create a copy of the array. This prevents issues if a listener
    // tries to modify the listeners array (e.g., by calling off()) during emission.
    const listeners = this.events[event]?.slice();
    if (!listeners) return;

    listeners.forEach((listener) => {
      try {
        listener(...args);
      } catch (error) {
        console.error(`Error in listener for event "${event}":`, error);
      }
    });
  }

  /**
   * Removes all listeners for a specific event, or all listeners for all events
   * if no event name is provided. Use with caution.
   *
   * @param {string} [event] - The name of the event to remove all listeners for. If omitted, all listeners for all events are removed.
   * @returns {void}
   */
  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
  }
}

export default EventEmitter;
