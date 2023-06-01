'use client';

import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PacmanLoader } from 'react-spinners';

const LoadingModal = () => {
	return (
		<Transition.Root show as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={() => {}}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div
						className="
							fixed 
							inset-0 
							bg-gray-50 
							bg-opacity-50 
							transition-opacity
							"
					/>
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div
						className="
							flex 
							min-h-full 
							items-center 
							justify-center 
							p-4 
							text-center 
							"
					>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel>
								<PacmanLoader size={30} color="#49c8b1" />
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default LoadingModal;
