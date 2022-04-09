export interface ICast {
  adult: boolean,
  gender: 1 | 2,
  id: number,
  known_for_department: string,
  name: string,
  popularity: number,
  profile_path: string,
  character: string,
  order: number
}

export interface ICrew extends ICast {
  department: string,
  job: string
}