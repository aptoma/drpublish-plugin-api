'use strict';

var communicatorFactory = require('../js/AH5Communicator');

describe('AH5Communicator', function () {
	describe('constructor', function () {
		it('should register element select listener', function () {
			var listeners = {};
			var pluginApiMock = {
				on: function (name, callback) {
					listeners[name] = callback;
				}
			};
			communicatorFactory(pluginApiMock);
			listeners.pluginElementClicked({
				dpArticleId: '10001'
			});

			expect(pluginApiMock.selectedPluginElement.dpArticleId).toEqual('10001');
		});
	});

	describe('insertEmbeddedAsset', function () {
		it('should insert element with id, attributes, class and markup', function () {
			var requestSpy = jasmine.createSpy('request');
			requestSpy.and.callFake(function (callSpec, data, callback) {
				callback && callback();
			});
			var pluginApiMock = {
				on: jasmine.createSpy('on'),
				createEmbeddedObject: function (typeId, callback) {
					callback('dpArticleId1');
				},
				request: requestSpy
			};
			var communicator = communicatorFactory(pluginApiMock);
			communicator.insertEmbeddedAsset(
				'<div>foo</div>',
				{
					embeddedTypeId: 5,
					externalId: 'ext-id',
					assetClass: 'dp-asset'
				}
			);

			expect(requestSpy.calls.argsFor(0)).toContain('editor-insert-element');
			expect(requestSpy.calls.argsFor(0)[1].element)
				.toEqual('<div id="asset-dpArticleId1" data-internal-id="dpArticleId1" data-external-id="ext-id" class="dp-asset"><div>foo</div></div>');
		});

		it('should show error message and return if attempting to update an element created by another app', function () {
			var showErrorMsgSpy = jasmine.createSpy('showErrorMsg');
			var pluginApiMock = {
				on: jasmine.createSpy('on'),
				selectedPluginElement: true,
				getAppName: function () {
					return 'foo';
				},
				showErrorMsg: showErrorMsgSpy
			};
			var communicator = communicatorFactory(pluginApiMock);
			expect(communicator.insertEmbeddedAsset('', {assetSource: 'bar'})).toBeUndefined();
			expect(showErrorMsgSpy.calls.argsFor(0)).toContain('Can\'t update selected plugin element since it doesn\'t belong to the \'foo\' plugin');
		});
	});
});
