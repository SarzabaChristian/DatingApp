export type Member = {
  id: string
  email: string
  gender: string
  dateOfBirth: string
  displayName: string
  createdDate: string
  lastActive: string
  description?: string
  city: string
  country: string
  imageUrl?: string
}


export type Photo = {
  id: number
  url: string
  publicId?: any
  memberId: string
}
