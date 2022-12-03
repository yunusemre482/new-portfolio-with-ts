type Listener = (...args: [string | number]) => void;

/** passes through events as they happen. You will not get events from before you start listening */
export default class EventEmitter {
	_events: { [key: string]: Listener };

	constructor() {
		this._events = {};
	}

	/** add a listener to an event */
	on(event: string, listener: Listener) {
		if (event === '') {
			console.warn('wrong names');
			return false;
		}

		if (!this._events) this._events = {};

		if (this._events[event]) this._events[event] = listener;
		else this._events[event] = listener;
	}

	/** remove a listener from an event */
	off(event: string, listener: Listener) {
		if (event === '') {
			console.warn('wrong names');
			return false;
		}

		if (!this._events) this._events = {};

		if (this._events[event]) delete this._events[event];
	}

	/** emit an event */
	emit(event: string, args?: [string | number] | undefined) {
		if (event === '') {
			console.warn('wrong names');
			return false;
		}

		if (!this._events) this._events = {};

		if (this._events[event]) this._events[event](...args);
	}
}
