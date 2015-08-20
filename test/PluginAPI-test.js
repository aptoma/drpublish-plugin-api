/* global describe, expect, jasmine, beforeEach, afterEach, it, PluginAPI, pm: true */
describe("PluginAPI Core", function() {
    "use strict";

    var api;
    var oldPm;

    beforeEach(function() {
        api = PluginAPI.create();
        api.setAppName('test-app');
        oldPm = pm;
    });

    afterEach(function() {
        api = null;
        pm = oldPm;
    });

    it("should add new listeners", function() {
        var requestSpy = jasmine.createSpy('request');
        api.request = requestSpy;

        var addSpy = jasmine.createSpy('add');
        api.eventListeners.add = addSpy;

        var callback = function() {};
        api.on('test-event', callback);

        expect(requestSpy.calls.count()).toEqual(1);
        expect(requestSpy.calls.argsFor(0)).toContain('on-api-event');

        expect(addSpy.calls.count()).toEqual(1);
        expect(addSpy.calls.argsFor(0)).toEqual(['test-event', callback]);
    });

    it("should set configuration with default options", function() {
        var requestSpy = jasmine.createSpy('request');
        api.request = requestSpy;

        var config = {
            foo: 'bar'
        };

        api.setConfiguration(config);

        expect(requestSpy.calls.count()).toEqual(1);
        expect(requestSpy.calls.argsFor(0)).toContain('set-configuration');
        expect(requestSpy.calls.argsFor(0)).toContain({
            config: config,
            onlyPublication: false,
            success: null,
            error: null
        });
    });

    it("should set configuration with options", function() {
        var requestSpy = jasmine.createSpy('request');
        api.request = requestSpy;

        var config = {
            foo: 'bar'
        };

        var success = function() {
        };

        var error = function() {
        };

        api.setConfiguration(config, {
            onlyPublication: true,
            success: success,
            error: error,
        });

        expect(requestSpy.calls.count()).toEqual(1);
        expect(requestSpy.calls.argsFor(0)).toContain('set-configuration');
        expect(requestSpy.calls.argsFor(0)).toContain({
            config: config,
            onlyPublication: true,
            success: success,
            error: error
        });
    });

    it("should convert a dom element to an html string", function() {
        var html = '<div><p>foobar</p></div>';
        expect(api.convertDomToHTML($(html))).toEqual(html);
    });

    it("should be able to send simple requests", function() {
        pm = jasmine.createSpy('pm');

        var callback = function() {};

        api.request('test-request', null, callback);

        expect(pm.calls.count()).toEqual(1);
        var args = pm.calls.argsFor(0);
        expect(args[0]).toEqual(jasmine.objectContaining({
            type: 'test-request',
            success: callback,
            data: {
                src_app: 'test-app'
            }
        }));
    });

    it("should be able to send requests with callbacks", function() {
        pm = jasmine.createSpy('pm');

        var callback1 = jasmine.createSpy();
        var callback2 = jasmine.createSpy();

        api.request('test-request', {fun1: callback1, fun2: callback2});

        expect(pm.calls.count()).toEqual(1);
        var args = pm.calls.argsFor(0)[0];
        expect(args).toEqual(jasmine.objectContaining({
            type: 'test-request'
        }));

        var fun1Args = args.data.fun1;
        expect(fun1Args.type).toEqual('function');
        expect(typeof fun1Args.eventKey).toBe('string');
        expect(fun1Args.eventKey).toMatch(/fun1\d{0,4}functioncallback\d+/);

        var fun2Args = args.data.fun2;
        expect(fun2Args.type).toEqual('function');
        expect(typeof fun2Args.eventKey).toBe('string');
        expect(fun2Args.eventKey).toMatch(/fun2\d{0,4}functioncallback\d+/);

        api.eventListeners.notify(fun1Args.eventKey);
        expect(callback1.calls.count()).toBe(1);

        api.eventListeners.notify(fun2Args.eventKey);
        expect(callback2.calls.count()).toBe(1);
    });

    it("should be able to send requests with an array containing callbacks", function() {
        pm = jasmine.createSpy('pm');

        var callback1 = jasmine.createSpy();
        var callback2 = jasmine.createSpy();

        api.request('test-request', {funs: ['value', {fun1: callback1, fun2: callback2}]});

        expect(pm.calls.count()).toEqual(1);
        var args = pm.calls.argsFor(0)[0];
        expect(args).toEqual(jasmine.objectContaining({
            type: 'test-request'
        }));

        expect(args.data.funs).toContain('value');

        var fun1Args = args.data.funs[1].fun1;
        expect(fun1Args.type).toEqual('function');
        expect(typeof fun1Args.eventKey).toBe('string');
        expect(fun1Args.eventKey).toMatch(/fun1\d{0,4}functioncallback\d+/);

        var fun2Args = args.data.funs[1].fun2;
        expect(fun2Args.type).toEqual('function');
        expect(typeof fun2Args.eventKey).toBe('string');
        expect(fun2Args.eventKey).toMatch(/fun2\d{0,4}functioncallback\d+/);

        api.eventListeners.notify(fun1Args.eventKey);
        expect(callback1.calls.count()).toBe(1);

        api.eventListeners.notify(fun2Args.eventKey);
        expect(callback2.calls.count()).toBe(1);
    });
});
