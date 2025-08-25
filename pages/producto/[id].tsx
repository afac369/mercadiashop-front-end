import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import LayoutPro from '../../components/LayoutPro';
import { supabase } from '../../../lib/supabaseClient';
import { Product, Supplier } from '../../../lib/types';
import { formatCLP } from '../../../utils/currency';
import { useCart } from '../../../context/CartContext';
import { useToast } from '../../../components/ToastProvider';
import { useState } from 'react';

type ProductWithSupplier = Product & {
  suppliers: Pick<Supplier, 'name'> | null;
};

interface Props {
  product: ProductWithSupplier;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const pageTitle = `${product.name} | MercadIAshop`;
  const { add } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    add({ ...product, quantity });
    toast(`Agregado al carrito (${quantity} unidad${quantity > 1 ? 'es' : ''})`);
  };

  return (
    <LayoutPro>
      <Head>
        <title>{pageTitle}</title>
        {product.description && <meta name="description" content={product.description} />}
        <meta property="og:title" content={pageTitle} />
        {product.description && <meta property="og:description" content={product.description} />}
        {product.image_url && <meta property="og:image" content={product.image_url} />}
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-[4/3] relative rounded-2xl bg-white/5 overflow-hidden">
            {product.image_url ? (
              <Image src={product.image_url} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full grid place-content-center">Sin imagen</div>
            )}
          </div>
          <div>
            {product.suppliers && (
              <div className="text-sm opacity-80 mb-2">Vendido por: {product.suppliers.name}</div>
            )}
            <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
            <p className="text-3xl font-extrabold mt-4">{formatCLP(product.price)}</p>
            
            {product.description && (
              <div className="mt-6 prose prose-invert">
                <p>{product.description}</p>
              </div>
            )}

            <div className="mt-8 flex items-center gap-4">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-20 rounded-lg bg-white/10 px-3 py-2 text-center"
              />
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-grow py-3 text-lg font-semibold"
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </LayoutPro>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  const { data, error } = await supabase
    .from('productos')
    .select('*, suppliers(name)') // Join con la tabla de proveedores
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error fetching product', error);
    return { notFound: true };
  }

  return {
    props: {
      product: data,
    },
  };
};

export default ProductPage;