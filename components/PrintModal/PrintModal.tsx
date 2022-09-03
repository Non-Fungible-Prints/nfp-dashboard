import { Dialog } from '@headlessui/react';
import React, { FC, useState } from 'react';
import Modal from '../Modal/Modal';

type PrintType = 'CHIP' | 'FIGURE';

const PrintModal: FC<any> = ({ nftData, onClose }) => {
  const [ selectedOption, setSelectedOption ] = useState<PrintType | null>(null);
  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>, option: PrintType) => {
    if (e.key === ' ') {
      setSelectedOption(option);
    }
  };

  return (
    <Modal open={!!nftData} onClose={onClose}>
      <div className="grid grid-cols-1 p-6">
        <div className="grid grid-cols-1 w-full flex justify-center ">
          <Dialog.Title className="text-gray-200 font-semibold text-center text-4xl">
            Choose your
            <span className="inline-block ml-2 text-purple-700">PRINT</span>
          </Dialog.Title>
        </div>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 xl:gap-x-8 py-12">
          <div role="button" tabIndex={0} key={`${nftData.id.tokenId + nftData.timeLastUpdated}FIGURE`} className="group" onClick={() => setSelectedOption('FIGURE')} onKeyUp={(e) => handleKeyUp(e, 'FIGURE')}>
            <div className={`aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 ${selectedOption === 'FIGURE' ? 'drop-shadow border-solid border-3 border-purple-700' : ''}`}>
              <img
                src={`${nftData.tokenUri.gateway}`}
                alt="An NFT"
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-xl text-center font-semibold text-gray-200">3D Figure</h3>
          </div>
          <div role="button" tabIndex={0} key={`${nftData.id.tokenId + nftData.timeLastUpdated}CHIP`} className="group" onClick={() => setSelectedOption('CHIP')} onKeyUp={(e) => handleKeyUp(e, 'CHIP')}>
            <div className={`aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 ${selectedOption === 'CHIP' ? 'drop-shadow border-solid border-3 border-purple-700' : ''}`}>
              <img
                src="http://placekitten.com/g/300/300"
                alt="An NFT TAG"
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-xl text-center font-semibold text-gray-200">FANCY CHIP</h3>
          </div>
        </div>
        <div className="flex flex-col w-full gap-y-2 xl:gap-x-4 pb-4">
          <button disabled={!selectedOption} type="button" className="button w-full mx-auto mb-4 rounded-md px-4 py-2 text-gray-200 bg-purple-700 hover:bg-purple-500 font-semibold">Print Your NFT</button>
          <button disabled={!selectedOption} type="button" className="button w-full mx-auto mb-4 rounded-md px-4 py-2 text-gray-200 bg-purple-700 hover:bg-purple-500 font-semibold">Use RAMP</button>
        </div>
      </div>
    </Modal>
  );
};

export default PrintModal;
