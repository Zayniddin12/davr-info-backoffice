export interface IMainGenderStatisticsResponse {
  gender?: string
  count: number
  percentage: number
}

export interface ITabItem {
  label?: string
  value: string
  id?: number
}
export interface IBarChartData {
  label?: string
  color?: string
  amount: number
  image: string
}

export interface ICourseStatistics {
  gender?: string
  count: number
  percentage: number
}
export enum EAvatarSize {
  SM = 'sm',
  MD = 'md',
}
