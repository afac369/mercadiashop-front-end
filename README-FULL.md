
# MercadIAshop – Proyecto Unificado
## Incluye
- UI con Layout, Hero, Categorías, ProductCard, carrito (contexto React)
- Integración Supabase (tabla, RLS, SSR en home)
- Panel admin con login por cookie, CRUD, búsqueda, paginación
- Upload a Supabase Storage (bucket `product-images`)

## Pasos
1) `npm i formidable @supabase/supabase-js`
2) Copia `.env.local.example` a `.env.local` y completa:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
3) En Supabase → SQL: ejecuta `supabase/products.sql` (y `supabase/seed.sql` opcional).
4) En Supabase → Storage: crea bucket público `product-images`.
5) Ejecuta: `npm run dev`. Admin en `/admin/login`.
