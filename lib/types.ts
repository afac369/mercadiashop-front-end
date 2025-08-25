export type Product = {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: string | null
  stock: number
  is_active: boolean
  created_at: string
  supplier_id: string | null
}

export type Supplier = {
  id: string
  name: string
  contact_email: string | null
  website: string | null
  created_at: string
}