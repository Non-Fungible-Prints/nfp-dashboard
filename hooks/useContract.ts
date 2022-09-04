import { utils } from 'ethers';
import { Contract } from '@ethersproject/contracts';

import NFPAbi from '../abi/NFPAbi.json';

const useContract = () => {
  const wethInterface = new utils.Interface(NFPAbi);
  const wethContractAddress = '0xfBAc3645F4919E3a0F489e11277a36D98AF71B34';
  return new Contract(wethContractAddress, wethInterface);
};

export default useContract;
