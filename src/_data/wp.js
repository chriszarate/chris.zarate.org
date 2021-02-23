const WPAPI = require( 'wpapi' );
const { wordpressDomain } = require( '../../config' );
const formatWPPost = require( '../_utils/format' );

// Connect to WPCOM REST API. Requests must be namespaced.
// https://github.com/WP-API/node-wpapi/issues/329
const wp = WPAPI.site( 'https://public-api.wordpress.com/wp/v2/sites/' );
const perPage = 50;

// Get entire collection using pagination helper.
async function getCollection ( request ) {
	const response = await request.get();
	if ( ! response._paging || ! response._paging.next ) {
		return response;
	}

	const nextResponse = await getCollection( response._paging.next );

	return [ ...response, ...nextResponse ];
}

function getPages () {
	return getCollection(
		wp
			.pages()
			.namespace( wordpressDomain )
			.perPage( perPage )
	);
}

function getPosts () {
	return getCollection(
		wp
			.posts()
			.namespace( wordpressDomain )
			.perPage( perPage )
	);
}

function getTags () {
	return getCollection(
		wp
			.tags()
			.namespace( wordpressDomain )
			.perPage( perPage )
	);
}

// Translate tags IDs to slugs and format post.
function transform ( post, tagMap ) {
	return {
		...formatWPPost( post ),
		tags: ( post.tags || [] ).map( tagId => tagMap[ tagId ] ),
	};
}

async function getData () {
	if ( this.inMemoryCache ) {
		console.log( 'Loading from cache....' );
		return this.inMemoryCache;
	}

	console.log( 'Fetching data from WPCOM...' );

	const rawPages = await getPages();
	const rawPosts = await getPosts();
	const rawTags = await getTags();

	// Create a map of tag IDs to slugs.
	const tagMap = rawTags.reduce( ( acc, tag ) => ( {
		...acc,
		[ tag.id ]: tag,
	} ), {} );

	// Create a map of post IDs to array indexes.
	const postMap = rawPosts.reduce( ( acc, post, i ) => ( {
		...acc,
		[ post.id ]: i,
	} ), {} );

	const pages = rawPages.map( page => transform( page, tagMap ) );
	const posts = rawPosts.map( post => transform( post, tagMap ) );

	// Create an array of tags, with a "posts" property that contains the array
	// index of the post. Only return tags with posts.
	const tags = rawTags.map( tag => ( {
		...tag,
		posts: posts
			.filter( post => post.tags.find( ( { id } ) => id === tag.id ) )
			.map( post => postMap[ post.id ] ),
	} ) ).filter( tag => tag.posts.length );

	this.inMemoryCache = {
		pages,
		posts,
		tags,
	};

	return this.inMemoryCache;
}

module.exports = getData;
