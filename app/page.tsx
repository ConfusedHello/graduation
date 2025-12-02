'use client';

import { useEffect, useState } from 'react';
import InfiniteGallery from '@/components/InfiniteGallery';

type ImageItem = { src: string; alt: string };

export default function Home() {
	const [images, setImages] = useState<ImageItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchImages() {
			try {
				const response = await fetch('/api/images?limit=100');
				const data = await response.json();
				if (data.images) {
					setImages(data.images);
				}
			} catch (error) {
				console.error('Failed to fetch images:', error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchImages();
	}, []);

	if (isLoading) {
		return (
			<main className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="animate-pulse text-lg">Loading memories...</div>
				</div>
			</main>
		);
	}

	if (images.length === 0) {
		return (
			<main className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<p className="text-lg">No images found</p>
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen ">
			<InfiniteGallery
				images={images}
				speed={1.2}
				zSpacing={3}
				visibleCount={12}
				falloff={{ near: 0.8, far: 14 }}
				className="h-screen w-full rounded-lg overflow-hidden"
			/>
			<div className="h-screen inset-0 pointer-events-none fixed flex items-center justify-center text-center px-3 mix-blend-exclusion text-white">
				<h1 className="font-serif text-4xl md:text-7xl tracking-tight">
					<span className="italic">I create;</span> therefore I am
				</h1>
			</div>

			<div className="text-center fixed bottom-10 left-0 right-0 font-mono uppercase text-[11px] font-semibold">
				<p>Use mouse wheel, arrow keys, or touch to navigate</p>
				<p className=" opacity-60">
					Auto-play resumes after 3 seconds of inactivity
				</p>
			</div>
		</main>
	);
}
