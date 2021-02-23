module.exports = function ( eleventyConfig ) {
	eleventyConfig.addPassthroughCopy( 'assets' );

	eleventyConfig.setBrowserSyncConfig( {
		// This completely overwrites the built-in server config, so we need to
		// reconstruct the default config.
		server: {
			baseDir: 'build',
			serveStaticOptions: {
				setHeaders: ( res, path ) => {
					// Set text/html for files without an extension.
					if ( /\/[^\/\.]+$/.test( path ) ) {
						res.setHeader( 'Content-Type', 'text/html' );
					}
				},
			},
		},
	} );

	return {
		dir: {
			input: 'src',
			output: 'build',
		},
	}
};
