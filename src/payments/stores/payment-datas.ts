import { shallowRef } from '@vue/reactivity'
import { createGlobalState, whenever } from '@vueuse/core'
import { ref, shallowReadonly } from 'vue'
import { usePaymentDatasService } from '@/payments/services/payment-datas'
import type { PaymentData } from '@/payments/dto/payment-data'
import { useFlatsStore } from '@/shared/stores/flats'

export const usePaymentDatasStore = createGlobalState(() => {
  const paymentDatas = shallowRef<PaymentData[]>([])
  const unpaidPaymentDatas = shallowRef<PaymentData[]>([])
  const start = ref<Date>()
  const end = ref<Date>()

  const paymentDatasService = usePaymentDatasService()
  const { flatId } = useFlatsStore()

  const { result, loading } = paymentDatasService.getPaymentDatas(start, end, flatId)
  whenever(result, result => paymentDatas.value = result.paymentDatas)

  const { result: unpaidResult } = paymentDatasService.getUnpaidPaymentDatas(false, flatId)
  whenever(unpaidResult, result => unpaidPaymentDatas.value = result.paymentDatas)

  return {
    paymentDatas: shallowReadonly(paymentDatas),
    unpaidPaymentDatas: shallowReadonly(unpaidPaymentDatas),
    loading,
    start,
    end,
  }
})
