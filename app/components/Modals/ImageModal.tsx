'use client';
import React from 'react';
import Modal from './Modal';
import Image from 'next/image';

interface ImageModalProps {
	src?: string | null;
	isOpen?: boolean;
	onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, onClose, isOpen }) => {
	if (!src) return null;
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="w-80 h-80">
				<Image
					alt="ImageModal"
					className="object-cover"
					fill
					src={src}
				/>{' '}
			</div>
		</Modal>
	);
};

export default ImageModal;
