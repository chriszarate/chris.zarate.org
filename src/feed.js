const Parser = require( 'rss-parser' );

const parser = new Parser( {
  customFields: {
    item: [ 'summary' ],
  },
} );

exports.getPixelfedFeed = async ( { tagId, url } ) => {
 	const feed = await parser.parseURL( url );

	// Map feed items to something resembling the WP post objects so that they can
	// use the same templates.
	return feed.items.map( item => {
		let photo = ( item.summary || '' ).match( /src="([^"]+\.jpe?g)"/ );

		if ( ! item.title || ! photo || item.title.match( /^mulchy/ ) ) {
			return null;
		}

		const [ title ] = item.title.trim().split( '\n' );

		[ , photo ] = photo;
		photo = photo.replace( /_thumb\./, '.' );
		photo = `<p><img src="${photo}" alt=""></p>`;

		let id = new Date( item.isoDate ).getTime() / 1000;
		let oid = item.id.match( /([0-9]+)$/ );
		if ( oid ) {
			[ , id ] = oid;
		}

		return {
			content: {
				rendered: photo,
			},
			date: item.isoDate,
			excerpt: {
				rendered: photo,
			},
			id,
			link: item.link,
			modified: item.isoDate,
			slug: `photo-${id}`,
			source: 'pixelfed',
			tags: [ tagId ],
			title: {
				rendered: title,
			},
		};
	} ).filter( Boolean );
};
