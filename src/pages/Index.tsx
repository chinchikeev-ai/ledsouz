import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/HeroSection';
import PylonCalculatorSection from '@/components/PylonCalculatorSection';
import MapSection from '@/components/MapSection';
import FinalCTASection from '@/components/FinalCTASection';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>INDOOR LED-реклама в торговых центрах России | LED Screens</title>
        <meta name="description" content="Цифровые LED-экраны и пилоны в 87+ крупнейших торговых центрах России. Максимальный охват платёжеспособной аудитории. Рассчитайте кампанию за 60 секунд." />
        <meta name="keywords" content="LED реклама, indoor реклама, реклама в ТЦ, цифровые пилоны, LED экраны, реклама в торговых центрах" />
      </Helmet>
      
      <main className="overflow-y-auto">
        <HeroSection />
        <PylonCalculatorSection />
        <MapSection />
        <FinalCTASection />
      </main>
    </>
  );
};

export default Index;
