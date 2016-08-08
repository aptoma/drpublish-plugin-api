'use strict';

var Listeners = require('../js/Listeners');

describe('Listeners', function () {
	var payload = {
		source: 'DrPublish',
		data: {foo: 'bar'}
	};

	describe('on', function () {
		it('should register a callback', function () {
			var listeners = new Listeners();
			var listenerFn = function () {
			};
			var index = listeners.add('foo', listenerFn);
			expect(index).toEqual(0);
			expect(listeners._listeners.foo[index]).toEqual(listenerFn);
		});

		it('should throw an error when supplied callback is not a function', function () {
			var listeners = new Listeners();
			expect(function () {
				listeners.add('foo', null);
			}).toThrow();
		});
	});

	describe('notify', function () {
		it('should should trigger registered listeners', function () {
			var listeners = new Listeners();
			var callbackSpy = jasmine.createSpy('callback');
			var eventName = 'foo';
			listeners.add(eventName, callbackSpy);
			listeners.notify(eventName, payload);
			expect(callbackSpy.calls.argsFor(0)).toContain(payload.data);
		});

		it('should should ignore removed listeners ', function () {
			var listeners = new Listeners();
			var callbackSpy1 = jasmine.createSpy('callback1');
			var callbackSpy2 = jasmine.createSpy('callback2');
			var eventName = 'foo';
			listeners.add(eventName, callbackSpy1);
			listeners.add(eventName, callbackSpy2);
			listeners.remove(eventName, 0);
			listeners.notify(eventName, payload);
			expect(callbackSpy1.calls.count()).toEqual(0);
			expect(callbackSpy2.calls.argsFor(0)).toContain(payload.data);
		});

		it('should should return false if any callback returns false', function () {
			var listeners = new Listeners();
			var callbackSpy = jasmine.createSpy('callback').and.returnValue(false);
			var eventName = 'foo';
			listeners.add(eventName, callbackSpy);
			var result = listeners.notify(eventName, payload);
			expect(result).toEqual(false);
		});

		it('should should return true when no callbacks are registered', function () {
			var listeners = new Listeners();
			var eventName = 'foo';
			var result = listeners.notify(eventName, payload);
			expect(result).toEqual(true);
		});

		it('should should return true if callback returns nothing', function () {
			var listeners = new Listeners();
			var callbackSpy = jasmine.createSpy('callback');
			var eventName = 'foo';
			listeners.add(eventName, callbackSpy);
			var result = listeners.notify(eventName, payload);
			expect(result).toEqual(true);
		});

		it('should should return true if callback returns null', function () {
			var listeners = new Listeners();
			var callbackSpy = jasmine.createSpy('callback').and.returnValue(null);
			var eventName = 'foo';
			listeners.add(eventName, callbackSpy);
			var result = listeners.notify(eventName, payload);
			expect(result).toEqual(true);
		});

		it('should should return true if callback returns truthy', function () {
			var listeners = new Listeners();
			var callbackSpy = jasmine.createSpy('callback').and.returnValue(true);
			var eventName = 'foo';
			listeners.add(eventName, callbackSpy);
			var result = listeners.notify(eventName, payload);
			expect(result).toEqual(true);
		});

		it('should look for data in the data key of payload', function () {
			var listeners = new Listeners();
			listeners.add('foo', function (data) {
				expect(data).toEqual({foo: 'bar'});
			});
			listeners.notify('foo', {data: {foo: 'bar'}});
		});

		it('should pass on entire payload if payload.data is falsy', function () {
			var listeners = new Listeners();
			listeners.add('foo', function (data) {
				expect(data).toEqual({foo: 'bar'});
			});
			listeners.notify('foo', {foo: 'bar'});
		});
	});
});
