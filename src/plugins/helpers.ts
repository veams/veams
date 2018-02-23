'use strict';

/**
 * Imports
 */
import {
	extend as extendHelper,
	mixin as mixinsHelper,
	methodExtend as methodExtendHelper,
	isTouch as touchHelper,
	throttle as throttleHelper,
	querySelectorArray as selectorHelper,
	forEach as foreachHelper,
	makeId as makeIdHelper
} from '@veams/helpers';

/**
 * Interfaces
 */
export interface IHelpers {
	[key: string]: any
}

export interface IVeamsExtendByHelpers {
	addHelper: any,
	helpers: IHelpers
}

export interface IHelpersPlugin {
	pluginName: string,
	initialize: any
}

/**
 * Types
 */
export type VeamsHelpersType = {
	[key: string]: (...any) => any
};

/**
 * Helpers Plugin
 */
const HelpersPlugin: IHelpersPlugin = {
	pluginName: 'Helpers',
	initialize: function (Veams): IVeamsExtendByHelpers {
		Veams.addHelper = function addHelper(...args) {
			let params = [...args];

			if (params.length === 1) {
				if (typeof params[0] !== 'object') {
					console.error('@veams/core helpers :: You need to pass an object!');
					return;
				}

				for (let key in params[0]) {
					if (params[0].hasOwnProperty(key)) {
						if (!Veams.helpers[key]) {
							Veams.helpers[key] = params[0][key];
						} else {
							console.info(`@veams/core helpers :: The helper ${key} is already defined! Please define a new name for: `, params[0][key]);
						}
					}
				}
			} else if (params.length === 2) {

				if (!Veams.helpers[params[0]]) {
					if (typeof params[0] !== 'string' || typeof params[1] !== 'function') {
						console.error('@veams/core helpers :: You need to pass a string as first argument and the helper function as second one.');
						return;
					}
					Veams.helpers[params[0]] = params[1];
				} else {
					console.info(`@veams/core helpers :: The helper ${params[0]} is already defined! Please define a new name for: `, params[1]);
				}
			}
		};

		return addDefaultHelpers(Veams);
	},

};

/**
 * Add default helpers
 */
function addDefaultHelpers(Veams) {
	Veams.addHelper('querySelectorArray', selectorHelper);
	Veams.addHelper('extend', extendHelper);
	Veams.addHelper('isTouch', touchHelper);
	Veams.addHelper('mixin', mixinsHelper);
	Veams.addHelper('methodExtend', methodExtendHelper);
	Veams.addHelper('throttle', throttleHelper);
	Veams.addHelper('forEach', foreachHelper);
	Veams.addHelper('makeId', makeIdHelper);

	return Veams;
}

export default HelpersPlugin;