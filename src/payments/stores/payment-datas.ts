import { shallowRef } from '@vue/reactivity'
import { createGlobalState, whenever } from '@vueuse/core'
import { ref, shallowReadonly } from 'vue'
import { usePropertiesStore } from '@/shared/stores/properties'
import { usePaymentDatasService } from '@/payments/services/payment-datas'
import type { PaymentData } from '@/payments/dto/payment-data'

export const usePaymentDatasStore = createGlobalState(() => {
  const paymentDatas = shallowRef<PaymentData[]>([])
  const unpaidPaymentDatas = shallowRef<PaymentData[]>([])
  const start = ref<Date>()
  const end = ref<Date>()

  const paymentDatasService = usePaymentDatasService()
  const { selectedId } = usePropertiesStore()

  const { result, loading } = paymentDatasService.getPaymentDatas(start, end, selectedId)
  whenever(result, result => paymentDatas.value = result.paymentDatas)

  const { result: unpaidResult } = paymentDatasService.getUnpaidPaymentDatas(false, selectedId)
  whenever(unpaidResult, result => unpaidPaymentDatas.value = result.paymentDatas)

  return {
    paymentDatas: shallowReadonly(paymentDatas),
    unpaidPaymentDatas: shallowReadonly(unpaidPaymentDatas),
    loading,
    start,
    end,
  }
})
