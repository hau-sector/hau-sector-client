import { beforeEach, describe, expect, it, vi } from 'vitest'
import { isRef, nextTick, ref } from 'vue'
import { usePaymentDatasStore } from '@/payments/stores/payment-datas'

const resultMock = ref()
const unpaidResultMock = ref()
vi.mock('@/payments/services/payment-datas', () => ({
  usePaymentDatasService: () => ({
    getPaymentDatas: () => ({ result: resultMock, loading: ref(false) }),
    getUnpaidPaymentDatas: () => ({ result: unpaidResultMock }),
  }),
}))

vi.mock('@/shared/stores/flats', () => ({
  useFlatsStore: () => ({
    flatId: ref(''),
  }),
}))

describe('usePaymentDatasStore', () => {
  let paymentDatasStore: ReturnType<typeof usePaymentDatasStore>

  beforeEach(() => {
    paymentDatasStore = usePaymentDatasStore()
  })

  it('should return ref of payment datas array', () => {
    expect(paymentDatasStore.paymentDatas).toBeDefined()
    expect(isRef(paymentDatasStore.paymentDatas)).toBeTruthy()
    expect(Array.isArray(paymentDatasStore.paymentDatas.value)).toBeTruthy()
  })

  it('should return ref of unpaid payment datas array', () => {
    expect(paymentDatasStore.unpaidPaymentDatas).toBeDefined()
    expect(isRef(paymentDatasStore.unpaidPaymentDatas)).toBeTruthy()
    expect(Array.isArray(paymentDatasStore.unpaidPaymentDatas.value)).toBeTruthy()
  })

  it('should return boolean loading value', () => {
    expect(paymentDatasStore.loading).toBeDefined()
    expect(isRef(paymentDatasStore.loading)).toBeTruthy()
    expect(paymentDatasStore.loading.value).toBeTypeOf('boolean')
  })

  it('should return ref start and end values', () => {
    expect(paymentDatasStore.start).toBeDefined()
    expect(isRef(paymentDatasStore.start)).toBeTruthy()
    expect(paymentDatasStore.end).toBeDefined()
    expect(isRef(paymentDatasStore.end)).toBeTruthy()
  })

  describe('paymentDatas', () => {
    it('should be empty array', () => {
      expect(paymentDatasStore.paymentDatas.value).toStrictEqual([])
    })

    it('should contain result from service', async () => {
      resultMock.value = { paymentDatas: [{ id: 1 }] }
      await nextTick()

      expect(paymentDatasStore.paymentDatas.value).toStrictEqual([{ id: 1 }])
    })
  })

  describe('unpaidPaymentDatas', () => {
    it('should be empty array', () => {
      expect(paymentDatasStore.unpaidPaymentDatas.value).toStrictEqual([])
    })

    it('should contain result from service', async () => {
      unpaidResultMock.value = { paymentDatas: [{ id: 1 }] }
      await nextTick()

      expect(paymentDatasStore.unpaidPaymentDatas.value).toStrictEqual([{ id: 1 }])
    })
  })
})
