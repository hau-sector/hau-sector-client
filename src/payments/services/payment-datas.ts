import { useQuery } from '@vue/apollo-composable'
import { createGlobalState } from '@vueuse/core'
import gql from 'graphql-tag'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { PAYMENT_DATA } from '@/payments/dto/payment-data'
import type { PaymentData } from '@/payments/dto/payment-data'

export const usePaymentDatasService = createGlobalState(() => ({
  getPaymentDatas: (
    start: MaybeRefOrGetter<Date | undefined>,
    end: MaybeRefOrGetter<Date | undefined>,
    flatId: MaybeRefOrGetter<string | undefined>,
  ) => useQuery<
    { paymentDatas: PaymentData[] },
    { start: Date | undefined; end: Date | undefined; flatId: string | undefined }
  >(gql`
    query GetPaymentDatas($start: String!, $end: String!, $flatId: String!) {
      paymentDatas(start: $start, end: $end, flatId: $flatId) {
        ...PaymentData
      }
    }
    ${PAYMENT_DATA}
  `,
  () => ({
    start: toValue(start),
    end: toValue(end),
    flatId: toValue(flatId),
  }),
  () => ({
    enabled: Boolean(toValue(start) && toValue(end) && toValue(flatId)),
  })),

  getUnpaidPaymentDatas: (
    paid: MaybeRefOrGetter <Boolean | undefined>,
    flatId: MaybeRefOrGetter<string | undefined>,
  ) => useQuery<
    { paymentDatas: PaymentData[] },
    { paid: Boolean | undefined; flatId: string | undefined }
  >(gql`
    query GetUnpaidPaymentDatas($paid: Boolean!, $flatId: String!) {
      paymentDatas(paid: $paid, flatId: $flatId) {
        ...PaymentData
      }
    }
    ${PAYMENT_DATA}
  `,
  () => ({
    paid: toValue(paid),
    flatId: toValue(flatId),
  }),
  () => ({
    enabled: Boolean(toValue(flatId)),
  })),
}))
