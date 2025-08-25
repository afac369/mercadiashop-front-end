import { useEffect, useState } from 'react'
import Head from 'next/head'
import type { Product, Supplier } from '../../lib/types'

type FormState = Partial<Product>
const PER_PAGE = 9

export default function AdminHome() {
  // State para Productos
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>({ name: '', description: '', price: 0, image_url: '', category: '', stock: 0, is_active: true })
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0)

  // State para Proveedores
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [loadingSuppliers, setLoadingSuppliers] = useState(true)
  const [supplierForm, setSupplierForm] = useState({ name: '', contact_email: '', website: '' })
  const [supplierError, setSupplierError] = useState<string | null>(null)

  // --- Lógica de Productos ---
  const fetchData = async (opts?: { page?: number }) => {
    const pg = opts?.page ?? page
    setLoading(true)
    const params = new URLSearchParams({ q, category, page: String(pg), perPage: String(PER_PAGE) })
    const res = await fetch('/api/admin/products?' + params.toString())
    if (!res.ok) { setError('Error cargando productos'); setLoading(false); return }
    const j = await res.json(); setItems(j.data || []); setTotal(j.total || 0); setLoading(false)
  }

  // --- Lógica de Proveedores ---
  const fetchSuppliers = async () => {
    setLoadingSuppliers(true)
    const res = await fetch('/api/admin/suppliers')
    if (!res.ok) { setSupplierError('Error cargando proveedores'); setLoadingSuppliers(false); return }
    const j = await res.json(); setSuppliers(j || []); setLoadingSuppliers(false)
  }

  useEffect(() => { 
    fetchData()
    fetchSuppliers()
  }, [q, category, page])

  const totalPages = Math.max(Math.ceil(total / PER_PAGE), 1)

  const onSave = async () => {
    setError(null); const method = editingId ? 'PUT' : 'POST'; const url = editingId ? `/api/admin/product/${editingId}` : '/api/admin/products'
    const res = await fetch(url, { method, headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(form) })
    if (!res.ok) { const j = await res.json().catch(()=>({message:'Error'})); setError(j.message || 'Error guardando'); return }
    setForm({ name:'', description:'', price:0, image_url:'', category:'', stock:0, is_active:true }); setEditingId(null); setPage(1); fetchData({ page: 1 })
  }

  const onSaveSupplier = async () => {
    setSupplierError(null)
    const res = await fetch('/api/admin/suppliers', { method: 'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(supplierForm) })
    if (!res.ok) { const j = await res.json().catch(()=>({message:'Error'})); setSupplierError(j.message || 'Error guardando proveedor'); return }
    setSupplierForm({ name: '', contact_email: '', website: '' });
    fetchSuppliers()
  }

  const onEdit = (p: Product) => { setEditingId(p.id); setForm({ name:p.name, description:p.description??'', price:p.price, image_url:p.image_url??'', category:p.category??'', stock:p.stock, is_active:p.is_active }); window.scrollTo({ top:0, behavior:'smooth' }) }
  const onDelete = async (id: string) => { if (!confirm('¿Eliminar este producto?')) return; const res = await fetch(`/api/admin/product/${id}`, { method: 'DELETE' }); if (!res.ok) { alert('Error eliminando'); return } fetchData() }
  const onUpload = async (file?: File) => { if (!file) return; const fd = new FormData(); fd.append('file', file); const res = await fetch('/api/admin/upload', { method:'POST', body: fd }); const j = await res.json(); if (!j.ok) { alert(j.message || 'Error subiendo'); return } setForm(f => ({ ...f, image_url: j.url })) }
  const isEditing = Boolean(editingId)

  return (<div className="min-h-screen bg-black text-white">
    <Head><title>Admin – MercadIAshop</title></Head>
    <header className="sticky top-0 z-10 bg-white/5 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="font-bold">Admin – MercadIAshop</div>
        <button onClick={async ()=>{ await fetch('/api/admin/logout'); window.location.href='/admin/login' }} className="text-sm rounded-md border px-3 py-1 hover:bg-white/10">Salir</button>
      </div>
    </header>
    <main className="mx-auto max-w-6xl px-4 py-8 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <section id="products">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-xl font-bold">Productos</h2>
            <div className="flex gap-2">
              <input className="rounded-lg bg-white/10 px-3 py-2" placeholder="Buscar por nombre…" value={q} onChange={(e)=>{ setPage(1); setQ(e.target.value) }} />
              <input className="rounded-lg bg-white/10 px-3 py-2" placeholder="Categoría" value={category} onChange={(e)=>{ setPage(1); setCategory(e.target.value) }} />
            </div>
          </div>
          {loading ? (<div className="mt-4 opacity-80">Cargando…</div>) : items.length === 0 ? (<div className="mt-4 opacity-80">No hay productos.</div>) : (<>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              {items.map(p => (
                <div key={p.id} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="aspect-[4/3] rounded-xl bg-white/10 overflow-hidden flex items-center justify-center">
                    {p.image_url ? <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" /> : <span className="opacity-60">Sin imagen</span>}
                  </div>
                  <div className="mt-3 font-semibold">{p.name}</div>
                  <div className="text-sm opacity-80">${(p.price || 0).toLocaleString('es-CL')}</div>
                  <div className="mt-2 flex gap-2">
                    <button onClick={()=>onEdit(p)} className="rounded-md border px-3 py-1 hover:bg-white/10 text-sm">Editar</button>
                    <button onClick={()=>onDelete(p.id)} className="rounded-md border px-3 py-1 hover:bg-white/10 text-sm">Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2">
              <button className="rounded-md border px-3 py-1 hover:bg-white/10 disabled:opacity-50" disabled={page <= 1} onClick={()=>setPage(p => Math.max(p-1, 1))}>← Anterior</button>
              <span className="text-sm opacity-80">Página {page} de {totalPages}</span>
              <button className="rounded-md border px-3 py-1 hover:bg-white/10 disabled:opacity-50" disabled={(page * PER_PAGE) >= total} onClick={()=>setPage(p => p+1)}>Siguiente →</button>
            </div>
          </>)}
        </section>
      </div>
      <div className="lg:col-span-1 flex flex-col gap-8">
        <section id="product-form" className="rounded-2xl bg-white/5 border border-white/10 p-6 sticky top-24">
          <h2 className="text-xl font-bold">{isEditing ? 'Editar producto' : 'Nuevo producto'}</h2>
          {error && <div className="mt-2 text-sm text-red-400">{error}</div>}
          <div className="mt-4 grid gap-4">
            <label className="grid"><span className="text-sm opacity-80">Nombre</span><input className="rounded-lg bg-white/10 px-3 py-2" value={form.name || ''} onChange={e=>setForm(f=>({...f, name:e.target.value}))} /></label>
            <label className="grid"><span className="text-sm opacity-80">Precio (CLP)</span><input type="number" className="rounded-lg bg-white/10 px-3 py-2" value={(form.price as any)||0} onChange={e=>setForm(f=>({...f, price:Number(e.target.value)}))} /></label>
            <label className="grid"><span className="text-sm opacity-80">Descripción</span><textarea className="rounded-lg bg-white/10 px-3 py-2" value={form.description || ''} onChange={e=>setForm(f=>({...f, description:e.target.value}))} /></label>
            <label className="grid"><span className="text-sm opacity-80">Imagen URL</span><input className="rounded-lg bg-white/10 px-3 py-2" value={form.image_url || ''} onChange={e=>setForm(f=>({...f, image_url:e.target.value}))} /></label>
            <label className="grid"><span className="text-sm opacity-80">Subir imagen (opcional)</span><input type="file" accept="image/*" onChange={e=>onUpload(e.target.files?.[0])} className="rounded-lg bg-white/10 px-3 py-2" /><span className="text-xs opacity-70 mt-1">Se sube a Supabase Storage (bucket: product-images)</span></label>
            <label className="grid"><span className="text-sm opacity-80">Categoría</span><input className="rounded-lg bg-white/10 px-3 py-2" value={form.category || ''} onChange={e=>setForm(f=>({...f, category:e.target.value}))} /></label>
            <label className="grid"><span className="text-sm opacity-80">Stock</span><input type="number" className="rounded-lg bg-white/10 px-3 py-2" value={(form.stock as any)||0} onChange={e=>setForm(f=>({...f, stock:Number(e.target.value)}))} /></label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={!!form.is_active} onChange={e=>setForm(f=>({...f, is_active:e.target.checked}))} /><span className="text-sm">Activo</span></label>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={onSave} className="rounded-md bg-emerald-500/90 hover:bg-emerald-500 text-black px-4 py-2 font-semibold">{isEditing ? 'Guardar cambios' : 'Crear producto'}</button>
            {isEditing && (<button onClick={()=>{ setEditingId(null); setForm({ name:'', description:'', price:0, image_url:'', category:'', stock:0, is_active:true }) }} className="rounded-md border px-4 py-2 hover:bg-white/10">Cancelar</button>)}
          </div>
        </section>
        <section id="suppliers" className="rounded-2xl bg-white/5 border border-white/10 p-6">
          <h2 className="text-xl font-bold">Gestionar Proveedores</h2>
          <div className="mt-4">
            <h3 className="font-semibold">Añadir proveedor</h3>
            {supplierError && <div className="mt-2 text-sm text-red-400">{supplierError}</div>}
            <div className="mt-2 grid gap-3">
              <label className="grid"><span className="text-sm opacity-80">Nombre</span><input className="rounded-lg bg-white/10 px-3 py-2" value={supplierForm.name} onChange={e=>setSupplierForm(f=>({...f, name: e.target.value}))} /></label>
              <label className="grid"><span className="text-sm opacity-80">Email</span><input type="email" className="rounded-lg bg-white/10 px-3 py-2" value={supplierForm.contact_email} onChange={e=>setSupplierForm(f=>({...f, contact_email: e.target.value}))} /></label>
              <label className="grid"><span className="text-sm opacity-80">Website</span><input type="url" className="rounded-lg bg-white/10 px-3 py-2" value={supplierForm.website} onChange={e=>setSupplierForm(f=>({...f, website: e.target.value}))} /></label>
            </div>
            <div className="mt-3">
              <button onClick={onSaveSupplier} className="rounded-md bg-emerald-500/90 hover:bg-emerald-500 text-black px-4 py-2 font-semibold text-sm">Añadir Proveedor</button>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold">Proveedores existentes</h3>
            {loadingSuppliers ? <div className="text-sm opacity-80 mt-2">Cargando...</div> : suppliers.length === 0 ? <div className="text-sm opacity-80 mt-2">No hay proveedores.</div> : (
              <ul className="mt-2 space-y-2">
                {suppliers.map(s => (
                  <li key={s.id} className="text-sm opacity-90">- {s.name}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  </div>)
}