const fs = require( 'fs' ).promises;
const path = require( 'path' );
const CloudFront = require( 'aws-sdk/clients/cloudfront' );
const S3 = require( 'aws-sdk/clients/s3' );
const mime = require( 'mime-types' );
const {
	cfDistributionId: DistributionId,
	s3Bucket: Bucket,
} = require( './config' );

const cloudfront = new CloudFront();
const s3 = new S3();

const rootDir = path.join( __dirname, 'build' );

const invalidationParams = {
	DistributionId,
	InvalidationBatch: {
		CallerReference: `wordpress-com-static-site-${new Date().getTime()}`,
		Paths: {
			Quantity: 1, // a wildcard counts as one path
			Items: [
				'/*',
			],
		},
	},
};

function invalidate () {
	if ( ! DistributionId ) {
		console.log( `No CloudFront distribution defined in config, skipping invalidation...` );
		return Promise.resolve();
	}

	console.log( `Invalidating distribution ${DistributionId}...` );
	return cloudfront.createInvalidation( invalidationParams ).promise();
}

function putS3Object ( options ) {
	return s3.putObject( options ).promise();
}

async function publishDir ( dir ) {
	const filesOrFolders = await fs.readdir( dir );

	for ( const fileOrFolder of filesOrFolders ) {
		const fullPath = path.join( dir, fileOrFolder );
		const stat = await fs.stat( fullPath );

		if ( stat.isDirectory() ) {
			await publishDir( fullPath );
		}

		if ( stat.isFile() ) {
			const contents = await fs.readFile( fullPath );
			const extension = fileOrFolder.split( '.' ).pop();
			const Key = fullPath.replace( `${rootDir}/`, '' );

			let ContentType = mime.lookup( extension );
			if ( ! ContentType ) {
				ContentType = 'text/html; charset=utf-8';
			}

			if ( 'feed' === fileOrFolder ) {
				ContentType = 'application/atom+xml; charset=utf-8';
			}

			console.log( `Uploading ${Key} (${ContentType})...` );

			await putS3Object( {
				ACL: 'public-read',
				Body: Buffer.from( contents ),
				Bucket,
				ContentType,
				Key,
			} );
		}
	}
}

publishDir( rootDir )
	.then( () => invalidate() )
	.then( () => console.log( 'Published!' ) );
