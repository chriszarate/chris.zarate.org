const { decode } = require( 'html-entities' );
const prism = require( 'prismjs' );
const loadLanguages = require( 'prismjs/components/index' );

// Load some additional languages for syntax highlighting.
loadLanguages( [ 'diff', 'jsx', 'lua', 'php', 'shell', 'tsx', 'typescript' ] );

function highlightCode ( _, pre = '', preAttrs = '', codeAttrs = '', code ) {
	let grammar = prism.languages.clike;
	let language = 'clike';
	let matches;

	const langRegex = /(lang|language)-([^\s"']+)/;

	matches = preAttrs.match( langRegex );
	if ( ! matches ) {
		matches = codeAttrs.match( langRegex );
	}

	if ( matches && prism.languages[ matches[2] ] ) {
		grammar = prism.languages[ matches[2] ];
		language = matches[2];
	}

	// Need to decode HTML entities before running syntax highlighting.
	const highlightedCode = prism.highlight( decode( code ), grammar, language );

	return `${pre ? '<pre>' : ''}<code data-lang="${language}">${highlightedCode}`;
}

function formatDate ( date ) {
	return new Date( date )
		.toLocaleString( 'en-us', { year: 'numeric', month: 'long', day: 'numeric' } );
}

// Format a WP REST API post response into something that is a little easier to
// work with in 11y. Also apply syntax highlighting.
function formatWPPost ( post ) {
	const codeRegex = /(<pre([^>]*)>)?<code([^>]*)>([^<]+)/g;

	return {
		...post,
		content: null,
		excerpt: post.excerpt.rendered,
		dateString: formatDate( post.date_gmt ),
		hasCodeSnippets: /<code[\s>]/.test( post.content.rendered ),
		html: post.content.rendered.replace( codeRegex, highlightCode ),
		title: post.title.rendered,
	};
}

module.exports = formatWPPost;
