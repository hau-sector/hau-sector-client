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
    buildingId: MaybeRefOrGetter<string | undefined>,
  ) => useQuery<
    { paymentDatas: PaymentData[] },
    { start: Date | undefined; end: Date | undefined; buildingId: string | undefined }
  >(gql`
    query GetPaymentDatas($start: String!, $end: String!, $buildingId: String!) {
      paymentDatas(start: $start, end: $end, buildingId: $buildingId) {
        ...PaymentData
      }
    }
    ${PAYMENT_DATA}
  `,
  () => ({
    start: toValue(start),
    end: toValue(end),
    buildingId: toValue(buildingId),
  }),
  () => ({
    enabled: Boolean(toValue(start) && toValue(end) && toValue(buildingId)),
  })),

  getUnpaidPaymentDatas: (
    paid: MaybeRefOrGetter <Boolean | undefined>,
    buildingId: MaybeRefOrGetter<string | undefined>,
  ) => useQuery<
    { paymentDatas: PaymentData[] },
    { paid: Boolean | undefined; buildingId: string | undefined }
  >(gql`
    query GetUnpaidPaymentDatas($paid: Boolean!, $buildingId: String!) {
      paymentDatas(paid: $paid, buildingId: $buildingId) {
        ...PaymentData
      }
    }
    ${PAYMENT_DATA}
  `,
  () => ({
    paid: toValue(paid),
    buildingId: toValue(buildingId),
  }),
  () => ({
    enabled: Boolean(toValue(buildingId)),
  })),
}))
