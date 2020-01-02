export interface IBoat {
  id: number
  name: string
  type: string
  imageUrl: string
  price: number
  capacity: number
}

const boats: IBoat[] = [
  {
    id: 1,
    name: 'RORO 3000',
    type: 'RORO',
    imageUrl:
      'https://primer.com.ph/tips-guides/wp-content/uploads/sites/5/2016/09/roroship.jpg',
    price: 300,
    capacity: 150
  },
  {
    id: 2,
    name: 'LE CHAVIT YATCH',
    type: 'yatch',
    price: 1000,
    imageUrl:
      'https://www.fraseryachts.com/uploads/image/yachts/queen-anne/Gentech-yachts_yacht_for_sale_Queen-anne_12467.jpg',
    capacity: 10
  },
  {
    id: 3,
    name: 'ORDINARY BOAT v0.1',
    imageUrl:
      'https://primer.com.ph/tips-guides/wp-content/uploads/sites/5/2016/09/roroship.jpg',
    price: 50,
    type: 'ordinary_boat',
    capacity: 15
  },
  {
    id: 4,
    name: 'SPEEDY',
    imageUrl:
      'https://sailo.s3.amazonaws.com/media/boats/2016/10/rental-Motor-boat-Monterey-32feet-Pattaya-TH_VMGyN9G.jpg',
    price: 5,
    type: 'speed_boat',
    capacity: 20
  }
]

export default class Boat {
  static list(): Promise<IBoat[]> {
    return new Promise((resolve, reject) => {
      resolve(boats)
    })
  }

  static get(id: number): Promise<IBoat> {
    return new Promise((resolve, reject) => {
      return boats.find(elem => elem.id === id)
    })
  }
}
