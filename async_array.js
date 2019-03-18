const chai = require( 'chai' );
const expect = require( 'chai' ).expect;

/**
 *  resolve with the input message
 */
function echo( message ) {
	return new Promise( ( resolve, reject ) => {
		setTimeout( () => {
			resolve( message );
		}, 1000 );
		
	} );
}

/**
 * await/async does not work with Array.forEach
 */
async function addMessageUseAsync( messages ) {
	let array = [];
	
	await messages.forEach( async( message ) => {
		let echoMessage = await echo( message );
		array.push( echoMessage );
	} );
	
	array.push( 'finished' );
	
	return array;
}

/**
 * we can use promise to wait for array operation
 */
async function addMessageUsePromise( messages ) {
	let array = [];
	
	let promises = messages.map( async( message ) => {
		let echoMessage = await echo( message );
		array.push( echoMessage );
	} );
	
	await Promise.all( promises );
	array.push( 'finished' );
	
	return array;
}


/**
 *	Unit test for async array
 */
describe( 'Async array test', () => {
	
	it( 'should have finished message in first', done => {
		let messages = [ 'message1', 'message2', 'message3' ];
		let expectedMessage = 'finished';
		
		addMessageUseAsync( messages ).then( ( value ) => {
			expect( value[ 0 ] ).to.equal( expectedMessage );
			done();
		} );
	} );
	
	it( 'should have messages in the input order', done => {
		let messages = [ 'message1', 'message2', 'message3' ];
		let expectedMessages = [ 'message1', 'message2', 'message3', 'finished' ];
		
		addMessageUsePromise( messages ).then( ( value ) => {
			expect( value ).to.deep.equal( expectedMessages );
			done();
		} );
	} );
	
} );