import type { User } from "lucia";
import useCheckoutData from "./useCheckoutData";
import { useMemo, useState } from "react";
import { SEAT_VALUES, type SeatValuesType } from "@/lib/utils";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {
  user: User | null;
};

const useTransaction = ({ user }: Props) => {
  const { data } = useCheckoutData();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const selectedSeat = useMemo(() => {
    return SEAT_VALUES[(data?.seat as SeatValuesType) ?? "ECONOMY"];
  }, [data?.seat]);

  const transactionMutate = useMutation({
    mutationFn: (data: any) =>
      axios.post("/api/transactions/create", data).then((res) => res.data),
  });

  const payTransaction = async () => {
    if (!data && !user) {
      return null;
    }

    const totalPrice = Number(
      data?.flightDetail?.price ?? 0 + selectedSeat.additionalPrice
    );

    const bodyData = {
      bookingDate: new Date(),
      customerId: user?.id,
      flightId: data?.flightDetail?.id,
      price: totalPrice,
      seatId: data?.seatDetail?.id,
      departureCityCode: data?.flightDetail?.departureCityCode,
      destinationCityCode: data?.flightDetail?.destinationCityCode,
    };

    try {
      setIsLoading(true);
      const transaction = await transactionMutate.mutateAsync(bodyData);

      // handle midtrans
      window.snap.pay(transaction.midtrans.token, {
        onSuccess: (result: any) => {
          console.log(result);
          router.push("/success-checkout");
        },
        onPending: (result: any) => {
          console.log(result);
          router.push("/success-checkout");
        },
        onError: (result: any) => {
          console.log(result);
          alert("Tranksaction failed, try again");
        },
        onClose: (result: any) => {
          console.log(result);
          alert("Tranksaction failed, try again");
        },
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return {
    payTransaction,
    isLoading,
  };
};

export default useTransaction;
