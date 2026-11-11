import { Meta } from '../components/Meta';
import { useLocale } from '../content';
import { Dock } from '../components/Dock';
import { Hero } from '../sections/Hero';
import { Clients } from '../sections/Clients';
import { Recognition } from '../sections/Recognition';
import { Mechanism } from '../sections/Mechanism';
import { Results } from '../sections/Results';
import { Work } from '../sections/Work';
import { Method } from '../sections/Method';
import { Capabilities } from '../sections/Capabilities';
import { Founder } from '../sections/Founder';
import { FitCheck } from '../sections/FitCheck';
import { FAQ } from '../sections/FAQ';
import { FinalCTA } from '../sections/FinalCTA';

export default function Home() {
  const { t, href } = useLocale();
  return (
    <>
      <Meta title={t.ui.meta.homeTitle} description={t.ui.meta.homeDesc} path={href('/')} />
      <Dock />
      <Hero />
      <Clients />
      <Recognition />
      <Mechanism />
      <Results />
      <Work />
      <Method />
      <Capabilities />
      <Founder />
      <FitCheck />
      <FAQ />
      <FinalCTA />
    </>
  );
}
