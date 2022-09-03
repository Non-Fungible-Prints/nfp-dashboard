import { Dialog } from '@headlessui/react';
import React, { FC } from 'react'
import Modal from '../Modal/Modal'


const PrintModal: FC<any> = ({ nftData, onClose }) => {

    return <Modal open={!!nftData} onClose={onClose}>
        <div className="grid grid-cols-1">
        <div className="grid grid-cols-1 w-full flex justify-center pb-4">
            <Dialog.Title className="text-gray-200 font-semibold text-center text-2xl">Choose your PRINT</Dialog.Title>
        </div>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 xl:gap-x-8">
                <div key={nftData.id} className="group">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                        <img
                            src={`${nftData.tokenUri.gateway}`}
                            alt="Image of an NFT"
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-200">Frigure</h3>
                </div>
                <div key={nftData.id} className="group">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-full bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                        <img
                            src="http://placekitten.com/g/300/300"
                            alt="Image of an NFT"
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-200">NFC Tag</h3>
                </div>
            </div>
        </div>
    </Modal>
}

export default PrintModal;