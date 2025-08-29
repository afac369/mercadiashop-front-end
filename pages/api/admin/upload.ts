+ const MAX_SIZE = 5 * 1024 * 1024; // 5MB
+ const ALLOWED = ['image/jpeg','image/png','image/webp','image/avif'];

   const buf = await fs.readFile(f.filepath)
+  if (f.size && f.size > MAX_SIZE) return res.status(413).json({ ok:false, message:'Archivo demasiado grande' })
+  if (f.mimetype && !ALLOWED.includes(f.mimetype)) return res.status(400).json({ ok:false, message:'Tipo de archivo no permitido' })

   const ext = String(f.originalFilename || 'image.jpg').split('.').pop()?.toLowerCase() || 'jpg'
   const path = `products/${randomUUID()}.${ext}`
