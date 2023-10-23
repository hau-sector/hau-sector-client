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
    buildingId: MaybeRefOrGetter<string | undefined>,
  ) => useQuery<
    { meterDatas: MeterData[] },
    { type: MeterType | undefined; start: Date | undefined; end: Date | undefined; buildingId: string | undefined }
  >(gql`
      query GetMeterDatas($type: MeterType!, $start: String!, $end: String!, $buildingId: String!) {
        meterDatas(type: $type, start: $start, end: $end, buildingId: $buildingId) {
          ...MeterData
        }
      }
      ${METER_DATA}
    `,
  () => ({
    type: toValue(type),
    start: toValue(start),
    end: toValue(end),
    buildingId: toValue(buildingId),
  }),
  () => ({
    enabled: Boolean(toValue(type) && toValue(start) && toValue(end) && toValue(buildingId)),
  })),

  getCurrentMeterData: (
    type: MaybeRefOrGetter<MeterType | undefined>,
    buildingId: MaybeRefOrGetter<string | undefined>,
  ) => useQuery<
    { currentMeterData: MeterData | undefined },
    { type: MeterType | undefined; buildingId: string | undefined }
  >(gql`
      query GetCurrentMeterData($type: MeterType!, $buildingId: String!) {
        currentMeterData(type: $type, buildingId: $buildingId) {
          ...MeterData
        }
      }
      ${METER_DATA}
    `,
  () => ({
    type: toValue(type),
    buildingId: toValue(buildingId),
  }),
  () => ({
    enabled: Boolean(toValue(type) && toValue(buildingId)),
  })),

  createCurrentMeterData: () => useMutation<
    { createCurrentMeterData: MeterData },
    { payload: CreateMeterData }
  >(
    gql`
        mutation CreateCurrentMeterData($payload: CreateMeterDataInput!) {
          createCurrentMeterData(payload: $payload) {
            ...MeterData
          }
        }
        ${METER_DATA}
    `,
  ),

  updateCurrentMeterData: () => useMutation<
    { updateCurrentMeterData: MeterData },
    { payload: UpdateMeterData; buildingId: string }
  >(
    gql`
        mutation UpdateCurrentMeterData($payload: UpdateMeterDataInput!, $buildingId: String!) {
          updateCurrentMeterData(payload: $payload, buildingId: $buildingId) {
            ...MeterData
          }
        }
        ${METER_DATA}
    `,
  ),
}))
