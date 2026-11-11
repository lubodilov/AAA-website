import { Meta } from '../components/Meta';
import { Button } from '../components/Button';
import { useLocale } from '../content';

export default function NotFound() {
  const { t, href } = useLocale();
  const nf = t.ui.notFound;
  return (
    <section className="flex min-h-[80svh] items-end pb-20 pt-40">
      <Meta title={t.ui.meta.notFoundTitle} description={t.ui.meta.notFoundDesc} path="/404" />
      <div className="wrap">
        <h1 className="d1">{nf.h1}</h1>
        <div className="mt-10">
          <Button to={href('/')}>{nf.home}</Button>
        </div>
      </div>
    </section>
  );
}
