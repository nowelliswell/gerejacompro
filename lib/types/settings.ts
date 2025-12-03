export interface Settings {
  gereja: {
    nama: string
    alamat: string
    telepon: string
    email: string
    website: string
  }
  socialMedia: {
    facebook?: string
    instagram?: string
    youtube?: string
    twitter?: string
  }
  rekening: {
    bank: string
    nomorRekening: string
    atasNama: string
  }[]
  liveStreaming: {
    youtube?: string
    facebook?: string
  }
  maps: {
    embedUrl: string
    latitude: number
    longitude: number
  }
  updatedAt: string
  updatedBy: string
}
