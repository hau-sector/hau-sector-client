import { useMutation, useQuery } from '@vue/apollo-composable'
import { createGlobalState } from '@vueuse/core'
import gql from 'graphql-tag'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { METER_DATA } from '@/register/dto/meter-data'
import type { UpdateMeterData } from '@/register/dto/update-meter-data'
import type { CreateMeterData } from '@/register/dto/create-meter-data'
import type { MeterType } from '@/register/constants/meter-type'
import type { MeterData } from '@/register/dto/meter-data'

export const useMeterDatasService = createGlobalState(() => ({
  getMeterDatas: (
    type: MaybeRefOrGetter<MeterType | undefined>,
    start: MaybeRefOrGetter<Date | undefined>,
    end: MaybeRefOrGetter<Date | undefined>,
    flatId: MaybeRefOrGetter<string | undefined>,
  ) => useQuery<
    { meterDatas: MeterData[] },
    { type: MeterType | undefined; start: Date | undefined; end: Date | undefined; flatId: string | undefined }
  >(gql`
      query GetMeterDatas($type: MeterType!, $start: String!, $end: String!, $flatId: String!) {
        meterDatas(type: $type, start: $start, end: $end, flatId: $flatId) {
          ...MeterData
        }
      }
      ${METER_DATA}
    `,
  () => ({
    type: toValue(type),
    start: toValue(start),
    end: toValue(end),
    flatId: toValue(flatId),
  }),
  () => ({
    enabled: Boolean(toValue(type) && toValue(start) && toValue(end) && toValue(flatId)),
  })),

  getCurrentMeterData: (
    type: MaybeRefOrGetter<MeterType | undefined>,
    flatId: MaybeRefOrGetter<string | undefined>,
  ) => useQuery<
    { currentMeterData: MeterData | undefined },
    { type: MeterType | undefined; flatId: string | undefined }
  >(gql`
      query GetCurrentMeterData($type: MeterType!, $flatId: String!) {
        currentMeterData(type: $type, flatId: $flatId) {
          ...MeterData
        }
      }
      ${METER_DATA}
    `,
  () => ({
    type: toValue(type),
    flatId: toValue(flatId),
  }),
  () => ({
    enabled: Boolean(toValue(type) && toValue(flatId)),
  })),

  createCurrentMeterData: () => useMutation<
    { createCurrentMeterData: MeterData },
    { payload: CreateMeterData; flatId: string }
  >(
    gql`
      mutation CreateCurrentMeterData($payload: CreateMeterDataInput!, $flatId: String!) {
        createCurrentMeterData(payload: $payload, flatId: $flatId) {
          ...MeterData
        }
      }
      ${METER_DATA}
    `,
  ),

  updateCurrentMeterData: () => useMutation<
    { updateCurrentMeterData: MeterData },
    { payload: UpdateMeterData; flatId: string }
  >(
    gql`
        mutation UpdateCurrentMeterData($payload: UpdateMeterDataInput!, $flatId: String!) {
          updateCurrentMeterData(payload: $payload, flatId: $flatId) {
            ...MeterData
          }
        }
        ${METER_DATA}
    `,
  ),
}))
