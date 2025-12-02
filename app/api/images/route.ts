import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

const s3Client = new S3Client({
	region: 'auto',
	endpoint: process.env.R2_ENDPOINT,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID!,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
	},
});

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const continuationToken = searchParams.get('cursor') || undefined;
	const maxKeys = parseInt(searchParams.get('limit') || '50', 10);

	try {
		const command = new ListObjectsV2Command({
			Bucket: process.env.R2_BUCKET_NAME,
			MaxKeys: maxKeys,
			ContinuationToken: continuationToken,
		});

		const response = await s3Client.send(command);

		const images =
			response.Contents?.filter((obj) => {
				const key = obj.Key?.toLowerCase() || '';
				return (
					key.endsWith('.jpg') ||
					key.endsWith('.jpeg') ||
					key.endsWith('.png') ||
					key.endsWith('.webp') ||
					key.endsWith('.gif')
				);
			}).map((obj) => ({
				src: `${process.env.R2_PUBLIC_URL}/${obj.Key}`,
				alt: obj.Key || '',
				key: obj.Key,
				size: obj.Size,
				lastModified: obj.LastModified?.toISOString(),
			})) || [];

		return NextResponse.json({
			images,
			nextCursor: response.NextContinuationToken || null,
			isTruncated: response.IsTruncated || false,
		});
	} catch (error) {
		console.error('Error listing R2 objects:', error);
		return NextResponse.json(
			{ error: 'Failed to list images from storage' },
			{ status: 500 }
		);
	}
}
