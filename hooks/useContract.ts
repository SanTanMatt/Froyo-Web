import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { FROYO_TRACKER_ABI, FROYO_TRACKER_ADDRESS } from '@/abi/froyo_tracker';
import { FROYO_TOKEN_ABI } from '@/abi/froyo_token';
import { formatEther, parseEther } from 'viem';

export function useRestaurantCount() {
  return useReadContract({
    address: FROYO_TRACKER_ADDRESS,
    abi: FROYO_TRACKER_ABI,
    functionName: 'restaurantCount',
  });
}

export function useRestaurant(id: bigint | undefined) {
  return useReadContract({
    address: FROYO_TRACKER_ADDRESS,
    abi: FROYO_TRACKER_ABI,
    functionName: 'getRestaurant',
    args: id ? [id] : undefined,
  });
}

export function usePriceReports(restaurantId: bigint | undefined) {
  return useReadContract({
    address: FROYO_TRACKER_ADDRESS,
    abi: FROYO_TRACKER_ABI,
    functionName: 'getPriceReports',
    args: restaurantId ? [restaurantId] : undefined,
  });
}

export function usePostRestaurant() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const postRestaurant = async (name: string, location: string) => {
    writeContract({
      address: FROYO_TRACKER_ADDRESS,
      abi: FROYO_TRACKER_ABI,
      functionName: 'postRestaurant',
      args: [name, location],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });

  return {
    postRestaurant,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
}

export function useReportPrice() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const reportPrice = async (restaurantId: bigint, price: string, priceType: string) => {
    writeContract({
      address: FROYO_TRACKER_ADDRESS,
      abi: FROYO_TRACKER_ABI,
      functionName: 'reportPrice',
      args: [restaurantId, parseEther(price), priceType],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });

  return {
    reportPrice,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
}

export function useTokenBalance(tokenAddress: `0x${string}` | undefined, account: `0x${string}` | undefined) {
  return useReadContract({
    address: tokenAddress,
    abi: FROYO_TOKEN_ABI,
    functionName: 'balanceOf',
    args: account && tokenAddress ? [account] : undefined,
  });
}